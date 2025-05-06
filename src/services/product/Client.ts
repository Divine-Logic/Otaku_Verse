import axios from "axios";

export const anilistApi = axios.create({
  baseURL: "https://graphql.anilist.co",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});
