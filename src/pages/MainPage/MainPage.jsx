import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";
import Plans from "../../components/Plans/Plans";
import ImageTop from "../../assets/images/image_buttons.svg";
import ImageMiddle from "../../assets/images/image_accept.svg";
import styles from "./MainPage.module.scss";

const SearchButton = ({ isAuth }) => (
    isAuth ? (
        <Link to="/search" className={styles.btn_search}>
            Запросить данные
        </Link>
    ) : null
);

const MainPage = () => {
    const { isAuth, plan } = useSelector(state => state.account);

    return (
        <>
            <Header />
            <main className={styles.main_container}>
                <section className={styles.first_section}>
                    <div className={styles.first_section_content}>
                        <h1 className={styles.first_section_title}>
                            Сервис по поиску публикаций о компании по его ИНН
                        </h1>
                        <p className={styles.first_section_description}>
                            Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                        </p>
                        <SearchButton isAuth={isAuth} />
                    </div>
                    <div>
                        <img className={styles.image_top} src={ImageTop} alt="top" />
                    </div>
                </section>
                <section className={styles.second_section}>
                    <h2 className={styles.second_section_title}>Почему именно мы</h2>
                    <Carousel />
                    <img className={styles.image_middle} src={ImageMiddle} alt="middle" />
                </section>
                <section className={styles.plans}>
                    <h2 className={styles.plans_title}>Наши тарифы</h2>
                    <Plans current={isAuth && plan === 1} />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default MainPage;