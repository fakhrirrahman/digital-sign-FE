/**
 * API Client for Authentication via Multi-Service Backend
 */
export const authApi = {
  login: async (identifier: string, passkey: string): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telepon: identifier,
          password: passkey
        }),
      });

      if (!response.ok) {
        // Parse error response if possible
        let errorMsg = 'Authentication failed';
        try {
          const errorData = await response.json();
          console.error('Server Validation Error Details:', errorData);
          errorMsg = JSON.stringify(errorData);
        } catch (e) {
          // not json
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      console.error('Login error:', error.message);
      return { success: false, message: 'Kredensial tidak valid atau format salah. Cek Console Log.' };
    }
  }
};
