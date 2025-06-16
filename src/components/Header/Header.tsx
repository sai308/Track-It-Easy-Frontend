import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PanelSwitch from "../AdminPanel/PanelSwitch/PanelSwitch";
import styles from "./header.module.scss";
import { HeaderProfile } from "./HeaderProfile/HeaderProfile";

export const Header: React.FC = () => {
    const { isAuthenticated, loading, user } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return null;
    }

    return (
        <header className={styles["header"]}>
            <div className={styles["header-container"]}>
                <div className={styles["logo"]}>
                    <Image
                        onClick={() => navigate("/")}
                        width="250px"
                        alt="logo image"
                        src="/logov2.png"
                    />
                </div>
                <div className={styles["user-container"]}>
                    <div className={styles["admin-panel"]}>
                        <PanelSwitch />
                    </div>
                    <div className={styles["profile"]}>
                        {isAuthenticated && user ? (
                            <HeaderProfile user={user} />
                        ) : (
                            <div className={styles["auth-buttons"]}>
                                <Button
                                    variant="bordered"
                                    onPress={() => navigate("/login")}
                                    color="primary"
                                    size="lg"
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="solid"
                                    onPress={() => navigate("/register")}
                                    color="primary"
                                    size="lg"
                                >
                                    Register
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
