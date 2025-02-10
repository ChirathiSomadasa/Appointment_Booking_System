import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/Signup";
import Login from "./pages/login/Login";
import Appointment from "./pages/appointment/Appointment";
import AppointmentList from "./pages/appointment/AppointmentList";
import EditAppointment from "./pages/appointment/EditAppointment";
import Admin from "./pages/admin/Admin";
import UseAuth from "./hooks/UseAuth"; 

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/appointment"
          element={
            <>
              <UseAuth />
              <Appointment />
            </>
          }
        />
        <Route
          path="/appointmentList"
          element={
            <>
              <UseAuth />
              <AppointmentList />
            </>
          }
        />
        <Route
          path="/appointment/edit/:id" // Dynamic route for editing appointments
          element={
            <>
              <UseAuth />
              <EditAppointment />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <UseAuth />
              <Admin />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;