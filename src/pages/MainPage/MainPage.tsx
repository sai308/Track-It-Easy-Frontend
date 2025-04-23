import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useRef, useState } from "react";
import { TrackApi, TrackingEvent } from "../../api/TrackApi";
import { TrackList } from "../../components/Track/TrackList/TrackList";
import "./mainPage.scss";

import MeestLogo from "../../assets/logos/meest.svg";
import NovaPoshtaLogo from "../../assets/logos/nova-poshta.svg";
import UkrPoshtaLogo from "../../assets/logos/ukrposhta.svg";
import { useAuth } from "../../context/AuthContext";

export const MainPage: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [trackingEvent, setTrackingEvent] = useState<TrackingEvent>();
    const { user } = useAuth();

    const topRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingNumber(event.target.value);
    };

    const handleTrack = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await TrackApi.trackParcel(
                trackingNumber,
                user?.id
            );
            setTrackingEvent(response);
        } catch (error) {
            console.error("Error tracking parcel:", error);
        }
    };

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const partners = [
        {
            id: 1,
            name: "Нова Пошта",
            logo: NovaPoshtaLogo,
            description: "Найбільша приватна поштова служба України",
        },
        {
            id: 2,
            name: "Міст Експрес",
            logo: MeestLogo,
            description: "Міжнародні поштові перевезення",
        },
        {
            id: 3,
            name: "Укрпошта",
            logo: UkrPoshtaLogo,
            description: "Державний поштовий оператор України",
        },
    ];

    const faqItems = [
        {
            id: 1,
            question: "Що таке трек-номер?",
            answer: "Трек-номер - це унікальний ідентифікатор поштового відправлення, який дозволяє відстежувати його рух.",
        },
        {
            id: 2,
            question: "Як відстежити посилку?",
            answer: "Введіть трек-номер у поле пошуку на нашому сайті та натисніть кнопку 'Відстежити'.",
        },
        {
            id: 3,
            question: "Скільки чекати посилку?",
            answer: "Термін доставки залежить від відстані, типу відправлення та поштової служби. Зазвичай це від 1 до 5 днів.",
        },
        {
            id: 4,
            question: "Як дізнатися номер відстеження?",
            answer: "Трек-номер зазвичай надає відправник. Ви можете знайти його у квитанції про оплату або у особистому кабінеті поштової служби.",
        },
    ];

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
                </div>
            </section>

            <section className="track-list-section">
                <div className="track-list-content">
                    <h2 className="track-list-title">Останні трекінги</h2>
                </div>
                {trackingEvent && <TrackList trackingEvent={trackingEvent} />}
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
