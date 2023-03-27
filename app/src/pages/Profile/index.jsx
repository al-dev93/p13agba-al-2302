/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import {
  disconnect as disconnectEditProfile,
  input,
  toggleEditBox,
  updateInputEditBox,
} from "../../features/editProfile";
import { disconnect as disconnectLogin } from "../../features/login";
import {
  disconnect as disconnectProfile,
  updateProfileData,
} from "../../features/profile";
import fetchThunk from "../../service/fetchThunk";
import { profileInputModel } from "../../utils/inputFormModels";
import {
  selectEditBox,
  selectEditProfileData,
  selectFetchEditProfileStatus,
  selectFetchProfileStatus,
  selectInputEditProfile,
  selectProfileData,
} from "../../utils/selectors";
import "./index.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstNameHeader, lastNameHeader] = useSelector(selectProfileData);
  const status = useSelector(selectFetchProfileStatus);
  const isRejected = status === "rejected";

  const editBox = useSelector(selectEditBox);
  const editStatus = useSelector(selectFetchEditProfileStatus);
  const isResolved = editStatus === "resolved";
  const [firstName, lastName] = useSelector(selectEditProfileData);

  useEffect(() => {
    dispatch(fetchThunk("profile"));
  }, []);

  useEffect(() => {
    if (status === "rejected") {
      dispatch(disconnectLogin());
      dispatch(disconnectProfile());
      dispatch(disconnectEditProfile());
      navigate("/login");
    }
  }, [isRejected]);

  useEffect(() => {
    if (isResolved) {
      dispatch(updateProfileData({ firstName, lastName }));
      dispatch(toggleEditBox());
    }
  }, [isResolved]);

  function handleEditBox(event) {
    if (event.target.textContent === "Edit Name") {
      dispatch(updateInputEditBox({ firstNameHeader, lastNameHeader }));
      dispatch(toggleEditBox());
    } else if (event.target.textContent === "Cancel") {
      dispatch(toggleEditBox());
    }
  }

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!editBox
            ? `${firstNameHeader || ""} ${lastNameHeader || ""}!`
            : null}
        </h1>
        {editBox && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(fetchThunk("editProfile"));
            }}
            action=""
            className="editbox-form"
          >
            <div className="editbox-element-wrapper">
              {profileInputModel.map((element) => (
                <div key={`${element.name}`} className="editbox-input-form">
                  <InputForm
                    selector={selectInputEditProfile}
                    input={input}
                    name={element.name}
                    type={element.type}
                    inValue={
                      element.name === "firstName"
                        ? firstNameHeader
                        : lastNameHeader
                    }
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
                  onClick={(event) => handleEditBox(event)}
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
            onClick={(event) => handleEditBox(event)}
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
