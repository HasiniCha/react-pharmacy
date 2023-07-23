import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faClose, faHand, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { SERVER_PATH } from '../services/Config'

const Control = () => {
    const [command, setCommand] = useState("Please enter a command");
    const testCommand = (cmd) => {
        if(cmd == "TSTFORWARD")
            setCommand("Moving forward");
        else if(cmd == "TSTREVERSE")
            setCommand("Moving Backwards");
        else if(cmd == "TSTSTOP")
            setCommand("Cart stopped");
        else if(cmd == "TSTGRAB")
            setCommand("Grabbing an Object")
        fetch(SERVER_PATH+"test?cmd="+cmd, {
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
            {/* <div className='img-container'></div> */}
        </div>
        <div className='ctrl-container-right'>
            <div className='ctrl-command'>
                {command}
            </div>
            <div className='ctrls'>
                <div className='ctrls-row'>
                    <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTFORWARD");
                    }}>
                        <FontAwesomeIcon icon={faCaretUp} size="2x"/>
                    </div>
                </div>
                <div className='ctrls-row'>
                    <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTLEFT");
                    }}>
                        <FontAwesomeIcon icon={faCaretLeft} size="2x"/>
                    </div>
                    <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTSTOP");
                    }}>
                        <FontAwesomeIcon icon={faStop} size="2x"/>
                    </div>
                    <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTRIGHT");
                    }}>
                        <FontAwesomeIcon icon={faCaretRight} size="2x"/>
                    </div>
                </div>
                <div className='ctrls-row'>
                    <div className='ctrl-btn' onClick={()=>{
                        testCommand("TSTREVERSE");
                    }}>
                        <FontAwesomeIcon icon={faCaretDown} size="2x"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Control