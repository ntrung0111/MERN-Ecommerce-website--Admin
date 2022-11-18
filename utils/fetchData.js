import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL;

export const getDataAPI = async (url, token) => {
  try {
    const res = await axios.get(`/api/${encodeURI(url)}`, {
      headers: { Authorization: token },
    });

    return res.data;
  } catch (err) {
    return { error: err.response.data.err };
  }
};

export const postDataAPI = async (url, data, token) => {
  try {
    const res = await axios.post(`/api/${url}`, data, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err) {
    return { error: err.response.data.err };
  }
};

export const putDataAPI = async (url, data, token) => {
  try {
    const res = await axios.put(`/api/${url}`, data, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err) {
    return { error: err.response.data.err };
  }
};

export const patchDataAPI = async (url, data, token) => {
  try {
    const res = await axios.patch(`/api/${url}`, data, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err) {
    return { error: err.response.data.err };
  }
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res.data;
};
