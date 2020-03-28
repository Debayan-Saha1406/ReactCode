import React, { Component } from 'react';
import { MContext } from './MyProvider';

const ChildComponent = (props) => {

   const  passingDataFromChild = () => {
        props.callBackFromParent(` Hey there,i have recieved the email & password! 
        ${props.email} 
        ${props.password}`)
    }

    return (
        <div>
            <h3> this props is of ANY type </h3>
            <h4> Passing data from parent to child component </h4>
          email from parent : {props.email}  <br />
          password from parent : {props.password}
          <br/>
          <button onClick={passingDataFromChild}> Send data to parent</button>

          <div>
            <MContext.Consumer>
        {(context) => (
       <button onClick={()=>{context.setMessage("New Arrival", 5)}}>Send</button>
       )}
        </MContext.Consumer>
        </div>
        </div>
    );
}

export default ChildComponent;