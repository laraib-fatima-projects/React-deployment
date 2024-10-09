
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
} from "recharts";
import Dots from "../../../Components/svgs/Dots";

const COLORS = ["#ff0000", "#0000ff", "#ff00ff", "#ffbb33", "#33cc33", "#3399ff"];

const VehicleProductionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
 
    const inventoryData = localStorage.getItem("inventory");

    if (inventoryData) {
      try {
        const parsedData = JSON.parse(inventoryData);

        if (Array.isArray(parsedData)) {
          const vehicleCounts = {};

          parsedData.forEach((vehicle) => {
            const year = vehicle.model.match(/\d{4}/)?.[0] || "Unknown"; 
            const manufacturer = vehicle.manufacturer.trim();

            if (!vehicleCounts[year]) {
              vehicleCounts[year] = {};
            }

            if (!vehicleCounts[year][manufacturer]) {
              vehicleCounts[year][manufacturer] = Math.floor(Math.random() * 1000); 
            }
          });

    
          const chartData = Object.keys(vehicleCounts).map((year) => ({
            year,
            ...vehicleCounts[year],
          }));

          setData(chartData);
        } else {
          console.error("Data is not an array");
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    } else {
      console.warn("No data found in localStorage for 'inventory'");
    }
  }, []);

  
  const manufacturers = data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'year') : [];

  return (
    <ResponsiveContainer width="100%" height={400} className='bg-white shadow mt-3 production-chart'>
      <h3 className="chart-title">Vehicle Units Production</h3>
      <Dots className="chart-options"/>
      <BarChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year">
          <Label value="Year" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Units" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" />
        
       
        {manufacturers.map((manufacturer, index) => (
          <Bar
            key={manufacturer}
            dataKey={manufacturer}
            fill={COLORS[index % COLORS.length]}
            name={manufacturer}
            barSize={10} 
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VehicleProductionChart;
