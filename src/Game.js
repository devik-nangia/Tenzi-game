import React from "react"

export default function Game(){
    
    let [diceData, setDiceData] = React.useState([
        {
            id: 1,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 2,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 3,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 4,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 5,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 6,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 7,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 8,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 9,
            value: Math.floor(Math.random() * 6) + 1
        },
        {
            id: 10,
            value: Math.floor(Math.random() * 6) + 1
        }
    ]);
    
    let [gameOverCheck, setGameOverCheck] = React.useState(false);

    function generateRandom(){
        // console.log("button clicked")
        setDiceData((oldData) =>
            oldData.map((data) => {
                if(frozen.includes(data.id)){
                    return data
                }
                return {
                    ...data, value: Math.floor(Math.random() * 6) + 1
                }
            })
        )
        SetTurns(old => old + 1)
    }

    let [turns, SetTurns] = React.useState(0)

    let [count, setCount] = React.useState(0)

    let dices = diceData.map((dice) => {
        return <button className = "dice-button" key={dice.id} onClick={(event) => {freeze(dice.id, event)}}>{dice.value}</button>
    })

    let [frozen, setFrozen] = React.useState([])
    
    function freeze(id, event){
        let targetNumberId = frozen[0];
        let element = diceData.find(item => item.id === targetNumberId)
        let targetNumber;
        if(element){
            targetNumber = element.value
        }
        console.log(targetNumber)
        let currentNumberElement = (diceData.find(item => item.id === id))
        let currentNumber = currentNumberElement.value
        console.log(currentNumber)
        if((frozen.length === 0) || (frozen.length > 0 && currentNumber === targetNumber)){
            setFrozen((old) => {
                return [...old, id]
            })
            setCount((oldCount) => oldCount + 1)
            event.target.disabled = "true";
        }

        let temp;

        console.log(count);
        if(count === 9){
            setGameOverCheck((old) => !old);
            clearInterval(intervalRef.current);
            temp = seconds;
            if(bestTime !== 0 && temp < bestTime){
                setBestTime(temp)
            } else if (bestTime === 0){
                setBestTime(temp)
            }
        }
    }

    function resetGame(){
        setCount(0)
        setGameOverCheck(false)
        console.log(gameOverCheck)
        frozen.length = 0;
        setFrozen((oldFrozen) => {
            return []
        })
        setDiceData((oldData) => {
            return oldData.map((data) => {
                return {
                    ...data,
                    value: Math.floor(Math.random() * 6) + 1 
                };
            });
        })
        let buttons = document.querySelectorAll(".dice-button")
        for(let button of buttons){
            console.log(button);
            button.disabled = false;
        }
        
        SetTurns(0);
        setSeconds(0.0)
        intervalRef.current = setInterval(() => {
            setSeconds((old) => old + 0.01);
        }, 10);
    }

    const intervalRef = React.useRef(null); 
    let [seconds, setSeconds] = React.useState(0.0);

    React.useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSeconds(old => old + 0.01);
        }, 10);
    }, []);

    let [bestTime, setBestTime] = React.useState(0);

    return(
        <div>
            <div id="stats">
                <div id="turns"><span>Turns taken:<br></br>{turns}</span></div> 
                <div id="seconds"><span>Time:<br></br>{seconds.toFixed(2)}</span></div> 
                <div id="best-time"><span>Best time:<br></br>{bestTime.toFixed(2)}</span></div> 
            </div>
            <div id="dice-container">
                {dices}
            </div>
            <div id="roll-button-container">
                {gameOverCheck ? 
                <button onClick={resetGame} className = "button-roll-reset">Reset game</button> : <button onClick={generateRandom} className = "button-roll-reset">Roll dice</button>}
            </div>
        </div>
    )
}