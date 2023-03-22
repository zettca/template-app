import jsCookie from "js-cookie";

export const getCookie = (key: string) => jsCookie.get(key);

export const setCookie = (key: string, value: string) =>
  jsCookie.set(key, value);

export const removeCookie = (key: string) => jsCookie.remove(key);
