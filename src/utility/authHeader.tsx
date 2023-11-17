export default function authHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
  
    if (token) {
      return { Authorization: `Bearer ${JSON.parse(token)}` };
    }
    return {};
  }
  