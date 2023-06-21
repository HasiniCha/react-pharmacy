import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const LED = () => {
    const [state, setState] = useState('off');

    const changeState = async () => {
        if(state=="off") {
            setState("on");
            fetch("http://192.168.43.227/on", {
                method: 'get',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                })
                .then(function (data) {
                console.log('Request succeeded with JSON response', data);
                })
                .catch(function (error) {
                console.log('Request failed', error);
                });
            document.querySelector(".outer-circle").style.border = "10px solid red";
            document.querySelector(".content").style.color = "red";
        } else {
            setState("off");
            fetch("http://192.168.43.227/off", {
                method: 'get',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                })
                .then(function (data) {
                console.log('Request succeeded with JSON response', data);
                })
                .catch(function (error) {
                console.log('Request failed', error);
                });
            document.querySelector(".outer-circle").style.border = "10px solid blue";
            document.querySelector(".content").style.color = "blue";
        }
    }

    return (
    <div className='outer-disc' onClick={()=>changeState()}>
        <div className='outer-circle'>
            <div className='inner-disc'>
                <div className='content'>{<FontAwesomeIcon icon={faPowerOff} size="2x"/>}</div>
            </div>
        </div>
    </div>
  )
}

export default LED