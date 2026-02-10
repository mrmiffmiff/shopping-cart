import styles from './Navbar.module.css'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = ({ numItems }) => {
    return (
        <nav className={styles.navbar} aria-label="Main navigation">
            <Link to={{ pathname: "/" }} className={styles.homelink}>GreatShop</Link>
            <Link to={{ pathname: "/shop" }} className={styles.shoplink}>Browse Shop</Link>
            <Link
                to={{ pathname: "/cart" }}
                className={styles.cartlink}
                aria-label={numItems > 0 ? `Shopping cart, ${numItems} items` : "Shopping cart"}
            >
                <ShoppingCart color="#6b6b6b" />
                {numItems > 0 && (
                    <span className={styles.badge} aria-hidden="true" data-testid="cart-badge">
                        {numItems}
                    </span>
                )}
            </Link>
        </nav>
    );
};

export default Navbar;
