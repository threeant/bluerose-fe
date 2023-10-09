import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import axios from 'axios';
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
  CSpinner,
} from '@coreui/react';
import ReactImg from 'src/assets/images/image400.jpg'
const AlbumForm = () => {
  const { albumId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = date => {
    setSelectedDate(date);
  }

  const [albumInfo, setAlbumInfo] = useState(null);
  useEffect(() => {

    console.log('조회할 ID ' + albumId);

    if (albumId > 0) {
      /*
      // API를 호출하고 데이터를 받아오는 함수를 정의합니다.
      const fetchData = async () => {
        try {
          const response = await axios.get('API_URL'); // API_URL에 실제 API 엔드포인트를 입력합니다.
          setAlbumInfo(response.data); // API에서 받아온 데이터를 상태에 저장합니다.
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      // fetchData 함수를 호출하여 데이터를 가져옵니다.
      fetchData();
*/

      console.log('조회!!');

      const albumInfo2 = {
        albumId: '9',
        albumImgUrl: '/static/media/8.35ee8919ea545620a475.jpg',
        mediaCd: '2',
        albumNm: 'I Met You When I Was 18.',
        label: 'sssssssssss',
        artistNm: 'Lauv',
        format: 'dffdsfsdf',
        cntryCd: '2',
        relesDt: '2020-04-20',
        genrCd: 'Pop',
        useYn: 'N',
        style: 'style~style'
      }
      handleDateChange(new Date('2020-04-20'));
      setAlbumInfo(albumInfo2);
    } else {
      const albumInfo2 = {
        albumId: '',
        albumImgUrl: '',
        mediaCd: '',
        albumNm: '',
        label: '',
        artistNm: '',
        format: '',
        cntryCd: '1',
        relesDt: '',
        genrCd: '',
        useYn: 'Y',
        style: ''
      }
      setAlbumInfo(albumInfo2);

    }

  }, [albumId]);


  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <CContainer>
      <CRow>
        <CCol >
          <CCard className="mb-4">
            <CCardHeader>
              {albumInfo && albumInfo.albumId ? (<strong>앨범수정</strong>) : (<strong>앨범등록</strong>)} <small></small>
            </CCardHeader>
            <CCardBody>
              {albumInfo ? (
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CCol xs={10} >
                    {albumInfo.albumId ? (<CFormLabel htmlFor="validationCustom04">ID : {albumInfo.albumId}</CFormLabel>) : ''}
                  </CCol>
                  <CCol xs={2} >
                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                    {albumInfo.useYn == 'Y' ? (<CFormSwitch label="사용여부" id="useYn" defaultChecked />) : (<CFormSwitch label="사용여부" id="useYn" />)}
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
                    <CFormLabel htmlFor="mediaCd">미디어*</CFormLabel>
                    <CFormSelect id="mediaCd" value={albumInfo.mediaCd} onChange={(e) => setAlbumInfo({ ...albumInfo, mediaCd: e.target.value })}>
                      <option value="1" >LP</option>
                      <option value="2">CD</option>
                    </CFormSelect>
                    <CFormFeedback invalid>미디어를 선택해주세요</CFormFeedback>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="label">Label</CFormLabel>
                    <CFormInput type="text" id="label" value={albumInfo.label} onChange={(e) => setAlbumInfo({ ...albumInfo, label: e.target.value })} />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="albumNm">앨범명*</CFormLabel>
                    <CFormInput type="text" id="albumNm" value={albumInfo.albumNm} onChange={(e) => setAlbumInfo({ ...albumInfo, albumNm: e.target.value })} required />
                    <CFormFeedback valid>앨범명을 입력해주세요.</CFormFeedback>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="artistNm">아티스트*</CFormLabel>
                    <CFormInput type="text" id="artistNm" value={albumInfo.artistNm} onChange={(e) => setAlbumInfo({ ...albumInfo, artistNm: e.target.value })} required />
                    <CFormFeedback valid>아티스트를 입력해주세요.</CFormFeedback>
                  </CCol>

                  <CCol xs={12}>
                    <CFormLabel htmlFor="format">Format</CFormLabel>
                    <CFormTextarea id="format" rows="3" defaultValue={albumInfo.format} />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="cntryCd">발매국가</CFormLabel>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'grid', placeItems: 'center', margin: 5 }}>
                        <CIcon className="text-secondary" icon={cifUs} size="lg" />
                      </div>
                      <div style={{ width: '60%' }}>
                        <CFormSelect id="cntryCd" value={albumInfo.cntryCd} onChange={(e) => setAlbumInfo({ ...albumInfo, cntryCd: e.target.value })}>
                          <option value="1">USA</option>
                          <option value="2">KOREA</option>
                        </CFormSelect>
                      </div>
                    </div>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="relesDt">발매일</CFormLabel>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'grid', placeItems: 'center', marginRight: 5 }}>
                        <CIcon className="text-secondary" icon={cilCalendar} size="lg" />
                      </div>
                      <div style={{ width: '100%' }}>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat={'yyyy-MM-dd'} // 날짜 형태
                          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                          minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                          maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                          className="DatePicker"
                          width="100%"
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="style">Style</CFormLabel>
                    <CFormInput type="text" id="style" value={albumInfo.style} onChange={(e) => setAlbumInfo({ ...albumInfo, style: e.target.value })} />
                  </CCol>

                  <div className="d-grid gap-2">
                    <CRow className="justify-content-between">
                      <CCol xs={12}>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton component="input" type="button" color="light" value="목록" />
                          <CButton component="input" color="primary" type="submit" value="등록하기" />
                        </div>
                      </CCol>
                    </CRow>
                  </div>
                </CForm>
              ) : (<div className="d-flex justify-content-center">
                <CSpinner />
              </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    </CContainer>
  );
};

export default AlbumForm;
