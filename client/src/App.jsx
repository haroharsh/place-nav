import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Company from "./pages/company";
import CompanyDetail from "./pages/company-detail";
import CompanyAnalytics from "./pages/company-analytics";
import CompanyQuestion from "./pages/company-question";
import AdminPanel from "./pages/admin-panel";
import AddCompany from "./pages/add-company";
import AddQuestion from "./pages/add-question";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/company" element={<Layout><Company /></Layout>} />
        <Route path="/company/:id" element={<Layout><CompanyDetail /></Layout>} />
        <Route path="/company-analytics" element={<Layout><CompanyAnalytics /></Layout>} />
        <Route path="/company-question" element={<Layout><CompanyQuestion /></Layout>} />
        <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
        <Route path="/admin/add-company" element={<Layout><AddCompany /></Layout>} />
        <Route path="/admin/add-question" element={<Layout><AddQuestion /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;