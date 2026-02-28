export async function sha256Hex(input: string) {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(input);
    const digest = await window.crypto.subtle.digest("SHA-256", encoded);
    const hashArray = Array.from(new Uint8Array(digest));
    return `0x${hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")}`;
  }

  const crypto = await import("crypto");
  return `0x${crypto.createHash("sha256").update(input).digest("hex")}`;
}