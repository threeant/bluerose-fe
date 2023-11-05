import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCodeList } from '../../common/utils'
import SongList from '../common/SongList'; // MyModal 컴포넌트의 경로를 알맞게 설정
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody
} from '@coreui/react'
import {
  cilCalendar
} from '@coreui/icons'

const MusicReq = () => {
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
      "size": 1,
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');
  const [visibleXL, setVisibleXL] = useState(false)
  //신청곡 추가 버튼
  const popMusicAddClick = () => {
    setVisibleXL(!visibleXL)
    //setModalData('');
    //setIsModalOpen(true);
  }



  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //리스트
  const [albumDatas, setAlbumDatas] = useState({ contents: [] });

  //검색조건
  const [albumSearch, setAlbumSearch] = useState({
    "artist": "",
    "endReleaseDate": "",
    "musicGenre": "",
    "name": "",
    "page": 0,
    "size": 10,
    "startReleaseDate": "",
    "mediaCode": ""
  });

  //조회하기
  const submitSearch = (e) => {
    e.preventDefault();
    submitSearchAlbums();
  }

  //페이징
  const clickPage = (e, page) => {
    e.preventDefault();
    albumSearch.page = page;
    submitSearchAlbums();
    console.log("===page =  : " + page);
  }

  //검색 API
  const submitSearchAlbums = async () => {

    console.log(albumSearch);

    try {
      const response = await axios.get('http://localhost:8080/api/albums', {
        params: albumSearch,
        headers: { 'Content-Type': 'application/json' }
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

  const submitRegAlbum = async (e) => {
    e.preventDefault();

    console.log(albumSearch);

    try {
      const response = await axios.get('http://localhost:8080/api/albums', {
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
      <CModal
        size="xl"
        visible={visibleXL}
        onClose={() => setVisibleXL(false)}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample1">신청곡 추가</CModalTitle>
        </CModalHeader>
        <CModalBody><SongList /></CModalBody>
      </CModal>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader><strong>신청곡관리</strong></CCardHeader>
            <CCardBody>
              <CRow className="justify-content-between">
                <CCol xs={12}>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton component="input" type="reset" color="danger" value="신청곡정지" onClick={clickReset} />
                    <CButton component="input" color="info" value="신청곡시작" />
                  </div>
                </CCol>
              </CRow>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    <CTableHeaderCell className="text-center">앨범명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">아티스트</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">TrackNumber</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Running Time</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {albumDatas.contents && albumDatas.contents.length > 0 ? (
                    albumDatas.contents.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} onClick={(e) => goInfoClick(e, item.id)}>
                        <CTableHeaderCell className="text-center" color="light"></CTableHeaderCell>
                        <CTableDataCell className="text-center">
                          <strong>{item.mediaName}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src="/static/media/8.35ee8919ea545620a475.jpg" />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <a href='/' onClick={(e) => goInfoClick(e, item.id)}>{item.name}</a>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
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
                        <CTableHeaderCell color="light" className="text-center">Now Playing</CTableHeaderCell>
                        <CTableDataCell className="text-center" colSpan={5} key={0}>
                          -
                        </CTableDataCell>
                      </CTableRow>
                    )
                  }
                </CTableBody>
              </CTable>
              <br />
              <div className="d-grid gap-2">
                <CRow className="justify-content-between">
                  <CCol xs={12}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton component="input" color="success" value="곡완료" />
                    </div>
                  </CCol>
                </CRow>
              </div>
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader><strong>신청곡목록</strong> <small> 총 11건</small></CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2">
                <CRow className="justify-content-between">
                  <CCol xs={12}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton component="input" type="reset" color="light" value="신청곡 추가" onClick={popMusicAddClick} />
                    </div>
                  </CCol>
                </CRow>
              </div>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">앨범명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">아티스트</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Track Number</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Running Time</CTableHeaderCell>
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
                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src="/static/media/8.35ee8919ea545620a475.jpg" />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <a href='/' onClick={(e) => goInfoClick(e, item.id)}>{item.name}</a>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.artist}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.releaseDate}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.releaseDate}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) :
                    (
                      <CTableRow v-for="item in tableItems" >
                        <CTableDataCell className="text-center" colSpan={7} key={0}>
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
                    <CPagination aria-label="Page navigation example">
                      <CPaginationItem aria-label="Previous" disabled={!albumDatas.first} onClick={(e) => clickPage(e, 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </CPaginationItem>
                      {Array.from({ length: albumDatas.totalPages }, (_, index) => (
                        <CPaginationItem key={index} active onClick={(e) => clickPage(e, index + 1)}>{index + 1}</CPaginationItem>
                      ))}
                      <CPaginationItem aria-label="Next" disabled={!albumDatas.last}>
                        <span aria-hidden="true">&raquo;</span>
                      </CPaginationItem>
                    </CPagination>
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

export default MusicReq
