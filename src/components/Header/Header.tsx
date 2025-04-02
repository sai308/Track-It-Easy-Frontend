import { Image } from "@heroui/image";
import "./header.scss";

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Image width="250px" alt="logo image" src="/logov2.png" />
                </div>
            </div>
        </header>
    );
};
