import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import API from "../../config/axios.config";
import "./registerPage.scss";

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
        setSubmitError(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setSubmitError("Passwords do not match");
            return;
        }

        API.post(`${config.SERVER_URL}/auth/register`, {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        })
            .then((response) => {
                console.log(response.data);
                navigate("/login");
            })
            .catch((err) => {
                setSubmitError(
                    err.response?.data?.message || "Registration failed"
                );
            });
    };

    return (
        <div className="register-container">
            <div className="register-section">
                <div className="image-container">
                    <Image
                        width="400px"
                        alt="Login image"
                        src="/register-image.jpg"
                    />
                </div>
                <div className="form-container">
                    <h1>Create Account</h1>
                    {submitError && (
                        <div className="error-message">{submitError}</div>
                    )}
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Input
                                className="form-input"
                                isRequired
                                placeholder="Username"
                                type="text"
                                value={formData.username}
                                onChange={(e) => handleChange(e, "username")}
                                validate={(value) => {
                                    if (value.length < 3) {
                                        return "Ім'я користувача повинно мати довжину не менше 3 символів";
                                    }
                                    return null;
                                }}
                            />
                            <Input
                                className="form-input"
                                isRequired
                                placeholder="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange(e, "email")}
                            />
                            <Input
                                className="form-input"
                                isRequired
                                placeholder="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange(e, "password")}
                                validate={(value) => {
                                    if (value.length < 6) {
                                        return "Пароль повинен мати довжину не менше 6 символів";
                                    }
                                    return null;
                                }}
                            />
                            <Input
                                className="form-input"
                                isRequired
                                placeholder="Confirm Password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    handleChange(e, "confirmPassword")
                                }
                                validate={(value) => {
                                    if (value !== formData.password) {
                                        return "Паролі не збігаються";
                                    }
                                    return null;
                                }}
                            />
                            <Button
                                className="submit-button"
                                color="primary"
                                type="submit"
                            >
                                Create account
                            </Button>
                        </div>
                    </form>
                    <div className="register-link">
                        <p className="text-sm">Already have an account?</p>
                        <a className="text-sm" href="/login">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
