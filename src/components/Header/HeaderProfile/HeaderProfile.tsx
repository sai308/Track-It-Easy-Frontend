import { config } from "../../../config";
import API from "../../../config/axios.config";
import "./headerProfile.scss";

interface HeaderProfileProps {
    user: {
        id: string;
        username: string;
        email: string;
    };
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ user }) => {
    const handleProfileClick = async () => {
        try {
            await API.post(
                `${config.SERVER_URL}/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="header-profile-container" onClick={handleProfileClick}>
            <div className="header-profile-icon">
                <img src="./user.png" alt="User Icon" />
            </div>
            <span className="header-profile-name">
                <span>{user.username}</span>
            </span>
        </div>
    );
};
