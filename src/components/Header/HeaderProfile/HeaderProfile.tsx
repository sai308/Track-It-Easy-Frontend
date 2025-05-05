import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./headerProfile.scss";

interface HeaderProfileProps {
    user: {
        id: string;
        username: string;
        email: string;
    };
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            logout();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleFollowedParcels = () => {
        navigate("/followed-parcels");
        setIsDropdownOpen(false);
    };

    return (
        <div className="header-profile-container" ref={dropdownRef}>
            <div className="profile-trigger" onClick={toggleDropdown}>
                <div className="header-profile-icon">
                    <img src="./user.png" alt="User Icon" />
                </div>
                <span className="header-profile-name">
                    <span>{user.username}</span>
                </span>
            </div>

            <div className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`}>
                <div className="dropdown-item" onClick={handleFollowedParcels}>
                    Followed Parcels
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    );
};
