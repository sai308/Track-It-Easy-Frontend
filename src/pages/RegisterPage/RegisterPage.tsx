import { Button, Image, Input } from "@heroui/react";
import "./registerPage.scss";

export const RegisterPage: React.FC = () => {
    return (
        <div className="wrapper">
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
                    <form className="register-form">
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
                    <div className="flex gap-2 mt-2">
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
