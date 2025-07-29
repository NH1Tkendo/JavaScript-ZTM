## Tính Đóng Gói (Encapsulation) và Trường Lớp (Class Fields) trong JavaScript

### Mục tiêu

- Hiểu nguyên tắc đóng gói (encapsulation) trong lập trình hướng đối tượng (OOP) và vai trò của nó trong việc bảo vệ dữ liệu.
- Nắm vững cách sử dụng trường lớp (class fields), bao gồm trường công khai (public fields), trường riêng tư (private fields), phương thức công khai (public methods), và phương thức riêng tư (private methods).
- Tạo ghi chú học tập rõ ràng, súc tích, định dạng Markdown để ôn tập về OOP trong JavaScript.

### Khái niệm cơ bản

- **Tính đóng gói (Encapsulation)**:
  - Giữ một số thuộc tính và phương thức riêng tư bên trong lớp, không cho phép truy cập từ bên ngoài.
  - Chỉ cung cấp một giao diện công khai (public interface) hoặc API, gồm các phương thức công khai để tương tác với lớp.
  - Mục đích:
    - Ngăn mã bên ngoài vô tình hoặc cố ý thay đổi dữ liệu bên trong lớp.
    - Cho phép thay đổi các phương thức nội bộ mà không ảnh hưởng đến mã bên ngoài, vì mã bên ngoài chỉ phụ thuộc vào giao diện công khai.
- **Trường lớp (Class Fields)**:
  - Được giới thiệu trong ES2022, cung cấp cách mới để khai báo thuộc tính và phương thức trong lớp.
  - Bao gồm: trường công khai, trường riêng tư, phương thức công khai, phương thức riêng tư, và các phiên bản tĩnh (static) của chúng.
  - Làm cho JavaScript giống các ngôn ngữ dựa trên lớp (class-based) như Java hoặc C++, dù vốn là ngôn ngữ dựa trên prototype.

### Lý do cần tính đóng gói

1. **Bảo vệ dữ liệu**:
   - Ngăn mã bên ngoài thao túng trực tiếp các thuộc tính nhạy cảm (ví dụ: mảng `movements` trong tài khoản ngân hàng).
   - Ví dụ: Nếu không có tính đóng gói, ai đó có thể đặt lại `acc1.movements = []`, xóa toàn bộ lịch sử giao dịch.
2. **Kiểm soát giao diện**:
   - Chỉ cung cấp một API nhỏ gọn với các phương thức công khai (như `deposit`, `withdraw`), giúp dễ dàng thay đổi mã nội bộ mà không làm hỏng mã bên ngoài.

### Các thành phần của trường lớp (Class Fields)

#### 1. Trường công khai (Public Fields)

- Là thuộc tính có sẵn trên mọi đối tượng được tạo từ lớp (instance), nhưng không được thêm vào prototype.
- Thường dùng cho các giá trị chung cho tất cả đối tượng.
- Cú pháp: Khai báo trực tiếp trong lớp, không cần từ khóa `this`, kết thúc bằng dấu `;`.
- Ví dụ:
  ```javascript
  class Account {
    locale = navigator.language; // Trường công khai
    bank = "Bankist"; // Trường công khai
  }
  ```
- Kết quả: Mọi đối tượng tạo từ `Account` sẽ có thuộc tính `locale` và `bank`.

#### 2. Trường riêng tư (Private Fields)

- Chỉ truy cập được bên trong lớp, sử dụng dấu `#`.
- Ngăn chặn truy cập hoặc sửa đổi từ bên ngoài, đảm bảo tính đóng gói.
- Có thể khai báo mà không gán giá trị, sau đó gán trong hàm tạo (constructor).
- Ví dụ:

  ```javascript
  class Account {
    #movements = []; // Trường riêng tư
    #pin; // Khai báo trường riêng tư

    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.#pin = pin; // Gán giá trị trong constructor
    }
  }
  ```

- Lưu ý: Cố gắng truy cập `#movements` từ bên ngoài (ví dụ: `acc1.#movements`) sẽ gây lỗi.

#### 3. Phương thức công khai (Public Methods)

- Là các phương thức có thể gọi trên mọi đối tượng được tạo từ lớp, thuộc giao diện công khai (API).
- Ví dụ:

  ```javascript
  class Account {
    deposit(amount) {
      this.#movements.push(amount);
      return this;
    }

    getMovements() {
      return this.#movements; // Trả về bản sao nếu cần bảo vệ dữ liệu
    }
  }
  ```

#### 4. Phương thức riêng tư (Private Methods)

- Chỉ gọi được bên trong lớp, sử dụng dấu `#`.
- Thường dùng cho các phương thức nội bộ, không nên là một phần của API công khai.
- Lưu ý: Tính năng này có thể chưa được hỗ trợ đầy đủ trên một số trình duyệt (tính đến thời điểm ghi chú).
- Ví dụ:

  ```javascript
  class Account {
    #approveLoan(amount) {
      return true; // Phương thức riêng tư
    }

    requestLoan(amount) {
      if (this.#approveLoan(amount)) {
        this.#movements.push(amount);
        return this;
      }
      return this;
    }
  }
  ```

#### 5. Phiên bản tĩnh (Static Fields/Methods)

- Chỉ truy cập được trên lớp, không có trên đối tượng.
- Dùng cho các hàm hỗ trợ (helper methods) hoặc thuộc tính chung của lớp.
- Ví dụ:

  ```javascript
  class Account {
    static bankName = "Bankist"; // Trường tĩnh

    static test() {
      return true; // Phương thức tĩnh
    }
  }

  console.log(Account.bankName); // Bankist
  console.log(Account.test()); // true
  ```

### Ví dụ tổng hợp (Mã nguồn)

```javascript
class Account {
  // Trường công khai
  locale = navigator.language;
  bank = "Bankist";

  // Trường riêng tư
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // Gán giá trị cho trường riêng tư
  }

  // Phương thức công khai
  deposit(amount) {
    this.#movements.push(amount);
    return this;
  }

  withdraw(amount) {
    this.#movements.push(-amount);
    return this;
  }

  getMovements() {
    return this.#movements; // Trả về mảng giao dịch
  }

  // Phương thức riêng tư
  #approveLoan(amount) {
    return true; // Giả lập logic phê duyệt khoản vay
  }

  requestLoan(amount) {
    if (this.#approveLoan(amount)) {
      this.#movements.push(amount);
      return this;
    }
    return this;
  }

  // Phương thức tĩnh
  static bankName = "Bankist";
  static test() {
    return true;
  }
}

// Sử dụng
const acc1 = new Account("Jonas", "EUR", 1111);
acc1.deposit(250);
acc1.withdraw(100);
acc1.requestLoan(1000);
console.log(acc1.getMovements()); // [250, -100, 1000]
console.log(Account.bankName); // Bankist
// console.log(acc1.#movements); // Lỗi: không thể truy cập trường riêng tư
```

### Ghi chú thêm

- **Ý nghĩa của Class Fields**:
  - Đưa JavaScript gần hơn với các ngôn ngữ dựa trên lớp, nhưng làm phức tạp hóa mô hình prototype truyền thống.
  - Một số nhà phát triển cho rằng điều này làm mất đi bản chất của JavaScript, nhưng đối với lập trình viên thông thường, chỉ cần hiểu rõ prototype và hàm tạo là đủ.
- **Ứng dụng thực tế**:
  - Tính đóng gói rất quan trọng trong các ứng dụng lớn, giúp bảo vệ dữ liệu và duy trì tính ổn định của mã.
  - Trường riêng tư và phương thức riêng tư lý tưởng cho các dữ liệu nhạy cảm (như `movements`, `pin`).
- **Lưu ý**:
  - Trường và phương thức riêng tư sử dụng `#` có thể không hoạt động trên các trình duyệt cũ.
  - Quy ước sử dụng `_` để giả lập tính riêng tư vẫn phổ biến trong thực tế.
  - Sử dụng `return this` trong các phương thức công khai để hỗ trợ xâu chuỗi (method chaining).
