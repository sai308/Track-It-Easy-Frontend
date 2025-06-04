import styles from "./trackItem.module.scss";

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
        <div className={`${styles["track-item-container"]} ${data.status}`}>
            <div className={styles["date-time"]}>
                <span className={styles["date"]}>{formatDate(eventDate)}</span>
                <span className={styles["time"]}>{formatTime(eventDate)}</span>
            </div>
            <div className={styles["event-info"]}>
                <div className={styles["vertical-line"]}></div>
                <span className={styles["service-info"]}>
                    <span className={styles["courier-icon"]}>
                        <img src={NovaPoshtaLogo} alt="Courier Icon" />
                    </span>
                    <span className={styles["courier-name"]}>Нова Пошта</span>
                </span>
                <p className={styles["text"]}>{data.description}</p>
            </div>
        </div>
    );
};
