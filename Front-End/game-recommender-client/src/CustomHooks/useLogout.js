import axios from '../Api/axiosInstance';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    try {
      await axios('/logout', {
        withCredentials: true,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
