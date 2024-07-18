import axios from "axios";

export function createInstance() {
  const instance = axios.create();
  return setInterceptor(instance);
}

function setInterceptor(instance) {
  instance.interceptor.request.use();
}
