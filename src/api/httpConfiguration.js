import axios from 'axios';

const env = process.env.REACT_APP_ENV;

const devEndpoint = 'https://localhost:44355';
const productionEndpoint = 'https://OTPBankProject.com';

export const getBaseUrl = () => {
  if (env === 'production') return productionEndpoint;
  else return devEndpoint;
};

const getToken = () => {
  const localToken = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
  return localToken ? `Bearer ${localToken}` : null;
};

export const customHttp = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

customHttp.interceptors.request.use((configuration) => {
  const token = getToken();
  if (token) {
    configuration.headers.Authorization = token;
  }
  return configuration;
});
