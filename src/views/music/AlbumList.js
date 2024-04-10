import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCodeList, throwError } from '../../common/utils'
import axiosInstance from '../../common/axiosInstance';
import PaginationComponent from '../common/PaginationComponent';
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

const AlbumList = () => {
  /**********************************************************************
   * 공통코드 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  const [selectedDate, setSelectedDate] = useState(null); //등록일 from
  const [selectedDate2, setSelectedDate2] = useState(null); // 등록일 to

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0); // 현재 페이지 상태


  // 날짜가 선택될 때 호출될 콜백 함수
  const handleDateChange = date => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().slice(0, 10);
    setAlbumSearch({ ...albumSearch, startReleaseDate: formattedDate })

  }
  const handleDateChange2 = date => {
    setSelectedDate2(date);
    const formattedDate = date.toISOString().slice(0, 10);
    setAlbumSearch({ ...albumSearch, endReleaseDate: formattedDate })
  }

  //검색조건
  const [albumSearch, setAlbumSearch] = useState({
    "artist": "",
    "endReleaseDate": "",
    "musicGenre": "",
    "name": "",
    "page": 0,
    "size": 15,
    "startReleaseDate": "",
    "mediaCode": ""
  });

  //초기화
  const clickReset = date => {

    setSelectedDate(null);
    setSelectedDate2(null);

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

  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //리스트
  const [albumDatas, setAlbumDatas] = useState({ contents: [] });

  
  //조회하기
  const submitSearch = (e) => {
    e.preventDefault();
    submitSearchAlbums();
  }

  //페이지 변경
  const handlePageChange = (page) => {
    console.log('현재페이지 ');
    console.log(page);
    setCurrentPage(page); // 페이지 변경 시 현재 페이지 상태 업데이트
    submitSearchAlbums(page);
  };

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
      const response = await axiosInstance.get('/api/albums', {
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
      console.error('API 요청 실패:', error);
      throwError(error,navigate);
      //alert('네트워크 오류 ');
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
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>앨범검색</CCardHeader>
            <CCardBody>
              <CForm className="row" onSubmit={submitSearchAlbums}>
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputMedia" className="col-form-label">미디어</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormSelect id="inputMedia" aria-label="미디어" onChange={(e) => setAlbumSearch({ ...albumSearch, mediaCode: e.target.value })}>
                      <option>-전체-</option>
                      {midiaCD.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputMusicGenre" className="col-form-label" >장르</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormInput type="text" id="inputMusicGenre" aria-label="장르" placeholder="전체" onChange={(e) => setAlbumSearch({ ...albumSearch, musicGenre: e.target.value })} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputName" className="col-form-label">앨범명</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormInput type="text" id="inputName" aria-label="앨범명" placeholder="전체" onChange={(e) => setAlbumSearch({ ...albumSearch, name: e.target.value })} />
                  </CCol>
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputArtist" className="col-form-label">아티스트</CFormLabel>
                  </CCol>
                  <CCol md={5}>
                    <CFormInput type="text" id="inputArtist" aria-label="아티스트" placeholder="전체" onChange={(e) => setAlbumSearch({ ...albumSearch, artist: e.target.value })} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  {/* <CCol xs={1}>
                    <CFormLabel htmlFor="txt_country" className="col-form-label">발매국가</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormSelect id="txt_country" aria-label="발매국가" onChange={(e) => setAlbumSearch({ ...albumSearch, artist: e.target.value })}>
                      <option>-전체-</option>
                      {cntryCD.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol> */}
                  <CCol md={1}>
                    <CFormLabel htmlFor="inputEmail3" className="col-form-label">등록일</CFormLabel>
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
                    <CTableHeaderCell className="text-center">미디어</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">앨범명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">아티스트</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">발매일</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {albumDatas.contents && albumDatas.contents.length > 0 ? (
                    albumDatas.contents.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} onClick={(e) => goInfoClick(e, item.id)}>
                        <CTableDataCell className="text-center">
                          <strong>{item.id}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <strong>{item.mediaName}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          <a href='/' onClick={(e) => goInfoClick(e, item.id)}>{item.name}</a>
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          {item.artist}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.releaseDate}
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
                    {/* <CPagination aria-label="Page navigation example">
                      <CPaginationItem aria-label="Previous" disabled={!albumDatas.first} onClick={(e) => clickPage(e, 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </CPaginationItem>
                      {Array.from({ length: albumDatas.totalPages }, (_, index) => (
                        <CPaginationItem key={index} active onClick={(e) => clickPage(e, index + 1)}>{index + 1}</CPaginationItem>
                      ))}
                      <CPaginationItem aria-label="Next" disabled={!albumDatas.last}>
                        <span aria-hidden="true">&raquo;</span>
                      </CPaginationItem>
                    </CPagination> */}
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

export default AlbumList
