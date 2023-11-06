// Level2.js
import numberToString from "../../utils/numberToString.js";
import './styles.css'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { NumberInput } from "../../components";
import FutureDealership2 from '../../assets/futuredealership2.webp';

const Level2 = ({
  leadsTotal1,
  costPerLead,
  setCostPerLead,
}) => {
  // Define a function to calculate the total cost
  const calculateTotalCost = (missedOpportunities, costPerLead) => {
    return missedOpportunities * costPerLead;
  };

  //const [costPerLead, setCostPerLead] = useState("");
  const [totalCost, setTotalCost] = useState("");

  useEffect(() => {
    // Calculate the total cost
    setTotalCost(costPerLead * leadsTotal1);
  }, [costPerLead]);

  // Use the calculated total cost in your component
  return (
    <div className='level2' style={{ backgroundImage: `url(${FutureDealership2})`, backgroundPosition: "center center", backgroundSize: "cover", borderRadius: "1em" }}>
      <div className='Form-Container' style={{ color: "var(--secondary)"}}>
      <h3>Calculated Cost</h3>
      <p>Leftover Leads: <strong>{numberToString(leadsTotal1)}</strong></p>
      <p style={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}>
        <label htmlFor="costPerLead">Cost per Lead (<FontAwesomeIcon icon={faDollar} />):</label>
        {" "}
        <NumberInput value={costPerLead} onChange={setCostPerLead} />
      </p>
      <p>
  Wasted Advertising Spend: <span className="shimmer-text">${numberToString(totalCost)}</span>
</p>

      {/* <p>Missed Opportunities: {grandTotalMissedOpportunities}</p> */}
    </div>
    </div>
  );
};

export default Level2;


// Allows the client to enter the cost per month they spend on ad's
// To draw attention to the cost, consider using CSS animations or transitions to make the cost figure bright or flashing.
// Input for customer close rate this example uses 10%
//  1782  grandTotalMissedOpportunities,
// X $45 -What is 45 dollars ? per day breakdown??
// X $80,190 -input for how much they spend a month
// Cost Per Lead = $80,190 / 330 leads ≈ $242.73 per lead 
//Draw attention to $ wasted somehow Bright or flashing css perhaps
// have this take up most of the screen

// Calculate total cost based on user inputs
// function calculateTotalCost(leftoverLeads, costPerLead) {
//     const totalCost = leftoverLeads * costPerLead;
//     return totalCost;
//   }
  
