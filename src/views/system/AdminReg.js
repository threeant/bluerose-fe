import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCodeList } from '../../common/utils'
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
const AdminReg = () => {

  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

  //목록이동
  const goListClick = () => {
    navigate('/system/AdminList');
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    setSelectedDate(date);
    setAlbumData({ ...albumData, releaseDate: formattedDate })
  }
  const [validated, setValidated] = useState(false);

  const [albumData, setAlbumData] = useState({
    //image : '',        //이미지
    name: '',        //앨범명
    artist: '',      //아티스트
    label: '',       //라벨
    format: '',      //포맷
    releaseDate: '',      //발매일
    musicGenre: '',      //장르
    countryCD: '9',        //발매국가
    mediaCD: '1',        //미디어
    style: '',       //스타일
    series: '',      //시리즈
    useYn: true,      //사용여부
  });

  //등록하기 API
  const submitRegAlbum = async (e) => {
    e.preventDefault();

    console.log(albumData);
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/albums', albumData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      setAlbumData({
        name: '',        //앨범명
        artist: '',      //아티스트
        label: '',       //라벨
        format: '',      //포맷
        releaseDate: '2023-10-28',      //발매일
        musicGenre: '',      //장르
        countryCD: '9',        //발매국가
        mediaCD: '1',        //미디어
        style: '',       //스타일
        series: '',      //시리즈
        useYn: true,      //사용여부
      });
      alert('등록되었습니다.');
      navigate('/sample/sampleList');
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };
  return (
    <CContainer>
      <CRow>
        <CCol >
          <CCard className="mb-4">
            <CCardHeader>
              <strong>관리자등록</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={submitRegAlbum}
              >
                <CCol xs={10} >
                  <CFormLabel></CFormLabel>
                </CCol>
                <CCol xs={2} >
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                  <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={albumData.useYn} onChange={(e) => setAlbumData({ ...albumData, useYn: e.target.value })} />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputName">아이디*</CFormLabel>
                  <CFormInput type="text" id="inputName" required onChange={(e) => setAlbumData({ ...albumData, name: e.target.value })} maxLength={10} />
                  <CFormFeedback invalid>아이디를 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputLabel">이름*</CFormLabel>
                  <CFormInput type="text" id="inputLabel" required onChange={(e) => setAlbumData({ ...albumData, label: e.target.value })} maxLength={10} />
                  <CFormFeedback invalid>이름을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputName">비밀번호*</CFormLabel>
                  <CFormInput type="password" id="inputName" required onChange={(e) => setAlbumData({ ...albumData, name: e.target.value })} maxLength={20} />
                  <CFormFeedback invalid>비밀번호을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputAartist">비밀번호확인*</CFormLabel>
                  <CFormInput type="password" id="inputAartist" required onChange={(e) => setAlbumData({ ...albumData, artist: e.target.value })} maxLength={20} />
                  <CFormFeedback invalid>비밀번호확인을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CFormLabel htmlFor="inputFormat">비고</CFormLabel>
                  <CFormTextarea id="inputFormat" rows="3" onChange={(e) => setAlbumData({ ...albumData, format: e.target.value })} ></CFormTextarea>
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

export default AdminReg;
