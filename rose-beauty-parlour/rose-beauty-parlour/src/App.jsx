import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Services from "./pages/Services/Services";
import Layout from "./components/Layout/Layout";
import AboutSection from "./components/AboutSection/AboutSection";
import Gallery from "./components/Gallery/Gallery";
import BookingForm from "./pages/BookForm/BookingForm";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

function App() {
  return (
    <BrowserRouter>
    <Layout >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/about" element={<AboutSection/>} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/page/bookform" element={<BookingForm />} />
        {/* <Route path="/contact" element={<Services/>} /> */}



      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;