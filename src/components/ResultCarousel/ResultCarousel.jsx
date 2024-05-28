import React from "react";
import Slider from "react-slick";
import rightArrow from "../../assets/icons/arrow_right.png";
import leftArrow from "../../assets/icons/arrow_left.png";
import styles from "./ResultCarousel.module.scss";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

export default function ResultCarousel() {
    const histograms = useSelector(state => state.publications.histogram);
    const histogramLoadDate = useSelector(state => state.publications.histogramLoadedDate);
    const publications = useSelector(state => state.publications.publicationsList);

    const PrevArrow = ({ onClick }) => (
        <button className={styles.arrowButton} onClick={onClick}>
            <img src={leftArrow} className={styles.leftArrow} alt="arrowPrev" />
        </button>
    );

    const NextArrow = ({ onClick }) => (
        <button className={styles.arrowButton} onClick={onClick}>
            <img src={rightArrow} className={styles.rightArrow} alt="arrowNext" />
        </button>
    );

    const slider_settings = {
        className: styles.slider,
        infinite: false,
        speed: 500,
        variableWidth: true,
        swipe: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    speed: 400,
                    slidesToShow: 1,
                    variableWidth: false
                }
            }
        ]
    };

    let headers = (
        <div className={styles.slider_container__header}>
            <p className={styles.header__p}>Период</p>
            <p>Всего</p>
            <p>Риски</p>
        </div>
    );

    if (!publications?.length) {
        headers = "";
    }

    return (
        <div className={styles.slider_container}>
            <h2 className={styles.slider_container__h2}>Общая сводка</h2>
            <div className={styles.slider_container__variants}>
                <span>Найдено <span>{publications?.length || "0"}</span> вариантов</span>
            </div>
            {headers}
            {histogramLoadDate && (
                <Slider {...slider_settings}>
                    {histograms.map(x => (
                        <div className={styles.item} key={x.date}>
                            <div className={styles.item__wrapper}>
                                <span>{new Date(x.date).toLocaleDateString().replace("/", ".")}</span>
                                <span>{x.total}</span>
                                <span>{x.riskFactors}</span>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
            {!histogramLoadDate && <Loading />}
        </div>
    );
}
