import env from '@/config/env';
import { cookies } from 'next/headers';

import _axios from 'axios';

const axios = _axios.create({
  baseURL: env.base_url,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

axios.interceptors.request.use((config) => {
  const accessToken = cookies().get('accessToken')?.value;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default axios;
