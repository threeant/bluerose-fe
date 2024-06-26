import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../common/axiosInstance';

import PaginationComponent from '../common/PaginationComponent';
import { throwError } from '../../common/utils'
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
import ComModal from '../../common/ComModal'; // 모달 컴포넌트 임포트
import {
  cilCalendar
} from '@coreui/icons'

const MusicReqHisList = () => {
  /**********************************************************************
   * 공통코드 영역
  **********************************************************************/
  const navigate = useNavigate();


  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  const [selectedDate, setSelectedDate] = useState(null); //등록일 from
  const [selectedDate2, setSelectedDate2] = useState(null); // 등록일 to

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0); // 현재 페이지 상태

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

  //검색조건
  const [albumSearch, setAlbumSearch] = useState({
    "startDate": "",
    "endDate": "",
    "page": 1,
    "size": 15
  });

  //페이지 변경
  const handlePageChange = (page) => {
    //console.log('현재페이지 ');
    //console.log(page);
    setCurrentPage(page); // 페이지 변경 시 현재 페이지 상태 업데이트
    submitSearchAlbums(page);
  };


  // 날짜가 선택될 때 호출될 콜백 함수
  const handleDateChange = date => {
    console.log(date);
    setSelectedDate(date);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)); // 로컬 시간대로 조정
    const formattedDate = localDate.toISOString().slice(0, 10);
    console.log(formattedDate);
    //setAlbumSearch({ ...albumSearch, startDate: formattedDate });
    setAlbumSearch(prevState => ({
      ...prevState,
      startDate: formattedDate
    }));

  }
  const handleDateChange2 = date => {
    setSelectedDate2(date);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)); // 로컬 시간대로 조정
    const formattedDate = localDate.toISOString().slice(0, 10);
    setAlbumSearch(prevState => ({
      ...prevState,
      endDate: formattedDate
    }));
  }

  useEffect(() => {
    // 7일 전 날짜 계산
    const todayDate = new Date();
    const pastDate = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7일 전 날짜 계산
    
    handleDateChange(pastDate);
    handleDateChange2(todayDate);

    //submitSearchAlbums(0);
  }, []);

  //초기화
  const clickReset = date => {


    setAlbumSearch({
      "startDate": "",
      "endDate": "",
      "page": 1,
      "size": 1
    });
    const todayDate = new Date();
    const pastDate = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7일 전 날짜 계산
    handleDateChange(pastDate);
    handleDateChange2(todayDate);
  }

  const goInfoClick = (e, date) => {
    // 페이지 이동 방지
    e.preventDefault();
    console.log('goInfoClick : ' + date);

    // 새로운 동작 실행
    // 예시: id를 이용한 페이지 이동 또는 다른 동작 수행
    navigate('/music/musicReqHisInfo', { state: { dateStr :  date} });
  };

  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //리스트
  const [albumDatas, setAlbumDatas] = useState({ contents: [] });

  


  //검색 API
  const submitSearchAlbums = async (page) => {

    console.log(albumSearch);
    if(page > -1){
      setAlbumSearch(prevState => ({
        ...prevState,
        page: page
      }));

      albumSearch.page = page;
    }

    

    console.log(albumSearch);


      if(!albumSearch.startDate || !albumSearch.endDate){
        alertPage('등록일 기간을 정확히 입력해주세요.')
        return;
      }
    


    try {
      const response = await axiosInstance.get('/api/song-request/history', {
        params: albumSearch,
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setAlbumDatas(data);

      console.log(data);

      console.log(data);
      setTotalPages(data.totalPages);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  return (
    <>
      <ComModal type={alertType} visible={alertVisible} onClose={handleCloseModal} alertText={alertText} onAccpet={handleAccept}/>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader><strong>신청곡 히스토리 검색</strong></CCardHeader>
            <CCardBody>
              <CForm className="row" >
                <CRow className="mb-3">
                  <CCol md={1}>
                    <CFormLabel htmlFor="inputEmail3" className="col-form-label">검색일</CFormLabel>
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
                          value={albumSearch.startDate}
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
                          value={albumSearch.endDate}
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={12}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" type="reset" color="light" value="초기화" onClick={clickReset} />
                        <CButton component="input" color="primary" type="submit" value="조회하기" onClick={submitSearchAlbums}/>
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
                    <CTableHeaderCell className="text-center">날짜</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">신청곡수</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {albumDatas.contents && albumDatas.contents.length > 0 ? (
                    albumDatas.contents.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} >
                        <CTableDataCell className="text-center">
                          <strong>{index + 1}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <a href='/' onClick={(e) => goInfoClick(e, item.date)}>{item.date}</a>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.numberOfSongRequested}
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
              {albumDatas.contents && albumDatas.contents.length > 0 ? (
                <CRow>
                  <CCol md={{ span: 6, offset: 5 }}>
                  <PaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                  </CCol>
                  <CCol md={1}>
                    총 {albumDatas.totalCount}건
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

export default MusicReqHisList
