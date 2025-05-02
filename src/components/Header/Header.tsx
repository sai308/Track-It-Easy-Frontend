import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PanelSwitch from "../AdminPanel/PanelSwitch/PanelSwitch";
import "./header.scss";
import { HeaderProfile } from "./HeaderProfile/HeaderProfile";

export const Header: React.FC = () => {
    const { isAuthenticated, loading, user } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return null;
    }

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Image width="250px" alt="logo image" src="/logov2.png" />
                </div>
                <div className="user-container">
                    <div className="admin-panel">
                        <PanelSwitch />
                    </div>
                    <div className="profile">
                        {isAuthenticated && user ? (
                            <HeaderProfile user={user} />
                        ) : (
                            <div className="auth-buttons">
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
