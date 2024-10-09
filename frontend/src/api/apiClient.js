const apiClient = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  export default apiClient;
  