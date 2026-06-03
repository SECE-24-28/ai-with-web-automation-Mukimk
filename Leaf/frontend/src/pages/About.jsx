import React from 'react';
import { Cpu, Database, Server, Leaf, CheckCircle } from 'lucide-react';

const About = () => {
  const modelStats = [
    { name: 'Model Format', value: 'Keras HDF5 (.h5)' },
    { name: 'Input Shape', value: '256 x 256 x 3 (RGB)' },
    { name: 'Model Type', value: 'Convolutional Neural Network (CNN)' },
    { name: 'Classifications', value: '38 Crop/Disease Classes' },
  ];

  const supportedCrops = [
    'Apple', 'Blueberry', 'Cherry', 'Corn (Maize)', 'Grape', 
    'Orange', 'Peach', 'Pepper (Bell)', 'Potato', 'Raspberry', 
    'Soybean', 'Squash', 'Strawberry', 'Tomato'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-800 mb-4">
          Technical Specifications
        </h1>
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
          Learn about the deep learning architecture, pre-trained CNN weights, and localized offline databases driving the diagnostic outputs.
        </p>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Model info */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary p-3 rounded-2xl">
              <Cpu className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-850">CNN Inference</h2>
          </div>
          
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            The neural network executes local forward passes utilizing loaded Keras tensors on the FastAPI server instance. The model applies convolutional filters and max-pooling operations to extract spatial leaf features, feeding them into fully connected dense layers to calculate softmax class distributions.
          </p>

          <div className="space-y-3">
            {modelStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0 text-sm">
                <span className="text-slate-400 font-medium">{stat.name}</span>
                <span className="text-slate-700 font-extrabold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Database info */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-50 text-primary p-3 rounded-2xl">
                <Database className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-850">Offline Local Database</h2>
            </div>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              To remain completely functional in remote agricultural fields without internet access, the system utilizes a localized JSON data store. The recommendation service matches classified keys against the pre-populated database to instantly fetch causes, treatment regimens, and cultural prevention measures without contacting external APIs.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 text-xs text-slate-500 leading-relaxed">
            <Server className="h-5 w-5 text-slate-400 shrink-0" />
            <span>
              The application complies with modern privacy-first standards; uploaded pictures are processed memory-only on the hosting backend and are never stored on disk.
            </span>
          </div>
        </div>
      </div>

      {/* Supported Crops */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-16">
        <h3 className="text-xl font-bold text-slate-850 mb-6 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          Supported Plants & Crops
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          The underlying model classifies healthy leaf features or diagnosed disease anomalies across the following crop types:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {supportedCrops.map((crop, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <CheckCircle className="h-4 w-4 text-primary-light shrink-0" />
              <span>{crop}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
