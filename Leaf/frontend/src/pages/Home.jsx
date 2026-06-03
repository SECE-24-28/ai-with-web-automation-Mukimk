import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { analyzeImage } from '../api/predictionApi';
import ImageUploader from '../components/ImageUploader';
import PredictionResult from '../components/PredictionResult';
import DiseaseInfoCard from '../components/DiseaseInfoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { Sprout, ShieldAlert, Zap } from 'lucide-react';

const Home = () => {
  const mutation = useMutation({
    mutationFn: analyzeImage,
  });

  const handleUpload = (file) => {
    mutation.mutate(file);
  };

  const handleRetry = () => {
    mutation.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-bold mb-6">
          <Sprout className="h-4 w-4" />
          <span>Powered by TensorFlow CNN Model</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight leading-none mb-6">
          Detect Plant Diseases <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Instantly with AI
          </span>
        </h1>
        
        <p className="text-slate-500 text-lg sm:text-xl leading-relaxed font-medium">
          Upload a clear photograph of an infected plant leaf to run machine learning diagnostics and receive organic, localized prevention and treatment recommendation guides offline.
        </p>
      </div>

      {/* Feature Badges */}
      {!mutation.data && !mutation.isPending && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 animate-fade-in">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-2xl shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-850 text-base mb-1">Instant Diagnosis</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Pre-trained Deep Learning CNN model processes images in seconds.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="bg-green-50 text-primary p-3 rounded-2xl shrink-0">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-850 text-base mb-1">38 Crop Categories</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Trained to identify apple, tomato, grape, potato, and corn diseases.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="bg-amber-50 text-amber-700 p-3 rounded-2xl shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-850 text-base mb-1">Local & Offline</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Database-driven treatment recommendations are stored entirely locally.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Box */}
      {!mutation.isPending && !mutation.data && !mutation.isError && (
        <div className="animate-fade-in">
          <ImageUploader onUpload={handleUpload} isLoading={false} />
        </div>
      )}

      {/* Loading State */}
      {mutation.isPending && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl max-w-2xl mx-auto p-8">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {mutation.isError && (
        <ErrorAlert
          message={mutation.error?.response?.data?.detail || mutation.error?.message}
          onRetry={handleRetry}
        />
      )}

      {/* Result State */}
      {mutation.data && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm transition-all duration-200 border border-slate-200/40 text-sm flex items-center gap-2"
            >
              ← Test Another Leaf
            </button>
          </div>
          
          <PredictionResult result={mutation.data} />
          <DiseaseInfoCard diseaseInfo={mutation.data.disease_info} />
        </div>
      )}
    </div>
  );
};

export default Home;
