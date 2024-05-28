import React, { useEffect, useState } from "react";
import { ReactComponent as Rect } from "./rect.svg";
import { Disclosure } from "@headlessui/react";
import styles from "./DateRangeInputs.module.scss";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';

export default function DateRangeInputs({ selectedStartDate, selectedEndDate, setSelectedStartDate, setSelectedEndDate, isError, setError }) {
    const date = new Date();
    const startDate = "Дата начала";
    const endDate = "Дата конца";
    const [startDateTxt, setStartDateTxt] = useState(startDate);
    const [endDateTxt, setEndDateTxt] = useState(endDate);

    const onSelectStartDate = (value) => {
        setSelectedStartDate(value);
        setStartDateTxt(new Intl.DateTimeFormat().format(value));
    };

    const onSelectEndDate = (value) => {
        setSelectedEndDate(value);
        setEndDateTxt(new Intl.DateTimeFormat().format(value));
    };

    useEffect(() => {
        if (startDateTxt !== startDate && endDate !== endDateTxt) {
            if (selectedStartDate > selectedEndDate || selectedStartDate > date || selectedEndDate > date){
                setError(true);
            } else {
                setError(false);
            }
        }
    }, [startDateTxt, endDateTxt, selectedStartDate, selectedEndDate, date, setError]);

    return (
        <>
            {getDatePicker(isError, startDateTxt, startDate, selectedStartDate, onSelectStartDate, "startDate")}
            {getDatePicker(isError, endDateTxt, endDate, selectedEndDate, onSelectEndDate, "endDate")}
        </>
    );
}

function getDatePicker(isError, value, startText, selectedDate, onSelectDate, dayPickerId) {
    return (
        <Disclosure>
            <div className={styles.disclosure__container}>
                <Disclosure.Button className={isError ? styles.error : styles.container__buttons}>
                    {({ open }) => (
                        <>
                            <div className={value !== startText ? styles.btn_date : styles.btn_txt}>{value}</div>
                            <Rect />
                        </>
                    )}
                </Disclosure.Button>
                <Disclosure.Panel>
                    {({ close }) => (
                        <DayPicker id={dayPickerId} mode="single" locale={ru} selected={selectedDate}
                            onSelect={(value) => {
                                onSelectDate(value);
                                close();
                            }}  />
                    )}
                </Disclosure.Panel>
            </div>
        </Disclosure>
    );
}
