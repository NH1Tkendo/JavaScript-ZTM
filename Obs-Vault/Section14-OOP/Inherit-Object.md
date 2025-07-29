## Kế thừa Prototype bằng Object.create trong JavaScript

### Mục tiêu

- Hiểu cách sử dụng `Object.create` để xây dựng chuỗi prototype (prototype chain) phức tạp.
- Tái hiện mối quan hệ kế thừa giữa các đối tượng, tương tự như cách sử dụng lớp (class) và hàm tạo (constructor function).
- Tạo ghi chú học tập rõ ràng, súc tích, phục vụ ôn tập về lập trình hướng đối tượng (OOP) trong JavaScript.

### Khái niệm cơ bản

- `Object.create` tạo một đối tượng mới với prototype được chỉ định.
- Chuỗi prototype (prototype chain) cho phép đối tượng kế thừa các thuộc tính và phương thức từ các đối tượng prototype khác.
- Trong ví dụ này, thiết lập mối quan hệ kế thừa giữa `PersonProto` (prototype cha) và `StudentProto` (prototype con), sau đó tạo đối tượng cụ thể (`jay`) kế thừa từ `StudentProto`.

### Cấu trúc chuỗi prototype

- **PersonProto**: Đối tượng prototype gốc, chứa các phương thức chung như `calcAge` và `init`.
- **StudentProto**: Đối tượng prototype trung gian, kế thừa từ `PersonProto`, bổ sung các thuộc tính/phương thức dành riêng cho học sinh (student).
- **jay**: Đối tượng cụ thể, kế thừa từ `StudentProto`, do đó có thể truy cập các phương thức của cả `StudentProto` và `PersonProto`.

### Cách thực hiện

1. **Tạo PersonProto (Prototype cha)**:

   - Định nghĩa đối tượng `PersonProto` với các phương thức như `init` và `calcAge`.
   - Ví dụ:
     ```javascript
     const PersonProto = {
       init(firstName, birthYear) {
         this.firstName = firstName;
         this.birthYear = birthYear;
       },
       calcAge() {
         return new Date().getFullYear() - this.birthYear;
       },
     };
     ```

2. **Tạo StudentProto (Prototype con)**:

   - Sử dụng `Object.create` để tạo `StudentProto` kế thừa từ `PersonProto`.
   - Ví dụ:
     ```javascript
     const StudentProto = Object.create(PersonProto);
     ```

3. **Tạo đối tượng cụ thể (jay)**:

   - Sử dụng `Object.create` để tạo đối tượng `jay` kế thừa từ `StudentProto`.
   - Ví dụ:
     ```javascript
     const jay = Object.create(StudentProto);
     ```

4. **Thêm phương thức init vào StudentProto**:

   - Bổ sung phương thức `init` cho `StudentProto`, tái sử dụng `init` của `PersonProto` và thêm thuộc tính `course`.
   - Ví dụ:
     ```javascript
     StudentProto.init = function (firstName, birthYear, course) {
       PersonProto.init.call(this, firstName, birthYear);
       this.course = course;
     };
     ```

5. **Thêm phương thức introduce vào StudentProto**:

   - Tạo phương thức `introduce` để hiển thị thông tin học sinh.
   - Ví dụ:
     ```javascript
     StudentProto.introduce = function () {
       console.log(`My name is ${this.firstName} and I study ${this.course}`);
     };
     ```

6. **Sử dụng đối tượng jay**:
   - Gọi phương thức `init` để thiết lập thuộc tính.
   - Gọi các phương thức kế thừa như `introduce` và `calcAge`.
   - Ví dụ:
     ```javascript
     jay.init("Jay", 2010, "Computer Science");
     jay.introduce(); // My name is Jay and I study Computer Science
     console.log(jay.calcAge()); // 15 (giả sử năm hiện tại là 2025)
     ```

### Ví dụ tổng hợp (Mã nguồn)

```javascript
// Định nghĩa PersonProto
const PersonProto = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },
};

// Tạo StudentProto kế thừa từ PersonProto
const StudentProto = Object.create(PersonProto);

// Thêm phương thức init cho StudentProto
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

// Thêm phương thức introduce
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// Tạo đối tượng jay
const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.introduce(); // My name is Jay and I study Computer Science
console.log(jay.calcAge()); // 15
```

### Ghi chú thêm

- **Ưu điểm của Object.create**:
  - Đơn giản, trực quan, chỉ liên kết các đối tượng với nhau mà không cần giả lập lớp (class).
  - Không sử dụng hàm tạo (constructor), thuộc tính prototype, hay toán tử `new`.
  - Tạo chuỗi prototype rõ ràng, dễ hiểu.
- **So sánh với các phương pháp khác**:
  - Hàm tạo (constructor function) và lớp ES6 (ES6 classes) thường được sử dụng phổ biến hơn trong thực tế.
  - Tuy nhiên, `Object.create` phù hợp với tư duy thuần túy về kế thừa prototype, không cố gắng mô phỏng lớp như trong các ngôn ngữ như Java hoặc C++.
- **Ứng dụng thực tế**:
  - Hiểu cả ba phương pháp (lớp ES6, hàm tạo, `Object.create`) giúp lập trình viên linh hoạt lựa chọn phong cách phù hợp.
  - Trong JavaScript hiện đại, lớp ES6 được sử dụng nhiều nhất, nhưng `Object.create` vẫn hữu ích trong một số trường hợp cụ thể.

### Lưu ý khi sử dụng trong Obsidian

- Lưu ghi chú này dưới dạng tệp Markdown (.md) để dễ dàng tra cứu.
- Tạo liên kết chéo tới các ghi chú khác về **lớp ES6**, **hàm tạo**, hoặc **prototype** để kết nối kiến thức.
- Sử dụng thẻ (tag) như `#JavaScript`, `#OOP`, `#Prototype` để tìm kiếm nhanh.
