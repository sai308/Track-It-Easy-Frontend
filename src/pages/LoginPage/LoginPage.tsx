import { Button, Image, Input } from "@heroui/react";
import "./loginPage.scss";

export const LoginPage: React.FC = () => {
    return (
        <div className="wrapper">
            <div className="login-container">
                <div className="form-container">
                    <h1>Hello Again!</h1>
                    <form className="login-form">
                        <div className="form-group">
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
                            <Button color="primary" type="submit">
                                Sign in
                            </Button>
                        </div>
                    </form>
                    <div className="flex gap-2 mt-2">
                        <p className="text-sm">Don't have an account?</p>
                        <a className="text-sm" href="/register">
                            Register
                        </a>
                    </div>
                </div>
                <div className="image-container">
                    <Image
                        width="400px"
                        alt="Login image"
                        src="/login-image.jpg"
                    />
                </div>
            </div>
        </div>
    );
};
