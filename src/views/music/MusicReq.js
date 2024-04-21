import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import {
  cilSync
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { getCodeList, getCurrentDate, throwError } from '../../common/utils'
import SongList from '../common/SongList'; // MyModal 컴포넌트의 경로를 알맞게 설정
import AlbumInfo from '../common/AlbumInfo'
import axiosInstance from '../../common/axiosInstance';
import { Client } from "@stomp/stompjs";
import appConfig from '../../common/appConfig';
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

  //앨범아이디
  const [albumId, setAlbumId] = useState();

  const [stompClient, setStompClient] = useState(null); // 소켓클라이언트
  


  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  useEffect(() => {
    setSocket();
    refreshMusicReq(); //신청곡 조회
    
    submitSearchNowPlayingCondition(); // 신청곡 상태조회
    
    //callHeader();
  }, []); // 빈 배열을 넣어 처음 한 번만 실행되도록 설정


  const callHeader = () => {//헤더 초기화 하도록
      const response = axiosInstance.get('/api/callRefresh', {
        "code": "string",
        "msg": "string"
    },{
      headers: { 'Content-Type': 'application/json' }
    });
  }
  const setSocket = async  () => {
    console.log('>>>>!!?');
    const stompConfig = {
      connectHeaders: {},
      brokerURL: appConfig.wsUrl,
      debug: function (str) {
        console.log('STOMP ADMIN: ' + str);
      },
      // reconnectDelay: 200,
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      onConnect: function (frame) {
          console.log('Connected to server.');
          console.log('connected >>>> ADMIN');
            
      },
      onStompError: (frame) => {
        console.log('Additional details: ' + frame.body);
      },
      onMessage: function (message) {
        // 서버로부터 메시지를 수신할 때의 처리
        console.log('>>>여깁니다 받았Received message:', message.body);
      }
    };

    const client = new Client(stompConfig);
    setStompClient(client);
    client.activate();
    
    client.onConnect = (frame) => {
      client.subscribe('/topic/request-song', function (message) {
        console.log('>>>>ADMIN !>>');
        console.log(JSON.parse(message.body));
        var rtnTxt = JSON.parse(message.body);
        //parentFunction(rtnTxt.type);
       
        
        if(rtnTxt.type == 'APP_REQUEST_SONG'){
          console.log('DISPLAY : ADMIN_UPDATE_PLAYING!!! >> '+rtnTxt.requestSongSize);
         // var newRequestSongSize = rtnTxt.requestSongSize;
         refreshMusicReq();

         console.log('SONG_REQ!!!!!!!!!!');

          //(1)admin 에서 헤더 새 신청곡 갯수 update  (2)admin 신청곡 리스트 update 
          
        }
      });
    }
  }
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
    setAlbumId(pAlbumId);
    setVisibleAlbum(!visibleAlbum);
  }



  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //신청곡리스트
  const [musicReqDatas, setMusicReqDatas] = useState({ contents: [] });

  //플레잉곡
  const [nowPlayingData, setNowPlayingData] = useState({});

  //플레잉곡
  const [nowPlayingConditionData, setNowPlayingCondtionData] = useState({});


  //신청곡 시작/정지 여부 조회 API
  const submitSearchNowPlayingCondition = async () => {


    try {
      const response = await axiosInstance.get('/api/song-request/condition', {
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      console.log("현재??");
      console.log(data);
      setNowPlayingCondtionData(data);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }
  }


  //초기화후 조회
  const refreshMusicReq = async () => {
    const dateStr = getCurrentDate();
    /*const hour = new Date().getHours();
    if (hour < 6) {
      dateStr = getAddDate("d", -1, dateStr, "-")
    }
    */

    submitSearchMusicReq(dateStr);
    submitSearchNowPlaying(dateStr);

  }


  //신청곡 리스트 검색 API
  const submitSearchMusicReq = async (dateStr) => {


    try {
      const response = await axiosInstance.get('/api/song-request', {
        params: {
          "date": dateStr
        },
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setMusicReqDatas(data);

      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  }

  //신청곡 리스트 검색 API
  const submitSearchNowPlaying = async (dateStr) => {


    try {
      const response = await axiosInstance.get('/api/song-request/now-playing', {
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
      console.log(error);
      throwError(error,navigate);
    }

  }

  //신청곡 선곡 클릭
  const clickSelectMusicReq = (e, musicReqId) => {
    e.preventDefault();

    const result = window.confirm('해당곡을 선곡 하시겠습니까?');

    if (!result) {
      return;
    }

    submitSelectMusicReq(musicReqId);
  };


  //신청곡 선곡 API
  const submitSelectMusicReq = async (musicReqId) => {

    console.log(musicReqId);

    try {
      const response = await axiosInstance.post('/api/song-request/now-playing/register',
        {
          "songRequestId": musicReqId
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
      refreshMusicReq();



    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  }

  //신청곡 삭제 클릭
  const clickDeletMusicReq = (e, musicReqId) => {
    e.preventDefault();

    const result = window.confirm('해당곡을 삭제 하시겠습니까?');

    if (!result) {
      return;
    }

    submitDeletSong(musicReqId);
  };

  //곡 삭제 API
  const submitDeletSong = async (musicReqId) => {

    console.log(musicReqId);

    try {
      const response = await axiosInstance.delete('/api/song-request/' + musicReqId);

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('삭제되었습니다.');
      refreshMusicReq();

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

  //신청곡 시작 정지 조건 변경 클릭
  const clickConditonChange = (e, startYn) => {
    e.preventDefault();

    var msg = '신청곡을 중단 하시겠습니까?';

    if (startYn) {
      msg = '신청곡을 받기 하시겠습니까?';
    }

    const result = window.confirm(msg);

    if (!result) {
      return;
    }


    submitClickConditonChange(startYn);
  };



  //신청곡 시작 정지 조건 변경 API
  const submitClickConditonChange = async (startYn) => {


    try {

      const response = await axiosInstance.post('/api/song-request/condition',
        {
          "requestSongAvailable": startYn
        }
        ,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

      console.log('API 응답:', response.data);

      alert('변경되었습니다.');
      refreshMusicReq(); //신청곡 조회
      submitSearchNowPlayingCondition(); // 신청곡 상태조회


    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  }


  //신청곡 완료 클릭
  const clickCompleteMusicReq = (e) => {
    e.preventDefault();

    const result = window.confirm('해당곡을 완료 하시겠습니까?');

    if (!result) {
      return;
    }

    submitCompleteMusicReq();
  };


  //신청곡 완료 API
  const submitCompleteMusicReq = async () => {


    try {
      const response = await axiosInstance.post('/api/song-request/now-playing/complete');

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('곡이 끝났습니다.');
      refreshMusicReq();



    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  }

 // 신청곡 추가 callback
  const handleDataFromSongList = async(datas) => {
    // 부모 컴포넌트에서 전달받은 데이터 처리
    console.log('Data from child:', datas);
    console.log(datas);
    var songIdArr = [];
      for(var i = 0 ; i < datas.length; i++){
      songIdArr[i] = {
        "songId": datas[i].songId,
        "tableId": 1
      };
    }

    try {
      const response = await axiosInstance.post('/api/song-request', songIdArr, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert(' 추가 되었습니다.');
      refreshMusicReq(); //신청곡 조회
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }
    
  };


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
            <CCardHeader><strong>신청곡관리</strong></CCardHeader>
            <CCardBody>
              <CRow className="justify-content-between">
                <CCol xs={12}>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    {nowPlayingConditionData.requestSongAvailable ? (<CButton component="input" type="reset" color="danger" value="신청곡정지" onClick={(e) => clickConditonChange(e, false)} />)
                      : (<CButton component="input" color="info" value="신청곡시작" onClick={(e) => clickConditonChange(e, true)} />)}

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
                  {nowPlayingData && nowPlayingData.id != null ? (
                    <CTableRow v-for="item in tableItems"  >
                      <CTableHeaderCell className="text-center" color="light">Now Playing</CTableHeaderCell>
                      <CTableDataCell className="text-center">
                        <strong><a href='/' onClick={(e) => popAlbumInfoClick(e, nowPlayingData.albumId)}>{nowPlayingData.albumName}</a></strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <strong>{nowPlayingData.artist}</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <strong>{nowPlayingData.trackNumber}</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <strong>{nowPlayingData.title}</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <strong>{nowPlayingData.runningTime}</strong>
                      </CTableDataCell>
                    </CTableRow>
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
              {nowPlayingData && nowPlayingData.id != null ? (
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={12}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" color="success" value="곡완료" onClick={(e) => clickCompleteMusicReq(e)} />
                      </div>
                    </CCol>
                  </CRow>
                </div>
              ) : ('')}
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader><strong>신청곡목록</strong> <small>  오전 6시에 초기화 됩니다.</small> {musicReqDatas.contents && musicReqDatas.contents.length > 0 ? (<small>총 {musicReqDatas.contents.length
            }건</small>) : ('')}</CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2">
                <CRow className="justify-content-between">
                  <CCol xs={12}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton component="input" type="reset" color="secondary" value="신청곡 추가" onClick={popMusicAddClick} />
                      <CButton color="light" onClick={refreshMusicReq}>
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
                    <CTableHeaderCell className="text-center">Table Number</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Running Time</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {musicReqDatas && musicReqDatas.length > 0 ? (
                    musicReqDatas.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} >
                        <CTableDataCell className="text-center">
                          <strong>{index+1}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                          <strong><a href='/' onClick={(e) => popAlbumInfoClick(e, item.albumId)}>{item.albumName}</a></strong>
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
                          {item.tableName == '0' ? '관리자' : item.tableName}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton color="success" shape="rounded-pill" className="mb-3" onClick={(e) => clickSelectMusicReq(e, item.songRequestId)}>
                            선곡
                          </CButton>
                          <CButton color="dark" shape="rounded-pill" className="mb-3" onClick={(e) => clickDeletMusicReq(e, item.songRequestId)}>
                            삭제
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.runningTime}
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

export default MusicReq
