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
  loginUser: `${API_BASE_URL}/users`,
};
