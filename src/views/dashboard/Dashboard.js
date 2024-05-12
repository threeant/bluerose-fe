import React, { useState , useEffect} from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol,CImage } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSpeaker, cilTablet, cibTwitter, cilCalendar } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import ReactImg from 'src/assets/lpImg/cocktail.png'

import { getCodeList, throwError } from '../../common/utils'
import axiosInstance from '../../common/axiosInstance';
import { useNavigate } from 'react-router-dom'

const Dashboard = ({  }) => {

  const [reqSongCnt, setReqSongCnt] = useState(0);
  const [tableSetCnt, setTableSetCnt] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    submitInfo();
    submitSearchTable();
  }, []);

  const submitInfo = async () => {
    

    //오늘의 신청곡수 조회
    try {
      const response = await axiosInstance.get('/api/song-request/today');

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      setReqSongCnt(data);

      //console.log(data)

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      //console.log(error);
      throwError(error,navigate);
    }
  }

  //테이블 검색 API
  const submitSearchTable = async () => {

    try {
      const response = await axiosInstance.get('/api/tables');

      // API 응답에서 데이터 추출
      const data = response.data;
      // 데이터를 상태 변수에 저장
      console.log("테이블 결과 ----")
      console.log(data);
      var setCnt  = 0;
      
      for(var i = 0 ; i < data.length; i++){
        if(data[i].settingYn == true){
          setCnt++;
        }
      }

      setTableSetCnt(setCnt);

    } catch (error) {
      // API 요청이 실패한 경우 에러를 처리할 수 있습니다.
      console.log(error);
      throwError(error,navigate);
    }

  };
  const goPage = (e, location) => {
    // 페이지 이동 방지
    e.preventDefault();

    // 새로운 동작 실행
    // 예시: id를 이용한 페이지 이동 또는 다른 동작 수행
    navigate(location);
  };

  return (
    <>
   
    <CRow>
  <CCol xs={6}  >
    {/* <a href='/music/musicReq'> */}
    <a href='/' onClick={(e) => goPage(e, '/music/musicReq')} style={{'text-decoration': 'none'}}>
      <CWidgetStatsD
        className="mb-3"
        icon={<CIcon className="my-4 text-white" icon={cilSpeaker} height={52} />}

        style={{ '--cui-card-cap-bg': '#3b5998' }}
        values={[
          { title: '오늘의 신청곡수', value: reqSongCnt },
        ]}
      />
    </a>
  </CCol>
  <CCol xs={6}>
    <a href='/' onClick={(e) => goPage(e, '/manage/tableList')} style={{'text-decoration': 'none'}}>
      <CWidgetStatsD
        className="mb-3"
        icon={<CIcon className="my-4 text-white" icon={cilTablet} height={52} />}
        
        style={{ '--cui-card-cap-bg': '#00aced' }}
        values={[
          { title: '세팅기기', value: tableSetCnt },
          // { title: 'tweets', value: '1.792' },
        ]}
      />
    </a>
  </CCol>
</CRow>
<CRow>
    <CCol sm={12}>
    {/* <CImage rounded  align="center" src={ReactImg} width={150} height={150} /> */}
    </CCol>
    </CRow>
    </>
  )
}

Dashboard.propTypes = {
  
}

export default Dashboard
