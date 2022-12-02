import axiosInstance from '../Api/axiosInstance';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosInstance.get('/refresh');
    console.log(`response: ${JSON.stringify(response)}`);
    console.log(response);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });
    console.log('refreshed');
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
