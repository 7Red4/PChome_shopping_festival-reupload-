const API_BASE_URL = ''

export default async function api(url, data, config = {}) {
  config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...config
  }
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config
    });
    if (response.ok) {
      let res = '';
      try {
        res = await response.json();
      } catch (error) {
        try {
          res = await response.text();
        } catch (error) {
          res = response;
        }
      }
      return { res }
    } else {
      return {
        error: {
          status: response.status,
          text: response.statusText,
          message: await response.text()
        }
      };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }


}