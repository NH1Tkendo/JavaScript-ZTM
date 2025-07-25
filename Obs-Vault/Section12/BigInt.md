**Ghi chú học tập: Kiểu dữ liệu BigInt trong JavaScript**

**1. Giới thiệu về BigInt**

- **BigInt** là một kiểu dữ liệu nguyên thủy (primitive data type) được giới thiệu vào năm 2020.
- Cho phép lưu trữ và xử lý các số nguyên lớn (large integers) mà không bị giới hạn bởi kích thước của kiểu số thông thường trong JavaScript.

**2. Giới hạn của kiểu số thông thường**

- Trong JavaScript, các số được biểu diễn bằng 64 bit, trong đó:
  - 53 bit được sử dụng để lưu trữ giá trị số (digits).
  - Phần còn lại lưu trữ vị trí dấu chấm thập phân (decimal point) và dấu (sign).
- Giới hạn kích thước số:
  - Số lớn nhất có thể biểu diễn an toàn (safely represent) là `2^53 - 1`.
  - Được lưu trong hằng số `Number.MAX_SAFE_INTEGER`.
- Các số lớn hơn `Number.MAX_SAFE_INTEGER` được coi là không an toàn (unsafe numbers), có thể dẫn đến mất độ chính xác (lose precision) trong các phép tính.
  - Ví dụ: `Number.MAX_SAFE_INTEGER + 1` có thể không chính xác do giới hạn biểu diễn.

**3. Vai trò của BigInt**

- **BigInt** cho phép lưu trữ và xử lý các số nguyên lớn hơn giới hạn của kiểu số thông thường.
- Ứng dụng:
  - Xử lý ID cơ sở dữ liệu (database IDs).
  - Tương tác với các số 64-bit từ các ngôn ngữ lập trình khác hoặc API.
- **BigInt** không có giới hạn kích thước, có thể biểu diễn các số nguyên lớn tùy ý.

**4. Cách tạo BigInt**

- Có hai cách để tạo giá trị BigInt:
  1. Thêm hậu tố `n` vào số nguyên:
     ```javascript
     const bigNumber = 1234567890123456789012345678901234567890n;
     ```
     - Hậu tố `n` chuyển đổi số thông thường thành BigInt.
  2. Sử dụng hàm khởi tạo `BigInt()`:
     ```javascript
     const bigNumber = BigInt("1234567890123456789012345678901234567890");
     ```
     - Lưu ý: Nên sử dụng với các số nhỏ để tránh vấn đề biểu diễn nội bộ trước khi chuyển đổi.

**5. Các phép toán với BigInt**

- **Phép toán cơ bản**:
  - Các toán tử thông thường (`+`, `-`, `*`, `/`, `**`) hoạt động bình thường với BigInt.
  - Ví dụ:
    ```javascript
    const result = 10000n + 10000n; // Kết quả: 20000n
    const huge = 12345678901234567890n * 10n; // Kết quả chính xác
    ```
- **Hạn chế**:
  - Không thể kết hợp BigInt với số thông thường (regular numbers) trong các phép toán số học.
    - Ví dụ: `huge * 23` sẽ gây lỗi (`cannot mix BigInt and other types`).
    - Giải pháp: Chuyển đổi số thông thường thành BigInt bằng `BigInt()`:
      ```javascript
      const num = BigInt(23);
      const result = huge * num; // Hoạt động bình thường
      ```
- **Ngoại lệ**:
  1. **Toán tử so sánh** (`>`, `<`, `>=`, `<=`):
     - Có thể so sánh BigInt với số thông thường.
     - Ví dụ: `20n > 10` trả về `true`.
  2. **Toán tử cộng chuỗi** (`+`):
     - BigInt được chuyển thành chuỗi khi nối với chuỗi.
     - Ví dụ: `123n + " is big"` trả về `"123 is big"`.
  3. **Toán tử so sánh bằng**:
     - `===` trả về `false` khi so sánh BigInt với số thông thường vì chúng có kiểu khác nhau.
     - `==` trả về `true` do JavaScript thực hiện ép kiểu (type coercion).
       ```javascript
       console.log(20n === 20); // false
       console.log(20n == 20); // true
       ```

**6. Các lưu ý về BigInt**

- **Phép chia**:
  - BigInt chỉ biểu diễn số nguyên, vì vậy kết quả của phép chia sẽ được làm tròn xuống số nguyên gần nhất.
  - Ví dụ:
    ```javascript
    console.log(10n / 3n); // 3n (làm tròn xuống, bỏ phần thập phân)
    console.log(12n / 3n); // 4n
    ```
- **Hàm toán học**:
  - Các hàm toán học như `Math.sqrt()` không hoạt động với BigInt.
  - Ví dụ: `Math.sqrt(16n)` sẽ gây lỗi.

**7. Ứng dụng thực tế**

- BigInt hữu ích khi làm việc với các số rất lớn, ví dụ:
  - Xử lý ID lớn trong cơ sở dữ liệu.
  - Tích hợp với API trả về số lớn hơn `Number.MAX_SAFE_INTEGER`.
- Trong thực tế, BigInt không được sử dụng thường xuyên nhưng cần biết để xử lý các trường hợp đặc biệt.

**8. Kết luận**

- **BigInt** là một bổ sung quan trọng cho JavaScript, giúp xử lý số nguyên lớn một cách chính xác.
- Hiểu cách tạo và sử dụng BigInt, cũng như các hạn chế của nó, là cần thiết để làm việc với các ứng dụng yêu cầu độ chính xác cao với số lớn.
