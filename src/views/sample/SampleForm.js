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
const SampleForm = () => {

  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

  const goListClick = () => {
    navigate('/sample/sampleList');
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    console.log(formattedDate);
    setSelectedDate(date);
    console.log(selectedDate);
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

  const handleSubmit = async (e) => {
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
              <strong>샘플등록</strong> <small>샘플수정입니다.</small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol xs={12} >
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                  <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={albumData.useYn} onChange={(e) => setAlbumData({ ...albumData, useYn: e.target.value })} />
                </CCol>
                <CCol xs={12}>
                  <CImage rounded thumbnail align="center" src={ReactImg} width={150} height={150} />
                  <CCardBody>
                    <CCardText>
                      <CFormInput type="file" id="formFile" />
                    </CCardText>
                  </CCardBody>
                </CCol>

                <CCol xs={6}>
                  <CFormLabel htmlFor="lab_media">미디어*</CFormLabel>
                  <CFormSelect id="sel_media" defaultValue={albumData.media} onChange={(e) => setAlbumData({ ...albumData, media: e.target.value })}  >
                    {midiaCD.map((item, index) => (
                      <option value={item.id} key={index}>{item.name}</option>
                    ))}
                  </CFormSelect>
                  <CFormFeedback invalid>미디어를 선택해주세요</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="txt_label">Label</CFormLabel>
                  <CFormInput type="text" id="txt_label" defaultValue="" />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="txt_name">앨범명*</CFormLabel>
                  <CFormInput type="text" id="txt_name" defaultValue="" required onChange={(e) => setAlbumData({ ...albumData, name: e.target.value })} />
                  <CFormFeedback invalid>앨범명을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="txt_artist">아티스트*</CFormLabel>
                  <CFormInput type="text" id="txt_artist" defaultValue="" required onChange={(e) => setAlbumData({ ...albumData, artist: e.target.value })} />
                  <CFormFeedback invalid>아티스트를 입력해주세요.</CFormFeedback>
                </CCol>

                <CCol md={12}>
                  <CFormLabel htmlFor="txt_series">Series</CFormLabel>
                  <CFormInput type="text" id="txt_series" onChange={(e) => setAlbumData({ ...albumData, series: e.target.value })} />
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="txt_format">Format</CFormLabel>
                  <CFormTextarea id="txt_format" rows="3"></CFormTextarea>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="txt_country">발매국가*</CFormLabel>
                  <div >
                    <CFormSelect id="txt_country" onChange={(e) => setAlbumData({ ...albumData, country: e.target.value })}>
                      {cntryCD.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>발매국가를 선택해주세요.</CFormFeedback>
                  </div>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="txt_releaseDate">발매일</CFormLabel>
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
                  <CFormLabel htmlFor="txt_genre">장르</CFormLabel>
                  <CFormInput type="text" id="txt_genre" onChange={(e) => setAlbumData({ ...albumData, musicGenre: e.target.value })} />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="txt_style">Style</CFormLabel>
                  <CFormInput type="text" id="txt_style" onChange={(e) => setAlbumData({ ...albumData, style: e.target.value })} />
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

export default SampleForm;
