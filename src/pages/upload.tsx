import React, { useState } from "react";

import { authenticApi } from "@/API/api";
import { apiList } from "@/API/apiList";

import style from "../styles/upload.module.scss";
import Loader from "@/Components/Loader";

function upload() {
  const [loading, setLoading] = useState<boolean>(false);
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
                    console.log(res);

                    // setLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);

                    // setLoading(false);
                  });
                //   console.log(e.target.files[0].name);
              } else {
                console.log("No FILE ACCEPTED");
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default upload;
