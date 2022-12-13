import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {

    const [ minutes, setMinutes ] = useState(props.minutes);
    const [seconds, setSeconds ] =  useState(props.seconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {clearInterval(myInterval)};
    });




    return (
        <div>{ minutes === 0 && seconds === 0 ? "Refresh the Page and Try Again..." : <span>Code Expires in {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</span>}</div>

    )
}

export default Timer;

// const Timer = dynamic(() => import("../../components/Timer"), { ssr: false }); // This resolve hydration problem
// const timer = useRef();
// const [startTimer, setStartTimer] = useState(false);
// setStartTimer(true)

{/* <span className={styles.failed} ref={timer}>{startTimer && <Timer minutes={2} seconds={0} />}</span> */}
