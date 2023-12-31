import MainPage from "./pages/main";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/registration";
import AdminPanelPage from "./pages/adminPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";
import FAQPage from "./pages/FAQ";
import ScrollToHashElement from "./layout/scrollToHashElement";
import RosterPage from "./pages/roster";
import PrivacyPolicyPage from "./pages/privacyPolicy";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LandingPage from "./pages/landing";
import Header from "./layout/header";
import useCurrentUser from "./hooks/useCurrentUser";
import NotFoundPage from "./pages/notFound";

const App: React.FC = () => {
  useAuth();
  let { currentUser } = useCurrentUser();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/adminPanel" element={<AdminPanelPage />} />
        <Route path="/roster" element={<RosterPage />} />

        <Route
          path="/"
          element={currentUser.username ? <MainPage /> : <LandingPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />

        <Route path="/FAQ" element={<FAQPage />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
      <ScrollToHashElement />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
