import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';

// Initialize the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#F8FFF8]">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          
          <footer className="bg-white border-t border-green-50 py-8 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p>© {new Date().getFullYear()} PlantAI Leaf Disease Detection & Recommendation System.</p>
              <p className="mt-1">Built with React, Vite, Tailwind CSS, FastAPI, and TensorFlow.</p>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
