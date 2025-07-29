## Phương thức Tĩnh (Static Methods) trong JavaScript

### Khái niệm cơ bản

- **Phương thức tĩnh (Static Methods)**: Là các phương thức được gắn trực tiếp vào hàm khởi tạo (constructor) hoặc lớp (class), không nằm trong nguyên mẫu (prototype).
- Không được kế thừa bởi các đối tượng (instance) được tạo ra từ hàm khởi tạo hoặc lớp.
- Thường được sử dụng như các **hàm trợ giúp (helper functions)** liên quan đến hàm khởi tạo hoặc lớp.

### Ví dụ về phương thức tĩnh trong JavaScript

- **Phương thức `Array.from`**:
  - Chuyển đổi cấu trúc giống mảng (array-like) thành mảng thực sự.
  - Ví dụ:
    ```javascript
    const nodes = document.querySelectorAll("div");
    const arr = Array.from(nodes); // Chuyển NodeList thành Array
    ```
  - `Array.from` được gắn vào hàm khởi tạo `Array`, không nằm trong `Array.prototype`, do đó không thể gọi trên mảng:
    ```javascript
    const arr = [1, 2, 3];
    arr.from(); // Lỗi: "from is not a function"
    ```
- **Phương thức `Number.parseFloat`**:

  - Là phương thức tĩnh trên hàm khởi tạo `Number`.
  - Không khả dụng trên các số (number instances), chỉ gọi được qua `Number`.

- Các phương thức tĩnh nằm trong **không gian tên (namespace)** của hàm khởi tạo (ví dụ: `Array`, `Number`), giúp liên kết logic với kiểu dữ liệu cụ thể.

### Triển khai phương thức tĩnh trong hàm khởi tạo

- **Ví dụ**: Thêm phương thức tĩnh `hey` vào hàm khởi tạo `Person`:

  ```javascript
  function Person(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  Person.hey = function () {
    console.log("Hey there 👋");
  };
  ```

- **Cách sử dụng**:
  ```javascript
  Person.hey(); // Kết quả: "Hey there 👋"
  ```
- **Lưu ý**:
  - Phương thức `hey` được gắn trực tiếp vào `Person`, không nằm trong `Person.prototype`.
  - Không thể gọi trên đối tượng: `jonas.hey()` sẽ gây lỗi vì `jonas` không kế thừa `hey`.
  - Từ khóa `this` trong phương thức tĩnh trỏ đến chính hàm khởi tạo `Person`.

### Triển khai phương thức tĩnh trong lớp

- **Ví dụ**: Thêm phương thức tĩnh `hey` vào lớp `PersonCl`:

  ```javascript
  class PersonCl {
    constructor(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }

    // Phương thức instance (thêm vào prototype)
    calcAge() {
      console.log(2025 - this.birthYear);
    }

    // Phương thức tĩnh
    static hey() {
      console.log("Hey there 👋");
    }
  }
  ```

- **Cách sử dụng**:
  ```javascript
  PersonCl.hey(); // Kết quả: "Hey there 👋"
  ```
- **Lưu ý**:
  - Sử dụng từ khóa `static` để định nghĩa phương thức tĩnh.
  - Phương thức tĩnh không khả dụng trên các đối tượng (instance), chỉ gọi được qua tên lớp (`PersonCl`).
  - Từ khóa `this` trong phương thức tĩnh trỏ đến chính lớp `PersonCl`.
  - Các phương thức không có từ khóa `static` là **phương thức instance**, được thêm vào nguyên mẫu (`prototype`) và kế thừa bởi các đối tượng.

### Ứng dụng của phương thức tĩnh

- Dùng để tạo các hàm trợ giúp liên quan đến lớp hoặc hàm khởi tạo, ví dụ:
  - Xử lý dữ liệu chung cho tất cả các đối tượng.
  - Thực hiện các thao tác không phụ thuộc vào trạng thái của đối tượng cụ thể.
- Ví dụ thực tế: `Array.from`, `Number.parseFloat` là các phương thức tĩnh giúp xử lý dữ liệu liên quan đến mảng hoặc số.

### Ghi chú thêm

- Phương thức tĩnh rất hữu ích khi cần nhóm các hàm tiện ích (utility functions) vào không gian tên của một lớp hoặc hàm khởi tạo.
- Phân biệt rõ **phương thức tĩnh** (gắn vào constructor/class) và **phương thức instance** (gắn vào prototype, kế thừa bởi đối tượng).
- Hiểu rõ cách `this` hoạt động trong phương thức tĩnh để tránh nhầm lẫn khi sử dụng.
