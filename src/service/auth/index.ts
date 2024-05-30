import ApiAuth from '../../config/Endpoints/auth';

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}
export const handleLogin = async ({ email, password }: LoginValues) => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });
    const response = await ApiAuth.Login(body, config);
    return {
      status: true,
      message: 'Login successful',
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        'The server encountered an error. Please try again later.',
    };
  }
};

export const handleRegister = async ({
  name,
  email,
  password,
}: RegisterValues) => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });
    const response = await ApiAuth.Register(body, config);
    return {
      status: true,
      message: 'Register successful, please login',
      data: response.data,
    };
  } catch (error: any) {
    return (
      error?.response?.data?.message ||
      'The server encountered an error. Please try again later'
    );
  }
};
