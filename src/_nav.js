import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilMobileLandscape,
  cilAlbum,
  cilHeadphones,
  cilSofa,
  cilUser,
  cilBirthdayCake,
  cilFolderOpen
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: '전시관리',
  },
  {
    component: CNavGroup,
    name: '메인관리',
    to: '/display',
    icon: <CIcon icon={cilMobileLandscape} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '메인전시관리',
        to: '/display/displayList',
      },
    ],
  },
  {
    component: CNavTitle,
    name: '뮤직관리',
  },
  {
    component: CNavGroup,
    name: '앨범관리',
    to: '/music',
    icon: <CIcon icon={cilAlbum} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '앨범등록',
        to: '/music/albumReg',
      },
      {
        component: CNavItem,
        name: '앨범관리',
        to: '/music/albumList',
      },
      {
        component: CNavItem,
        name: '대용량업로드',
        to: '/music/albumUpload',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '신청곡관리',
    to: '/music',
    icon: <CIcon icon={cilHeadphones} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '신청곡관리',
        to: '/music/musicReq',
      },
      {
        component: CNavItem,
        name: '히스토리',
        to: '/music/musicReqHisList',
      },
    ],
  },
  {
    component: CNavTitle,
    name: '운영관리',
  },
  {
    component: CNavItem,
    name: '테이블관리',
    to: '/manage/tableList',
    icon: <CIcon icon={cilSofa} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '이벤트관리',
    to: '/manage/eventList',
    icon: <CIcon icon={cilBirthdayCake} customClassName="nav-icon" />,
    
  },
  {
    component: CNavTitle,
    name: '시스템관리',
  },
  {
    component: CNavItem,
    name: '계정관리',
    to: '/system/adminList',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '공통코드관리',
    to: '/system/CodeList',
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: 'SAMPLE',
  // },
  // {
  //   component: CNavItem,
  //   name: '로그인',
  //   to: '/login',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // }
]

export default _nav
