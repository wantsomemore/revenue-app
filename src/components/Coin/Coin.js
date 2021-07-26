import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "./style.scss";
import { connect } from "react-redux";
import { fetchCoinData } from "../../actions/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Notification from "../Notification/Notification";

const Item = ({getCoin, coin, isFetched, notification}) => {
 
  let { id } = useParams();
  const [currency, setCurrency] = useState([])
  const [toggleWeek, setToggleWeek] = useState(true)
  const [toggleMonth, setToggleMonth] = useState(false);
  const [toggleYear, setToggleYear] = useState(false);

  const [totalRevenue, setTotalRevenue] = useState(0)
  const [minRevenue, setMinRevenue] = useState(0)
  const [mediumRevenue, setMediumRevenue] = useState(0)
  const [maxRevenue, setMaxRevenue] = useState(0)

  useEffect( () => {
  id && getCoin(`/item/${id}`)

  }, []);

 
  const sortCurrencyByDate = (array) => {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  sortCurrencyByDate(currency);


  const handleWeekChart = () => {
    let coinData = coin.map(item => item.curency)
    let weekData = coinData.slice(0,7)

    let total = weekData.reduce((a,b) => Math.trunc(Number(a) + Number(b)),0);
    let min = Math.trunc(weekData[0])
    let med = Math.trunc(total / weekData.length)
    let max = Math.trunc(weekData[weekData.length - 1])
   
    setCurrency(weekData)
    setTotalRevenue(total)
    setMinRevenue(min)
    setMediumRevenue(med)
    setMaxRevenue(max)
    
    setToggleWeek(true)
    setToggleMonth(false)
    setToggleYear(false)
  }
 
  const handleMonthChart = () => {
    let coinData = coin.map(item => item.curency)
    let monthData = coinData.slice(0,30)

    let total = monthData.reduce((a,b) => Math.trunc(Number(a) + Number(b)), 0);
    let min = Math.trunc(monthData[0])
    let med = Math.trunc(total / monthData.length)
    let max = Math.trunc(monthData[monthData.length - 1])
   
    setCurrency(monthData)
    setTotalRevenue(total)
    setMinRevenue(min)
    setMediumRevenue(med)
    setMaxRevenue(max)
  
    setToggleWeek(false)
    setToggleMonth(true)
    setToggleYear(false)
  }

  const handleYearChart = () => {
    let data = coin.map(item => item.curency)
    let yearData = data.slice(0,365)
    console.log(yearData)
    let total = yearData.reduce((a,b) => Math.trunc(Number(a) + Number(b)),0);
    let min = Math.trunc(yearData[0])
    let med = Math.trunc(total / yearData.length)
    let max = Math.trunc(yearData[yearData.length - 1])

    setCurrency(yearData)
    setTotalRevenue(total)
    setMinRevenue(min)
    setMediumRevenue(med)
    setMaxRevenue(max)
    
    setToggleWeek(false)
    setToggleMonth(false)
    setToggleYear(true)
  }
  
  const weekData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Week",
        data: [...currency],
        fill: true,
        backgroundColor: "#e6f0fc",
        borderColor: "#1c89ff",
      }
    ]
  };
  const monthData = {
    labels: new Array(30).fill(0).map((e, i) => i + 1),
    datasets: [
      {
        label: "Month",
        data: [...currency],
        fill: true,
        backgroundColor: "#e6f0fc",
        borderColor: "#1c89ff",
      }
    ]
  };
  const yearData = {
    labels: new Array(365).fill(0).map((e, i) => i + 1),
    datasets: [
      {
        label: "Year",
        data: [...currency],
        fill: true,
        backgroundColor: "#e6f0fc",
        borderColor: "#1c89ff",
      }
    ]
  };
  const options = {
    layout: {
      padding: 50,
    },
    spanGaps: true,
    pointRadius: 0,
    scales: {
      y: {
        stacked: true,
      },
    },
  };

  return (
    <>
    <Notification notification={notification}/>
    {isFetched ? (
    <div className="item-container">
      <header className="header">
        <div className="title">Revenue</div>
        <div className="header-right">
          <button className="chart-option" onClick={handleWeekChart}>Week</button>
          <button className="chart-option" onClick={handleMonthChart}>Month</button>
          <button className="chart-option" onClick={handleYearChart}>Year</button>
        </div>
      </header>
      {toggleWeek ? <Line data={weekData} options={options} height={150} width={450} /> : null }
      {toggleMonth ? <Line data={monthData} options={options} height={150} width={450} /> : null }
      {toggleYear ? <Line data={yearData} options={options} height={150} width={450} /> : null }
      <div className="total-block">
          <h6 className="info-title">Total</h6>
          <span className="info-amount">  {`$ ${totalRevenue}`}</span>
        </div>
      <div className="chart-info">
        <div className="info-block">
          <h6 className="info-title">Min</h6>
          <span className="info-amount">{`$ ${minRevenue}`}</span>
        </div>
        <div className="info-block">
          <h6 className="info-title">Medium</h6>
          <span className="info-amount">{`$ ${mediumRevenue}`}</span>
        </div>
        <div className="info-block">
          <h6 className="info-title">Max</h6>
          <span className="info-amount">{`$ ${maxRevenue}`}</span>
        </div>
      </div>
    </div>)
 : (
      <div className="loader-block">
          <h1 className="loader">Data loading...</h1>
          <CircularProgress></CircularProgress>
        </div>
    )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification,
    coin: state.coin,
    isFetched: state.isFetched
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCoin: (payload) => dispatch(fetchCoinData(payload))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Item);
