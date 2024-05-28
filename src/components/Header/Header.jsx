import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../storage/actions";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import Limits from "../Statistics/Statistics";
import LogoHeader from "../../assets/logos/header.svg";
import Avatar from "../../assets/images/user_avatar.svg";
import styles from "./Header.module.scss";

const Navigation = () => (
    <nav>
        <NavLink to="/" className={styles.navigation_link}>Главная</NavLink>
        <NavLink to="/" className={styles.navigation_link}>Тарифы</NavLink>
        <NavLink to="/" className={styles.navigation_link}>FAQ</NavLink>
    </nav>
);

const ActionButtons = () => (
    <div className={styles.action_buttons}>
        <button className={styles.btn_signup}>Зарегистрироваться</button>
        <div className={styles.divider}></div>
        <button className={styles.btn_signin}>
            <Link to="/auth" className={styles.btn_signin_link}>Войти</Link>
        </button>
    </div>
);

const UserPanel = ({ handleLogout }) => (
    <div className={styles.user_panel_container}>
        <Limits />
        <div className={styles.user_block}>
            <div className={styles.user_details}>
                <p className={styles.user_title}>Алексей А.</p>
                <button className={styles.user_logout} onClick={handleLogout}>Выйти</button>
            </div>
            <img className={styles.user_avatar} src={Avatar} alt="avatar" />
        </div>
    </div>
);

const Header = () => {
    const isAuth = useSelector(state => state.account.isAuth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setAuth(false));
    };

    return (
        <>
            <NavigationMobile />
            <header className={styles.header_container}>
                <img src={LogoHeader} alt="logo" />
                <Navigation />
                {isAuth ? <UserPanel handleLogout={handleLogout} /> : <ActionButtons />}
            </header>
        </>
    );
};

export default Header;