## Tính Toán với Ngày Tháng trong JavaScript

### Mục tiêu

- Hiểu cách thực hiện phép tính với các đối tượng ngày tháng (`Date`) trong JavaScript.
- Tạo hàm tính số ngày giữa hai ngày.
- Định dạng ngày tháng hiển thị thân thiện (ví dụ: "hôm nay", "hôm qua", "5 ngày trước").
- Xử lý các trường hợp đặc biệt như thời gian cụ thể hoặc thay đổi giờ mùa hè.

### Khái niệm cơ bản

- **Timestamp (Dấu thời gian)**: Khi chuyển đối tượng `Date` thành số, kết quả là số mili-giây kể từ 1/1/1970 (Unix Epoch).
- Phép trừ hai ngày trả về số mili-giây, có thể chuyển đổi thành ngày, giờ, phút, giây.
- Sử dụng `Math.abs()` để đảm bảo kết quả dương, bất kể thứ tự ngày.
- Thư viện `moment.js` được khuyến nghị cho các phép tính phức tạp (ví dụ: thay đổi giờ mùa hè).

### Hàm tính số ngày giữa hai ngày

- Hàm `calcDaysPassed` tính số ngày giữa hai ngày bằng cách:
  - Trừ hai dấu thời gian để lấy số mili-giây.
  - Chuyển mili-giây thành ngày bằng cách chia cho `(1000 * 60 * 60 * 24)`.
  - Sử dụng `Math.abs()` để đảm bảo kết quả dương.
  - Sử dụng `Math.round()` để làm tròn kết quả, tránh giá trị thập phân khi có thời gian cụ thể.

```javascript
const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
```

#### Ví dụ

`

```javascript
const date1 = new Date("2025-04-14");
const date2 = new Date("2025-04-24");
console.log(calcDaysPassed(date1, date2)); // Kết quả: 10
```

- **Giải thích**:
  - `(date2 - date1)` trả về số mili-giây giữa hai ngày.
  - Chia cho `1000 * 60 * 60 * 24` để chuyển thành ngày (1000 ms = 1 giây, 60 giây = 1 phút, 60 phút = 1 giờ, 24 giờ = 1 ngày).
  - `Math.abs()` đảm bảo kết quả dương nếu `date1` sau `date2`.
  - `Math.round()` làm tròn kết quả, đặc biệt khi ngày có thời gian cụ thể (ví dụ: 10:08 sáng).

### Hàm định dạng ngày tháng

- Hàm `formatMovementDate` định dạng ngày tháng hiển thị thân thiện:
  - Nếu là hôm nay: trả về "Hôm nay".
  - Nếu là hôm qua: trả về "Hôm qua".
  - Nếu trong vòng 7 ngày: trả về "[số ngày] ngày trước".
  - Nếu trên 7 ngày: trả về ngày tháng định dạng.

```javascript
const formatMovementDate = (date) => {
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Hôm nay";
  if (daysPassed === 1) return "Hôm qua";
  if (daysPassed <= 7) return `${daysPassed} ngày trước`;
  return new Intl.DateTimeFormat("vi-VN").format(date);
};
```

#### Ví dụ

```javascript
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const fiveDaysAgo = new Date(today);
fiveDaysAgo.setDate(today.getDate() - 5);

console.log(formatMovementDate(today)); // Kết quả: Hôm nay
console.log(formatMovementDate(yesterday)); // Kết quả: Hôm qua
console.log(formatMovementDate(fiveDaysAgo)); // Kết quả: 5 ngày trước
console.log(formatMovementDate(new Date("2025-07-01"))); // Kết quả: 01/07/2025
```

### Ứng dụng thực tế

- Hàm `formatMovementDate` được sử dụng trong hàm hiển thị giao dịch (`displayMovements`) để hiển thị ngày giao dịch một cách thân thiện.
- Ví dụ: Trong ứng dụng ngân hàng, giao dịch hôm nay hiển thị "Hôm nay", giao dịch hôm qua hiển thị "Hôm qua", giao dịch cách đây 5 ngày hiển thị "5 ngày trước".
- Giúp giao diện giống các ứng dụng thực tế như Facebook, nơi ngày đăng bài được hiển thị thân thiện.

### Ghi chú thêm

- **Xử lý thời gian cụ thể**: Khi ngày có thời gian (ví dụ: 10:08), phép tính có thể trả về số thập phân (như 10.4 ngày). Sử dụng `Math.round()` để làm tròn.
- **Thư viện hỗ trợ**: Đối với các tính toán phức tạp (như thay đổi giờ mùa hè), sử dụng [[moment.js]].
- **Quốc tế hóa (Internationalization)**: Sẽ được đề cập trong bài học tiếp theo để định dạng ngày tháng và số theo ngôn ngữ/vùng của người dùng ([[Internationalization]]).
- **Liên kết chéo**: Xem thêm [[Date Time]] để hiểu cách tạo và thao tác với đối tượng `Date`.

### Mã nguồn tổng hợp

```javascript
// Hàm tính số ngày giữa hai ngày
const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

// Hàm định dạng ngày tháng
const formatMovementDate = (date) => {
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Hôm nay";
  if (daysPassed === 1) return "Hôm qua";
  if (daysPassed <= 7) return `${daysPassed} ngày trước`;
  return new Intl.DateTimeFormat("vi-VN").format(date);
};

// Ví dụ sử dụng
const movements = [
  { date: new Date(), amount: 500 },
  { date: new Date("2025-08-01"), amount: -200 },
  { date: new Date("2025-07-28"), amount: 300 },
];

const displayMovements = (movements) => {
  movements.forEach((mov) => {
    const displayDate = formatMovementDate(mov.date);
    console.log(`Giao dịch: ${mov.amount} - ${displayDate}`);
  });
};

displayMovements(movements);
// Kết quả:
// Giao dịch: 500 - Hôm nay
// Giao dịch: -200 - Hôm qua
// Giao dịch: 300 - 5 ngày trước
```

### Lưu ý

- Hàm `formatMovementDate` được tách riêng để tăng tính mô-đun, dễ tái sử dụng.
- Sử dụng `return` trong hàm để dừng thực thi ngay khi điều kiện thỏa mãn, giúp mã gọn gàng hơn.
- Để kiểm tra, thay đổi ngày trong ví dụ (như 2025-08-01, 2025-07-28) để phù hợp với ngày hiện tại.
