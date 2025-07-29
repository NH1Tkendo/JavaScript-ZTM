## Kế Thừa Nguyên Mẫu với Object.create

### Giới thiệu

- `Object.create` là một cách để triển khai **kế thừa nguyên mẫu (prototypal inheritance)** trong JavaScript, khác biệt so với **hàm tạo (constructor functions)** và **lớp ES6 (ES6 classes)**.
- Không sử dụng thuộc tính `prototype`, hàm tạo, hoặc toán tử `new`.
- Cho phép **tùy chỉnh thủ công** nguyên mẫu của một đối tượng thành bất kỳ đối tượng nào.

### Khái niệm cơ bản

- `Object.create(obj)`: Tạo một đối tượng mới với nguyên mẫu được chỉ định là `obj`.
- Đối tượng mới được liên kết với nguyên mẫu thông qua thuộc tính `__proto__`, tạo thành **chuỗi nguyên mẫu (prototype chain)**.
- Không cần hàm tạo hoặc thuộc tính `prototype` như trong các phương pháp khác.

### Cách thực hiện

1. **Tạo đối tượng nguyên mẫu**:

   - Tạo một đối tượng (thường là **đối tượng chữ (object literal)**) chứa các phương thức hoặc thuộc tính muốn chia sẻ.
   - Ví dụ: Tạo `PersonProto` làm nguyên mẫu cho các đối tượng `Person`.

2. **Sử dụng Object.create**:

   - Gọi `Object.create(PersonProto)` để tạo một đối tượng mới với nguyên mẫu là `PersonProto`.
   - Đối tượng mới ban đầu rỗng, nhưng có thể truy cập các phương thức/thuộc tính từ nguyên mẫu.

3. **Thêm thuộc tính cho đối tượng**:
   - Có thể thêm thuộc tính thủ công (không khuyến khích) hoặc sử dụng một hàm khởi tạo (init) để thiết lập thuộc tính một cách có hệ thống.

### Ví dụ minh họa

#### Tạo nguyên mẫu và đối tượng

```javascript
// Tạo đối tượng nguyên mẫu
const PersonProto = {
  calcAge() {
    console.log(2025 - this.birthYear);
  },
};

// Tạo đối tượng mới với Object.create
const steven = Object.create(PersonProto);

// Thêm thuộc tính thủ công (không tối ưu)
steven.name = "Steven";
steven.birthYear = 1990;

// Gọi phương thức từ nguyên mẫu
steven.calcAge(); // Kết quả: 35
```

#### Tạo hàm khởi tạo (init) để thêm thuộc tính

```javascript
// Thêm phương thức khởi tạo vào nguyên mẫu
PersonProto.init = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Tạo đối tượng mới
const sarah = Object.create(PersonProto);

// Gọi hàm khởi tạo
sarah.init("Sarah", 1979);
sarah.calcAge(); // Kết quả: 46
```

### So sánh với hàm tạo và lớp ES6

- **Hàm tạo (Constructor Functions)**:

  - Sử dụng toán tử `new` để tự động liên kết nguyên mẫu với thuộc tính `prototype` của hàm tạo.
  - Ví dụ: `new Person()` liên kết nguyên mẫu với `Person.prototype`.

- **Lớp ES6 (ES6 Classes)**:

  - Ngầm định thiết lập nguyên mẫu thông qua cú pháp `class`.
  - Tự động xử lý việc liên kết nguyên mẫu.

- **Object.create**:
  - **Thủ công** thiết lập nguyên mẫu cho đối tượng mới.
  - Không cần hàm tạo hoặc thuộc tính `prototype`.
  - Chuỗi nguyên mẫu hoạt động tương tự, nhưng đơn giản và trực quan hơn.

### Ưu điểm và hạn chế

- **Ưu điểm**:

  - Linh hoạt, cho phép chỉ định bất kỳ đối tượng nào làm nguyên mẫu.
  - Đơn giản, trực quan khi làm việc với kế thừa nguyên mẫu.
  - Hữu ích trong việc triển khai **kế thừa giữa các lớp** (sẽ được đề cập ở bài sau).

- **Hạn chế**:
  - Ít được sử dụng trong thực tế so với hàm tạo và lớp ES6.
  - Yêu cầu thêm bước khởi tạo thủ công (như hàm `init`) để thêm thuộc tính.

### Ghi chú thêm

- `Object.create` rất quan trọng khi triển khai **kế thừa giữa các lớp (class inheritance)**, vì nó cho phép liên kết nguyên mẫu một cách rõ ràng.
- Kiểm tra nguyên mẫu của đối tượng:
  ```javascript
  console.log(steven.__proto__ === PersonProto); // Kết quả: true
  ```
- Hàm `init` không phải là hàm tạo, mà chỉ là một phương thức thông thường để thiết lập thuộc tính, được gọi trên đối tượng cụ thể.

### Kết luận

- `Object.create` cung cấp một cách tiếp cận thủ công, linh hoạt để triển khai kế thừa nguyên mẫu.
- Dù ít phổ biến trong thực tế, nó vẫn quan trọng để hiểu cách hoạt động của chuỗi nguyên mẫu và cần thiết cho các kỹ thuật kế thừa nâng cao.
