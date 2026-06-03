import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Activity, Settings, ShieldCheck } from 'lucide-react';

const DiseaseInfoCard = ({ diseaseInfo }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { description, symptoms, causes, treatments, prevention, severity } = diseaseInfo;

  const tabs = [
    { id: 'overview', name: 'Overview & Causes', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'symptoms', name: 'Symptoms', icon: <Activity className="h-4 w-4" /> },
    { id: 'treatment', name: 'Treatments', icon: <Settings className="h-4 w-4" /> },
    { id: 'prevention', name: 'Prevention', icon: <ShieldCheck className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-16 animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 focus:outline-none shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'text-slate-500 hover:text-primary hover:bg-slate-100/50'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 min-h-[300px]">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-slate-800 font-extrabold text-xl mb-3 flex items-center gap-2">
                  Disease Overview
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  {description}
                </p>
              </div>
              
              <hr className="border-slate-100" />
              
              <div>
                <h3 className="text-slate-800 font-extrabold text-xl mb-4">
                  Primary Causes
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {causes.map((cause, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-amber-50/40 border border-amber-100/40 p-4 rounded-2xl"
                    >
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-slate-600 text-sm leading-relaxed">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'symptoms' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-slate-800 font-extrabold text-xl mb-4 flex items-center gap-2">
                Identified Symptoms
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {symptoms.map((symptom, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-red-50/20 border border-red-100/30 rounded-2xl"
                  >
                    <div className="bg-red-100 text-red-700 p-2 rounded-xl shrink-0 mt-0.5">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-slate-700 font-semibold text-sm">Symptom indicator {index + 1}</p>
                      <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">{symptom}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'treatment' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-slate-800 font-extrabold text-xl mb-4 flex items-center gap-2">
                Recommended Treatments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {treatments.map((treatment, index) => (
                  <div
                    key={index}
                    className="border border-slate-100 bg-slate-50/40 p-5 rounded-2xl flex gap-4"
                  >
                    <span className="text-primary-dark font-black text-2xl opacity-35 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium mt-1">
                      {treatment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'prevention' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-slate-800 font-extrabold text-xl mb-4 flex items-center gap-2">
                Prevention Measures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevention.map((prevent, index) => (
                  <div
                    key={index}
                    className="border border-green-100 bg-green-50/20 p-5 rounded-2xl flex gap-4"
                  >
                    <span className="text-primary font-black text-2xl opacity-40 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium mt-1">
                      {prevent}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfoCard;
