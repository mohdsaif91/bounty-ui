import { useState } from "react";

import { authenticApi } from "@/API/api";
import { apiList } from "@/API/apiList";
import { emailValidation, getFormData, validateString } from "@/util/util";

import globalStyles from "@/styles/globals.module.scss";
import styles from "@/styles/Home.module.scss";

interface formDataInterface {
  userName: string;
  discordUserName: string;
  email: string;
  password: string;
  confirmPassword: string;
  githubUserName: string;
  link: string;
  avatar: string;
}

const initialFormData = {
  userName: "",
  discordUserName: "",
  email: "",
  password: "",
  confirmPassword: "",
  githubUserName: "",
  link: "",
  avatar: "",
};

export default function Home() {
  const [formData, setFormData] = useState<formDataInterface>({
    ...initialFormData,
  });
  const [formError, setFormError] = useState<formDataInterface>({
    ...initialFormData,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const apiPayload = {
      url: apiList.addDeveloper,
      method: "post",
      data: getFormData(formData),
    };
    authenticApi(apiPayload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  return (
    <div className={styles.mainContainer}>
      <div className="form-tab" data-rttabs="true">
        <div
          className={styles.form_container}
          role="tabpanel"
          id="react-tabs-5"
          aria-labelledby="react-tabs-4"
        >
          <div className={styles.input_container}>
            <label className="input__label" htmlFor="username">
              Code4rena Username *
            </label>
            <p className="input__help">
              <strong>
                Choose wisely! Your username cannot be changed later.
              </strong>
              <br />
              Used to report findings, as well as display your total award
              amount on the leaderboard. Supports alphanumeric characters,
              underscores, and hyphens.
              <br />
              (Note: for consistency, please ensure your server nickname in our
              Discord matches the username you provide here)
            </p>
            <div className="input__input-wrapper">
              <input
                className={globalStyles.input_element}
                name="userName"
                onChange={(e) =>
                  (validateString(e.target.value) ||
                    e.target.value.length === 0) &&
                  handleChange(e)
                }
                aria-describedby="username--error"
                placeholder="Username*"
                type="text"
                autoComplete="off"
                value={formData.userName}
                onBlur={() =>
                  formData.userName === "" &&
                  setFormError({
                    ...formError,
                    userName: "Username is reuqired.",
                  })
                }
              />
              <div className={globalStyles.error}>{formError.userName}</div>
            </div>
          </div>
          <div className={styles.input_container}>
            <label className="input__label" htmlFor="discordUsername">
              Discord Username *
            </label>
            <p className="input__help">
              Used in case we need to contact you about your submissions or
              winnings.
            </p>
            <div className="input__input-wrapper">
              <input
                className={globalStyles.input_element}
                onChange={(e) => handleChange(e)}
                name="discordUserName"
                aria-describedby="discordUsername--error"
                placeholder="Warden#1234"
                type="text"
                autoComplete="off"
                value={formData.discordUserName}
                onBlur={() =>
                  formData.discordUserName === "" &&
                  setFormError({
                    ...formError,
                    discordUserName: "Discord Username is reuqired.",
                  })
                }
              />
              <div className={globalStyles.error}>
                {formError.discordUserName}
              </div>
            </div>
          </div>
          <div className={styles.input_container}>
            <label className="input__label" htmlFor="emailAddress">
              Email Address *
            </label>
            <p className="input__help">
              Used for sending confirmation emails for each of your submissions.
            </p>
            <div className="input__input-wrapper">
              <input
                className={globalStyles.input_element}
                onChange={(e) => handleChange(e)}
                name="email"
                aria-describedby="emailAddress--error"
                placeholder="Email*"
                type="text"
                autoComplete="off"
                value={formData.email}
                onBlur={() =>
                  setFormError({
                    ...formError,
                    email:
                      formData.email === ""
                        ? "Email is reuqired"
                        : !emailValidation(formData.email)
                        ? "Email is not valid"
                        : "",
                  })
                }
              />
              <div className={globalStyles.error}>{formError.email}</div>
            </div>
          </div>
          <div className={styles.input_container}>
            <>
              <label className="input__label" htmlFor="password">
                Password *
              </label>
              <p className="input__help">
                Must be at least 18 characters long.
              </p>
              <div className="input__input-wrapper">
                <input
                  className={globalStyles.input_element}
                  onChange={handleChange}
                  name="password"
                  aria-describedby="password--error"
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                  value={formData.password}
                  onBlur={() =>
                    setFormError({
                      ...formError,
                      password:
                        formData.password === "" ? "Password is reuqired" : "",
                    })
                  }
                />
                <div className={globalStyles.error}>{formError.password}</div>
              </div>
            </>
            <>
              <label className="input__label" htmlFor="confirmPassword">
                Confirm Password *
              </label>
              <div className="input__input-wrapper">
                <input
                  className={globalStyles.input_element}
                  onChange={handleChange}
                  name="confirmPassword"
                  aria-describedby="confirmPassword--error"
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                  value={formData.confirmPassword}
                  onBlur={() =>
                    setFormError({
                      ...formError,
                      confirmPassword:
                        formData.confirmPassword === ""
                          ? "Password is reuqired"
                          : formData.confirmPassword != formData.password
                          ? "Password and Confirm Password are not same"
                          : "",
                    })
                  }
                />
                <div className={globalStyles.error}>
                  {formError.confirmPassword}
                </div>
              </div>
            </>
          </div>
          <div className={styles.input_container}>
            <label className="input__label" htmlFor="gitHubUsername">
              GitHub Username (Optional)
            </label>
            <p className="input__help">
              Used in case we need to give you access to certain repositories.
            </p>
            <div className="input__input-wrapper">
              <input
                className={globalStyles.input_element}
                onChange={handleChange}
                name="githubUserName"
                aria-describedby="gitHubUsername--error"
                placeholder="Username"
                type="text"
                autoComplete="off"
                value={formData.githubUserName}
              />
              <div className={globalStyles.error}>
                {formError.githubUserName}
              </div>
            </div>
          </div>
          <div className={styles.input_container}>
            <label className="input__label" htmlFor="link">
              Link (Optional)
            </label>
            <p className="input__help">
              Link your leaderboard entry to a personal website or social media
              account.
            </p>
            <div className="input__input-wrapper">
              <input
                className={globalStyles.input_element}
                onChange={handleChange}
                name="link"
                aria-describedby="link--error"
                placeholder="https://twitter.com/code4rena"
                type="text"
                autoComplete="off"
                value={formData.link}
              />
            </div>
          </div>
          <div className={styles.input_container}>
            <label htmlFor="avatar">Avatar (Optional)</label>
            <p>An avatar displayed next to your name on the leaderboard.</p>
            <input
              className={globalStyles.input_element}
              type="file"
              id="avatar"
              name="avatar"
              aria-describedby="avatar--error"
              accept=".png,.jpg,.jpeg,.webp"
            />
          </div>
          <div className={styles.formButton}>
            <button className={globalStyles.btn} onClick={() => handleSubmit()}>
              Register with wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
