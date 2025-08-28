import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import NewOrderPage from "./pages/Account/neworderpage";
import Home from "./pages/index";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/About/aboutus";
import ProfilePage from "./pages/Account/profilepage";
import SignUp from "./pages/signup";
import LogIn from "./pages/login";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetpassword";
import HowItWorks from "./pages/About/howitworks";
import MyImpactDashboard from "./pages/Account/myimpactboard";
import Commitment from "./pages/ourcommitment";
import OffsetProgram from "./pages/offsetprogram";
import EcoFriendlyTips from "./pages/ecotips";
import ConfirmOrder from "./pages/Account/confirmorder";
import PasswordInputPage from "./pages/password";
import B2BLandingPage from "./pages/business";
import NotFoundPage from "./pages/notfound";
import CompletePage from "./pages/complete";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Footer from "./components/Footer";
import EcoDeliveryDashboard from "./pages/Account/ecodeliverydashboard";

function App() {
  return (
    <AuthProvider>

    <Router>
      <div className="App  bg-gray-100">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about/how-it-works" element={<HowItWorks />} />
          <Route path="/business" element={<B2BLandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/password-input" element={<PasswordInputPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sustainability/commitment" element={<Commitment />} />
          <Route path="/sustainability/offset" element={<OffsetProgram />} />
          <Route path="/sustainability/tips" element={<EcoFriendlyTips />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Protected Routes */}
          <Route
            path="/account/confirm-order"
            element={
              <ProtectedRoutes>
                <ConfirmOrder />
              </ProtectedRoutes>
            }
            />

          <Route
            path="/account/order"
            element={
              <ProtectedRoutes>
                <NewOrderPage />
              </ProtectedRoutes>
            }
            />

          <Route
            path="/account/impact"
            element={
              <ProtectedRoutes>
                <MyImpactDashboard />
              </ProtectedRoutes>
            }
            />

          <Route
            path="/account/dashboard"
            element={
              <ProtectedRoutes>
                <EcoDeliveryDashboard />
              </ProtectedRoutes>
            }
            />
          <Route
            path="/account/profile"
            element={
              <ProtectedRoutes>
                <ProfilePage />
              </ProtectedRoutes>
            }
            />
        </Routes>
        <Footer />
      </div>
    </Router>
  </AuthProvider>
  );
}

export default App;