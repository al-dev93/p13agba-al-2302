/**
 * @description endpoints of API
 */

const API_URL = process.env.REACT_APP_API_URL;

export const LOGIN = `${API_URL}/api/v1/user/login`;

export const PROFILE = `${API_URL}/api/v1/user/profile`;
