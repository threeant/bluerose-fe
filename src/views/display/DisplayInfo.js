import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import {
  cilSync,
  cilCaretTop,
  cilCaretBottom
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCodeList, getCurrentDate, getAddDate } from '../../common/utils'
import SongList from '../common/SongList'; // MyModal 컴포넌트의 경로를 알맞게 설정
import AlbumInfo from '../common/AlbumInfo'
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
  CModalBody,
  CFormFeedback,
  CFormSwitch,
  CSpinner
} from '@coreui/react'
import {
  cilCalendar
} from '@coreui/icons'


const DisplayInfo = () => {
  /**********************************************************************
   * 공통코드 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

  //앨범아이디
  const [albumId, setAlbumId] = useState('2');


  /**********************************************************************
   * 화면 영역
  **********************************************************************/



  useEffect(() => {
    setAlbumId('1');
    refreshDisplayInfo();
    submitSearchAlbum();

  }, []); // 빈 배열을 넣어 처음 한 번만 실행되도록 설정

  const goFormClick = () => { //등록화면이동
    navigate('/music/albumReg');
  }

  const [visibleSong, setVisibleSong] = useState(false);
  const [visibleAlbum, setVisibleAlbum] = useState(false)
  //신청곡 추가 버튼
  const popMusicAddClick = () => {
    setVisibleSong(!visibleSong)
  }


  //앨범 팝업 추가 버튼
  const popAlbumInfoClick = (e, pAlbumId) => {
    e.preventDefault();
    setAlbumId('1');
    setVisibleAlbum(!visibleAlbum);
  }

  //목록이동
  const goListClick = () => {
    navigate('/display/displayList');
  };





  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //앨범 유효성검사
  const [validated, setValidated] = useState(false);

  //앨범 상세 
  const [albumData, setAlbumData] = useState();
  //신청곡리스트
  const [displayInfoDatas, setDisplayInfoDatas] = useState({ contents: [] });

  //플레잉곡
  const [nowPlayingData, setNowPlayingData] = useState({});


  const handleMoveUp = (index) => {
    if (index > 0) {
      const newData = [...displayInfoDatas];
      [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
      setDisplayInfoDatas(newData);
    }
  };

  const handleMoveDown = (index) => {
    if (index < displayInfoDatas.length - 1) {
      const newData = [...displayInfoDatas];
      [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
      setDisplayInfoDatas(newData);
    }
  };





  //초기화후 조회
  const refreshDisplayInfo = async () => {
    const dateStr = getCurrentDate();
    /*const hour = new Date().getHours();
    if (hour < 6) {
      dateStr = getAddDate("d", -1, dateStr, "-")
    }
    */

    submitSearchDisplayInfo(dateStr);
    submitSearchNowPlaying(dateStr);

  };

  //앨범 검색 API
  const submitSearchAlbum = async () => {

    try {
      const response = await axios.get('http://localhost:8080/api/albums/' + albumId);

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setAlbumData(data);
      console.log("앨범결과 ----")
      console.log(data);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };




  //신청곡 리스트 검색 API
  const submitSearchDisplayInfo = async (dateStr) => {


    try {
      const response = await axios.get('http://localhost:8080/api/song-request', {
        params: {
          "date": dateStr
        },
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setDisplayInfoDatas(data);

      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  }

  //신청곡 리스트 검색 API
  const submitSearchNowPlaying = async (dateStr) => {


    try {
      const response = await axios.get('http://localhost:8080/api/song-request/now-playing', {
        params: {
          "date": dateStr
        },
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setNowPlayingData(data);

      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  }

  //신청곡 선곡 클릭
  const clickSelectDisplayInfo = (e, DisplayInfoId) => {
    e.preventDefault();

    const result = window.confirm('해당곡을 선곡 하시겠습니까?');

    if (!result) {
      return;
    }

    submitSelectDisplayInfo(DisplayInfoId);
  };


  //신청곡 선곡 API
  const submitSelectDisplayInfo = async (DisplayInfoId) => {

    console.log(DisplayInfoId);

    try {
      const response = await axios.post('http://localhost:8080/api/song-request/now-playing/register',
        {
          "songRequestId": DisplayInfoId
        }
        ,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('선곡되었습니다.');
      refreshDisplayInfo();



    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  }

  //신청곡 삭제 클릭
  const clickDeletDisplayInfo = (e, DisplayInfoId) => {
    e.preventDefault();

    const result = window.confirm('해당곡을 삭제 하시겠습니까?');

    if (!result) {
      return;
    }

    submitDeletSong(DisplayInfoId);
  };

  //곡 삭제 API
  const submitDeletSong = async (DisplayInfoId) => {

    console.log(DisplayInfoId);

    try {
      const response = await axios.delete('http://localhost:8080/api/song-request/' + DisplayInfoId);

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('삭제되었습니다.');
      refreshDisplayInfo();

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  const controllSongModal = (openYn) => {
    setVisibleSong(openYn);
  }

  const controllAlbumModal = (openYn) => {
    setVisibleAlbum(openYn);
  }

  //신청곡 완료 클릭
  const clickCompleteDisplayInfo = (e) => {
    e.preventDefault();

    const result = window.confirm('해당곡을 완료 하시겠습니까?');

    if (!result) {
      return;
    }

    submitCompleteDisplayInfo();
  };


  //신청곡 완료 API
  const submitCompleteDisplayInfo = async () => {


    try {
      const response = await axios.post('http://localhost:8080/api/song-request/now-playing/complete');

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('곡이 끝났습니다.');
      refreshDisplayInfo();



    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }


  }

  //앨범 수정하기 API
  const submitUpdateAlbum = async (e) => {
    e.preventDefault();

    console.log(albumData);
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
      const response = await axios.post('http://localhost:8080/api/albums/' + albumId, albumData, {
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
  }

  return (
    <>
      <CModal
        size="xl"
        visible={visibleSong}
        onClose={() => setVisibleSong(false)}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample1">신청곡 추가</CModalTitle>
        </CModalHeader>
        <CModalBody><SongList openModal={controllSongModal} /></CModalBody>
      </CModal>
      <CModal
        size="xl"
        visible={visibleAlbum}
        onClose={() => setVisibleAlbum(false)}
        aria-labelledby="OptionalSizesExample4"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample3">앨범정보</CModalTitle>
        </CModalHeader>
        <CModalBody><AlbumInfo openModal={controllAlbumModal} albumId={albumId} /></CModalBody>
      </CModal>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader><strong>전시수정</strong></CCardHeader>
            <CCardBody>
              {albumData ? (
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={submitUpdateAlbum}
                >
                  <CCol xs={10} >
                    <CFormLabel htmlFor="validationCustom04">ID : {albumId}</CFormLabel>
                  </CCol>
                  <CCol xs={2} >
                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                    <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked={albumData.useYn} onChange={(e) => setAlbumData({ ...albumData, useYn: e.target.value })} />
                  </CCol>


                  <CCol xs={8}>
                    <CFormLabel htmlFor="inputName">제목*</CFormLabel>
                    <CFormInput type="text" id="inputName" value={albumData.name} required onChange={(e) => setAlbumData({ ...albumData, name: e.target.value })} maxLength={100} />
                    <CFormFeedback invalid>앨범명을 입력해주세요.</CFormFeedback>
                  </CCol>
                  <CCol xs={4}>
                    <CFormLabel htmlFor="inputAartist">노출곡수*</CFormLabel>
                    <CFormInput type="text" id="inputAartist" value={albumData.artist} required onChange={(e) => setAlbumData({ ...albumData, artist: e.target.value })} maxLength={100} />
                    <CFormFeedback invalid>아티스트를 입력해주세요.</CFormFeedback>
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

          <CCard className="mb-4">
            <CCardHeader><strong>곡목록</strong> {displayInfoDatas.contents && displayInfoDatas.contents.length > 0 ? (<small>총 {displayInfoDatas.contents.length
            }건</small>) : ('')}</CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2">
                <CRow className="justify-content-between">
                  <CCol xs={12}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton component="input" type="reset" color="secondary" value="전시곡 추가" onClick={popMusicAddClick} />
                      <CButton component="input" color="primary" type="submit" value="수정하기" />
                      <CButton color="light" onClick={refreshDisplayInfo}>
                        <CIcon icon={cilSync} title="Download file" />
                      </CButton>
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
                    <CTableHeaderCell className="text-center">전시순서</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {displayInfoDatas && displayInfoDatas.length > 0 ? (
                    displayInfoDatas.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} >
                        <CTableDataCell className="text-center">
                          <strong>{item.id}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <strong><a href='/' onClick={(e) => popAlbumInfoClick(e, item.albumId)}>{item.albumName}</a></strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.artist}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.trackNumber}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.title}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton color="info" variant="outline" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                            <CIcon icon={cilCaretTop} title="Download file" />
                          </CButton>
                          <CButton color="info" variant="outline" onClick={() => handleMoveDown(index)} disabled={index === displayInfoDatas.length - 1}>
                            <CIcon icon={cilCaretBottom} title="Download file" />
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton color="dark" shape="rounded-pill" className="mb-3" onClick={(e) => clickDeletDisplayInfo(e, item.id)}>
                            삭제
                          </CButton>
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    </>
  )
}

export default DisplayInfo
