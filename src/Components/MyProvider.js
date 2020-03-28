import React, { Component } from 'react';
export const MContext = React.createContext();  //exporting context object

class MyProvider extends Component {
    state = { message: "heena!!!!!" ,
           count:0}
    render() {
        return (
            <MContext.Provider value={
                {
                    state: this.state,
                    setMessage: (message,count) => this.setState({
                        message:message,
                        count:count

                    })
                }}>
                {this.props.children}   //this indicates that the global store is accessible to all the child tags with MyProvider as Parent
            </MContext.Provider>)
    }
}
export default MyProvider;