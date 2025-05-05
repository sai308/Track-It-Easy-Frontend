import { MovementHistoryEvent } from "../../../api/TrackApi";
import { formatDate, formatTime } from "../../../services/date.service";
import "./followedParcelItem.scss";

interface FollowedParcelItemProps {
    movementHistory: MovementHistoryEvent;
    trackingNumber: string;
}

export const FollowedParcelItem: React.FC<FollowedParcelItemProps> = ({
    movementHistory,
    trackingNumber,
}) => {
    const eventDate = new Date(movementHistory.timestamp);

    return (
        <div className="followed-parcel-container">
            <div>
                <span className="__tracking-number">{trackingNumber}</span>
            </div>
            <div>
                <div className="__date-time">
                    <span className="date">{formatDate(eventDate)}</span>
                    <span className="time">{formatTime(eventDate)}</span>
                </div>
                <div className="__event-info">
                    <div className="__vertical-line"></div>
                    <p className="__text">{movementHistory.description}</p>
                </div>
            </div>
        </div>
    );
};
