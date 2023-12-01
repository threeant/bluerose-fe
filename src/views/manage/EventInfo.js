import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  CSpinner,
} from '@coreui/react';
import ReactImg from 'src/assets/images/image400.jpg'
const EventInfo = () => {

  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  const location = useLocation();
  const { EventId } = location.state;

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

  useEffect(() => {

    submitSearchEvent();

  }, []); // 빈 배열을 넣어 처음 한 번만 실행되도록 설정


  const setSongRuntime = (e) => {
    const value = e.target.value;

    if (/^[\d:]*$/.test(value)) {
      setSongReqData({ ...songReqData, runtime: e.target.value });
    }

  }

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

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

  /**********************************************************************
  * 비즈니스로직 영역
  **********************************************************************/
  //앨범 유효성검사
  const [validated, setValidated] = useState(false);

  //앨범 상세 
  const [EventData, setEventData] = useState();

  // 곡조회리스트
  const [songDatas, setSongDatas] = useState([]);

  // 곡등록
  const [songReqData, setSongReqData] = useState(
    {
      "runtime": "",
      "trackName": "",
      "trackInfo": ""
    }
  );



  //앨범 검색 API
  const submitSearchEvent = async () => {

    try {
      const response = await axios.get('http://localhost:8080/api/Events/' + EventId);

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setEventData(data);
      console.log("앨범결과 ----")
      console.log(data);
      if (data.imageUrl) {
        setPreviewUrl(data.imageUrl);
      }

      submitSearchSong();

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  //곡 검색 API
  const submitSearchSong = async () => {

    try {
      const response = await axios.get('http://localhost:8080/api/Events/' + EventId + '/songs');

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setSongDatas(data);
      console.log("곡 결과 ----")
      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  //앨범 수정하기 API
  const submitUpdateEvent = async (e) => {
    e.preventDefault();

    console.log(EventData);
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    const result = window.confirm('수정하시겠습니까?');

    if (!result) {
      setValidated(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/Events/' + EventId, EventData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('수정되었습니다.');
      setValidated(false);
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  //곡 등록 클릭
  const clickReqSong = (e) => {
    e.preventDefault();

    if (!songReqData.trackInfo) {
      alert('Track Number를 입력해 주세요.');
      return;
    }

    if (!songReqData.trackName) {
      alert('Title을 입력해주세요.');
      return;
    }

    if (!songReqData.runtime) {
      alert('Running Time을 입력해주세요/');
      return;
    } else {
      if (/^\d{0,2}:\d{0,2}$/.test(songReqData.runtime) == false) {
        alert('Running Time을 알맞게 입력해주세요 [00:00] 형식 /');
        return;
      }
    }


    const result = window.confirm('해당곡을 등록 하시겠습니까?');

    if (!result) {
      return;
    }

    submitReqSong();

  };


  //곡 등록 하기 API
  const submitReqSong = async () => {

    try {
      const response = await axios.post('http://localhost:8080/api/Events/' + EventId + '/songs', songReqData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('등록되었습니다.');
      setValidated(false);
      submitSearchSong();
      setSongReqData(
        {
          "runtime": "",
          "trackName": "",
          "trackInfo": ""
        }
      );

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  //곡 삭제 클릭
  const clickDeletSong = (e, songId) => {
    e.preventDefault();

    const result = window.confirm('해당곡을 삭제 하시겠습니까?');

    if (!result) {
      return;
    }

    submitDeletSong(songId);
  };

  //곡 삭제 API
  const submitDeletSong = async (songId) => {

    console.log(songId);

    try {
      const response = await axios.delete('http://localhost:8080/api/songs/' + songId);

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('삭제되었습니다.');
      setValidated(false);
      submitSearchSong();

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
              <strong>앨범수정</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              {EventData ? (
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={submitUpdateEvent}
                >
                  <CCol xs={10} >
                    <CFormLabel htmlFor="validationCustom04">ID : {EventId}</CFormLabel>
                  </CCol>
                  <CCol xs={2} >
                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                    <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={EventData.useYn} onChange={(e) => setEventData({ ...EventData, useYn: e.target.checked })} />
                  </CCol>
                  <CCol xs={3}>
                    {previewUrl ? (<CImage rounded thumbnail align="center" src={previewUrl} width={150} height={150} />) : (
                      <CImage rounded thumbnail align="center" src={ReactImg} width={150} height={150} />
                    )}
                  </CCol>
                  <CCol xs={9}>
                    <CCardBody>
                      <CCardText>
                        <CFormInput type="file" size="lg" accept="image/*" id="formFile" onChange={handleFileChange} ref={fileInputRef} />
                      </CCardText>
                    </CCardBody>
                  </CCol>

                  <CCol xs={6}>
                    <CFormLabel htmlFor="lab_media">미디어*</CFormLabel>
                    <CFormSelect id="sel_media" value={EventData.media} onChange={(e) => setEventData({ ...EventData, media: e.target.value })}  >
                      {midiaCD.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>미디어를 선택해주세요</CFormFeedback>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="inputLabel">Label</CFormLabel>
                    <CFormInput type="text" id="inputLabel" value={EventData.label} onChange={(e) => setEventData({ ...EventData, label: e.target.value })} maxLength={100} />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="inputName">앨범명*</CFormLabel>
                    <CFormInput type="text" id="inputName" value={EventData.name} required onChange={(e) => setEventData({ ...EventData, name: e.target.value })} maxLength={100} />
                    <CFormFeedback invalid>앨범명을 입력해주세요.</CFormFeedback>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="inputAartist">아티스트*</CFormLabel>
                    <CFormInput type="text" id="inputAartist" value={EventData.artist} required onChange={(e) => setEventData({ ...EventData, artist: e.target.value })} maxLength={100} />
                    <CFormFeedback invalid>아티스트를 입력해주세요.</CFormFeedback>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel htmlFor="inputSeries">Series</CFormLabel>
                    <CFormInput type="text" id="inputSeries" value={EventData.series} onChange={(e) => setEventData({ ...EventData, series: e.target.value })} maxLength={100} />
                  </CCol>

                  <CCol xs={12}>
                    <CFormLabel htmlFor="inputFormat">Format</CFormLabel>
                    <CFormTextarea id="inputFormat" rows="3" value={EventData.format} onChange={(e) => setEventData({ ...EventData, format: e.target.value })} maxLength={250}  ></CFormTextarea>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="inputCountry">발매국가*</CFormLabel>
                    <div >
                      <CFormSelect id="inputCountry" value={EventData.countryCD} onChange={(e) => setEventData({ ...EventData, countryCD: e.target.value })}>
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
                          value={EventData.releaseDate}
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="txt_genre">장르</CFormLabel>
                    <CFormInput type="text" id="txt_genre" value={EventData.musicGenre} onChange={(e) => setEventData({ ...EventData, musicGenre: e.target.value })} maxLength={100} />
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="txt_style">Style</CFormLabel>
                    <CFormInput type="text" id="txt_style" value={EventData.style} onChange={(e) => setEventData({ ...EventData, style: e.target.value })} maxLength={100} />
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
              ) : (<div className="d-flex justify-content-center">
                <CSpinner />
              </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
      <CCard className="mb-4">
        <CCardHeader>
          <strong>곡</strong> <small></small>
        </CCardHeader>
        {EventData ? (
          <CCardBody>
            <CRow>
              <CCol xs={1}>
                <CFormInput type="text" id="staNo" value="No" readOnly plainText />
              </CCol>
              <CCol xs={3}>
                <CFormInput type="text" id="staTrackNumber" value="Track Number*" readOnly plainText />
              </CCol>
              <CCol xs={5}>
                <CFormInput type="text" id="staTitle" value="Title*" readOnly plainText />
              </CCol>
              <CCol xs={2}>
                <CFormInput type="text" id="staRunningTime" value="Running Time*" readOnly plainText />
              </CCol>
              <CCol xs={1}>
                <CFormInput type="text" id="staButton" value="" readOnly plainText />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={1}>
                <CFormInput type="text" id="staNoReq" value="-" readOnly plainText />
              </CCol>
              <CCol xs={3}>
                <CFormInput type="text" id="inputTrackNumber" value={songReqData.trackInfo} onChange={(e) => setSongReqData({ ...songReqData, trackInfo: e.target.value })} placeholder="A1" maxLength={4} />
              </CCol>
              <CCol xs={5}>
                <CFormInput type="text" id="inputTrackName" value={songReqData.trackName} onChange={(e) => setSongReqData({ ...songReqData, trackName: e.target.value })} placeholder="Title" maxLength={150} />
              </CCol>
              <CCol xs={2}>
                <CFormInput type="text" id="inputTrackRuntime" value={songReqData.runtime} onChange={(e) => setSongRuntime(e)} placeholder="00:00" maxLength={5} />
              </CCol>
              <CCol xs={1}>
                <CButton color="success" className="mb-3" onClick={(e) => clickReqSong(e)}>
                  추가
                </CButton>
              </CCol>
            </CRow>
            {songDatas.map((item, index) => (
              <CRow key={index}>
                <CCol xs={1}>
                  <CFormInput type="text" id={'txtNoReq${index}'} value={songDatas.length - index} readOnly plainText />
                </CCol>
                <CCol xs={3}>
                  <CFormInput type="text" id={'txtTrackNumber${index}'} value={item.trackNumber} readOnly plainText />
                </CCol>
                <CCol xs={5}>
                  <CFormInput type="text" id={'txtTrackName${index}'} value={item.trackName} readOnly plainText />
                </CCol>
                <CCol xs={2}>
                  <CFormInput type="text" id={'txtTrackRuntime${index}'} value={item.runtime} readOnly plainText />
                </CCol>
                <CCol xs={1}>
                  <CButton color="dark" className="mb-3" onClick={(e) => clickDeletSong(e, item.id)}>
                    삭제
                  </CButton>
                </CCol>
              </CRow>
            ))}
          </CCardBody>
        ) : (<div className="d-flex justify-content-center">
          <CSpinner />
        </div>
        )}
      </CCard>
    </CContainer>
  );
};


export default EventInfo;
