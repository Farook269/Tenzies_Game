import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {
                                    // lazy state intilization
  const [dice, setDice] = useState( () => generateAllnewDice());




  const gameWon= dice.every(die => die.isHeld &&
      dice.every(die => die.value === dice[0].value)
  )

  // if(
  //   dice.every(die => die.isHeld &&
  //     dice.every(die => die.value === dice[0].value)
  //   )

  // ){
  //   console.log("Game Won")
  // }

  function generateAllnewDice() {
    console.log(" Generated ")
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
    // //create a new array(empty)
    // const newDice=[]
    // //Interate 10 times
    // for(let i=0;i<10;i++){
    //   const rand=Math.ceil(Math.random() * 10)
    //   // push that number into array
    //   newDice.push(rand)
    // }

    // return newDice
  }
  // console.log(generateAllnewDice())

  function rollDice() {
    // setDice(generateAllnewDice())
    if(!gameWon){
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );

    }
    else{
      setDice(generateAllnewDice())
      

    }
  
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
    //console.log(id)
  }

  const diceElements = dice.map((dieObj) => (
    // ---- id={dieObj.id}
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  //  const diceElements = dice.map((dieObj, index) => (
  //   <Die key={index} value={dieObj.value}  isHeld={dieObj.isHeld} hold={ho}/>
  // ));

  return (


<main>
  {gameWon && <Confetti />}
  <div
    aria-live="polite"
    className={`sr-only ${gameWon ? "visible" : ""}`}
  >
    {gameWon && (
      <p>🎉 Congratulations! You won! Press "New Game" to start again. 🎮</p>
    )}
  </div>
  <h1 className="title">Tenzies</h1>
  <p className="instructions">
    Roll until all dice are the same. Click each die to freeze it at its
    current value between rolls.
  </p>
  <div className="die-container">{diceElements}</div>
  <button className="roll-dice" onClick={rollDice}>
    {gameWon ? " New Game" : "Roll"}
  </button>
</main>





//     <main>
//   {gameWon && <Confetti />}
//   <div aria-live="polite" className="sr-only">
//     {gameWon && <p>🎉 Congratulations! You won! 
//       Press "New Game" to start again. 🎮</p>}
//   </div>
//   <h1 className="title">Tenzies</h1>
//   <p className="instructions">
//     Roll until all dice are the same. Click each die to freeze it at its
//     current value between rolls.
//   </p>
//   <div className="die-container">{diceElements}</div>
//   <button className="roll-dice" onClick={rollDice}>
//     {gameWon ? " New Game" : "Roll"}
//   </button>
// </main>

);
}

export default App;
