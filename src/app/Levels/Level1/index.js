import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import { Table } from "../../components";
import { NumberInput } from "../../components";

// Offers the user the option to select a duration (6 month) for calculation.
// Calculates the total leads based on the provided data.
// Displays the total leads, and to draw attention to the cost, you can use CSS animations or transitions to make the result flash or change color.
//Example:
// 10 leads per day is 330 leads per month
// 10% close rate is 33 sales a month
// 297 leads for that month were missed oppertunitys

const Level1 = ({
  leadsTotal,
  sales,
  leftoverLeads,
  grandTotalMissedOpportunities,
  leadsPerDay,
  months,
  closeRate,
  setCloseRate,
  salesTotal1,
  setSalesTotal1,
  leadsTotal1,
  setLeadsTotal1,
}) => {
 
  return (
    <div className="levelOne">
      <div>
        <p>Close Rate (<FontAwesomeIcon icon={faPercent} />):</p>
        <NumberInput value={closeRate} onChange={setCloseRate} />
      </div>
      <Table leadsPerDay={leadsPerDay} months={months} closeRate={closeRate} setSalesTotal={setSalesTotal1} setLeadsTotal={setLeadsTotal1} />
    </div>
  );
};

export default Level1;



//Possible leads generated
// Calculate total leads based on user inputs and duration
// function calculateTotalLeads(phoneInquiries, webForms, walkIns, leadsFromRV, closeRate, duration) {
//     const leadsPerDay = (phoneInquiries + webForms + walkIns + leadsFromRV) / duration;
//     const totalLeads = leadsPerDay * duration;
//     return totalLeads;
//   }
  

// Month #
// 330  Leads total 
// 33 Sales
// 297 Leftover Leads

// Give Total Leads Lost number for all of the months present
//on next page
