import { Inter } from "@next/font/google";
import { Contract, ContractActionProps } from "components/Contract";
import { ContractSubmit } from "components/ContractSubmit";
import { LovelaceSetter } from "components/LovelaceSetter";
import { useContractClaim } from "hooks/use-contract-claim";
import { useContractLock } from "hooks/use-contract-lock";
import { Data } from "lucid-cardano";
import { ChangeEvent, useEffect } from "react";

const RedeemSchema = Data.Object({
  guess: Data.Integer(),
});

type Redeem = Data.Static<typeof RedeemSchema>;

const inter = Inter({ subsets: ["latin"] });

export default function CustomTyped() {
  return (
    <>
      <Contract
        scriptName="custom-typed"
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
        Lock a gift at the "custom typed redeemer" script address
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
  const currentGuess = contractData.redeemer? Data.from<Redeem>(
    contractData.redeemer,
    RedeemSchema
  ).guess : 0n
  function setGuess(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value?.toString();
    const parsed = parseInt(value);
    if (!isNaN(parsed)) {
      const redeem = Data.to<Redeem>({ guess: BigInt(parsed) }, RedeemSchema);
      contractData.setRedeemer(redeem)
    }
  }
  useEffect(() => {
    contractData.setDatum(Data.void())
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
        Claim a gift from the "custom typed redeemer" script address
      </div>
      <div className="my-4">
        <label className="flex flex-col w-40">
          <span className="text-sm lowercase mb-1">Guess</span>

          <input
            className="rounded py-1 px-2 text-gray-800 border"
            type="number"
            min="0"
            step="1"
            name="guess"
            value={Number(currentGuess)}
            onChange={setGuess}
          />
        </label>
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