import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol,CImage } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSpeaker, cilTablet, cibTwitter, cilCalendar } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import ReactImg from 'src/assets/lpImg/cocktail.png'

const Dashboard = ({ withCharts }) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  return (
    <>
   
    <CRow>
  <CCol xs={6}>
    <CWidgetStatsD
      className="mb-3"
      icon={<CIcon className="my-4 text-white" icon={cilSpeaker} height={52} />}

      style={{ '--cui-card-cap-bg': '#3b5998' }}
      values={[
        { title: '오늘의 신청곡수', value: '00' },
        // { title: '오늘의 신청곡수', value: '459' },
      ]}
    />
  </CCol>
  <CCol xs={6}>
    <CWidgetStatsD
      className="mb-3"
      icon={<CIcon className="my-4 text-white" icon={cilTablet} height={52} />}
      
      style={{ '--cui-card-cap-bg': '#00aced' }}
      values={[
        { title: '세팅기기', value: '00' },
        // { title: 'tweets', value: '1.792' },
      ]}
    />
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
  withCharts: PropTypes.bool,
}

export default Dashboard
