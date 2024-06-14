import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./dashboard.css";

// Register the required components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [prices, setPrices] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios
      .get("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((response) => {
        const populationData = response.data.data;

        const years = Array.from({ length: 10 }, (_, i) =>
          (2013 + i).toString()
        );
        const populationMap = new Map(
          populationData.map((d) => [d.Year, d.Population])
        );
        const population = years.map((year) => populationMap.get(year) || null);

        setData({
          labels: years,
          datasets: [
            {
              label: "USA Population",
              data: population,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              pointRadius: 5, // Radius of the points
              pointHoverRadius: 7, // Radius of the points when hovered
            },
          ],
        });
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        const bpi = response.data.bpi;
        const pricesArray = Object.keys(bpi).map((key) => ({
          code: bpi[key].code,
          rate: bpi[key].rate,
          symbol: bpi[key].symbol,
          description: bpi[key].description,
          rate_float: bpi[key].rate_float,
        }));
        setPrices(pricesArray);
      });
  }, []);

  // Chart configuration options
  const options = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Population",
        },
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="header">
        <div className="title">
          <h1 className="heading_user">Hello, User</h1>
          <p className="welcome">Welcome to the Dashboard!</p>
        </div>
        <div className="meta-mask">
          <button className="connect_button">Connect to MetaMask</button>
        </div>
      </div>
      <div className="graph">
        <div className="population-graph">
          <h3>Population in US</h3>
          <Line data={data} options={options} height={"100px"} />
        </div>
      </div>
      <div className="bitcoin">
        <h3>Bitcoin</h3>
        <div className="crypto-prices">
          {prices.map((price) => (
            <div className="card" key={price.code}>
              <span
                className="symbol"
                dangerouslySetInnerHTML={{ __html: price.symbol }}
              ></span>
              <span className="price_code">{price.code}</span>
              <p>{price.description}</p>
              <div className="rate_float">
                <p>
                  Rate <br />
                  {price.rate}
                </p>
                <p>
                  Float <br />
                  {price.rate_float.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
