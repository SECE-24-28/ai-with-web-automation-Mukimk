import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
});

export const predictDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await api.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
export default api;
