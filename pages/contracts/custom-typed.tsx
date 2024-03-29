import { Contract, ContractActionProps } from "components/Contract";
import { ValidatorGrab } from "components/ValidatorGrab";
import { ValidatorGive } from "components/ValidatorGive";
import { useValidatorGrab } from "hooks/use-validator-grab";
import { useValidatorGive } from "hooks/use-validator-give";
import { Data } from "lucid-cardano";
import { ChangeEvent, useEffect } from "react";

const RedeemSchema = Data.Object({
  guess: Data.Integer(),
});

type Redeem = Data.Static<typeof RedeemSchema>;

export default function CustomTyped() {
  return (
    <>
      <Contract
        scriptName="custom-typed"
        title='Custom-Typed Redeemer'
        description="TODO: replace with description"
        actionComponents={[Give, Grab]}
      />
    </>
  );
}

function Give({ script }: ContractActionProps) {
  const contractData = useValidatorGive(script);
  const cantTransactMsg = "TODO: replace with correct message";

  useEffect(() => {
    contractData.setDatum(Data.void())
  }, [contractData])

  return (<ValidatorGive contractData={contractData} cantTransactMsg={cantTransactMsg} />);
}

function Grab({ script }: ContractActionProps) {
  const contractData = useValidatorGrab(script);
  const cantTransactMsg = "TODO: replace with correct message";

  useEffect(() => {
    contractData.setDatum(Data.void())
  }, [contractData])

  const currentGuess = contractData.redeemer ? Data.from<Redeem>(
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
  const RedeemerInputs = (): JSX.Element => {
    return (<div className="my-4">
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
    </div>)
  }

  return (
    <ValidatorGrab
      contractData={contractData}
      cantTransactMsg={cantTransactMsg}
      redeemerInputs={<RedeemerInputs />}
    />
  )
}
