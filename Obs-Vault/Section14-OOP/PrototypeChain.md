# Ghi Chú Học Tập: Nguyên Lý Hoạt Động của Constructor Function và Prototype Chain trong JavaScript

## Tổng Quan về Constructor Function và Prototype

### Khái Niệm Cơ Bản

- **Constructor Function (Hàm tạo)**: Hàm đặc biệt dùng để tạo và khởi tạo các đối tượng với các thuộc tính và phương thức chung.
- **Prototype (Nguyên mẫu)**: Mỗi constructor function có một thuộc tính `prototype`, là một đối tượng chứa các phương thức và thuộc tính được chia sẻ cho tất cả các đối tượng được tạo từ hàm tạo đó.
- **Prototype Chain (Chuỗi nguyên mẫu)**: Cơ chế cho phép các đối tượng truy cập các thuộc tính/phương thức từ nguyên mẫu của chúng, theo một chuỗi liên kết.

### Cấu Trúc của Constructor Function

- **Thuộc tính prototype**:
  - Là một đối tượng chứa các phương thức (ví dụ: `calcAge`) được định nghĩa để các đối tượng tạo ra từ constructor function kế thừa.
  - Có thuộc tính `constructor` trỏ ngược lại hàm tạo (ví dụ: `Person.prototype.constructor` trỏ về `Person`).
- **Lưu ý**: `Person.prototype` không phải là nguyên mẫu của `Person`, mà là nguyên mẫu của các đối tượng được tạo từ `Person`.

### Quy Trình Tạo Đối Tượng với Toán Tử `new`

1. **Tạo đối tượng rỗng**: Khi gọi hàm tạo với toán tử `new`, một đối tượng rỗng được tạo ngay lập tức.
2. **Gán `this`**: Trong ngữ cảnh thực thi của hàm, `this` trỏ tới đối tượng rỗng vừa tạo, cho phép gán các thuộc tính (như `name`, `birthYear`) cho đối tượng.
3. **Liên kết với prototype**:
   - Đối tượng mới được liên kết với `Person.prototype` thông qua thuộc tính `__proto__`.
   - `__proto__` của đối tượng trỏ tới `Person.prototype`, xác định nguyên mẫu của đối tượng.
4. **Trả về đối tượng**: Hàm tạo tự động trả về đối tượng mới, trừ khi có lệnh `return` rõ ràng khác.

### Ví dụ

```javascript
function Person(name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
  return 2025 - this.birthYear;
};

const jonas = new Person("Jonas", 1990);
console.log(jonas.__proto__ === Person.prototype); // true
console.log(jonas.calcAge()); // 35
```

## Prototype Chain (Chuỗi Nguyên Mẫu)

![Chain](/md_assets/Chain.png)

### Khái Niệm

- **Prototype Chain**: Chuỗi liên kết giữa các đối tượng và nguyên mẫu của chúng, cho phép JavaScript tìm kiếm thuộc tính/phương thức từ đối tượng hiện tại lên các nguyên mẫu cha.
- Tương tự **scope chain** (chuỗi phạm vi), nhưng thay vì tìm biến trong các phạm vi, prototype chain tìm thuộc tính/phương thức trong các nguyên mẫu.

### Cách Hoạt Động

- Khi gọi một phương thức (như `jonas.calcAge()`), JavaScript:
  1. Kiểm tra phương thức có tồn tại trực tiếp trên đối tượng (`jonas`) hay không.
  2. Nếu không tìm thấy, JavaScript tìm trong nguyên mẫu của đối tượng (`Person.prototype`) thông qua `__proto__`.
  3. Nếu vẫn không tìm thấy, tiếp tục tìm trong nguyên mẫu của nguyên mẫu (`Object.prototype`), cho đến khi gặp `null` (kết thúc chuỗi).

### Ví dụ về Prototype Chain

- Gọi `jonas.hasOwnProperty('name')`:
  - JavaScript không tìm thấy `hasOwnProperty` trên `jonas`.
  - Tìm trong `Person.prototype` → không có.
  - Tìm trong `Object.prototype` → tìm thấy `hasOwnProperty` (phương thức tích hợp sẵn).
  - Phương thức được thực thi như thể thuộc về `jonas`, nhưng thực chất được kế thừa qua chuỗi nguyên mẫu.

### Cấu Trúc Prototype Chain

- **Đối tượng `jonas`**:
  - `__proto__` trỏ tới `Person.prototype`.
- **Person.prototype**:
  - Là một đối tượng, nên cũng có `__proto__` trỏ tới `Object.prototype`.
- **Object.prototype**:
  - Là đỉnh của chuỗi nguyên mẫu, với `__proto__` trỏ tới `null`.

### Minh Họa

```plaintext
jonas --> Person.prototype --> Object.prototype --> null
```

## Lợi Ích của Prototypal Inheritance

- **Hiệu suất**: Các phương thức (như `calcAge`) chỉ được định nghĩa một lần trong `Person.prototype` và được tất cả các đối tượng kế thừa, thay vì phải sao chép vào từng đối tượng.
- **Tái sử dụng mã**: Nhiều đối tượng có thể sử dụng cùng một phương thức từ nguyên mẫu chung.
- **Tính linh hoạt**: Cho phép mở rộng và kế thừa giữa các loại đối tượng khác nhau (ví dụ: lớp `Student` kế thừa từ lớp `Person`).

## Ghi Chú Thêm

- **So sánh với `Object.create`**:
  - Quy trình trên áp dụng cho constructor function và ES6 classes, nhưng không áp dụng cho `Object.create` (sẽ được đề cập trong các bài giảng sau).
- **Prototype Chain vs Scope Chain**:
  - **Scope Chain**: Tìm biến trong các phạm vi lồng nhau.
  - **Prototype Chain**: Tìm thuộc tính/phương thức trong chuỗi nguyên mẫu.
- **Ứng dụng thực tế**: Prototype chain là nền tảng của cơ chế kế thừa trong JavaScript, đặc biệt hữu ích trong lập trình hướng đối tượng (OOP).

### Mã Nguồn Minh Họa

```javascript
// Constructor Function
function Person(name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
}

// Thêm phương thức vào prototype
Person.prototype.calcAge = function () {
  return 2025 - this.birthYear;
};

// Tạo đối tượng
const jonas = new Person("Jonas", 1990);

// Kiểm tra prototype chain
console.log(jonas.__proto__ === Person.prototype); // true
console.log(jonas.__proto__.__proto__ === Object.prototype); // true
console.log(jonas.__proto__.__proto__.__proto__ === null); // true

// Gọi phương thức kế thừa
console.log(jonas.calcAge()); // 35
console.log(jonas.hasOwnProperty("name")); // true (kế thừa từ Object.prototype)
```

## Kết Luận

- Constructor function và prototype chain là nền tảng quan trọng của lập trình hướng đối tượng trong JavaScript.
- Hiểu rõ cơ chế này giúp tối ưu hóa hiệu suất và tổ chức mã nguồn hiệu quả, đặc biệt khi làm việc với nhiều đối tượng có chung thuộc tính/phương thức.
