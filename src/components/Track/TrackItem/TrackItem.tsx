import "./trackItem.scss";

import NovaPoshtaLogo from "../../../assets/logos/nova-poshta.svg";
import { formatDate, formatTime } from "../../../services/date.service";

interface TrackEventItemProps {
    status: string;
    description: string;
    timestamp: string;
}

export const TrackItem: React.FC<TrackEventItemProps> = (data) => {
    const eventDate = new Date(data.timestamp);

    return (
        <div className={`track-item-container ${data.status}`}>
            <div className="date-time">
                <span className="date">{formatDate(eventDate)}</span>
                <span className="time">{formatTime(eventDate)}</span>
            </div>
            <div className="event-info">
                <div className="vertical-line"></div>
                <span className="service-info">
                    <span className="courier-icon">
                        <img src={NovaPoshtaLogo} alt="Courier Icon" />
                    </span>
                    <span className="courier-name">Нова Пошта</span>
                </span>
                <p className="text">{data.description}</p>
            </div>
        </div>
    );
};
