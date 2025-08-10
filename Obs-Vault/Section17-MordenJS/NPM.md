## Sử Dụng NPM Lần Đầu

### Giới thiệu về NPM

- NPM (Node Package Manager) là công cụ quản lý gói phần mềm cho Node.js, bao gồm cả phần mềm trên máy tính và kho lưu trữ gói.
- Dùng để quản lý phụ thuộc (dependencies) trong dự án JavaScript.

### Tại Sao Cần NPM?

- Trước NPM, thư viện bên ngoài được nhúng trực tiếp vào HTML qua thẻ `<script>`, tạo biến toàn cục (global variable).
  - Ví dụ: Trong dự án Mapty, nhúng Leaflet.js trước script chính để sử dụng biến toàn cục.
- Vấn đề trong dự án lớn:
  - HTML tải toàn bộ JavaScript, gây lộn xộn.
  - Cập nhật thủ công: Tải file mới, thay thế trong hệ thống file.
  - Không có kho lưu trữ duy nhất cho tất cả gói, khó quản lý tải thủ công.
- NPM giải quyết: Quản lý phụ thuộc hiện đại, dễ dàng tải, cập nhật và chia sẻ.

### Kiểm Tra Và Cài Đặt NPM

- Kiểm tra phiên bản: Chạy lệnh `npm -v` trong terminal (nên lớn hơn 6).
- Nếu chưa có, tải Node.js từ nodejs.org (chọn phiên bản LTS), tự động cài NPM.

### Khởi Tạo Dự Án Với NPM

- Chạy `npm init` để tạo file `package.json`.
- Trả lời câu hỏi (hoặc nhấn Enter để dùng mặc định): Tên gói, phiên bản, mô tả, v.v.
- File `package.json`: Lưu cấu hình dự án (tên, phiên bản, phụ thuộc).

### Cài Đặt Gói Với NPM

- Ví dụ cài Leaflet: `npm install leaflet` (hoặc `npm i leaflet`).
  - Tạo mục `dependencies` trong `package.json` (ví dụ: `"leaflet": "^1.6.0"`).
  - Tạo thư mục `node_modules` chứa mã thư viện.
- Gói lớn chứa nhiều file, có thể lên hàng nghìn dòng code.

### Sử Dụng Gói Lodash-ES

- Lodash: Thư viện cung cấp hàm hữu ích cho mảng, đối tượng, hàm, ngày tháng (không có sẵn trong JavaScript).
- Cài phiên bản ES modules: `npm i lodash-es` (vì phiên bản thường dùng CommonJS, cần bundler).
- Nhập hàm cụ thể:
  ```javascript
  import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
  ```
- Ví dụ sử dụng `cloneDeep` để sao chép sâu đối tượng:

  ```javascript
  const state = {
    cart: [
      { product: "bread", quantity: 5 },
      { product: "pizza", quantity: 5 },
    ],
    user: { loggedIn: true },
  };

  const stateClone = Object.assign({}, state); // Sao chép nông (shallow copy)
  const stateDeepClone = cloneDeep(state); // Sao chép sâu (deep clone)

  state.user.loggedIn = false;
  console.log(stateClone); // loggedIn: false (thay đổi lan sang)
  console.log(stateDeepClone); // loggedIn: true (không thay đổi)
  ```

- Ưu điểm: Giải quyết vấn đề sao chép đối tượng lồng nhau mà không cần tự triển khai.

### Quản Lý Phụ Thuộc Với package.json

- Không copy thư mục `node_modules` khi di chuyển dự án (lớn, có thể hàng nghìn file).
- Tái cài tất cả phụ thuộc: Chạy `npm install` (hoặc `npm i`) mà không chỉ định gói.
  - NPM đọc `dependencies` từ `package.json` và tải lại từ kho NPM.

### Ghi Chú Thêm

- Nhập gói với đường dẫn dài (như `./node_modules/...`) không thực tế; cần dùng module bundler như Parcel để tối ưu.
- NPM giúp sử dụng mã nguồn mở (open source) để giải quyết vấn đề nhanh chóng, giống cách lập trình viên thực tế làm việc.
