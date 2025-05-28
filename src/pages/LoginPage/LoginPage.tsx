import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./loginPage.scss";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, error, clearError } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = (form[0] as HTMLInputElement).value;
        const password = (form[1] as HTMLInputElement).value;

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-section">
                <div className="form-container">
                    <h1>Hello Again!</h1>
                    {error && (
                        <div className="error-message">
                            {error}
                            <button
                                onClick={clearError}
                                className="close-error"
                            >
                                ×
                            </button>
                        </div>
                    )}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Input
                                className="form-input"
                                isRequired
                                placeholder="Email"
                                type="email"
                                onChange={clearError}
                            />
                            <Input
                                className="form-input"
                                isRequired
                                placeholder="Password"
                                type="password"
                                onChange={clearError}
                            />
                            <Button
                                className="submit-button"
                                color="primary"
                                type="submit"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                    <div className="register-link">
                        <p className="text-sm">Don't have an account?</p>
                        <a className="text-sm" href="/register">
                            Register
                        </a>
                    </div>
                </div>
                <div className="image-container">
                    <Image
                        className="login-image"
                        width="400px"
                        alt="Login image"
                        src="/login-image.jpg"
                    />
                </div>
            </div>
        </div>
    );
};
