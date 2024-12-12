import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';
import WaterEjector from './components/WaterEjector';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F7]">
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

        <main className="max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<WaterEjector />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;