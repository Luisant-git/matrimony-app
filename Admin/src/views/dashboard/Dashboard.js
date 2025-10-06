import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardFooter, CCol, CRow } from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import axios from 'axios'

const Dashboard = () => {
  const [summary, setSummary] = useState({ total: 0, married: 0, unmarried: 0, active: 0 })
  const [chartData, setChartData] = useState({ labels: [], counts: [] })
  const [period, setPeriod] = useState('month')

  useEffect(() => {
    fetchSummary()
    fetchChart()
  }, [period])

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/summary`)
      setSummary(res.data)
    } catch (err) {
      console.error('Failed to fetch summary', err)
    }
  }

  const fetchChart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/new-users`, {
        params: { period },
      })
      setChartData(res.data)
    } catch (err) {
      console.error('Failed to fetch chart data', err)
    }
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" summary={summary} />
      <CCard className='mb-4'>
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="card-title mb-0">Traffic</h4>
              <div className="small text-body-secondary">New users</div>
            </div>
            <div>
              <button className="btn btn-outline-secondary me-2" onClick={() => setPeriod('day')}>
                Day
              </button>
              <button className="btn btn-outline-secondary me-2" onClick={() => setPeriod('month')}>
                Month
              </button>
              <button className="btn btn-outline-secondary" onClick={() => setPeriod('year')}>
                Year
              </button>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <MainChart labels={chartData.labels} data={chartData.counts} />
        </CCardBody>
        <CCardFooter>
          <div className="small text-body-secondary">New users count data tracking chart system here</div>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Dashboard
