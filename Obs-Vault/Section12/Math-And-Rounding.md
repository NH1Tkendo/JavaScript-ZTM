### 1. Các phép toán toán học cơ bản

- JavaScript cung cấp nhiều phép toán toán học thông qua không gian tên `Math` (Math namespace).
- Các phép toán đã sử dụng: cộng (`+`), trừ (`-`), nhân (`*`), chia (`/`), lũy thừa (`**`).
- Một số hàm và hằng số quan trọng:
  - **Căn bậc hai (square root)**:
    - Sử dụng `Math.sqrt(số)` để tính căn bậc hai.
    - Ví dụ: `Math.sqrt(16) = 4`.
    - Có thể thay thế bằng toán tử lũy thừa: `16 ** (1/2) = 4`.
  - **Căn bậc ba (cubic root)**:
    - Sử dụng toán tử lũy thừa: `8 ** (1/3) = 2`.
    - Không có hàm trực tiếp trong `Math` cho căn bậc ba.
  - **Tìm giá trị lớn nhất/nhỏ nhất (max/min)**:
    - `Math.max(...số)`: Trả về giá trị lớn nhất.
      - Ví dụ: `Math.max(5, 18, 23, 11, 2) = 23`.
      - Hỗ trợ ép kiểu tự động (type coercion), nhưng không phân tích cú pháp (parsing).
      - Ví dụ: `Math.max('23px', 18) = NaN`.
    - `Math.min(...số)`: Trả về giá trị nhỏ nhất.
      - Ví dụ: `Math.min(5, 18, 23, 11, 2) = 2`.
  - **Hằng số Pi (Math.PI)**:
    - Dùng để tính toán liên quan đến hình tròn.
    - Ví dụ: Tính diện tích hình tròn với bán kính 10px:
      ```javascript
      const radius = parseFloat("10px"); // 10
      const area = Math.PI * radius ** 2; // Diện tích = π * r²
      ```

---

### 2. Tạo số ngẫu nhiên (Random Number Generator)

- **Hàm `Math.random()`**: Tạo số ngẫu nhiên từ 0 đến 1 (bao gồm 0, không bao gồm 1).
- **Ví dụ cơ bản**: Tạo số ngẫu nhiên mô phỏng xúc xắc (1 đến 6):

  ```javascript
  Math.floor(Math.random() * 6) + 1;
  ```

  - `Math.random() * 6`: Tạo số từ 0 đến 5.999...
  - `Math.floor()`: Làm tròn xuống để lấy số nguyên (0-5).
  - `+ 1`: Dịch chuyển phạm vi thành 1-6.

- **Hàm tổng quát tạo số ngẫu nhiên trong khoảng**:
  ```javascript
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  ```
  - **Giải thích**:
    - `Math.random() * (max - min + 1)`: Tạo số ngẫu nhiên từ 0 đến `(max - min)`.
    - `Math.floor()`: Làm tròn xuống để lấy số nguyên.
    - `+ min`: Dịch chuyển phạm vi để bắt đầu từ `min`.
  - **Ví dụ sử dụng**:
    - `randomInt(10, 20)`: Tạo số ngẫu nhiên từ 10 đến 20 (bao gồm cả 10 và 20).
    - `randomInt(0, 3)`: Tạo số ngẫu nhiên từ 0 đến 3.
  - **Lưu ý**: Hàm này hoạt động tốt với cả số âm nhờ sử dụng `Math.floor()` thay vì `Math.trunc()`.

---

### 3. Làm tròn số trong JavaScript

#### 3.1. Làm tròn số nguyên (Rounding Integers)

- **Các phương thức**:
  - `Math.trunc(số)`: Cắt bỏ phần thập phân, trả về phần nguyên.
    - Ví dụ: `Math.trunc(23.3) = 23`, `Math.trunc(-23.3) = -23`.
  - `Math.round(số)`: Làm tròn đến số nguyên gần nhất.
    - Ví dụ: `Math.round(23.3) = 23`, `Math.round(23.6) = 24`.
  - `Math.ceil(số)`: Làm tròn lên số nguyên gần nhất.
    - Ví dụ: `Math.ceil(23.3) = 24`, `Math.ceil(-23.3) = -23`.
  - `Math.floor(số)`: Làm tròn xuống số nguyên gần nhất.
    - Ví dụ: `Math.floor(23.3) = 23`, `Math.floor(-23.3) = -24`.
- **So sánh `Math.trunc` và `Math.floor`**:
  - Với số dương: Kết quả giống nhau (cắt bỏ phần thập phân).
  - Với số âm: `Math.trunc` chỉ cắt phần thập phân, `Math.floor` làm tròn xuống số nhỏ hơn.
    - Ví dụ: `Math.trunc(-23.3) = -23`, `Math.floor(-23.3) = -24`.
  - **Khuyến nghị**: Sử dụng `Math.floor` cho hàm tổng quát (như `randomInt`) để xử lý cả số âm và dương.

#### 3.2. Làm tròn số thập phân (Rounding Decimals/Floating Point Numbers)

- **Phương thức `toFixed(số chữ số thập phân)`**:
  - Làm tròn số đến số chữ số thập phân được chỉ định và trả về dưới dạng chuỗi (string).
  - Ví dụ:
    - `(2.7).toFixed(0) = '3'` (làm tròn thành 3, trả về chuỗi).
    - `(2.7).toFixed(3) = '2.700'` (thêm số 0 để đủ 3 chữ số thập phân).
    - `(2.345).toFixed(2) = '2.35'`.
  - **Chuyển chuỗi thành số**: Thêm dấu `+` trước chuỗi.
    - Ví dụ: `+(2.345).toFixed(2) = 2.35` (kết quả là số).
  - **Lưu ý**:
    - `toFixed` hoạt động trên đối tượng `Number`, JavaScript tự động chuyển đổi (boxing) từ kiểu nguyên thủy sang đối tượng `Number` để gọi phương thức.

---

### 4. Tổng kết

- **Hàm toán học**:
  - `Math.sqrt`, `Math.max`, `Math.min`, `Math.PI`, `Math.random` là các công cụ mạnh mẽ cho phép toán và tạo số ngẫu nhiên.
  - Hàm `randomInt(min, max)` tạo số ngẫu nhiên trong khoảng từ `min` đến `max` (bao gồm cả hai đầu).
- **Làm tròn**:
  - Số nguyên: `Math.trunc`, `Math.round`, `Math.ceil`, `Math.floor`.
  - Số thập phân: `toFixed(n)` để định dạng số chữ số thập phân, trả về chuỗi.
  - Khuyến nghị: Sử dụng `Math.floor` cho hàm tổng quát và `toFixed(2)` để hiển thị số thập phân.
- **Ứng dụng thực tế**:
  - Làm tròn số tiền vay để đảm bảo tính thực tế.
  - Định dạng số hiển thị trên giao diện để đồng nhất và dễ đọc.
- **Tài liệu tham khảo**: Xem thêm các hàm toán học (logarit, sin, cos, v.v.) tại tài liệu MDN (MDN documentation).
