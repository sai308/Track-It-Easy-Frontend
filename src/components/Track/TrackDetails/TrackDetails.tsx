import "./trackDetails.scss";

interface PackageDetails {
    trackingNumber: string;
    daysInTransit: number;
    fromLocation: string;
    toLocation: string;
    weight: number;
    status: string;
}

export const TrackDetails: React.FC<{ package: PackageDetails }> = ({
    package: pkg,
}) => {
    return (
        <div className="track-details">
            <div className="track-details__header">
                <h1 className="track-details__number">{pkg.trackingNumber}</h1>
                <span className={`track-details__status ${pkg.status}`}>
                    {pkg.status}
                </span>
            </div>

            <div className="track-details__info">
                <div className="info-card">
                    <span className="info-card__label">Днів у дорозі:</span>
                    <span className="info-card__value">
                        {pkg.daysInTransit}
                    </span>
                </div>

                <div className="info-card">
                    <span className="info-card__label">Відправник:</span>
                    <span className="info-card__value">{pkg.fromLocation}</span>
                </div>

                <div className="info-card">
                    <span className="info-card__label">Отримувач:</span>
                    <span className="info-card__value">{pkg.toLocation}</span>
                </div>

                <div className="info-card">
                    <span className="info-card__label">Вага:</span>
                    <span className="info-card__value">{pkg.weight}</span>
                </div>
            </div>
        </div>
    );
};
