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
            apiKey: userData.apiKey || "BQDfS-tKBh_vv-j9gr0wqOWwUKY6MC-LhT4hUA38FdBHR9D74aoYB2Ckovj4w2PmhKcV2raIkz_DaLZLQnrYSSAyLwq-mKrHHz0qctCqZRlUbGuYOSQAB3B7Vjl3gSIpUp01xeP_kLid70Ip6sC3MQeNdUi3DikasF8kJwx_VZKIfxquUu8orUo_Z5NWOfk8e3vrca_a7dPSFBWuwFSa-Ubh28vlYipDG6EDjNBMZ0xoFoAGQIkcOUpx_v4gt_DuHgpMQvFuMMd2_RG8oGeXRMWw7TpsJac6Pun3rXj9t1VaC7AMlKymekl1xgTVyLu0Xyw2fjwGswgsWUWipoOuWzbM0Gxm-QEQI7L0uJS9432SiLl7Eq8Q7wZOr-3kvYT4ELz5jxcJtCiP"
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
