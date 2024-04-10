import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCodeList } from '../../common/utils'
import axiosInstance from '../../common/axiosInstance';
import {
  cilCaretTop,
  cilCaretBottom
} from '@coreui/icons'
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
  CFormSwitch
} from '@coreui/react'

import {
  cilCalendar
} from '@coreui/icons'

const DisplayList = () => {
  /**********************************************************************
   * 공통코드 영역
  **********************************************************************/
  const navigate = useNavigate();

  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  
  const goFormClick = () => { //등록화면이동
    navigate('/display/displayReg');
  }

  const goInfoClick = (e, id) => {
    // 페이지 이동 방지
    e.preventDefault();
    console.log('goInfoClick : ' + id);

    // 새로운 동작 실행
    // 예시: id를 이용한 페이지 이동 또는 다른 동작 수행
    navigate('/display/displayInfo', { state: { displayId: id } });
  };

  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //리스트
  const [tempDisplayDatas, setTempDisplayDatas] = useState({ contents: [] });
  const [displayDatas, setDisplayDatas] = useState({ contents: [] });

  //검색조건
  const [albumSearch, setAlbumSearch] = useState({
    "page": 1,
    "size": 1000
  });

  //조회하기
  const submitSearch = (e) => {
    e.preventDefault();
    submitSearchDisplay();
  }

  //페이징
  const clickPage = (e, page) => {
    e.preventDefault();
    albumSearch.page = page;
    submitSearchDisplay();
    console.log("===page =  : " + page);
  }

  //검색 API
  const submitSearchDisplay = async (e) => {
    e.preventDefault();
    console.log(albumSearch);

    try {
      const response = await axiosInstance.get('/api/display', {
        params: albumSearch,
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setTempDisplayDatas(data);

      console.log(data);

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
      const response = await axiosInstance.get('/api/albums', {
        
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setTempDisplayDatas(data);
      setDisplayDatas(data);

      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert('네트워크 오류 ');
    }

  };

  const changeSort = (e, downYn) => {
    e.preventDefault();
  }

  // 버튼 클릭 시 배열 순서 변경
  const handleMoveUp = (e, currentIndex) => {
    e.preventDefault();
  
    // Ensure that the currentIndex is within valid bounds
    if (currentIndex > 0) {
      // Create a copy of the contents array to avoid directly modifying state
      const newContents = [...tempDisplayDatas.contents];
  
      // Swap the current item with the previous item
      [newContents[currentIndex], newContents[currentIndex - 1]] = [
        newContents[currentIndex - 1],
        newContents[currentIndex]
      ];
  
      // Update the state with the modified contents
      setTempDisplayDatas({
        ...tempDisplayDatas,
        contents: newContents
      });
    }
  };
  

  const handleMoveDown = (e, currentIndex) => {
    e.preventDefault();
  
    // Ensure that the currentIndex is within valid bounds
    if (currentIndex < tempDisplayDatas.contents.length - 1) {
      // Create a copy of the contents array to avoid directly modifying state
      const newContents = [...tempDisplayDatas.contents];
  
      // Swap the current item with the next item
      [newContents[currentIndex], newContents[currentIndex + 1]] = [
        newContents[currentIndex + 1],
        newContents[currentIndex]
      ];
  
      // Update the state with the modified contents
      setTempDisplayDatas({
        ...tempDisplayDatas,
        contents: newContents
      });
    }
  };
  

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>메인항목리스트</CCardHeader>
            <CCardBody>
              <CForm className="row" onSubmit={submitSearchDisplay}>
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                  <CCol xs={3}>
                      <div className="d-grid gap-2 d-md-flex">
                        <CButton component="input" type="button" color="success" value="등록하기" onClick={goFormClick} />
                        <CButton component="input" type="button" color="danger" value="전시순서변경" onClick={goFormClick} />
                      </div>
                    </CCol>
                    <CCol xs={9}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
                    <CTableHeaderCell className="text-center">제목</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">전시순서</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">노출곡수</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">사용여부</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tempDisplayDatas.contents && tempDisplayDatas.contents.length > 0 ? (
                    tempDisplayDatas.contents.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} >
                        <CTableDataCell className="text-center">
                          <strong>{item.displayItemId}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-left">
                        <a href='/' onClick={(e) => goInfoClick(e, item.displayItemId)}>{item.title}</a>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        {index != 0  ? (
                          <CButton color="info" variant="outline" onClick={(e) => handleMoveUp(e, index)} >
                            <CIcon icon={cilCaretTop} title="UP" />
                          </CButton>
                          
                        ) : ('')}
                        {index+1  != tempDisplayDatas.contents.length  ? (
                          <CButton color="info" variant="outline" onClick={(e) => handleMoveDown(e, index)}>
                            <CIcon icon={cilCaretBottom} title="DOWN" />
                          </CButton>
                        ) : ('')}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.songCount}/{item.displayNum}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CFormSwitch defaultChecked={item.useYn} disabled />
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
              {tempDisplayDatas.contents && tempDisplayDatas.contents.length > 0 ? (
                <CRow>
                  {/* <CCol md={{ span: 6, offset: 5 }}>
                    <CPagination aria-label="Page navigation example">
                      <CPaginationItem aria-label="Previous" disabled={tempDisplayDatas.first} onClick={(e) => clickPage(e, 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </CPaginationItem>
                      {Array.from({ length: tempDisplayDatas.totalPages }, (_, index) => (
                        <CPaginationItem
                        key={`page-${index + 1}`}
                        className={index + 1 === tempDisplayDatas.number ? 'active' : ''}
                        onClick={(e) => clickPage(e, index + 1)}
                      >
                        {index + 1}</CPaginationItem>
                      ))}
                      <CPaginationItem aria-label="Next" disabled={tempDisplayDatas.last}>
                        <span aria-hidden="true">&raquo;</span>
                      </CPaginationItem>
                    </CPagination>
                  </CCol> */}
                  <CCol md={12}>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    총 {tempDisplayDatas.totalCount}건
                    </div>
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

export default DisplayList
