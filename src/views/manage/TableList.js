import React, { useState, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../../common/axiosInstance';
import { throwError } from '../../common/utils'


import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CContainer,
  CSpinner,
} from '@coreui/react';
import {
  cilSync
} from '@coreui/icons'
import ReactImg from 'src/assets/images/image400.jpg'
const TableList = () => {

  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  const location = useLocation();


  useEffect(() => {

    submitSearchTable();

  }, []);

  //좌석수 숫자세팅
  const setNumberTableCnt = (e) => {
    const value = e.target.value;

    if (value.length <= 3) {
      setTableReqData({ ...tableReqData, tableName: e.target.value });
    }

  }

  /**********************************************************************
  * 비즈니스로직 영역
  **********************************************************************/
  // 테이블 리스트
  const [tableDatas, setTableDatas] = useState([]);

  // 테이블 등록
  const [tableReqData, setTableReqData] = useState(
    {
      "numberOfSeats": "",
      "settingYn": false,
      "tableName": ""
    }
  );


  //테이블 검색 API
  const submitSearchTable = async () => {

    try {
      const response = await axiosInstance.get('/api/tables');

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setTableDatas(data);
      console.log("테이블 결과 ----")
      console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };


  //등록 클릭
  const clickTableSong = (e) => {
    e.preventDefault();

    if (!tableReqData.numberOfSeats) {
      alert('테이블 번호를 입력해 주세요.');
      return;
    }

    if (!tableReqData.tableName) {
      alert('좌석수를 입력해주세요.');
      return;
    }



    const result = window.confirm('해당 테이블을 등록 하시겠습니까?');

    if (!result) {
      return;
    }

    submitReqTable();

  };

 


  //등록 하기 API
  const submitReqTable = async () => {

    try {
      const response = await axiosInstance.post('/api/tables', tableReqData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API 응답:', response.data);
      console.log(response.data);
      if (response.status === 200) {
        
        // 폼 데이터를 초기화합니다.
        alert('등록되었습니다.');
        submitSearchTable();
        setTableReqData(
          {
            "numberOfSeats": "",
            "settingYn": false,
            "tableName": ""
          }
        );
      } else {
        alert('오류 발생');
      }

      

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.error('API 요청 실패:', error);
      alert(error.response.data.message);
    }

  };


  //삭제 클릭
  const clickDeletTable = (e, tableId) => {
    e.preventDefault();

    const result = window.confirm('해당 테이블을 삭제 하시겠습니까?');

    if (!result) {
      return;
    }

    submitDeletTable(tableId);
  };

  //삭제 API
  const submitDeletTable = async (tableId) => {


    try {
      const response = await axiosInstance.delete('/api/tables/' + tableId);

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('삭제되었습니다.');
      submitSearchTable();

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };


   //연결해제
   const clickDisconnTable = (e, tableId) => {
    e.preventDefault();
  
    const result = window.confirm('해당 테이블을 연결 해제하시겠습니까?');
   
    if (!result) {
      return;
    }
  
    submitDisconnTable(tableId);
  };


  //삭제 API
  const submitDisconnTable = async (tableId) => {


    try {
      const response = await axiosInstance.post('/api/tables/' + tableId +'/disconnect');

      console.log('API 응답:', response.data);

      // 폼 데이터를 초기화합니다.
      alert('해제되었습니다.');
      submitSearchTable();

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };
  



  return (
    <CContainer>
      <CCard className="mb-4">
        <CCardHeader>
          <CButton color="light" onClick={submitSearchTable}>
            <CIcon icon={cilSync} title="Download file" />
          </CButton>
          <strong> 테이블 목록</strong> <small></small>
        </CCardHeader>
        {tableDatas ? (
          <CCardBody>
            <CRow>
              <CCol xs={1}>
                <CFormInput type="text" id="staNo" value="No" readOnly plainText />
              </CCol>
              <CCol xs={5}>
                <CFormInput type="text" id="staTrackNumber" value="테이블번호*" readOnly plainText />
              </CCol>
              <CCol xs={3}>
                <CFormInput type="text" id="staTitle" value="좌석수*" readOnly plainText />
              </CCol>
              <CCol xs={1}>
                <CFormInput type="text" id="staRunningTime" value="세팅여부" readOnly plainText />
              </CCol>
              <CCol xs={1}>
                <CFormInput type="text" id="staRunningTime" value="연결해제" readOnly plainText />
              </CCol>
              <CCol xs={1}>
                <CFormInput type="text" id="staButton" value="삭제" readOnly plainText />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={1}>
                <CFormInput type="text" id="staNoReq" value="-" readOnly plainText />
              </CCol>
              <CCol xs={5}>
                <CFormInput type="text" id="inputTableName" value={tableReqData.tableName} onChange={(e) => setTableReqData({ ...tableReqData, tableName: e.target.value })} maxLength={5} />
              </CCol>
              <CCol xs={2}>
                <CFormInput type="number" id="inputTrackNumber" value={tableReqData.numberOfSeats} onChange={(e) => setTableReqData({ ...tableReqData, numberOfSeats: e.target.value })} />
              </CCol>
              
              <CCol xs={3}>
                <CButton color="info"  onClick={(e) => clickTableSong(e)}>
                  추가
                </CButton>
              </CCol>
            </CRow>
            {tableDatas.map((item, index) => (
              <CRow key={index}>
                <CCol xs={1}>
                  <CFormInput type="text" id={'txtNoReq${index}'} value={tableDatas.length - index} readOnly plainText />
                </CCol>
                <CCol xs={5}>
                  <CFormInput type="text" id={'txtTableNumber${index}'} value={item.tableName} readOnly plainText />
                  
                </CCol>
                <CCol xs={3}>
                  <CFormInput type="text" id={'txtNumberOfSeats${index}'} value={item.numberOfSeats} readOnly plainText />
                </CCol>
                <CCol xs={1}>
                  <CFormInput type="text" id={'txtSettingYn${index}'} value={item.settingYn? 'O' : 'X'} readOnly plainText />
                </CCol>
                <CCol xs={1}>
                {item.settingYn ?
                  <CButton color="danger" className="mb-3" onClick={(e) => clickDisconnTable(e, item.id)}>
                    해제
                  </CButton>
                  : '-'}
                </CCol>
                <CCol xs={1}>
                <CButton color="dark" className="mb-3" onClick={(e) => clickDeletTable(e,item.id)}>
                  삭제
                </CButton>
              </CCol>
              </CRow>
            ))}
          </CCardBody>
        ) : (<div className="d-flex justify-content-center">
          <CSpinner />
        </div>
        )}
      </CCard>
    </CContainer >
  );
};

export default TableList;
