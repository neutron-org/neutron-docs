# Messages

## Oracle
For example usage of these queries in contract, check our related [example contract](https://github.com/neutron-org/neutron-sdk/tree/d9abe67f0f62d4ea42d1943af53189ec6674d29e/contracts/marketmap)
```rust
   pub enum OracleQuery {
   GetAllCurrencyPairs {},
   GetPrice { currency_pair: CurrencyPair },
   GetPrices { currency_pair_ids: Vec<String> },
   }
   ```

### GetAllCurrencyPairs
It is possible to query all pairs currently available

Request:
```rust
GetAllCurrencyPairs {}
```
Response:
```rust
pub struct GetAllCurrencyPairsResponse {
    pub currency_pairs: Vec<CurrencyPair>,
}

pub struct CurrencyPair {
    #[serde(rename(serialize = "Base", deserialize = "Base"))]
    pub base: String,
    #[serde(rename(serialize = "Quote", deserialize = "Quote"))]
    pub quote: String,
}
```

### GetPrice
Get the price of a specific pair

Request:
```rust
GetPrice { currency_pair: CurrencyPair }
```
resp:
```rust
pub struct GetPriceResponse {
    /// **price** represents the quote-price for the CurrencyPair given in
    /// GetPriceRequest (possibly nil if no update has been made)
    pub price: QuotePrice,
    /// **nonce** represents the nonce for the CurrencyPair if it exists in state
    pub nonce: u64,
    /// **decimals* represents the number of decimals that the quote-price is
    /// represented in. For Pairs where ETHEREUM is the quote this will be 18,
    /// otherwise it will be 8.
    pub decimals: u64,
    /// *id** represents the identifier for the CurrencyPair.
    #[serde(default)]
    pub id: u64,
}
```
### GetPrices
Get the prices of a multiple specific pairs.

Request:
```rust
GetPrices { currency_pair_ids: Vec<String> }
```
Response:
```rust
pub struct GetPricesResponse {
    /// A list of price responses for the requested currency pairs.
    pub prices: Vec<GetPriceResponse>,
}
```

## Market Map
For more detailed descriptions, refer to the [MarketMap README](https://github.com/skip-mev/slinky/blob/main/x/marketmap/README.md).

For example usage of these queries in contract, check our related [example conract](https://github.com/neutron-org/neutron-sdk/tree/d9abe67f0f62d4ea42d1943af53189ec6674d29e/contracts/marketmap)
```rust
   pub enum MarketMapQuery {
    Params {},
    LastUpdated {},
    MarketMap {},
    Market {
        currency_pair: CurrencyPair,
    },
}
   ```

### Params
Params of the module

Request:
```rust
 Params {}
```
Response:
```rust
pub struct ParamsResponse {
    pub params: Params,
}

pub struct Params {
    pub admin: String,
    pub market_authorities: Vec<String>,
}
```

### LastUpdated
The `LastUpdated` endpoint queries the last block height that the market map was updated. This can be consumed by oracle service providers to recognize when their local configurations must be updated using the heavier MarketMap query.
Request:
```rust
 LastUpdated {}
```
Response:
```rust
pub struct LastUpdatedResponse {
    pub last_updated: u64,
}
```

### Market
The `MarketMap` queries the full state of the market by given pair.

Request:
```rust
 Market {
        currency_pair: CurrencyPair,
    }
```
Response:
```rust
pub struct MarketResponse {
    pub market: Market,
}

pub struct Market {
    /// **ticker** is the full list of tickers and their associated configurations
    /// to be stored on-chain.
    pub ticker: Ticker,
    pub provider_configs: Vec<ProviderConfig>,
}

pub struct ProviderConfig {
    /// **name** corresponds to the name of the provider for which the configuration is
    /// being set.
    pub name: String,
    /// **off_chain_ticker** is the off-chain representation of the ticker i.e. BTC/USD.
    /// The off-chain ticker is unique to a given provider and is used to fetch the
    /// price of the ticker from the provider.
    pub off_chain_ticker: String,
    /// **normalize_by_pair** is the currency pair for this ticker to be normalized by.
    /// For example, if the desired Ticker is BTC/USD, this market could be reached
    /// using: OffChainTicker = BTC/USDT NormalizeByPair = USDT/USD This field is
    /// optional and nullable.
    pub normalize_by_pair: CurrencyPair,
    /// **invert** is a boolean indicating if the BASE and QUOTE of the market should
    /// be inverted. i.e. BASE -> QUOTE, QUOTE -> BASE
    #[serde(default)]
    pub invert: bool,
    /// **metadata_json** is a string of JSON that encodes any extra configuration
    /// for the given provider config.
    #[serde(rename(serialize = "metadata_JSON", deserialize = "metadata_JSON"))]
    pub metadata_json: String,
}

pub struct CurrencyPair {
    #[serde(rename(serialize = "Base", deserialize = "Base"))]
    pub base: String,
    #[serde(rename(serialize = "Quote", deserialize = "Quote"))]
    pub quote: String,
}


pub struct Ticker {
    /// **currency_pair** is the currency pair for this ticker.
    pub currency_pair: CurrencyPair,
    /// **decimals** is the number of decimal places for the ticker. The number of
    /// decimal places is used to convert the price to a human-readable format.
    pub decimals: u64,
    /// **min_provider_count** is the minimum number of providers required to consider
    /// the ticker valid.
    pub min_provider_count: u64,
    /// **enabled** is the flag that denotes if the Ticker is enabled for price
    /// fetching by an oracle.
    #[serde(default)]
    pub enabled: bool,
    /// **metadata_json** is a string of JSON that encodes any extra configuration
    /// for the given ticker. ,
    #[serde(rename(serialize = "metadata_JSON", deserialize = "metadata_JSON"))]
    pub metadata_json: String,
}

```

### MarketMap
The `MarketMap` queries the full state of the market map as well as associated information for every `Market`.

Request:
```rust
 MarketMap {}
```
Response:
```rust
pub struct MarketMap {
    /// A map of Markets with their structures defined above.
    pub markets: Map<String, Market>,
}

```
