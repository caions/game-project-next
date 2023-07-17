const NoResultsComponent = ({ message }: { message: string }) => {
  return (
    <div
      role="status"
      className="flex items-center space-x-2 justify-center h-screen flex-col"
    >
      <span className="mt-2 text-xl font-medium text-center">{message}</span>
    </div>
  );
};

export default NoResultsComponent;
