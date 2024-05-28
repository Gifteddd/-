import React from "react";
import Slider from "react-slick";
import styles from "./Carousel.module.scss";
import { ReactComponent as Watch } from "../../assets/icons/watch.svg";
import { ReactComponent as Loop } from "../../assets/icons/loupe.svg";
import { ReactComponent as Shield } from "../../assets/icons/shield.svg";
import ArrowRight from "../../assets/icons/arrow_right.png";
import ArrowLeft from "../../assets/icons/arrow_left.png";

const slidesData = [
    {
        icon: <Watch className={styles.slider__icon} />,
        text: "Высокая и оперативная скорость обработки заявки",
    },
    {
        icon: <Loop className={styles.slider__icon} />,
        text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
        icon: <Shield className={styles.slider__icon} />,
        text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
];

const PrevArrow = (props) => (
    <button {...props}>
        <img src={ArrowLeft} alt="arrowPrev" />
    </button>
);

const NextArrow = (props) => (
    <button {...props}>
        <img src={ArrowRight} alt="arrowNext" />
    </button>
);

const Carousel = () => {
    const settings = {
        className: styles.slider,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {slidesData.map((slide, index) => (
                <div key={index} className={styles.slider__container}>
                    {slide.icon}
                    <p className={styles.slider__text}>{slide.text}</p>
                </div>
            ))}
        </Slider>
    );
};

export default Carousel;