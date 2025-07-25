#### 1. Tổng Quan về Số trong JavaScript

- Trong JavaScript, tất cả các số được biểu diễn bên trong dưới dạng số thực dấu phẩy động (floating point numbers). Điều này có nghĩa là các số luôn là số thập phân (decimals), bất kể bạn viết chúng dưới dạng số nguyên (integers) hay số thập phân.
  - Ví dụ: `23` tương đương với `23.0`.
- Các số được lưu trữ trong định dạng nhị phân 64-bit (64 base 2 format), chỉ bao gồm các số 0 và 1.
- Hạn chế: Một số phân số dễ biểu diễn trong hệ cơ số 10 (base 10, số từ 0-9) nhưng khó biểu diễn trong hệ nhị phân (base 2). Ví dụ:
  - `0.1 + 0.2` không cho kết quả chính xác là `0.3` mà là một số thập phân dài như `0.30000000000000004` do cách biểu diễn nhị phân.
  - Điều này dẫn đến các phép tính không chính xác trong một số trường hợp, đặc biệt với các phép tính khoa học hoặc tài chính cần độ chính xác cao.
- Hiện tượng này không chỉ xảy ra ở JavaScript mà còn ở các ngôn ngữ khác như PHP hoặc Ruby, do sử dụng cùng hệ thống biểu diễn số thực dấu phẩy động.

**Lưu ý**: Không nên sử dụng JavaScript cho các phép tính khoa học hoặc tài chính yêu cầu độ chính xác cao do hạn chế này.

#### 2. Chuyển Đổi Giá Trị Thành Số

- **Chuyển đổi chuỗi thành số**:

  - Sử dụng hàm `Number()`:
    ```javascript
    Number("23"); // Kết quả: 23 (số)
    ```
  - Cách đơn giản hơn: Sử dụng toán tử `+` để thực hiện ép kiểu (type coercion):
    ```javascript
    +"23"; // Kết quả: 23 (số)
    ```
  - Lợi ích của toán tử `+`: Mã ngắn gọn và rõ ràng hơn, đặc biệt khi thay thế `Number()` trong dự án.
    - Ví dụ: Trong dự án Bankist, có thể thay tất cả `Number()` bằng `+` để làm mã sạch hơn.

- **Phân tích số từ chuỗi (Parsing)**:

  - Sử dụng các phương thức của đối tượng `Number`:

    - `Number.parseInt(string, radix)`: Phân tích số nguyên (integer) từ chuỗi.
      - `radix`: Cơ số của hệ thống số (thường là 10 cho hệ cơ số 10).
      - Ví dụ:
        ```javascript
        Number.parseInt("30px", 10); // Kết quả: 30 (số)
        Number.parseInt("px30", 10); // Kết quả: NaN (chuỗi phải bắt đầu bằng số)
        ```
      - Ứng dụng: Loại bỏ các ký hiệu không phải số (như `px` trong CSS).
    - `Number.parseFloat(string, radix)`: Phân tích số thực (floating point number) từ chuỗi.
      - Ví dụ:
        ```javascript
        Number.parseFloat("2.5rem", 10); // Kết quả: 2.5 (số)
        Number.parseInt("2.5rem", 10); // Kết quả: 2 (chỉ lấy phần nguyên)
        ```
      - Lưu ý: Chuỗi có thể chứa khoảng trắng, nhưng phải bắt đầu bằng số.

  - **Ghi chú về không gian tên (namespace)**:
    - Các hàm `parseInt` và `parseFloat` có thể được gọi trực tiếp (kiểu cũ) hoặc thông qua `Number` (cách hiện đại).
    - Cách hiện đại (`Number.parseInt`, `Number.parseFloat`) được khuyến khích vì cung cấp không gian tên rõ ràng.

#### 3. Kiểm Tra Giá Trị Có Phải Là Số

- **Phương thức `Number.isNaN(value)`**:

  - Kiểm tra xem giá trị có phải là `NaN` (Not a Number) hay không.
  - Ví dụ:
    ```javascript
    Number.isNaN(20); // Kết quả: false (20 là số)
    Number.isNaN(+"20px"); // Kết quả: true (chuyển đổi thất bại, tạo ra NaN)
    Number.isNaN(23 / 0); // Kết quả: false (vì 23/0 cho `Infinity`, không phải NaN)
    ```
  - Hạn chế: Không kiểm tra được các giá trị như `Infinity`.

- **Phương thức `Number.isFinite(value)`**:

  - Kiểm tra xem giá trị có phải là số hợp lệ (finite number) hay không.
  - Là phương thức tốt nhất để kiểm tra một giá trị có phải là số thực hay không.
  - Ví dụ:
    ```javascript
    Number.isFinite(20); // Kết quả: true
    Number.isFinite("20"); // Kết quả: false (chuỗi không phải số)
    Number.isFinite(+"20px"); // Kết quả: false (NaN)
    Number.isFinite(23 / 0); // Kết quả: false (Infinity không phải số hợp lệ)
    ```

- **Phương thức `Number.isInteger(value)`**:
  - Kiểm tra xem giá trị có phải là số nguyên hay không.
  - Ví dụ:
    ```javascript
    Number.isInteger(20); // Kết quả: true
    Number.isInteger(20.0); // Kết quả: true (20.0 là số nguyên)
    Number.isInteger(20.5); // Kết quả: false
    ```

**Khuyến nghị**:

- Sử dụng `Number.isFinite()` để kiểm tra xem một giá trị có phải là số hợp lệ.
- Sử dụng `Number.isInteger()` nếu cần kiểm tra số nguyên.
- Tránh sử dụng `Number.isNaN()` trừ khi cần kiểm tra cụ thể giá trị `NaN`.

#### 4. Ứng Dụng trong Dự Án Bankist

- Dữ liệu khởi tạo trong dự án đã được cập nhật:
  - Chỉ còn hai tài khoản.
  - Mỗi tài khoản có thêm mảng chứa ngày giao dịch (dates of movements), thuộc tính tiền tệ (currency) và thuộc tính khu vực (locale).
- Trong dự án này, không cần kiểm tra xem đầu vào có phải là số hay không, nhưng kiến thức về `Number.isFinite` và `Number.parseFloat` rất hữu ích cho các trường hợp:
  - Đọc giá trị số từ chuỗi (ví dụ: đơn vị CSS như `px` hoặc `rem`).
  - Đảm bảo mã sạch hơn bằng cách sử dụng toán tử `+` thay cho `Number()`.

#### 5. Tóm Tắt

- Số trong JavaScript được biểu diễn dưới dạng số thực dấu phẩy động (floating point numbers) trong hệ nhị phân, dẫn đến một số hạn chế về độ chính xác.
- Chuyển đổi chuỗi thành số:
  - Dùng toán tử `+` hoặc `Number()` cho chuyển đổi đơn giản.
  - Dùng `Number.parseInt` và `Number.parseFloat` để phân tích số từ chuỗi, đặc biệt khi có ký hiệu (như `px`, `rem`).
- Kiểm tra giá trị số:
  - `Number.isFinite`: Tốt nhất để kiểm tra số hợp lệ.
  - `Number.isInteger`: Kiểm tra số nguyên.
  - `Number.isNaN`: Chỉ dùng để kiểm tra giá trị `NaN`.
- Ứng dụng: Thay thế `Number()` bằng `+` trong dự án để mã gọn gàng hơn; sử dụng `parseFloat` khi làm việc với CSS hoặc dữ liệu chuỗi.

**Lưu ý**: Các phương pháp này sẽ được sử dụng nhiều hơn trong các bài giảng sau của khóa học.
