## Getters và Setters trong JavaScript

### Khái niệm cơ bản

- **Getters** và **Setters** là các **thuộc tính truy cập (assessor properties)**, cho phép lấy (get) hoặc đặt (set) giá trị của một thuộc tính thông qua hàm, nhưng cú pháp sử dụng giống như thuộc tính thông thường.
- Khác với **thuộc tính dữ liệu (data properties)**, getters và setters là các hàm thực hiện tính toán hoặc kiểm tra trước khi lấy hoặc đặt giá trị.
- Có thể sử dụng trong cả **đối tượng thông thường (object literals)** và **lớp (classes)**.

### Getters và Setters trong đối tượng thông thường

- **Ví dụ**: Đối tượng tài khoản ngân hàng:

  ```javascript
  const account = {
    owner: "Jonas",
    movements: [200, 530, 120, 300],

    get latest() {
      return this.movements.slice(-1).pop();
    },

    set latest(movement) {
      this.movements.push(movement);
    },
  };
  ```

- **Cách sử dụng**:
  - Getter: `account.latest` → Trả về `300` (giá trị cuối cùng của mảng `movements`).
  - Setter: `account.latest = 50` → Thêm `50` vào mảng `movements`.
- **Lưu ý**:
  - Getter và setter không bắt buộc phải đi cùng nhau (có thể chỉ định một trong hai).
  - Cú pháp sử dụng giống thuộc tính thông thường, không cần gọi như hàm.

### Getters và Setters trong lớp

- Trong lớp, getters và setters hoạt động tương tự, được định nghĩa bên ngoài `constructor` và tự động thêm vào nguyên mẫu (prototype).
- **Ví dụ**: Thêm getter cho thuộc tính `age` trong lớp `PersonCl`:

  ```javascript
  class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    get age() {
      return 2025 - this.birthYear;
    }
  }
  ```

- **Cách sử dụng**:
  ```javascript
  const jessica = new PersonCl("Jessica Davis", 1996);
  console.log(jessica.age); // Kết quả: 29
  ```
- Kiểm tra: `jessica.__proto__` cho thấy `age` là một getter trong nguyên mẫu, trông giống thuộc tính nhưng thực chất là hàm tính toán.

### Kiểm tra dữ liệu với Setters

- Setters hữu ích để kiểm tra dữ liệu trước khi gán giá trị.
- **Ví dụ**: Kiểm tra `fullName` có chứa dấu cách (đảm bảo là tên đầy đủ):

  ```javascript
  class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    get age() {
      return 2025 - this.birthYear;
    }

    set fullName(name) {
      if (name.includes(" ")) {
        this._fullName = name;
      } else {
        alert(`${name} is not a full name!`);
      }
    }

    get fullName() {
      return this._fullName;
    }
  }
  ```

- **Giải thích**:
  - Setter `fullName` kiểm tra xem `name` có chứa dấu cách hay không.
  - Nếu hợp lệ, gán giá trị vào `_fullName` (sử dụng `_` để tránh xung đột tên với setter).
  - Getter `fullName` trả về giá trị của `_fullName`.
- **Sử dụng**:

  ```javascript
  const jessica = new PersonCl("Jessica Davis", 1996);
  console.log(jessica.fullName); // Kết quả: "Jessica Davis"

  const walter = new PersonCl("Walter", 1965); // Kết quả: Alert "Walter is not a full name!"
  const walter2 = new PersonCl("Walter White", 1965);
  console.log(walter2.fullName); // Kết quả: "Walter White"
  ```

- **Vấn đề xung đột tên**:
  - Nếu setter cố gắng gán trực tiếp vào `this.fullName` (cùng tên với setter), sẽ gây lỗi "maximum call stack size exceeded" do đệ quy vô hạn.
  - Giải pháp: Sử dụng tên khác (thường thêm `_`, ví dụ `_fullName`) và bổ sung getter để truy cập giá trị.

### Ứng dụng của Getters và Setters

- **Tính toán động**: Getters hữu ích khi cần tính toán giá trị trước khi trả về (như `age` dựa trên `birthYear`).
- **Kiểm tra dữ liệu**: Setters giúp đảm bảo dữ liệu hợp lệ trước khi gán (như kiểm tra tên đầy đủ).
- Không bắt buộc sử dụng, nhưng rất hữu ích trong các trường hợp cần kiểm soát hoặc tính toán giá trị thuộc tính.

### Ghi chú thêm

- Getters và setters giúp mã trông giống thuộc tính thông thường, nhưng cung cấp khả năng kiểm soát logic.
- Khi sử dụng setters để gán thuộc tính đã tồn tại, luôn sử dụng tên khác (thêm `_`) để tránh xung đột và bổ sung getter để truy cập.
- Sắp tới: Tìm hiểu về **phương thức tĩnh (static methods)** trong lớp.
