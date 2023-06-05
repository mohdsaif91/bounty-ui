import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { authenticApi } from "@/API/api";
import { apiList } from "@/API/apiList";
import { TDispatch, TStore } from "@/Redux/store";
import { getDeveloperData } from "@/Redux/slice/developer";

import styles from "../styles/developers.module.scss";

function Developers(props: any) {
  const [developerList, setDeveloperList] = useState<[]>([]);

  const dispatch = useDispatch<any>();
  const developerData = useSelector<TStore>(
    (state) => state.developer.developerList
  );

  useEffect(() => {
    if (developerData) {
      setDeveloperList(developerData as []);
    } else {
      dispatch(getDeveloperData());
    }
  }, [developerData]);

  return (
    <div className={styles.developer_container}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.table_row}>
            <th>Id</th>
            <th>Email Id</th>
            <th>Link</th>
            <th>UserName</th>
            <th>Discord username</th>
            <th>Github UserName</th>
            <th>Created At</th>
          </tr>
          {props.allDeveloper.map((m: any, index: number) => (
            <tr key={index} className={styles.table_data_row}>
              <td>{m.developer_Id}</td>
              <td>{m.email}</td>
              <td>{m.link}</td>
              <td>{m.userName}</td>
              <td>{m.discord_UserName}</td>
              <td>{m.github_UserName}</td>
              <td>{moment(m.createdAt).format("MM/DD/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Developers;

export const getStaticProps = () => {
  const apiPayload = {
    url: apiList.getDeveloper,
    method: "get",
  };
  return authenticApi(apiPayload)
    .then((res) => {
      return {
        props: {
          allDeveloper: res.data,
          error: false,
        },
      };
    })
    .catch((err) => {
      return {
        props: {
          allDeveloper: [],
          error: true,
          errorMessage: err,
        },
      };
    });
};
