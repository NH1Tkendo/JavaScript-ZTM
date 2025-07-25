## **Ghi chú học tập: Tách số bằng dấu phân cách (Numeric Separators) trong JavaScript**

### 1. Tách số bằng dấu phân cách (Numeric Separators) là gì?

- **Định nghĩa**: Kể từ năm 2021, JavaScript hỗ trợ tính năng tách số bằng dấu phân cách (numeric separators) sử dụng dấu gạch dưới (`_`) để định dạng số, giúp mã dễ đọc và hiểu hơn cho các lập trình viên.
- **Mục đích**:
  - Làm cho các số lớn dễ đọc hơn, đặc biệt khi có nhiều chữ số.
  - Gán ý nghĩa cho các phần của số (ví dụ: hàng nghìn, hàng cent).
- **Ví dụ**:

  - Số lớn: `287460000000` (khó đọc) → `287_460_000_000` (dễ đọc, rõ ràng là 287 tỷ).
  - Giá tiền: `345_99` (giá 345.99, phần cent rõ ràng).

- **Cách JavaScript xử lý**:
  - Công cụ JavaScript (engine) bỏ qua dấu gạch dưới (`_`), chỉ nhận diện số gốc.
  - Ví dụ: `287_460_000_000` được hiểu là `287460000000`.
  - Có thể đặt dấu `_` ở bất kỳ vị trí nào giữa các chữ số để tăng tính rõ ràng.

---

### 2. Ứng dụng của tách số bằng dấu phân cách

- **Số lớn**:

  - Ví dụ: Đường kính hệ mặt trời:
    ```javascript
    const diameter = 287_460_000_000; // 287 tỷ, dễ đọc
    console.log(diameter); // 287460000000
    ```
  - Dấu `_` giúp nhận diện ngay số này là 287 tỷ, thay vì khó hiểu như `287460000000`.

- **Giá tiền hoặc đơn vị nhỏ**:

  - Ví dụ: Giá tiền tính bằng cent:
    ```javascript
    const priceInCents = 345_99; // 345.99, rõ ràng phần cent
    console.log(priceInCents); // 34599
    ```
  - Dấu `_` giúp phân tách phần nguyên và phần cent, tăng tính dễ hiểu.

- **Phí giao dịch**:
  - Ví dụ: Phí chuyển khoản:
    ```javascript
    const transferFee1 = 15_00; // Nhìn như $15.00
    const transferFee2 = 1_500; // Nhìn như $1,500
    console.log(transferFee1 === transferFee2); // true (cả hai đều là 1500)
    ```
  - Dấu `_` giúp gán ý nghĩa khác nhau cho cùng một số, tùy thuộc vào vị trí đặt.

---

### 3. Hạn chế và quy tắc sử dụng dấu phân cách

- **Quy tắc đặt dấu gạch dưới (`_`)**:

  - Chỉ được đặt giữa các chữ số.
  - **Không được phép**:
    - Ở đầu số: `_123` (lỗi cú pháp).
    - Ở cuối số: `123_` (lỗi cú pháp).
    - Liên tiếp hai dấu: `12__34` (lỗi cú pháp).
    - Trong số thập phân giữa số và dấu chấm: `3._1415` (lỗi cú pháp).
  - **Hợp lệ**:
    - Ví dụ: `3.141_5` (hợp lệ, nhưng không khuyến khích vì ít ý nghĩa).

- **Chuyển đổi từ chuỗi sang số**:
  - Dấu `_` chỉ dùng khi viết số trực tiếp trong mã nguồn.
  - Nếu số được lưu dưới dạng chuỗi (ví dụ: từ API), dấu `_` sẽ gây lỗi khi chuyển đổi sang số.
  - Ví dụ:
    ```javascript
    Number("230_000"); // NaN (không chuyển đổi được)
    parseInt("230_000"); // 230 (chỉ lấy phần trước dấu _)
    Number("230000"); // 230000 (đúng)
    ```
  - **Khuyến nghị**: Không sử dụng dấu `_` trong chuỗi số từ API hoặc dữ liệu bên ngoài để tránh lỗi chuyển đổi.

---

### 4. Tổng kết

- **Tách số bằng dấu phân cách (numeric separators)**:
  - Sử dụng dấu gạch dưới (`_`) để định dạng số lớn hoặc gán ý nghĩa cho các phần của số.
  - Giúp mã dễ đọc, đặc biệt với số lớn (hàng tỷ) hoặc số có đơn vị nhỏ (cent).
  - Công cụ JavaScript bỏ qua dấu `_`, chỉ nhận diện giá trị số thực.
- **Ứng dụng**:
  - Định dạng số lớn (ví dụ: `287_460_000_000`).
  - Phân tách đơn vị (ví dụ: `345_99` cho 345.99).
  - Gán ý nghĩa khác nhau cho số (ví dụ: `$15_00` vs. `$1_500`).
- **Hạn chế**:
  - Chỉ dùng trong mã nguồn, không dùng trong chuỗi số từ API.
  - Tuân thủ quy tắc đặt dấu `_` để tránh lỗi cú pháp.
