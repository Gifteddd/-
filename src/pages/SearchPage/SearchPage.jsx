import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch

import styles from "./SearchPage.module.scss";
import CompanyINN from '../../components/Search/CompanyINN/CompanyINN';
import Tonality from '../../components/Search/Tonality/Tonality';
import DocumentCount from '../../components/Search/DocumentCount/DocumentCount';
import DateInput from '../../components/Search/DateInput/DateInput';
import CheckboxBlock from '../../components/Search/CheckboxBlock/CheckboxBlock';
import CheckToken from "../../components/CheckToken";
import ManWithLoop from "../../assets/images/man_with_loupe.svg";
import FoldersIcon from "../../assets/icons/folders.svg";
import DocumentIcon from "../../assets/icons/document.svg";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RequestToApi from "../../services/RequestToApi";
import { setHistogram, setHistogramDate, setPublicationsList } from "../../storage/actions";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    inn: '',
    tonality: 'Любая',
    documentCount: '',
    startDate: '',
    endDate: '',
    filters: {
      maxCompleteness: false,
      businessMentions: false,
      mainRole: false,
      riskFactorsOnly: false,
      includeMarketNews: false,
      includeAnnouncements: false,
      includeNewsSummaries: false,
    }
  });

  const [checkboxStates, setCheckboxStates] = useState({
    maxCompleteness: false,
    businessMentions: false,
    mainRole: false,
    riskFactorsOnly: false,
    includeMarketNews: true, 
    includeAnnouncements: true,
    includeNewsSummaries: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const { inn, documentCount, startDate, endDate } = searchParams;
    setIsFormValid(inn && documentCount && startDate && endDate);
  }, [searchParams]);

  const handleCheckboxChange = useCallback((event) => {
    const { name, checked } = event.target;
    setSearchParams(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        [name]: checked,
      }
    }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const { inn, tonality, documentCount, startDate, endDate, filters } = searchParams;
    const tonalityMapping = {
      'Любая': 'any',
      'Позитивная': 'positive',
      'Негативная': 'negative'
    };

    if (isFormValid) {
        const innValue = inn;
        const tonalityValue = tonalityMapping[tonality] || 'any';
        const limit =  Number(documentCount);
        const selectedStartDate = `${startDate}T00:00:00+03:00`
        const selectedEndDate = `${endDate}T23:59:59+03:00`

        const searchParams = {
            issueDateInterval: {
                startDate: selectedStartDate,
                endDate: selectedEndDate
            },
            searchContext: {
              targetSearchEntitiesContext: {
                targetSearchEntities: [{
                  type: "company",
                  sparkId: null,
                  entityId: null,
                  inn: innValue,
                  maxFullness: checkboxStates.maxCompleteness,
                  inBusinessNews: null
                }],
                onlyMainRole: checkboxStates.mainRole,
                tonality: tonalityValue,
                onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
              }
            },
            attributeFilters: {
              excludeTechNews: !checkboxStates.includeMarketNews,
              excludeAnnouncements: !checkboxStates.includeAnnouncements,
              excludeDigests: !checkboxStates.includeNewsSummaries,
            },
            limit: Number(documentCount),
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: ["totalDocuments", "riskFactors"]
          };

        dispatch(setHistogramDate(undefined));
        dispatch(setPublicationsList(undefined));

        navigate("/results");

        try {
            const [histogramResponse, publicationsResponse] = await Promise.all([
                RequestToApi.getHistograms({searchParams}),
                RequestToApi.getPublicationsList({searchParams})
            ]);

            console.log(histogramResponse,publicationsResponse)
            dispatch(setHistogram(histogramResponse));
            dispatch(setPublicationsList(publicationsResponse.data.items));
        } catch (error) {
            console.log("Error: ", error);
        }

      console.log('Отправка запроса на сервер с данными:', { innValue, tonalityValue, limit, selectedStartDate, selectedEndDate });
    } else {
      console.log('Форма не валидна, перенаправление не выполнено.');
    }
  }, [searchParams, isFormValid, navigate, dispatch]);

  
  return (
    <>
      <CheckToken unauthRedirect="/" />
      <Header />
      <main className={styles.requestPage__container}>
        <div className={styles.container__description}>
          <h1 className={styles.description__h}>Найдите необходимые <br /> данные в пару кликов.</h1>
          <img className={styles.description__img} src={DocumentIcon} alt="Document Icon" />
          <p className={styles.description__p}>Задайте параметры поиска. <br /> Чем больше заполните, тем точнее поиск</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.leftPartSearchForm}>
              <CompanyINN inn={searchParams.inn} setInn={(value) => setSearchParams(prevState => ({ ...prevState, inn: value }))} />
              <Tonality tonality={searchParams.tonality} setTonality={(value) => setSearchParams(prevState => ({ ...prevState, tonality: value }))} />
              <DocumentCount documentCount={searchParams.documentCount} setDocumentCount={(value) => setSearchParams(prevState => ({ ...prevState, documentCount: value }))} />
              <DateInput startDate={searchParams.startDate} setStartDate={(value) => setSearchParams(prevState => ({ ...prevState, startDate: value }))} endDate={searchParams.endDate} setEndDate={(value) => setSearchParams(prevState => ({ ...prevState, endDate: value }))} />
            </div>

            <div className={styles.rightPartSearchForm}>
              <CheckboxBlock checkboxStates={searchParams.filters} handleCheckboxChange={handleCheckboxChange} />
              <div className={styles.rightPartSubmitButtonBlock}>
                <button className="button" type="submit" disabled={!isFormValid}>Поиск</button>
                <p className={styles.starMessage}>* Обязательные к заполнению поля</p>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.container__images}>
          <div className={styles.images__box_img}>
            <img className={styles.box_img_document} src={DocumentIcon} alt="Document Icon" />
            <img className={styles.box_img_folders} src={FoldersIcon} alt="Folders Icon" />
          </div>
          <img className={styles.images_man} src={ManWithLoop} alt="Man with Loop" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;