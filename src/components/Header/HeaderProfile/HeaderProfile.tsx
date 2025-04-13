import "./headerProfile.scss";

interface HeaderProfileProps {
    user: {
        id: string;
        username: string;
        email: string;
    };
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ user }) => {
    return (
        <div className="header-profile-container">
            <div className="header-profile-icon">
                <img src="./user.png" alt="User Icon" />
            </div>
            <span className="header-profile-name">
                <span>{user.username}</span>
            </span>
        </div>
    );
};
