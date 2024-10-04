export const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true, // Ensure AM/PM is displayed
};

// Helper function to get day suffix
const getDayWithSuffix = (day: number) => {
  if (day > 3 && day < 21) return day + 'th'; // Handles 11th, 12th, 13th
  switch (day % 10) {
    case 1: return day + 'st';
    case 2: return day + 'nd';
    case 3: return day + 'rd';
    default: return day + 'th';
  }
};

// Format date function
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Extract parts of the date individually
  const day = getDayWithSuffix(date.getDate()); // Get the day with suffix
  const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date);
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
  const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(date);
  const time = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).format(date);

  return `${weekday}, ${day} ${month}, ${year}`;
};
