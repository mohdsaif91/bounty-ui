import React, { useState } from "react";
import { useRouter } from "next/router";

import { authenticApi } from "@/API/api";
import { apiList } from "@/API/apiList";
import Loader from "@/Components/Loader";

import style from "../../styles/upload.module.scss";

function upload() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className={style.uploadContainer}>
      <div className={style.file_upload_container}>
        <div className={style.uploadHeading}>Upload your .SOL file</div>
        {loading ? (
          <Loader />
        ) : (
          <input
            multiple={true}
            type="file"
            accept=".sol"
            onChange={(e: any) => {
              setLoading(true);
              const formData = new FormData();
              Object.keys(e.target.files).forEach((key) => {
                formData.append("solFile", e.target.files[key]);
              });
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
                        contractData: JSON.stringify(res.data),
                      },
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default upload;
