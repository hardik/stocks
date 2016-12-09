import React, {Component} from 'react';
import './LoadingScreen.css';

class LoadingScreen extends Component {
    render() {
        return (
            <div className="loading">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>

                <div className="loading-text">Listening on channel <b>stocks</b></div>
            </div>
        )
    }
}

export default LoadingScreen;
