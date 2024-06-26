import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../common/axiosInstance';
import {
  cilDataTransferDown
} from '@coreui/icons';
import { throwError } from '../../common/utils'
import appConfig from '../../common/appConfig';
import ComModal from '../../common/ComModal'; // 모달 컴포넌트 임포트

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CCardText,
  CContainer,
  CSpinner
} from '@coreui/react';
const SampleForm = () => {
  /**********************************************************************
   * 메세지영역
  **********************************************************************/
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
    if(acceptType === 'req'){// 등록
        handleSubmit();
    }

    setAcceptType('');
    
  };



  /**********************************************************************
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [excelFile, setExcelFile] = useState(null);
  const [loadingYn, setLoadingYn] = useState(false);
  const [fileUploadYn, setFileUploadYn] = useState(false);
  const [resultYn, setResultYn] = useState(false);
  const [resultUrl, setResultUrl] = useState('');

  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
  };
  const [validated, setValidated] = useState(false);


  const confirmHandleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    setResultYn(false);
    const formData = new FormData();
      formData.append('file', excelFile);
      console.log(excelFile);
    if(!excelFile){
      alertPage('업로드할 파일을 선택하세요.');
      return;
    }

    confirmPage('대용량 업로드를 하시겠습니까?', 'req')
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', excelFile);

    try {
      setLoadingYn(true);
      setFileUploadYn(true);
      

      const response = await axiosInstance.post('/api/albums/upload', formData, {
        timeout: 10000000, // 10초 타임아웃
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('ResultUrl 응답:', response.data);
      setResultUrl(response.data);

      
      alertPage('완료되었습니다.');
      setResultYn(true);

      //navigate('/sample/sampleList');
    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
      
    }
    setLoadingYn(false);
  };

  


  //양식다운로드
  const downloadForm = (url) => {
    // 다운로드할 파일의 경로
    const filePath = appConfig.apiUrl + '/files/excel/form/excelUploadForm.xlsx'; // 예시 파일 경로
    console.log('filePath');
    console.log(filePath);
    // 파일 다운로드
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    document.body.appendChild(downloadLink);
    console.log(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  //실패목록다운로드
  const downloadFailForm = (url) => {
    // 다운로드할 파일의 경로
    console.log(resultUrl)
    var fileIndex = resultUrl.indexOf('/files/excel');
    //const filePath = process.env.PUBLIC_URL + resultUrl.substring(fileIndex); // 예시 파일 경로
    const filePath = appConfig.apiUrl + resultUrl.substring(fileIndex); // 예시 파일 경로
 
    // 파일 다운로드
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    document.body.appendChild(downloadLink);
    console.log(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const refreshPage = () => {

    window.location.reload(); // 페이지 새로고침
  }
  

  return (
    <CContainer>
      <ComModal type={alertType} visible={alertVisible} onClose={handleCloseModal} alertText={alertText} onAccpet={handleAccept}/>
      <CRow>
        
      <CCol >
          <CCard className="mb-4">
          
            <CCardHeader>
              <strong>대용량업로드</strong> <small>{loadingYn ? '진행중인 경우 새로고침을 하지마세요.' : '양식에 맞게 등록해 주세요.' }</small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={confirmHandleSubmit}
              >
                
                <CCol xs={12}>
                  <CCardBody>
                    <CCardText>
                      <CFormInput type="file" id="formFile" accept=".xlsx, .xls" onChange={handleImageChange} disabled={fileUploadYn}/>
                    </CCardText>
                  </CCardBody>
                </CCol>

                
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={12}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton color="light" onClick={downloadForm}>
                        <CIcon icon={cilDataTransferDown} title="Download file"  ></CIcon> 양식다운로드
                      </CButton>
                      {loadingYn ? (
                            <CButton color="primary" disabled>
                              <CSpinner as="span" size="sm" aria-hidden="true" />
                              진행중...
                            </CButton>
                          ) : (
                            resultYn ? (
                              <CButton component="input" color="danger" onClick={refreshPage} value="다시 등록하기" />
                            ) : (
                              <CButton component="input" color="primary" type="submit" value="등록하기" />
                            )
                          )}
                      </div>
                    </CCol>
                  </CRow>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
{resultYn ? 
      <CRow>
      <CCol >
          <CCard className="mb-4">
            <CCardHeader>
              <strong>대용량업로드 결과</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                
                <CCol xs={12}>
                  <CCardBody>
                    <CCardText>
                      업로드 완료. 실패목록을 다운로드하여 확인하세요.
                    </CCardText>
                  </CCardBody>
                </CCol>

                
                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={12}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton color="primary" onClick={downloadFailForm}>
                        <CIcon icon={cilDataTransferDown} title="Download file"  ></CIcon> 실패목록 다운로드
                      </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
   : ''}
    </CContainer>
  );
};

export default SampleForm;
