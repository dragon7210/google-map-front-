import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminNavbar from "./pages/admin/layout/Navbar";
import Delivery from "./pages/admin/delivery/Delivery";
import Dashboard from "./pages/admin/home/Dashboard";
import AdminLoginPage from "./pages/admin/login/Login";
import SignupPage from "./pages/customer/signup/Signup";
import LoginPage from "./pages/customer/login/Login";
import Home from "./pages/customer/home/home";
import Navbar from "./pages/customer/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/admin" element={<AdminLoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <>
              <AdminNavbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/admin/delivery"
          element={
            <>
              <AdminNavbar />
              <Delivery />
            </>
          }
        />
        <Route exact path="/" element={<LoginPage />} />
        <Route
          exact
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
