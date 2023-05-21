import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Styles from "../../styles/contractList.module.scss";
import globalStyle from "../../styles/globals.module.scss";
import { numberRegx } from "@/util/util";

interface functionNameArrayObj {
  bountyValue: number;
  functionName: string;
}

interface contractData {
  functionNameArray: functionNameArrayObj[];
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
      // console.log(JSON.parse(router.query.contractData));
      setContractdata(JSON.parse(router.query.contractData));
    }
  }, [router.isReady]);

  console.log(contractdata);

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
                    <div key={fmi} className={Styles.functionContainer}>
                      <div className={Styles.functionNameContainer}>
                        {fm.functionName}
                      </div>
                      <div className={Styles.inputAmountContainer}>
                        <input
                          className={`${Styles.bountyAmount} ${globalStyle.input_element}`}
                          placeholder="Enter bounty"
                          value={fm.bountyValue}
                          onChange={(e) => {
                            if (
                              numberRegx.test(e.target.value) ||
                              e.target.value.length === 0
                            ) {
                              contractdata[i].functionNameArray[fmi] = {
                                bountyValue:
                                  e.target.value === ""
                                    ? 0
                                    : parseInt(e.target.value),
                                functionName: fm.functionName,
                              };
                              setContractdata([...contractdata]);
                            }
                          }}
                        />
                        <label className={Styles.bountyAmountLabel}>ETH</label>
                      </div>
                    </div>
                  ))}
                  <div className={Styles.finalSum}>
                    <input
                      value={m.functionNameArray.reduce(
                        (previousValue: any, currentValue: any) =>
                          previousValue + currentValue,
                        0
                      )}
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
