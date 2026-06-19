const ErrorMessage = ({ message }) => {
  return (
    <>
      {message && (
        <span className="text-red-500 text-xs italic">{message}</span>
      )}
    </>
  );
};

export default ErrorMessage;
