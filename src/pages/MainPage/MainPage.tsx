import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { TrackApi, TrackingEvent } from "../../api/TrackApi";
import { TrackList } from "../../components/Track/TrackList/TrackList";
import "./mainPage.scss";

export const MainPage: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [trackingEvent, setTrackingEvent] = useState<TrackingEvent>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingNumber(event.target.value);
    };

    const handleTrack = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await TrackApi.trackParcel(trackingNumber);
            setTrackingEvent(response);
        } catch (error) {
            console.error("Error tracking parcel:", error);
        }
    };

    return (
        <div className="main-container">
            <section className="track-section">
                <div className="track-content">
                    <h1 className="track-title">
                        Відстеження поштових відправлень по Україні
                    </h1>
                    <p className="track-description">
                        Пошук поштових відправлень Нової Пошти, Міст Експрес та
                        інших компаній
                    </p>
                    <form className="track-form" onSubmit={handleTrack}>
                        <Input
                            className="track-input"
                            placeholder="Введіть трек-номер посилки"
                            onChange={handleInputChange}
                            size="lg"
                        />
                        <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            className="tracking-button"
                        >
                            ВІДСТЕЖИТИ
                        </Button>
                    </form>
                </div>
            </section>
            <section className="track-list-section">
                <div className="track-list-content">
                    <h2 className="track-list-title">Останні трекінги</h2>
                </div>
                {trackingEvent && <TrackList trackingEvent={trackingEvent} />}
            </section>
        </div>
    );
};
