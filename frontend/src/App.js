import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import SignUp from './pages/signUp/Signup';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
