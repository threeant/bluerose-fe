import React, { useState,useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate,useLocation } from 'react-router-dom'
import axiosInstance from '../../common/axiosInstance';
import ComModal from '../../common/ComModal'; // 모달 컴포넌트 임포트
import { getCodeList , throwError} from '../../common/utils'
import {
  cilCalendar,
  cifUs,
} from '@coreui/icons';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardImage,
  CCardText,
  CFormTextarea,
  CContainer,
  CImage,
  CFormSwitch,
} from '@coreui/react';
import ReactImg from 'src/assets/images/image400.jpg'
const AdminInfo = () => {

  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD
  const location = useLocation();
  const { userId } = location.state;

    /**********************************************************************
   * 메세지영역
  **********************************************************************/
    const [alertType, setAlertType] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [acceptType, setAcceptType] = useState('');
    const [alertAftType, setAlertAftType] = useState('');
  
  
    const alertPage = (txt) => {
      setAlertType('alert');
      setAlertText(txt);
      setAlertVisible(true);
    };
  
    const confirmPage = (txt, type) => {
      setAlertType('confirm');
      setAlertText(txt);
      setAlertVisible(true);
      setAcceptType(type);
    };
  
    const handleCloseModal = () => {
      setAlertVisible(false);
    };
    const handleAccept = () => {
      setAlertVisible(false);
      if(acceptType === 'update'){// 등록
        submitRegAlbum();
    }
      setAcceptType('');
      
    };
  
  
  
    const handleAftFunc = () => {
      if(alertAftType === 'update'){
        navigate('/system/AdminList');
      }
      setAlertAftType('');
      
    };

  //목록이동
  const goListClick = () => {
    navigate('/system/AdminList');
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    setSelectedDate(date);
    setAdminData({ ...adminData, releaseDate: formattedDate })
  }
  const [validated, setValidated] = useState(false);

  const [adminData, setAdminData] = useState({
    "etc": "",
    "id": "",
    "name": "",
    "password": "",
    "passwordChk": "",
    "useYn" : true,
    "adminId" :"",
    
});

  

  useEffect(() => {

    submitSearchAdmin();

  }, []); // 빈 배열을 넣어 처음 한 번만 실행되도록 설정

  //앨범 검색 API
  const submitSearchAdmin = async () => {

    try {
      const response = await axiosInstance.get('/api/admin/' + userId);

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setAdminData(data);
      console.log("앨범결과 ----")
      console.log(data);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  //등록하기 API
  const confirmSubmitRegAlbum = async (e) => {
    e.preventDefault();

    setValidated(true);

    console.log(adminData);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if(adminData.password || adminData.passwordChk){
      if(adminData.password != adminData.passwordChk){
        alertPage('비밀번호와 비밀번호 확인이 일치하지 않습니다');
        setAdminData((prevData) => ({
          ...prevData,
          passwordChk: '',
        }));
        setValidated(false);
        return;
      }
    }

    confirmPage('관리자를 수정 하시겠습니까?', 'update')
  }
  

  //등록하기 API
  const submitRegAlbum = async () => {

    
    
    

    try {
      //adminData.rawPassword = adminData.password
      const response = await axiosInstance.post('/api/admin/'+userId, adminData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      setAdminData({
        "etc": "",
        "id": "",
        "name": "",
        "password": ""
    });
      alertPage('등록되었습니다.');
      setAlertAftType('update')
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };
  return (
    <CContainer>
      <ComModal type={alertType} visible={alertVisible} onClose={handleCloseModal} alertText={alertText} onAccpet={handleAccept} aftFunc={handleAftFunc}/>
 
      <CRow>
        <CCol >
          <CCard className="mb-4">
            <CCardHeader>
              <strong>관리자조회</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={confirmSubmitRegAlbum}
              >
                {/* <CCol xs={10} >
                  <CFormLabel></CFormLabel>
                </CCol>
                <CCol xs={2} >
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                  <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={adminData.useYn} onChange={(e) => setAdminData({ ...adminData, useYn: e.target.value })} />
                </CCol> */}
                 <CCol xs={10} >
                    <CFormLabel htmlFor="validationCustom04">ID : {userId}</CFormLabel>
                  </CCol>
                  <CCol xs={2} >
                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                    <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={adminData.useYn} onChange={(e) => setAdminData({ ...adminData, useYn: e.target.checked })} />
                  </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputId">아이디*</CFormLabel>
                  <CFormInput type="text" id="inputId" disabled='disabled' required value={adminData.adminId} onChange={(e) => setAdminData({ ...adminData, adminId: e.target.value })} maxLength={10} />
                  <CFormFeedback invalid>아이디를 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputName">이름*</CFormLabel>
                  <CFormInput type="text" id="inputName"  value={adminData.name} required onChange={(e) => setAdminData({ ...adminData, name: e.target.value })} maxLength={10} />
                  <CFormFeedback invalid>이름을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputPw">비밀번호*</CFormLabel>
                  <CFormInput type="password" id="inputPw" onChange={(e) => setAdminData({ ...adminData, password: e.target.value })} maxLength={20} />
                  <CFormFeedback invalid>비밀번호을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputPwChk">비밀번호확인*</CFormLabel>
                  <CFormInput type="password" id="inputPwChk" onChange={(e) => setAdminData({ ...adminData, passwordChk: e.target.value })} maxLength={20} />
                  <CFormFeedback invalid>비밀번호확인을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CFormLabel htmlFor="inputEtc">비고</CFormLabel>
                  <CFormTextarea id="inputEtc" rows="3" value={adminData.etc} onChange={(e) => setAdminData({ ...adminData, etc: e.target.value })} ></CFormTextarea>
                </CCol>
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={12}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" type="button" color="light" value="목록" onClick={goListClick} />
                        <CButton component="input" color="primary" type="submit" value="수정하기" />
                      </div>
                    </CCol>
                  </CRow>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    </CContainer>
  );
};

export default AdminInfo;
