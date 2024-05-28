import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./Statistics.module.scss";
import RequestToApi from "../../services/RequestToApi";
import Loading from "../Loading/Loading";

const Statistics = () => {
    const isAuth = useSelector(state => state.account.isAuth);
    const [limits, setStatistics] = useState(null);

    const fetchStatistics = useCallback(async () => {
        try {
            const res = await RequestToApi.getInfo();
            setStatistics(res.data.eventFiltersInfo);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        if (isAuth) {
            fetchStatistics();
        }
    }, [isAuth, fetchStatistics]);

    const limitsContent = useMemo(() => {
        if (limits === null) {
            return <Loading />;
        }

        return (
            <>
                <div className={styles.statistics_headers}>
                    <p className={styles.statistics_text}>Использовано компаний</p>
                    <p className={styles.statistics_text}>Лимит по компаниям</p>
                </div>
                <div className={styles.statistics_values}>
                    <span className={styles.statistic_available}>{limits.usedCompanyCount}</span>
                    <span className={styles.statistics_limit}>{limits.companyLimit}</span>
                </div>
            </>
        );
    }, [limits]);

    if (!isAuth) return null;

    return (
        <div className={styles.statistics_box}>
            {limitsContent}
        </div>
    );
};

export default Statistics;