import API from "../config/axios.config";

export interface TrackingEvent {
    trackingNumber: string;
    status: string;
    factualWeight: number;
    fromLocation: string;
    toLocation: string;
    isFollowed: boolean;
    movementHistory: MovementHistoryEvent[];
}

interface MovementHistoryEvent {
    statusLocation: string;
    description: string;
    timestamp: string;
}

interface FollowParcelResponse {
    trackingNumber: string;
    userId: string;
}

export const TrackApi = {
    trackParcel: async (trackingNumber: string, userId?: string) => {
        const response = await API.post("/track", {
            trackingNumber: trackingNumber,
            userId: userId,
        });

        if (!response.data) {
            throw new Error("Failed to fetch tracking information");
        }

        return response.data.data as TrackingEvent;
    },

    followParcel: async (trackingNumber: string, userId: string) => {
        const response = await API.post("/follow-parcel", {
            trackingNumber: trackingNumber,
            userId: userId,
        });

        console.log("Follow parcel response:", response.data);

        if (!response.data) {
            throw new Error("Failed to follow parcel");
        }

        return response.data as FollowParcelResponse;
    },

    unfollowParcel: async (trackingNumber: string, userId: string) => {
        const response = await API.post("/unfollow-parcel", {
            trackingNumber: trackingNumber,
            userId: userId,
        });

        console.log("Unfollow parcel response:", response.data);

        if (!response.data) {
            throw new Error("Failed to unfollow parcel");
        }

        return response.data as FollowParcelResponse;
    },
};
