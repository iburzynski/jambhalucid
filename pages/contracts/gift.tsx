import { useContractLock } from "hooks/use-contract-lock";
import { useContractClaim } from "hooks/use-contract-claim";
import { Contract, ContractActionProps } from "components/Contract";
import { LovelaceSetter } from "components/LovelaceSetter";
import { Inter } from "@next/font/google";
import { ContractSubmit } from "components/ContractSubmit";
import { Data } from "lucid-cardano";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Gift() {
  console.log("gift component rendered");
  return (
    <>
      <Contract
        scriptName="gift"
        LockComponent={LockUTxO}
        ClaimComponent={ClaimUTxO}
      />
    </>
  );
}

function LockUTxO({ script, scriptAddress }: ContractActionProps) {
  const contractData = useContractLock(script, scriptAddress);
  const cantTransactMsg = "TODO: replace with correct message";
  useEffect(() => {
    contractData.setDatum(Data.void())
  })
  return (
    <div className="text-center max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1
        style={inter.style}
        className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
      >
        Make Gift
      </h1>

      <div style={inter.style} className="my-4 text-center">
        Lock a gift at the "always succeeds" script address
      </div>

      <div className="text-left my-8">
        <LovelaceSetter contractData={contractData} />
        <ContractSubmit
          buttonText="Send Gift"
          contractData={contractData}
          cantTransactMsg={cantTransactMsg}
        />
      </div>
    </div>
  );
}

function ClaimUTxO({ script, scriptAddress }: ContractActionProps) {
  const contractData = useContractClaim(script, scriptAddress);
  const cantTransactMsg = "TODO: replace with correct message";
  useEffect(() => {
    contractData.setDatum(Data.void())
    contractData.setRedeemer(Data.void())
  })
  return (
    <div className="text-center max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1
        style={inter.style}
        className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
      >
        Claim Gift
      </h1>

      <div style={inter.style} className="my-4 text-center">
        Claim a gift from the "always succeeds" script address
      </div>

      <div className="text-left my-8">
        <ContractSubmit
          buttonText="Claim Gift"
          contractData={contractData}
          cantTransactMsg={cantTransactMsg}
        />
      </div>
    </div>
  );
}
