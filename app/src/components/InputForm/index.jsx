/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import propTypes from "prop-types";
import style from "./index.module.css";

function isInvalidInput(state, property) {
  if (state[property] === undefined || !state[property].error) return false;
  return true;
}

function hasErrorProperty(object) {
  return Object.prototype.hasOwnProperty.call(object, "error");
}

// function capitalizeFirstLetter(word) {
//   const Word = word.replace(/^./, word[0].toUpperCase());
//   return Word;
// }

const InputForm = ({ state, setState, name, type, label, placeHolder }) => {
  const login = JSON.parse(localStorage.getItem("userLogin"));

  function handleChange(event) {
    const { target } = event;
    if (hasErrorProperty(state[name])) {
      if (target.value || login) target.classList.remove(style.invalid);
      else target.classList.add(style.invalid);
      setState({
        ...state,
        [name]: {
          value: target.value,
          error: target.value || login ? "" : `${label} is required`,
        },
      });
    } else if (name === "remember-me") {
      setState({
        ...state,
        "remember-me": target.checked,
      });
    } else {
      setState({
        ...state,
        [name]: { value: target.value },
      });
    }
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
        required={hasErrorProperty(state[name]) ? "on" : undefined}
        placeholder={type !== "checkbox" ? placeHolder : undefined}
        checked={type === "checkbox" ? state[name] : null}
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
  state: propTypes.shape({
    username: propTypes.objectOf(propTypes.string) || undefined,
    password: propTypes.objectOf(propTypes.string) || undefined,
    "remember-me": propTypes.bool || null,
    "first-name": propTypes.objectOf(propTypes.string) || undefined,
    "last-name": propTypes.objectOf(propTypes.string) || undefined,
  }),
  setState: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  type: propTypes.string,
  label: propTypes.string,
  placeHolder: propTypes.string,
};

InputForm.defaultProps = {
  state: null,
  type: "text",
  label: undefined,
  placeHolder: undefined,
};
