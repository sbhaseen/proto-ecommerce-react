import axios from "axios";
import { RegisterUserInterface, UserDataInterface } from "./common-interfaces";

export const API_BASE_URL: string = "http://localhost:5000";

export const API_PATHS = {
  // Items
  // GET
  getAllItems: `${API_BASE_URL}/items`,

  // GET (+ :id)
  getItemById: `${API_BASE_URL}/items/`,

  // POST
  createItem: `${API_BASE_URL}/items`,

  // PATCH (+ :id)
  updateItem: `${API_BASE_URL}/items/`,

  // DELETE (+ :id)
  deleteItem: `${API_BASE_URL}/items/`,

  // Users
  // POST
  registerUser: `${API_BASE_URL}/users`,

  // POST
  loginUser: `${API_BASE_URL}/auth/login`,
};

export async function registerUser(
  newUserData: RegisterUserInterface
): Promise<any> {
  return await axios.post(`${API_BASE_URL}/users`, newUserData);
}

export async function loginUser(
  userLoginData: UserDataInterface
): Promise<any> {
  return await axios.post(`${API_BASE_URL}/auth/login`, userLoginData);
}

export async function getAllItems(currentPage = 1, itemLimit = 12) {
  return await axios.get(
    `${API_BASE_URL}/items?page=${currentPage}&limit=${itemLimit}`
  );
}

export async function getItemById(id: string): Promise<any> {
  return await axios.get(`${API_BASE_URL}/items/${id}`);
}
