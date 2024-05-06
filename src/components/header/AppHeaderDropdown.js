import React,{useState, useEffect,useRef} from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CToast,
  CToaster,
  CToastHeader,
  CToastBody
} from '@coreui/react'
import { useNavigate ,useLocation} from 'react-router-dom'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import axiosInstance from '../../common/axiosInstance';
import { Client } from "@stomp/stompjs";
import avatar8 from './../../assets/lpImg/play007.png'
import appConfig from '../../common/appConfig';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stompClient, setStompClient] = useState(null); // 소켓클라이언트
  const [requestSongSize, setRequestSongSize] = useState(0); 
  const [toast, addToast] = useState(0);
  const toaster = useRef()
  
  useEffect(() => {
    setSocket();
    
      
  }, []);

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
          var newRequestSongSize = rtnTxt.requestSongSize;
          const currentURL = window.location.href;
          console.log('Current URL:', currentURL);
          
          setRequestSongSize(prevRequestSongSize => prevRequestSongSize + newRequestSongSize);
        
          addToast(exampleToast(newRequestSongSize));

          if(currentURL.indexOf('music/musicReqHisList') < 0 && currentURL.indexOf('music/musicReq') > -1){

            setRequestSongSize(0);
            
          }
          //(1)admin 에서 헤더 새 신청곡 갯수 update  (2)admin 신청곡 리스트 update 
          
        }else if(rtnTxt.type == "REFRESH"){
          if(rtnTxt.code == '100'){//신청곡 관리 메뉴 왔을시 상단 메뉴 초기화
           console.log('~!!!');
           setRequestSongSize(0);
          }
        }
      });
    }

    const exampleToast = (newRequestSongSize) => (
      <CToast>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="10"
            height="10"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            {/* <rect width="100%" height="100%" fill="#007aff"></rect> */}
          </svg>
          <div className="fw-bold me-auto"><CIcon icon={cilBell} /> 알림</div>
          <small></small>
        </CToastHeader>
        <CToastBody style={{ textAlign: 'left' }}>신청곡 {newRequestSongSize}건이 도착했습니다.</CToastBody>
      </CToast>
    )
    
    // 주기적으로 연결 상태 확인
    const checkConnection = () => {
      if (!client.connected) {
        console.log('Connection lost. Reconnecting...');
        // 연결 재시도
        client.activate();
      }
    };

    // 5분마다 연결 상태 확인
    const intervalId = setInterval(checkConnection, 15 * 60 * 1000);

    // 컴포넌트가 언마운트될 때 clearInterval()을 사용하여 interval을 정리
    return () => clearInterval(intervalId);

  }

  



  const logOut= async (e) => {
    e.preventDefault();
  
    // 로그인 API 호출 또는 서버로 요청
    
      try {
        //공통코드 
        const response = await axiosInstance.get('/logout');
        
        console.log(response.data);
        // 데이터를 상태 변수에 저장
        navigate('/login');
        //sessionStorage.removeItem('codeData');  
        sessionStorage.clear();


      } catch (error) {
        //alert(error.response.data.message)
        console.error('오류 발생:', error);
        navigate('/login');
      }

  }

  const  goMusicReq = (e) =>{
    e.preventDefault();
    setRequestSongSize(0);
    navigate('music/musicReq');

  }
  return (
    <CDropdown variant="nav-item">
       <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={process.env.PUBLIC_URL + '/basicImg/topLp.png'} size="md" status={requestSongSize > 1 ? "danger" : ''}/>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2"><CIcon icon={cilBell} className="me-2" />Updates</CDropdownHeader>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          메세지
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownItem href="#" onClick={goMusicReq}>
          <CIcon icon={cilTask} className="me-2" />
          신청곡
          {requestSongSize > 1 ?
          <CBadge color="danger" className="ms-2">
            +{requestSongSize}
          </CBadge>
          :''}
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          이벤트
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logOut}>
          <CIcon icon={cilLockLocked} className="me-2" />
          로그아웃
        </CDropdownItem>
      </CDropdownMenu> 
      <CToaster className="p-3" placement="top" push={toast} ref={toaster} />
    </CDropdown>
  )
}

export default AppHeaderDropdown
