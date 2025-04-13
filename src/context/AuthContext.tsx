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
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
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

    const login = async (email: string, password: string) => {
        try {
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
            console.error("Login failed", error);
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
