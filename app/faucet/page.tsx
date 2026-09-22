"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useWrite } from "@/lib/useWrite";
import { CASH, BOND, CASH_DECIMALS, BOND_DECIMALS } from "@/lib/chain";
import TxDialog from "@/components/TxDialog";
import { parseUnits } from "viem";

const mintAbi = [
  {
    type: "function",
    name: "mint",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: []
  }
] as const;

export default function Faucet() {
  const { address, isConnected } = useAccount();
  const { write, data: hash, error, isPending, reset } = useWrite();
  const [action, setAction] = useState<{ label: string; done: string }>({ label: "", done: "" });

  const watchAsset = async (tokenAddress: string, symbol: string, decimals: number) => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: { type: "ERC20", options: { address: tokenAddress, symbol, decimals } },
        });
      } catch (error) {
        console.error("Failed to add token", error);
      }
    }
  };

  return (
    <>
      <section className="band" style={{ paddingTop: 100, paddingBottom: 44, borderBottom: "none" }}>
        <div className="wrap narrow">
          <h1 className="claim" style={{ fontSize: "clamp(34px,5vw,56px)" }}>Faucet.</h1>
          <p className="lede" style={{ maxWidth: "44ch", marginTop: 14 }}>
            Mint mock tokens to test the application.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 40 }}>
        <div className="wrap narrow">
          <div className="card">
            <div className="fieldset" style={{ marginTop: 4 }}>
              <p className="lab">
                <span>Test Assets</span>
              </p>
              <div className="grid two">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p><strong>CASH</strong></p>
                  <p className="sub">Used by Underwriters to fund loans.</p>
                  <button
                    className="btn"
                    disabled={(isPending && action.label === "Mint Cash") || !isConnected}
                    onClick={() => {
                      if (!address) return;
                      setAction({ label: "Mint Cash", done: "You received 1,000,000 CASH." });
                      write({
                        address: CASH,
                        abi: mintAbi,
                        functionName: "mint",
                        args: [address, parseUnits("1000000", CASH_DECIMALS)],
                      });
                    }}
                  >
                    {isPending && action.label === "Mint Cash" ? "Minting..." : "Mint 1,000,000 CASH"}
                  </button>
                  <button className="btn ghost small" onClick={() => watchAsset(CASH, "CASH", CASH_DECIMALS)}>
                    + Add to Wallet
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p><strong>BOND</strong></p>
                  <p className="sub">Used by Borrowers as collateral.</p>
                  <button
                    className="btn"
                    disabled={(isPending && action.label === "Mint Bond") || !isConnected}
                    onClick={() => {
                      if (!address) return;
                      setAction({ label: "Mint Bond", done: "You received 100,000 BOND." });
                      write({
                        address: BOND,
                        abi: mintAbi,
                        functionName: "mint",
                        args: [address, parseUnits("100000", BOND_DECIMALS)],
                      });
                    }}
                  >
                    {isPending && action.label === "Mint Bond" ? "Minting..." : "Mint 100,000 BOND"}
                  </button>
                  <button className="btn ghost small" onClick={() => watchAsset(BOND, "BOND", BOND_DECIMALS)}>
                    + Add to Wallet
                  </button>
                </div>
              </div>
            </div>

            <div className="actions">
              {!isConnected && (
                <p className="sub">Connect a wallet to mint tokens.</p>
              )}
            </div>

            <TxDialog hash={hash} error={error} action={action.label} done={action.done} onClose={reset} />
          </div>
        </div>
      </section>
    </>
  );
}
