import React, {Component} from 'react';

class StockItem extends Component {
    /**
     * Returns a string denoting the stock status
     *
     * @param stock
     * @returns {*}
     */
    getStockStatus = (stock) => {
        if(stock.previousPrice && stock.previousPrice !== stock.currentPrice) {
            if(stock.currentPrice > stock.previousPrice) {
                return 'up'
            }
            else {
                return 'down'
            }
        }
        else {
            return 'no-change';
        }
    };

    /**
     * Calculates % change
     *
     * @param currentPrice
     * @param previousPrice
     * @returns {string}
     */
    getChange = (currentPrice, previousPrice) => {
        let difference = currentPrice - previousPrice;
        let change = (difference / previousPrice) * 100;
        return change.toFixed(2) + '%';
    };

    render() {
        let {stock, symbol} = this.props;
        let currentPrice = stock.currentPrice;
        let previousPrice = stock.previousPrice || null;
        let change = previousPrice ? this.getChange(currentPrice, previousPrice) : '0.00%';
        let stockStatus = this.getStockStatus(stock);

        return (
            <div className={'row stock-row ' + stockStatus}>
                <div className="col-xs-4 symbol">
                    {symbol}
                </div>
                <div className="col-xs-4 price">
                    {currentPrice}
                </div>
                <div className="col-xs-4 change">
                    {change}
                </div>
            </div>
        )
    }
}

StockItem.propTypes = {
    stock: React.PropTypes.object.isRequired,
    symbol: React.PropTypes.string.isRequired
};

export default StockItem;
