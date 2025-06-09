import React, { useState, useEffect } from "react";

const ClockComponent = () =>{
    const [time, setTime] = useState(new Date());

    useEffect(() => {
       const intervalId = setInterval(() =>{
        setTime(new Date());
       },1000);
           
       return () => clearInterval(intervalId);
    }, []);

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");

    return(
        <>
            <div className="clock">
                {hours}:{minutes}
            </div>
        </>
    );
}
export default ClockComponent;