import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const likeArticle = async (articleId) => {
  return axios.post(`${API_BASE}/${articleId}/like`, {}, authHeaders());
};

export const bookmarkArticle = async (articleId) => {
  return axios.post(`${API_BASE}/${articleId}/bookmark`, {}, authHeaders());
};

export const getBookmarkedArticles = async () => {
  return axios.get(`${API_BASE}/bookmarks`, authHeaders());
};

export const unlikeArticle = async (articleId) => {
  return axios.delete(`${API_BASE}/${articleId}/like`, authHeaders());
};

export const unbookmarkArticle = async (articleId) => {
  return axios.delete(`${API_BASE}/${articleId}/bookmark`, authHeaders());
};

export const addComment = async (articleId, commentData) => {
  return axios.post(`${API_BASE}/${articleId}/comment`, commentData, authHeaders());
}