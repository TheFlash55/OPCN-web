export type OnchainBinding = {
  id: string;
  address: string;
  chainId: number;
  agentSlug: string;
  claimHash: string;
  signature: string;
  createdAt: string;
  status: "bound" | "verified";
};

export type OnchainCredential = {
  address: string;
  tokenId: string;
  mintedAt: string;
  status: "minted";
};