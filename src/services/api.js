const API_BASE_URL = 'http://localhost:8080';

export const apiService = {
  // Send chat message to the AI agent
  async sendChatMessage(prompt, userData = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            prompt: prompt
          },
          userData: {
            userName: userData.userName || "Alan",
            userId: userData.userId || "123",
            apiKey: userData.apiKey || "BQBloj8S8R3WTRvMyW3u5Zt4BMqiMWTlm_g2_8dcB1lc7rBj0daS9cUhttBydvGOajIZ50Z38IUgOLPItL47UrNMvs23AVTu-6lHzXm8-59i0pWQhuni6E4nh6LLrbB0FDH4EbRomGx2J4ZW10xSnhfk0mjPLfIcmot9yYempaDDnJgU5RPQ0YOFHxFxJr0oTSvlUuz9JFwjD4zgZ6kf78jRme8ypsjs2wd6qngS65B2NKbjN5yVSEIp1fhMghrn9XPrHAjzEsG2IDigcsDPWWmqWgbWapw4en5bd2XAll0YLS9yrTqIZE2_gQmnnqFp3Epsw0NVY3-lMXmG6U_-VEnKSYYWIdJ5UCleUY--deSFqh1cantW5ZRXpx7Z1LWaVmSLoQix62d8"
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  },

  // Get user profile information
  async getUserProfile(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Get current playback state
  async getCurrentPlayback() {
    try {
      const response = await fetch(`${API_BASE_URL}/playback/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current playback:', error);
      throw error;
    }
  }
};

export default apiService;
