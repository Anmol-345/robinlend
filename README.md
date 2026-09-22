# Ratehood

Ratehood is a decentralized, peer-to-peer underwriting market for tokenized securities, built natively on the **Robinhood Chain Testnet**. 

This repository contains the complete Next.js frontend application. Borrowers can pledge tokenized bonds as collateral to request cash loans, and underwriters can review these requests and provide competitive bids to fund them. 

## Features

- **No Price Oracles**: The market operates entirely on peer-to-peer agreement between borrowers and lenders. 
- **Verifiable Documents**: Underwriters can verify the on-chain hash of the collateral's prospectus directly in the browser to ensure the terms haven't changed.
- **Built-in Faucet**: Easily mint mock testnet assets (`CASH` and `BOND`) directly from the UI to test the platform.
- **EIP-6963 Wallet Discovery**: Automatically detects modern injected wallets (like MetaMask) for seamless connection.

## Local Development

To run the application locally:

```bash
npm install
npm run dev      # Server starts on http://localhost:3000
```

### Environment Variables

Before running the application or deploying it, ensure you have your smart contract addresses configured. Create a `.env` file at the root of the project (or add these to your Vercel project settings):

```env
# Core contracts
NEXT_PUBLIC_MARKET_ADDRESS=your_market_contract_address
NEXT_PUBLIC_MANDATES_ADDRESS=your_mandates_contract_address

# Mock tokens
NEXT_PUBLIC_BOND_ADDRESS=your_bond_token_address
NEXT_PUBLIC_CASH_ADDRESS=your_cash_token_address
```

*(Note: We have pre-filled these in your local environment with live Robinhood Testnet deployments for immediate testing.)*

## Deployment

Ratehood is a standard Next.js application. You can deploy it instantly by importing the repository into **Vercel**. 

1. Push this repository to GitHub.
2. Import the project in your Vercel dashboard.
3. Paste the four `NEXT_PUBLIC_` environment variables into the Vercel Environment Variables configuration.
4. Click **Deploy**.
