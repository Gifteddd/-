export const ACTIONS = {
    SET_AUTH: "SET_AUTH",
    SET_TARIFF: "SET_TARIFF",
    SET_ACCOUNT_INFO: "SET_ACCOUNT_INFO",
    SET_HISTOGRAM: "SET_HISTOGRAM",
    SET_HISTOGRAM_DATE: "SET_HISTOGRAM_DATE",
    SET_PUBLICATIONS_LIST: "SET_PUBLICATIONS_LIST"
};

export const setAuth = bool => ({ type: ACTIONS.SET_AUTH, payload: bool });

export const setTariff = number => ({ type: ACTIONS.SET_TARIFF, payload: number });

export const setAccountInfo = (usedCompanyCount, companyLimit) => ({
    type: ACTIONS.SET_ACCOUNT_INFO,
    usedCompanyCount,
    companyLimit
});

export const setHistogram = response => ({ type: ACTIONS.SET_HISTOGRAM, response });

export const setHistogramDate = date => ({ type: ACTIONS.SET_HISTOGRAM_DATE, date });

export const setPublicationsList = list => ({ type: ACTIONS.SET_PUBLICATIONS_LIST, list });
