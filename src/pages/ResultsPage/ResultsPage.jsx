import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import CheckToken from "../../components/CheckToken";
import { ReactComponent as Pic } from "./picture.svg";
import styles from "./ResultsPage.module.scss";
import ResultCarousel from "../../components/ResultCarousel/ResultCarousel";
import RequestToApi from "../../services/RequestToApi";
import ResultArticles from "../../components/ResultArticles/ResultArticles";

export default function ResultsPage() {
    const histogramLoadedDate = useSelector((state) => state.publications.histogramLoadedDate);
    const publicationsList = useSelector((state) => state.publications.publicationsList);
    const navigate = useNavigate();
    const showMoreBtnRef = useRef();

    const [remainingPublications, setRemainingPublications] = useState(0);
    const [loadedDocs, setLoadedDocs] = useState([]);
    const [isError, setError] = useState(false);

    const onShowMoreBtn = () => {
        loadDocuments(publicationsList.length - remainingPublications + 1, 10, remainingPublications);
    };

    function loadDocuments(indexOf, count = 10, remaining = 10) {
        indexOf--;
        const newRemainingCount = remaining - count;

        if (newRemainingCount > 0) {
            setRemainingPublications(newRemainingCount);
        } else {
            count += newRemainingCount;
            setRemainingPublications(0);
        }

        if (showMoreBtnRef.current && remainingPublications === publicationsList.length)
            showMoreBtnRef.current.disabled = true;

        RequestToApi.getDocuments(publicationsList.slice(indexOf, indexOf + count).map(x => x.encodedId))
            .then(response => {
                console.log(response);
                setLoadedDocs(prevLoadedDocs => prevLoadedDocs.concat(response.data));
                setError(false);
            })
            .catch(() => {
                setLoadedDocs([]);
                setError(true);
            })
            .finally(() => {
                if (showMoreBtnRef.current)
                    showMoreBtnRef.current.disabled = false;
            });
    }

    useEffect(() => {
        if (histogramLoadedDate === null)
            navigate("/");
    }, [histogramLoadedDate, navigate]);

    useEffect(() => {
        if (publicationsList) {
            loadDocuments(1, 10, publicationsList.length);
        }
    }, [publicationsList]);

    return (
        <>
            <CheckToken unauthRedirect="/auth" />
            <Header />
            <main className={styles.resultpage_container}>
                <section className={styles.resultpage_container__first_block}>
                    <div className={styles.first_block__text}>
                        <h1 className={styles.text__h}>Ищем. Скоро <br /> будут результаты</h1>
                        <p className={styles.text__p}>Поиск может занять некоторое время, <br /> просим сохранять терпение.</p>
                    </div>
                    <Pic />
                </section>
                <ResultCarousel />
                {(loadedDocs.length > 0 && !isError) &&
                    <section className={styles.resultpage_container__documents}>
                        <h2 className={styles.documents__h}>Список документов</h2>
                        <div className={styles.documents__articles}>
                            {loadedDocs.map(x => <ResultArticles data={x.ok} key={x.ok.id} />)}
                        </div>
                        <div>
                            {remainingPublications > 0 &&
                                <button className={styles.documents__btn} ref={showMoreBtnRef} onClick={onShowMoreBtn}>Показать больше</button>}
                        </div>
                    </section>
                }
                {isError && (
                    <div className={styles.error_container}>
                        <p className={styles.error_container_p}>ОШИБКА! Результатов не найдено!</p>
                        <Link to="/search" className={styles.error_container_link}>  Вернуться к поиску! </Link>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
