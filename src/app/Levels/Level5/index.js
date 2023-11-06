// CostCalculator.js
import React, { useState } from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faXTwitter,
  faTiktok,
  faFacebook,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons'; // For brand icons


import {
  faTelevision,
  faEnvelope,
  faGamepad,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import './styles.css'


const Level5 = () => {
  // const hoursInDay = 24;
  // const averageDaysInMonth = 30.44;
  // const numberOfMonths = 6;
  // const totalHours = hoursInDay * averageDaysInMonth * numberOfMonths;
  // const initialTotalCost = 80190;//Needs props to carry over from other page
  // const [totalCost, setTotalCost] = useState(initialTotalCost);
  // const costPerHour = totalCost / totalHours;

  // const handleTotalCostChange = (event) => {
  //   const newTotalCost = parseFloat(event.target.value);
  //   setTotalCost(newTotalCost);
  // };

  return (
    <div className='level5'>
      <div className='Form-Container'>
      <div className="firework"></div>
<div className="firework"></div>
<div className="firework"></div>
    <div id='icons'>
    <FontAwesomeIcon icon={faXTwitter} size="2xl" />
      <FontAwesomeIcon icon={faTiktok} size="2xl" />
      <FontAwesomeIcon icon={faFacebook} size="2xl" />
      <FontAwesomeIcon icon={faGoogle} size="2xl" />
      </div>
    <div className="cost-calculator">
      <h1>WE HAVE YOU COVERED 24/7</h1>
      {/* <h1>Cost per Hour: ${costPerHour.toFixed(2)}</h1> */}
    </div>
    <div>
    </div>
    <div className="icons2">
    <FontAwesomeIcon icon={faTelevision} size="2xl" />
    <div id='MoMoney'>OTT</div>
      <FontAwesomeIcon icon={faEnvelope} size="2xl" />
      <div id='MoMoney'>Digital Advertising</div>
      <FontAwesomeIcon icon={faGamepad} size="2xl" />
      <div id='MoMoney'> In-Game Ads </div>
      <FontAwesomeIcon icon={faMicrophone} size="2xl" />
      <div id='MoMoney'>Stealth CRM</div>
    </div>
    <h2>Choose us & you'll always be a winner!</h2>
    <div className="firework"></div>
<div className="firework"></div>
<div className="firework"></div>
</div>
    </div>
  );
};

export default Level5;


// Total Hours = (Hours in a Day) x (Days in a Month) x (Number of Months)

// Hours in a day: 24 hours
// Days in a month: This varies depending on the month. On average, a month has about 30.44 days.
// Number of months: 6 months
// Total Hours = 24 hours/day x 30.44 days/month x 6 months

// Total Hours ≈ 4,386.24 hours

// function calculateCostPerHour(totalCost, totalHours) {
//     const costPerHour = totalCost / totalHours;
//     return costPerHour;
//   }
  
//   // Example usage:
//   const totalCost = 80190; // Total cost for your services
//   const totalHours = 10680?; // Total number of hours worked or provided
//   const costPerHour = calculateCostPerHour(totalCost, totalHours);
//   console.log('Cost per Hour:', costPerHour);
  


//Calc how to get the Perhour
// and the $7.52 per hours
//  24/7 100s of leads 
//Confettie fireworks some thing fun

// put our socials at top and contact info
// at bttom google, candy crush, parmount, lots of media sations graphic
// set state incase they fill out area
