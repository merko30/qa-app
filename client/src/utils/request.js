const request = (url, method, additionalHeaders = {}, body = {}) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...additionalHeaders
    },
    body: JSON.stringify(body)
  });
};

export default request;
