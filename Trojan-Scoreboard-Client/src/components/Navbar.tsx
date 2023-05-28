import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';

const Navbar = () => {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link href={`/`}  className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img className="img-responsive" width="70" height="70" src="https://imgur.com/hZxF9RC.png" alt="logo"/>
                        <h1 className={styles.trojanFont}>Trojan 4.0</h1>
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a  className="nav-link px-2 text-secondary"></a></li>
                        <li><a  className="nav-link px-2 text-white"></a></li>
                        <li><a  className="nav-link px-2 text-white"></a></li>
                        <li><a  className="nav-link px-2 text-white"></a></li>
                        <li><a  className="nav-link px-2 text-white"></a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
