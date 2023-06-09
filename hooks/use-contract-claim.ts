import { useCallback, useState } from "react";
import { Address, Script } from "lucid-cardano";
import { useCardano } from "use-cardano";
import { useContract } from "./use-contract";
import {
  ContractClaimData,
  mkLoadingClickHandler,
  selectHighestValidUTxO,
} from "lib/contract-utils";

export const useContractClaim = (
  script: Script,
  scriptAddress: Address
): ContractClaimData => {
  const { isValid, lucid } = useCardano();
  const {
    error,
    isLoading,
    setError,
    setIsLoading,
    setSuccessMessage,
    successMessage,
  } = useContract();
  const [datum, setDatum] = useState<string | undefined>();
  const [redeemer, setRedeemer] = useState<string | undefined>();
  const claimUTxO = useCallback(async () => {
    if (!lucid || !datum) return;

    try {
      const utxo = await selectHighestValidUTxO(lucid, scriptAddress, datum);
      const validScriptRef =
        utxo.scriptRef &&
        utxo.scriptRef.type === script.type &&
        utxo.scriptRef.script === script.script;

      const txDraft = lucid.newTx().collectFrom([utxo], redeemer);
      // read reference script if possible, else attach script
      validScriptRef
        ? txDraft.readFrom([utxo])
        : txDraft.attachSpendingValidator(script);

      const tx = await txDraft.complete();
      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();

      setSuccessMessage(`Transaction submitted with hash ${txHash}`);
    } catch (e) {
      setError(e as Error);
      console.error(e);
    }
  }, [lucid, script, scriptAddress, datum, redeemer]);

  const handleSubmit = mkLoadingClickHandler(setIsLoading, claimUTxO);

  return {
    canTransact: isValid,
    datum,
    error,
    handleSubmit,
    isLoading,
    redeemer,
    setDatum,
    setError,
    setIsLoading,
    setRedeemer,
    setSuccessMessage,
    successMessage,
  };
};
