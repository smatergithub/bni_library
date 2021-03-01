const ErrorHandler = error => {
  let message = 'Oops! Something happen, please contact administrator for further information';
  let severity = 'error';

  if (error) {
    if (error.response) {
      // if (error.response.status === 403) {
      //   message = '403 | You have no permission for this request';
      //   severity = 'warning';
      // }

      // if (error.response.status === 401) {
      //   message = '401 | Unauthorized, please login to continue';
      //   severity = 'error';
      // }

      if (error.response.message) {
        message = error.response.message;
      }

      if (error.response.data) {
        if (error.response.data.message) {
          message = error.response.data.message;
        }
      }
    }
  }

  return {
    message,
    severity,
  };
};

export default ErrorHandler;
