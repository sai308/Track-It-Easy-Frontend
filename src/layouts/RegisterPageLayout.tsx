import { Header } from "../components/Header/Header";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";

export const RegisterPageLayout: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex-grow">
                <RegisterPage />
            </div>
        </div>
    );
};
