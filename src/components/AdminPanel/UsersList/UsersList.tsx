import {
    Button,
    Card,
    Chip,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
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
import {
    createUser,
    deleteUser,
    fetchUsers,
    updateUser,
    User,
} from "../../../api/UserApi";
import { useAuth } from "../../../context/AuthContext";
import { useUserForm } from "../../../hooks/useUserForm";
import "./usersList.scss";

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const form = useUserForm("user");
    const { user: currentUser } = useAuth();

    const columns = [
        { key: "username", label: "Ім'я користувача" },
        { key: "email", label: "Email" },
        { key: "role", label: "Роль" },
        { key: "createdAt", label: "Дата створення" },
        { key: "actions", label: "Дії" },
    ];

    const roles = [
        { value: "user", label: "Користувач" },
        { value: "admin", label: "Адміністратор" },
    ];

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Помилка завантаження"
                );
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleCreateUser = async () => {
        if (!form.validate()) return;

        try {
            const newUser = await createUser(form.formData);
            setUsers((prev) => [...prev, newUser]);
            form.reset();
        } catch (err) {
            console.error("Error creating user:", err);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        onOpen();
    };

    const handleUpdateUser = async (onClose: () => void) => {
        if (!editingUser) return;

        try {
            const updatedUser = await updateUser(editingUser.id, {
                username: editingUser.username,
                email: editingUser.email,
                role: editingUser.role,
            });

            setUsers(
                users.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
            onClose();
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-500 p-4">Помилка: {error}</div>;

    return (
        <div className="users-list">
            <h1 className="title">Керування користувачами</h1>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="modal-title">
                                Редагувати користувача
                            </ModalHeader>
                            <ModalBody>
                                {editingUser && (
                                    <div className="modal-form">
                                        <Input
                                            label="Ім'я користувача"
                                            value={editingUser.username}
                                            onChange={(e) =>
                                                setEditingUser({
                                                    ...editingUser,
                                                    username: e.target.value,
                                                })
                                            }
                                        />

                                        <Input
                                            label="Email"
                                            value={editingUser.email}
                                            onChange={(e) =>
                                                setEditingUser({
                                                    ...editingUser,
                                                    email: e.target.value,
                                                })
                                            }
                                        />

                                        <Select
                                            label="Роль"
                                            selectedKeys={[editingUser.role]}
                                            onSelectionChange={(keys) =>
                                                setEditingUser({
                                                    ...editingUser,
                                                    role: Array.from(
                                                        keys
                                                    )[0] as string,
                                                })
                                            }
                                        >
                                            {roles.map((role) => (
                                                <SelectItem key={role.value}>
                                                    {role.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter className="modal-actions">
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Скасувати
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => handleUpdateUser(onClose)}
                                >
                                    Зберегти
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Card title="Додати нового користувача" className="add-user-card">
                <div className="form-grid">
                    <Input
                        label="Ім'я користувача"
                        value={form.username}
                        onChange={(e) => form.setUsername(e.target.value)}
                        errorMessage={form.errors.username}
                        isRequired
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => form.setEmail(e.target.value)}
                        errorMessage={form.errors.email}
                        isRequired
                    />

                    <Input
                        label="Пароль"
                        type="password"
                        value={form.password}
                        onChange={(e) => form.setPassword(e.target.value)}
                        errorMessage={form.errors.password}
                        isRequired
                    />

                    <Select
                        label="Роль"
                        selectedKeys={[form.role]}
                        onSelectionChange={(keys) =>
                            form.setRole(Array.from(keys)[0] as string)
                        }
                    >
                        {roles.map((role) => (
                            <SelectItem key={role.value}>
                                {role.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <Button
                    color="primary"
                    onPress={handleCreateUser}
                    className="add-button"
                >
                    Додати користувача
                </Button>
            </Card>

            <Card>
                <Table
                    aria-label="Таблиця користувачів"
                    className="users-table"
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={users}>
                        {(user) => (
                            <TableRow key={user.id}>
                                {(columnKey) => {
                                    switch (columnKey) {
                                        case "role":
                                            return (
                                                <TableCell>
                                                    <Chip
                                                        color={
                                                            user.role ===
                                                            "admin"
                                                                ? "danger"
                                                                : "success"
                                                        }
                                                        className="role-chip"
                                                    >
                                                        {user.role}
                                                    </Chip>
                                                </TableCell>
                                            );
                                        case "createdAt":
                                            return (
                                                <TableCell>
                                                    {new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                            );
                                        case "actions":
                                            return (
                                                <TableCell className="actions-cell">
                                                    <div className="action-buttons">
                                                        <Button
                                                            size="sm"
                                                            onPress={() =>
                                                                handleEdit(user)
                                                            }
                                                        >
                                                            Редагувати
                                                        </Button>
                                                        {currentUser?.id ===
                                                        user.id ? null : (
                                                            <Button
                                                                size="sm"
                                                                color="danger"
                                                                onPress={() =>
                                                                    handleDelete(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Видалити
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            );
                                        default:
                                            return (
                                                <TableCell>
                                                    {
                                                        user[
                                                            columnKey as keyof User
                                                        ]
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

export default UsersList;
