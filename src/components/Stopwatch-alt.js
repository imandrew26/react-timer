import { useEffect, useRef, useState } from "react";

function StopwatchAlt(){

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [active, setActive] = useState(false);
    const startTime = useRef(0);
    const id = useRef(null);

    useEffect(()=>{
        if(active){
            id.current = setInterval(() => {
                setTimeElapsed(Date.now() - startTime.current);
            }, 10);
        }

        return () => {
            clearInterval(id.current);
        }

    }, [active]);

    function start(){
        setActive(true);
        startTime.current = Date.now()-timeElapsed;
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
        <div className="stopwatch-container">
            <h2 className="stopwatch-title">Stopwatch.</h2>
            <div className="stopwatch-body">
                <div className="time">{formatTime()}</div>
                <div className="button-row">
                    <button 
                        onClick={start} 
                        disabled={active}
                        className="start-btn"
                    >
                        Start
                    </button>
                    <button 
                        onClick={stop}
                        disabled={!active}
                        className="stop-btn"
                    >
                        Stop
                    </button>
                    <button 
                        onClick={reset}
                        className="reset-btn"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StopwatchAlt;