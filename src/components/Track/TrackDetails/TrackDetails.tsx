import { useState } from "react";
import { TrackApi } from "../../../api/TrackApi";
import { useAuth } from "../../../context/AuthContext";
import styles from "./trackDetails.module.scss";

interface PackageDetails {
    trackingNumber: string;
    daysInTransit: number;
    fromLocation: string;
    toLocation: string;
    isFollowed: boolean;
    weight: number;
    status: string;
}

export const TrackDetails: React.FC<{ package: PackageDetails }> = ({
    package: pkg,
}) => {
    const [isFollowed, setIsFollowed] = useState(pkg.isFollowed);
    const [isLoading, setIsLoading] = useState(false);
    const { user, isAuthenticated } = useAuth();

    const handleFollowClick = async () => {
        if (!isAuthenticated || !user) return;

        setIsLoading(true);
        try {
            if (isFollowed) {
                await TrackApi.unfollowParcel(pkg.trackingNumber, user.id);
            } else {
                await TrackApi.followParcel(pkg.trackingNumber, user.id);
            }
            setIsFollowed(!isFollowed);
        } catch (error) {
            console.error("Error following parcel:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles["track-details"]}>
            <div className={styles["track-details__header"]}>
                <h1 className={styles["track-details__number"]}>
                    {pkg.trackingNumber}
                </h1>
                <span className={`track-details__status ${pkg.status}`}>
                    {pkg.status}
                </span>
                {isAuthenticated && (
                    <button
                        className={`follow-parcel__button ${
                            isFollowed ? "saved" : ""
                        } ${isLoading ? "loading" : ""}`}
                        onClick={handleFollowClick}
                        disabled={isLoading}
                        aria-label={
                            isFollowed
                                ? "Прибрати із збережених"
                                : "Зберегти посилку"
                        }
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={isFollowed ? "#ff4757" : "none"}
                            stroke="#ff4757"
                            strokeWidth="2"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                )}
            </div>

            <div className={styles["track-details__info"]}>
                <div className={styles["info-card"]}>
                    <span className={styles["info-card__label"]}>
                        Днів у дорозі:
                    </span>
                    <span className={styles["info-card__value"]}>
                        {pkg.daysInTransit}
                    </span>
                </div>

                <div className={styles["info-card"]}>
                    <span className={styles["info-card__label"]}>
                        Відправник:
                    </span>
                    <span className={styles["info-card__value"]}>
                        {pkg.fromLocation}
                    </span>
                </div>

                <div className={styles["info-card"]}>
                    <span className={styles["info-card__label"]}>
                        Отримувач:
                    </span>
                    <span className={styles["info-card__value"]}>
                        {pkg.toLocation}
                    </span>
                </div>

                <div className={styles["info-card"]}>
                    <span className={styles["info-card__label"]}>Вага:</span>
                    <span className={styles["info-card__value"]}>
                        {pkg.weight}
                    </span>
                </div>
            </div>
        </div>
    );
};
