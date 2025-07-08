// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// const x = 23;

// BUG
// const a = {
//   a: "a",
//   b: "b",
// };

// console.table(a);
//================================================
// Challenge 1
// Xuất chuỗi dựa trên số nhiệt độ tối đa của từng ngày được cho bằng mảng.
// Ví dụ [17, 21, 23] xuất là "... 17c in 1 days ... 21c in 2 days ... 23c in 3 days..."
/* 1. 
Cần phải xuất các giá trị trong mảng như nào?
Các số ngày phải viết như nào? viết tay hay cho tăng dần theo giá trị mảng?
Xuất các chuỗi liên tục như nào?
*/
/* 2.
Chuyển mảng thành chuỗi
Chuỗi cần có các ngày với index + 1
Nối các chuỗi với nhau
*/
/* 4. 
loop neu array.length >= 0
    xuat "... arr[i] in i days ..."
*/

// const testData1 = [17, 21, 23];
// const testData2 = [12, 5, -5, 0, 4];

// const printForecast = (arr) => {
//   let str = "...";
//   for (let i = 0; i < arr.length; i++) {
//     str += ` ${arr[i]}C in ${i + 1} days ...`;
//   }
//   return str;
// };

// console.log(printForecast(testData1));
// console.log(printForecast(testData2));
//=================================================
// Challenge 2 (Dùng AI để giải quyết)
// Ứng dụng theo dõi thời gian, viết một hàm nhận giờ
// làm việc theo ngày của số tuần nhất định và trả về
// 1. Tổng số giờ làm việc
// 2. Trung bình số giờ làm việc theo ngày
// 3. Ngày với số giò làm việc nhiều nhất
// 4. Số ngày làm việc
// 5. Kiểm tra tuần đó có làm việc full tuần không (làm hơn 35h)

/* prompt
Hãy viết một ung dụng theo dõi thời gian bằng JavaScript, viết một hàm nhận
vào một mảng và trả về và trả về
1. Tổng số giờ làm việc (Tổng các phần tử trong mảng)
2. Trung bình số giờ làm việc theo ngày (Trung bình các phần tử trong mảng)
3. Ngày với số giò làm việc nhiều nhất (Tương ứng từ thứ hai đến chủ nhật theo mảng)
4. Số ngày làm việc (Ngày có giá trị > 0)
5. Kiểm tra tuần đó có làm việc full tuần không (tổng giờ làm hơn 35h)
*/
const testData = [7.5, 8, 6.5, 8, 8.5, 4, 8];

function analyzeWorkHours(weekHours) {
  if (!Array.isArray(weekHours) || weekHours.length !== 7) {
    throw new Error("Mảng phải gồm đúng 7 phần tử (từ thứ hai đến chủ nhật)");
  }

  const dayNames = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];

  const totalHours = weekHours.reduce((sum, hours) => sum + hours, 0);

  const averageHours = totalHours / 7;

  const maxHours = Math.max(...weekHours);
  const maxDayIndex = weekHours.indexOf(maxHours);
  const maxDayName = dayNames[maxDayIndex];

  const workingDays = weekHours.filter((hours) => hours > 0).length;

  const isFullWeek = totalHours >= 35;

  return {
    "Tổng số giờ làm việc": totalHours,
    "Trung bình giờ làm mỗi ngày": averageHours.toFixed(2),
    "Ngày làm nhiều nhất": `${maxDayName} (${maxHours} giờ)`,
    "Số ngày có làm việc": workingDays,
    "Có làm việc full tuần không (>=35h)": isFullWeek,
  };
}

console.log(analyzeWorkHours(testData));
