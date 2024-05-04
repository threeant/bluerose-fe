import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import {
  cilSync,
  cilCaretTop,
  cilCaretBottom
} from '@coreui/icons'
import { useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import { getCodeList, getCurrentDate, throwError } from '../../common/utils'
import SongList from '../common/SongList'; // MyModal 컴포넌트의 경로를 알맞게 설정
import AlbumInfo from '../common/AlbumInfo'
import axiosInstance from '../../common/axiosInstance';
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
  const location = useLocation();
  const {displayId} = location.state;

  
  const navigate = useNavigate();
  const [dispCD] = useState(getCodeList('DISP')); // 전시CD
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
    if(acceptType === 'updateDisp'){// 전시정보변경
      submitUpdateDisplay();
    }else if(acceptType === 'deletSong'){ //곡삭제
      submitDeletDisplay();
    }else if(acceptType === 'updateSongSort'){ // 전시순서변경
      updateSort();
    }
  };




  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  useEffect(() => {
    console.log('displayId>>>> ' + displayId)
    submitSearchDisplay();
    submitSearchDisplaySongList();

  }, [displayId]); // 빈 배열을 넣어 처음 한 번만 실행되도록 설정


  const goFormClick = () => { //등록화면이동
    navigate('/music/albumReg');
  }

  const [visibleSong, setVisibleSong] = useState(false);
  const [visibleAlbum, setVisibleAlbum] = useState(false);
  const [albumId, setAlbumId] = useState();
  //신청곡 추가 버튼
  const popMusicAddClick = () => {
    setVisibleSong(!visibleSong)
  }


  //앨범 팝업 추가 버튼
  const popAlbumInfoClick = (e, pAlbumId) => {
    e.preventDefault();
    setAlbumId(pAlbumId);
    console.log(pAlbumId);
    setVisibleAlbum(!visibleAlbum);
  }

  //목록이동
  const goListClick = () => {
    navigate('/display/displayList');
  };





  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //전시 유효성검사
  const [validated, setValidated] = useState(false);

  //전시 상세 
  //onst [displayData, setDisplayData] = useState();
  //리스트
  const [displaySongDatas, setDisplaySongDatas] = useState([]);

  //플레잉곡
  const [nowPlayingData, setNowPlayingData] = useState({});

  //전시 상세 
  const [displayUpdateData, setDisplayUpdateData] = useState({});


  const handleMoveUp = (index) => {
    if (index > 0) {
      const newData = [...displaySongDatas];
      [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
      setDisplaySongDatas(newData);
    }
  };

  const handleMoveDown = (index) => {
    if (index < displaySongDatas.length - 1) {
      const newData = [...displaySongDatas];
      [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
      setDisplaySongDatas(newData);
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

    submitSearchDisplaySongList(dateStr);
    

  };

  //전시상세 API
  const submitSearchDisplay = async () => {

    try {
      const response = await axiosInstance.get('/api/display/' + displayId);

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      //setDisplayData(data);
      console.log("상세결과 ----")
      console.log(data);
      setDisplayUpdateData({
        codeId : data.displayTypeId
        , displayCount : data.displayNum
        , sort :  data.sort
        , title : data.title
        , useYn : data.useYn
      })

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };




  //전시곡 리스트 검색 API
  const submitSearchDisplaySongList = async (dateStr) => {


    try {
      const response = await axiosInstance.get('/api/display/' + displayId + '/display-content', {
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setDisplaySongDatas(data);

      console.log(data);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  }

  
  const [delDisplayContentId, setDelDisplayContentId] = useState('');
 
  //신청곡 삭제 클릭
  const clickDeletDisplayInfo = (e, displayContentId) => {
    e.preventDefault();
    setDelDisplayContentId(displayContentId);
    //const result = window.confirm('해당곡을 삭제 하시겠습니까?');
    confirmPage('해당곡을 삭제 하시겠습니까?', 'deletSong')

    
  };

  //곡 삭제 API
  const submitDeletDisplay = async () => {

    console.log(delDisplayContentId);

    try {
      const response = await axiosInstance.delete('/api/display/' + displayId 
                                          + '/display-content/' + delDisplayContentId);

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alertPage('삭제되었습니다.');
      refreshDisplayInfo();

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  const controllSongModal = (openYn) => {
    setVisibleSong(openYn);
  }

  const controllAlbumModal = (openYn) => {
    setVisibleAlbum(openYn);
  }

  
   //전시 수정하기 API
   const confirmUpdateDisplay = async (e) => {
    e.preventDefault();

    console.log(displayUpdateData);
    
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    confirmPage('전시정보를 수정하시겠습니까?', 'updateDisp')

  }

  //전시 수정하기 API
  const submitUpdateDisplay = async () => {
    

    try {
      const response = await axiosInstance.post('/api/display/' + displayId, displayUpdateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alertPage('변경되었습니다.');
      setValidated(false);
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }
  }
  const handleDataFromSongList = async(datas) => {
    // 부모 컴포넌트에서 전달받은 데이터 처리
    console.log('Data from child:', datas);
    console.log(datas);
    var songIdArr = [];
      for(var i = 0 ; i < datas.length; i++){
      songIdArr[i] = datas[i].songId;
    }

  var newSongDatas = {"songIds": songIdArr};
    console.log(newSongDatas);
    console.log('setNewSongDatas >>> ')


    try {
      const response = await axiosInstance.post('/api/display/' + displayId + '/display-content', newSongDatas, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alertPage('추가되었습니다.');
      refreshDisplayInfo();
      
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }
    
  };
  //전시순서변경
  const updateSort = async () => {
    
    var contents = displaySongDatas;
    console.log(contents);
    var updateContents = [];
    for(var i = 0; i< contents.length; i++){
      updateContents.push(contents[i].displayContentId);
    }

    if(updateContents.length < 1){
      alertPage('변경되는 데이터가 없습니다.');
      return;
    }

    console.log(updateContents);
    try {
      const response = await axiosInstance.patch('/api/display/'+displayId+'/display-content', 
        {displayContentIds : updateContents}
        ,{headers: {
          'Content-Type': 'application/json',
        }}
      );

      // API 응답에서 데이터 추출
      const data = response;
      // 데이터를 상태 변수에 저장
      
      console.log(data);
      if(data.status == '200'){
        alertPage('변경되었습니다.');
      }

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };


  const handleDataFromSongList2 = (datas) => {
    // 부모 컴포넌트에서 전달받은 데이터 처리
    console.log('Data from child:', datas);
    console.log(datas);

    console.log(displaySongDatas);

  datas.map((item)=>{
    console.log(item)
    var newData = {
      "albumId": item.albumId,
      "albumName": item.albumName,
      "artist": item.artist,
      "displayContentId": '',
      "displayItemId": item.displayId,
      "runtime": item.runtime,
      "songId": item.songId,
      "trackInfo": item.trackInfo,
      "trackName": item.trackName,
      "newYn" : true
    }
    setDisplaySongDatas((prevData) => [...prevData, newData]);
  })
    
    console.log(displaySongDatas);
    console.log('displaySongDatas >>> ')
    
  };



  return (
    <>
      <ComModal type={alertType} visible={alertVisible} onClose={handleCloseModal} alertText={alertText} onAccpet={handleAccept}/>
      
      <CModal
        size="xl"
        visible={visibleSong}
        onClose={() => setVisibleSong(false)}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample1">전시곡 추가</CModalTitle>
        </CModalHeader>
        <CModalBody><SongList openModal={controllSongModal} sendDataToParent={handleDataFromSongList}/></CModalBody>
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
              {displayUpdateData ? (
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={confirmUpdateDisplay}
                >
                  <CCol xs={10} >
                    <CFormLabel htmlFor="validationCustom04">ID : {displayId}</CFormLabel>
                  </CCol>
                  <CCol xs={2} >
                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                    <CFormSwitch label="사용여부" id="formSwitchCheckChecked"  checked={displayUpdateData.useYn}  onChange={(e) => setDisplayUpdateData({ ...displayUpdateData, useYn: e.target.checked })} />
                  </CCol>


                  <CCol xs={12}>
                    <CFormLabel htmlFor="inputName">제목*</CFormLabel>
                    <CFormInput type="text" id="inputName" value={displayUpdateData.title} required onChange={(e) => setDisplayUpdateData({ ...displayUpdateData, title: e.target.value })} maxLength={100} />
                    <CFormFeedback invalid>앨범명을 입력해주세요.</CFormFeedback>
                  </CCol>
                  <CCol xs={6}>
                  <CFormLabel htmlFor="inputName">노출곡수*</CFormLabel>
                  <CFormInput type="number" id="inputDisplayCount" value={displayUpdateData.displayCount}  required onChange={(e) => setDisplayUpdateData({ ...displayUpdateData, displayCount: e.target.value })} maxLength={100} />
                  <CFormFeedback invalid>노출곡 갯수를 입력해주세요.</CFormFeedback>
                </CCol>
                  <CCol xs={6}>
                  <CFormLabel htmlFor="inputName">전시타입*</CFormLabel>
                  <CFormSelect id="sel_media" value={displayUpdateData.codeId} onChange={(e) => setDisplayUpdateData({ ...displayUpdateData, codeId: e.target.value })} required >
                    <option value={''} key='-1'>-선택-</option>
                    {dispCD.map((item, index) => (
                      <option value={item.id} key={index}>{item.name}</option>
                    ))}
                  </CFormSelect>
                  <CFormFeedback invalid>전시타입을 선택해주세요.</CFormFeedback>
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
            <CCardHeader><strong>곡목록</strong> {displaySongDatas && displaySongDatas.length > 0 ? (<small>총 {displaySongDatas.length
            }건</small>) : ('')}</CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2">
                <CRow className="justify-content-between">
                  <CCol xs={12}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton component="input" type="reset" color="secondary" value="전시곡 추가" onClick={popMusicAddClick} />
                      <CButton component="input" color="primary" type="submit" value="순서변경하기" onClick={() => confirmPage('전시순서를 변경하시겠습니까?', 'updateSongSort')}/>
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
                    <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Track Number</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">전시순서</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {displaySongDatas && displaySongDatas.length > 0 ? (
                    displaySongDatas.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} >
                        <CTableDataCell className="text-center">
                          {/* <strong>{index+1}</strong> */}
                          <strong>{item.displayContentId}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <strong><a href='/' onClick={(e) => popAlbumInfoClick(e, item.albumId)}>{item.albumName}</a></strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.artist}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <strong>{item.trackName}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        {item.trackInfo}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        {index !== 0  ? (
                          <CButton color="info" variant="outline" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                            <CIcon icon={cilCaretTop} title="Download file" />
                          </CButton>
                          ) : ('')}

                        {index+1  !== displaySongDatas.length  ? (
                          <CButton color="info" variant="outline" onClick={() => handleMoveDown(index)} disabled={index === displaySongDatas.length - 1}>
                            <CIcon icon={cilCaretBottom} title="Download file" />
                          </CButton>
                          ) : ('')}

                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        {item.newYn !== true ? (
                          <CButton color="dark" shape="rounded-pill" className="mb-3" onClick={(e) => clickDeletDisplayInfo(e, item.displayContentId)}>
                          삭제
                        </CButton>
                        ) : ('[신규]')}
                          
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
