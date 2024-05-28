import React from "react";
import styles from "./Plans.module.scss";
import BeginnerIcon from "../../assets/icons/lamp.svg";
import ProIcon from "../../assets/icons/aim.svg";
import BusinessIcon from "../../assets/icons/laptop.svg";
import Check from "../../assets/icons/check.svg";

const PlanCard = ({ planTitle, planDescription, planPrice, planOldPrice, isCurrentPlan, handleClick, included, planIcon }) => {
    const planStyles = {
        'Beginner': styles.planBeginner,
        'Pro': styles.planPro,
        'Business': styles.planBusiness
    };

    const planClass = planStyles[planTitle] || '';

    return (
        <div className={styles.planCard}>
            <div className={`${styles.planHeader} ${planClass}`}>
                <div className={styles.planTitle}>
                    <h3>{planTitle}</h3>
                    <p>{planDescription}</p>
                </div>
                <div className={styles.planIconContainer}>
                    <img className={styles.planIcon} src={planIcon} alt="icon" />
                </div>
            </div>
            <div className={styles.planDetails}>
                {isCurrentPlan && <div className={styles.currentPlanBadgeContainer}>
                    <div className={styles.currentPlanBadge}>Текущий тариф</div>
                </div>}
                <div className={styles.planPriceContainer}>
                    <div className={styles.planPrices}>
                        <h3>{planPrice} ₽</h3>
                        <div className={styles.oldPrice}>{planOldPrice} ₽</div>
                    </div>
                </div>
                <p>В тариф входит:</p>
                {included.map((item, index) => (
                    <div className={styles.planFeatures}>
                        <img src={Check} alt="зеленая галочка" className={styles.featureIcon} />
                        <p key={index} className={styles.planText}>{item}</p>
                    </div>
                ))}
                <div className={styles.planButtonContainer}>
                    <button className={`${styles.planButton} ${isCurrentPlan ? styles.grey : ''}`} onClick={handleClick}>
                        {isCurrentPlan ? "Перейти в личный кабинет" : "Подробнее"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const PlanCards = ({ currentPlan }) => {
    const plans = [
        {
            planTitle: "Beginner",
            planDescription: "Для HR и фрилансеров",
            planPrice: 799,
            planOldPrice: 1200,
            isCurrentPlan: currentPlan === "Beginner",
            handleClick: () => console.log("Beginner clicked"),
            included: ["1","2","3"],
            planIcon: BeginnerIcon,
        },
        {
            planTitle: "Pro",
            planDescription: "Для небольшого исследования",
            planPrice: 1299,
            planOldPrice: 2600,
            isCurrentPlan: currentPlan === "Pro",
            handleClick: () => console.log("Pro clicked"),
            included: ["1","2","3"],
            planIcon: ProIcon,
        },
        {
            planTitle: "Business",
            planDescription: "Для корпоративных клиентов",
            planPrice: 2379,
            planOldPrice: 3700,
            isCurrentPlan: currentPlan === "Business",
            handleClick: () => console.log("Business clicked"),
            included: ["1","2","3"],
            planIcon: BusinessIcon,
        },
    ];

    return (
        <div className={styles.plansContainer}>
            <div className={styles.planCards}>
                {plans.map((plan, index) => (
                    <PlanCard key={index} {...plan} />
                ))}
            </div>
        </div>
    );
};

export default PlanCards;