**Ghi chú học tập: Xử lý ngày và giờ trong JavaScript**

**1. Tổng quan về ngày và giờ trong JavaScript**

- Ngày và giờ (dates and times) là một loại dữ liệu quan trọng trong các ứng dụng thực tế.
- Xử lý ngày và giờ trong JavaScript có thể phức tạp, nhưng các khái niệm cơ bản sẽ được trình bày rõ ràng trong ghi chú này.

**2. Tạo đối tượng ngày (Date)**

- JavaScript sử dụng hàm khởi tạo `new Date()` để tạo đối tượng ngày.
- Có 4 cách chính để tạo đối tượng `Date`:

  1. **Tạo ngày hiện tại**:

     ```javascript
     const now = new Date();
     ```

     - Trả về ngày và giờ hiện tại tại thời điểm gọi.
     - Ví dụ: `Sun Aug 02 2020 12:34:56 GMT+0000`.

  2. **Phân tích từ chuỗi ngày (parsing from a date string)**:

     ```javascript
     const date = new Date("December 24, 2015");
     ```

     - JavaScript tự động phân tích chuỗi ngày (date string) để tạo đối tượng `Date`.
     - Lưu ý: Việc tự viết chuỗi ngày có thể không đáng tin cậy (unreliable). Tuy nhiên, nếu chuỗi được tạo bởi JavaScript (ví dụ: từ API hoặc dữ liệu nội bộ), thì an toàn hơn.
     - Ví dụ: Phân tích từ `account1.movementsDates[0]` sẽ đáng tin cậy vì chuỗi được tạo bởi JavaScript.

  3. **Truyền tham số cụ thể (năm, tháng, ngày, giờ, phút, giây)**:

     ```javascript
     const date = new Date(2037, 10, 19, 15, 23, 5);
     ```

     - Tham số: năm (year), tháng (month), ngày (day), giờ (hour), phút (minute), giây (second).
     - Lưu ý: Tháng trong JavaScript là **zero-based** (từ 0 đến 11). Ví dụ: `10` tương ứng với tháng 11 (November).
     - JavaScript tự động điều chỉnh (autocorrect) nếu ngày không hợp lệ:
       - Ví dụ: `new Date(2037, 10, 31)` (31/11 không tồn tại) sẽ trả về `01/12/2037`.
       - Ví dụ: `new Date(2037, 10, 33)` sẽ trả về `03/12/2037`.

  4. **Sử dụng dấu thời gian (timestamp)**:
     ```javascript
     const date = new Date(0);
     ```
     - Truyền số mili-giây (milliseconds) từ thời điểm Unix (01/01/1970, 00:00:00 UTC).
     - Ví dụ: `new Date(0)` trả về `Thu Jan 01 1970 00:00:00 GMT+0000`.
     - Để tính dấu thời gian cho một khoảng thời gian cụ thể (ví dụ: 3 ngày sau):
       ```javascript
       const threeDaysLater = new Date(3 * 24 * 60 * 60 * 1000);
       ```
       - Công thức: `số ngày * 24 giờ * 60 phút * 60 giây * 1000 mili-giây`.
       - Kết quả: `Sun Jan 04 1970`.

**3. Đặc điểm của đối tượng Date**

- Đối tượng `Date` là một loại đối tượng đặc biệt (special type of object) trong JavaScript, có các phương thức để làm việc với ngày và giờ.
- Một số lưu ý:
  - Chuỗi ngày có ký hiệu `Z` (ví dụ: `2020-08-02T12:34:56Z`) biểu thị thời gian UTC (Giờ Phối hợp Quốc tế), không thuộc múi giờ cụ thể và không chịu ảnh hưởng của giờ tiết kiệm ánh sáng (daylight savings).

**4. Các phương thức làm việc với Date**

- **Lấy thông tin từ đối tượng Date**:

  - `getFullYear()`: Lấy năm (4 chữ số). Ví dụ: `future.getFullYear()` trả về `2037`.
    - Lưu ý: Không sử dụng `getYear()` (phương thức lỗi thời).
  - `getMonth()`: Lấy tháng (0-11). Ví dụ: `10` là tháng 11.
  - `getDate()`: Lấy ngày trong tháng (1-31).
  - `getDay()`: Lấy thứ trong tuần (0-6, 0 là Chủ nhật, 4 là Thứ năm).
  - `getHours()`, `getMinutes()`, `getSeconds()`: Lấy giờ, phút, giây.
  - `toISOString()`: Chuyển đối tượng `Date` thành chuỗi theo chuẩn ISO.
    - Ví dụ: `2020-08-02T12:34:56Z`.
    - Ứng dụng: Lưu trữ ngày dưới dạng chuỗi trong cơ sở dữ liệu hoặc API.
  - `getTime()`: Lấy dấu thời gian (timestamp) tính bằng mili-giây từ 01/01/1970.
    - Ví dụ: `future.getTime()` trả về số mili-giây từ 01/01/1970 đến ngày `future`.
    - Có thể sử dụng dấu thời gian này để tạo lại ngày: `new Date(timestamp)`.

- **Lấy dấu thời gian hiện tại**:

  - `Date.now()`: Trả về dấu thời gian của thời điểm hiện tại mà không cần tạo đối tượng `Date`.
    ```javascript
    const timestamp = Date.now();
    ```

- **Cập nhật thông tin trong đối tượng Date**:
  - `setFullYear(year)`: Cập nhật năm.
    - Ví dụ: `future.setFullYear(2040)` chuyển ngày thành `19/11/2040`.
  - Các phương thức tương tự: `setMonth()`, `setDate()`, `setHours()`, `setMinutes()`, `setSeconds()`.
  - Tự động điều chỉnh nếu giá trị không hợp lệ (giống khi tạo `Date`).

**5. Ứng dụng thực tế**

- Các phương thức trên được sử dụng để:
  - Xử lý và hiển thị ngày/giờ trong ứng dụng (ví dụ: ứng dụng ngân hàng).
  - Lưu trữ và truy xuất ngày từ cơ sở dữ liệu.
  - Tính toán khoảng thời gian (dựa trên dấu thời gian).
- Trong bài tiếp theo, các kiến thức này sẽ được áp dụng để thêm tính năng ngày/giờ vào ứng dụng ngân hàng (banking application).

**6. Kết luận**

- JavaScript cung cấp nhiều cách để tạo và làm việc với ngày/giờ thông qua đối tượng `Date`.
- Hiểu các phương thức `get` và `set`, cùng với dấu thời gian (timestamp), là cần thiết để xử lý ngày/giờ một cách hiệu quả.
- Lưu ý về các đặc điểm như tháng zero-based và tự động điều chỉnh ngày để tránh lỗi khi lập trình.
