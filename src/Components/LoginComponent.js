import React, { Component } from 'react';
import "../css/util.css";
import "../css/main.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "../vendor/animate/animate.css";
import "../vendor/css-hamburgers/hamburgers.min.css";
import "../vendor/animsition/css/animsition.min.css";
import "../vendor/select2/select2.min.css";
import "../vendor/daterangepicker/daterangepicker.css";
import image from '../images/bg-01.jpg';

const style = {
    backgroundImage:  `url(${image})`
}


class Login extends Component {
    state = {  
        email:"",
        password:"",
        className : "input100",
        passwordClassName: "input100"

    }

    handleClick = (e, state) => {
        e.preventDefault();
        console.log("Clicked", state);
    }

    handleChange = (name, value) => {
        this.setClassName(value, name);
        this.setState({[name]: value });
        
    }

    setClassName(value, name) {
        if (value.trim() === "" && name === "password") {
            name = "input100";
            this.setState({ passwordClassName: name });
        }
        else if (value.trim() === "" && name === "email") {
            name = "input100";
            this.setState({ className: name });
        }
        else if (name === "email") {
            name = "input100 has-val";
            this.setState({ className: name });
        }
        else {
            name = "input100 has-val";
            this.setState({ passwordClassName: name });
        }

    }

    render() { 
        return (
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-title p-b-43">
						Login to continue
					</span>
					
					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className={this.state.className} type="text" name="email" onChange={e => this.handleChange(e.target.name, e.target.value)} value={this.state.email}/>
						<span className="focus-input100"></span>
						<span className="label-input100">Email</span>
					</div>
					
					
					<div className="wrap-input100 validate-input" data-validate="Password is required">
						<input className={this.state.passwordClassName} type="password" name="password" onChange={e => this.handleChange(e.target.name, e.target.value)} value={this.state.password}/>
						<span className="focus-input100"></span>
						<span className="label-input100">Password</span>
					</div>

					<div className="flex-sb-m w-full p-t-3 p-b-32">
						<div className="contact100-form-checkbox">
							<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
							<label className="label-checkbox100" htmlFor="ckb1">
								Remember me
							</label>
						</div>

						<div>
							<a href="#" className="txt1">
								Forgot Password?
							</a>
						</div>
					</div>
			

					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick = {(e)=>this.handleClick(e, this.state)}>
							Login
						</button>
					</div>
					
					<div className="text-center p-t-46 p-b-20">
						<span className="txt2">
							or sign up using
						</span>
					</div>

					<div className="login100-form-social flex-c-m">
						<a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
							<i className="fa fa-facebook-f" aria-hidden="true"></i>
						</a>

						<a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
							<i className="fa fa-twitter" aria-hidden="true"></i>
						</a>
					</div>
				</form>

				<div className="login100-more" style ={ style }>
				</div>
			</div>
		</div>
	</div>);
    }
}
 
export default Login;