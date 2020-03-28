import React, { Component } from 'react';
import ChildComponent from './ChildComponent';
import ChildComponent2 from './ChildComponent2';
import MyProvider from './MyProvider';


class ParentComponent extends Component {
    state = {
        email: "",
        password: "",
        showchildComponent: false
    }

    handleSubmit = () => {
        this.setState({ showchildComponent: !this.state.showchildComponent })
    };

    handleChange = (event) => {
        const state = { ...this.state }
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    callBackFromParent = (msg) => {
        alert(msg);
    }
    render() {
        return (<div>
            <form>
                <h1> Hii!!! </h1>
       Enter your Email :
       <input type="text" id="fname" name="email"
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)} />
                <br />
       Enter your Password :
       <input type="password" id="fname" name="password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                />
                <br />
                <button type="button" onClick={this.handleSubmit} >Click Me!</button>
            </form>

            {this.state.showchildComponent &&
                <ChildComponent email={this.state.email} password={this.state.password}

                    callBackFromParent={this.callBackFromParent} />}

            <MyProvider>
                <div >
                    <ChildComponent />
                    <ChildComponent2 />
                </div>
            </MyProvider>



        </div>);
    }
}

export default ParentComponent;