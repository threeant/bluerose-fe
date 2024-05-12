import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCodeList, throwError } from '../../common/utils';
import ComModal from '../../common/ComModal'; // 모달 컴포넌트 임포트
import axiosInstance from '../../common/axiosInstance';
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
  CFormSwitch
} from '@coreui/react'

import {
  cilCalendar
} from '@coreui/icons'

const CodeList = () => {
  /**********************************************************************
   * 공통코드 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [midiaCD] = useState(getCodeList('MEDIA')); // 미디어CD
  const [cntryCD] = useState(getCodeList('CNTRY')); // 발매국가CD

    /**********************************************************************
   * 메세지영역
  **********************************************************************/
    const [alertType, setAlertType] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [acceptType, setAcceptType] = useState('');
    const [alertAftType, setAlertAftType] = useState('');
  
  
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
      if(acceptType === 'updateMst'){
          submitUpdateCodeMst();
      }else if(acceptType === 'reqMst'){
          submitReqCodeMst();
      }else if(acceptType === 'updateCode'){
          submitUpdateCode();
      }else if(acceptType === 'reqCode'){
          submitReqCode();
      }else if(acceptType === 'deleteCode'){
        submitDeletCode();
      }
  
      setAcceptType('');
      
    };
  

  /**********************************************************************
   * 화면 영역
  **********************************************************************/
  const [selectedDate, setSelectedDate] = useState(null); //등록일 from
  const [selectedDate2, setSelectedDate2] = useState(null); // 등록일 to


  //초기화
  const clickReset = date => {

    setCodeSearch({
      "codeStr": ""
    });
  }

  const goFormClick = () => { //등록화면이동
    navigate('/music/albumReg');
  }

  /**********************************************************************
  * 비즈니스로직 영역
 **********************************************************************/
  //마스터 리스트
  const [codeMasterDatas, setCodeMasterDatas] = useState({ contents: [] });

  // 상세 리스트
  const [codeDatas, setCodeDatas] = useState([]);

  // 선택데이터
  const [selCodeDatas, setSelCodeDatas] = useState({});

  //코드 마스터 등록
  const [codeMstReqData, setCodeMstReqData] = useState(
    {
      "code": "",
      "description": ""
    }
  );

  //코드  등록
  const [codeReqData, setCodeReqData] = useState(
    {
      "codeMstId": "",
      "codeNm": "",
      "codeEtc1": "",
      "codeEtc2": "",
      "useYn": true
    }
  );


  const [mstIndex, setMstIndex] = useState(-1);
  //마스터 수정 
  const clickUpdateCodeMst = (e, index) => {
    var item = codeMasterDatas.contents[mstIndex];

    e.preventDefault();
    if (!item.code) {
      alertPage('코드를 입력해 주세요.');
      return;
    }

    if (!item.description) {
      alertPage('코드 설명을 입력해주세요.');
      return;
    }

    // const result = window.confirm('해당 코드 마스터를 수정 하시겠습니까?');

    // if (!result) {
    //   return;
    // }
    confirmPage('해당 코드 마스터를 수정 하시겠습니까?', 'updateMst');
    setMstIndex(index);

  
  }

  //등록 클릭
  const clickSaveCodeMst = (e) => {

    e.preventDefault();
    if (!codeMstReqData.code) {
      alertPage('코드를 입력해 주세요.');
      return;
    }

    if (!codeMstReqData.description) {
      alertPage('코드 설명을 입력해주세요.');
      return;
    }

    
    confirmPage('해당 코드 마스터를 등록 하시겠습니까?', 'reqMst');

  }

  //코드 수정 

  const [codeInex, setCodeInex] = useState(-1);
  const clickUpdateCode = (e, index) => {

    var item = codeDatas[codeInex];

    e.preventDefault();
    if (!item.name) {
      alertPage('코드를 입력해 주세요.');
      return;
    }

    //const result = window.confirm('해당 코드를 수정 하시겠습니까?');
    confirmPage('해당 코드를 수정 하시겠습니까?', 'updateCode')
    setCodeInex(index);
  }

  // 코드 수정 하기 API
  const submitUpdateCode = async () => {

    var item = codeDatas[codeInex];

    try {
      const response = await axiosInstance.post('/api/code/' + item.id, item, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.statusCode) {
        alertPage(response.data.resultMsg);
        return;
      }

      // 폼 데이터를 초기화합니다.
      alertPage('수정되었습니다.');
      submitSearchDetailCodes(selCodeDatas.id);
      setCodeMstReqData(
        {
          "code": "",
          "description": ""
        }
      );
      //submitSearchCodes();
      setCodeSession();

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  //등록 클릭
  const clickSaveCode = (e) => {

    e.preventDefault();
    if (!codeReqData.codeNm) {
      alertPage('코드명 입력해 주세요.');
      return;
    }

    confirmPage('해당 코드를 등록 하시겠습니까?', 'reqCode')

    
  }



  //마스터 코드 등록 하기 API
  const submitReqCode = async () => {

    try {
      const response = await axiosInstance.post('/api/code', codeReqData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.statusCode) {
        alertPage(response.data.resultMsg);
        return;
      }


      // 폼 데이터를 초기화합니다.
      alertPage('등록되었습니다.');

      const codeMstId = codeReqData.codeMstId;
      setCodeReqData((prevCodeReqData) => ({
        ...prevCodeReqData,
        "codeNm": "",
        "codeEtc1": "",
        "codeEtc2": "",
        "useYn": true
      }));
      submitSearchDetailCodes(codeMstId);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  //마스터 코드 등록 하기 API
  const submitReqCodeMst = async () => {


    try {
      const response = await axiosInstance.post('/api/code/master', codeMstReqData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.statusCode) {
        alertPage(response.data.resultMsg);
        return;
      }

      // 폼 데이터를 초기화합니다.
      alertPage('등록되었습니다.');
      setCodeMstReqData(
        {
          "code": "",
          "description": ""
        }
      );
      submitSearchCodes();

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  // 코드 마스터 수정 하기 API
  const submitUpdateCodeMst = async () => {

    var item = codeMasterDatas.contents[mstIndex];

    try {
      const response = await axiosInstance.post('/api/code/master/' + item.id, item, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.statusCode) {
        alertPage(response.data.resultMsg);
        return;
      }

      // 폼 데이터를 초기화합니다.
      alertPage('수정되었습니다.');
      setCodeMstReqData(
        {
          "code": "",
          "description": ""
        }
      );
      submitSearchCodes();
      setCodeSession();
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };


  //검색조건
  const [codeSearch, setCodeSearch] = useState({
    "codeStr": ""
  });

  //조회하기
  const submitSearch = (e) => {
    e.preventDefault();
    submitSearchCodes();
  }

  //페이징
  const clickPage = (e, page) => {
    e.preventDefault();
    codeSearch.page = page;
    submitSearchCodes();
  }

  //검색 API
  const submitSearchCodes = async () => {


    try {
      const response = await axiosInstance.get('/api/code/search/master', {
        params: codeSearch,
        headers: { 'Content-Type': 'application/json' }
      });

      

      // API 응답에서 데이터 추출
      const data = response.data;
      console.log(data);
      // 데이터를 상태 변수에 저장
      setCodeMasterDatas(data);


    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  //코드상세조회
  const showDetailClick = (e, data) => {
    // 페이지 이동 방지
    e.preventDefault();

    if (data) {
      setSelCodeDatas(data);
      submitSearchDetailCodes(data.id);
      setCodeReqData((prevCodeReqData) => ({
        ...prevCodeReqData,
        codeMstId: data.id
      }));
    }
  };

  //검색 API
  const submitSearchDetailCodes = async (masterId) => {


    try {
      const response = await axiosInstance.get('/api/code/searchAll/' + masterId);

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setCodeDatas(data);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  //코드 마스터 삭제 클릭
  const clickDeletCodeMaster = (e, codeMasterId) => {
    e.preventDefault();

    const result = window.confirm('해당코드를 삭제 하시겠습니까?\n 하위코드는 모두 사라집니다.');

    if (!result) {
      return;
    }

    submitDeletCodeMaster(codeMasterId);
  };

  //코드마스터 삭제 API
  const submitDeletCodeMaster = async (codeMasterId) => {

    try {
      const response = await axiosInstance.delete('/api/code/master/' + codeMasterId);


      // 폼 데이터를 초기화합니다.
      alertPage('삭제되었습니다.');
      submitSearchCodes();
      setSelCodeDatas({});

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  //곡 삭제 클릭
  const [selCodeId, setSelCodeId] = useState(-1);
  const clickDeletCode = (e, id) => {
    e.preventDefault();

    //const result = window.confirm('해당코드를 삭제 하시겠습니까?');
    confirmPage('해당코드를 삭제 하시겠습니까?', 'deleteCode')

    setSelCodeId(id);
  };

  //곡 삭제 API
  const submitDeletCode = async () => {


    try {
      const response = await axiosInstance.delete('/api/code/' + selCodeId);


      // 폼 데이터를 초기화합니다.
      alertPage('삭제되었습니다.');
      const codeMstId = codeReqData.codeMstId;
      submitSearchDetailCodes(codeMstId);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };

  const setCodeSession = async ()=>{
    try {
      //공통코드 
      const codeResponse = await axiosInstance.get('/api/code', {}, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(codeResponse.data);

          // API 응답에서 데이터 추출
      const codeData = codeResponse.data;
      // 데이터를 상태 변수에 저장

      console.log(codeData)
      const jsonData = JSON.stringify(codeData);
      sessionStorage.setItem('codeData', jsonData);


      // 세션에서 JSON 데이터 가져오기
      const jsonCodeData = sessionStorage.getItem('codeData');

      // JSON 문자열을 파싱하여 JavaScript 객체로 변환
      const codeList = JSON.parse(jsonCodeData);

      // userData 객체 사용
      for (const c of codeList) {
        //console.log(c);
        console.log(c.description);
        console.log(c.code);
        console.log(c.codes);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  return (
    <>
    <ComModal type={alertType} visible={alertVisible} onClose={handleCloseModal} alertText={alertText} onAccpet={handleAccept}/>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>코드마스터</CCardHeader>
            <CCardBody>
              <CForm className="row" >
                <CRow className="mb-3">
                  <CCol xs={2}>
                    <CFormLabel htmlFor="inputName" className="col-form-label">코드정보</CFormLabel>
                  </CCol>
                  <CCol xs={10}>
                    <CFormInput type="text" id="inputName" aria-label="코드정보" placeholder="전체" onChange={(e) => setCodeSearch({ ...codeSearch, codeStr: e.target.value })} />
                  </CCol>
                </CRow>
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={4}>
                    </CCol>
                    <CCol xs={4}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" type="reset" color="light" value="초기화" onClick={clickReset} />
                        <CButton component="input" color="primary" type="submit" value="조회하기" onClick={submitSearch}/>
                      </div>
                    </CCol>
                  </CRow>
                </div>
              </CForm>
              <br />
              <CTable align="middle" hover>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">CODE</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">코드설명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="item in tableItems" key="row0" onClick={(e) => showDetailClick(e)}>
                    <CTableDataCell className="text-center">
                      -
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormInput type="text" id="inputTrackNumber" value={codeMstReqData.code} onChange={(e) => setCodeMstReqData({ ...codeMstReqData, code: e.target.value })} maxLength={20} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormInput type="text" id="inputTrackNumber" value={codeMstReqData.description} onChange={(e) => setCodeMstReqData({ ...codeMstReqData, description: e.target.value })} maxLength={20} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="info" shape="rounded-pill" className="mb-3" onClick={(e) => clickSaveCodeMst(e)}>
                        추가
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                  {codeMasterDatas.contents && codeMasterDatas.contents.length > 0 ? (
                    codeMasterDatas.contents.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} onClick={(e) => showDetailClick(e, item)}>
                        <CTableDataCell className="text-center">
                          <strong>{item.id}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CFormInput type="text" id="inputCode" value={item.code} onChange={(e) => setCodeMasterDatas((prevData) => ({ ...prevData, contents: prevData.contents.map((content, i) => i === index ? { ...content, code: e.target.value } : content) }))} maxLength={20} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CFormInput type="text" id="inputCode" value={item.description} onChange={(e) => setCodeMasterDatas((prevData) => ({ ...prevData, contents: prevData.contents.map((content, i) => i === index ? { ...content, description: e.target.value } : content) }))} maxLength={20} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton color="success" shape="rounded-pill" className="mb-3" onClick={(e) => clickUpdateCodeMst(e, index)}>
                            수정
                          </CButton>
                          {/* <CButton color="dark" shape="rounded-pill" className="mb-3" onClick={(e) => clickDeletCodeMaster(e, item.id)} >
                            삭제
                          </CButton> */}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) :
                    (
                      ''
                    )
                  }
                </CTableBody>
              </CTable>
              <br />
              {codeMasterDatas.contents && codeMasterDatas.contents.length > 0 ? (
                <CRow>
                  <CCol md={{ span: 6, offset: 5 }}>
                    {/* <CPagination aria-label="Page navigation example">
                      <CPaginationItem aria-label="Previous" disabled={!codeMasterDatas.first} onClick={(e) => clickPage(e, 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </CPaginationItem>
                      {Array.from({ length: codeMasterDatas.totalPages }, (_, index) => (
                        <CPaginationItem key={index} active onClick={(e) => clickPage(e, index + 1)}>{index + 1}</CPaginationItem>
                      ))}
                      <CPaginationItem aria-label="Next" disabled={!codeMasterDatas.last}>
                        <span aria-hidden="true">&raquo;</span>
                      </CPaginationItem>
                    </CPagination> */}
                  </CCol>
                  <CCol md={1}>
                    총 {codeMasterDatas.totalCount}건
                  </CCol>
                </CRow>
              ) : ''}
            </CCardBody>
          </CCard>
          {selCodeDatas.code ? (
            <CCard className="mb-4">
              <CCardHeader>코드상세</CCardHeader>
              <CCardBody>
                <CTable align="middle" >
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">{selCodeDatas.id}</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">{selCodeDatas.code}</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">{selCodeDatas.description}</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                </CTable>
                <CTable align="middle" >
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">No</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">CODE_NM</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">CODE_ETC_1</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">CODE_ETC_2</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">사용여부</CTableHeaderCell>
                      <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow v-for="item in tableItems" key="row2" >
                      <CTableDataCell className="text-center">
                        -
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormInput type="text" id="inputName" value={codeReqData.codeNm} onChange={(e) => setCodeReqData({ ...codeReqData, codeNm: e.target.value })} maxLength={20} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormInput type="text" id="inputEtc1" value={codeReqData.codeEtc1} onChange={(e) => setCodeReqData({ ...codeReqData, codeEtc1: e.target.value })} maxLength={20} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormInput type="text" id="inputEtc2" value={codeReqData.codeEtc2} onChange={(e) => setCodeReqData({ ...codeReqData, codeEtc2: e.target.value })} maxLength={20} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormSwitch id="inputUseYn" checked={codeReqData.useYn} onChange={(e) => setCodeReqData({ ...codeReqData, useYn: e.target.checked })} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton color="info" shape="rounded-pill" className="mb-3" onClick={(e) => clickSaveCode(e)}>
                          추가
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                    {codeDatas.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index} >
                        <CTableDataCell className="text-center">
                          <strong>{item.id}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CFormInput type="text" id={index + 'inputName'} value={item.name} onChange={(e) => setCodeDatas((prevData) => prevData.map((content, i) => i === index ? { ...content, name: e.target.value } : content))} maxLength={20} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CFormInput type="text" id={index + 'inputEtc1'} value={item.etc1} onChange={(e) => setCodeDatas((prevData) => prevData.map((content, i) => i === index ? { ...content, etc1: e.target.value } : content))} maxLength={20} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CFormInput type="text" id={index + 'inputEtc2'} value={item.etc2} onChange={(e) => setCodeDatas((prevData) => prevData.map((content, i) => i === index ? { ...content, etc2: e.target.value } : content))} maxLength={20} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CFormSwitch id={index + 'useYn'} defaultChecked={item.useYn} onChange={(e) => setCodeDatas((prevData) => prevData.map((content, i) => i === index ? { ...content, useYn: e.target.checked } : content))} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton color="success" shape="rounded-pill" className="mb-3" onClick={(e) => clickUpdateCode(e, index)}>
                            수정
                          </CButton>
                          {/* <CButton color="dark" shape="rounded-pill" className="mb-3" onClick={(e) => clickDeletCode(e, item.id)}>
                            삭제
                          </CButton>  */}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                    }
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          ) :
            (
              ''
            )
          }
        </CCol>
      </CRow >
    </>
  )
}

export default CodeList
