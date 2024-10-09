
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import Dots from "../../../Components/svgs/Dots";

const COLORS = ["#ff0000", "#0000ff", "#ff00ff", "#ffbb33", "#33cc33", "#3399ff"];

const VehicleStatusChart = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const inventoryData = localStorage.getItem("inventory");

    if (inventoryData) {
      try {
        const parsedData = JSON.parse(inventoryData);

        if (Array.isArray(parsedData)) {
          const vehicleCounts = parsedData.reduce((acc, vehicle) => {
            const manufacturer = vehicle.manufacturer;
            if (!acc[manufacturer]) {
              acc[manufacturer] = 1;
            } else {
              acc[manufacturer]++;
            }
            return acc;
          }, {});

          const chartData = Object.keys(vehicleCounts).map((manufacturer) => ({
            name: manufacturer,
            value: vehicleCounts[manufacturer],
          }));

          const totalVehicles = chartData.reduce((sum, item) => sum + item.value, 0);

          setData(chartData);
          setTotal(totalVehicles);
        } else {
          console.error("Data is not an array");
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    } else {
      console.warn("No data found in local storage for 'inventory'");
    }
  }, []);

  const renderCustomLabel = ({ cx, cy }) => {
    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="clamp(16px, 2vw, 30px)"  
      >
        {total}
      </text>
    );
  };

  return (
    <div className="production-chart">
   
     <h3 className="chart-title">Production in 2023</h3>
     <Dots className="chart-options"/>
   
      <ResponsiveContainer width="100%" height={400} className="bg-white shadow mt-3">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="65%"  
            cy="50%"
            outerRadius="70%"
            innerRadius="50%"
            fill="#8884d8"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          
          <Legend 
            layout="vertical"         
            align="left"              
            verticalAlign="middle"   
            wrapperStyle={{ fontSize: 'clamp(10px, 1.5vw, 18px)', paddingLeft: '20px' }}  
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleStatusChart;
