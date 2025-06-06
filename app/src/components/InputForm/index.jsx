/* eslint-disable jsx-a11y/label-has-associated-control */
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.css";

/**
 * @description input component for login and profil page
 * @param {function} selector redux state
 * @param {function} input redux action
 * @param {string} name
 * @param {string} type
 * @param {string} label
 * @param {bool} required
 * @param {bool} inChecked
 * @param {string} inValue
 * @returns render input element text, password or checkbox
 */
const InputForm = ({
  selector,
  input,
  name,
  type,
  label,
  required,
  inChecked,
  inValue,
}) => {
  const inputField = useSelector(selector(name));
  const dispatch = useDispatch();

  /**
   * @description handle function for input change
   * @param {obbject} event
   */
  function handleChange(event) {
    const { target } = event;
    const { value, checked } = target;
    let error = "";
    // if required check validity
    if (required) {
      if (value) target.classList.remove(style.invalid);
      else {
        target.classList.add(style.invalid);
        error = `${label} is required`;
      }
      // dispatch input action in slice redux
      dispatch(input(name, value, error));
    } else if (type === "checkbox") {
      dispatch(input(name, checked));
    } else dispatch(input(name, value));
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
          {inputField?.error && (
            <span className={style.error}>{inputField.error}</span>
          )}
        </label>
      )}
      <input
        type={type}
        className={
          inputField?.error ? `${style.input} ${style.invalid}` : style.input
        }
        id={name}
        name={name}
        onChange={handleChange}
        required={required}
        defaultChecked={inChecked}
        defaultValue={inValue}
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
  selector: propTypes.func.isRequired,
  input: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  type: propTypes.string,
  label: propTypes.string,
  required: propTypes.bool,
  inChecked: propTypes.bool,
  inValue: propTypes.string,
};

InputForm.defaultProps = {
  type: "text",
  label: undefined,
  required: undefined,
  inChecked: undefined,
  inValue: undefined,
};
