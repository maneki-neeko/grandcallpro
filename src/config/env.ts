interface Environment {
  API_URL: string;
}

type EnvironmentType = 'development' | 'test' | 'production';

const environments: Record<EnvironmentType, Environment> = {
  development: {
    API_URL: 'http://localhost:8081',
  },
  test: {
    API_URL: 'https://api.tst.grandcallpro.com',
  },
  production: {
    API_URL: 'https://api.grandcallpro.com',
  },
};

const getEnvironment = (): Environment => {
  const env = import.meta.env.MODE as EnvironmentType;
  return environments[env] || environments.development;
};

export const config = getEnvironment();
