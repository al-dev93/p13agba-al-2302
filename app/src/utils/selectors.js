/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */

export const selectInputLogin = (name) => {
  return (state) => state.inputLogin[name];
};

// export const selectInputs = (name) => {
//   return (state) => state.input[name];
// };
