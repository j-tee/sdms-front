export default function authHeader(): Record<string, string> {
  const token = sessionStorage.getItem('token');
  const headers: Record<string, string> = { 'Content-Type': 'application/x-www-form-urlencoded' };

  if (token) {
    try {
      headers.Authorization = `Bearer ${JSON.parse(token)}`;
    } catch (error) {
      console.error('Invalid token in sessionStorage:', error);
    }
  }

  return headers;
}
