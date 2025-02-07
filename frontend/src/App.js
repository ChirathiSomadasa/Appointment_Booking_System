import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import SignUp from './pages/signUp/Signup';
import Login from './pages/login/Login';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
