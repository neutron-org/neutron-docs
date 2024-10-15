# Part 3: Building a simple Web Application

For UI we'll be using:
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

3. Install shadcn-ui:

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
import { GasPrice } from '@cosmjs/stargate';
// You can add more wallets here
import { wallets as keplrExtension } from "@cosmos-kit/keplr-extension";
import { ChainProvider } from "@cosmos-kit/react";
import assert from "assert";
import { assets, chains } from "chain-registry";
import React from "react";
import "@interchain-ui/react/styles";

// This is a Neutron Localnet chain, we need to add it manually because it's not in chain-registry
const localnetChain: Chain = (() => {
  const chain = chains.find((chain) => chain.chain_name === "neutrontestnet");
  assert(chain);
  return {
    ...chain,
    chain_id: "ntrntest",
    chain_name: "neutronlocalnet",
    pretty_name: "Neutron Localnet",
    apis: {
      ...chain.apis,
      rpc: [{ address: "http://localhost:3001/proxy" }],
      rest: [{ address: "http://localhost:3002/proxy" }],
    },
  };
})();

// The same for assets
const localnetAssets: AssetList = (() => {
  const asset = assets.find((asset) => asset.chain_name === "neutrontestnet");
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
    // We need to specify gas price to be able to sign transactions
    // The provided value works just fine for the localnet
    signerOptions={{
      signingCosmWasm: () => ({
        gasPrice: GasPrice.fromString('0.01untrn'),
      }),
      signingStargate: () => ({
        gasPrice: GasPrice.fromString('0.01untrn'),
      }),
    }}
    wallets={[...keplrExtension]}
  >
    {children}
  </ChainProvider>
);
```

3. Add the context to `src/app/layout.tsx`:

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
        <CosmosKitProvider>
          {children}
        </CosmosKitProvider>
      </body>
    </html>
  );
}
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

Now we have a simple UI that can connect to a wallet.

Before we can do anything with the local chain, we need to launch a proxy for the localnet.
Run the following commands in a separate terminals and keep them in the background:

```bash
npx local-cors-proxy@latest --proxyUrl http://0.0.0.0:26657 --port 3001
npx local-cors-proxy@latest --proxyUrl http://0.0.0.0:1317 --port 3002
```

After that you can start the app:

```bash
npm run dev
```

And open it in the browser: http://localhost:3000

Now you should see a wallet button and should be able to connect to a wallet.

## Interact with the contract

To interact with the contract we'll be using `CosmWasmClient` and `SigningCosmWasmClient` from [CosmJS](https://github.com/cosmos/cosmjs/tree/main). It's alredy installed along with CosmosKit.

Querying value from the contract:

```ts
const client = await getCosmWasmClient();

const { current_value } = (await client.queryContractSmart(
  "neutron1nyuryl5u5z04dx4zsqgvsuw7fe8gl2f77yufynauuhklnnmnjncqcls0tj",
  { current_value: {} }
)) as Promise<{ current_value: string }>;

console.log(current_value);
```

Executing a message:

```ts
const client = await getSigningCosmWasmClient();

const { transactionHash } = await client.execute(
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

Let's add a component that will do this for us.

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
  },[fetchValue]);

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
