import React, { useEffect, useRef, useState } from "react";
import styles from "./RequestWindow.module.scss";
import 'react-day-picker/dist/style.css';
import DateRangeInputs from "./DateRangeInputs/DateRangeInputs";
import { checkINN } from "./validate";
import RequestToApi from "../../services/RequestToApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHistogram, setHistogramDate, setPublicationsList } from "../../storage/actions";

export default function RequestWindow() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const innInputRef = useRef();
    const quantityInputRef = useRef();
    const btnRequestRef = useRef();

    const [innError, setInnError] = useState(false);
    const [ton, setTon] = useState('any');
    const [quantityError, setQuantityError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [completed, setCompleted] = useState(false);

    const [selectedStartDate, setSelectedStartDate] = useState("Дата начала");
    const [selectedEndDate, setSelectedEndDate] = useState("Дата конца");

    const tonalityOptions = [
        { value: 'any', label: 'Любая' },
        { value: 'negative', label: 'Негативная' },
        { value: 'positive', label: 'Позитивная' }
    ];

    useEffect(() => {
        validateForm();
    }, [innError, quantityError, dateError, selectedStartDate, selectedEndDate]);

    const validateForm = () => {
        const innValue = innInputRef.current.value;
        setCompleted(
            !innError && !quantityError && !dateError &&
            quantityInputRef.current.value &&
            innValue.length >= 10 &&
            selectedStartDate !== "Дата начала" && selectedEndDate !== "Дата конца"
        );
    };

    const handleInnInput = (event) => {
        const inputValue = event.target.value;
        const validationResult = checkINN(inputValue);
        setInnError(inputValue.length >= 10 && !validationResult.result);
        validateForm();
    };

    const handleInnBlur = (event) => {
        const validationResult = checkINN(event.target.value);
        setInnError(!validationResult.result);
        validateForm();
    };

    const handleQuantityInput = (event) => {
        let value = event.target.value;
        value = Math.max(1, Math.min(1000, value));
        setQuantityError(!value);
        validateForm();
    };

    const handleBtnClick = async () => {
        const inn = innInputRef.current.value;
        const tonality = ton;
        const limit = quantityInputRef.current.value;

        btnRequestRef.current.disabled = true;

        dispatch(setHistogramDate(undefined));
        dispatch(setPublicationsList(undefined));

        navigate("/results");

        try {
            const [histogramResponse, publicationsResponse] = await Promise.all([
                RequestToApi.getHistograms(inn, tonality, limit, selectedStartDate, selectedEndDate),
                RequestToApi.getPublicationsList(inn, tonality, limit, selectedStartDate, selectedEndDate)
            ]);

            dispatch(setHistogram(histogramResponse));
            dispatch(setPublicationsList(publicationsResponse.data.items));
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <section className={styles.requestWindow__container}>
            <form className={styles.container__form}>
                <label htmlFor="inn">ИНН компании:</label>
                <input
                    ref={innInputRef}
                    type="number"
                    name="inn"
                    id="inn"
                    min="10"
                    max="10"
                    onBlur={handleInnBlur}
                    onChange={handleInnInput}
                    placeholder="10 цифр"
                    required
                    className={!innError ? styles.inn__input_ok : styles.input_error}
                />
                {innError && <p className={styles.p_error}>Введите корректные данные</p>}

                <label htmlFor="ton">Тональность:</label>
                <select
                    id="ton"
                    value={ton}
                    onChange={(event) => setTon(event.target.value)}
                    className={styles.tonality__select}
                >
                    {tonalityOptions.map((option) => (
                        <option className={styles.select__option} key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <label htmlFor="quantity">Количество документов в выдаче:</label>
                <input
                    ref={quantityInputRef}
                    type="number"
                    name="quantity"
                    id="quantity"
                    min="1"
                    max="1000"
                    onBlur={validateForm}
                    onChange={handleQuantityInput}
                    placeholder="от 1 до 1000"
                    required
                    className={!quantityError ? styles.quantity__input_ok : styles.input_error}
                />
                {quantityError && <p className={styles.p_error}>Введите корректные данные</p>}

                <DateRangeInputs
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    setSelectedStartDate={setSelectedStartDate}
                    setSelectedEndDate={setSelectedEndDate}
                    isError={dateError}
                    setError={setDateError}
                />
                
                <button
                    ref={btnRequestRef}
                    className={styles.secondBlock__btn}
                    onClick={handleBtnClick}
                    disabled={!completed}
                >
                    Поиск
                </button>

                <p className={styles.leftBox__txt}>* Обязательные к заполнению поля</p>
            </form>
        </section>
    );
}