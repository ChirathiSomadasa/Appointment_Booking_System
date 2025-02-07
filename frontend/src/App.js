import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/home/Home';
import SignUp from './pages/signUp/Signup';
import Login from './pages/login/Login';
import Appointment from './pages/appointment/Appointment';
import AppointmentList from './pages/appointment/AppointmentList';
import EditAppointment from './pages/appointment/EditAppointment';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointmentList" element={<AppointmentList />} />
        <Route path="/appointmentEdit" element={<EditAppointment />} />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
