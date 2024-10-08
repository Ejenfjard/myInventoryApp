

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/AuthPage/AuthForm.module.css';

const RegisterCard = ({ onSubmit, errorMessage, clearError }) => {
    return (
        <div className={styles.formContainer}>
            <h2>Register Account</h2>
            <form onSubmit={onSubmit}>
                <div className={styles.formField}>
                    <label>
                        Name:
                        <input type="text" name="name" onFocus={clearError} />
                    </label>
                </div>
                <div className={styles.formField}>
                    <label>
                        Email:
                        <input type="email" name="email" onFocus={clearError} />
                    </label>
                </div>
                <div className={styles.formField}>
                    <label>
                        Password:
                        <input type="password" name="password" onFocus={clearError} />
                    </label>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                <div className={styles.loginLink}>
                    <p>Already have an account? <Link href="/login">Go to Login</Link></p>
                </div>
                <button type="submit" className={styles.submitButton}>Register</button>

            </form>
        </div>
    );
};

export default RegisterCard;
