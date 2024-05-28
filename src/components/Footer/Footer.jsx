import React from "react";
import LogoFooter from "../../assets/logos/footer.svg";
import styles from "./Footer.module.scss";

const Footer = () => (
    <div className={styles.footer}>
        <img className={styles.footer_logo} src={LogoFooter} alt="footer_logo" />
        <div className={styles.footer_container}>
            <p className={styles.footer_details}>
                г. Москва, Цветной б-р, 40 <br />
                +7 495 771 21 11 <br />
                info@skan.ru
            </p>
            <p>Copyright. 2024</p>
        </div>
    </div>
);

export default Footer;