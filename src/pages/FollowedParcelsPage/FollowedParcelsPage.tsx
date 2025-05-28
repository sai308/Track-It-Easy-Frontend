import React, { useEffect, useState } from "react";
import { Parcel, TrackApi } from "../../api/TrackApi";
import FollowedParcelsList from "../../components/FollowedParcelsList/FollowedParcelsList";
import { useAuth } from "../../context/AuthContext";
import "./followedParcelsPage.scss";

export const FollowedParcelsPage: React.FC = () => {
    const [parcels, setParcels] = useState<Parcel[]>([]);
    const [stats, setStats] = useState({
        active: 0,
        inTransit: 0,
        delivered: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        const fetchFollowedParcels = async () => {
            try {
                setLoading(true);
                const fetchedParcels = await TrackApi.getFollowedParcels(
                    user.id
                );
                setParcels(fetchedParcels);

                // Calculate statistics
                const active = fetchedParcels.length;
                const inTransit = fetchedParcels.filter(
                    (p) => p.status === "В дорозі"
                ).length;
                const delivered = fetchedParcels.filter(
                    (p) => p.status === "Доставлено"
                ).length;

                setStats({ active, inTransit, delivered });
            } catch (err) {
                console.error("Error fetching followed parcels:", err);
                setError("Failed to load parcels. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchFollowedParcels();
    }, [user, authLoading]);

    if (authLoading) {
        return <div className="loading-message">Loading user data...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="followed-parcels-page">
            <header className="page-header">
                <h1>Your Followed Parcels</h1>
                <p className="subtitle">
                    Track all your shipments in one place
                </p>
            </header>

            <div className="content-container">
                <div className="stats-card">
                    <div className="stat-item">
                        <span className="stat-value">{stats.active}</span>
                        <span className="stat-label">Active Shipments</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{stats.inTransit}</span>
                        <span className="stat-label">In Transit</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{stats.delivered}</span>
                        <span className="stat-label">Delivered</span>
                    </div>
                </div>

                <div className="parcels-section">
                    {loading ? (
                        <div className="loading-message">
                            Loading parcels...
                        </div>
                    ) : parcels.length === 0 ? (
                        <div className="empty-state">
                            You're not following any parcels yet.
                        </div>
                    ) : (
                        <FollowedParcelsList parcels={parcels} />
                    )}
                </div>
            </div>
        </div>
    );
};
