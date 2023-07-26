import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import classes from './ErrorPage.module.scss'


export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className={classes.error_page}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
      <i>{isRouteErrorResponse(error) ? (error.status || error.statusText) : "Unknown Error"}</i>
      </p>
    </div>
  )
}
