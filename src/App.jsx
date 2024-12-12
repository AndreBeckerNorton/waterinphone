import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';
import WaterEjector from './components/WaterEjector';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
        <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link 
                  to="/" 
                  className="transition-colors"
                >
                  <span className="text-xl font-medium tracking-tight text-gray-900 hover:text-gray-600">
                    WaterinPhone
                  </span>
                </Link>
              </div>
              <div className="flex items-center">
                <Link 
                  to="/blog" 
                  className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<WaterEjector />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
              <div className="flex space-x-6 text-sm text-gray-600">
                <Link to="/privacy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
                <a 
                  href="mailto:privacy@waterinphone.com"
                  className="hover:text-gray-900 transition-colors"
                >
                  Contact
                </a>
              </div>
              <p className="text-sm text-gray-600">
                © 2024 WaterinPhone. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;