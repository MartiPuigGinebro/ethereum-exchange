require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: '0.8.0',

    networks: {
        ropsten: {
            url: "https://eth-ropsten.alchemyapi.io/v2/ebeUKBN8Q3-XyYMvDeIsBE1RzTZofJxI",
            accounts: ['2352e12429ed1ef306bb3fc301ddf074d158371fb157e4e9325f51b9d3ab8bf7'],
        }
    }
};