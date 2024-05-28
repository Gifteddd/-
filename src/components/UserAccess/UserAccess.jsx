import React, { useEffect, useReducer, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../storage/actions";
import RequestToApi from "../../services/RequestToApi";
import styles from "./UserAccess.module.scss";
import { ReactComponent as TabActive } from "../../assets/images/tab_active_underline.svg";
import { ReactComponent as TabDisabled } from "../../assets/images/tab_disabled_underline.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as YandexIcon } from "../../assets/icons/yandex.svg";
import { ReactComponent as Lock } from "../../assets/icons/lock.svg";

const initialState = {
    login: "",
    password: "",
    errors: { login: false, password: false },
    isFormValid: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_LOGIN":
            return { ...state, login: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_ERRORS":
            return { ...state, errors: action.payload };
        case "SET_FORM_VALID":
            return { ...state, isFormValid: action.payload };
        default:
            return state;
    }
}

const validateLogin = (value) => value.trim() !== "";
const validatePassword = (value) => value.trim() !== "";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, dispatchState] = useReducer(reducer, initialState);
    const loginButtonRef = useRef();
    const passwordInputRef = useRef();

    const handleLoginChange = useCallback((e) => {
        const value = e.target.value;
        dispatchState({ type: "SET_LOGIN", payload: value });
        dispatchState({ type: "SET_ERRORS", payload: { ...state.errors, login: !validateLogin(value) } });
    }, [state.errors]);

    const handlePasswordChange = useCallback((e) => {
        const value = e.target.value;
        dispatchState({ type: "SET_PASSWORD", payload: value });
        dispatchState({ type: "SET_ERRORS", payload: { ...state.errors, password: !validatePassword(value) } });
    }, [state.errors]);

    useEffect(() => {
        dispatchState({ type: "SET_FORM_VALID", payload: validateLogin(state.login) && validatePassword(state.password) });
    }, [state.login, state.password]);

    const handleLoginClick = useCallback(async () => {
        loginButtonRef.current.disabled = true;
        try {
            const response = await RequestToApi.login(state.login, state.password);
            dispatch(setAuth(true));
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("expire", response.data.expire);
            navigate("/");
        } catch (error) {
            dispatchState({ type: "SET_ERRORS", payload: { ...state.errors, password: true } });
        } finally {
            loginButtonRef.current.disabled = false;
        }
    }, [dispatch, navigate, state.login, state.password, state.errors]);

    const handleLoginKeyDown = useCallback((e) => {
        if (e.code === "Enter") {
            passwordInputRef.current.focus();
        }
    }, []);

    const handlePasswordKeyDown = useCallback((e) => {
        if (e.code === "Enter") {
            handleLoginClick();
        }
    }, [handleLoginClick]);

    return (
        <article className={styles.access_container}>
            <div className={styles.access_tabs}>
                <div className={styles.btn_tab}>
                    <button className={styles.btn_signin}>Войти</button>
                    <TabActive className={styles.underline} />
                </div>
                <div className={styles.btn_tab}>
                    <button className={styles.btn_signup} disabled>Зарегистрироваться</button>
                    <TabDisabled className={styles.underline} />
                </div>
            </div>
            <form className={styles.form_container}>
                <label htmlFor="login">Логин или номер телефона:</label>
                <input
                    type="text"
                    id="login"
                    placeholder="Логин или +7 (999) 000-00-00"
                    className={state.errors.login ? styles.input_error : ""}
                    required
                    onChange={handleLoginChange}
                    onKeyDown={handleLoginKeyDown}
                />
                {state.errors.login && <span className={styles.validation_error}>Введите корректные данные</span>}
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    className={state.errors.password ? styles.input_error : ""}
                    onChange={handlePasswordChange}
                    onKeyDown={handlePasswordKeyDown}
                    ref={passwordInputRef}
                    required
                />
                {state.errors.password && <span className={styles.validation_error}>Неправильный пароль</span>}
                <button
                    className={styles.btn_submit}
                    ref={loginButtonRef}
                    onClick={handleLoginClick}
                    disabled={!state.isFormValid}
                >
                    Войти
                </button>
                <button className={styles.btn_recovery}>Восстановить пароль</button>
            </form>
            <div className={styles.social_container}>
                <span>Войти через:</span>
                <div className={styles.social_container_buttons}>
                    <button className={styles.btn_social}><GoogleIcon className={styles.svg} /></button>
                    <button className={styles.btn_social}><FacebookIcon className={styles.svg} /></button>
                    <button className={styles.btn_social}><YandexIcon className={styles.svg} /></button>
                </div>
            </div>
            <Lock className={styles.svg_lock} />
        </article>
    );
};

export default SignIn;