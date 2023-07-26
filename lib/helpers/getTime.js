export const getCurrentMonthStartDate = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  return new Date(currentYear, currentMonth, 1);
};

export const getCurrentWeekStartDate = () => {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const diff = currentDate.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
  return new Date(currentDate.setDate(diff));
};

export const getCurrentYearStartDate = () => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, 0, 1);
};
