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
  CFormLabel,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: '',
    password: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userData);
    // 로그인 API 호출 또는 서버로 요청
    try {
      /*
            const response = await axios.post('http://localhost:8080/api/login', userData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                //'Content-Type': 'application/json',
              }
            });
            */
      //body: JSON.stringify({ username, password }),
      var test = true;

      //if (response.status === 200) {
      if (test) {
        // 로그인 성공 처리
        // 사용자 토큰 저장 또는 세션에 사용자 정보 저장

        const dataToStore = {
          username: 'john_doe',
          email: 'john@example.com',
        };

        const jsonData = JSON.stringify(dataToStore);
        sessionStorage.setItem('userData', jsonData);


        // 세션에서 JSON 데이터 가져오기
        const jsonData2 = sessionStorage.getItem('userData');

        // JSON 문자열을 파싱하여 JavaScript 객체로 변환
        const userData2 = JSON.parse(jsonData2);

        // userData 객체 사용
        console.log(userData2.username); // 'john_doe'
        console.log(userData2.email); // 'john@example.com'
        sessionStorage.removeItem('userData');
        navigate('/dashboard');



      } else {
        // 로그인 실패 처리
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
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
                      <CFormInput id="txtUserId" placeholder="ID" autoComplete="userId" onChange={(e) => setUserData({ ...userData, userId: e.target.value })} />
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
