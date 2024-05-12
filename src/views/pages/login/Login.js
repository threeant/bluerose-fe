import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import appConfig from '../../../common/appConfig';
import axiosInstance from '../../../common/axiosInstance';
import ComModal from '../../../common/ComModal'; // 모달 컴포넌트 임포트


const Login = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: '',
    password: ''
  });

  const [alertType, setAlertType] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');


  const alertPage = (type, txt) => {
    setAlertType(type);
    setAlertText(txt);
    setAlertVisible(true);
  };

  const handleCloseModal = () => {
    setAlertVisible(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!userData.id || !userData.password){
      //alert('아이디와 비밀번호를 입력해 주세요');
      alertPage('alert', '아이디와 비밀번호를 입력해 주세요.');
      return;
    }
    // 로그인 API 호출 또는 서버로 요청
    try {
      
      const response = await axios.post( appConfig.apiUrl + '/auth/admin/login', userData, {
        headers: {
          //'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
        }
      });
      
      console.log(response);
      if (response.status === 200) {
      
        // 로그인 성공 처리
        const accessToken = response.data.tokenInfo.accessToken;
        sessionStorage.setItem('accessToken',accessToken)
        
        axiosInstance.interceptors.request.use(
          (config) => {
        
            if (accessToken) {
              config.headers.Authorization = `Bearer ${accessToken}`; // 헤더에 토큰 추가
            }
        
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );



          try {
            //공통코드 
            const codeResponse = await axiosInstance.get('/api/code', {}, {
              headers: {
                'Content-Type': 'application/json',
              }
            });
            console.log(response.data);

                // API 응답에서 데이터 추출
            const codeData = codeResponse.data;
            // 데이터를 상태 변수에 저장

            console.log(codeData)
            const jsonData = JSON.stringify(codeData);
            sessionStorage.setItem('codeData', jsonData);


            // 세션에서 JSON 데이터 가져오기
            const jsonCodeData = sessionStorage.getItem('codeData');

            // JSON 문자열을 파싱하여 JavaScript 객체로 변환
            const codeList = JSON.parse(jsonCodeData);

            // userData 객체 사용
            for (const c of codeList) {
              //console.log(c);
              console.log(c.description);
              console.log(c.code);
              console.log(c.codes);
            }
            navigate('/dashboard');
            //sessionStorage.removeItem('codeData');

          } catch (error) {
            console.error('Error fetching data:', error);
          }


      } else {
        // 로그인 실패 처리
        //alert('로그인 실패');
        alertPage('alert', '로그인 오류 [관리자에게 문의하세요.]');
        console.log(response);
      }
    } catch (error) {
      alertPage('alert', error.response.data.message);
      //alert(error.response.data.message)
      console.error('오류 발생:', error);
    }
  }

  



  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <ComModal type={alertType} visible={alertVisible} onClose={handleCloseModal} alertText={alertText} />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput id="txtUserId" placeholder="ID" autoComplete="userId" onChange={(e) => setUserData({ ...userData, id: e.target.value })} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="txtPassword"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton component="input" color="primary" type="submit" value="Login" className="px-4" onClick={handleSubmit} />
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
