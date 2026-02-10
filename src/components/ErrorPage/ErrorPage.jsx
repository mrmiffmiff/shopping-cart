import styles from './ErrorPage.module.css'
import { Link } from 'react-router'

const ErrorPage = () => {
    return (
        <main className={styles.container}>
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to={{ pathname: "/" }} className={styles.homeLink}>Go back home</Link>
        </main>
    );
};

export default ErrorPage;
