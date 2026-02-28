import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { appChain, walletConnectProjectId } from "@/lib/chain/config";

export const wagmiConfig = createConfig({
  chains: [appChain],
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId: walletConnectProjectId,
      showQrModal: true,
      metadata: {
        name: "OPCN Web",
        description: "OPCN onchain identity mapping",
        url: "http://localhost:3000",
        icons: [],
      },
    }),
  ],
  transports: {
    [appChain.id]: http(),
  },
});
