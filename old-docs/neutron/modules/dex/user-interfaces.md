# User Interfaces

You can use Neutron DEX by directly crafting [DEX messages](/neutron/modules/dex/messages) and sending them through transactions in your own scripts, but you can also use various user interfaces to interact with the DEX.

We are working with several partners in the Neutron [ecosystem](https://app.neutron.org/ecosystem) that use Neutron DEX and by using these applications you can benefit from the DEX's features. We also provide a UI as described here in the Neutron app for placing orders on the DEX.

## Neutron app

### Orderbook

The Neutron app orderbook is available at [app.neutron.org/orderbook](https://app.neutron.org/orderbook)

Here for each token pair you can see a live price chart as well as the current liquidity depth and recent trades, and your history of your own recent trades. Using this information you can place an advanced **Buy** or **Sell** order using the order form.

#### Token pair Navigation

The token pair selector near the top of the page lets you select which pair you would like to trade on from a list of available pairs.

#### Token pair summary

The token pair summary near the top of the page shows a summary of the recent activity of the token pair.

#### Token pair price chart

The chart on the left of the page shows the recent history of the token pair prices relative to each other.

The charting technology is provided by [TradingView](https://www.tradingview.com/), a platform for traders and investors. It offers advanced charting tools so that you can plan your trade with the context of your own saved notes and measurements, and other features such as major upcoming events in the [TradingView economic calendar](https://www.tradingview.com/economic-calendar/).

#### Token pair order book table

The order book table is near the center of the page under a tab "**Order Book**".

The order book table displays the aggregate amount of current liquidity of the DEX at each price point. The bottom of the table shows a summary of the current total amount of liquidity of the pair (valued at the current price).

The table can alternatively show only buy or sell orders using controls to the top-left of the table. The resolution of the prices of each row can be changed using a selector to the top-right of the table.

#### Token pair recent trades table

The recent trades table is near the center of the page under a tab "**Recent Trades**".

The recent trades table displays recent trades on the token pair as they are made and become availble to read on the chain. You can see more information about each trade by visiting the external link for that trade.

#### Token pair order form

The order form is near the right of the page with tabs **Limit**/**Market** and **Buy**/**Sell**.

Here you are able to craft a [place limit order message](/neutron/modules/dex/messages#place-limit-order) to send to the chain. The specific fields of the message such as `AmountIn` and `MaxAmountOut` are determined from the form input amounts, the setting `LimitSellPrice` comes from the specified "limit price" input or is calculated from a **Market** type "slippage" input as a slippage limit. And the optional `ExpirationTime` field may be set by selecting an "Expiry" option other than "none" in a **Limit** order. The `OrderType` field will either be GOOD_TIL_TIME for limit orders with expiry, GOOD_TIL_CANCELLED for limit orders without expiry, or FILL_OR_KILL for market orders.

The form simulates a trade of the current order to determine the result amount and the estimated fees. When the form is edited or the liquidity of the pair has changed then the estimated result will be updated.

#### Your token pair order history

Your order history for the token pair is near the bottom of the page.

Here you can see the details of your active "open" orders in the **Trades** tab and your completed "closed" orders in the **Order Histtory** tab. Active orders are orders that are not yet complete, depending on the current order state you may be able to [withdraw](/neutron/modules/dex/messages#withdraw-filled-limit-order) the swapped order amount or [cancel](/neutron/modules/dex/messages#cancel-limit-order) the unswapped order amount. Closed orders in the **Order History** are no longer actionable.

### Bridge

The Neutron app bridge is available at [app.neutron.org/bridge](https://app.neutron.org/bridge)

This is where you can bring tokens from other chains onto the Neutron chain for trading on the DEX.

You can see the amount of tokens you currently hold on the Neutron chain and bring more tokens into the Neutron chain or withdraw them out of the Neutron chain.
