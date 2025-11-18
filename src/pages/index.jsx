import Layout from "./Layout.jsx";

import Home from "./Home";

import About from "./About";

import Services from "./Services";

import Packages from "./Packages";

import Contact from "./Contact";

import Portfolio from "./Portfolio";

import Checkout from "./Checkout";

import ProPlan from "./ProPlan";

import Resources from "./Resources";

import StarterPlan from "./StarterPlan";

import Dashboard from "./Dashboard";

import SocialMediaTool from "./SocialMediaTool";

import EmailCampaignTool from "./EmailCampaignTool";

import AnalyticsTool from "./AnalyticsTool";

import LeadsTool from "./LeadsTool";

import AccountSettings from "./AccountSettings";

import StripeCheckout from "./StripeCheckout";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    About: About,
    
    Services: Services,
    
    Packages: Packages,
    
    Contact: Contact,
    
    Portfolio: Portfolio,
    
    Checkout: Checkout,
    
    ProPlan: ProPlan,
    
    Resources: Resources,
    
    StarterPlan: StarterPlan,
    
    Dashboard: Dashboard,
    
    SocialMediaTool: SocialMediaTool,
    
    EmailCampaignTool: EmailCampaignTool,
    
    AnalyticsTool: AnalyticsTool,
    
    LeadsTool: LeadsTool,
    
    AccountSettings: AccountSettings,
    
    StripeCheckout: StripeCheckout,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Services" element={<Services />} />
                
                <Route path="/Packages" element={<Packages />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/Portfolio" element={<Portfolio />} />
                
                <Route path="/Checkout" element={<Checkout />} />
                
                <Route path="/ProPlan" element={<ProPlan />} />
                
                <Route path="/Resources" element={<Resources />} />
                
                <Route path="/StarterPlan" element={<StarterPlan />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/SocialMediaTool" element={<SocialMediaTool />} />
                
                <Route path="/EmailCampaignTool" element={<EmailCampaignTool />} />
                
                <Route path="/AnalyticsTool" element={<AnalyticsTool />} />
                
                <Route path="/LeadsTool" element={<LeadsTool />} />
                
                <Route path="/AccountSettings" element={<AccountSettings />} />
                
                <Route path="/StripeCheckout" element={<StripeCheckout />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}