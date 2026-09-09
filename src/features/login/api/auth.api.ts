/**
 * API Client for Authentication via Multi-Service Backend
 */
export const authApi = {
  login: async (identifier: string, passkey: string): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password: passkey
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Kredensial tidak valid atau server tidak merespon' };
    }
  }
};
