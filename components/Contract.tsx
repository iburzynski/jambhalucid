import { importScript } from "lib/contract-utils";
import { Script } from "lucid-cardano";
import { useEffect, useState } from "react";
import { useCardano } from "use-cardano";
import layoutStyles from "../styles/Layout.module.css";
import contractStyles from "../styles/Contract.module.css";
import Border from "../public/tibetan_border.svg";
import Image from 'next/image'

export type ContractActionComponent = (props: ContractActionProps) => JSX.Element;

interface ContractProps {
  scriptName: string;
  title: string;
  description: string;
  actionComponents: Array<ContractActionComponent>;
}

export interface ContractActionProps {
  script: Script;
}

export function Contract({
  scriptName,
  title,
  description,
  actionComponents
}: ContractProps) {
  const { walletProvider } = useCardano();
  const [script, setScript] = useState<Script | undefined>();

  useEffect(() => {
    (async function () {
      try {
        setScript(await importScript(scriptName));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const ContractActions = () => {
    if (script) {
      return (
        <div className={contractStyles['contract-actions']}>
          {actionComponents.map((ActionComponent, index) => (
            <ActionComponent script={script} key={index} />
          ))}
        </div>
      );
    }
    else {
      return (
        <>
          <p className={layoutStyles.description}>Loading '{scriptName}' script...</p>
        </>
      );
    }
  }

  return (
    <div className="text-center max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1 className={layoutStyles.title}>{title}</h1>
      <p className={layoutStyles.description}>{description}</p>
      <Image priority src={Border} alt="Tibetan border" className={layoutStyles.border} />
      {!walletProvider ? (<p className={layoutStyles.description}>Connect to a supported Cardano wallet to interact with the contract.</p>) : (<ContractActions />)}
      <Image priority src={Border} alt="Tibetan border" className={`${layoutStyles.border} ${layoutStyles.flipped}`} />
    </div>
  )
}