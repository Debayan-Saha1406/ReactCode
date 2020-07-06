import React, { Component } from "react";
import Information from "../Popups/Information";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { connect } from "react-redux";

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false,
      popupClassName: "openform",
    };

    componentDidMount() {
      this.props.toggleLoader(true, 0);
      this.handleConnectionChange();
      window.addEventListener("online", this.handleConnectionChange);
      window.addEventListener("offline", this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener("online", this.handleConnectionChange);
      window.removeEventListener("offline", this.handleConnectionChange);
    }

    handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      if (condition === "online") {
        const webPing = setInterval(() => {
          fetch("//google.com", {
            mode: "no-cors",
          })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                this.props.toggleLoader(false, 1);
                return clearInterval(webPing);
              });
            })
            .catch(() => {
              this.setState({
                isDisconnected: true,
                popupClassName: "openform",
              });
              this.props.toggleLoader(false, 0);
            });
        }, 2000);
        return;
      }

      this.props.toggleLoader(false, 0);
      return this.setState({
        isDisconnected: true,
        popupClassName: "openform",
      });
    };

    tryAgain = (e) => {
      e.preventDefault();
      this.props.toggleLoader(true, 0);
      this.setState({ popupClassName: "" }, () => {
        setTimeout(() => {
          this.handleConnectionChange();
          window.addEventListener("online", this.handleConnectionChange);
          window.addEventListener("offline", this.handleConnectionChange);
        }, 2000);
      });
    };

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
          {isDisconnected && (
            <Information
              title="Connection Lost"
              popupClassName={this.state.popupClassName}
              btnText="Try Again"
              closePopup={this.tryAgain}
              content="There seems to be a problem with your internet connection. Please check your setting."
            ></Information>
          )}
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      toggleLoader: (showLoader, screenOpacity) => {
        dispatch(toggleLoader(showLoader, screenOpacity));
      },
    };
  };

  return connect(null, mapDispatchToProps)(NetworkDetector);
}
