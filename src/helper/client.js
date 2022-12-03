
export async function client(endpoint, {body, ...customConfig} = {}) {
  const headers = {'Content-Type': 'application/json'};
  if (customConfig.token) headers.Token = customConfig.token;

  const config = {
    method: customConfig.method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }


  let data;
  try {
    const response = await fetch(endpoint, config);
     //TODO
    if (response.status === 401)
      alert('Kimlik doğrulama hatası lütfen tekrar oturum açınız.');

    if (response.status === 400) return response;

    if (response.status === 500)
      alert('Lütfen internet bağlantınızı kontrol ediniz.');

    if (response.ok) {
      data = await response.json();

      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'GET',
  });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip,deflate,br',
      'Access-Control-Allow-Origin': '*',
    },
    method: 'POST',
    body,
  });
};

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip,deflate,br',
      'Access-Control-Allow-Origin': '*',
    },
    method: 'PUT',
    body,
  });
};

client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip,deflate,br',
      'Access-Control-Allow-Origin': '*',
    },
    method: 'DELETE',
    body,
  });
};
