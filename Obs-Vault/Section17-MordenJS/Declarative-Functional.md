# Ghi chú học tập: Lập trình khai báo và lập trình chức năng trong JavaScript

## Lập trình khai báo và lập trình mệnh lệnh

### Khái niệm
- **Lập trình mệnh lệnh (Imperative Programming)**:
  - Lập trình viên hướng dẫn máy tính từng bước cụ thể để đạt được kết quả.
  - Ví dụ thực tế: Cung cấp công thức chi tiết để nướng bánh, chỉ định từng bước (trộn bột, nướng ở 180°C, v.v.).
  - Trong mã code: Mô tả chi tiết cách thực hiện, bao gồm tạo mảng rỗng, khởi tạo biến đếm, lặp qua mảng, và lưu kết quả.

- **Lập trình khai báo (Declarative Programming)**:
  - Lập trình viên chỉ mô tả **kết quả mong muốn** mà không chỉ định chi tiết cách thực hiện.
  - Ví dụ thực tế: Mô tả chiếc bánh cần làm (hình dạng, hương vị), để người thực hiện tự tìm cách làm.
  - Trong mã code: Sử dụng các phương thức có sẵn (như `map`) để mô tả kết quả mà không cần chỉ định từng bước.

### Ví dụ minh họa: Nhân đôi giá trị trong mảng
- **Mã mệnh lệnh**:
  ```javascript
  const arr = [1, 2, 3];
  const doubled = [];
  for (let i = 0; i < arr.length; i++) {
    doubled[i] = arr[i] * 2;
  }
  ```
  - Mô tả chi tiết: Tạo mảng rỗng, khởi tạo biến đếm, lặp qua mảng, nhân đôi và lưu kết quả.

- **Mã khai báo**:
  ```javascript
  const arr = [1, 2, 3];
  const doubled = arr.map(num => num * 2);
  ```
  - Mô tả kết quả: Ánh xạ mảng gốc thành mảng mới với mỗi phần tử được nhân đôi.
  - Các bước như tạo mảng rỗng, quản lý biến đếm được ẩn đi (trừu tượng hóa).

### Lợi ích của lập trình khai báo
- Code ngắn gọn, dễ đọc, dễ bảo trì.
- Ẩn đi các bước xử lý phức tạp, tập trung vào **kết quả**.
- Phù hợp với xu hướng lập trình JavaScript hiện đại.

## Lập trình chức năng (Functional Programming)

### Khái niệm
- Là một nhánh của lập trình khai báo, dựa trên:
  - Kết hợp các **hàm thuần túy (pure functions)**.
  - Tránh **tác dụng phụ (side effects)** và **thay đổi dữ liệu (mutating data)**.
- Mục tiêu: Tạo mã dễ đọc, ít lỗi, dễ theo dõi luồng dữ liệu.

### Các khái niệm quan trọng
- **Tác dụng phụ (Side Effects)**:
  - Thay đổi dữ liệu bên ngoài hàm, ví dụ:
    - Thay đổi biến toàn cục.
    - Ghi log vào console.
    - Thay đổi DOM.
  - Gây khó khăn trong việc dự đoán hành vi chương trình.

- **Hàm thuần túy (Pure Function)**:
  - Không gây tác dụng phụ.
  - Không phụ thuộc vào biến bên ngoài.
  - Với cùng đầu vào, luôn trả về cùng đầu ra.
  - Ví dụ:
    ```javascript
    function add(a, b) {
      return a + b; // Hàm thuần túy: Không thay đổi dữ liệu ngoài
    }
    ```

- **Tính bất biến (Immutability)**:
  - Dữ liệu (trạng thái) không được sửa đổi trực tiếp.
  - Thay vì sửa, tạo bản sao của dữ liệu và thực hiện thay đổi trên bản sao.
  - Ví dụ:
    ```javascript
    const state = { count: 1 };
    const newState = { ...state, count: state.count + 1 }; // Bản sao mới
    ```
  - Lợi ích: Dễ theo dõi luồng dữ liệu, giảm lỗi.

### Ứng dụng trong JavaScript
- Các thư viện như **React** và **Redux** sử dụng tính bất biến và các nguyên tắc chức năng.
- Các phương thức chức năng phổ biến:
  - `map`: Ánh xạ mảng thành mảng mới.
  - `filter`: Lọc phần tử theo điều kiện.
  - `reduce`: Gộp mảng thành một giá trị.
  - Ví dụ:
    ```javascript
    const numbers = [1, 2, 3, 4];
    const evenNumbers = numbers.filter(num => num % 2 === 0); // [2, 4]
    const sum = numbers.reduce((acc, num) => acc + num, 0); // 10
    ```

### Cách áp dụng lập trình chức năng
- **Tránh thay đổi dữ liệu**:
  - Sử dụng bản sao thay vì sửa trực tiếp.
  - Ví dụ: Sử dụng spread operator (`...`) để tạo bản sao mảng hoặc đối tượng.

- **Ưu tiên phương thức không gây tác dụng phụ**:
  - Sử dụng `map`, `filter`, `reduce` thay vì vòng lặp `for` hoặc `forEach`.

- **Viết hàm tránh tác dụng phụ**:
  - Không sửa biến ngoài phạm vi hàm.
  - Không thực hiện thao tác như ghi log hoặc cập nhật DOM trong hàm xử lý dữ liệu.

### Cú pháp khai báo
- Sử dụng các tính năng JavaScript hiện đại để tăng tính khai báo:
  - **Phân rã mảng/đối tượng (Array/Object Destructuring)**:
    ```javascript
    const [first, second] = [1, 2]; // Phân rã mảng
    const { name, age } = { name: "John", age: 30 }; // Phân rã đối tượng
    ```
  - **Toán tử spread (`...`)**:
    ```javascript
    const arr1 = [1, 2];
    const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
    ```
  - **Toán tử ba ngôi (Ternary Operator)**:
    ```javascript
    const isAdult = age >= 18 ? "Adult" : "Minor";
    ```
  - **Chuỗi mẫu (Template Literals)**:
    ```javascript
    const greeting = `Hello, ${name}!`; // Dễ đọc hơn nối chuỗi
    ```

## Ghi chú thêm
- Lập trình chức năng khó triển khai toàn diện, nhưng có thể áp dụng từng phần.
- Kết hợp cả lập trình mệnh lệnh và khai báo để cân bằng giữa tính linh hoạt và dễ đọc.
- Các nguyên tắc như hàm thuần túy, tính bất biến, và tránh tác dụng phụ giúp:
  - Tăng tính dễ đọc và bảo trì mã.
  - Giảm lỗi trong ứng dụng phức tạp.
  - Phù hợp với các thư viện/framework hiện đại (React, Redux).

## Hành động tiếp theo
- Áp dụng các nguyên tắc chức năng vào ví dụ mã từ bài giảng trước.
- Thực hành sử dụng `map`, `filter`, `reduce` và các cú pháp khai báo (`...`, ternary, template literals) trong dự án thực tế.