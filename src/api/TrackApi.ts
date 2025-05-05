import API from "../config/axios.config";

export interface Parcel {
    trackingNumber: string;
    status: string;
    factualWeight: number;
    fromLocation: string;
    toLocation: string;
    isFollowed: boolean;
    trackingEvents: MovementHistoryEvent[];
}

export interface MovementHistoryEvent {
    statusLocation: string;
    description: string;
    timestamp: string;
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

        return response.data.data as Parcel;
    },

    followParcel: async (
        trackingNumber: string,
        userId: string
    ): Promise<void> => {
        const response = await API.post("/follow-parcel", {
            trackingNumber: trackingNumber,
            userId: userId,
        });

        console.log("Follow parcel response:", response.data);

        if (!response.data) {
            throw new Error("Failed to follow parcel");
        }
    },

    unfollowParcel: async (
        trackingNumber: string,
        userId: string
    ): Promise<void> => {
        const response = await API.post("/unfollow-parcel", {
            trackingNumber: trackingNumber,
            userId: userId,
        });

        console.log("Unfollow parcel response:", response.data);

        if (!response.data) {
            throw new Error("Failed to unfollow parcel");
        }
    },

    getFollowedParcels: async (userId: string): Promise<Parcel[]> => {
        const response = await API.post("/followed-parcels", {
            userId: userId,
        });

        if (!response.data) {
            throw new Error("Failed to fetch followed parcels");
        }

        return response.data;
    },
};
