// ComModal.js
import React from 'react';
import PropTypes from 'prop-types';
import { CModal, CModalBody, CModalFooter, CButton,CModalHeader,CModalTitle  } from '@coreui/react';
import {
  cilBell,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const ComModal = ({ type, visible, onClose, alertText , onAccpet, aftFunc}) => {
  if(type == 'confirm') {
    return  ComfirmModal(visible, onClose, alertText, onAccpet);
  }else if(type == 'alert') {
    return  AlertModal(visible, onClose, alertText, aftFunc);
  }
  
};

const ComfirmModal = (visible, onClose, alertText , onAccect) => {
  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample"><CIcon icon={cilBell} /></CModalTitle>
      </CModalHeader>
      <CModalBody>
        {alertText}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          취소
        </CButton>
        <CButton color="primary" onClick={onAccect} >확인</CButton>
      </CModalFooter>
    </CModal>
  );
}


const AlertModal = (visible, onClose, alertText , aftFunc) => {
  const onCloseAction = () => {
    onClose();
    if(aftFunc){
      aftFunc();
    }
    
  }
  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={onCloseAction}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample"><CIcon icon={cilBell} /></CModalTitle>
      </CModalHeader>
      <CModalBody>
        {alertText}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onCloseAction}>
          확인
        </CButton>
      </CModalFooter>
    </CModal>
  );
}


ComModal.propTypes = {
  type: PropTypes.string.isRequired, // visible prop의 타입 및 필수 여부
  visible: PropTypes.bool.isRequired, // visible prop의 타입 및 필수 여부
  onClose: PropTypes.func.isRequired, // onClose prop의 타입 및 필수 여부
  alertText: PropTypes.string.isRequired, // alertText prop의 타입 및 필수 여부
  onAccpet: PropTypes.func, // onClose prop의 타입 및 필수 여부
  aftFunc: PropTypes.func, // alert 완료후 추처리 prop의 타입 및 필수 여부
};

export default ComModal;
