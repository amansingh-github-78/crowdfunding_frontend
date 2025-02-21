import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/HeaderFooterHome/Navbar";
import Footer from "./Components/HeaderFooterHome/Footer";
import Home from "./Pages/HomePage";
import Authentication from "./Pages/Authentication"
import ExploreCampaigns from "./Pages/ExploreCampaigns";
import StartCampaigns from "./Pages/StartCampaigns";
import MyCampaigns from "./Pages/MyCampaigns";
import Dashboard from "./Pages/Dashboard";
import Admin from "./Pages/Admin";
import Donate from "./Pages/donateFunds"
import Withdraw from "./Pages/withdrawFunds"
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import NotFound from "./Pages/notFound";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content - pushes Footer to the bottom */}
        <main className="flex-grow bg-blue-50 border-gray-200 dark:bg-blue-900 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/explore" element={<ExploreCampaigns />} />
            <Route path="/start" element={<StartCampaigns />} />
            <Route path="/mycampaigns" element={<MyCampaigns />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />    
            <Route path="/admin" element={<Admin />} />         
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
