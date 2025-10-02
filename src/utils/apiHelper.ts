import axios from "axios";

const BASE_API = "https://kopi-kita-server.vercel.app";
// const BASE_API = "http://localhost:2890";

const apiBase = axios.create({
  baseURL: BASE_API,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await apiBase.post("/auth/signin", {
      email,
      password,
    });
    const token = response.data.data.token;
    window.localStorage.setItem("token", token);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const keepLogin = async () => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.get("/auth/keep-login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSummary = async () => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.get("/dashboard/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProduct = async () => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.get("/products/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailProduct = async (id: string) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.get(`/products/all/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postProduct = async (data: any) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.post("/products/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id: string, data: any) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.patch(`/products/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.patch(`/products/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const fetchCategory = async () => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.get("/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryDetail = async (id: string) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.get(`/categories/all/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const postCategory = async (name: string) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.post(
      "/categories/create",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (id: string, name: string) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.patch(
      `/categories/update/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await apiBase.patch(
      `/categories/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}