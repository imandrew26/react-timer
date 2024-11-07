import { useEffect, useRef, useState } from "react";

function Stopwatch(){

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [active, setActive] = useState(false);
    const id = useRef(null);

    useEffect(()=>{
        if(active){
            id.current = setInterval(() => {
                setTimeElapsed(prev => prev+10);
            }, 10);
        }

        return () => {
            clearInterval(id.current);
        }

    }, [active]);

    function start(){
        setActive(true);
    }
    
    function stop(){
        setActive(false);
    }
    
    function reset(){
        setActive(false);
        setTimeElapsed(0);
    }

    function formatTime(){

        const mins = Math.floor(timeElapsed / 60000);
        const seconds = Math.floor((timeElapsed % 60000) / 1000);
        const milliseconds = Math.floor((timeElapsed % 1000) / 10);
    
        return (
            <p>
                {`${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`}
            </p>
        );
    }

    return(
        <div className = "stopwatch-body">

            <p className="time"> {formatTime()} </p>

            <button onClick={start}> Start </button>
            <button onClick={stop}> Stop </button>
            <button onClick={reset}> Reset </button>
        </div>
    )
}

export default Stopwatch;