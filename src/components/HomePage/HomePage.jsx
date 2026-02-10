import styles from './HomePage.module.css'
import { Link } from 'react-router'

const HomePage = () => {
    return (
        <main className={styles.container}>
            <img
                src="https://picsum.photos/seed/GreatShop/800/400"
                alt=""
                className={styles.hero}
            />
            <h1>Experience incredible shopping through our platform</h1>
            <Link to={{ pathname: "/shop" }} className={styles.shopLink}>Start Shopping</Link>
        </main>
    );
};

export default HomePage;
