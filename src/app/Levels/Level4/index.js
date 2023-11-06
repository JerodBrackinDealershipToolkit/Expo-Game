// Level4.js
import numberToString from "../../utils/numberToString.js";
import './styles.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FutureCityWide from '../../assets/FutureCityWide.jpg';
import FutureDealership from '../../assets/futuredealership.webp';

const Level4 = ({
  salesTotal1,
  salesTotal2,
  leadsTotal1,
  leadsTotal2,
  costPerLead,
  setCostPerLead,
  incrementalSales
}) => {
  // Define a function to calculate the total cost
  const calculateTotalCost = (missedOpportunities, costPerLead) => {
    return missedOpportunities * costPerLead;
  };

  //const [costPerLead, setCostPerLead] = useState("");
  const [totalCost, setTotalCost] = useState("");

  // Use the calculated total cost in your component
  return (
    <div className="level4" style={{ backgroundImage: `url(${FutureDealership})`, backgroundPosition: "center center", backgroundSize: "cover", borderRadius: "1em" }}>
      <div className="Form-Container" style={{ color: "var(--secondary)"}}>
        <h3>Incremental Sales</h3>
        <p>Incremental sales:<br /><strong>{numberToString(salesTotal2 - salesTotal1)}</strong>{" "}<FontAwesomeIcon icon={faArrowUp} /></p>
        <p>Leftover Leads:<br /><strong>{numberToString(leadsTotal1)}</strong></p>
      </div>
    </div>
  );
};

export default Level4;

/* PREVIOUS VERSION OF LEVEL 4 IS BELOW */

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
  
// import React, { useEffect, useState } from "react";

// const Level4 = ({ incrementalSales, leftoverLeads }) => {
//   const [showArrow, setShowArrow] = useState(false);

//   // Emphasize incremental sales over time
//   useEffect(() => {
//     const incrementInterval = setInterval(() => {
//       // Increase incremental sales over time
//       setIncrementalSales((prevIncrementalSales) => prevIncrementalSales + 1);
//     }, 1000);

//     return () => clearInterval(incrementInterval);
//   }, []);

//   // Animate arrow appearance
//   useEffect(() => {
//     setTimeout(() => {
//       setShowArrow(true);
//     }, 3000); // Adjust the delay as needed
//   }, []);

//   return (
//     <div className="level">
//       <div className="incremental-sales">
//         <h1>Incremental Sales</h1>
//         <p className="incremental-sales-number">{incrementalSales}</p>
//       </div>

//       <div className="leftover-leads">
//         <h1>Emphasize Leftover Leads</h1>
//         <div className="leftover-leads-text">
//           {leftoverLeads} Leftover Leads
//         </div>
//       </div>

//       {showArrow && <div className="arrow">-></div>}
//     </div>
//   );
// };

// export default Level4;
// //  Display incremental sales that increase over time.
// //  Emphasize the incremental sales.
// //  Emphasize the leftover leads.

// // Line Rolls in from Right to Left 							
// // 118 Incremental Sales 

// // FADES IN FROM THE CENTER
// // On

// // KICKER! LOTS OF ATTENTION!!
// //  1782 Leftover Leads  
// // ^ ROLLS IN FROM LEFT AND MEETS THE ARROW IN MIDDLE
// // <- THEN ARROW ROLLS IN TO PLACES THEN STAYS FLASHING
