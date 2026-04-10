"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ChevronDown, Wallet } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { track } from "@/lib/track";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletMenu() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const available = useMemo(
    () =>
      connectors.filter(
        (c) => c.type === "injected" || c.type === "walletConnect",
      ),
    [connectors],
  );

  if (!isConnected || !address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 border-slate-600 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 hover:text-blue-200 hover:border-blue-500/50 hover:from-blue-600/30 hover:to-purple-600/30"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">连接钱包</span>
            <span className="sm:hidden">钱包</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 bg-gray-900 border-slate-700"
        >
          {available.map((connector) => (
            <DropdownMenuItem
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                track("wallet_connected", { connector: connector.name });
              }}
              className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              {connector.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            asChild
            className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <Link href="/onchain">链上控制台</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-slate-600 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 hover:text-blue-200 hover:border-blue-500/50"
        >
          {shortAddress(address)}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 bg-gray-900 border-slate-700"
      >
        <DropdownMenuItem
          asChild
          className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
        >
          <Link href="/onchain">链上控制台</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
        >
          断开连接
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
