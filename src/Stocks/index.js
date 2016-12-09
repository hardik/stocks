import React, {Component} from 'react';
import StockItem from './StockItem';

class Stocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: this.setInitialValuesOfStocks()
        };
    }

    /**
     * Waits for the next set of props to update existing stocks / add new stocks
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        let currentStocks = this.state.stocks;
        let newStocks = nextProps.stocks;

        newStocks.forEach(stock => {
            let currentStock = currentStocks[stock[0]];

            // If the stock entry exists, update values
            if(currentStock && currentStock.currentPrice) {
                currentStock.previousPrice = currentStock.currentPrice;
                currentStock.currentPrice = stock[1];
            }
            // otherwise create a new entry
            else {
                currentStocks[stock[0]] = {
                    currentPrice: stock[1],
                    previousPrice: null
                }
            }
        });

        this.setState({
            stocks: currentStocks
        })
    }

    /**
     * Renders the first set of stocks
     *
     * @returns {{}}
     */
    setInitialValuesOfStocks = () => {
        let stocks = {};

        if(this.props.stocks && this.props.stocks.length) {
            this.props.stocks.forEach(stock => {
                stocks[stock[0]] = {
                    currentPrice: stock[1],
                    previousPrice: null
                };
            });
        }

        return stocks;
    };

    render() {
        let {stocks} = this.state;

        return (
            <div className="stocks">
                <div className="header-row row">
                    <div className="col-xs-4">Symbol</div>
                    <div className="col-xs-4">Price</div>
                    <div className="col-xs-4">Change</div>
                </div>
                {
                    Object.keys(stocks).map((key, index) => {
                        return (
                            <StockItem stock={stocks[key]} symbol={key} key={index} />
                        )
                    })
                }
            </div>
        )
    }
}

Stocks.propTypes = {
    stocks: React.PropTypes.array.isRequired
};

export default Stocks;
