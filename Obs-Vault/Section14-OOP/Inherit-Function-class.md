## Kế Thừa Giữa Các Lớp với Hàm Tạo (Constructor Functions)

### Giới thiệu

- Kế thừa giữa các lớp (**class inheritance**) cho phép một lớp con (**child class**) thừa hưởng các phương thức và thuộc tính từ lớp cha (**parent class**).
- Trong JavaScript, kế thừa giữa các lớp thực chất là thiết lập **chuỗi nguyên mẫu (prototype chain)** giữa các đối tượng.
- Bài học này tập trung vào việc triển khai kế thừa giữa các lớp sử dụng **hàm tạo (constructor functions)**.

### Khái niệm cơ bản

[a](/md_assets/Inherit-Function.png)

- **Lớp cha (Parent Class)**: Lớp chung (ví dụ: `Person`) chứa các thuộc tính và phương thức chung.
- **Lớp con (Child Class)**: Lớp cụ thể hơn (ví dụ: `Student`) thừa hưởng từ lớp cha và có thể bổ sung các thuộc tính/phương thức riêng.
- Mục tiêu: Cho phép các đối tượng của lớp con truy cập các phương thức từ lớp cha thông qua chuỗi nguyên mẫu.

### Cách thực hiện

1. **Tạo hàm tạo cho lớp cha**:

   - Ví dụ: Hàm tạo `Person` với các thuộc tính `firstName`, `birthYear` và phương thức `calcAge` trên thuộc tính `prototype`.

   ```javascript
   function Person(firstName, birthYear) {
     this.firstName = firstName;
     this.birthYear = birthYear;
   }

   Person.prototype.calcAge = function () {
     console.log(2025 - this.birthYear);
   };
   ```

2. **Tạo hàm tạo cho lớp con**:

   - Hàm tạo `Student` thừa hưởng từ `Person` và bổ sung thuộc tính `course`.

   ```javascript
   function Student(firstName, birthYear, course) {
     // Gọi hàm tạo của lớp cha
     Person.call(this, firstName, birthYear);
     this.course = course;
   }
   ```

   - Sử dụng `Person.call(this, firstName, birthYear)` để thiết lập thuộc tính `firstName` và `birthYear` từ lớp cha, tránh lặp lại mã.

3. **Liên kết nguyên mẫu**:

   - Sử dụng `Object.create` để thiết lập `Person.prototype` làm nguyên mẫu của `Student.prototype`.

   ```javascript
   Student.prototype = Object.create(Person.prototype);
   ```

   - **Lưu ý**: Phải thực hiện bước này **trước** khi thêm các phương thức vào `Student.prototype` để tránh ghi đè.

4. **Thêm phương thức cho lớp con**:

   - Thêm phương thức riêng cho `Student`, ví dụ: `introduce`.

   ```javascript
   Student.prototype.introduce = function () {
     console.log(`My name is ${this.firstName} and I study ${this.course}`);
   };
   ```

5. **Sửa thuộc tính constructor**:

   - Sau khi sử dụng `Object.create`, thuộc tính `constructor` của `Student.prototype` vẫn trỏ về `Person`. Cần sửa lại để trỏ về `Student`.

   ```javascript
   Student.prototype.constructor = Student;
   ```

### Ví dụ minh họa

```javascript
// Tạo đối tượng Student
const mike = new Student("Mike", 2008, "Computer Science");

// Gọi phương thức từ lớp con
mike.introduce(); // Kết quả: My name is Mike and I study Computer Science

// Gọi phương thức từ lớp cha
mike.calcAge(); // Kết quả: 17
```

### Phân tích chuỗi nguyên mẫu

- **Chuỗi nguyên mẫu (Prototype Chain)**:

  - `mike` → `Student.prototype` → `Person.prototype` → `Object.prototype`.
  - Khi gọi `mike.calcAge()`, JavaScript tìm phương thức `calcAge` trong chuỗi nguyên mẫu, cuối cùng tìm thấy ở `Person.prototype`.

- **Kiểm tra chuỗi nguyên mẫu**:
  ```javascript
  console.log(mike.__proto__ === Student.prototype); // true
  console.log(mike.__proto__.__proto__ === Person.prototype); // true
  console.log(mike instanceof Student); // true
  console.log(mike instanceof Person); // true
  console.log(mike instanceof Object); // true
  ```

### Lưu ý quan trọng

[a](/md_assets/Inherit-Good-Bad.png)

- **Tại sao cần `Object.create`?**

  - Nếu gán trực tiếp `Student.prototype = Person.prototype`, cả hai sẽ trỏ đến cùng một đối tượng, làm hỏng chuỗi nguyên mẫu.
  - `Object.create(Person.prototype)` tạo một đối tượng mới kế thừa từ `Person.prototype`, đảm bảo `Student.prototype` là một đối tượng riêng biệt.

- **Sử dụng `call` để gọi hàm tạo cha**:

  - `Person.call(this, firstName, birthYear)` thiết lập `this` trong hàm tạo `Person` để trỏ đến đối tượng `Student` đang được tạo.

- **Sửa `constructor`**:
  - Đảm bảo `Student.prototype.constructor` trỏ đúng về `Student` để các thao tác phụ thuộc vào `constructor` hoạt động chính xác.

### Ưu điểm của kế thừa

- Lớp con (`Student`) có thể sử dụng các phương thức của lớp cha (`Person`) mà không cần sao chép mã.
- Cho phép mở rộng chức năng (thêm `course`, `introduce`) mà vẫn duy trì các chức năng chung (`calcAge`).

### Ghi chú thêm

- Kế thừa với hàm tạo yêu cầu thiết lập thủ công chuỗi nguyên mẫu, phức tạp hơn so với lớp ES6 (sẽ được đề cập ở bài sau).
- `Object.create` đóng vai trò quan trọng trong việc liên kết các nguyên mẫu một cách chính xác.
- Kiểm tra chuỗi nguyên mẫu trong console giúp hiểu rõ hơn cách JavaScript tìm kiếm phương thức:
  ```javascript
  console.dir(mike.__proto__); // Hiển thị Student.prototype
  console.dir(mike.__proto__.__proto__); // Hiển thị Person.prototype
  ```

### Kết luận

- Kế thừa giữa các lớp sử dụng hàm tạo cho phép liên kết các đối tượng thông qua chuỗi nguyên mẫu, chia sẻ hành vi giữa lớp cha và lớp con.
- Việc sử dụng `Object.create` và `call` là chìa khóa để thiết lập kế thừa chính xác, nhưng cần cẩn thận với thứ tự các bước và thuộc tính `constructor`.
