import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import API from "../../config/axios.config";
import "./registerPage.scss";

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const username = (form[0] as HTMLInputElement).value;
        const email = (form[1] as HTMLInputElement).value;
        const password = (form[2] as HTMLInputElement).value;
        const confirmPassword = (form[3] as HTMLInputElement).value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        API.post(`${config.SERVER_URL}/auth/register`, {
            username,
            email,
            password,
        }).then((response) => {
            console.log(response.data);
            navigate("/login");
        });
    };

    return (
        <div className="container">
            <div className="register-container">
                <div className="image-container">
                    <Image
                        width="400px"
                        alt="Login image"
                        src="/register-image.jpg"
                    />
                </div>
                <div className="form-container">
                    <h1>Create Account</h1>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Input
                                isRequired
                                placeholder="Username"
                                type="text"
                            />
                            <Input
                                isRequired
                                placeholder="Email"
                                type="email"
                            />
                            <Input
                                isRequired
                                placeholder="Password"
                                type="password"
                            />
                            <Input
                                isRequired
                                placeholder="Confirm Password"
                                type="password"
                            />
                            <Button color="primary" type="submit">
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
