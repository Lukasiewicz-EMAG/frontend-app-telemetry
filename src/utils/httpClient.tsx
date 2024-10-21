import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type ApiResponse<T> = {
  data: T;
};

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private token: string | null = null;

  constructor(url?: string) {
    const currentURL = this.setURLbasedOnENV();
    // console.log('currentURL', currentURL);
    // console.log(url, 'url');

    this.axiosInstance = axios.create({
      baseURL: `https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api`,
      withCredentials: true,
    });

    this.initializeToken();

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private async initializeToken(): Promise<void> {
    try {
      const token = await this.getJWTToken();
      console.log(token, 'token');
      if (token) {
        this.token = token;
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      console.error('Failed to fetch token:', error);
      throw error;
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    await this.ensureTokenIsInitialized();
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return { data: response.data };
  }

  async post<T, B>(url: string, body: B, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    await this.ensureTokenIsInitialized();
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, body, config);
    return { data: response.data };
  }

  //We have to get token from the backend we cant get it form cookies.
  private getJWTToken = async (): Promise<string | null> => {
    try {
      //vite check if is in dev or prod
      const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      let url = '';
      if (isDev) {
        console.log('running dev');
        url = `http://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api/token`;
      } else {
        console.log('running prod');
        url = 'https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api/token';
      }

      const response = await axios.post(url, {
        username: 'testuser',
        password: 'testpassword',
        superuser: false,
      });
      console.log(response, 'response');
      const { access_token } = response.data;
      return access_token;
    } catch (error) {
      console.error('Error fetching JWT token:', error);
      return null;
    }
  };

  private async ensureTokenIsInitialized(): Promise<void> {
    if (!this.token) {
      await this.initializeToken();
    }
  }

  private setURLbasedOnENV = () => {
    const isDev = import.meta.env.VITE_USER_NODE_ENV === 'development';
    let currentURL = import.meta.env.VITE_APP_API_BASE_URL;
    if (isDev) {
      return `${currentURL}/api/`;
    }
    return currentURL;
  };
}
