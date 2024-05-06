import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { getCodeList, throwError } from '../../common/utils'
import appConfig from '../../common/appConfig';
import {
  cilCalendar,
  cifUs,
} from '@coreui/icons';
import ComModal from '../../common/ComModal'; // 모달 컴포넌트 임포트
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
  CSpinner,
} from '@coreui/react';
import ReactImg from 'src/assets/images/image400.jpg'
const EventInfo = () => {

  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('EVENT')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

  /**********************************************************************
   * 메세지영역
  **********************************************************************/
  const [alertType, setAlertType] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [acceptType, setAcceptType] = useState('');
 


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
    if(acceptType === 'update'){//앨범수정
      submitUpdateEvent();
    }else if(acceptType === 'deleteSong'){//곡 삭제
        submitDeletSong();
    }else if(acceptType === 'reqSong'){//곡 등록
        submitReqSong(true);
    }

    setAcceptType('');
    
  };

  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  const location = useLocation();
  const { albumId, listSearch } = location.state;

  //목록이동
  const goListClick = () => {
    
    //const newQuery = encodeURIComponent(listSearch);
    navigate('/manage/eventList');

    //, { state: { albumId: id , listSearch : albumSearch} }
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null); // 등록일 to

  const handleDateChange = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    setSelectedDate(date);
    setEventData({ ...albumData, startDate: formattedDate })
  }
  const handleDateChange2 = date => {
    setSelectedDate2(date);
    const formattedDate = date.toISOString().slice(0, 10);
    
    setEventData({ ...albumData, endDate: formattedDate })
  }

  useEffect(() => {

    submitSearchEvent();

  }, []); // 빈 배열을 넣어 처음 한 번만 실행되도록 설정 d x


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
    setEventData((prevEventData) => ({
      ...prevEventData,
      image: event.target.files[0]
    }));


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
        alertPage('이미지 파일만 업로드할 수 있습니다.');
      }
    }

  };

  /**********************************************************************
  * 비즈니스로직 영역
  **********************************************************************/
  //앨범 유효성검사
  const [validated, setValidated] = useState(false);

  //앨범 상세 
  const [albumData, setEventData] = useState();

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
      const response = await axiosInstance.get('/api/albums/' + albumId);

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
      console.log(error);
      throwError(error,navigate);
    }

  };

  //곡 검색 API
  const submitSearchSong = async () => {

    try {
      const response = await axiosInstance.get('/api/albums/' + albumId + '/songs');

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setSongDatas(data);
      console.log("곡 결과 ----")
      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  //앨범 수정하기 API
  const confirmSubmitUpdateEvent = async (e) => {
    e.preventDefault();

    console.log(albumData);
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    //const result = window.confirm('수정하시겠습니까?');
    confirmPage('앨범정보를 수정하시겠습니까?', 'update');
  }

  //앨범 수정하기 API
  const submitUpdateEvent = async () => {
    

    try {
      const response = await axiosInstance.post('/api/albums/' + albumId, albumData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alertPage('수정되었습니다.');
      setValidated(false);
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  //곡 등록 클릭
  const clickReqSong = (e) => {
    e.preventDefault();

    if (!songReqData.trackInfo) {
      alertPage('Track Number를 입력해 주세요.');
      return;
    }

    if (!songReqData.trackName) {
      alertPage('Title을 입력해주세요.');
      return;
    }

    if (!songReqData.runtime) {
      alertPage('Running Time을 입력해주세요.');
      return;
    } else {
      if (/^\d{0,2}:\d{0,2}$/.test(songReqData.runtime) == false) {
        alertPage('Running Time을 알맞게 입력해주세요 [00:00] 형식 ');
        return;
      }
    }


    //const result = window.confirm('해당곡을 등록 하시겠습니까?');
    confirmPage('곡을 등록 하시겠습니까?', 'reqSong')

  };


  //곡 등록 하기 API
  const submitReqSong = async () => {

    try {
      const response = await axiosInstance.post('/api/albums/' + albumId + '/songs', songReqData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alertPage('등록되었습니다.');
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
      console.log(error);
      throwError(error,navigate);
    }

  };

  //곡 삭제 클릭
  const [songId, setSongId] = useState('');
  const clickDeletSong = (e, songId) => {
    e.preventDefault();

    //const result = window.confirm('해당곡을 삭제 하시겠습니까?');
    confirmPage('해당곡을 삭제 하시겠습니까?', 'deleteSong');
    setSongId(songId);
  };

  //곡 삭제 API
  const submitDeletSong = async () => {

    console.log(songId);

    try {
      const response = await axiosInstance.delete('/api/songs/' + songId);

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alertPage('삭제되었습니다.');
      setValidated(false);
      submitSearchSong();

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };



  return (
    <CContainer>
      <ComModal type={alertType} visible={alertVisible} onClose={handleCloseModal} alertText={alertText} onAccpet={handleAccept} />
      
      <CRow>
        <CCol >
          <CCard className="mb-4">
            <CCardHeader>
              <strong>이벤트수정</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              {albumData ? (
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={confirmSubmitUpdateEvent}
                >
                  <CCol xs={10} >
                    <CFormLabel htmlFor="validationCustom04">ID : {albumId}</CFormLabel>
                  </CCol>
                  <CCol xs={2} >
                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                    <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={albumData.useYn} onChange={(e) => setEventData({ ...albumData, useYn: e.target.checked })} />
                  </CCol>
                  <CCol xs={6}>
                    {previewUrl ? (<CImage rounded thumbnail align="center"  src={previewUrl} width={150} height={150} />) : (
                      <CImage rounded thumbnail align="center" src={process.env.PUBLIC_URL + '/basicImg/w_lp2.png'} width={250} height={150} />
                    )}
                  </CCol>
                  <CCol xs={6}>
                    <CCardBody>
                      <CCardText>
                        <CFormInput type="file" size="lg" accept="image/*" id="formFile" onChange={handleFileChange} ref={fileInputRef} />
                      </CCardText>
                    </CCardBody>
                  </CCol>

                  <CCol xs={6}>
                    <CFormLabel htmlFor="lab_media">이벤트 타입* </CFormLabel>
                    <CFormSelect id="sel_media" disabled='true' value={28} onChange={(e) => setEventData({ ...albumData, mediaCD: e.target.value })}  >
                      {midiaCD.map((item, index) => (
                        <option value={item.id} key={index}>{item.etc1}</option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>미디어를 선택해주세요</CFormFeedback>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="inputLabel">이벤트 기간 *</CFormLabel>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'grid', placeItems: 'center', marginRight: 5 }}>
                        <CIcon className="text-secondary" icon={cilCalendar} size="lg" />
                      </div>
                      <div>
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
                      <div style={{ whiteSpace: 'pre-wrap', display: 'grid', placeItems: 'center' }}>
                        <span> ~ </span>
                      </div>
                      <div style={{ display: 'grid', placeItems: 'center', marginRight: 5 }}>
                        <CIcon className="text-secondary" icon={cilCalendar} size="lg" />
                      </div>
                      <div>
                        <DatePicker
                          selected={selectedDate2}
                          onChange={handleDateChange2}
                          dateFormat={'yyyy-MM-dd'} // 날짜 형태
                          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                          minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                          maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                          className="DatePicker"
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol xs={12}>
                    <CFormLabel htmlFor="inputName">이벤트 명*</CFormLabel>
                    <CFormInput type="text" id="inputName" value={albumData.name} required onChange={(e) => setEventData({ ...albumData, name: e.target.value })} maxLength={100} />
                    <CFormFeedback invalid>앨범명을 입력해주세요.</CFormFeedback>
                  </CCol>
                  
                  <CCol xs={12}>
                    <CFormLabel htmlFor="inputFormat">비고</CFormLabel>
                    <CFormTextarea id="inputFormat" rows="3" value={albumData.format} onChange={(e) => setEventData({ ...albumData, format: e.target.value })} maxLength={250}  ></CFormTextarea>
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
          <strong>참여자</strong> <small></small><CButton component="input" type="button" color="danger" value="정보삭제"  />
        </CCardHeader>
        {albumData ? (
          <CCardBody>
            <CRow>
              <CCol xs={1}>
                <CFormInput type="text" id="staNo" value="No" readOnly plainText />
              </CCol>
              <CCol xs={4}>
                <CFormInput type="text" id="staTrackNumber" value="이름" readOnly plainText />
              </CCol>
              <CCol xs={5}>
                <CFormInput type="text" id="staTitle" value="연락처" readOnly plainText />
              </CCol>
              <CCol xs={1}>
                <CFormInput type="text" id="staNo" value="당첨여부" readOnly plainText />
              </CCol>
              <CCol xs={1}>
                <CFormInput type="text" id="staNo" value="당첨" readOnly plainText />
              </CCol>
            </CRow>
            {songDatas.map((item, index) => (
              <CRow key={index}>
                <CCol xs={1}>
                  <CFormInput type="text" id={'txtNoReq${index}'} value={songDatas.length - index} readOnly plainText />
                </CCol>
                <CCol xs={4}>
                  {/* <CFormInput type="text" id={'txtTrackNumber${index}'} value={item.trackNumber} readOnly plainText /> */}
                  김떙떙
                </CCol>
                <CCol xs={5}>
                  {/* <CFormInput type="text" id={'txtTrackName${index}'} value={item.trackName} readOnly plainText /> */}
                  010-XXXX-XXXX
                </CCol>
                <CCol xs={1}>
                  X
                </CCol>
                <CCol xs={1}>
                  <CButton color="dark" className="mb-3" onClick={(e) => clickDeletSong(e, item.id)}>
                    당첨
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
