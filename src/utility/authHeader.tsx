export default function authHeader(): Record<string, string> {
  const token = sessionStorage.getItem('token');

  if (token) {
    return {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'application/x-www-form-urlencoded',  // Add Content-Type header
    };
  }
  return {
    'Content-Type': 'application/x-www-form-urlencoded',  // If there's no token, still add Content-Type header
  };
}
