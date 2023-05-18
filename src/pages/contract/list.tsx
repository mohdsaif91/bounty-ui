import React, { useState } from "react";
import { useRouter } from "next/router";

const ContractList = (): JSX.Element => {
  const router: any = useRouter();
  const [contractdata, setContractData] = useState(
    router.query.contractData || []
  );

  return <>ContractList</>;
};

export default ContractList;
