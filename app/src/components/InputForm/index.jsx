/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { input } from "../../features/inputLogin";
import { selectInputLogin } from "../../utils/selectors";
import style from "./index.module.css";

const InputForm = ({ name, type, label, placeHolder, required }) => {
  const login = JSON.parse(localStorage.getItem("userLogin"));
  const inputLogin = useSelector(selectInputLogin(name));
  const dispatch = useDispatch();

  function handleChange(event) {
    const { target } = event;
    const { value, checked } = target;
    let error = "";
    if (required) {
      if (target.value || login) target.classList.remove(style.invalid);
      else {
        target.classList.add(style.invalid);
        error = `${label} is required`;
      }
      dispatch(input({ name, value, error }));
    } else if (type === "checkbox") {
      dispatch(input({ name, checked, type }));
    } else dispatch(input({ name, value }));
  }

  return (
    <div
      className={
        type === "checkbox" ? style["remember-wrapper"] : style.wrapper
      }
    >
      {label && type !== "checkbox" && (
        <label className={style.label} htmlFor={name}>
          {label}
          {inputLogin?.error && (
            <span className={style.error}>{inputLogin.error}</span>
          )}
        </label>
      )}
      <input
        type={type}
        className={style.input}
        id={name}
        name={name}
        onChange={handleChange}
        required={required}
        placeholder={type !== "checkbox" ? placeHolder : undefined}
        checked={type === "checkbox" ? inputLogin : null}
      />
      {type === "checkbox" && (
        <label className={style["remember-label"]} htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  );
};

export default InputForm;

InputForm.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string,
  label: propTypes.string,
  placeHolder: propTypes.string,
  required: propTypes.string,
};

InputForm.defaultProps = {
  type: "text",
  label: undefined,
  placeHolder: undefined,
  required: undefined,
};
