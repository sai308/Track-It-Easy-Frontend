import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./loginPage.module.scss";

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
        <div className={styles["login-container"]}>
            <div className={styles["login-section"]}>
                <div className={styles["form-container"]}>
                    <h1>Hello Again!</h1>
                    {error && (
                        <div className={styles["error-message"]}>
                            {error}
                            <button
                                onClick={clearError}
                                className={styles["close-error"]}
                            >
                                ×
                            </button>
                        </div>
                    )}
                    <form
                        className={styles["login-form"]}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles["form-group"]}>
                            <Input
                                className={styles["form-input"]}
                                isRequired
                                placeholder="Email"
                                type="email"
                                onChange={clearError}
                            />
                            <Input
                                className={styles["form-input"]}
                                isRequired
                                placeholder="Password"
                                type="password"
                                onChange={clearError}
                            />
                            <Button
                                className={styles["submit-button"]}
                                color="primary"
                                type="submit"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                    <div className={styles["register-link"]}>
                        <p className={styles["text-sm"]}>
                            Don't have an account?
                        </p>
                        <a className={styles["text-sm"]} href="/register">
                            Register
                        </a>
                    </div>
                </div>
                <div className={styles["image-container"]}>
                    <Image
                        className={styles["login-image"]}
                        width="400px"
                        alt="Login image"
                        src="/login-image.jpg"
                    />
                </div>
            </div>
        </div>
    );
};
