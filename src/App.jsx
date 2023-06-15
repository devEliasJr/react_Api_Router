//router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Provider Context App
import { AuthProvider } from "./context/authContext";

//Context - FireBase
import { onAuthStateChanged } from "firebase/auth";

//Hooks
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//Style - CSS
import "./global.css";

//Components
import Navigation from "./componets/Navigation";
import Footer from "./componets/Footer";

//Pages
import ProductsCards from "./componets/products-Cards";
import ProductDescription from "./pages/ProductDescription";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewProducts from "./pages/NewProducts/NewProducts";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);


  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/product-description/:id/:name"
              element={<ProductDescription />}
            />
            <Route
              path="/product-register"
              element={user ? <NewProducts /> : <Navigate to="/login" />}
            />
            <Route
              path="/product-edit/:id"
              element={user ? <EditPost /> : <Navigate to="/login" />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
