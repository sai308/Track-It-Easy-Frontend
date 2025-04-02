import "./trackItem.scss";

interface TrackEventItemProps {
    status: string;
    description: string;
    timestamp: string;
}

export const TrackItem: React.FC<TrackEventItemProps> = (data) => {
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        return date.toLocaleDateString("uk-UA", options);
    };

    const formatTime = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return date.toLocaleTimeString("uk-UA", options);
    };

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
                        <img src="/nova-poshta.svg" alt="Courier Icon" />
                    </span>
                    <span className="courier-name">Нова Пошта</span>
                </span>
                <p className="text">{data.description}</p>
            </div>
        </div>
    );
};
