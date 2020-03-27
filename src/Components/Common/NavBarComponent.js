import React, { Component } from 'react';
import "../../css/navBar.css";
import { connect } from 'react-redux';
import  * as actionTypes  from "../../Store/Actions/actions"
import {toggleNavBarDropDown} from  "../../Store/Actions/actionCreator";


class Navbar extends Component {
    state = {  }
    render() { 
        return ( <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Traverse</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent"> {/* Need to add collapsing and show to navbar-collapse class */}

          <ul className="navbar-nav mr-auto">
          
          </ul>
          <ul className="navbar-nav ">
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-bell">
                  <span className="badge badge-info">11</span>
                </i>
                Test
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" 
                onClick={this.props.onNavBarToggle}
                href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-envelope-o">
                  <span className="badge badge-primary">11</span>
                </i>
                Dropdown
    
              </a>
              <div className={`dropdown-menu ${this.props.showDropDown}`} aria-labelledby="navbarDropdown"> 
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
          
        </div>
      </nav> );
    }
}

const mapStateToProps = (state) =>{

  return {
    showDropDown : state.navBarReducer.showDropDown
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onNavBarToggle : () => {dispatch(toggleNavBarDropDown())}
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps) (Navbar);