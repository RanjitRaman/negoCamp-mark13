var birthDate = document.querySelector("#birth-date");
var submitBtn = document.querySelector("#submit-btn");
var output = document.querySelector("#output-div");

function clickHandler() {
  var cleanDate = birthDate.value.split("-");
  var inputDate = {
    day: Number(cleanDate[2]),
    month: Number(cleanDate[1]),
    year: Number(cleanDate[0]),
  };

  var outputs = getNextPalindromeDate(inputDate);
  console.log(outputs);
  output.innerText =
    "The next palindrome date is in " +
    outputs[0] +
    " days and date is " +
    outputs[1].day +
    "-" +
    outputs[1].month +
    "-" +
    outputs[1].year;
}

submitBtn.addEventListener("click", clickHandler);

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function checkPalindrome(str) {
  var reversedStr = reverseStr(str);
  if (str === reversedStr) {
    return true;
  } else {
    return false;
  }
}

function dateToString(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.day < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function createAllDateFormats(date) {
  var allDates = [];
  var newDate = dateToString(date);
  var DDMMYYYY = newDate.day + newDate.month + newDate.year;
  var MMDDYYYY = newDate.month + newDate.day + newDate.year;
  var YYYYMMDD = newDate.year + newDate.month + newDate.day;
  var DDMMYY = newDate.day + newDate.month + newDate.year.slice(-2);
  var MMDDYY = newDate.month + newDate.day + newDate.year.slice(-2);
  var YYMMDD = newDate.year.slice(-2) + newDate.month + newDate.day;
  allDates.push(DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD);
  return allDates;
}
var date = {
  day: 19,
  month: 02,
  year: 2002,
};

function checkPalindromeforDates(date) {
  var allDateFormats = createAllDateFormats(date);
  var flag = false;
  for (let i = 0; i < allDateFormats.length; i++) {
    if (checkPalindrome(allDateFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function leapYear(year) {
  if (year % 100 === 0) {
    return false;
  }
  if (year % 400 === 0) {
    return true;
  }
  if (year % 4 == 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [
    "31",
    "28",
    "31",
    "30",
    "31",
    "30",
    "31",
    "31",
    "30",
    "31",
    "30",
    "31",
  ];

  if (month === 2) {
    if (leapYear(year)) {
      if (day > 29) {
        day: 1;
        month = month + 1;
      } else {
        if (day > 28) {
          day: 1;
          month = month + 1;
        }
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month = month + 1;
    }
  }

  if (month > 12) {
    month = 1;
    year = year + 1;
  }
  return { day, month, year };
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var count = 0;
  while (1) {
    count++;
    var isPalindrome = checkPalindromeforDates(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
}
