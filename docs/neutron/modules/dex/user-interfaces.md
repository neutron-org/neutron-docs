# User Interfaces

You can use Neutron DEX by directly crafting [DEX messages](/neutron/modules/dex/messages) and sending them through transactions in your own scripts, but you can also use various user interfaces to interact with the Dex. We are working with several partners in the Neutron ecosystem (such as [Astroport](https://app.astroport.fi)) that use Neutron DEX and by using these applications you can benefit from the Dex's features.

We also provide a reference UI: the Duality UI as described here, to show an integration of all of the Dex's functions.

## Reference Duality UI

The Duality UI is a reference UI that integrates all of the Dex's functions. We hope it can help those wishing to integrate the Dex to their own application or for those who are curious to check out the full flexibility capabilities of the Neutron DEX.

The Duality UI has deployments at:
- testnet: https://app.testnet.duality.xyz
- beta: https://beta.duality.xyz

and contains several key pages to show the functions of the Dex: `Swap`, `Pools`, `Orderbook`, `Portfolio`, `Bridge` explained in the sections below.

To experience all the functions of the Dex you can in order:
1. Bridge tokens to the Neutron chain on the `Bridge` page
2. Deposit tokens into a Dex pair using the `Pools` page
3. Trade on that pool using the `Swap` or `Orderbook` page
4. View your tokens and positions on the `Portfolio` page

### Swap Page
This is where you can trade tokens through a simple UI with a few options. The tokens tradeable here must already be on the Neutron chain (see the Bridge page to move tokens to the chain).

The token in the first input will be swapped for the token asked for in the second input, a **Settings** section provides the option to set a custom **Max Slippage** percentage so your trade amount out cannot deviate unexpectedly when your transaction is processed.

### Pools Page
This is where you can deposit tokens (provide liquidity) on the Dex.

Select an existing liquidity pair to see the liquidity details of that pair including some statistics of TVL, Volume, and Dex Fees over time.

By **adding** to an existing pair or **creating** a new pair you will see the liquidity deposit input UI. As discussed in the Dex concepts pages, each token pair on the Dex may contain thousands of pools divided into "ticks" with many available fees for each tick. Here the UI will attempt to help you add your token reserves across appropriate pools in the shape you desire. For additional flexibility you can drag and drop the percentage of each of your pools to create almost any shape of liquidity you desire.

You can withdraw your liquidity by **editing** your existing position and withdrawing the specific pools of liquidity you have deposited in.

### Orderbook Page
This is where you can trade tokens through an advanced interface with additional order type options.

Here for each token pair you can see a live price chart as well as the current liquidity depth and recent trades, and your history of your own recent trades. Using these tools you can place an advanced **Buy** or **Sell** order using the Limit Order card. Here you can select the [order type](/neutron/modules/dex/messages#place-limit-order) you want to use and set its specific options such as how long the order should remain in the market (if relevant).

### Portfolio Page
This is where you can see your assets and deposits on the Neutron chain.

In the **Positions** section you can review the pairs that you have deposits in.  In the **Assets** section you can review the available tokens you can use for trading or depositing on the Dex.

### Bridge Page
This is where you can bring tokens from other chains onto the Neutron chain for trading and depositing on the Dex.

You can see the amount of tokens you currently hold on the Neutron chain and access tools to bring more tokens into the Neutron chain or withdraw them out of the Neutron chain.
