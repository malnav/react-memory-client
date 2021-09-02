import axiosLIB from "axios";

const axios = axiosLIB.create()

axios.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
  }

  return req;
});

export const setAuthToken = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const searchMemoriesAPI = async (query) => {
    const response = await axios.get(`/api/v1/memories/search?searchQuery=${query}`);
    console.log(response)
    return response
}

export const getMemoriesAPI = async () => {
    const response = await axios.get("/api/v1/memories");
    return response
}

export const deleteMemoryAPI = async (id) => {
    const response = await axios.delete(`/api/v1/memories/${id}`);
    return response
}

export const updateLikeAPI = async (id) => {
    const response = await axios.patch(`/api/v1/memories/${id}/like`);
    return response
}

export const addMemoryAPI = async (memory) => {
    const response = await axios.post("/api/v1/memories", memory);
    return response
}

export const updateMemoryAPI =  async (memory) => {
    const response = await axios.patch(`/api/v1/memories/${memory._id}`, memory);
    return response
}


