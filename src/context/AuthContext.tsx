import { AxiosError } from "axios";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import API from "../config/axios.config";

interface User {
    id: string;
    email: string;
    username: string;
    role: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = sessionStorage.getItem("accessToken");

            if (storedToken) {
                try {
                    const response = await API.patch(
                        `${config.SERVER_URL}/auth/refresh`,
                        {},
                        {
                            withCredentials: true,
                        }
                    );

                    const { accessToken, user } = response.data;

                    sessionStorage.setItem("accessToken", accessToken);

                    setToken(accessToken);
                    setUser(user);

                    console.log("Refreshed tokens and user data", user);
                } catch (error) {
                    const axiosError = error as AxiosError;
                    console.error(
                        "Не вдалося оновити токени",
                        axiosError.message
                    );

                    if (axiosError.response?.status === 401) {
                        sessionStorage.removeItem("accessToken");
                    }
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const clearError = () => setError(null);

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            const response = await API.post(`${config.SERVER_URL}/auth/login`, {
                email,
                password,
            });

            const { accessToken, user } = response.data;

            sessionStorage.setItem("accessToken", accessToken);
            setToken(accessToken);
            setUser(user);
            navigate("/");
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Login failed", error);

            if (axiosError.response?.status === 401) {
                setError("Неправильний email або пароль");
            } else {
                setError("Сталася помилка при вході. Спробуйте ще раз.");
            }
            throw error;
        }
    };

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
        error,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
