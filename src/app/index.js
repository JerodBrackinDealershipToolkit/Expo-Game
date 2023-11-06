import './styles.css';

import logo from './assets/logo.png';
import coastlogo from './assets/coastlogo2.png';
import leadsperdayimage from './assets/leadsperday2.png';
import slotlever from './assets/slotlever.png';
import FutureCityWide from './assets/FutureCityWide.jpg';
import audioFile from './assets/funk-it-49967.mp3';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faVolume, faVolumeSlash } from '@fortawesome/pro-solid-svg-icons';

import Level1 from './Levels/Level1';
import Level2 from './Levels/Level2';
import Level3 from './Levels/Level3';
import Level4 from './Levels/Level4';
import Level5 from './Levels/Level5';
import Level6 from './Levels/Level6';

const audio = new Audio(audioFile);

function generateRandomNumbers(sum, count = 4) {
  let numbers = [];
  let remainingSum = sum;

  for (let i = 0; i < count - 1; i++) {
    let average = remainingSum / (count - i);
    let range = Math.min(Math.max(average / 2, 1), remainingSum);
    let randomNum = Math.floor(Math.random() * (2 * range + 1) + average - range);
    randomNum = Math.max(randomNum, 0);
    numbers.push(randomNum);
    remainingSum -= randomNum;
  }

  numbers.push(Math.max(remainingSum, 0));

  return numbers;
}

const NumberInput = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const handleIncrement = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      const newValue = Number(inputRef.current.value) + 1;
      onChange(newValue);
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      const newValue = Math.max(Number(inputRef.current.value) - 1, 0);
      onChange(newValue);
    }
  };

  const onInputChange = (e) => {
    const inputValue = e.target.value;
  
    // Only update if the value is a number and not less than 0
    if (!isNaN(inputValue) && inputValue !== '' && Number(inputValue) >= 0) {
      onChange(Number(inputValue));
    }
  };
  
  return (
    <div className="NumberInput">
      <input ref={inputRef} value={value} onChange={onInputChange} />
      <div className="Control">
        <FontAwesomeIcon icon={faCaretUp} onClick={handleIncrement} />
        <FontAwesomeIcon icon={faCaretDown} onClick={handleDecrement} />
      </div>
    </div>
  );
}

const SlotMachineRoller = ({ number }) => {
  return (
    <div className="Roller">
      <div className="RollerInner">
          <span>{number}</span>
      </div>
    </div>
  );
};


const GameMenu = ({ setLeadsPerDay, setMonths }) => {
  const [showGameMenu, setShowGameMenu] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [actionsShowing, setActionsShowing] = useState(false);
  const [leadsPerDay, setLocalLeadsPerDay] = useState(10);
  const [months, setLocalMonths] = useState(6);

  useEffect(() => {
    setLeadsPerDay(leadsPerDay);
  }, [leadsPerDay]);
  
  useEffect(() => {
    setMonths(months);
  }, [months]);
  
  // Separate states for each random number
  const [randomNumber1, setRandomNumber1] = useState(0);
  const [randomNumber2, setRandomNumber2] = useState(0);
  const [randomNumber3, setRandomNumber3] = useState(0);
  const [randomNumber4, setRandomNumber4] = useState(0);

  const rollToNumber = (current, target, setState) => {
    if (current !== target) {
      const step = current < target ? 1 : -1;
      const interval = setInterval(() => {
        current += step;
        setState(current);
        if (current === target) {
          clearInterval(interval);
        }
      }, 150);
    }
  };

  useEffect(() => {
    setShowGameMenu(false);
    setActionsShowing(false);
    setTimeout(() => {
      setShowGameMenu(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (gameStarted===true) {
      setTimeout(() => {
        setActionsShowing(true);
      }, 1000);
    }
  }, [gameStarted]);

  useEffect(() => {
    const newNumbers = generateRandomNumbers(leadsPerDay);

    rollToNumber(randomNumber1, newNumbers[0], setRandomNumber1);
    rollToNumber(randomNumber2, newNumbers[1], setRandomNumber2);
    rollToNumber(randomNumber3, newNumbers[2], setRandomNumber3);
    rollToNumber(randomNumber4, newNumbers[3], setRandomNumber4);
  }, [leadsPerDay]);


  const ActionCard = ({ className, children }) => {
    return (
      <div className={`action ${className ?? ""}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={showGameMenu ? 'GameMenu active' : 'GameMenu'}>
      {!gameStarted && <button id="start" onClick={() => { setGameStarted(true) }}>Start Game</button>}
      {gameStarted &&
        <div id="actions" className={actionsShowing ? 'active' : ''}>
          <ActionCard>
            <img src={leadsperdayimage} />
            <NumberInput value={Number(leadsPerDay)} onChange={setLocalLeadsPerDay} />
          </ActionCard>
          <ActionCard>
            <h1>Months</h1>
            <NumberInput value={Number(months)} onChange={setLocalMonths} />
          </ActionCard>
          <ActionCard className="roller-container">
            <h2>Phone Leads</h2>
            <SlotMachineRoller number={randomNumber1} />
          </ActionCard>
          <ActionCard className="roller-container">
            <h2>Web Leads</h2>
            <SlotMachineRoller number={randomNumber2} />
          </ActionCard>
          <ActionCard className="roller-container">
            <h2>Walk-ins</h2>
            <SlotMachineRoller number={randomNumber3} />
          </ActionCard>
          <ActionCard className="roller-container">
            <h2>Other Leads</h2>
            <SlotMachineRoller number={randomNumber4} />
          </ActionCard>
        </div>
      }
    </div>
  );
}


const Header = ({ setLeadsPerDay, setMonths }) => {
  return (
    <div className="Header">
      <GameMenu setLeadsPerDay={setLeadsPerDay} setMonths={setMonths} />
      <div id="logo">
        <img src={logo}/>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <div className="Footer">
    </div>
  )
}

const LevelLight = ({level,setLevel,active,disabled}) => {
  function onClick()
  {
    if (!disabled) {
      setLevel(level);
    }
  }

  return (
    <div
      className={`LevelLight ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      <span>{level}</span>
    </div>
  );
}

const LittleLight = ({active}) => {
  return (
    <div className={active?"LittleLight active":"LittleLight"}>

    </div>
  )
}

const Navigation = ({level,setLevel,maxLevel}) => {
  const [littleLightPosition,setLittleLightPosition] = useState(1);

  const levels = Array.from({ length: 6 }, (_, i) => i + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setLittleLightPosition(prevPosition => {
        const newPosition = prevPosition === 5 ? 0 : prevPosition + 1;
        return newPosition;
      });
    }, 500);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Navigation">
      {levels.map((lvl, index) => (
        <React.Fragment key={lvl}>
          <div>
            <LevelLight level={lvl} setLevel={setLevel} active={level === lvl} disabled={lvl > maxLevel}/>
          </div>
          {index < levels.length - 1 && (
            <LittleLight active={littleLightPosition === lvl} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const Game = ({
  level,
  setLevel,
  appReference,
  formSubmtited,
  setFormSubmitted,
  leadsPerDay,
  months,
  closeRate,
  setCloseRate,
  leftoverCloseRate,
  setLeftoverCloseRate,
  salesTotal1,
  setSalesTotal1,
  salesTotal2,
  setSalesTotal2,
  leadsTotal1,
  setLeadsTotal1,
  leadsTotal2,
  setLeadsTotal2,
  costPerLead,
  setCostPerLead,
  incrementalSales={incrementalSales},
  setIncrementalSales={setIncrementalSales}
}) => {
  return (
    <div className="Game">
      {(level===6)&&<Level6 setLevel={setLevel} appReference={appReference} formSubmtited={formSubmtited} setFormSubmitted={setFormSubmitted} leadsPerDay={leadsPerDay} months={months} closeRate={closeRate} setCloseRate={setCloseRate} leftoverCloseRate={leftoverCloseRate} setLeftoverCloseRate={setLeftoverCloseRate} salesTotal1={salesTotal1} setSalesTotal1={setSalesTotal1} salesTotal2={salesTotal2} setSalesTotal2={setSalesTotal2} leadsTotal1={leadsTotal1} setLeadsTotal1={setLeadsTotal1} leadsTotal2={leadsTotal2} setLeadsTotal2={setLeadsTotal2} costPerLead={costPerLead} setCostPerLead={setCostPerLead} incrementalSales={incrementalSales} setIncrementalSales={setIncrementalSales} />}
      {(level===5)&&<Level5 setLevel={setLevel} appReference={appReference} formSubmtited={formSubmtited} setFormSubmitted={setFormSubmitted} leadsPerDay={leadsPerDay} months={months} closeRate={closeRate} setCloseRate={setCloseRate} leftoverCloseRate={leftoverCloseRate} setLeftoverCloseRate={setLeftoverCloseRate} salesTotal1={salesTotal1} setSalesTotal1={setSalesTotal1} salesTotal2={salesTotal2} setSalesTotal2={setSalesTotal2} leadsTotal1={leadsTotal1} setLeadsTotal1={setLeadsTotal1} leadsTotal2={leadsTotal2} setLeadsTotal2={setLeadsTotal2} costPerLead={costPerLead} setCostPerLead={setCostPerLead} incrementalSales={incrementalSales} setIncrementalSales={setIncrementalSales} />}
      {(level===4)&&<Level4 setLevel={setLevel} appReference={appReference} formSubmtited={formSubmtited} setFormSubmitted={setFormSubmitted} leadsPerDay={leadsPerDay} months={months} closeRate={closeRate} setCloseRate={setCloseRate} leftoverCloseRate={leftoverCloseRate} setLeftoverCloseRate={setLeftoverCloseRate} salesTotal1={salesTotal1} setSalesTotal1={setSalesTotal1} salesTotal2={salesTotal2} setSalesTotal2={setSalesTotal2} leadsTotal1={leadsTotal1} setLeadsTotal1={setLeadsTotal1} leadsTotal2={leadsTotal2} setLeadsTotal2={setLeadsTotal2} costPerLead={costPerLead} setCostPerLead={setCostPerLead} incrementalSales={incrementalSales} setIncrementalSales={setIncrementalSales} />}
      {(level===3)&&<Level3 setLevel={setLevel} appReference={appReference} formSubmtited={formSubmtited} setFormSubmitted={setFormSubmitted} leadsPerDay={leadsPerDay} months={months} closeRate={closeRate} setCloseRate={setCloseRate} leftoverCloseRate={leftoverCloseRate} setLeftoverCloseRate={setLeftoverCloseRate} salesTotal1={salesTotal1} setSalesTotal1={setSalesTotal1} salesTotal2={salesTotal2} setSalesTotal2={setSalesTotal2} leadsTotal1={leadsTotal1} setLeadsTotal1={setLeadsTotal1} leadsTotal2={leadsTotal2} setLeadsTotal2={setLeadsTotal2} costPerLead={costPerLead} setCostPerLead={setCostPerLead} incrementalSales={incrementalSales} setIncrementalSales={setIncrementalSales} />}
      {(level===2)&&<Level2 setLevel={setLevel} appReference={appReference} formSubmtited={formSubmtited} setFormSubmitted={setFormSubmitted} leadsPerDay={leadsPerDay} months={months} closeRate={closeRate} setCloseRate={setCloseRate} leftoverCloseRate={leftoverCloseRate} setLeftoverCloseRate={setLeftoverCloseRate} salesTotal1={salesTotal1} setSalesTotal1={setSalesTotal1} salesTotal2={salesTotal2} setSalesTotal2={setSalesTotal2} leadsTotal1={leadsTotal1} setLeadsTotal1={setLeadsTotal1} leadsTotal2={leadsTotal2} setLeadsTotal2={setLeadsTotal2} costPerLead={costPerLead} setCostPerLead={setCostPerLead} incrementalSales={incrementalSales} setIncrementalSales={setIncrementalSales} />}
      {(level===1)&&<Level1 setLevel={setLevel} appReference={appReference} formSubmtited={formSubmtited} setFormSubmitted={setFormSubmitted} leadsPerDay={leadsPerDay} months={months} closeRate={closeRate} setCloseRate={setCloseRate} leftoverCloseRate={leftoverCloseRate} setLeftoverCloseRate={setLeftoverCloseRate} salesTotal1={salesTotal1} setSalesTotal1={setSalesTotal1} salesTotal2={salesTotal2} setSalesTotal2={setSalesTotal2} leadsTotal1={leadsTotal1} setLeadsTotal1={setLeadsTotal1} leadsTotal2={leadsTotal2} setLeadsTotal2={setLeadsTotal2} costPerLead={costPerLead} setCostPerLead={setCostPerLead} incrementalSales={incrementalSales} setIncrementalSales={setIncrementalSales} />}
    </div>
  )
}

const Branding = () => {
  return (
    <div className="Branding">
      <img src={coastlogo}/>
    </div>
  );
}

const SlotLever = () => {
  return (
    <div className="SlotLever">
      <img src={slotlever} />
    </div>
  )
}

function App() {
  const appReference = useRef(null);
  const [level,setLevel] = useState(1);
  const [maxLevel,setMaxLevel] = useState(1);
  const [formSubmtited,setFormSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [leadsPerDay, setLeadsPerDay] = useState(10);
  const [months, setMonths] = useState(0);
  const [closeRate, setCloseRate] = useState(10);
  const [leftoverCloseRate, setLeftoverCloseRate] = useState(3);
  const [salesTotal1, setSalesTotal1] = useState(0);
  const [salesTotal2, setSalesTotal2] = useState(0);
  const [leadsTotal1, setLeadsTotal1] = useState(0);
  const [leadsTotal2, setLeadsTotal2] = useState(0);
  const [incrementalSales, setIncrementalSales] = useState(0);
  const [costPerLead, setCostPerLead] = useState(45);

  function toggleAudio()
  {
      console.log(isPlaying);
    if (isPlaying) {
      audio.pause();
      console.log("PAUSE");
    } else {
      audio.play();
      console.log("PLAY");
    }

    setIsPlaying(!isPlaying);
  }

  function decrementLevel()
  {
    setLevel(Math.max(1, level - 1));
  }

  function incrementLevel()
  {
    const nextLevel = Math.min(6, level + 1);
    if (maxLevel < nextLevel) {
      setMaxLevel(nextLevel);
    }
    setLevel(nextLevel);
  }

  return (
    <div className='background-container'>
    <div className="App" ref={appReference}>
      <Branding/>
      <div className="App-Container">
        <Header setLeadsPerDay={setLeadsPerDay} setMonths={setMonths} />
        
        <Navigation level={level} setLevel={setLevel} maxLevel={maxLevel} />
        <Game
          level={level}
          setLevel={setLevel}
          appReference={appReference}
          formSubmtited={formSubmtited}
          setFormSubmitted={setFormSubmitted}
          leadsPerDay={leadsPerDay}
          months={months}
          closeRate={closeRate}
          setCloseRate={setCloseRate}
          leftoverCloseRate={leftoverCloseRate}
          setLeftoverCloseRate={setLeftoverCloseRate}
          salesTotal1={salesTotal1}
          setSalesTotal1={setSalesTotal1}
          salesTotal2={salesTotal2}
          setSalesTotal2={setSalesTotal2}
          leadsTotal1={leadsTotal1}
          setLeadsTotal1={setLeadsTotal1}
          leadsTotal2={leadsTotal2}
          setLeadsTotal2={setLeadsTotal2}
          costPerLead={costPerLead}
          setCostPerLead={setCostPerLead}
          incrementalSales={incrementalSales}
          setIncrementalSales={setIncrementalSales}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="music-controller" style={{textAlign: "right", paddingLeft: "2ch", paddingBottom: "0.5em"}}>
            <FontAwesomeIcon icon={isPlaying ? faVolume : faVolumeSlash } style={{fontSize: "2em", color: "#ffffff",}} onClick={toggleAudio} />
          </div>
          <div className="level-buttons" style={{paddingRight: "2ch", paddingBottom: "0.5em"}}>
            <FontAwesomeIcon icon={faCaretLeft} style={{fontSize: "2em", color: "#ffffff",}} onClick={decrementLevel} />
            <FontAwesomeIcon icon={faCaretRight} style={{fontSize: "2em", color: "#ffffff",}} onClick={incrementLevel} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
