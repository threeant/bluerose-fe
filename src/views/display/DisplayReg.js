import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCodeList ,throwError} from '../../common/utils'
import {
  cilCalendar,
  cifUs,
} from '@coreui/icons';
import axiosInstance from '../../common/axiosInstance';
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
const DisplayReg = () => {

  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();
  const [dispCD] = useState(getCodeList('DISP')); // 전시CD

  //목록이동
  const goListClick = () => {
    navigate('/display/displayList');
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    setSelectedDate(date);
    setDisplayData({ ...displayData, releaseDate: formattedDate })
  }
  const [validated, setValidated] = useState(false);

  const [displayData, setDisplayData] = useState({
    //image : '',        //이미지
    title: '',        //제목
    sort: 0,      //전시순서
    codeId: '1',        //전시타입
    useYn: true,      //사용여부
    displayCount : 0
  });

  //등록하기 API
  const submitRegAlbum = async (e) => {
    e.preventDefault();

    console.log(displayData);
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    try {
      const response = await axiosInstance.post('/api/display', displayData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      setDisplayData({
          //image : '',        //이미지
          title: '',        //제목
          sort: 0,      //전시순서
          codeId: '1',        //전시타입
          useYn: true,      //사용여부
          displayCount : 0
        });
      alert('등록되었습니다.');
      navigate('/display/displayList');
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };
  return (
    <CContainer>
      <CRow>
        <CCol >
          <CCard className="mb-4">
            <CCardHeader>
              <strong>전시등록</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={submitRegAlbum}
              >
                {/* <CCol xs={10} >
                  <CFormLabel></CFormLabel>
                </CCol>
                <CCol xs={2} >
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                  <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={displayData.useYn} onChange={(e) => setDisplayData({ ...displayData, useYn: e.target.value })} />
                </CCol> */}

                <CCol xs={12}>
                  <CFormLabel htmlFor="inputName">제목*</CFormLabel>
                  <CFormInput type="text" id="inputName" required onChange={(e) => setDisplayData({ ...displayData, title: e.target.value })} maxLength={100} />
                  <CFormFeedback invalid>제목을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputName">노출곡수*</CFormLabel>
                  <CFormInput type="number" id="inputDisplayCount" required onChange={(e) => setDisplayData({ ...displayData, displayCount: e.target.value })} maxLength={100} />
                  <CFormFeedback invalid>노출곡 갯수를 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputName">전시타입*</CFormLabel>
                  <CFormSelect id="sel_media" defaultValue={displayData.codeId} onChange={(e) => setDisplayData({ ...displayData, codeId: e.target.value })}  >
                    {dispCD.map((item, index) => (
                      <option value={item.id} key={index}>{item.name}</option>
                    ))}
                  </CFormSelect>
                  <CFormFeedback invalid>제목을 입력해주세요.</CFormFeedback>
                </CCol>
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={12}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" type="button" color="light" value="목록" onClick={goListClick} />
                        <CButton component="input" color="primary" type="submit" value="등록하기" />
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

export default DisplayReg;
