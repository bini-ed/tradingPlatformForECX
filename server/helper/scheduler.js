const moment = require("moment");

const scheduler = (currentAuctionDate, findAuctionDate) => {
  const modified = moment(currentAuctionDate);
  console.log(moment().day());

  console.log("modifie", modified.format("YYYY-MM-DD hh:mm:ss a"));

  let day = modified.day();
  let dayNumber = modified.date();
  let month = modified.month() + 1;
  let year = modified.year();

  if (month == 1 || 3 || 5 || 7 || 8 || 10 || 12) {
    if (dayNumber == 31) {
      if (day == 5) {
        console.log(
          "New date is next month,next year, day = next month day 3 "
        );
        modified.set({
          year: month == 12 ? year + 1 : year,
          month: month == 12 ? 0 : month + 1,
          date: 3,
          hour: 09,
          minute: 00,
          second: 00,
        });
      } else if (day != 6 && day != 0) {
        console.log("New date is next month , day = next month day 1");
        modified.set({
          year: month == 12 ? year + 1 : year,
          month: month == 12 ? 0 : month + 1,
          date: 1,
          hour: 09,
          minute: 00,
          second: 00,
        });
      } else if (day == 6) {
        console.log(
          "Saturday New date is next year ,next month, day = next month day 2"
        );
        modified.set({
          year: month == 12 ? year + 1 : year,
          month: month == 12 ? 0 : month + 1,
          date: 2,
          hour: 09,
          minute: 00,
          second: 00,
        });
      } else {
        console.log(
          "Sunday New date is next year ,next month, day = next month day 1"
        );
        modified.set({
          year: month == 12 ? year + 1 : year,
          month: month == 12 ? 0 : month + 1,
          date: 1,
          hour: 09,
          minute: 00,
          second: 00,
        });
      }
    } else if (dayNumber == 30) {
      if (day == 5) {
        console.log("New date is next month,next year, day = next month day 2");
        modified.set({
          year: month == 12 ? year + 1 : year,
          month: month == 12 ? 0 : month + 1,
          date: 2,
          hour: 09,
          minute: 00,
          second: 00,
        });
      } else {
        console.log("New date is current month, day = current month day 31");
        modified.set({ day: 31, hour: 09, minute: 00, second: 00 });
      }
    } else if (dayNumber == 29) {
      if (day == 5) {
        console.log("New date is next month, day = next month day 1");
        modified.set({
          year: year == 12 ? year + 1 : year,
          month: month + 1,
          date: 1,
          minute: 00,
          second: 00,
        });
      } else {
        console.log("Neww date is current month, day = current month day 30");
        modified.set({ date: 30, hour: 09, minute: 00, second: 00 });
      }
    } else {
      console.log(day);
      if (day == 5) {
        console.log("New date is current month, day = current day + 3 day");
        modified.set({ date: dayNumber + 3, hour: 09, minute: 00, second: 00 });
      } else {
        console.log(
          "exec New date is current month, day = current day + 1 day"
        );
        modified.set({ date: dayNumber + 2, hour: 09, minute: 00, second: 00 });
      }
    }
  } else {
    if (dayNumber == 30) {
      if (day == 5) {
        console.log("New date is next month, day = next month day 3 ");
        modified.set({
          month: month + 1,
          date: 3,
          hour: 09,
          minute: 00,
          second: 00,
        });
      } else {
        console.log("New date is next month , day = next month day 1");
        modified.set({
          month: month + 1,
          date: 1,
          hour: 09,
          minute: 00,
          second: 00,
        });
      }
    } else if (dayNumber == 29) {
      if (day == 5) {
        console.log("New date is next month, day = next month day 2");
        modified.set({
          month: month + 1,
          date: 2,
          hour: 09,
          minute: 00,
          second: 00,
        });
      } else {
        console.log("New date is current month, day = current month day 30");
        modified.set({ date: 30, hour: 09, minute: 00, second: 00 });
      }
    } else if (dayNumber == 28) {
      if (day == 5) {
        console.log("New date is next month, day = next month day 1");
        modified.set({
          month: month + 1,
          date: 1,
          hour: 09,
          minute: 00,
          second: 00,
        });
      } else {
        console.log("New date is current month, day = current month day 29");
        modified.set({ date: 29, hour: 09, minute: 00, second: 00 });
      }
    } else {
      if (day == 5) {
        console.log("New date is current month, day = current day + 3 day");
        modified.set({ date: dayNumber + 3, hour: 09, minute: 00, second: 00 });
      } else {
        console.log("New date is current month, day = current day + 1 day");
        modified.set({ date: dayNumber + 2, hour: 09, minute: 00, second: 00 });
      }
    }
  }
  return modified;
  // return moment(date, "YYYY-MM-DD, hh:mm:ss AZ").toDate();
};

module.exports = scheduler;

// const moment = require("moment");

// const scheduler = (currentAuctionDate, findAuctionDate) => {
//   let date = "";
//   // const modified = moment(currentAuctionDate);
//   const modified = currentAuctionDate;

//   // console.log(modified);
//   // console.log("length", findAuctionDate);

//   let latestAuctionDay = modified.day();
//   let latestAuctionDayNumber = modified.date();
//   let latestAuctionMonth = modified.month() + 1;
//   let latestAuctionYear = modified.year();
//   let latestAuctionHour = findAuctionDate ? modified.hour() : 09;
//   // console.log("asss", moment(modified).add(3, "hour"));

//   if (latestAuctionMonth == 1 || 3 || 5 || 7 || 8 || 10 || 12) {
//     if (latestAuctionDayNumber == 31) {
//       if (latestAuctionDay == 5) {
//         console.log("New date is next month, day = next month day 3 ");
//         date = `${latestAuctionYear}-${
//           latestAuctionMonth + 1
//         }-${3}T${latestAuctionHour}:00:00Z`;
//       } else if (latestAuctionDay != 6 && latestAuctionDay != 7) {
//         console.log("New date is next month , day = next month day 1");
//         date = `${latestAuctionYear}-${
//           latestAuctionMonth + 1
//         }-${1}T${latestAuctionHour}:00:00Z`;
//       }
//     } else if (latestAuctionDayNumber == 30) {
//       if (latestAuctionDay == 5) {
//         console.log("New date is next month, day = next month day 2");

//         date = `${latestAuctionYear}-${
//           latestAuctionMonth < 12
//             ? latestAuctionMonth + 1
//             : (latestAuctionMonth = 1)
//         }-${2}T${latestAuctionHour}:00:00Z`;
//         console.log("chech", date);
//       } else {
//         console.log("New date is current month, day = current month day 31");
//         date = `${latestAuctionYear}-${latestAuctionMonth}-${31}T${latestAuctionHour}:00:00Z`;
//       }
//     } else if (latestAuctionDayNumber == 29) {
//       if (latestAuctionDay == 5) {
//         console.log("New date is next month, day = next month day 1");
//         date = `${latestAuctionYear}-${
//           latestAuctionMonth + 1
//         }-${1}T${latestAuctionHour}:00:00Z`;
//       } else {
//         console.log("New date is current month, day = current month day 30");
//         date = `${latestAuctionYear}-${latestAuctionMonth}-${30}T${latestAuctionHour}:00:00Z`;
//       }
//     } else {
//       if (latestAuctionDay == 5) {
//         console.log("New date is current month, day = current day + 3 day");
//         date = `${latestAuctionYear}-${latestAuctionMonth}-${3}T${latestAuctionHour}:00:00Z`;
//       } else {
//         console.log(
//           "exec New date is current month, day = current day + 1 day"
//         );
//         date = `${latestAuctionYear}-${latestAuctionMonth}-${
//           latestAuctionDayNumber + 1
//         }T${latestAuctionHour}:00:00Z`;
//       }
//     }
//   } else {
//     if (latestAuctionDayNumber == 30) {
//       if (latestAuctionDay == 5) {
//         console.log("New date is next month, day = next month day 3 ");
//         date = `${latestAuctionYear}-${
//           latestAuctionMonth + 1
//         }-${3}T${latestAuctionHour}:00:00Z`;
//       } else {
//         console.log("New date is next month , day = next month day 1");
//         date = `${latestAuctionYear}-${
//           latestAuctionMonth + 1
//         }-${1}T${latestAuctionHour}:00:00Z`;
//       }
//     } else if (latestAuctionDayNumber == 29) {
//       if (latestAuctionDay == 5) {
//         console.log("New date is next month, day = next month day 2");
//         date = `${latestAuctionYear}-${
//           latestAuctionMonth + 1
//         }-${2}T${latestAuctionHour}:00:00Z`;
//       } else {
//         console.log("New date is current month, day = current month day 30");
//         date = `${latestAuctionYear}-${latestAuctionMonth}-${30}T${latestAuctionHour}:00:00Z`;
//       }
//     } else if (latestAuctionDayNumber == 28) {
//       if (latestAuctionDay == 5) {
//         console.log("New date is next month, day = next month day 1");
//         date = `${latestAuctionYear}-${
//           latestAuctionMonth + 1
//         }-${1}T${latestAuctionHour}:00:00Z`;
//       } else {
//         console.log("New date is current month, day = current month day 29");
//         date = `${latestAuctionYear}-${latestAuctionMonth}-${29}T${latestAuctionHour}:00:00Z`;
//       }
//     } else {
//       if (latestAuctionDay == 5) {
//         console.log("New date is current month, day = current day + 3 day");
//         date = `${latestAuctionYear}-${latestAuctionMonth}-${
//           latestAuctionDayNumber + 3
//         }T${latestAuctionHour}:00:00Z`;
//       } else {
//         date = `${latestAuctionYear}-${latestAuctionMonth}-${
//           latestAuctionDayNumber + 1
//         }T${latestAuctionHour}:00:00Z`;
//         console.log("New date is current month, day = current day + 1 day");
//       }
//     }
//   }

//   return moment(date, "YYYY-MM-DD, hh:mm:ss AZ").toDate();
// };

// module.exports = scheduler;
