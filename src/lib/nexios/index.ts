import env from '@/config/env';
import { Nexios } from 'nexios-http';
import { cookies } from 'next/headers';

const nexios = new Nexios({
  baseURL: env.base_url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

nexios.interceptors.request.use((config) => {
  const accessToken = cookies().get('accessToken')?.value;

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
});

export default nexios;
