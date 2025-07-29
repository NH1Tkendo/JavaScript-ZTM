# Ghi chú học tập: Lập trình hướng đối tượng với Hàm tạo (Constructor Functions)

## Giới thiệu về Hàm tạo (Constructor Functions)

### Khái niệm

- **Hàm tạo (Constructor Function)** là một hàm thông thường được sử dụng để tạo đối tượng một cách lập trình.
- Điểm khác biệt duy nhất so với hàm thông thường là hàm tạo được gọi với toán tử `new`.
- **Quy ước**: Tên hàm tạo luôn bắt đầu bằng chữ cái in hoa (ví dụ: `Person`, `Array`, `Map`).
- Chỉ sử dụng **function declaration** hoặc **function expression**, không dùng **arrow function** (vì arrow function không có `this` riêng).

### Quy trình hoạt động của toán tử `new`

Khi gọi hàm tạo với toán tử `new`, 4 bước sau được thực hiện:

1. Tạo một **đối tượng rỗng** (empty object).
2. Gọi hàm tạo, trong đó `this` trỏ tới đối tượng rỗng vừa tạo.
3. Liên kết đối tượng mới với **prototype** của hàm tạo.
4. Tự động trả về đối tượng đã được bổ sung các thuộc tính từ hàm tạo.

### Ví dụ: Tạo hàm tạo `Person`

```javascript
// Hàm tạo Person
const Person = function (firstName, birthYear) {
  // Gán thuộc tính cho đối tượng (instance properties)
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Tạo đối tượng mới với toán tử new
const jonas = new Person("Jonas", 1991);
console.log(jonas); // Kết quả: { firstName: 'Jonas', birthYear: 1991 }

// Tạo thêm các đối tượng
const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
```

### Ghi chú quan trọng

- **Thuộc tính instance (Instance Properties)**: Các thuộc tính như `firstName` và `birthYear` được tạo trên mỗi đối tượng (instance) từ hàm tạo.
- Mỗi đối tượng được tạo từ hàm tạo là một **instance** của hàm tạo đó.
- Có thể kiểm tra instance bằng toán tử `instanceof`:
  ```javascript
  console.log(jonas instanceof Person); // true
  const j = { name: "J" };
  console.log(j instanceof Person); // false
  ```

## Thêm phương thức (Methods) vào đối tượng

### Cách không nên làm

- Không nên định nghĩa phương thức trực tiếp trong hàm tạo vì lý do hiệu suất:
  - Mỗi instance sẽ chứa một bản sao của phương thức, gây lãng phí bộ nhớ nếu có nhiều instance.
  - Ví dụ (không nên làm):
    ```javascript
    const Person = function (firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
      // Không nên làm: định nghĩa phương thức trong hàm tạo
      this.calcAge = function () {
        console.log(2037 - this.birthYear);
      };
    };
    ```

### Giải pháp

- Sử dụng **prototype** và **kế thừa prototype (prototypal inheritance)** để định nghĩa phương thức, đảm bảo chỉ có một bản sao duy nhất của phương thức được chia sẻ giữa các instance.
- Nội dung về prototype sẽ được trình bày chi tiết trong bài học tiếp theo.

## Tổng kết

- Hàm tạo là một mẫu (blueprint) để tạo ra nhiều đối tượng với cấu trúc tương tự.
- Toán tử `new` là yếu tố cốt lõi, thực hiện 4 bước để tạo và trả về đối tượng.
- Tránh định nghĩa phương thức trong hàm tạo để tối ưu hiệu suất.
- Hàm tạo không phải là tính năng chính thức của JavaScript, mà là một mẫu (pattern) được sử dụng rộng rãi bởi các lập trình viên.

### Ghi chú thêm

- Hiểu rõ 4 bước của toán tử `new` là rất quan trọng.
- Tiếp theo, cần tìm hiểu về **prototype** và **kế thừa prototype** để hoàn thiện kiến thức về lập trình hướng đối tượng trong JavaScript.
