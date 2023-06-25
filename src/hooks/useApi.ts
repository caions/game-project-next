import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

const useApi = <T>(url: string): ApiResponse<T> => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    isLoading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = new AxiosHeaders({ "dev-email-address": "dev@email.com" });
        const result: AxiosResponse<T> = await axios.get(url, { headers, timeout: 5000 });
        setResponse({ data: result.data, error: null, isLoading: false });
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const isKnownError = axiosError.response && [500, 502, 503, 504, 507, 508, 509].includes(axiosError.response.status)
        const isConnectionTimeoutError = axiosError.code === 'ECONNABORTED'

        if (isConnectionTimeoutError) {
          setResponse({
            data: null,
            error: 'O servidor demorou para responder, tente mais tarde.',
            isLoading: false,
          });
          return;
        }
        if (isKnownError) {
          setResponse({
            data: null,
            error: 'O servidor falhou em responder, tente recarregar a página.',
            isLoading: false,
          });
          return;
        }
        setResponse({ data: null, error: 'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde', isLoading: false });
      }
    };

    fetchData();
  }, [url]);

  return response;
};

export default useApi;
