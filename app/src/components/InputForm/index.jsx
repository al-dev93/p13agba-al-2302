/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import propTypes from "prop-types";
import style from "./inputForm.module.css";

function isInvalidInput(state, property) {
  if (state[property] === undefined || !state[property].error) return false;
  return true;
}

const InputForm = ({ state, setState, name, type, controlledInput }) => {
  function handleChange(event) {
    const { target } = event;
    if (target.value === "" && controlledInput) {
      setState({
        ...state,
        [name]: {
          ...state[name],
          error: `${controlledInput} is required`,
        },
      });
      target.classList.add(style.invalid);
    } else if (target.value !== "") {
      setState({
        ...state,
        [name]: { ...state[name], value: target.value, error: "" },
      });
      if (controlledInput) target.classList.remove(style.invalid);
    }
  }

  return (
    <div
      className={
        type === "checkbox" ? style["remember-wrapper"] : style.wrapper
      }
    >
      {controlledInput && (
        <label className={style.label} htmlFor={name}>
          {controlledInput}
          {state[name].error && (
            <span className={style.error}>{state[name].error}</span>
          )}
        </label>
      )}
      <input
        type={type}
        className={
          isInvalidInput(state, name)
            ? `${style.input} ${style.invalid}`
            : style.input
        }
        id={name}
        name={name}
        onChange={handleChange}
        required={controlledInput ? "on" : null}
      />
      {type === "checkbox" && (
        <label className={style["remember-label"]}>Remember me</label>
      )}
    </div>
  );
};

export default InputForm;

InputForm.propTypes = {
  state:
    propTypes.objectOf(
      propTypes.shape({
        value: propTypes.string,
        error: propTypes.string,
      })
    ) || null,
  setState: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  type: propTypes.string,
  controlledInput: propTypes.oneOfType([propTypes.string, propTypes.bool]),
};

InputForm.defaultProps = {
  state: null,
  type: "text",
  controlledInput: false,
};
