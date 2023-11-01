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
        // TODO : 사용자 토큰 저장 또는 세션에 사용자 정보 저장

        //공통코드 
        const codeResponse = await axios.get('http://localhost:8080/api/code', {}, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

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
