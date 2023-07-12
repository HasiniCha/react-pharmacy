import { faCaretDown, faCaretUp, faHand, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { SERVER_PATH } from '../services/Config'

const Control = () => {
    const [command, setCommand] = useState("Please enter a command");
    const testCommand = (cmd) => {
        if(command == "TSTFORWARD")
            setCommand("Moving forward");
        else if(command == "TSTREVERS")
            setCommand("Moving Backwards");
        else if(command == "TSTSTOP")
            setCommand("Cart stopped");
        else if(command == "TSTGRAB")
            setCommand("Grabbing an Object")
        fetch(SERVER_PATH+"fetch?test="+cmd, {
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
    }

  return (
    <div className='control-container'>
        <div className='ctrl-container-left'>
            <div className='img-container'></div>
        </div>
        <div className='ctrl-container-right'>
            <div className='ctrl-command'>
                {command}
            </div>
            <div className='ctrls'>
                <div className='ctrls-left'>
                    <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTFORWARD");
                    }}>
                        <FontAwesomeIcon icon={faCaretUp} size="2x"/>
                    </div>
                    <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTREVERSE");
                    }}>
                        <FontAwesomeIcon icon={faStop} size="2x"/>
                    </div>
                    <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTSTOP");
                    }}>
                        <FontAwesomeIcon icon={faCaretDown} size="2x"/>
                    </div>
                </div>
                <div className='ctrls-right'>
                <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTGRAB");
                    }}>
                        <FontAwesomeIcon icon={faHand} size="2x"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Control