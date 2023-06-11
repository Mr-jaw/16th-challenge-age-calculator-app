import { AgeInterface } from "../entities/Age";

function calculateAge(birthday: string): AgeInterface {
  const birthDate: Date = new Date(birthday);
  const currentDate: Date = new Date();

  let ageYears: number = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths: number = currentDate.getMonth() - birthDate.getMonth();
  let ageDays: number = currentDate.getDate() - birthDate.getDate();

  // Check if the birth date is later in the month than the current date
  if (ageDays < 0) {
    const lastMonth: number =
      currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;

    const daysInLastMonth: number = new Date(
      currentDate.getFullYear(),
      lastMonth + 1,
      0
    ).getDate();
    ageDays += daysInLastMonth;
    ageMonths--;
  }

  // Check if the current date is before the birth date in terms of month and day
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
}

export default calculateAge;
