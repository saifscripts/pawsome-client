import env from '@/config/env';
import { Nexios } from 'nexios-http';

const nexios = new Nexios({
  baseURL: env.base_url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default nexios;
