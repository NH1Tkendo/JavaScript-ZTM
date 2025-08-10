## Viết Code JavaScript Hiện Đại và Sạch

### Mục tiêu

![Clean code part 1](/md_assets/Cleancode-P1.png)

![Clean code part 2](/md_assets/Cleancode-P2.png)

- Tổng hợp các kỹ thuật và thực hành viết code JavaScript hiện đại, sạch, dễ đọc.
- Đảm bảo code dễ hiểu, dễ bảo trì, và phù hợp với các tiêu chuẩn lập trình hiện đại.
- Áp dụng các nguyên tắc lập trình hàm (functional programming) và hướng đối tượng (OOP).

### 1. Viết code dễ đọc (Readable Code)

- **Mục tiêu**: Viết code dễ hiểu cho người khác và chính bản thân trong tương lai.
- **Nguyên tắc**:
  - Tránh viết các giải pháp quá phức tạp hoặc "thông minh" để gây ấn tượng, vì điều này làm code khó đọc.
  - Ưu tiên các giải pháp đơn giản, dễ hiểu (straightforward solutions).
  - Đặt tên biến (variables) và hàm (functions) mang tính mô tả rõ ràng:
    - Biến: Phản ánh nội dung của biến (VD: `userName` thay vì `x`).
    - Hàm: Phản ánh chức năng của hàm (VD: `calculateTotalPrice` thay vì `calc`).

### 2. Quy tắc chung để viết code sạch

- **Nguyên tắc DRY (Don't Repeat Yourself)**:
  - Tái cấu trúc (refactor) code để tránh lặp lại logic.
- **Tránh ô nhiễm không gian toàn cục (global namespace)**:
  - Đóng gói (encapsulate) dữ liệu vào hàm, lớp (classes), hoặc mô-đun (modules).
- **Sử dụng `const` và `let`, tránh `var`**:
  - Dùng `const` cho các giá trị không thay đổi.
  - Dùng `let` cho các biến cần thay đổi.
  - Không sử dụng `var` vì dễ gây lỗi và khó quản lý.
- **Kiểm tra kiểu nghiêm ngặt (strict type checks)**:
  - Sử dụng toán tử `===` thay vì `==` để kiểm tra cả giá trị và kiểu dữ liệu.

### 3. Viết hàm (Functions)

- **Nguyên tắc chính**: Mỗi hàm chỉ nên thực hiện một nhiệm vụ duy nhất.
  - Giữ hàm nhỏ, tập trung, và làm tốt một việc.
- **Giới hạn tham số (parameters)**:
  - Không sử dụng quá 3 tham số trong một hàm.
  - Nếu hàm cần nhiều tham số, có thể hàm đang làm quá nhiều việc.
- **Sử dụng tham số mặc định (default parameters)**:
  - Đặt giá trị mặc định khi phù hợp để tăng tính linh hoạt.
- **Trả về cùng kiểu dữ liệu (data type)**:
  - Nếu hàm nhận số (numbers) làm đầu vào, trả về số ở đầu ra để đảm bảo tính nhất quán.
- **Sử dụng hàm mũi tên (arrow functions)**:
  - Sử dụng khi làm code dễ đọc hơn, đặc biệt trong các hàm gọi lại (callback functions) của phương thức mảng (array methods).
  - Tránh lạm dụng nếu làm code khó hiểu.
  - **Lưu ý**: Không sử dụng hàm mũi tên trong phương thức của đối tượng thông thường (regular objects), vì sẽ mất quyền truy cập từ khóa `this`.

### 4. Lập trình hướng đối tượng (Object-Oriented Programming - OOP)

- **Sử dụng lớp ES6 (ES6 classes)**:
  - Là cách hiện đại để triển khai OOP trong JavaScript.
- **Đóng gói dữ liệu (encapsulation)**:
  - Ẩn dữ liệu không cần truy cập từ bên ngoài để tránh thay đổi ngoài ý muốn.
  - Cung cấp API công khai (public API) thông qua các phương thức để thao tác dữ liệu.
- **Chuỗi phương thức (method chaining)**:
  - Triển khai chuỗi phương thức khi phù hợp để tăng tính tiện dụng.
  - Ví dụ: `obj.method1().method2()`.
- **Tránh hàm mũi tên trong phương thức đối tượng**:
  - Sử dụng hàm thông thường (regular functions) để đảm bảo từ khóa `this` hoạt động đúng.

### 5. Tránh code lồng nhau (Nested Code)

- **Vấn đề**: Code lồng nhau (code blocks trong code blocks) làm giảm tính dễ đọc.
- **Giải pháp**:
  - **Sử dụng điều kiện bảo vệ (guard clauses)**:
    - Thoát sớm (early return) nếu điều kiện không thỏa mãn.
    - Ví dụ:
      ```javascript
      if (!condition) return;
      // Tiếp tục logic
      ```
  - **Sử dụng toán tử ba ngôi (ternary operator)** hoặc toán tử logic (logical operators) thay cho câu lệnh `if`.
  - Sử dụng nhiều câu `if` riêng lẻ thay vì `if-else` lồng nhau để tăng tính rõ ràng.
- **Tránh vòng lặp truyền thống (for loops)**:
  - Thay bằng các phương thức mảng như `map`, `filter`, `reduce` để viết code ngắn gọn, dễ đọc.

### 6. Code bất đồng bộ (Asynchronous Code)

- **Ưu tiên async/await**:
  - Sử dụng `async/await` để xử lý Promise thay vì `.then()` và `.catch()`, vì cách này tránh code lồng nhau và dễ đọc hơn.
- **Chạy Promise song song**:
  - Sử dụng `Promise.all` để chạy các Promise không phụ thuộc lẫn nhau đồng thời, cải thiện hiệu suất.
  - Ví dụ:
    ```javascript
    const [data1, data2] = await Promise.all([fetchData1(), fetchData2()]);
    ```
- **Xử lý lỗi (error handling)**:
  - Luôn xử lý lỗi và Promise bị từ chối (rejections) để đảm bảo code đáng tin cậy.

### 7. Thực hành

- Các nguyên tắc trên sẽ được áp dụng trong bài giảng tiếp theo để sửa một ví dụ code xấu, không tuân thủ các thực hành hiện đại.

### Ghi chú thêm

- Các kỹ thuật này được tổng hợp từ toàn bộ khóa học, giúp bạn có cái nhìn tổng quan và tập trung.
- Hãy ưu tiên tính đơn giản, rõ ràng và khả năng bảo trì khi viết code.
- Thực hành thường xuyên để hình thành thói quen viết code sạch và hiện đại.
