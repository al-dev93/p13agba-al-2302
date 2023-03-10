/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InputForm from "../../components/InputForm";
import { defineProfileForm } from "../../utils/defineForm";
import callApi from "../../service/api/callApi";
import { PROFILE } from "../../utils/urlApi";
import "./index.css";

const Profile = () => {
  const [profilState, setProfilState] = useState();
  const [editBox, openEditBox] = useState(false);
  const [userData, setUserData] = useOutletContext();

  const { token } = JSON.parse(localStorage.getItem("login"));

  async function apiRequest(event = undefined, putData = undefined) {
    if (event) event.preventDefault();
    const method = putData ? "PUT" : "POST";
    const data = await callApi(PROFILE, putData, method, token);
    if (data.status === 200) {
      setUserData(data.body);
      if (!putData)
        setProfilState({
          "first-name": { value: data.body.firstName },
          "last-name": { value: data.body.lastName },
        });
    }
  }

  useEffect(() => {
    apiRequest();
  }, []);

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userData && !editBox
            ? `${userData.firstName} ${userData.lastName}!`
            : null}
        </h1>
        {editBox && (
          <form
            onSubmit={(event) => {
              apiRequest(event, {
                firstName: profilState["first-name"].value,
                lastName: profilState["last-name"].value,
              });
              openEditBox(false);
            }}
            action=""
            className="editbox-form"
          >
            <div className="editbox-element-wrapper">
              {defineProfileForm.map((input) => (
                <div key={input.name} className="editbox-input-form">
                  <InputForm
                    state={profilState}
                    setState={setProfilState}
                    name={input.name}
                    type={input.type}
                    placeHolder={profilState[input.name].value}
                  />
                </div>
              ))}
            </div>
            <div className="editbox-element-wrapper">
              <div className="editbox-button-wrapper">
                <button className="editbox-button" type="submit">
                  Save
                </button>
                <button
                  className="editbox-button"
                  type="button"
                  onClick={() => openEditBox(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
        {!editBox && (
          <button
            type="button"
            className="edit-button"
            onClick={() => openEditBox(true)}
          >
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button type="submit" className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button type="submit" className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button type="submit" className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
