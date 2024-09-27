import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type ApiResponse<T> = {
  data: T;
};

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private token: string | null = null;

  constructor(url: string) {
    this.axiosInstance = axios.create({
      baseURL: url,
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

  private getJWTToken = async (): Promise<string | null> => {
    try {
      console.log('Available cookies:', document.cookie);

      const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
          return match[2];
        }
        return null;
      };

      const tokenPayload = getCookie('edx-jwt-cookie-header-payload');
      const tokenSignature = getCookie('edx-jwt-cookie-signature');

      console.log('Token Payload:', tokenPayload);
      console.log('Token Signature:', tokenSignature);

      if (tokenPayload && tokenSignature) {
        const jwtToken = `${tokenPayload}.${tokenSignature}`;
        return jwtToken;
      } else {
        throw new Error('Token parts not found in cookies');
      }
    } catch (error) {
      console.error('Error fetching JWT token from cookies:', error);
      return null;
    }
  };

  private async ensureTokenIsInitialized(): Promise<void> {
    if (!this.token) {
      await this.initializeToken();
    }
  }
}
