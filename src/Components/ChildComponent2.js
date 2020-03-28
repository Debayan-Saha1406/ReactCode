import React, { Component } from 'react';
import { MContext } from './MyProvider';

const ChildComponent2 = () => {
    return ( <div> 
       <h4> I AM ChildComponent2!!! </h4>

       <div>
                <MContext.Consumer>
             {(context) => ( <div>
              <p>{context.state.message}</p>
              <p>{context.state.count}</p>
              </div>

              )}
            </MContext.Consumer>
         </div>

    </div> );
}
 
export default ChildComponent2;