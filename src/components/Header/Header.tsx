import { Image } from "@heroui/react";
import "./header.scss";

export const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header-container">
                <div className="logo">
                    <Image width="250px" alt="logo image" src="/logov2.png" />
                </div>
            </div>
        </div>
    );
};
