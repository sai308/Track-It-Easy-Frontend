import { Header } from "../components/Header/Header";
import { LoginPage } from "../pages/LoginPage/LoginPage";

export const LoginPageLayout: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex-grow">
                <LoginPage />
            </div>
        </div>
    );
};
