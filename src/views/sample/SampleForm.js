import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cifUs,
} from '@coreui/icons';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardImage,
  CCardText,
  CFormTextarea,
  CContainer,
  CImage,
  CFormSwitch,
} from '@coreui/react';
import ReactImg from 'src/assets/images/image400.jpg'
const Validation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = date => {
    setSelectedDate(date);
  }
  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <CContainer>
      <CRow>
        <CCol >
          <CCard className="mb-4">
            <CCardHeader>
              <strong>샘플등록</strong> <small>샘플수정입니다</small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol xs={12} >
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                  <CFormSwitch label="사용여부" id="formSwitchCheckChecked" defaultChecked />
                </CCol>
                <CCol xs={12}>
                  <CImage rounded thumbnail align="center" src={ReactImg} width={150} height={150} />
                  <CCardBody>
                    <CCardText>
                      <CFormInput type="file" id="formFile" />
                    </CCardText>
                  </CCardBody>
                </CCol>

                <CCol xs={6}>
                  <CFormLabel htmlFor="validationCustom04">미디어*</CFormLabel>
                  <CFormSelect id="validationCustom04">
                    <option>LP</option>
                    <option>CD</option>
                  </CFormSelect>
                  <CFormFeedback invalid>미디어를 선택해주세요</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="validationCustom01">Label</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" defaultValue="" required />
                  <CFormFeedback valid>아티스트를 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="validationCustom01">앨범명*</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" defaultValue="" required />
                  <CFormFeedback valid>앨범명을 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="validationCustom01">아티스트*</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" defaultValue="" required />
                  <CFormFeedback valid>아티스트를 입력해주세요.</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CFormLabel htmlFor="validationCustom01">Format</CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
                  <CFormFeedback valid>아티스트를 입력해주세요.</CFormFeedback>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="validationCustom04">발매국가*</CFormLabel>
                  <div style={{ display: 'flex' }}>
                    <div style={{ display: 'grid', placeItems: 'center', margin: 5 }}>
                      <CIcon className="text-secondary" icon={cifUs} size="lg" />
                    </div>
                    <div style={{ width: '60%' }}>
                      <CFormSelect id="validationCustom04">
                        <option>USA</option>
                        <option>KOREA</option>
                      </CFormSelect>
                      <CFormFeedback invalid>미디어를 선택해주세요</CFormFeedback>
                    </div>
                  </div>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="validationCustom04">발매일</CFormLabel>
                  <div style={{ display: 'flex' }}>
                    <div style={{ display: 'grid', placeItems: 'center', marginRight: 5 }}>
                      <CIcon className="text-secondary" icon={cilCalendar} size="lg" />
                    </div>
                    <div style={{ width: '100%' }}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat={'yyyy-MM-dd'} // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                        className="DatePicker"
                        width="100%"
                      />
                    </div>
                  </div>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom01">Style</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" required />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={12}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" type="button" color="light" value="목록" />
                        <CButton component="input" color="primary" type="submit" value="등록하기" />
                      </div>
                    </CCol>
                  </CRow>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    </CContainer>
  );
};

export default Validation;
