import api from "./axios";

export default class RequestToApi {
    static async login(login, password) {
        return api.post("/api/v1/account/login", { login, password });
    }

    static async getInfo() {
        return api.get("/api/v1/account/info");
    }

    static async getHistograms(requestData) {
        console.log(requestData)
        return api.post("/api/v1/objectsearch/histograms", requestData, {
            headers: {
                'Content-Type': 'application/json'
            }});
    }

    static async getPublicationsList(requestData) {
        console.log(requestData)
        return api.post("/api/v1/objectsearch", requestData,{
            headers: {
                'Content-Type': 'application/json'
            }});
    }

    static async getDocuments(ids) {
        return api.post("/api/v1/documents", { ids });
    }

    static buildHistogramRequest({
        inn,
        tonality,
        limit,
        selectedStartDate,
        selectedEndDate,
        maxCopmleteness,
        bussinesContext,
        mainRole,
        notice
    }) {
        return {
            intervalType: "month",
            histogramTypes: ["totalDocuments", "riskFactors"],
            issueDateInterval: { startDate: selectedStartDate, endDate: selectedEndDate },
            searchContext: {
                targetSearchEntitiesContext: {
                    targetSearchEntities: [{
                        type: "company",
                        inn,
                        maxFullness: maxCopmleteness,
                        inBusinessNews: bussinesContext
                    }],
                    onlyMainRole: mainRole,
                    tonality,
                    onlyWithRiskFactors: false
                }
            },
            similarMode: "duplicates",
            limit,
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            attributeFilters: {
                excludeTechNews: true,
                excludeAnnouncements: notice,
                excludeDigests: true
            }
        };
    }
}
