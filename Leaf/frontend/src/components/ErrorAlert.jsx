import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-2xl mx-auto my-6 shadow-sm animate-fade-in">
      <div className="flex gap-4">
        <div className="bg-red-100 p-3 rounded-xl text-red-600 self-start">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-red-800 font-bold text-lg mb-1">Analysis Failed</h3>
          <p className="text-red-700 text-sm leading-relaxed mb-4">
            {message || 'An error occurred while processing the leaf image. Please ensure the file is a valid image and the backend is running.'}
          </p>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
