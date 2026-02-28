import { polygonAmoy, sepolia } from "viem/chains";
import type { Chain } from "viem";

const preferred = (process.env.NEXT_PUBLIC_CHAIN || "sepolia").toLowerCase();

export const appChain: Chain = preferred === "amoy" ? polygonAmoy : sepolia;
export const appChains = [appChain] as const;

export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";
