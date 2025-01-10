import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import NavBar from "./components/NavBar";
import ProfilePage from "./pages/profile";
import IncomesPage from "./pages/incomes";
import OutcomesPage from "./pages/outcomes";
import CategoriesPage from "./pages/categories";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavPaths = ["/", "/register"];

  return (
    <div className="App">
      {!hideNavPaths.includes(location.pathname) && <NavBar/>}
      
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/incomes" element={<IncomesPage />} /> 
        <Route path="/outcomes" element={<OutcomesPage />} /> 
        <Route path="/categories" element={<CategoriesPage />} /> 

      </Routes>
    </div>
  );
}


export default App;
