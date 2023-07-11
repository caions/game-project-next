import { useFireBaseAuth } from "@/hooks/useFirebaseAuth";
import React, { useState } from "react";
import { Spinner } from "./Spinner";
import Image from "next/image";

export const AuthComponent = () => {
  const [registerPage, setRegisterPage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login, signup } = useFireBaseAuth(email, password);

  const buttonContent = () => {
    if (loading) {
      return <Spinner />;
    }
    if (registerPage) {
      return "SIGN UP";
    }
    return "LOGIN";
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={0}
            height={0}
            className="mx-auto h-10 w-auto"
            src={""}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            {registerPage ? "Create an account" : "Login to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {!registerPage && "Forgot password?"}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
{/*             {registerPage && (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Confirm password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="confirm-password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )} */}
            <div>
              <button
                type="button"
                onClick={() => (registerPage ? signup() : login())}
                disabled={loading}
                className={`flex w-full justify-center rounded-md bg-indigo-600 disabled:bg-gray-400 disabled:cursor-progress px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {buttonContent()}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {registerPage
              ? "Already have an account?"
              : `Don't have an account?`}{" "}
            <button
              onClick={() => setRegisterPage(!registerPage)}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {registerPage ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
