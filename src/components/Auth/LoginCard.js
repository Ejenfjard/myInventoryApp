// src/components/LoginCard.js
import React from 'react';
import Link from 'next/link';
import styles from '@/styles/AuthPage/AuthForm.module.css';

const LoginCard = ({ onSubmit, errorMessage, clearError, initialEmail, successMessage }) => {
    return (

        <div className={styles.formContainer}>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div className={styles.formField}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            required
                            className={styles.input}
                            defaultValue={initialEmail} // Förifyll e-post
                            onFocus={clearError}
                        />
                    </label>
                </div>
                <div className={styles.formField}>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            required
                            className={styles.input}
                            onFocus={clearError}
                        />
                    </label>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                <div className={styles.buttonField}>
                    <button type="submit" className={styles.submitButton}>Login</button>
                    <Link href="/register" className={styles.registerLink}>
                        Register
                    </Link>
                </div>
            </form>

        </div>
    );
};

export default LoginCard;
