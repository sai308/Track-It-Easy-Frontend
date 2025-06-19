import React, { useEffect, useState } from "react";
import { generateApiKey } from "../../api/ApiKeyApi";
import { config } from "../../config";
import { useAuth } from "../../context/AuthContext";
import styles from "./apiPage.module.scss";

const ApiPage: React.FC = () => {
    const { user } = useAuth();
    const [apiKey, setApiKey] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (user && user.apiKey) {
            setApiKey(user.apiKey);
        } else {
            setApiKey("");
        }
    }, [user]);

    const handleGenerateApiKey = async () => {
        if (!user) return;
        setLoading(true);
        setError("");
        try {
            const key = await generateApiKey(user.id);
            setApiKey(key);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            setError("Не вдалося згенерувати API ключ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles["api-page"]}>
            <div className={styles["api-content"]}>
                <h1 className={styles["api-title"]}>
                    Публічне API Track It Easy
                </h1>
                <p className={styles["api-desc"]}>
                    Ви можете інтегруватися з нашим сервісом через REST API для
                    відстеження посилок, реєстрації користувачів, авторизації та
                    інших дій. Всі публічні ендпоінти описані у
                    Swagger-документації.
                </p>
                <ul className={styles["api-list"]}>
                    <li>Відстеження посилок за трек-номером</li>
                    <li>Отримання інформації про статуси</li>
                    <li>Документація у форматі OpenAPI (Swagger)</li>
                </ul>
                <div className={styles["api-actions-row"]}>
                    <a
                        href={config.SERVER_URL + "/docs"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["api-btn"]}
                    >
                        Перейти до Swagger API
                    </a>
                    {user && (
                        <button
                            className={
                                styles["api-btn"] + " " + styles["api-key-btn"]
                            }
                            onClick={handleGenerateApiKey}
                            disabled={loading}
                        >
                            {loading ? "Генеруємо..." : "Згенерувати API ключ"}
                        </button>
                    )}
                </div>
                {user && (
                    <div className={styles["api-key-block"]}>
                        <label className={styles["api-key-label"]}>
                            API ключ
                        </label>
                        <div className={styles["api-key-value-field"]}>
                            {apiKey ? (
                                <code>{apiKey}</code>
                            ) : (
                                <span className={styles["api-key-placeholder"]}>
                                    (Ще не згенеровано)
                                </span>
                            )}
                        </div>
                        {error && (
                            <div className={styles["api-key-error"]}>
                                {error}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApiPage;
