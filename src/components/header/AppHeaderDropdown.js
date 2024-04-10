import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
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

import avatar8 from './../../assets/lpImg/play007.png'

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const logOut= async (e) => {
    e.preventDefault();

  
    // 로그인 API 호출 또는 서버로 요청
    
      try {
        //공통코드 
        const response = await axiosInstance.get('/auth/logout-redirect');
        
        console.log(response.data);
        // 데이터를 상태 변수에 저장
        navigate('/login');
        //sessionStorage.removeItem('codeData');


      } catch (error) {
        //alert(error.response.data.message)
        console.error('오류 발생:', error);
        navigate('/login');
      }

  }

  const  goMusicReq = (e) =>{
    e.preventDefault();
    navigate('music/musicReq')

  }
  return (
    <CDropdown variant="nav-item">
       <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" status="danger"/>
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
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
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
    </CDropdown>
  )
}

export default AppHeaderDropdown
