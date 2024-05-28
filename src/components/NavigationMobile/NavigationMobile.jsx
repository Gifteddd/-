import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../storage/actions";
import Limits from "../Statistics/Statistics";
import styles from "./NavigationMobile.module.scss";
import { ReactComponent as LogoHeader } from "../../assets/logos/header.svg";
import { ReactComponent as LogoFooter } from "../../assets/logos/footer.svg";
import { ReactComponent as Mobile } from "../../assets/icons/mobile.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

const NavigationLinks = ({ toggleMenu }) => (
    <nav className={styles.navigation_mobile}>
        <NavLink to="/" className={styles.navigation_mobile_link} onClick={toggleMenu}>
            Главная
        </NavLink>
        <NavLink to="/tariffs" className={styles.navigation_mobile_link} onClick={toggleMenu}>
            Тарифы
        </NavLink>
        <NavLink to="/faq" className={styles.navigation_mobile_link} onClick={toggleMenu}>
            FAQ
        </NavLink>
    </nav>
);

const ActionButton = ({ isAuth, toggleMenu, handleLogout }) => (
    !isAuth ? (
        <button className={styles.btn_action}>
            <Link to="/auth" onClick={toggleMenu} className={styles.btn2__link}>
                Войти
            </Link>
        </button>
    ) : (
        <button className={styles.btn_action} onClick={handleLogout}>
            Выйти
        </button>
    )
);

function NavigationMobile() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const isAuth = useSelector(state => state.account.isAuth);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        dispatch(setAuth(false));
    };

    return (
        <>
            {!isMenuOpen ? (
                <div className={styles.nav_mobile_close}>
                    <LogoHeader className={styles.logo_header} />
                    <Limits />
                    <button className={styles.nav_mobule_close_btn} onClick={toggleMenu}>
                        <Mobile />
                    </button>
                </div>
            ) : (
                <div className={styles.nav_mobile_open}>
                    <div className={styles.nav_mobile_header}>
                        <LogoFooter />
                        <Close className={styles.nav_mobile_btn_close} onClick={toggleMenu} />
                    </div>
                    <NavigationLinks toggleMenu={toggleMenu} />
                    {!isAuth && (
                        <button className={styles.btn_signup}>Зарегистрироваться</button>
                    )}
                    <ActionButton isAuth={isAuth} toggleMenu={toggleMenu} handleLogout={handleLogout} />
                </div>
            )}
        </>
    );
}

export default NavigationMobile;