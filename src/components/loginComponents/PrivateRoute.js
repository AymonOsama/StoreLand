// src/components/loginComponents/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const user =
        JSON.parse(localStorage.getItem("rememberedUser")) ||
        JSON.parse(sessionStorage.getItem("sessionUser"));

        if (!user) {
            return <Navigate to="/login" replace />;
        }
    return children;
}
