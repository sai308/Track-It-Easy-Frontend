import { useState } from "react";

interface FormErrors {
    username: string;
    email: string;
    password: string;
    role: string;
}

export const useUserForm = (initialRole = "user") => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(initialRole);
    const [errors, setErrors] = useState<FormErrors>({
        username: "",
        email: "",
        password: "",
        role: "",
    });

    const validate = (): boolean => {
        let valid = true;
        const newErrors = {
            username: "",
            email: "",
            password: "",
            role: "",
        };

        if (!username.trim()) {
            newErrors.username = "Ім'я користувача обов'язкове";
            valid = false;
        } else if (username.length > 50) {
            newErrors.username = "Ім'я не повинно перевищувати 50 символів";
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Email обов'язковий";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Невірний формат email";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Пароль обов'язковий";
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = "Пароль повинен містити щонайменше 6 символів";
            valid = false;
        }

        if (!role) {
            newErrors.role = "Роль обов'язкова";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const reset = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setRole(initialRole);
        setErrors({
            username: "",
            email: "",
            password: "",
            role: "",
        });
    };

    return {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        errors,
        validate,
        reset,
        formData: { username, email, password, role },
    };
};
