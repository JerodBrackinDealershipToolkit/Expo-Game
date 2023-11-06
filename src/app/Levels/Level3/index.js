import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { Table } from "../../components";
import { NumberInput } from "../../components";


const Level3 = ({
  leadsTotal,
  sales,
  leftoverLeads,
  grandTotalMissedOpportunities,
  leadsPerDay,
  months,
  closeRate,
  setCloseRate,
  leftoverCloseRate,
  setLeftoverCloseRate,
  salesTotal2,
  setSalesTotal2,
  leadsTotal2,
  setLeadsTotal2,
}) => {
  return (
    <div className="level three">
      <div style={{ display: "flex", gap: "2ch" }}>
        <div>
          <p>Close Rate (%):</p>
          <NumberInput value={closeRate} onChange={setCloseRate} />
        </div>
        <div>
          <p>Close Rate on Leftover Leads (%):</p>
          <NumberInput value={leftoverCloseRate} onChange={setLeftoverCloseRate} />
        </div>
      </div>
      <Table
        leadsPerDay={leadsPerDay}
        months={months}
        closeRate={closeRate}
        leftoverCloseRate={leftoverCloseRate}
        recursive
        setSalesTotal={setSalesTotal2}
        setLeadsTotal={setLeadsTotal2}
      />
    </div>
  );
};

export default Level3;



// Considering animations or transitions for a growing number effect.
// function calculateSalesAndLeftoverLeads(closeRate, monthlyLeads) {
//     const sales = (closeRate / 100) * monthlyLeads;
//     const leftoverLeads = monthlyLeads - sales;
//     return { sales, leftoverLeads };
//   }
  
