const env = {
  base_url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000/api/v1',
  node_env: process.env.NODE_ENV === 'production',
};

export default env;
