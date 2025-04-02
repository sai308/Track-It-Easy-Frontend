import API from "../config/axios.config";

export interface TrackingEvent {
    trackingNumber: string;
    status: string;
    factualWeight: number;
    fromLocation: string;
    toLocation: string;
    movementHistory: MovementHistoryEvent[];
}

interface MovementHistoryEvent {
    statusLocation: string;
    description: string;
    timestamp: string;
}

export const TrackApi = {
    trackParcel: async (trackingNumber: string) => {
        const response = await API.post("/track", {
            trackingNumber: trackingNumber,
        });

        if (!response.data) {
            throw new Error("Failed to fetch tracking information");
        }

        return response.data.data as TrackingEvent;
    },
};
