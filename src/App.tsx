import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '@/components/Navbar';
import { OverviewPage } from '@/pages/OverviewPage';
import { NetworkPage } from '@/pages/NetworkPage';
import { InvestigationPage } from '@/pages/InvestigationPage';
import { AboutPage } from '@/pages/AboutPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition() {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="animate-page-in">
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/investigation" element={<InvestigationPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="noise min-h-screen overflow-hidden bg-[#080b0d] text-[#edf1ef]">
      <ScrollToTop />
      <Navbar />
      <PageTransition />
      <Footer />
    </div>
  );
}

export default App;
