import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
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
} from '@coreui/react'

import {
  cilCalendar
} from '@coreui/icons'

const SampleList = () => {
  // 선택한 날짜를 관리할 상태 변수를 만듭니다.
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);


  // 날짜가 선택될 때 호출될 콜백 함수
  const handleDateChange = date => {
    setSelectedDate(date);
  }
  const handleDateChange2 = date => {
    setSelectedDate2(date);
  }
  const clickReset = date => {
    setSelectedDate(null);
    setSelectedDate2(null);
  }

  const albumData = [
    {
      albumId: '9',
      albumImgUrl: '/static/media/8.35ee8919ea545620a475.jpg',
      mediaNm: 'LP',
      albumNm: 'I Met You When I Was 18.',
      artistNm: 'Lauv',
      relesDt: '2020-04-20',
      genrCd: 'Pop'
    },
    {
      albumId: '8',
      albumImgUrl: '/static/media/8.35ee8919ea545620a475.jpg',
      mediaNm: 'LP',
      albumNm: 'I Met You When I Was 18.',
      artistNm: 'Lauv',
      relesDt: '2020-04-20',
      genrCd: 'Pop'
    },
    {
      albumId: '7',
      albumImgUrl: '/static/media/8.35ee8919ea545620a475.jpg',
      mediaNm: 'LP',
      albumNm: 'I Met You When I Was 18.',
      artistNm: 'Lauv',
      relesDt: '2020-04-20',
      genrCd: 'Pop'
    },
    {
      albumId: '6',
      albumImgUrl: '/static/media/8.35ee8919ea545620a475.jpg',
      mediaNm: 'LP',
      albumNm: 'I Met You When I Was 18.',
      artistNm: 'Lauv',
      relesDt: '2020-04-20',
      genrCd: 'Pop'
    },
    {
      albumId: '5',
      albumImgUrl: '/static/media/8.35ee8919ea545620a475.jpg',
      mediaNm: 'LP',
      albumNm: 'I Met You When I Was 18.',
      artistNm: 'Lauv',
      relesDt: '2020-04-20',
      genrCd: 'Pop'
    },
  ]

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>샘플정보관리</CCardHeader>
            <CCardBody>
              <CForm className="row">
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputEmail3" className="col-form-label">미디어</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormSelect id="inputState" aria-label="미디어">
                      <option>-전체-</option>
                      <option>LP</option>
                      <option>CD</option>
                    </CFormSelect>
                  </CCol>
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputEmail3" className="col-form-label">장르</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormSelect id="inputState" aria-label="장르">
                      <option>-전체-</option>
                      <option>JAZZ</option>
                      <option>K-POP</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputEmail3" className="col-form-label">앨범명</CFormLabel>
                  </CCol>
                  <CCol xs={5}>
                    <CFormInput type="text" id="inputEmail4" aria-label="앨범명" placeholder="전체" />
                  </CCol>
                  <CCol xs={1}>
                    <CFormLabel htmlFor="inputEmail3" className="col-form-label">아티스트</CFormLabel>
                  </CCol>
                  <CCol md={5}>
                    <CFormInput type="text" id="inputPassword4" aria-label="아티스트" placeholder="전체" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md={1}>
                    <CFormLabel htmlFor="inputEmail3" className="col-form-label">등록일</CFormLabel>
                  </CCol>
                  <CCol md={5}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'grid', placeItems: 'center', marginRight: 5 }}>
                        <CIcon className="text-secondary" icon={cilCalendar} size="lg" />
                      </div>
                      <div>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat={'yyyy-MM-dd'} // 날짜 형태
                          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                          minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                          maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                          className="DatePicker"
                        />
                      </div>
                      <div style={{ whiteSpace: 'pre-wrap', display: 'grid', placeItems: 'center' }}>
                        <span> ~ </span>
                      </div>
                      <div style={{ display: 'grid', placeItems: 'center', marginRight: 5 }}>
                        <CIcon className="text-secondary" icon={cilCalendar} size="lg" />
                      </div>
                      <div>
                        <DatePicker
                          selected={selectedDate2}
                          onChange={handleDateChange2}
                          dateFormat={'yyyy-MM-dd'} // 날짜 형태
                          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                          minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                          maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                          className="DatePicker"
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>


                <div className="d-grid gap-2">
                  <CRow className="justify-content-between">
                    <CCol xs={4}>
                      <CButton component="input" type="button" color="danger" value="등록하기" />
                    </CCol>
                    <CCol xs={4}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton component="input" type="reset" color="light" value="초기화" onClick={clickReset} />
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
                    <CTableHeaderCell className="text-center">미디어</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    <CTableHeaderCell className="text-center">앨범명</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">아티스트</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">발매일</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {albumData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <strong>{item.albumId}</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <strong>{item.mediaNm}</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.albumImgUrl} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.albumNm}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.artistNm}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.relesDt}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <br />

            </CCardBody>

          </CCard>
        </CCol>
        <CCol className="justify-content-md-center">
          <CPagination aria-label="Page navigation example">
            <CPaginationItem aria-label="Previous" disabled>
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem active>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCol>
      </CRow>
    </>
  )
}

export default SampleList
