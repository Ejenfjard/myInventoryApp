import Image from 'next/image';
import styles from '@/styles/Header.module.css';


const Header = ({ onLogout }) => {

    return (
        <header className={styles.header}>

            <div className={styles.logoAndName}>
                <div className={styles.logo}>
                    <Image
                        src="/images/Logo.png"
                        alt="TechGear Electronics Logo"
                        width={90}
                        height={90}
                    />
                </div>
                <div className={styles.companyName}>
                    TechGear Electronics
                </div>
            </div>

            <button className={styles.logoutButton} onClick={onLogout}>
                Logout
            </button>
        </header>
    );
};

export default Header;


