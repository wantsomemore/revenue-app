import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "./style.scss";

const Item = () => {

  let { id } = useParams();
  const itemUrl = `/item/${id}`;

  const [itemData, setItemData] = useState([]);
  const [currency, setCurrency] = useState([])

  const [toggleWeek, setToggleWeek] = useState(true)
  const [toggleMonth, setToggleMonth] = useState(false);
  const [toggleYear, setToggleYear] = useState(false);

  const [totalRevenue, setTotalRevenue] = useState(0)
  const [minRevenue, setMinRevenue] = useState(0)
  const [mediumRevenue, setMediumRevenue] = useState(0)
  const [maxRevenue, setMaxRevenue] = useState(0)
 
  useEffect( () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(itemUrl);
    const item = await response.json();
    setItemData(item.data.filter((item) => item.curency !== 'null'));
  };
 
  const sortDate = (array) => {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  sortDate(itemData);
  const sortArray = (array) => {
    return array.sort((a, b) => a - b)
  }

  const handleWeekChart = () => {
    let data = itemData.map(item => item.curency)
    let weekData = data.slice(0,7)

    sortArray(weekData)

    let total = weekData.reduce((a,b) => Math.trunc(Number(a) + Number(b)),0);
    setTotalRevenue(total)
    setMinRevenue(Math.trunc(weekData[0]))
    setMediumRevenue(Math.trunc(total / weekData.length))
    setMaxRevenue(Math.trunc(weekData[weekData.length - 1]))
    setCurrency(weekData)

    setToggleWeek(true)
    setToggleYear(false)
    setToggleMonth(false)
  }
 
  const handleMonthChart = () => {
    let data = itemData.map(item => item.curency)
    let monthData = data.slice(0,30)

    sortArray(monthData)

    let total = monthData.reduce((a,b) => Math.trunc(Number(a) + Number(b)),0);
    setTotalRevenue(total)
    setMinRevenue(Math.trunc(monthData[0]))
    setMediumRevenue(Math.trunc(total / monthData.length))
    setMaxRevenue(Math.trunc(monthData[monthData.length - 1]))
    setCurrency(monthData)

    setToggleMonth(true)
    setToggleWeek(false)
    setToggleYear(false)
  }

  const handleYearChart = () => {
    let data = itemData.map(item => item.curency)
    let yearData = data.slice(0,365)

    sortArray(yearData)

    let total = yearData.reduce((a,b) => Math.trunc(Number(a) + Number(b)),0);
    setTotalRevenue(total)
    setMinRevenue(Math.trunc(yearData[0]))
    setMediumRevenue(Math.trunc(total / yearData.length))
    setMaxRevenue(Math.trunc(yearData[yearData.length - 1]))
    setCurrency(yearData)

    setToggleYear(true)
    setToggleMonth(false)
    setToggleWeek(false)
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
    </div>
  );
};
export default Item;
