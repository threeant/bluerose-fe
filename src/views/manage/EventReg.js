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
const EventReg = () => {

  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

  //목록이동
  const goListClick = () => {
    navigate('/music/EventList');
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    setSelectedDate(date);
    setEventData({ ...EventData, releaseDate: formattedDate })
  }
  const [validated, setValidated] = useState(false);

  const [EventData, setEventData] = useState({
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
    image: null
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const handleFileChange = (event) => {
    // console.log(event);
    // setEventData((prevEventData) => ({
    //   ...prevEventData,
    //   image: event.target.files[0]
    // }));


    const selectedImage = event.target.files[0];

    if (selectedImage) {
      // 이미지 파일인지 확인
      if (selectedImage.type.startsWith('image/')) {
        //setImage(selectedImage);

        setEventData((prevEventData) => ({
          ...prevEventData,
          image: selectedImage
        }));

        // 이미지 미리보기 생성
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedImage);
      } else {
        // 이미지 파일이 아닌 경우 초기화
        setPreviewUrl(null);
        setEventData((prevEventData) => ({
          ...prevEventData,
          image: null
        }));
        alert('이미지 파일만 업로드할 수 있습니다.');
      }
    }

  };

  const handleRemoveImage = () => {
    // 이미지 제거
    setPreviewUrl(null);
    setEventData((prevEventData) => ({
      ...prevEventData,
      image: null
    }));
  };

  //등록하기 API
  const submitRegEvent = async (e) => {
    e.preventDefault();

    console.log(EventData);
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    const result = window.confirm('앨범을 등록하시겠습니까?');

    if (!result) {
      return;
    }


    try {
      const response = await axios.post('http://localhost:8080/api/Events', EventData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      setEventData({
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
        image: null
      });
      alert('등록되었습니다.');
      navigate('/music/EventList');
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
              <strong>앨범등록</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={submitRegEvent}
              >
                <CCol xs={10} >
                  <CFormLabel></CFormLabel>
                </CCol>
                <CCol xs={2} >
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                  <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={EventData.useYn} onChange={(e) => setEventData({ ...EventData, useYn: e.target.value })} />
                </CCol>
                <CCol xs={3}>
                  {previewUrl ? (<CImage rounded thumbnail align="center" src={previewUrl} width={150} height={150} />) : (
                    <CImage rounded thumbnail align="center" src={ReactImg} width={150} height={150} />
                  )}
                </CCol>
                <CCol xs={9}>
                  <CCardBody>
                    <CCardText>
                      <CFormInput type="file" size="lg" accept="image/*" id="formFile" onChange={handleFileChange} />
                    </CCardText>
                  </CCardBody>
                </CCol>
                {/* <CCol xs={2}>
                  <CCardBody>
                    <CCardText>
                      {previewUrl ? (
                        <CButton color="secondary" onClick={handleRemoveImage}>삭제</CButton>) : ('')}
                    </CCardText>
                  </CCardBody>
                </CCol> */}

                <CCol xs={6}>
                  <CFormLabel htmlFor="lab_media">미디어*</CFormLabel>
                  <CFormSelect id="sel_media" defaultValue={EventData.media} onChange={(e) => setEventData({ ...EventData, media: e.target.value })}  >
                    {midiaCD.map((item, index) => (
                      <option value={item.id} key={index}>{item.name}</option>
                    ))}
                  </CFormSelect>
                  <CFormFeedback invalid>미디어를 선택해주세요</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputLabel">Label</CFormLabel>
                  <CFormInput type="text" id="inputLabel" onChange={(e) => setEventData({ ...EventData, label: e.target.value })} maxLength={100} />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputName">앨범명*</CFormLabel>
                  <CFormInput type="text" id="inputName" required onChange={(e) => setEventData({ ...EventData, name: e.target.value })} maxLength={100} />
                  <CFormFeedback invalid>앨범명을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputAartist">아티스트*</CFormLabel>
                  <CFormInput type="text" id="inputAartist" required onChange={(e) => setEventData({ ...EventData, artist: e.target.value })} maxLength={100} />
                  <CFormFeedback invalid>아티스트를 입력해주세요.</CFormFeedback>
                </CCol>

                <CCol md={12}>
                  <CFormLabel htmlFor="inputSeries">Series</CFormLabel>
                  <CFormInput type="text" id="inputSeries" onChange={(e) => setEventData({ ...EventData, series: e.target.value })} maxLength={100} />
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="inputFormat">Format</CFormLabel>
                  <CFormTextarea id="inputFormat" rows="3" onChange={(e) => setEventData({ ...EventData, format: e.target.value })} maxLength={250}></CFormTextarea>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputCountry">발매국가*</CFormLabel>
                  <div >
                    <CFormSelect id="inputCountry" onChange={(e) => setEventData({ ...EventData, country: e.target.value })}>
                      {cntryCD.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>발매국가를 선택해주세요.</CFormFeedback>
                  </div>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputReleaseDate">발매일</CFormLabel>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ display: 'grid', placeItems: 'center', marginRight: 5 }}>
                      <CIcon className="text-secondary" icon={cilCalendar} size="lg" />
                    </div>
                    <div style={{ width: '90%' }}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat={'yyyy-MM-dd'} // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                        className="DatePicker"
                      />
                    </div>
                  </div>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputGenre">장르</CFormLabel>
                  <CFormInput type="text" id="inputGenre" onChange={(e) => setEventData({ ...EventData, musicGenre: e.target.value })} maxLength={100} />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="txtStyle">Style</CFormLabel>
                  <CFormInput type="text" id="txtStyle" onChange={(e) => setEventData({ ...EventData, style: e.target.value })} maxLength={100} />
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

export default EventReg;
