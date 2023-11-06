import { useEffect, useState } from 'react';
import './styles.css';

const Table = ({ leadsPerDay, months, closeRate, leftoverCloseRate, recursive, setSalesTotal, setLeadsTotal }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const calculateInitialLeads = (leadsPerDay) => leadsPerDay * 30;
    const calculateSales = (leads, percent) => Math.round(leads * (percent / 100));

    let leftoverLeadsFromPreviousMonth = 0;

    const monthsData = Array.from({ length: months }, (_, monthIndex) => {
      let initialLeadsThisMonth = calculateInitialLeads(leadsPerDay);
      let totalLeadsThisMonth = initialLeadsThisMonth;

      let salesThisMonth = calculateSales(totalLeadsThisMonth, closeRate);

      if (recursive && monthIndex > 0) {
        totalLeadsThisMonth += leftoverLeadsFromPreviousMonth;
      }


      let leftoverLeadsThisMonth = totalLeadsThisMonth - salesThisMonth;

      if (recursive && monthIndex > 0) {
        let additionalSalesFromLeftover = calculateSales(leftoverLeadsFromPreviousMonth, leftoverCloseRate);
        salesThisMonth += additionalSalesFromLeftover;
        leftoverLeadsThisMonth -= additionalSalesFromLeftover;
      }

      const monthData = {
        month: `Month ${monthIndex + 1}`,
        ...(monthIndex > 0 && { carryover: `${leftoverLeadsFromPreviousMonth} Leftover` }),
        leads: `${initialLeadsThisMonth} Leads`,
        sales: `${salesThisMonth} Sales`,
        leftovers: `${leftoverLeadsThisMonth} Leftover Leads`,
      };

      leftoverLeadsFromPreviousMonth = leftoverLeadsThisMonth;

      return monthData;
    });

    let data = [];
    const emptyStringArray = Array(months);
    emptyStringArray.fill("");
    data.push(monthsData.map(data => data.month));
    data.push(monthsData.map(data => data.leads));
    {recursive&&data.push(monthsData.map(data => data.carryover || ''))};
    {recursive&&data.push(emptyStringArray)};
    data.push(monthsData.map(data => data.sales));
    data.push(monthsData.map(data => data.leftovers));

    // Add the leads for each month to get the total number of leads
    const salesTotal = data[data.length - 2]
      .map(a => +a.slice(0, a.indexOf(" ")))
      .reduce((a, b) => a + b, 0);
    console.log(salesTotal);

    // Add the leads for each month to get the total number of leads
    const leadsTotal = data[data.length - 1]
      .map(a => +a.slice(0, a.indexOf(" ")))
      .reduce((a, b) => a + b, 0);

    setTableData(data);
    setSalesTotal(salesTotal);
    setLeadsTotal(leadsTotal);
  }, [leadsPerDay, months, closeRate, leftoverCloseRate, recursive]);

  return (
    <table>
      <thead>
        <tr>
          {tableData[0]?.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.length > 1 &&
          tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row?.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
