import { MovementHistoryEvent } from "../../../api/TrackApi";
import { formatDate, formatTime } from "../../../services/date.service";
import styles from "./followedParcelItem.module.scss";

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
        <div className={styles["followed-parcel-container"]}>
            <div>
                <span className={styles["__tracking-number"]}>
                    {trackingNumber}
                </span>
            </div>
            <div>
                <div className={styles["__date-time"]}>
                    <span className={styles["date"]}>
                        {formatDate(eventDate)}
                    </span>
                    <span className={styles["time"]}>
                        {formatTime(eventDate)}
                    </span>
                </div>
                <div className={styles["__event-info"]}>
                    <div className={styles["__vertical-line"]}></div>
                    <p className={styles["__text"]}>
                        {movementHistory.description}
                    </p>
                </div>
            </div>
        </div>
    );
};
