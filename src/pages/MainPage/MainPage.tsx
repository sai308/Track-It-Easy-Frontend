import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useRef, useState } from "react";
import { Parcel, TrackApi } from "../../api/TrackApi";
import { TrackList } from "../../components/Track/TrackList/TrackList";
import "./mainPage.scss";

import { faqItems } from "../../data/faq";
import { partners } from "../../data/partners";

import { useAuth } from "../../context/AuthContext";

export const MainPage: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [parcel, setParcel] = useState<Parcel>();

    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const topRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingNumber(event.target.value);
    };

    const handleTrack = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await TrackApi.trackParcel(
                trackingNumber,
                user?.id
            );
            setParcel(response);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error tracking parcel:", error);
            if (error.response?.status === 409) {
                setError(
                    "Для відстеження цієї посилки необхідно увійти в аккаунт"
                );
            } else {
                setError("Помилка при відстеженні посилки. Спробуйте пізніше.");
            }
        }
    };

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="main-container">
            <section ref={topRef} className="track-section">
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
                    {error && <div className="error-message">{error}</div>}
                </div>
            </section>

            <section className="track-list-section">
                <div className="track-list-content">
                    <h2 className="track-list-title">Останні трекінги</h2>
                </div>
                {parcel && <TrackList parcel={parcel} />}
            </section>

            <section className="partners-section">
                <div className="partners-content">
                    <h2 className="partners-title">Наші партнери</h2>
                    <div className="partners-grid">
                        {partners.map((partner) => (
                            <div key={partner.id} className="partner-card">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="partner-logo"
                                />
                                <h3 className="partner-name">{partner.name}</h3>
                                <p className="partner-description">
                                    {partner.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="faq-section">
                <div className="faq-content">
                    <h2 className="faq-title">Довідкова інформація</h2>
                    <div className="faq-grid">
                        {faqItems.map((item) => (
                            <div key={item.id} className="faq-card">
                                <h3 className="faq-question">
                                    {item.question}
                                </h3>
                                <p className="faq-answer">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="track-again-section">
                <div className="track-again-content">
                    <h2 className="track-again-title">
                        Відстежте вашу посилку
                    </h2>
                    <p className="track-again-text">
                        На цьому сайті можна простежити посилку, міжнародне
                        відправлення та вантаж по Україні. Для цього введіть у
                        поле вище трек-номер, або натисніть кнопку «Відстежити».
                    </p>
                    <Button
                        color="primary"
                        size="lg"
                        className="track-again-button"
                        onPress={scrollToTop}
                    >
                        ВІДСТЕЖИТИ
                    </Button>
                </div>
            </section>
        </div>
    );
};
