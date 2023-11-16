import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCodeList } from '../../common/utils'
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
  CFormCheck,
} from '@coreui/react'
import PropTypes from 'prop-types';

import {
  cilCalendar
} from '@coreui/icons'




const SongList = ({ openModal }) => {
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
    setSongSearch({ ...songSearch, startReleaseDate: formattedDate })

  }
  const handleDateChange2 = date => {
    setSelectedDate2(date);
    const formattedDate = date.toISOString().slice(0, 10);
    setSongSearch({ ...songSearch, endReleaseDate: formattedDate })
  }

  //초기화
  const clickReset = date => {

    setSelectedDate(null);
    setSelectedDate2(null);

    setSongSearch({
      "artist": "",
      "trackName": "",
      "endReleaseDate": "",
      "musicGenre": "",
      "name": "",
      "page": 1,
      "size": 999,
      "startReleaseDate": "",
      "mediaCode": ""
    });
  }




  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //리스트
  const [songDatas, setSongDatas] = useState({ contents: [] });

  //검색조건
  const [songSearch, setSongSearch] = useState({});

  //조회하기
  const submitSearch = (e) => {
    e.preventDefault();
    submitSearchSongs();
  }

  //페이징
  const clickPage = (e, page) => {
    e.preventDefault();
    songSearch.page = page;
    submitSearchSongs();
    console.log("===page =  : " + page);
  }

  //검색조건
  const [albumSearch, setAlbumSearch] = useState({});

  //신청곡등록
  const submitRegSongReq = async (e) => {
    e.preventDefault();

    console.log(albumSearch);

    try {
      const response = await axios.get('http://localhost:8080/api/albums', {
        params: albumSearch
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장

      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  //검색 API
  const submitSearchSongs = async () => {

    console.log(songSearch);

    try {
      const response = await axios.get('http://localhost:8080/api/songs', {
        params: songSearch,
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setSongDatas(data);

      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  const [songChkDatas, setSongChkDatas] = useState([]);

  useEffect(() => {
    clickReset();
  }, []);


  //체크박스체크
  const chkSongClick = (e, id) => {
    // 페이지 이동 방지
    var songChkData = {
      "songId": id,
      "tableId": 0
    };
    console.log(e.target.checked);
    if (e.target.checked) {
      setSongChkDatas((prevData) => [...prevData, songChkData]);
    } else {
      setSongChkDatas((prevData) => prevData.filter(item => item.songId !== id));
    }
  };

  //추가
  const submitRegAlbum = async (e) => {
    e.preventDefault();
    console.log(songChkDatas);

    if (songChkDatas.length == 0) {
      alert('신청할 데이터를 선택해주세요');
      return;
    } else {
      const result = window.confirm('해당곡을 등록 하시겠습니까?');

      if (!result) {
        return;
      }
    }

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/song-request', songChkDatas, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API 응답:', response.data);

      alert('등록되었습니다.');

      openModal(false);

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
            <CCardHeader>곡검색</CCardHeader>
            <CCardBody>
              <CForm className="row" onSubmit={submitSearchSongs}>
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputMedia" className="col-form-label">미디어</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormSelect id="inputMedia" aria-label="미디어" onChange={(e) => setSongSearch({ ...songSearch, mediaCode: e.target.value })}>
                      <option>-전체-</option>
                      {midiaCD.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputMusicGenre" className="col-form-label" >곡명</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormInput type="text" id="inputMusicGenre" aria-label="곡명" placeholder="전체" onChange={(e) => setSongSearch({ ...songSearch, trackName: e.target.value })} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputMusicGenre" className="col-form-label" >장르</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormInput type="text" id="inputMusicGenre" aria-label="장르" placeholder="전체" onChange={(e) => setSongSearch({ ...songSearch, musicGenre: e.target.value })} />
                  </CCol>
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputName" className="col-form-label">앨범명</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormInput type="text" id="inputName" aria-label="앨범명" placeholder="전체" onChange={(e) => setSongSearch({ ...songSearch, name: e.target.value })} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputArtist" className="col-form-label">아티스트</CFormLabel>
                  </CCol>
                  <CCol md={5}>
                    <CFormInput type="text" id="inputArtist" aria-label="아티스트" placeholder="전체" onChange={(e) => setSongSearch({ ...songSearch, artist: e.target.value })} />
                  </CCol>
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
                      <CButton component="input" type="button" color="info" value="추가" onClick={submitRegAlbum} />
                    </CCol>
                    <CCol xs={4}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" type="reset" color="light" value="초기화" onClick={clickReset} />
                        <CButton component="input" type="reset" color="primary" value="조회하기" onClick={(e) => submitSearch(e)} />
                      </div>
                    </CCol>
                  </CRow>
                </div>
              </CForm>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    <CTableHeaderCell className="text-center">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">미디어</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">앨범명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">아티스트</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">곡명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Track Number</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Running Time</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {songDatas.contents && songDatas.contents.length > 0 ? (
                    songDatas.contents.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} >
                        <CTableDataCell className="text-center">
                          <input
                            id={'chk_' + index}
                            type="checkbox"
                            onChange={(e) => chkSongClick(e, item.id)}
                          />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <strong>{item.id}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <strong>{item.mediaName}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          {item.albumName}
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          {item.artist}
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          {item.trackName}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.trackNumber}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.runtime}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) :
                    (
                      <CTableRow v-for="item in tableItems" >
                        <CTableDataCell className="text-center" colSpan={8} key={0}>
                          조회된 데이터가 없습니다.
                        </CTableDataCell>
                      </CTableRow>
                    )
                  }
                </CTableBody>
              </CTable>
              <br />
              {songDatas.contents && songDatas.contents.length > 0 ? (
                <CRow>
                  <CCol md={{ span: 8, offset: 5 }}>
                    <CPagination aria-label="Page navigation example">
                      <CPaginationItem aria-label="Previous" disabled={!songDatas.first} onClick={(e) => clickPage(e, 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </CPaginationItem>
                      {Array.from({ length: songDatas.totalPages }, (_, index) => (
                        <CPaginationItem key={index} className={songDatas.number == index + 1 ? 'active' : ''} onClick={(e) => clickPage(e, index + 1)}>{index + 1}</CPaginationItem>
                      ))}
                      <CPaginationItem aria-label="Next" disabled={!songDatas.last}>
                        <span aria-hidden="true">&raquo;</span>
                      </CPaginationItem>
                    </CPagination>
                  </CCol>
                  <CCol md={1}>
                    총 {songDatas.totalCount}건
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

SongList.propTypes = {
  openModal: PropTypes.func, // openModal 프로퍼티의 타입을 지정
};

export default SongList
