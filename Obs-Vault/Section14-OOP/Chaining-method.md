## Xâu chuỗi phương thức (Method Chaining) trong Lập trình Hướng đối tượng (OOP) với JavaScript

### Mục tiêu

- Hiểu cách triển khai xâu chuỗi phương thức (method chaining) trong các lớp (class) để thực hiện nhiều thao tác liên tiếp trên cùng một đối tượng.
- Tái hiện kỹ thuật xâu chuỗi tương tự như khi sử dụng các phương thức mảng (`filter`, `map`, `reduce`) trong JavaScript.
- Tạo ghi chú học tập rõ ràng, dễ hiểu, phục vụ ôn tập về OOP trong JavaScript.

### Khái niệm cơ bản

- **Xâu chuỗi phương thức (Method Chaining)**: Gọi liên tiếp các phương thức trên cùng một đối tượng trong một dòng mã, tương tự như `array.filter().map().reduce()`.
- Trong OOP, các phương thức của một lớp có thể được thiết kế để trả về chính đối tượng (`this`), cho phép gọi tiếp các phương thức khác.
- Ví dụ: Thay vì gọi từng phương thức riêng lẻ (`acc1.deposit(300); acc1.withdraw(100);`), có thể xâu chuỗi: `acc1.deposit(300).withdraw(100).withdraw(50)`.

### Điều kiện để xâu chuỗi phương thức

- Mỗi phương thức trong chuỗi phải trả về chính đối tượng (`this`) để các phương thức tiếp theo có thể được gọi trên đối tượng đó.
- Các phương thức trả về giá trị khác (ví dụ: mảng, số) thường không thể xâu chuỗi, vì kết quả không phải là đối tượng gốc.

### Cách thực hiện

1. **Thiết kế lớp với các phương thức có thể xâu chuỗi**:

   - Thêm `return this` vào cuối các phương thức muốn xâu chuỗi.
   - Ví dụ: Các phương thức `deposit`, `withdraw`, `requestLoan` của lớp `Account`.

2. **Ví dụ về lớp Account**:

   ```javascript
   class Account {
     constructor(owner, currency, pin) {
       this.owner = owner;
       this.currency = currency;
       this.pin = pin;
       this.movements = [];
     }

     deposit(amount) {
       this.movements.push(amount);
       return this; // Trả về đối tượng để xâu chuỗi
     }

     withdraw(amount) {
       this.movements.push(-amount);
       return this; // Trả về đối tượng để xâu chuỗi
     }

     #approveLoan(amount) {
       return true; // Phương thức private, không xâu chuỗi
     }

     requestLoan(amount) {
       if (this.#approveLoan(amount)) {
         this.movements.push(amount);
         return this; // Trả về đối tượng để xâu chuỗi
       }
       return this; // Đảm bảo luôn trả về this
     }

     getMovements() {
       return this.movements; // Trả về mảng, không xâu chuỗi được
     }
   }
   ```

3. **Sử dụng xâu chuỗi phương thức**:

   - Tạo một đối tượng và gọi các phương thức theo chuỗi.
   - Ví dụ:
     ```javascript
     const acc1 = new Account("Jonas", "EUR", 1111);
     acc1
       .deposit(300)
       .withdraw(100)
       .withdraw(50)
       .requestLoan(25000)
       .withdraw(4000);
     console.log(acc1.getMovements()); // [300, -100, -50, 25000, -4000]
     ```

4. **Lưu ý về phương thức không xâu chuỗi được**:
   - Phương thức `getMovements` trả về mảng `movements`, không phải đối tượng `this`, nên không thể xâu chuỗi thêm phương thức khác.
   - Để sử dụng `getMovements`, đặt nó ở cuối chuỗi hoặc lưu kết quả vào biến.
   - Ví dụ:
     ```javascript
     const movements = acc1.deposit(300).withdraw(100).getMovements();
     console.log(movements); // [300, -100]
     ```

### Ví dụ tổng hợp (Mã nguồn)

```javascript
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
  }

  deposit(amount) {
    this.movements.push(amount);
    return this;
  }

  withdraw(amount) {
    this.movements.push(-amount);
    return this;
  }

  #approveLoan(amount) {
    return true;
  }

  requestLoan(amount) {
    if (this.#approveLoan(amount)) {
      this.movements.push(amount);
      return this;
    }
    return this;
  }

  getMovements() {
    return this.movements; // Không xâu chuỗi được
  }
}

// Sử dụng xâu chuỗi
const acc1 = new Account("Jonas", "EUR", 1111);
acc1.deposit(300).withdraw(100).withdraw(50).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements()); // [300, -100, -50, 25000, -4000]
```

### Ghi chú thêm

- **Ứng dụng thực tế**:
  - Xâu chuỗi phương thức thường thấy trong các thư viện JavaScript (ví dụ: jQuery, Lodash) hoặc khi làm việc với OOP.
  - Rất hữu ích khi cần thực hiện nhiều thao tác cập nhật thuộc tính liên tiếp.
- **Khi nào nên dùng**:
  - Áp dụng cho các phương thức thiết lập thuộc tính (setter methods) như `deposit`, `withdraw`.
  - Tránh dùng cho phương thức lấy giá trị (getter methods) như `getMovements`, vì chúng trả về dữ liệu thay vì đối tượng.
- **Lợi ích**:
  - Mã ngắn gọn, dễ đọc, giảm lặp lại thao tác gọi đối tượng.
  - Tăng tính linh hoạt và trực quan khi làm việc với các lớp.
- **Hạn chế**:
  - Không phải mọi phương thức đều có thể xâu chuỗi, cần cân nhắc thiết kế lớp cẩn thận.
  - Có thể gây nhầm lẫn nếu không hiểu rõ cách `this` hoạt động trong chuỗi.
