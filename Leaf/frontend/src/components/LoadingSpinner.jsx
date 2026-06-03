import React from 'react';
import { Sprout } from 'lucide-react';

const LoadingSpinner = ({ message = 'Analyzing leaf image and running CNN model...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer glowing ring */}
        <div className="absolute w-20 h-20 border-4 border-primary-light/20 rounded-full animate-ping"></div>
        {/* Rotating border ring */}
        <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
        {/* Center icon */}
        <div className="absolute bg-white p-2.5 rounded-full shadow-md text-primary">
          <Sprout className="h-6 w-6 animate-pulse" />
        </div>
      </div>
      <p className="text-slate-600 font-medium text-center animate-pulse-subtle max-w-sm">
        {message}
      </p>
      <span className="text-xs text-slate-400 mt-2">
        This might take a moment to load the TensorFlow model.
      </span>
    </div>
  );
};

export default LoadingSpinner;
