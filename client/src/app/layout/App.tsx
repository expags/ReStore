import Catalog from "../../features/catalog/Catalog";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";

import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {

  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
  }, [setBasket])
  
  const [darkMode, setDarkMode] = useState(false);
  const palletType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: palletType === 'light' ? '#eaeaea' : '#121212'
      }
    },    
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Loadin app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar/>
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/catalog" element={<Catalog/>} />
          <Route path="/catalog/:id" element={<ProductDetails/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/basket" element={<BasketPage/>} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
