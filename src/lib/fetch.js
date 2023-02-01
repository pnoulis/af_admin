const HOST = "https://fakerapi.it/api/v1/";

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  const error = new Error(res.statusText);
  error.name = res.statusText;
  error.res = res;
  throw error;
}

function makeUrl(path, params) {
  const url = new URL(HOST.concat("/", path).replace(/\/{2,}/g, "/"));

  if (!params) return url;
  Object.keys(params).forEach((param) =>
    url.searchParams.append(param, params[param])
  );
  return url;
}

function decode(response) {
  return response.json();
}

function encode(payload) {
  return payload.stringify();
}

const _fetch = {
  get(path, params) {
    const url = makeUrl(path, params);
    return fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then(checkStatus)
      .then(decode);
  },
  post(path, payload, params) {
    return 0;
  },
  delete(path, payload, params) {
    return 0;
  },
  put(path, payload, params) {
    return 0;
  },
};

export default _fetch;
export { _fetch as fetch };
