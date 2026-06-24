import apiClient from './apiClient';

export interface GoogleLoginResponse {
  token?: string;
  expires_in?: number;
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  requirePassword?: boolean;
  email?: string;
}

export interface LoginResponse {
  token: string;
  expires_in: number;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface RegisterResponse {
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
  };
}

/** Gửi Google idToken lên backend, tuỳ chọn kèm password nếu Branch B */
export const googleLogin = async (
  idToken: string,
  password?: string,
): Promise<GoogleLoginResponse> => {
  const body: { idToken: string; password?: string } = { idToken };
  if (password) body.password = password;

  const { data } = await apiClient.post<GoogleLoginResponse>(
    '/auth/google',
    body,
  );
  return data;
};

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
  return data;
};

export const register = async (
  username: string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {
  const { data } = await apiClient.post<RegisterResponse>('/auth/register', {
    username,
    email,
    password,
  });
  return data;
};

/** Lưu token vào localStorage */
export const saveAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

/** Đọc token từ localStorage */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

/** Xoá token (logout) */
export const clearAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};
