import api from './predictionApi';

export const getRecommendation = async (diseaseName) => {
  const response = await api.get(`/recommendation/${encodeURIComponent(diseaseName)}`);
  return response.data;
};
