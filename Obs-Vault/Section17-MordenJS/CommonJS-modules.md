## Các Hệ Thống Module Khác trong JavaScript

### Giới thiệu

- Ngoài **ES6 Modules** và **Module Pattern**, JavaScript từng sử dụng các hệ thống module khác, không phải native, dựa trên các triển khai bên ngoài:
  - **AMD Modules** (Asynchronous Module Definition).
  - **CommonJS Modules**.
- **CommonJS** đặc biệt quan trọng vì được sử dụng rộng rãi trong **Node.js** và kho lưu trữ **npm**.

### CommonJS Modules

- **Vai trò**:
  - CommonJS là hệ thống module chính trong Node.js trong hầu hết thời gian tồn tại của nó.
  - Chỉ gần đây, **ES Modules** mới được tích hợp vào Node.js.
- **Node.js**:
  - Là môi trường chạy JavaScript trên máy chủ (web server), ngoài trình duyệt.
  - Hầu hết các module trong kho **npm** sử dụng CommonJS vì npm ban đầu chỉ dành cho Node.js.
- **Hệ quả**:
  - npm trở thành kho lưu trữ chuẩn cho toàn bộ hệ sinh thái JavaScript, dẫn đến việc CommonJS vẫn phổ biến.
  - Người lập trình viên có thể gặp cú pháp CommonJS trong các dự án hoặc thư viện cũ.

### Cú pháp CommonJS

- **Đặc điểm**:
  - Một file là một module, tương tự ES6 Modules.
  - Sử dụng `module.exports` để xuất (export) và `require()` để nhập (import).
- **Ví dụ mã nguồn**:

```javascript
// Xuất (export) một hàm trong CommonJS
module.exports.myFunction = function () {
  console.log("Hàm từ CommonJS module");
};

// Nhập (import) trong CommonJS
const myFunction = require("./myModule");
myFunction();
```

- **Giải thích**:
  - `module.exports`: Đối tượng dùng để xuất các thành phần (hàm, biến, đối tượng) từ module.
  - `require()`: Hàm dùng để nhập module, chỉ có trong môi trường Node.js, không hoạt động trong trình duyệt.
  - Cú pháp này không chạy trong trình duyệt vì `module` và `require` không được định nghĩa trong môi trường trình duyệt.

### So sánh với ES6 Modules

- **Giống nhau**: Một file là một module, có cơ chế xuất/nhập.
- **Khác biệt**:
  - CommonJS sử dụng `module.exports` và `require()`, trong khi ES6 Modules dùng `export` và `import`.
  - CommonJS không chạy nguyên bản trong trình duyệt, cần Node.js hoặc công cụ như module bundler.
- **Tương lai**:
  - ES6 Modules là tiêu chuẩn hiện đại, dự kiến sẽ thay thế dần CommonJS.
  - Tuy nhiên, CommonJS vẫn phổ biến trong các dự án cũ và thư viện npm.

### Ghi chú thêm

- **Tầm quan trọng**: Hiểu CommonJS giúp làm việc với các thư viện npm cũ hoặc dự án Node.js.
- **Khuyến nghị**: Ưu tiên sử dụng ES6 Modules trong các dự án mới để tận dụng tính năng chuẩn và khả năng tích hợp với module bundler.
- **Học tiếp**: Các bài tiếp theo sẽ hướng dẫn:
  - Sử dụng gói bên thứ ba từ npm.
  - Gộp module (bundling) bằng module bundler.
  - Chuyển mã (transpile) về ES5 cho các trình duyệt cũ.

---

**Lưu ý**: Ghi chú được tối ưu cho Obsidian, sử dụng Markdown với cấu trúc rõ ràng, tập trung vào ý chính và giữ nguyên mã nguồn để dễ tra cứu.
