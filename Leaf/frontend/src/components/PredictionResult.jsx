import React from 'react';
import { ShieldCheck, ShieldAlert, Award, Calendar, HeartPulse } from 'lucide-react';

const PredictionResult = ({ result }) => {
  const { predicted_class, confidence, disease_info } = result;
  const { name, plant, severity, disease_type } = disease_info;

  const getSeverityStyles = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-50 text-red-700 border-red-200',
          indicator: 'bg-red-500',
          text: 'High Severity',
          icon: <ShieldAlert className="h-5 w-5 text-red-600" />,
        };
      case 'medium':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          indicator: 'bg-amber-500',
          text: 'Medium Severity',
          icon: <ShieldAlert className="h-5 w-5 text-amber-600" />,
        };
      case 'low':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          indicator: 'bg-blue-500',
          text: 'Low Severity',
          icon: <ShieldAlert className="h-5 w-5 text-blue-600" />,
        };
      case 'none':
      default:
        return {
          bg: 'bg-green-50 text-primary-dark border-green-200',
          indicator: 'bg-primary',
          text: 'Healthy Plant',
          icon: <ShieldCheck className="h-5 w-5 text-primary" />,
        };
    }
  };

  const severityStyle = getSeverityStyles(severity);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        {/* Top Header Section */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-primary-dark to-primary text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <span className="text-xs text-green-200 font-extrabold uppercase tracking-widest">
              Classification Diagnosis
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 leading-tight">
              {name}
            </h2>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shrink-0">
            <Award className="h-6 w-6 text-green-300" />
            <div>
              <p className="text-xs text-green-100 font-medium">Model Confidence</p>
              <p className="text-2xl font-black tracking-tight">
                {confidence.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-b border-slate-100 bg-slate-50/50">
          <div className="p-6 flex items-start gap-3 border-b sm:border-b-0 sm:border-r border-slate-100">
            <HeartPulse className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plant Species</p>
              <p className="text-base font-extrabold text-slate-700 mt-0.5">{plant}</p>
            </div>
          </div>

          <div className="p-6 flex items-start gap-3 border-b sm:border-b-0 md:border-r border-slate-100">
            <ShieldAlert className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pathogen Type</p>
              <p className="text-base font-extrabold text-slate-700 mt-0.5">
                {disease_type === 'None' ? 'None (Healthy)' : disease_type}
              </p>
            </div>
          </div>

          <div className="p-6 flex items-start gap-3 border-b sm:border-b-0 sm:border-r border-slate-100">
            {severityStyle.icon}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Health Status</p>
              <p className="text-base font-extrabold text-slate-700 mt-0.5">{severityStyle.text}</p>
            </div>
          </div>

          <div className="p-6 flex items-start gap-3">
            <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analyzed On</p>
              <p className="text-base font-extrabold text-slate-700 mt-0.5">
                {new Date().toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Severity Pill Display */}
        <div className={`p-4 border-t border-slate-100 flex items-center justify-between text-sm ${severityStyle.bg} border-0`}>
          <div className="flex items-center gap-2 font-semibold">
            <span className={`w-2.5 h-2.5 rounded-full ${severityStyle.indicator}`}></span>
            <span>Classification details mapped to local agricultural knowledge database.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
