# Part 3: Building a simple Web Application

In this part of the tutorial, we will learn how to build a simple web application that will interact with the contract
from the first part of this tutorial series. You need to have Neutron up and running, and the contract to be instantiated.
You can learn how to do all of that by following the first part of this tutorial.

To build the UI, we will be using:

- [Next.js](https://nextjs.org/) as a framework
- [shadcn-ui](https://ui.shadcn.com/) for components
- [CosmosKit](https://docs.cosmology.zone/cosmos-kit) for wallets

The final result of this tutorial can be found at https://github.com/neutron-org/onboarding/tree/main/minimal_ui.

## Setup Next.js app

1. Install [Node.js](https://nodejs.org/) v18 or higher.

2. Create Next.js app:

   ```bash
   npx create-next-app@latest minimal_ui
   # - Would you like to use TypeScript: Yes
   # - Would you like to use ESLint: Yes
   # - Would you like to use Tailwind CSS: Yes
   # - Would you like to use `src/` directory: Yes
   # - Would you like to use App Router: Yes
   # - Would you like to customize the default import alias (@/*)?: No

   cd minimal_ui
   ```

3. Install shadcn-ui and add components:

   ```bash
   npx shadcn@latest init --defaults
   npx shadcn@latest add button card input label
   ```

## Add CosmosKit

1. Install packages:

   ```bash
   npm install --save @cosmos-kit/react @interchain-ui/react @cosmos-kit/core @cosmos-kit/keplr-extension @cosmjs/amino @cosmjs/proto-signing chain-registry @chain-registry/types
   ```

2. Create context `src/contexts/CosmosKit.tsx` with the following content:

   ```tsx
   "use client";

   import { AssetList, Chain } from "@chain-registry/types";
   import { GasPrice } from "@cosmjs/stargate";
   // You can add more wallets here
   import { wallets as keplrExtension } from "@cosmos-kit/keplr-extension";
   import { ChainProvider } from "@cosmos-kit/react";
   import assert from "assert";
   import { assets, chains } from "chain-registry";
   import React from "react";
   import "@interchain-ui/react/styles";

   // This is a Neutron Localnet chain, we need to add it manually because it's not in the chain registry.
   // This new chain can be based on Neutron Testnet, we just need to adjust some parameters.
   const localnetChain: Chain = (() => {
     const chain = chains.find(
       (chain) => chain.chain_name === "neutrontestnet"
     );
     assert(chain);
     return {
       ...chain,
       // Chain ID is a unique identifier for the chain. You can find one in `localnet_config.json`.
       chain_id: "ntrntest",
       // Chain name is another unique identifier for the chain that is used in CosmosKit.
       chain_name: "neutronlocalnet",
       // Pretty name is a human readable name for the chain.
       pretty_name: "Neutron Localnet",
       apis: {
         ...chain.apis,
         // RPC and REST endpoints are used to communicate with the chain.
         // We provide proxy endpoints here, which can be found in the "First launch" section.
         rpc: [{ address: "http://localhost:3001/proxy" }],
         rest: [{ address: "http://localhost:3002/proxy" }],
       },
     };
   })();

   // The same for assets
   const localnetAssets: AssetList = (() => {
     const asset = assets.find(
       (asset) => asset.chain_name === "neutrontestnet"
     );
     assert(asset);
     return {
       ...asset,
       chain_name: "neutronlocalnet",
     };
   })();

   export const CosmosKitProvider = ({
     children,
   }: {
     children: React.ReactNode;
   }) => (
     <ChainProvider
       chains={[...chains, localnetChain]}
       assetLists={[...assets, localnetAssets]}
       // We need to specify gas price to be able to sign transactions.
       // The provided value works just fine for the localnet.
       signerOptions={{
         signingCosmwasm: () => ({
           gasPrice: GasPrice.fromString("0.01untrn"),
         }),
         signingStargate: () => ({
           gasPrice: GasPrice.fromString("0.01untrn"),
         }),
       }}
       wallets={[...keplrExtension]}
     >
       {children}
     </ChainProvider>
   );
   ```

3. Add context by replacing the content of `src/app/layout.tsx` with the following:

   ```tsx
   import { CosmosKitProvider } from "@/contexts/CosmosKit";
   import type { Metadata } from "next";
   import "./globals.css";

   export const metadata: Metadata = {
     title: "Minimal UI",
   };

   export default function RootLayout({
     children,
   }: Readonly<{
     children: React.ReactNode;
   }>) {
     return (
       <html lang="en">
         <body>
           <CosmosKitProvider>{children}</CosmosKitProvider>
         </body>
       </html>
     );
   }
   ```

## Brief overview of CosmosKit

CosmosKit is a library that allows you to easily communicate with different Cosmos chains and wallets.
To use it you setup a context with a list of chains and wallets you want to support.

Then you can use the `useChain` hook to connect to communicate with a specific chain like this:

:::tip
The code below is an example of how to use CosmosKit. Don't copy it to the project!
:::

```ts
const {
    address,
    connect,
    disconnect,
    getCosmWasmClient,
    getSigningCosmWasmClient,
} = useChain("neutronlocalnet", true);

// `address` is the address of the connected wallet.
// It is undefined if no wallet is connected.
console.log("Your address:", address ?? "Not connected");

// `connect` is a function that opens a modal to connect to a wallet.
await connect();

// `disconnect` is a function to disconnect from a wallet.
await disconnect();

// `getCosmWasmClient` is a function that returns a CosmWasmClient for the connected chain.
// This client is used to make queries.
const client = await getCosmWasmClient();
const balance = await client.getBalance(address, "untrn");
console.log("Your balance:", balance);

// `getSigningCosmWasmClient` is a function that returns a SigningCosmWasmClient for the connected chain.
// This client is used to sign transactions.
const client = await getSigningCosmWasmClient();
const {transactionHash} = await client.sendTokens(
    address,
    receiver,
    [
        {
            amount: "1000000",
            denom: "untrn",
        },
    ],
    "auto"
);
console.log("TX hash:", transactionHash);
```

## Create a wallet button component

This component will be used to open CosmosKit wallets modal and perform connection to a wallet.

1. Create a component with wallet button in `src/components/WalletButton.tsx`:

   ```tsx
   import { Button } from "@/components/ui/button";
   import { useChain } from "@cosmos-kit/react";

   const formatAddress = (address: string) => {
     return address.slice(0, 11) + "..." + address.slice(-3);
   };

   export const WalletButton = () => {
     const { address, connect } = useChain("neutronlocalnet", true);

     return (
       <Button
         variant={address ? "outline" : "default"}
         type="button"
         onClick={connect}
       >
         {address ? formatAddress(address) : "Connect Wallet"}
       </Button>
     );
   };
   ```

2. Replace the `src/app/page.tsx` with the following content:

   ```tsx
   "use client";

   import { WalletButton } from "@/components/WalletButton";

   export default function Home() {
     return (
       <main className="flex flex-col gap-8 items-center justify-center h-screen">
         <WalletButton />
       </main>
     );
   }
   ```

## First launch

Now we have a simple UI that can connect to a wallet. Let's try it out.

### Prepare your browser

1. Install [Keplr Wallet Extension](https://www.keplr.app/#extension).

2. When prompted to create a wallet, click `Import an existing wallet` and then
   click `Use recovery phrase or private key`.

3. Enter mnemonic from [Part 1](/tutorials/onboarding/part-1-minimal-application#run-the-localnet):

   ```
   kiwi valid tiger wish shop time exile client metal view spatial ahead
   ```

### Run CORS Proxy

Before we can do anything with the local chain, we need to launch
a [Local CORS Proxy](https://www.npmjs.com/package/local-cors-proxy) for the localnet.
Run the following commands in a separate terminals and keep them in the background:

```bash
npx local-cors-proxy@latest --proxyUrl http://0.0.0.0:26657 --port 3001
```

```bash
npx local-cors-proxy@latest --proxyUrl http://0.0.0.0:1317 --port 3002
```

### Launch the app

```bash
npm run dev
```

And open it in the browser: http://localhost:3000

Now you should see a wallet button and should be able to connect to a wallet.

## Interact with the contract

In this UI we provide an example of interacting with the contract created
in [Part 1](/tutorials/onboarding/part-1-minimal-application).

:::warning Contract address
The address of your contract might be different from what you see in this tutorial. Make sure that you are replacing
the addresses from the commands below with the address of **your** contract!
:::

To interact with the contract we'll be using `CosmWasmClient` and `SigningCosmWasmClient`
from [CosmJS](https://github.com/cosmos/cosmjs/tree/main).

Querying value from the contract:

```ts
const client = await getCosmWasmClient();

const {current_value} = (await client.queryContractSmart(
    "neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj",
    {current_value: {}}
)) as Promise<{ current_value: string }>;

console.log(current_value);
```

Executing a message:

```ts
const client = await getSigningCosmWasmClient();

const {transactionHash} = await client.execute(
    address,
    "neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj",
    {
        increase_count: {
            amount: "1",
        },
    },
    "auto"
);

console.log(transactionHash);
```

Let's create a component that will do this for us.

1. Create a component in `src/components/Counter.tsx`:

   ```tsx
   import { Button } from "@/components/ui/button";
   import {
     Card,
     CardContent,
     CardFooter,
     CardHeader,
     CardTitle,
   } from "@/components/ui/card";
   import { Input } from "@/components/ui/input";
   import { Label } from "@/components/ui/label";
   import { useChain } from "@cosmos-kit/react";
   import assert from "assert";
   import { useCallback, useEffect, useState } from "react";

   // Your contract address here
   const CONTRACT_ADDRESS =
     "neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj";

   const useCounter = () => {
     const { address, getCosmWasmClient, getSigningCosmWasmClient } = useChain(
       "neutronlocalnet",
       true
     );

     const [value, setValue] = useState<string | undefined>();

     const fetchValue = useCallback(async () => {
       const client = await getCosmWasmClient();

       const { current_value } = (await client.queryContractSmart(
         CONTRACT_ADDRESS,
         { current_value: {} }
       )) as { current_value: string };

       setValue(current_value);
     }, [getCosmWasmClient]);

     const increaseValue = useCallback(
       async (amount: string) => {
         assert(address, "Address is required");

         const client = await getSigningCosmWasmClient();

         const { transactionHash } = await client.execute(
           address,
           CONTRACT_ADDRESS,
           {
             increase_count: {
               amount,
             },
           },
           "auto"
         );

         void fetchValue();

         return transactionHash;
       },
       [address, getSigningCosmWasmClient, fetchValue]
     );

     useEffect(() => {
       void fetchValue();
     }, [fetchValue]);

     return { value, increaseValue };
   };

   export const Counter = () => {
     const { address } = useChain("neutronlocalnet", true);

     const { value, increaseValue } = useCounter();

     const [amount, setAmount] = useState("");

     const handleAmountChange = useCallback(
       (event: React.ChangeEvent<HTMLInputElement>) => {
         setAmount(event.currentTarget.value);
       },
       []
     );

     const handleIncreaseClick = useCallback(async () => {
       if (!address || !amount) return;

       const transactionHash = await increaseValue(amount);
       console.log(transactionHash);

       setAmount("");
     }, [address, amount, increaseValue]);

     return (
       <Card className="w-[350px]">
         <CardHeader>
           <CardTitle>Counter contract</CardTitle>
         </CardHeader>

         <CardContent>
           <div className="grid w-full items-center gap-4">
             <div className="flex flex-col space-y-1.5">
               <Label htmlFor="value">Current value</Label>
               <Input id="value" value={value ?? ""} disabled />
             </div>

             <div className="flex flex-col space-y-1.5">
               <Label htmlFor="amount">Amount to increase</Label>
               <Input
                 id="amount"
                 type="number"
                 min="1"
                 value={amount}
                 onChange={handleAmountChange}
               />
             </div>
           </div>
         </CardContent>

         <CardFooter className="flex justify-between">
           <Button
             disabled={!address || !amount}
             type="button"
             onClick={handleIncreaseClick}
           >
             Increase
           </Button>
         </CardFooter>
       </Card>
     );
   };
   ```

2. Add `Counter` component to `src/app/page.tsx`:

   ```tsx
   "use client";

   import { Counter } from "@/components/Counter";
   import { WalletButton } from "@/components/WalletButton";

   export default function Home() {
     return (
       <main className="flex flex-col gap-8 items-center justify-center h-screen">
         <WalletButton />
         <Counter />
       </main>
     );
   }
   ```

Now you should be able to see the counter value in UI and be able to increase it.
