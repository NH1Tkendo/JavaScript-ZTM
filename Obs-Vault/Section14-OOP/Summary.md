## Tổng quan về cú pháp và thuật ngữ của Lớp (Class) trong JavaScript

### Mục tiêu

- Ôn tập và hệ thống hóa các thuật ngữ, tính năng liên quan đến lớp (class) trong lập trình hướng đối tượng (OOP) với JavaScript.
- Tạo ghi chú học tập bằng Markdown, rõ ràng, dễ tra cứu, phục vụ ôn tập về cú pháp và cách sử dụng lớp trong JavaScript.

### Cú pháp và các thành phần của lớp

[s](/md_assets/Summary.png)

#### 1. Định nghĩa lớp

- Lớp được định nghĩa bằng từ khóa `class`.
- Một lớp có thể là **lớp con (child class)** kế thừa từ **lớp cha (parent class)** bằng từ khóa `extends`.
- Từ khóa `extends` tự động thiết lập chuỗi prototype (prototype chain) mà không cần can thiệp thủ công.
- Ví dụ:

  ```javascript
  class Person {
    // Nội dung lớp cha
  }

  class Student extends Person {
    // Nội dung lớp con
  }
  ```

#### 2. Trường công khai (Public Field)

- **Trường công khai (public field)**: Thuộc tính được định nghĩa trực tiếp trong lớp, có sẵn trên mọi đối tượng được tạo (instance).
- Tương tự thuộc tính được định nghĩa trong hàm tạo (constructor), nhưng được khai báo ở cấp lớp.
- Thường dùng cho các giá trị chung cho tất cả đối tượng.
- Ví dụ:
  ```javascript
  class Student extends Person {
    university = "University of Lisbon"; // Trường công khai
  }
  ```

#### 3. Trường riêng tư (Private Field)

- **Trường riêng tư (private field)**: Chỉ truy cập được bên trong lớp, đảm bảo tính đóng gói (encapsulation) và bảo mật dữ liệu.
- Được định nghĩa bằng dấu `#` trước tên trường.
- Ví dụ:
  ```javascript
  class Student extends Person {
    #pin; // Trường riêng tư
  }
  ```

#### 4. Trường công khai tĩnh (Static Public Field)

- **Trường công khai tĩnh (static public field)**: Thuộc tính chỉ có sẵn trên lớp, không có trên các đối tượng được tạo.
- Sử dụng từ khóa `static`.
- Ví dụ:
  ```javascript
  class Student extends Person {
    static schoolType = "University"; // Trường tĩnh
  }
  ```

#### 5. Hàm tạo (Constructor)

- **Hàm tạo (constructor)**: Phương thức tự động gọi bởi toán tử `new` khi tạo đối tượng mới.
- Bắt buộc trong lớp thông thường, nhưng có thể bỏ qua trong lớp con nếu sử dụng cùng tham số với lớp cha.
- Trong lớp con, sử dụng `super()` để gọi hàm tạo của lớp cha trước khi sử dụng `this`.
- Ví dụ:
  ```javascript
  class Student extends Person {
    constructor(fullName, birthYear, course) {
      super(fullName, birthYear); // Gọi hàm tạo của lớp cha
      this.course = course;
    }
  }
  ```

#### 6. Thuộc tính cá thể (Instance Property)

- **Thuộc tính cá thể (instance property)**: Thuộc tính được gán trong hàm tạo, dựa trên dữ liệu đầu vào, mang tính cá nhân hóa cho từng đối tượng.
- Khác với trường công khai, thuộc tính cá thể thường là duy nhất cho mỗi đối tượng.
- Ví dụ:
  ```javascript
  class Student extends Person {
    constructor(fullName, birthYear, course) {
      super(fullName, birthYear);
      this.course = course; // Thuộc tính cá thể
    }
  }
  ```

#### 7. Gán lại trường riêng tư

- Trường riêng tư có thể được gán giá trị trong hàm tạo dựa trên dữ liệu đầu vào.
- Ví dụ:
  ```javascript
  class Student extends Person {
    #pin;
    constructor(fullName, birthYear, course, pin) {
      super(fullName, birthYear);
      this.course = course;
      this.#pin = pin; // Gán lại trường riêng tư
    }
  }
  ```

#### 8. Phương thức công khai (Public Method)

- **Phương thức công khai (public method)**: Có thể gọi trên mọi đối tượng được tạo từ lớp.
- Ví dụ:
  ```javascript
  class Student extends Person {
    introduce() {
      console.log(`My name is ${this.fullName}, studying ${this.course}`);
    }
  }
  ```

#### 9. Phương thức riêng tư (Private Method)

- **Phương thức riêng tư (private method)**: Chỉ truy cập được bên trong lớp, sử dụng dấu `#`.
- Lưu ý: Tính năng này có thể chưa được hỗ trợ đầy đủ trên một số trình duyệt (tính đến thời điểm ghi chú).
- Có thể giả lập bằng quy ước sử dụng dấu `_` thay vì `#`.
- Ví dụ:
  ```javascript
  class Student extends Person {
    #calculateGrade() {
      // Logic riêng tư
    }
    // Giả lập phương thức riêng tư
    _calculateGrade() {
      // Logic riêng tư
    }
  }
  ```

#### 10. Getter và Setter

- **Getter**: Cho phép truy cập giá trị như một thuộc tính thay vì gọi phương thức.
- **Setter**: Cho phép gán giá trị như một thuộc tính, thường dùng để xác thực dữ liệu.
- Khi có setter cho thuộc tính đã tồn tại trong hàm tạo, cần tạo thuộc tính mới với tiền tố `_` để tránh xung đột.
- Ví dụ:
  ```javascript
  class Student extends Person {
    #_testScore;
    set testScore(score) {
      this.#_testScore = score >= 0 ? score : 0; // Xác thực
    }
    get testScore() {
      return this.#_testScore;
    }
  }
  ```

#### 11. Phương thức tĩnh (Static Method)

- **Phương thức tĩnh (static method)**: Chỉ gọi được trên lớp, không gọi được trên đối tượng.
- Chỉ truy cập được các trường tĩnh hoặc phương thức tĩnh, thường dùng làm hàm hỗ trợ (helper method).
- Ví dụ:
  ```javascript
  class Student extends Person {
    static getSchoolType() {
      return this.schoolType;
    }
  }
  ```

#### 12. Tạo đối tượng mới

- Sử dụng toán tử `new` để tạo đối tượng từ lớp.
- Ví dụ:
  ```javascript
  const student1 = new Student("John Doe", 2000, "Computer Science", 1234);
  ```

### Ví dụ tổng hợp (Mã nguồn)

```javascript
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
}

class Student extends Person {
  university = "University of Lisbon"; // Trường công khai
  static schoolType = "University"; // Trường tĩnh
  #pin; // Trường riêng tư
  #_testScore; // Thuộc tính phụ cho setter

  constructor(fullName, birthYear, course, pin) {
    super(fullName, birthYear); // Gọi hàm tạo lớp cha
    this.course = course; // Thuộc tính cá thể
    this.#pin = pin; // Gán trường riêng tư
  }

  // Phương thức công khai
  introduce() {
    console.log(`My name is ${this.fullName}, studying ${this.course}`);
  }

  // Phương thức riêng tư
  #calculateGrade() {
    return this.#_testScore > 50 ? "Pass" : "Fail";
  }

  // Getter và Setter
  set testScore(score) {
    this.#_testScore = score >= 0 ? score : 0;
  }

  get testScore() {
    return this.#_testScore;
  }

  // Phương thức tĩnh
  static getSchoolType() {
    return this.schoolType;
  }
}

// Tạo đối tượng
const student1 = new Student("John Doe", 2000, "Computer Science", 1234);
student1.testScore = 75;
console.log(student1.testScore); // 75
student1.introduce(); // My name is John Doe, studying Computer Science
console.log(Student.getSchoolType()); // University
```

### Ghi chú thêm

- **Lớp là syntactic sugar**:
  - Lớp trong JavaScript là cách viết đơn giản hóa của hàm tạo (constructor function).
  - Không được nâng cấp (hoisted), là công dân hạng nhất (first-class citizen), và luôn chạy trong chế độ nghiêm ngặt (strict mode).
- **Ứng dụng thực tế**:
  - Lớp là cách phổ biến nhất để triển khai OOP trong JavaScript hiện đại.
  - Hiểu rõ các thành phần (trường, phương thức, getter/setter) giúp thiết kế mã hiệu quả và dễ bảo trì.
- **Lưu ý khi sử dụng**:
  - Đảm bảo gọi `super()` trước khi sử dụng `this` trong hàm tạo của lớp con.
  - Kiểm tra tính tương thích của phương thức/trường riêng tư trên các trình duyệt.
  - Sử dụng quy ước `_` để giả lập tính riêng tư khi cần.
