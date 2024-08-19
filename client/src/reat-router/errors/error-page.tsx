import { useRouteError } from 'react-router-dom'
import * as styles from './error-page.css'

export function ErrorPage() {
  const error = useRouteError()

  return (
    <div className={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}