import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="p-2">
                <Outlet />
            </main>
        </div>
    );
};