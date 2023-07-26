import MainPage from './pages/main';
import Footer from './layout/footer';
import Header from './layout/header';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/login';
import RegestrationPage from './pages/regestration';
import AdminPanelPage from './pages/adminPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth';
import ProfilePage from './pages/profile';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/regestration",
        element: <RegestrationPage />,
    },
    {
        path: "/adminPanel",
        element: <AdminPanelPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
]);

const App: React.FC = () => {
    useAuth();

    return <>
        <Header />
        <RouterProvider router={router} />
        <Footer />

        <ToastContainer
            position="bottom-right"
        />
    </>
};

export default App;