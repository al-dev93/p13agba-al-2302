import { useEffect, useState } from "react";
import postData from "../../utils/postData";
import "./style.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [connectStatus, setConnectStatus] = useState(null);
  const token = JSON.parse(localStorage.getItem("login"));
  useEffect(() => {
    (async function fetchData() {
      const data = await postData(
        "http://localhost:3001/api/v1/user/profile",
        token.token
      );
      setUserData(data.body);
      setConnectStatus(data.status);
    })();
  }, []);

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userData && userData.firstName}
          {userData && console.log(connectStatus, userData)}
        </h1>
        <button type="submit" className="edit-button">
          Edit Name
        </button>
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
