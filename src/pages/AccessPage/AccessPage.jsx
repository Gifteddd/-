import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UserAccess from "../../components/UserAccess/UserAccess";
import styles from "./AccessPage.module.scss";
import { ReactComponent as PeopleWithKey } from "../../assets/images/people_with_key.svg";

const AccessContent = () => (
    <div className={styles.access_content}>
        <p className={styles.text}>Для оформления подписки на тариф, необходимо авторизоваться.</p>
        <PeopleWithKey className={styles.image_desktop} />
    </div>
);

const AccessPage = () => {
    const isAuth = useSelector(state => state.account.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    return (
        <>
            <Header />
            <main className={styles.access_container}>
                <AccessContent />
                <UserAccess />
                <PeopleWithKey className={styles.image_mobile} />
            </main>
            <Footer />
        </>
    );
};

export default AccessPage;