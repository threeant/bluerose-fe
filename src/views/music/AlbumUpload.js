import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../common/axiosInstance';
import {
  cilDataTransferDown
} from '@coreui/icons';
import { throwError } from '../../common/utils'

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
   * 공통 영역
  **********************************************************************/
  const navigate = useNavigate();

  const [excelFile, setExcelFile] = useState(null);
  const [loadingYn, setLoadingYn] = useState(false);
  const [resultYn, setResultYn] = useState(false);
  const [resultUrl, setResultUrl] = useState(false);

  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
  };
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
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
      alert('업로드할 파일을 선택하세요.');
      return;
    }

    try {
      setLoadingYn(true);
      

      const response = await axiosInstance.post('/api/albums/upload', formData, {
        timeout: 10000000, // 10초 타임아웃
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('ResultUrl 응답:', response.data);
      setResultUrl(response.data);

      
      alert('완료되었습니다.');
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
    const filePath = resultUrl; // 예시 파일 경로

    // 파일 다운로드
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    document.body.appendChild(downloadLink);
    console.log(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <CContainer>
      <CRow>
        
      <CCol >
          <CCard className="mb-4">
          
            <CCardHeader>
              <strong>대용량업로드</strong> <small>양식에 맞게 등록해 주세요.</small>
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
                      <CFormInput type="file" id="formFile" accept=".xlsx, .xls" onChange={handleImageChange}/>
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
                        {loadingYn ? <CButton color="primary" disabled>
                              <CSpinner as="span" size="sm" aria-hidden="true" />
                              진행중...
                            </CButton> 
                            : <CButton component="input" color="primary" type="submit" value="등록하기" />
                        }
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
                      <CButton color="primary" onClick={downloadForm}>
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
