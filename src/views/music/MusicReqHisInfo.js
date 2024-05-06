import React, { useState,useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../common/axiosInstance';
import PaginationComponent from '../common/PaginationComponent';
import { getCodeList,throwError } from '../../common/utils'
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

const MusicReqHisInfo = () => {
  /**********************************************************************
   * 공통코드 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  //const { searchParam} = location.state;
  

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0); // 현재 페이지 상태


  //초기화
  const clickReset = date => {

    setAlbumSearch({
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
    navigate('/music/albumReg');
  }

  const goInfoClick = (e, id) => {
    // 페이지 이동 방지
    e.preventDefault();
    console.log('goInfoClick : ' + id);

    // 새로운 동작 실행
    // 예시: id를 이용한 페이지 이동 또는 다른 동작 수행
    navigate('/music/albumInfo', { state: { albumId: id } });
  };

  const location = useLocation();
  const dateStr = location.state.dateStr;

  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //리스트
  const [albumDatas, setAlbumDatas] = useState({ contents: [] });

  //검색조건
  const [albumSearch, setAlbumSearch] = useState({
    "page": 0,
    "size": 30,
    "startDate": location.state.dateStr
  });

 

  useEffect(() => {
    console.log(dateStr);
    submitSearchAlbums();
  }, []);


  //페이지 변경
  const handlePageChange = (page) => {
    //console.log('현재페이지 ');
    //console.log(page);
    setCurrentPage(page); // 페이지 변경 시 현재 페이지 상태 업데이트
    submitSearchAlbums(page);
  };

  //페이징
  const clickPage = (e, page) => {
    e.preventDefault();
    albumSearch.page = page;
    submitSearchAlbums();
    console.log("===page =  : " + page);
  }

  //검색 API
  const submitSearchAlbums = async (page) => {


    if(page > -1){
      setAlbumSearch(prevState => ({
        ...prevState,
        page: page
      }));

      albumSearch.page = page;
    }

    

    console.log(albumSearch);

    try {
      const response = await axiosInstance.get('/api/song-request/history/list', {
        params: albumSearch,
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setAlbumDatas(data);

      console.log(data);
      setTotalPages(data.totalPages);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  const submitRegAlbum = async (e) => {
    e.preventDefault();

    console.log(albumSearch);

    try {
      const response = await axiosInstance.get('/api/albums', {
        params: albumSearch
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setAlbumDatas(data);

      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>{dateStr} 신청곡 목록</CCardHeader>
            <CCardBody>
              <CForm className="row" onSubmit={submitSearchAlbums}>
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                  </CRow>
                </div>
              </CForm>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">앨범명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">아티스트</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">TrackNumber</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">테이블번호</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">신청시간</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {albumDatas.contents && albumDatas.contents.length > 0 ? (
                    albumDatas.contents.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} onClick={(e) => goInfoClick(e, item.id)}>
                        <CTableDataCell className="text-center">
                          <strong>{index+1}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          {item.albumName}
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          {item.artist}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.trackNumber}
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          {item.title}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.tableNumber}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.requestedAt}
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

export default MusicReqHisInfo
