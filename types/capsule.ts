export type CapsuleType = "OfferProof" | "DeliveryProof" | "IdentityProof";

export type Capsule = {
  id: string;
  agentSlug: string;
  ownerAddress: string;
  capsuleType: CapsuleType;
  result: string;
  proofHash: string;
  txHash?: string;
  createdAt: string;
  verifyStatus: "unverified" | "ok" | "failed";
};