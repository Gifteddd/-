import { combineReducers } from 'redux';
import { ACTIONS } from './actions';

// Используем объект для исходного состояния аккаунта
const initialAccountState = {
    isAuth: false,
    tariff: 1,
    usedCompanyCount: undefined,
    companyLimit: undefined
};

// Редуктор для управления состоянием аккаунта
function account(state = initialAccountState, action) {
    switch (action.type) {
        case ACTIONS.SET_AUTH: {
            // Удаляем токен и срок его действия при выходе из системы
            if (!action.payload) {
                localStorage.removeItem("token");
                localStorage.removeItem("expire");
            }
            // Обновляем состояние аккаунта
            return {
                ...state,
                isAuth: action.payload,
                usedCompanyCount: action.payload ? state.usedCompanyCount : undefined,
                companyLimit: action.payload ? state.companyLimit : undefined
            };
        }
        case ACTIONS.SET_TARIFF:
            return {
                ...state,
                tariff: action.payload // Фиксируем payload, а не number
            };
        case ACTIONS.SET_ACCOUNT_INFO:
            return {
                ...state,
                usedCompanyCount: action.usedCompanyCount,
                companyLimit: action.companyLimit
            };
        default:
            return state;
    }
}

// Используем объект для исходного состояния публикаций
const initialPublicationsState = {
    histogram: JSON.parse(localStorage.getItem("histogram")),
    histogramLoadedDate: JSON.parse(localStorage.getItem("histogramLoadDate")),
    publicationsList: JSON.parse(localStorage.getItem("publicationsList"))
};

// Редуктор для управления состоянием публикаций
function publications(state = initialPublicationsState, action) {
    switch (action.type) {
        case ACTIONS.SET_HISTOGRAM:
            const { data } = action.response; // Деструктуризация объекта ответа
            const histogramData = data.map(item => ({
                date: item.date,
                total: item.data[0].value,
                riskFactors: item.data[1].value
            }));
            localStorage.setItem("histogram", JSON.stringify(histogramData));
            localStorage.setItem("histogramLoadDate", JSON.stringify(new Date()));
            return {
                ...state,
                histogram: histogramData,
                histogramLoadedDate: new Date()
            };
        case ACTIONS.SET_HISTOGRAM_DATE:
            return {
                ...state,
                histogramLoadedDate: action.date
            };
        case ACTIONS.SET_PUBLICATIONS_LIST:
            if (action.list === undefined)
                localStorage.removeItem("publicationsList");
            else
                localStorage.setItem("publicationsList", JSON.stringify(action.list));
            return {
                ...state,
                publicationsList: action.list
            };
        default:
            return state;
    }
}

// Комбинируем редукторы и экспортируем
const reducers = combineReducers({
    account,
    publications
});

export default reducers;
