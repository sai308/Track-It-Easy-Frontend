import { TrackingEvent } from "../../../api/TrackApi";
import { TrackDetails } from "../TrackDetails/TrackDetails";
import { TrackItem } from "../TrackItem/TrackItem";
import "./trackList.scss";

interface TrackListProps {
    trackingEvent: TrackingEvent;
}

export const TrackList: React.FC<TrackListProps> = ({ trackingEvent }) => {
    const calculateDaysInTransit = () => {
        if (!trackingEvent.movementHistory?.length) return 0;

        const firstDate = new Date(trackingEvent.movementHistory[0].timestamp);
        const lastDate =
            trackingEvent.status === "delivered"
                ? new Date(
                      trackingEvent.movementHistory[
                          trackingEvent.movementHistory.length - 1
                      ].timestamp
                  )
                : new Date();

        return Math.ceil(
            (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
        );
    };

    return (
        <div className="track-list">
            <div className="track-list__content">
                <div className="track-events">
                    {trackingEvent.movementHistory?.map((event, index) => (
                        <TrackItem
                            key={`${event.timestamp}-${index}`}
                            status={event.statusLocation}
                            description={event.description}
                            timestamp={event.timestamp}
                        />
                    ))}
                </div>

                <div className="track-details-wrapper">
                    <TrackDetails
                        package={{
                            trackingNumber: trackingEvent.trackingNumber,
                            daysInTransit: calculateDaysInTransit(),
                            fromLocation: trackingEvent.fromLocation,
                            toLocation: trackingEvent.toLocation,
                            isFollowed: trackingEvent.isFollowed,
                            weight: trackingEvent.factualWeight || 0,
                            status: trackingEvent.status as
                                | "in-transit"
                                | "delivered"
                                | "pending",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
