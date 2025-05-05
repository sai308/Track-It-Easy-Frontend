import React from "react";
import { Parcel } from "../../api/TrackApi";
import { FollowedParcelItem } from "./FollowedParcelItem/FollowedParcelItem";

interface FollowedParcelsListProps {
    parcels: Parcel[];
}

const FollowedParcelsList: React.FC<FollowedParcelsListProps> = ({
    parcels,
}) => {
    return (
        <div className="followed-parcels-list">
            <h2>Followed Parcels</h2>
            <ul className="parcels-list">
                {parcels.map((parcel) => {
                    const currentEvent = parcel.trackingEvents.find(
                        (event) => event.statusLocation === "now"
                    );

                    if (!currentEvent) return null;

                    return (
                        <li key={parcel.trackingNumber} className="parcel-item">
                            <FollowedParcelItem
                                trackingNumber={parcel.trackingNumber}
                                movementHistory={currentEvent}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FollowedParcelsList;
