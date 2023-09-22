import React, { useState } from 'react';
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
} from '@coreui/react';
import ReactImg from 'src/assets/images/react.jpg'
const Validation = () => {
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
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Validation</strong> <small>Custom styles</small>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol xs={4}>
                <CCard style={{ width: '18rem' }}>
                  <CCardImage orientation="top" src={ReactImg} />
                  <CCardBody>
                    <CCardText>
                      <CFormInput type="file" id="formFile" />
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={6}>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">Email</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" defaultValue="Mark" required />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">Email</CFormLabel>
                  <CFormInput type="text" id="validationCustom02" defaultValue="Otto" required />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
                    <CFormInput
                      type="text"
                      id="validationCustomUsername"
                      defaultValue=""
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                  </CInputGroup>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom03">City</CFormLabel>
                  <CFormInput type="text" id="validationCustom03" required />
                  <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom04">City</CFormLabel>
                  <CFormSelect id="validationCustom04">
                    <option disabled>Choose...</option>
                    <option>...</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
                </CCol>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="validationCustom05">City</CFormLabel>
                <CFormInput type="text" id="validationCustom05" required />
                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
              </CCol>
              <CCol xs={12}>
                <CFormCheck
                  type="checkbox"
                  id="invalidCheck"
                  label="Agree to terms and conditions"
                  required
                />
                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
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
  );
};

export default Validation;
