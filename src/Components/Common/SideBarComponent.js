import React, { Component } from 'react';
import "../../css/sideBar.css";

class SideBar extends Component {
    state = {  }
    render() { 
        return ( <div className="page-wrapper chiller-theme toggled">
        <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
        <i className="fa fa-bars"></i>
        </a>
        <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <a href="#">pro sidebar</a>
            <div id="close-sidebar">
            <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
          <div className="sidebar-header">
            <div className="user-pic">
              <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                alt="User picture"/>
            </div>
            <div className="user-info">
              <span className="user-name">Jhon
                <strong>Smith</strong>
              </span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
          {/* <!-- sidebar-header  --> */}
          <div className="sidebar-menu">
            <ul>
              <li className="header-menu">
                <span>General</span>
              </li>
              <li className="sidebar-dropdown">
                <div className="sidebar-submenu">
                  <ul>
                    <li>
                      <a href="#">Dashboard 1
                        <span className="badge badge-pill badge-success">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">Dashboard 2</a>
                    </li>
                    <li>
                      <a href="#">Dashboard 3</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="sidebar-dropdown">
                <a href="#">
                  <i className="fa fa-shopping-cart"></i>
                  <span>E-commerce</span>
                </a>
                <div className="sidebar-submenu">
                  <ul>
                    <li>
                      <a href="#">Products
    
                      </a>
                    </li>
                    <li>
                      <a href="#">Orders</a>
                    </li>
                    <li>
                      <a href="#">Credit cart</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="sidebar-dropdown">
                <a href="#">
                  <i className="fa fa-globe"></i>
                  <span>Maps</span>
                </a>
                <div className="sidebar-submenu">
                  <ul>
                    <li>
                      <a href="#">Google maps</a>
                    </li>
                    <li>
                      <a href="#">Open street map</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          {/* <!-- sidebar-menu  --> */}
        </div>
        {/* <!-- sidebar-content  --> */}
      </nav></div>);
    }
}
 
export default SideBar;