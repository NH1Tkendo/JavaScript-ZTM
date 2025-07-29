# Ghi chú học tập: Timer trong JavaScript

## Tổng quan về Timer

- **Timer trong JavaScript**: Công cụ để lập lịch thực thi mã sau một khoảng thời gian hoặc lặp lại theo chu kỳ.
- Hai loại timer chính:
  - `setTimeout`: Thực thi hàm một lần sau một khoảng thời gian xác định.
  - `setInterval`: Thực thi hàm lặp lại liên tục sau mỗi khoảng thời gian xác định cho đến khi bị hủy.

## Sử dụng `setTimeout`

### Khái niệm

- **Mục đích**: Lập lịch thực thi một hàm một lần sau một khoảng thời gian (tính bằng mili-giây).
- **Cú pháp**:
  ```javascript
  setTimeout(callback, delay, ...args);
  ```
  - `callback`: Hàm sẽ được gọi sau `delay` mili-giây.
  - `delay`: Thời gian chờ (mili-giây).
  - `...args`: Các tham số tùy chọn truyền vào `callback`.

### Ví dụ

1. **Đơn giản**:

   ```javascript
   setTimeout(() => console.log("Here is your pizza 🍕"), 3000);
   ```

   - Kết quả: Sau 3 giây, in `Here is your pizza 🍕` vào console.

2. **Truyền tham số**:

   ```javascript
   setTimeout(
     (ing1, ing2) => console.log(`Pizza with ${ing1} and ${ing2} 🍕`),
     3000,
     "olives",
     "spinach"
   );
   ```

   - Kết quả: Sau 3 giây, in `Pizza with olives and spinach 🍕`.

3. **Sử dụng spread operator**:
   ```javascript
   const ingredients = ["olives", "spinach"];
   setTimeout(
     (ing1, ing2) => console.log(`Pizza with ${ing1} and ${ing2} 🍕`),
     3000,
     ...ingredients
   );
   ```
   - Kết quả: Tương tự như trên, nhưng truyền tham số từ mảng.

### Hủy `setTimeout`

- **Phương thức**: `clearTimeout(timer)`.
- **Cách sử dụng**:
  ```javascript
  const ingredients = ["olives", "spinach"];
  const pizzaTimer = setTimeout(
    (ing1, ing2) => console.log(`Pizza with ${ing1} and ${ing2} 🍕`),
    3000,
    ...ingredients
  );
  if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);
  ```
  - Kết quả: Nếu mảng `ingredients` chứa `'spinach'`, hủy timer và không in gì vào console.

### Lưu ý

- **Tính bất đồng bộ (Asynchronous)**: `setTimeout` không dừng luồng thực thi mã. JavaScript đăng ký callback và tiếp tục thực thi các dòng mã tiếp theo.
  ```javascript
  setTimeout(() => console.log("Pizza delivered 🍕"), 3000);
  console.log("Waiting...");
  ```
  - Kết quả: In `Waiting...` ngay lập tức, sau 3 giây in `Pizza delivered 🍕`.

## Sử dụng `setInterval`

### Khái niệm

- **Mục đích**: Thực thi hàm lặp lại sau mỗi khoảng thời gian xác định.
- **Cú pháp**:
  ```javascript
  setInterval(callback, interval, ...args);
  ```
  - `callback`: Hàm được gọi lặp lại.
  - `interval`: Khoảng thời gian giữa các lần gọi (mili-giây).
  - `...args`: Tham số tùy chọn truyền vào `callback`.

### Ví dụ

1. **Tạo đồng hồ đơn giản**:

   ```javascript
   setInterval(() => {
     const now = new Date();
     console.log(now);
   }, 1000);
   ```

   - Kết quả: Cứ mỗi giây, in thời gian hiện tại vào console.

2. **Đồng hồ với tần suất khác**:
   ```javascript
   setInterval(() => {
     const now = new Date();
     console.log(now);
   }, 3000);
   ```
   - Kết quả: Cứ mỗi 3 giây, in thời gian hiện tại.

### Gợi ý bài tập

- **Thử thách**: Sử dụng `setInterval` để tạo đồng hồ hiển thị giờ, phút, giây (ví dụ: `14:30:45`) trong console mỗi giây.
  - Gợi ý: Sử dụng `now.getHours()`, `now.getMinutes()`, `now.getSeconds()` để lấy giờ, phút, giây.

## Ứng dụng thực tế trong dự án

- **Mô phỏng phê duyệt khoản vay**:
  ```javascript
  setTimeout(() => {
    // Giả lập logic phê duyệt khoản vay
    account.movements.push(loanAmount);
    updateUI(account);
  }, 2500);
  ```
  - Mô tả: Khi người dùng yêu cầu khoản vay, trì hoãn 2,5 giây trước khi cập nhật giao diện (thêm giao dịch và cập nhật số dư).
  - Kết quả: Tạo trải nghiệm thực tế hơn, giống như ngân hàng cần thời gian để phê duyệt.

## Ghi chú thêm

- **Tính bất đồng bộ (Asynchronous JavaScript)**: `setTimeout` và `setInterval` là các hàm bất đồng bộ, được xử lý bởi cơ chế event loop trong JavaScript. Xem thêm tại [[Asynchronous JavaScript]].
- **Hủy `setInterval`**: Sử dụng `clearInterval(timer)` tương tự như `clearTimeout`.
- **Tài liệu tham khảo**: [MDN Web Docs - setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout), [MDN Web Docs - setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval).

### Lưu ý khi áp dụng

- Đảm bảo quản lý timer (lưu vào biến) để có thể hủy khi cần.
- Tránh đặt `interval` quá ngắn trong `setInterval` để không ảnh hưởng hiệu suất.
- Kiểm tra điều kiện hủy timer (ví dụ: `clearTimeout` nếu người dùng thoát khỏi trang).
