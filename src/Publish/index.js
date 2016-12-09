import React, {Component} from 'react';
import PubNub from 'pubnub';
import * as CONSTANTS from './../constants';

class Publish extends Component {
    componentDidMount() {
        if(this.props.publish) {
            this.pubnub = new PubNub({
                publishKey: CONSTANTS.PUBNUB_KEYS.PUBLISH,
                subscribeKey: CONSTANTS.PUBNUB_KEYS.SUBSCRIBE
            });
            this.publish();
        }
    }

    publish = () => {
        console.log('publishing stocks on stocks channel...');
        setInterval(() => {
            var min = 10000;
            var max = 99999;
            this.pubnub.publish(
                {
                    message: [
                        ['aapl', Math.floor(Math.random() * (max - min + 1)) + min],
                        ['msft', Math.floor(Math.random() * (max - min + 1)) + min],
                        ['goog', Math.floor(Math.random() * (max - min + 1)) + min],
                        ['jbrs', Math.floor(Math.random() * (max - min + 1)) + min],
                        ['amzn', Math.floor(Math.random() * (max - min + 1)) + min],
                    ],
                    channel: 'stocks'
                },
                function (status, response) {
                    if (status.error) {
                        console.log('An error occured while publishing stocks', status.error)
                    }
                }
            );
        }, 1000);
    };

    render() {
        return (
            <div className="publish"></div>
        );
    }
}

export default Publish;
