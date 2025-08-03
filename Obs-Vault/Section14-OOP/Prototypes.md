# Ghi chú học tập: Kế thừa Prototype trong Lập trình hướng đối tượng

## Giới thiệu về Prototype
### Khái niệm
- Mỗi **hàm** trong JavaScript tự động có một thuộc tính gọi là `prototype` (thuộc tính nguyên mẫu).
- Các **đối tượng** được tạo từ **hàm tạo (constructor function)** sẽ **kế thừa (inherit)** tất cả các phương thức và thuộc tính được định nghĩa trong thuộc tính `prototype` của hàm tạo.
- **Kế thừa prototype (prototypal inheritance)**: Cho phép các đối tượng truy cập vào các phương thức và thuộc tính từ prototype của hàm tạo mà không cần sao chép chúng vào từng đối tượng.

### Cấu trúc
- **Thuộc tính prototype**: Là một đối tượng chứa các phương thức và thuộc tính mà các instance của hàm tạo có thể sử dụng.
- **Thuộc tính `__proto__`**: Mỗi đối tượng được tạo ra có một thuộc tính `__proto__`, trỏ tới `prototype` của hàm tạo, thiết lập mối liên kết để kế thừa.

### Ví dụ: Thêm phương thức vào prototype
```javascript
// Hàm tạo Person
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Thêm phương thức calcAge vào prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Tạo các instance
const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

// Gọi phương thức calcAge
jonas.calcAge(); // Kết quả: 46
matilda.calcAge(); // Kết quả: 20
```

### Giải thích
- Phương thức `calcAge` được định nghĩa trong `Person.prototype`, không nằm trực tiếp trong đối tượng `jonas` hay `matilda`.
- Nhờ **kế thừa prototype**, các đối tượng có thể truy cập `calcAge` thông qua thuộc tính `__proto__`.
- **Lợi ích**: Chỉ có một bản sao của phương thức `calcAge` trong `Person.prototype`, tiết kiệm bộ nhớ khi tạo nhiều instance.

## Kiểm tra Prototype
### Thuộc tính `__proto__`
- Mỗi đối tượng có thuộc tính `__proto__`, trỏ tới `prototype` của hàm tạo.
- Ví dụ:
  ```javascript
  console.log(jonas.__proto__); // Hiển thị Person.prototype, chứa calcAge
  console.log(jonas.__proto__ === Person.prototype); // true
  ```

### Phương thức `isPrototypeOf`
- Kiểm tra xem một đối tượng có phải là prototype của một đối tượng khác:
  ```javascript
  console.log(Person.prototype.isPrototypeOf(jonas)); // true
  console.log(Person.prototype.isPrototypeOf(matilda)); // true
  console.log(Person.prototype.isPrototypeOf(Person)); // false
  ```
- **Lưu ý**: `Person.prototype` không phải là prototype của `Person` (hàm tạo), mà là prototype của các instance được tạo từ `Person`.

## Thêm thuộc tính vào Prototype
- Ngoài phương thức, có thể thêm **thuộc tính** vào `prototype`:
  ```javascript
  Person.prototype.species = 'Homo Sapiens';
  console.log(jonas.species); // Kết quả: 'Homo Sapiens'
  console.log(matilda.species); // Kết quả: 'Homo Sapiens'
  ```
- **Lưu ý**: Thuộc tính `species` không nằm trực tiếp trong đối tượng `jonas` hay `matilda`, mà được kế thừa từ `Person.prototype`.

### Kiểm tra thuộc tính riêng (Own Properties)
- Sử dụng phương thức `hasOwnProperty` để kiểm tra xem một thuộc tính có nằm trực tiếp trong đối tượng hay không:
  ```javascript
  console.log(jonas.hasOwnProperty('firstName')); // true
  console.log(jonas.hasOwnProperty('species')); // false
  ```
- Thuộc tính `species` là thuộc tính kế thừa, không phải thuộc tính riêng của đối tượng.

## Vai trò của toán tử `new`
- Trong quy trình của toán tử `new`, bước thứ 3 liên kết đối tượng mới với `prototype` của hàm tạo:
  - Thiết lập thuộc tính `__proto__` của đối tượng để trỏ tới `Person.prototype`.
- Điều này cho phép đối tượng truy cập các phương thức và thuộc tính trong `Person.prototype`.

## Tổng kết
- **Prototype** là cơ chế cốt lõi để triển khai kế thừa trong JavaScript.
- **Person.prototype** chứa các phương thức và thuộc tính dùng chung cho tất cả instance của `Person`.
- **Thuộc tính `__proto__`** liên kết mỗi instance với `Person.prototype`.
- Tránh định nghĩa phương thức trong hàm tạo, thay vào đó sử dụng `prototype` để tối ưu hiệu suất.
- Hiểu rõ sự khác biệt giữa `prototype` (của hàm tạo) và `__proto__` (của instance) để tránh nhầm lẫn.

### Ghi chú thêm
- **Tên gọi `prototype`**: Tên này dễ gây nhầm lẫn vì `Person.prototype` không phải là prototype của `Person`, mà là prototype của các instance. Có thể hình dung nó như "prototype của các đối tượng được liên kết".
- Cần nắm rõ mối quan hệ giữa instance, `__proto__`, và `prototype` của hàm tạo.
- Bài học tiếp theo sẽ cung cấp biểu đồ để minh họa rõ hơn về cơ chế này.