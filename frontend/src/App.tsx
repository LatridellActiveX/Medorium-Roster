import MainPage from './pages/main';
import Footer from './layout/footer';
import Header from './layout/header';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/login';
import RegestrationPage from './pages/regestration';
import AdminPanelPage from './pages/adminPanel';

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
]);

const App: React.FC = () => {

    return <>
        <Header />
        <RouterProvider router={router} />
        <Footer />
    </>
};

export default App;