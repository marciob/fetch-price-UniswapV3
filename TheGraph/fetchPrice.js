const axios = require("axios");

const GRAPH_ENDPOINT =
  "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

// The Graph query to fetch the price of a given token pair
const fetchPrice = async () => {
  const query = `
    {
      pools(where: {token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}, orderBy: volumeUSD, orderDirection: desc, first: 1) {
        id
        token0Price
        token1Price
        volumeUSD
        liquidity
      }
    }`;

  try {
    const response = await axios.post(GRAPH_ENDPOINT, { query });
    const pools = response.data.data.pools;

    if (pools.length > 0) {
      const { token0Price, token1Price } = pools[0];
      console.log(`Token 0 Price (USDC to WETH): ${token0Price}`);
      console.log(`Token 1 Price (WETH to USDC): ${token1Price}`);
    } else {
      console.error("No pool found for the given tokens.");
    }
  } catch (error) {
    console.error("Error fetching data from The Graph:", error);
  }
};

fetchPrice();
