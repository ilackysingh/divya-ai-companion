// Divya's Birthday Configuration
// Update these values to match Divya's actual birthday

export const BIRTHDAY_CONFIG = {
  // Month: 0-11 (January = 0, December = 11)
  month: 11, // December
  
  // Day of the month: 1-31
  day: 25, // 25th day
};

// Helper function to check if today is Divya's birthday
export const isBirthday = (): boolean => {
  const today = new Date();
  return today.getMonth() === BIRTHDAY_CONFIG.month && 
         today.getDate() === BIRTHDAY_CONFIG.day;
};

// Helper function to get days until next birthday
export const getDaysUntilBirthday = (): number => {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Create this year's birthday date
  const thisYearBirthday = new Date(currentYear, BIRTHDAY_CONFIG.month, BIRTHDAY_CONFIG.day);
  
  // If birthday has passed this year, calculate for next year
  if (today > thisYearBirthday) {
    const nextYearBirthday = new Date(currentYear + 1, BIRTHDAY_CONFIG.month, BIRTHDAY_CONFIG.day);
    const diffTime = nextYearBirthday.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    const diffTime = thisYearBirthday.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}; 