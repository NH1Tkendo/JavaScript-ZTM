## Kế Thừa Giữa Các Lớp với Lớp ES6 (ES6 Classes)

### Giới thiệu

- Bài học này triển khai kế thừa giữa các lớp (**class inheritance**) sử dụng **lớp ES6 (ES6 classes)**, thay vì **hàm tạo (constructor functions)** như bài trước.
- Lớp ES6 cung cấp cú pháp đơn giản hơn, che giấu các chi tiết phức tạp của chuỗi nguyên mẫu (**prototype chain**), nhưng cơ chế bên dưới tương tự hàm tạo.
- Mục tiêu: Tạo lớp con `Student` kế thừa từ lớp cha `Person`, cho phép sử dụng các phương thức của lớp cha và bổ sung chức năng mới.

### Khái niệm cơ bản

- **Lớp cha (Parent Class)**: Lớp `Person` chứa các thuộc tính (`fullName`, `birthYear`) và phương thức chung (`calcAge`, `greet`, getter/setter).
- **Lớp con (Child Class)**: Lớp `Student` kế thừa từ `Person`, bổ sung thuộc tính (`course`) và phương thức riêng (`introduce`).
- **Hai thành phần chính**:
  - Từ khóa `extends`: Liên kết lớp con với lớp cha, thiết lập chuỗi nguyên mẫu tự động.
  - Hàm `super`: Gọi hàm tạo của lớp cha để khởi tạo các thuộc tính kế thừa.

### Cách thực hiện

1. **Tạo lớp cha**:

   - Lớp `Person` với hàm tạo và các phương thức trên nguyên mẫu.

   ```javascript
   class Person {
     constructor(fullName, birthYear) {
       this.fullName = fullName;
       this.birthYear = birthYear;
     }

     calcAge() {
       console.log(2025 - this.birthYear);
     }

     // Các phương thức khác: greet, getter/setter...
   }
   ```

2. **Tạo lớp con với `extends`**:

   - Sử dụng `extends Person` để chỉ định `Student` kế thừa từ `Person`.

   ```javascript
   class Student extends Person {
     constructor(fullName, birthYear, course) {
       // Gọi hàm tạo của lớp cha
       super(fullName, birthYear); // Phải gọi trước khi sử dụng this
       this.course = course; // Thuộc tính bổ sung
     }

     introduce() {
       console.log(`My name is ${this.fullName} and I study ${this.course}`);
     }
   }
   ```

3. **Gọi hàm `super`**:

   - `super(fullName, birthYear)` gọi hàm tạo của `Person`, khởi tạo `fullName` và `birthYear` cho đối tượng `Student`.
   - **Lưu ý**: Gọi `super` phải là câu lệnh đầu tiên trong hàm tạo của lớp con, vì nó tạo đối tượng `this`.

4. **Tùy chọn không sử dụng hàm tạo**:

   - Nếu lớp con không cần thuộc tính bổ sung, có thể bỏ qua hàm tạo. Hàm `super` sẽ tự động được gọi với các tham số từ lớp cha.

   ```javascript
   class Student extends Person {
     introduce() {
       console.log(`My name is ${this.fullName} and I study a course`);
     }
   }

   const martha = new Student("Martha Jones", 2012); // Vẫn hoạt động
   ```

5. **Ghi đè phương thức (Override)**:

   - Lớp con có thể ghi đè phương thức của lớp cha bằng cách định nghĩa lại phương thức cùng tên.

   ```javascript
   class Student extends Person {
     constructor(fullName, birthYear, course) {
       super(fullName, birthYear);
       this.course = course;
     }

     introduce() {
       console.log(`My name is ${this.fullName} and I study ${this.course}`);
     }

     calcAge() {
       console.log(
         `I'm ${
           2037 - this.birthYear
         } years old, but as a student, I feel more like ${
           2037 - this.birthYear + 10
         }`
       );
     }
   }
   ```

### Ví dụ minh họa

```javascript
// Tạo đối tượng Student
const martha = new Student("Martha Jones", 2012, "Computer Science");

// Gọi phương thức từ lớp con
martha.introduce(); // Kết quả: My name is Martha Jones and I study Computer Science

// Gọi phương thức từ lớp cha (hoặc ghi đè)
martha.calcAge(); // Kết quả: I'm 25 years old, but as a student, I feel more like 35
```

### Phân tích chuỗi nguyên mẫu

- **Chuỗi nguyên mẫu**:

  - `martha` → `Student.prototype` → `Person.prototype` → `Object.prototype`.
  - Phương thức `introduce` nằm trong `Student.prototype`.
  - Phương thức `calcAge`, `greet`, getter/setter nằm trong `Person.prototype`.

- **Kiểm tra chuỗi nguyên mẫu**:

  ```javascript
  console.log(martha.__proto__ === Student.prototype); // true
  console.log(martha.__proto__.__proto__ === Person.prototype); // true
  ```

- **Ghi đè phương thức**:
  - Phương thức `calcAge` trong `Student.prototype` được ưu tiên hơn `calcAge` trong `Person.prototype` do nằm gần hơn trong chuỗi nguyên mẫu (**shadowing**).

### So sánh với hàm tạo

- **Hàm tạo (Constructor Functions)**:
  - Yêu cầu thiết lập thủ công chuỗi nguyên mẫu bằng `Object.create` và `call`.
  - Cần sửa thuộc tính `constructor` để đảm bảo chính xác.
- **Lớp ES6**:
  - Từ khóa `extends` và hàm `super` tự động thiết lập chuỗi nguyên mẫu.
  - Cú pháp đơn giản, không cần can thiệp thủ công vào nguyên mẫu.

### Lưu ý quan trọng

- **Thứ tự gọi `super`**: Luôn gọi `super` trước khi sử dụng `this` trong hàm tạo của lớp con.
- **Không cần hàm tạo**: Nếu lớp con không bổ sung thuộc tính, có thể bỏ qua hàm tạo, `super` sẽ tự động xử lý.
- **Ghi đè (Override)**: Phương thức trong lớp con ghi đè phương thức cùng tên trong lớp cha, tận dụng cơ chế tìm kiếm trong chuỗi nguyên mẫu.

### Ghi chú thêm

- Lớp ES6 là **lớp trừu tượng (syntactic sugar)** che giấu chi tiết của chuỗi nguyên mẫu, giúp mã dễ đọc và bảo trì hơn.
- Kế thừa lớp có thể gây ra vấn đề trong thiết kế phần mềm (sẽ được thảo luận trong các bài về **lập trình hàm - functional programming**).
- Kiểm tra chuỗi nguyên mẫu trong console:
  ```javascript
  console.dir(martha.__proto__); // Hiển thị Student.prototype
  console.dir(martha.__proto__.__proto__); // Hiển thị Person.prototype
  ```

### Kết luận

- Kế thừa với lớp ES6 đơn giản hóa việc thiết lập chuỗi nguyên mẫu bằng từ khóa `extends` và hàm `super`.
- Cung cấp cách tiếp cận trực quan, dễ sử dụng để tạo lớp con kế thừa từ lớp cha, đồng thời hỗ trợ ghi đè phương thức để tùy chỉnh hành vi.
