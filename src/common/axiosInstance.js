// axiosInstance.js

import axios from 'axios';
import appConfig from '../common/appConfig';

const axiosInstance = axios.create({
  baseURL: appConfig.apiUrl , // API의 기본 URL
  timeout: 5000, // 타임아웃 설정
});
// Request 인터셉터 설정
axiosInstance.interceptors.request.use(
    
    
    (config) => {
      const accessToken = sessionStorage.getItem('accessToken'); // 세션 스토리지에서 토큰을 가져옴
      //const accessToken =  "a2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10b2thcmltdG9rYXJpbQ=="
  
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // 헤더에 토큰 추가
      }
  
      return config;
    },
    (error) => {
        const statusCode = error.response.status;
        console.log('>>>error');
        console.log(error)
        // const navigate = useNavigate();
        
    
        // // 오류 코드에 따른 분기 처리
        // switch (statusCode) {
        //   case 401:
        //     navigate('/login');
        //     break;
        //   case 404:
        //     navigate('/404');
        //     break;
        //   case 500:
        //     navigate('/500');
        //     break;
        //   default:
        //     navigate('/error');
        // }
    
        return Promise.reject(error);
    }
  );

export default axiosInstance;
