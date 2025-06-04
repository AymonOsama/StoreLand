// src/layouts/PrivateLayout.jsx
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
                <main className="flex-grow">
                    <Outlet />
                </main>
            <Footer />
        </div>
    );
}
