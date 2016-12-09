import React, {Component} from 'react';
import PubNub from 'pubnub';
import './App.css';
import * as CONSTANTS from './constants';
import LoadingScreen from './LoadingScreen';
import Stocks from './Stocks';
import Publish from './Publish';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: []
        };
    }

    componentDidMount() {
        this.pubnub = new PubNub({
            publishKey: CONSTANTS.PUBNUB_KEYS.PUBLISH,
            subscribeKey: CONSTANTS.PUBNUB_KEYS.SUBSCRIBE
        });
        this.subscribe();
    }

    /**
     * Receives data stream and updates the state with stocks
     *
     */
    subscribe = () => {
        this.pubnub.subscribe({
            channels: ['stocks']
        });

        // Subscribe to the channel
        this.pubnub.addListener({
            message: function (m) {
                if(m.message && m.message.length) {
                    let stocks = this.validateStocks(m.message); // Validated Payload

                    this.setState({
                        stocks: stocks
                    });
                }
            }.bind(this)
        });
    };

    /**
     * Filter stocks to get rid of invalid values
     * @param stocks
     * @returns {Array}
     */
    validateStocks = (stocks) => {
        let filteredStocks = [];

        stocks.forEach(stock => {
            if(stock[0] && stock[0].length && stock[1] && (!isNaN(parseFloat(stock[1])) && isFinite(stock[1])) ) {
                filteredStocks.push(stock);
            }
        });

        return filteredStocks;
    };

    render() {
        let {stocks} = this.state;

        if(stocks && stocks.length) {
            return (
                <div className="app container-fluid">
                    <Stocks
                        stocks={stocks}
                    />
                    <Publish publish/>
                </div>
            )
        }
        else {
            return (
                <div className="app container-fluid">
                    <LoadingScreen/>
                    <Publish publish/>
                </div>
            )
        }
    }
}

export default App;
