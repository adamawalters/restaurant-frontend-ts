
/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

export type ErrorAlertProps = {
  error: {message: string} | null
}

function ErrorAlert({ error}: ErrorAlertProps) {
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}



export default ErrorAlert;
