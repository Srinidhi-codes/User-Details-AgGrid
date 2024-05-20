import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/Forgotpassword";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";


function App() {
  const { token } = useSelector((state) => state.auth)
  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to='/login' />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to='/' />} />
        <Route path="/forgot-password" element={!token ? <ForgotPassword /> : <Navigate to='/' />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to='/' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
