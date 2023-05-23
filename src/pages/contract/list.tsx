import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Styles from "../../styles/contractList.module.scss";
import globalStyle from "../../styles/globals.module.scss";

interface functionNameArrayObj {
  bountyValue: any;
  functionName: string;
}

interface contractData {
  functionNameArray: functionNameArrayObj[];
  contractName: string;
}

const ContractList = (): JSX.Element => {
  const [contractdata, setContractdata] = useState<contractData[]>([]);
  const [totalEth, setTotalEth] = useState<any>([]);
  const [finalTotal, setFinalTotal] = useState<number>(0);

  const router: any = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setContractdata(JSON.parse(router.query.contractData));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (contractdata.length > 0) {
      let finalTotal = 0;
      const totalETHArray = contractdata.map((m: contractData) => {
        const reducedValue = m.functionNameArray.reduce(
          (accumulator, currentVlaue) =>
            accumulator + parseFloat(currentVlaue.bountyValue),
          0
        );
        finalTotal = finalTotal + reducedValue;
        return reducedValue;
      });
      setFinalTotal(finalTotal);
      setTotalEth([...totalETHArray]);
    }
  }, [contractdata]);

  return (
    <div className={Styles.listContainer}>
      {contractdata.length != 0 ? (
        <>
          <div className={Styles.topHeader}>Your Contracts</div>
          {contractdata.map((m: any, i: number) => {
            let totalSumOfETH = 0;
            return (
              <div>
                <div key={i} className={Styles.contractItem}>
                  <div className={Styles.verticalHeader}>
                    <div className={Styles.verticalHeaderText}>
                      {m.contractName}
                    </div>
                  </div>
                  <div key={i} className={Styles.contractDetialsContainer}>
                    {m.functionNameArray.map((fm: any, fmi: number) => {
                      totalSumOfETH =
                        totalSumOfETH + parseFloat(fm.bountyValue);
                      return (
                        <div key={fmi} className={Styles.functionContainer}>
                          <div className={Styles.functionNameContainer}>
                            {fm.functionName}
                          </div>
                          <div className={Styles.inputAmountContainer}>
                            <input
                              type="number"
                              inputMode="numeric"
                              className={`${Styles.bountyAmount} ${globalStyle.input_element}`}
                              placeholder="Enter bounty"
                              value={fm.bountyValue}
                              onChange={(e) => {
                                contractdata[i].functionNameArray[fmi] = {
                                  bountyValue: e.target.value,
                                  functionName: fm.functionName,
                                };
                                setContractdata([...contractdata]);
                              }}
                            />
                            <label className={Styles.bountyAmountLabel}>
                              ETH
                            </label>
                          </div>
                        </div>
                      );
                    })}
                    <div className={Styles.finalSum}>
                      <input
                        value={totalEth.length > 0 ? totalEth[i] : 0}
                        disabled={true}
                        className={`${Styles.bountyAmount} ${globalStyle.input_element}`}
                        placeholder="Final contract bounty"
                      />
                      <label className={Styles.bountyAmountLabel}>ETH</label>
                    </div>
                  </div>
                  <div className={Styles.textAreaContainer}>
                    <textarea
                      placeholder="Add Contract Description if any"
                      className={Styles.textArea}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className={Styles.finalSumContainer}>
            <div className={Styles.finalSumItem}>
              Final amount = {finalTotal} ETH for your bounty
            </div>
            <button
              className={`${globalStyle.btn} ${Styles.btn}`}
              onClick={() => {}}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <>No functions found </>
      )}
    </div>
  );
};

export default ContractList;
