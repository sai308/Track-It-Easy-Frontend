import { useState } from "react";
import ParcelsList from "../../components/AdminPanel/ParcelsList/ParcelsList";
import UsersList from "../../components/AdminPanel/UsersList/UsersList";
import styles from "./adminPage.module.scss";

type Tab = "users" | "parcels";

export const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("users");

    return (
        <div className={styles["admin-page"]}>
            <div className={styles["admin-page__tabs"]}>
                <button
                    className={
                        styles["admin-page__tab"] +
                        (activeTab === "users"
                            ? " " + styles["admin-page__tab--active"]
                            : "")
                    }
                    onClick={() => setActiveTab("users")}
                >
                    Користувачі
                </button>
                <button
                    className={
                        styles["admin-page__tab"] +
                        (activeTab === "parcels"
                            ? " " + styles["admin-page__tab--active"]
                            : "")
                    }
                    onClick={() => setActiveTab("parcels")}
                >
                    Посилки
                </button>
            </div>

            <div className={styles["admin-page__content"]}>
                {activeTab === "users" && <UsersList />}
                {activeTab === "parcels" && <ParcelsList />}
            </div>
        </div>
    );
};
