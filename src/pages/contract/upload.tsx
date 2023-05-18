import React, { useState } from "react";
import { useRouter } from "next/router";

import { authenticApi } from "@/API/api";
import { apiList } from "@/API/apiList";

// ../styles/upload.module.scss
import style from "../../styles/upload.module.scss";
import Loader from "@/Components/Loader";

function upload() {
  const [loading, setLoading] = useState<boolean>(false);
  const [functionArray, setFunctionArray] = useState<any>([]);

  const router = useRouter();

  return (
    <div className={style.uploadContainer}>
      <div className={style.file_upload_container}>
        <div className={style.uploadHeading}>Upload your .SOL file</div>
        {loading ? (
          <Loader />
        ) : (
          <input
            type="file"
            accept=".sol"
            onChange={(e: any) => {
              setLoading(true);
              if (e.target.files[0].name.split(".").pop() === "sol") {
                const formData = new FormData();
                console.log(e.target.files[0]);

                formData.append("solFile", e.target.files[0]);
                const payload = {
                  url: apiList.uploadContract,
                  method: "post",
                  data: formData,
                };
                authenticApi(payload, true)
                  .then((res) => {
                    setLoading(false);
                    if (res.status === 200) {
                      console.log(res.data);

                      router.push({
                        pathname: "/contract/list",
                        query: {
                          contractData: res.data,
                        },
                      });
                    }
                    // setFunctionArray(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
              } else {
                console.log("No FILE ACCEPTED");
              }
            }}
          />
        )}
      </div>
      {Array.isArray(functionArray) && functionArray.length != 0 && (
        <div className={style.functionDisplayContainer}>
          <div></div>
          {functionArray.map((m: any, index: number) => (
            <div className={style.functionDisplayContainerItem}>
              <div className={style.function}>{m}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default upload;
