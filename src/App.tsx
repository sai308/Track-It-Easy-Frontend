import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import "./styles/app.scss";

function App() {
    return (
        <Router>
            <div className="header">
                <Header />
            </div>
            <div className="app">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
