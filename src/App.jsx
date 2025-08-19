import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Developer from "./Pages/Developer";
import Simulasi from "./Pages/Simulasi";
import Kontak from "./Pages/Kontak";
import NotFound from "./Pages/NotFound";
import ClusterDetail from "./Pages/Cluster/ClusterDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/developer/:slug" element={<ClusterDetail />} />
        <Route path="/simulasi-kpr" element={<Simulasi />} />
        <Route path="/kontak-kami" element={<Kontak />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
