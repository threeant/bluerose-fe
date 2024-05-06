import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate , useLocation} from 'react-router-dom'
import axios from 'axios'
import { getCodeList, throwError } from '../../common/utils'
import axiosInstance from '../../common/axiosInstance';
import PaginationComponent from '../common/PaginationComponent';
import ComModal from '../../common/ComModal'; // 모달 컴포넌트 임포트
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CFormLabel,
  CFormInput,
  CForm,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import {
  cilCalendar
} from '@coreui/icons'

const EventList = () => {
  /**********************************************************************
   * 공통코드 영역
  **********************************************************************/
  const navigate = useNavigate();
  const location = useLocation();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
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
    

    setAcceptType('');
    
  };

  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  const [selectedDate, setSelectedDate] = useState(null); //등록일 from
  const [selectedDate2, setSelectedDate2] = useState(null); // 등록일 to

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0); // 현재 페이지 상태
  //const { searchParam} = location.state;


  // 날짜가 선택될 때 호출될 콜백 함수
  const handleDateChange = date => {
    debugger;
    //console.log(date);
    setSelectedDate(date);
    if(!date){
      return;
    }

    
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)); // 로컬 시간대로 조정
    const formattedDate = localDate.toISOString().slice(0, 10);
    
    console.log(formattedDate);
    setEventSearch({ ...eventSearch, startReleaseDate: formattedDate })

  }
  const handleDateChange2 = date => {
    setSelectedDate2(date);
    if(!date){
      return;
    }

    
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)); // 로컬 시간대로 조정
    const formattedDate = localDate.toISOString().slice(0, 10);
    setEventSearch({ ...eventSearch, endReleaseDate: formattedDate })
  }

  const [searchQuery, setSearchQuery] = useState('');

  //검색조건
  const [eventSearch, setEventSearch] = useState({
    "artist": "",
    "endReleaseDate": "",
    "musicGenre": "",
    "name": "",
    "page": 0,
    "size": 15,
    "startReleaseDate": "",
    "mediaCode": ""
  });

  const [albumSearchFlg, setEventSearchFlg] = useState(false);

  

  //초기화
  const clickReset = date => {

    setSelectedDate(null);
    setSelectedDate2(null);

    setEventSearch({
      "artist": "",
      "endReleaseDate": "",
      "musicGenre": "",
      "name": "",
      "page": 1,
      "size": 15,
      "startReleaseDate": "",
      "mediaCode": ""
    });
  }

  const goFormClick = () => { //등록화면이동
    navigate('/manage/eventReg');
  }

  const goInfoClick = (e, id) => {
    // 페이지 이동 방지
    e.preventDefault();
    //console.log('goInfoClick : ' + id);

    // 새로운 동작 실행
    // 예시: id를 이용한 페이지 이동 또는 다른 동작 수행
    //const newQuery = encodeURIComponent(eventSearch);
    //setSearchQuery(newQuery);
      console.log(id)
    localStorage.setItem('alblumListSearch', JSON.stringify(eventSearch));
    navigate('/manage/eventInfo', { state: { albumId: id , listSearch : eventSearch} });
    //history.push('/music/albumInfo'+id);
  };

  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //리스트
  const [eventDatas, seteventDatas] = useState({ contents: [] });

  
  //조회하기
  const submitSearch = (e) => {
    e.preventDefault();
    handlePageChange(1);
  }

  //페이지 변경
  const handlePageChange = (page) => {
    //console.log('현재페이지 ');
    //console.log(page);
    setCurrentPage(page); // 페이지 변경 시 현재 페이지 상태 업데이트
    submitSearchEvents(page);
  };

  useEffect(() => {
    
    const dataFromStorage = JSON.parse(localStorage.getItem('alblumListSearch'));

    if (dataFromStorage) {
      setEventSearch(dataFromStorage);
      handlePageChange(dataFromStorage.page);
      setEventSearchFlg(true);
      localStorage.removeItem('alblumListSearch');
      
    }else{
      submitSearchEvents(0);
    }

  }, []);

  useEffect(() => {
    if (albumSearchFlg) {
      handlePageChange(eventSearch.page); // albumSearch가 변경될 때만 호출됨
      localStorage.removeItem('alblumListSearch');
    }
  }, [albumSearchFlg]);

  //검색 API
  const submitSearchEvents = async (page) => {

    if(page > -1){
      setEventSearch(prevState => ({
        ...prevState,
        page: page
      }));

      eventSearch.page = page;
    }

    

    console.log(eventSearch);


    if(eventSearch.endReleaseDate || eventSearch.startReleaseDate){
      if(!eventSearch.endReleaseDate || !eventSearch.startReleaseDate){
        alertPage('등록일 기간을 정확히 입력해주세요.')
        return;
      }
    }

    try {
      const response = await axiosInstance.get('/api/albums', {
        params: eventSearch,
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      seteventDatas(data);

      console.log(data);
      setTotalPages(data.totalPages);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      //console.log(error);
      throwError(error,navigate);
    }

  };

  const submitRegEvent = async (e) => {
    e.preventDefault();

    //console.log(eventSearch);

    try {
      const response = await axiosInstance.get('/api/albums', {
        params: eventSearch
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      seteventDatas(data);

      //console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      //console.log(error);
      throwError(error,navigate);
    }

  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>이벤트관리</CCardHeader>
            <CCardBody>
              <CForm className="row" onSubmit={submitSearch}>
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputMedia" className="col-form-label">타입</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormSelect id="inputMedia" aria-label="미디어" onChange={(e) => setEventSearch({ ...eventSearch, mediaCode: e.target.value })}>
                      <option>-전체-</option>
                      {midiaCD.map((item, index) => (
                        <option value={item.id} key={index}>{item.etc1}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputMusicGenre" className="col-form-label" >이벤트명</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormInput type="text" id="inputMusicGenre" aria-label="이벤트명" placeholder="전체" onChange={(e) => setEventSearch({ ...eventSearch, musicGenre: e.target.value })} />
                  </CCol>
                </CRow>
                
                <CRow className="mb-3">
                  <CCol md={1}>
                    <CFormLabel htmlFor="inputEmail3" className="col-form-label">이벤트 기간</CFormLabel>
                  </CCol>
                  <CCol md={5}>
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
                </CRow>
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={4}>
                      <CButton component="input" type="button" color="danger" value="등록하기" onClick={goFormClick} />
                    </CCol>
                    <CCol xs={4}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" type="reset" color="light" value="초기화" onClick={clickReset} />
                        <CButton component="input" color="primary" type="submit" value="조회하기" />
                      </div>
                    </CCol>
                  </CRow>
                </div>
              </CForm>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">이벤트타입</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">이벤트명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">이벤트기간</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">전시여부</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {eventDatas.contents && eventDatas.contents.length > 0 ? (
                    eventDatas.contents.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} onClick={(e) => goInfoClick(e, item.id)}>
                        <CTableDataCell className="text-center">
                          <strong>{item.id}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <strong>{item.type}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <a href='/' onClick={(e) => goInfoClick(e, item.name)}>{item.name}</a>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.date}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.dispYn}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) :
                    (
                      <CTableRow v-for="item in tableItems" >
                        <CTableDataCell className="text-center" colSpan={6} key={0}>
                          조회된 데이터가 없습니다.
                        </CTableDataCell>
                      </CTableRow>
                    )
                  }
                </CTableBody>
              </CTable>
              <br />
              {eventDatas.contents && eventDatas.contents.length > 0 ? (
                <CRow>
                  <CCol md={{ span: 6, offset: 5 }}>
                  <PaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                  </CCol>
                  <CCol md={1}>
                    총 {eventDatas.totalCount}건
                  </CCol>
                </CRow>
              ) : ''}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    </>
  )
}

export default EventList
