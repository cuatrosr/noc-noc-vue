import { axiosI } from "@/configs/axios.js";
import Swal from "sweetalert2";
import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  TOKEN_STORAGE_KEY,
  SET_TOKEN_MUTATION,
  CLEAR_TOKEN_MUTATION,
} from "@/store/modules/auth/constants";

export default {
  namespaced: true,
  state() {
    return {
      access_token: localStorage.getItem(TOKEN_STORAGE_KEY) || "",
      token_type: "",
      expires_in: 0,
    };
  },
  mutations: {
    [SET_TOKEN_MUTATION](state, payload) {
      state.access_token = payload.access_token;
      state.token_type = payload.token_type;
      state.expires_in = payload.expires_in;

      localStorage.setItem(TOKEN_STORAGE_KEY, payload.access_token);
    },
    [CLEAR_TOKEN_MUTATION](state) {
      state.access_token = "";
      state.token_type = "";
      state.expires_in = 0;

      localStorage.removeItem(TOKEN_STORAGE_KEY);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.access_token,
    authToken: (state) => state.access_token,
  },
  actions: {
    async [LOGIN_ACTION](context, payload) {
      try {
        const res = await axiosI.post("/auth/login", payload);
        if (res.status === 200) {
          context.commit(SET_TOKEN_MUTATION, res.data);
          return true;
        } else {
          Swal.fire({
            title: "Oops!",
            text: response.data.message || "Something went wrong!",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Oops!",
          text: error.response.data.message || "Something went wrong!",
          icon: "error",
        });
      }
      return false;
    },
    async [LOGOUT_ACTION](context) {
      context.commit(CLEAR_TOKEN_MUTATION);
      return true;
    },
  },
};
