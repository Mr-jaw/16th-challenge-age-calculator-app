const valDate = (date: string): boolean => {
  let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

  // Matching the date through regular expression
  if (date.match(dateformat)) {
    let operator = date.split("/");

    // Extract the string into month, date and year
    let datepart: string[] = [];
    if (operator.length > 1) {
      datepart = date.split("/");
    }
    let day = parseInt(datepart[0]);
    let month = parseInt(datepart[1]);
    let year = parseInt(datepart[2]);

    // Create a list of days of a month
    let ListofDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month == 1 || month > 2) {
      if (day > ListofDays[month - 1]) {
        //to check if the date is out of range
        console.log("Invalid date");
        return false;
      }
    } else if (month == 2) {
      let leapYear = false;
      if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
      if (leapYear == false && day >= 29) {
        console.log("Invalid date");
        return false;
      } else if (leapYear == true && day > 29) {
        console.log("Invalid date format!");
        return false;
      }
    }
  } else {
    console.log("Invalid date format!");
    return false;
  }
  return true;
};

export default valDate;
