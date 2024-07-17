import React, { useMemo } from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  const errorData = useMemo(() => {
    if (isRouteErrorResponse(error)) {
      return error.statusText;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return null;
  }, [error]);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured </p>
      <p>
        {errorData} && <i>{errorData}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
