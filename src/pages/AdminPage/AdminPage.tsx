import { useState } from "react";
import ParcelsList from "../../components/AdminPanel/ParcelsList/ParcelsList";
import UsersList from "../../components/AdminPanel/UsersList/UsersList";
import "./adminPage.scss";

type Tab = "users" | "parcels";

export const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("users");

    return (
        <div className="admin-page">
            <div className="admin-page__tabs">
                <button
                    className={`admin-page__tab ${
                        activeTab === "users" ? "admin-page__tab--active" : ""
                    }`}
                    onClick={() => setActiveTab("users")}
                >
                    Користувачі
                </button>
                <button
                    className={`admin-page__tab ${
                        activeTab === "parcels" ? "admin-page__tab--active" : ""
                    }`}
                    onClick={() => setActiveTab("parcels")}
                >
                    Посилки
                </button>
            </div>

            <div className="admin-page__content">
                {activeTab === "users" && <UsersList />}
                {activeTab === "parcels" && <ParcelsList />}
            </div>
        </div>
    );
};
