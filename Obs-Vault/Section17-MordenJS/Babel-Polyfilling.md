## Cấu hình Babel để chuyển mã (Transpile) và Polyfill

### Lý do cần Babel

- **Mục đích**: Chuyển mã JavaScript hiện đại (ES6+) sang ES5 để đảm bảo tương thích với các trình duyệt cũ (như Internet Explorer trên Windows XP hoặc Windows 7).
- **Tầm quan trọng**: Đảm bảo ứng dụng hoạt động cho mọi người dùng, kể cả những người sử dụng trình duyệt lỗi thời.

### Tích hợp Babel trong Parcel

- Parcel tự động sử dụng Babel để chuyển mã (transpile) mà không cần cấu hình phức tạp.
- Theo mặc định, Parcel sử dụng các thiết lập hợp lý, không cần chỉ định trình duyệt hỗ trợ cụ thể.
- Chỉ các trình duyệt có thị phần dưới 0.25% không được hỗ trợ bởi thiết lập mặc định.

### Cách Babel hoạt động

#### Tổng quan

- Babel sử dụng **plugins** và **presets**:
  - **Plugin**: Chuyển đổi một tính năng JavaScript cụ thể (ví dụ: chuyển arrow function sang function thông thường).
  - **Preset**: Tập hợp nhiều plugin để chuyển đổi toàn bộ tính năng ES6+ sang ES5.
- Parcel mặc định sử dụng preset `@babel/preset-env`, tự động chọn tính năng cần chuyển đổi dựa trên hỗ trợ trình duyệt.

#### Ví dụ minh họa

- Trong bundle đầu ra (thư mục `dist`):
  - `const` được chuyển thành `var`.
  - Template literal được chuyển thành phương thức `concat`.
  - Các tính năng ES6 khác (như arrow function, class) được chuyển đổi sang ES5.
- Kiểm tra bundle (ví dụ: `script.fd3.js`) cho thấy không còn cú pháp ES6.

### Xử lý các tính năng thử nghiệm

- Một số tính năng chưa chính thức (như class fields, nullish coalescing operator) từng yêu cầu plugin riêng (ví dụ: `@babel/plugin-proposal-class-properties`).
- Hiện tại, Parcel và Babel đã hỗ trợ tốt các tính năng này mà không cần cấu hình thêm.

#### Ví dụ: Class Fields

```javascript
class Person {
  greeting = "Hey"; // Class field (stage 3 tại thời điểm ghi)
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting} ${this.name}`);
  }
}
const jonas = new Person("Jonas"); // In: "Hey Jonas"
```

- Kết quả: Class được chuyển thành hàm tạo (constructor function) trong ES5, không còn từ khóa `class`.

#### Ví dụ: Nullish Coalescing Operator

```javascript
const name = jonas ?? null; // Nullish coalescing operator
```

- Kết quả: Tính năng này cũng được xử lý tự động bởi Babel trong Parcel.

### Polyfilling các tính năng không chuyển đổi được

- **Vấn đề**: Babel chỉ chuyển đổi cú pháp (syntax) ES6 (như arrow function, const, class) sang ES5, nhưng không thể chuyển đổi các tính năng mới (như `Array.prototype.find`, `Promise`).
- **Giải pháp**: Sử dụng **polyfill** để tái tạo các tính năng này trong trình duyệt cũ.

#### Sử dụng Core-js

- **Core-js**: Thư viện cung cấp polyfill cho các tính năng như `Promise`, `Array.prototype.find`.
- Cài đặt và import:
  ```javascript
  import "core-js/stable";
  ```
- Parcel tự động cài đặt `core-js` nếu cần, nhưng có thể cần cài thủ công:
  ```bash
  npm install core-js
  ```
- Kết quả: Trong bundle, các phương thức như `Array.prototype.find` được tái tạo (ví dụ: `array.prototype.find` được định nghĩa).

#### Cherry-pick Polyfill

- Theo mặc định, `core-js/stable` polyfill toàn bộ tính năng, bao gồm cả những tính năng không dùng (như `findIndex`, `every`).
- Để giảm kích thước bundle, có thể chỉ định polyfill cụ thể:
  ```javascript
  import "core-js/stable/array/find";
  import "core-js/stable/promise";
  ```
- Lưu ý: Việc này tốn công sức nhưng giúp tối ưu kích thước bundle.

#### Polyfill Async Functions

- Cần thêm gói `regenerator-runtime` để polyfill các hàm async/await:
  ```bash
  npm install regenerator-runtime
  ```
- Import trong code:
  ```javascript
  import "regenerator-runtime/runtime";
  ```
- Đặt các import này ở đầu file để đảm bảo tính năng được tải trước.

### Lưu ý quan trọng

- Các cấu hình có thể thay đổi theo thời gian (ví dụ: sau 2 năm, cách hoạt động có thể khác).
- Đảm bảo sử dụng đúng phiên bản của `parcel`, `core-js`, và `regenerator-runtime` như trong khóa học (kiểm tra `package.json`).
- Đây là công thức (recipe) cần làm theo, sẽ trở thành thói quen sau thời gian.

## Ghi chú thêm

- Ôn lại: Cách Babel chuyển đổi cú pháp, polyfill tính năng, và cấu hình Parcel.
- Trong các video tiếp theo: Tìm hiểu về viết code JavaScript hiện đại và sạch (clean code).
