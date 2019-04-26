const request = async (url, method, additionalHeaders = {}, body = {}) => {
  return await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...additionalHeaders
    },
    body: method !== "GET" ? JSON.stringify(body) : null
  });
};

export default request;
