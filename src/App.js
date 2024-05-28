import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AccessPage/AccessPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import CheckTokenWithoutNavigate from "./components/CheckTokenWithoutNavigate";

function App() {
    return (
        <>
            <CheckTokenWithoutNavigate />
            <BrowserRouter basemname={`/${process.env.PUBLIC_URL}`}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/auth" exact element={<AuthPage />} />
                    <Route path="/results" exact element={<ResultsPage />} />
                    <Route path="/search" exact element={<SearchPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;