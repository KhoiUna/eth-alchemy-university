import { keccak256 } from "ethereum-cryptography/keccak";
import secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";

export function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);
  return hash;
}

export async function signMessage(msg, privateKey) {
  const hash = hashMessage(msg);
  return await secp.sign(hash, privateKey, { recovered: true });
}
