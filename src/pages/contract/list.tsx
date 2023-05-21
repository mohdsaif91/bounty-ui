import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Styles from "../../styles/contractList.module.scss";
import globalStyle from "../../styles/globals.module.scss";

interface contractData {
  functionNameArray: [];
  contractName: string;
}

const ContractList = (): JSX.Element => {
  const router: any = useRouter();
  const [contractdata, setContractdata] = useState<contractData[]>([
    {
      functionNameArray: [],
      contractName: "",
    },
  ]);

  useEffect(() => {
    if (router.isReady) {
      console.log(JSON.parse(router.query.contractData));
      setContractdata(JSON.parse(router.query.contractData));
    }
  }, [router.isReady]);

  return (
    <div className={Styles.listContainer}>
      {contractdata.length != 0 ? (
        <>
          <div className={Styles.topHeader}>Your Contracts</div>
          {contractdata.map((m: any, i: number) => (
            <div>
              <div key={i} className={Styles.contractItem}>
                <div className={Styles.verticalHeader}>
                  <div className={Styles.verticalHeaderText}>
                    {m.contractName}
                  </div>
                </div>
                <div key={i} className={Styles.contractDetialsContainer}>
                  {m.functionNameArray.map((fm: any, fmi: number) => (
                    <div className={Styles.functionContainer}>
                      <div className={Styles.functionNameContainer}>{fm}</div>
                      <div className={Styles.inputAmountContainer}>
                        <input
                          className={`${Styles.bountyAmount} ${globalStyle.input_element}`}
                          placeholder="Enter bounty"
                        />
                        <label className={Styles.bountyAmountLabel}>ETH</label>
                      </div>
                    </div>
                  ))}
                  <div className={Styles.finalSum}>
                    <input
                      disabled={true}
                      className={`${Styles.bountyAmount} ${globalStyle.input_element}`}
                      placeholder="Final contract bounty"
                    />
                    <label className={Styles.bountyAmountLabel}>ETH</label>
                  </div>
                </div>
                <textarea
                  placeholder="Add Contract Description if any"
                  className={Styles.textArea}
                ></textarea>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>No functions found </>
      )}
    </div>
  );
};

export default ContractList;
