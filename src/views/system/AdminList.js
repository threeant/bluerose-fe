import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../common/axiosInstance';
import PaginationComponent from '../common/PaginationComponent';
import { getCodeList, throwError } from '../../common/utils'
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

import {
  cilCalendar
} from '@coreui/icons'

const AlbumList = () => {
  /**********************************************************************
   * 공통코드 영역
  **********************************************************************/
  const navigate = useNavigate();

  /**********************************************************************
   * 화면 영역
  **********************************************************************/

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0); // 현재 페이지 상태


  //초기화
  const clickReset = date => {

    setAlbumSearch({
      "name": "",
      "id": "",
      "page": 1,
      "useYn": null,
      "size": 10,
      
    });
  }

  const goFormClick = () => { //등록화면이동
    navigate('/system/AdminReg');
  }

  const goInfoClick = (e, id) => {
    // 페이지 이동 방지
    e.preventDefault();
    console.log('goInfoClick : ' + id);

    // 새로운 동작 실행
    // 예시: id를 이용한 페이지 이동 또는 다른 동작 수행
    navigate('/system/AdminInfo', { state: { userId: id } });
  };

  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //리스트
  const [albumDatas, setAdminDatas] = useState({ contents: [] });

  //검색조건
  const [albumSearch, setAlbumSearch] = useState({
    "name": "",
    "id": "",
    "page": 1,
    "useYn": null,
    "size": 10,
  });

  //조회하기
  const submitSearch = (e) => {
    e.preventDefault();
    submitSearchAdmin(1);
  }

  //페이징
  const clickPage = (e, page) => {
    e.preventDefault();
    albumSearch.page = page;
    submitSearchAdmin(page);
    console.log("===page =  : " + page);
  }

    //페이지 변경
    const handlePageChange = (page) => {
      console.log('현재페이지 ');
      console.log(page);
      setCurrentPage(page); // 페이지 변경 시 현재 페이지 상태 업데이트
      submitSearchAdmin(page);
    };

  //검색 API
  const submitSearchAdmin = async (page) => {

    console.log(albumSearch);

    if(page > -1){
      setAlbumSearch(prevState => ({
        ...prevState,
        page: page
      }));

      albumSearch.page = page;
    }

    try {
      const response = await axiosInstance.get('/api/admin', {
        params: albumSearch,
        headers: { 'Content-Type': 'application/json' }
      });

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setAdminDatas(data);

      console.log(data)
      setTotalPages(data.totalPages);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  const handleRadioChange = (e) => {
    const value = e.target.value === "true" ? true : e.target.value === "false" ? false : null;
    setAlbumSearch({ ...albumSearch, useYn: value });
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
      setAdminDatas(data);

      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader><strong>관리자검색</strong></CCardHeader>
            <CCardBody>
              <CForm className="row" >
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputName" className="col-form-label">아이디</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormInput type="text" id="inputName" placeholder="전체" onChange={(e) => setAlbumSearch({ ...albumSearch, id: e.target.value })} />
                  </CCol>
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputArtist" className="col-form-label">이름</CFormLabel>
                  </CCol>
                  <CCol md={5}>
                    <CFormInput type="text" id="inputArtist" placeholder="전체" onChange={(e) => setAlbumSearch({ ...albumSearch, name: e.target.value })} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputName" className="col-form-label">사용여부</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'grid', placeItems: 'center', marginRight: 15 }}>
                        <CFormCheck type="radio" name="useYnRadios" id="useYn_all" value="" checked={albumSearch.useYn === null} onChange={handleRadioChange} label="전체" />
                      </div>
                      <div style={{ display: 'grid', placeItems: 'center', marginRight: 15 }}>
                        <CFormCheck type="radio" name="useYnRadios" id="useYn_true" value="true"
                          checked={albumSearch.useYn === true}
                          onChange={handleRadioChange} label="사용"/>
                      </div>
                      <div style={{ display: 'grid', placeItems: 'center', marginRight: 15 }}>
                        <CFormCheck type="radio" name="useYnRadios" id="useYn_false"
                              value="false"
                              checked={albumSearch.useYn === false}
                              onChange={handleRadioChange} label="미사용"/>
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
                        <CButton component="input" color="primary" type="submit" value="조회하기"  onClick={submitSearch}/>
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
                    <CTableHeaderCell className="text-center">아이디</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">이름</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">사용여부</CTableHeaderCell>
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
                          <a href='/' onClick={(e) => goInfoClick(e, item.id)}>{item.adminId}</a>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {item.name}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        <CFormCheck  defaultChecked={item.useYn} disabled/>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) :
                    (
                      <CTableRow v-for="item in tableItems" >
                        <CTableDataCell className="text-center" colSpan={4} key={0}>
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
