## Kế thừa Nguyên mẫu và Chuỗi Nguyên mẫu trong JavaScript

### Khái niệm cơ bản

- **Kế thừa nguyên mẫu (Prototypal Inheritance)**: Cơ chế cho phép các đối tượng kế thừa các thuộc tính và phương thức từ đối tượng khác thông qua thuộc tính `__proto__`.
- **Chuỗi nguyên mẫu (Prototype Chain)**: Một chuỗi các đối tượng được liên kết thông qua thuộc tính `__proto__`, cho phép truy cập các phương thức và thuộc tính từ các đối tượng cha.
- Mọi đối tượng trong JavaScript đều có một nguyên mẫu (prototype), trừ `Object.prototype` là điểm cuối của chuỗi nguyên mẫu.

### Kiểm tra nguyên mẫu của đối tượng

- Sử dụng thuộc tính `__proto__` để xem nguyên mẫu của một đối tượng.
  - Ví dụ: Với đối tượng `jonas`, `jonas.__proto__` trỏ đến `Person.prototype`, chứa các phương thức như `calcAge` và thuộc tính như `species`.
- Chuỗi nguyên mẫu tiếp tục với `jonas.__proto__.__proto__`, trỏ đến `Object.prototype`, chứa các phương thức như `hasOwnProperty`.
- Điểm cuối của chuỗi nguyên mẫu là `Object.prototype`, với `__proto__` là `null`.

### Thuộc tính constructor

- Thuộc tính `constructor` trong nguyên mẫu (prototype) của một hàm khởi tạo trỏ ngược lại chính hàm đó.
  - Ví dụ: `Person.prototype.constructor` trỏ đến hàm `Person`.
  - Để kiểm tra, sử dụng `console.dir(Person)` để xem chi tiết hàm khởi tạo.

### Nguyên mẫu của mảng

- Mảng trong JavaScript được tạo bởi hàm khởi tạo `Array`.
  - Ví dụ: `const arr = [1, 2, 3, 6, 9, 6, 9]` có `__proto__` trỏ đến `Array.prototype`.
- `Array.prototype` chứa các phương thức quen thuộc như `filter`, `map`, `find`, `findIndex`, v.v.
- Chuỗi nguyên mẫu của mảng:
  - `arr.__proto__` → `Array.prototype`
  - `arr.__proto__.__proto__` → `Object.prototype`
  - `arr.__proto__.__proto__.__proto__` → `null`

### Mở rộng chức năng của mảng

- Có thể thêm phương thức mới vào `Array.prototype` để tất cả mảng kế thừa.
  - Ví dụ: Thêm phương thức `unique` để lấy các giá trị duy nhất trong mảng:
    ```javascript
    Array.prototype.unique = function () {
      return [...new Set(this)];
    };
    ```
  - Sử dụng: `arr.unique()` trả về mảng chỉ chứa các giá trị duy nhất, ví dụ `[1, 2, 3, 6, 9]`.
- **Lưu ý**: Việc mở rộng nguyên mẫu của các đối tượng tích hợp sẵn (như `Array`) không được khuyến khích vì:
  - Phiên bản JavaScript mới có thể thêm phương thức trùng tên nhưng hoạt động khác, gây lỗi.
  - Trong môi trường làm việc nhóm, việc nhiều lập trình viên thêm cùng phương thức với cách triển khai khác nhau sẽ tạo ra lỗi.

### Nguyên mẫu của phần tử DOM

- Các phần tử DOM (như `h1`) là các đối tượng, có chuỗi nguyên mẫu riêng.
  - Ví dụ: `console.dir(document.querySelector('h1'))` cho thấy nguyên mẫu là `HTMLHeadingElement`.
  - Chuỗi nguyên mẫu tiếp tục: `HTMLHeadingElement` → `HTMLElement` → `Element` → `Node` → `EventTarget` → `Object.prototype` → `null`.
- Chuỗi nguyên mẫu này giải thích tại sao các phần tử DOM có thể sử dụng các phương thức như `addEventListener` (từ `EventTarget`).

### Nguyên mẫu của hàm

- Hàm trong JavaScript cũng là đối tượng, do đó có nguyên mẫu.
  - Ví dụ: `console.dir(function(){})` cho thấy nguyên mẫu chứa các phương thức như `apply`, `bind`, và `call`.
  - Lý do các hàm có thể gọi các phương thức này là vì chúng kế thừa từ `Function.prototype`.

### Ghi chú thêm

- Việc khám phá chuỗi nguyên mẫu là cách tốt để hiểu cách JavaScript tái sử dụng mã thông qua kế thừa nguyên mẫu.
- Để thực hành, bạn có thể kiểm tra nguyên mẫu của các đối tượng khác nhau trong console trình duyệt hoặc tham khảo tài liệu MDN (ví dụ: `Array.prototype.filter`).
- Tránh mở rộng nguyên mẫu của các đối tượng tích hợp sẵn trong các dự án thực tế để đảm bảo tính ổn định và khả năng bảo trì mã.
