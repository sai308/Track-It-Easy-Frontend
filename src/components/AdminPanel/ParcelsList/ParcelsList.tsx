import {
    Button,
    Card,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Parcel, TrackApi } from "../../../api/TrackApi";
import "./parcelsList.scss";

const ParcelsList: React.FC = () => {
    const [parcels, setParcels] = useState<Parcel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const columns = [
        { key: "trackingNumber", label: "Трек-номер" },
        { key: "status", label: "Статус" },
        { key: "factualWeight", label: "Вага (кг)" },
        { key: "fromLocation", label: "Звідки" },
        { key: "toLocation", label: "Куди" },
        { key: "actions", label: "Дії" },
    ];

    const statuses = [
        { value: "created", label: "Створено" },
        { value: "in_transit", label: "В дорозі" },
        { value: "delivered", label: "Доставлено" },
        { value: "returned", label: "Повернено" },
    ];

    useEffect(() => {
        const loadParcels = async () => {
            try {
                const data = await TrackApi.getAllParcels();
                setParcels(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Помилка завантаження"
                );
            } finally {
                setLoading(false);
            }
        };

        loadParcels();
    }, []);

    const handleViewDetails = (parcel: Parcel) => {
        setSelectedParcel(parcel);
        onOpen();
    };

    const handleDelete = async (id: string) => {
        try {
            await TrackApi.deleteParcel(id);
            setParcels((prev) => {
                const newParcels = prev.filter((parcel) => parcel.id !== id);
                return newParcels;
            });
        } catch (err) {
            console.error("Error deleting parcel:", err);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-500 p-4">Помилка: {error}</div>;

    return (
        <div className="parcels-list">
            <h1 className="title">Список посилок</h1>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="modal-title">
                                Деталі посилки
                            </ModalHeader>
                            <ModalBody>
                                {selectedParcel && (
                                    <div className="parcel-details">
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                Трек-номер:
                                            </span>
                                            <span>
                                                {selectedParcel.trackingNumber}
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                Статус:
                                            </span>
                                            <Chip
                                                color={
                                                    selectedParcel.status ===
                                                    "Доставлено"
                                                        ? "success"
                                                        : selectedParcel.status ===
                                                          "Повернено"
                                                        ? "danger"
                                                        : "warning"
                                                }
                                                className="status-chip"
                                            >
                                                {statuses.find(
                                                    (s) =>
                                                        s.value ===
                                                        selectedParcel.status
                                                )?.label ||
                                                    selectedParcel.status}
                                            </Chip>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                Вага:
                                            </span>
                                            <span>
                                                {selectedParcel.factualWeight}{" "}
                                                кг
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                Звідки:
                                            </span>
                                            <span>
                                                {selectedParcel.fromLocation}
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                Куди:
                                            </span>
                                            <span>
                                                {selectedParcel.toLocation}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter className="modal-actions">
                                <Button color="primary" onPress={onClose}>
                                    Закрити
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Card>
                <Table aria-label="Таблиця посилок" className="parcels-table">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={parcels}>
                        {(parcel) => (
                            <TableRow key={parcel.id}>
                                {(columnKey) => {
                                    switch (columnKey) {
                                        case "status":
                                            return (
                                                <TableCell>
                                                    <Chip
                                                        color={
                                                            parcel.status ===
                                                            "Доставлено"
                                                                ? "success"
                                                                : parcel.status ===
                                                                  "Повернено"
                                                                ? "danger"
                                                                : "warning"
                                                        }
                                                        className="status-chip"
                                                    >
                                                        {statuses.find(
                                                            (s) =>
                                                                s.value ===
                                                                parcel.status
                                                        )?.label ||
                                                            parcel.status}
                                                    </Chip>
                                                </TableCell>
                                            );
                                        case "actions":
                                            return (
                                                <TableCell className="actions-cell">
                                                    <div className="action-buttons">
                                                        <Button
                                                            size="sm"
                                                            onPress={() =>
                                                                handleViewDetails(
                                                                    parcel
                                                                )
                                                            }
                                                        >
                                                            Деталі
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onPress={() =>
                                                                handleDelete(
                                                                    parcel.id
                                                                )
                                                            }
                                                        >
                                                            Видалити
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            );
                                        case "factualWeight":
                                            return (
                                                <TableCell>
                                                    {parcel.factualWeight} кг
                                                </TableCell>
                                            );
                                        default:
                                            // Render the value for other columns
                                            return (
                                                <TableCell>
                                                    {
                                                        parcel[
                                                            columnKey as keyof Parcel
                                                        ] as React.ReactNode
                                                    }
                                                </TableCell>
                                            );
                                    }
                                }}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default ParcelsList;
