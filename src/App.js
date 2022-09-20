import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Delivery from "./pages/delivery/Delivery";
import Dashboard from "./pages/home/Dashboard";
import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/delivery"
          element={
            <>
              <Navbar />
              <Delivery />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
