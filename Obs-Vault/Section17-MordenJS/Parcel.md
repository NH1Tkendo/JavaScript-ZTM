## Giới thiệu về Parcel

### Lý do chọn Parcel

- Parcel là công cụ đóng gói mô-đun (module bundler) được sử dụng trong khóa học, nổi bật với tốc độ cao, dễ sử dụng và hoạt động ngay mà không cần cấu hình.
- So sánh với Webpack: Webpack phổ biến hơn, đặc biệt trong môi trường React, nhưng phức tạp nên không phù hợp cho khóa học này.

### Parcel như một công cụ xây dựng

- Parcel là công cụ xây dựng (build tool) có sẵn trên NPM.
- Cài đặt qua lệnh: `npm install parcel --save-dev`.
- Đây là phụ thuộc phát triển (devDependency): Chỉ dùng để xây dựng ứng dụng, không bao gồm trong mã code cuối cùng.
- Phụ thuộc phát triển xuất hiện trong trường `devDependencies` trong file `package.json`.
- Phụ thuộc thông thường (dependencies) là các thư viện được import trực tiếp vào code.

## Cài đặt và Chạy Parcel

### Cài đặt Parcel

- Sử dụng NPM để cài đặt cục bộ (local) cho dự án cụ thể, dẫn đến xuất hiện trong `package.json`.
- Không thể chạy lệnh `parcel` trực tiếp trong terminal vì gói được cài cục bộ.
- Hai cách chạy: Sử dụng NPX hoặc NPM scripts.

### Chạy với NPX

- NPX là công cụ tích hợp trong NPM, cho phép chạy gói cục bộ.
- Lệnh: `npx parcel index.html` (với `index.html` là điểm vào, nơi script.js được include).
- Parcel sẽ đóng gói các mô-đun (ví dụ: script.js, shoppingCart.js, cloneDeep từ Lodash).
- Tự động khởi động server phát triển (development server) tại `http://localhost:1234` (tương tự Live Server nhưng trên cổng 1234).

### Xử lý lỗi cài đặt hoặc chạy

- Nếu lỗi quyền: Sử dụng `sudo npm install parcel`.
- Nếu lỗi phiên bản: Cài đặt phiên bản cụ thể `npm install parcel@1.12.4`.
- Nếu vẫn lỗi: Gỡ cài đặt trước với `npm uninstall parcel`, sau đó cài lại phiên bản 1.12.4.

### Cấu hình script trong code

- Xóa thuộc tính `type="module"` trong thẻ `<script>` trong `index.html` vì Parcel tạo script thông thường (không phải module) để tương thích với trình duyệt cũ.

## Tính năng của Parcel

### Đóng gói và Server Phát Triển

- Parcel tạo thư mục `dist` (distribution) chứa file đã đóng gói cho production.
- Trong `dist/index.html`, script được thay bằng bundle mới (ví dụ: `script.fd3.js`).
- Bundle chứa tất cả code từ các mô-đun, bao gồm code từ Lodash.
- Server phát triển tự động reload khi lưu file, tương tự Live Server.

### Thay thế Mô-đun Nóng (Hot Module Replacement)

- Kích hoạt bằng code:
  ```
  if (module.hot) {
    module.hot.accept();
  }
  ```
- Khi thay đổi mô-đun, Parcel rebuild và inject bundle mới vào trình duyệt mà không reload toàn trang.
- Lợi ích: Giữ nguyên trạng thái (state) trên trang, tránh phải đăng nhập lại hoặc mất dữ liệu tạm thời (ví dụ: trong ứng dụng Bankist).
- Ví dụ: Khi import và add item vào giỏ hàng (shopping cart), state được duy trì qua các lần save, dẫn đến giỏ hàng tích lũy item.

### Import Thư viện

- Không cần chỉ định đường dẫn đầy đủ cho module từ NPM.
- Ví dụ: Thay vì `import cloneDeep from './node_modules/lodash-es/cloneDeep.js';`, dùng `import cloneDeep from 'lodash-es';`.
- Parcel tự tìm đường dẫn và install nếu cần.
- Hỗ trợ cả ES6 modules và CommonJS modules.

## Xây dựng cho Production

### Sử dụng NPM Scripts

- Thêm vào `package.json` phần `scripts`:
  ```
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  }
  ```
- Chạy phát triển: `npm run start`.
- Chạy build: `npm run build`.
- Build tạo bundle nén (compressed), loại bỏ code thừa (dead code elimination), với file nhỏ hơn cho performance tốt hơn.
- Thư mục `dist` chứa file cuối cùng để deploy.

## Cài đặt Toàn cục vs. Cục bộ

### Cài đặt Toàn cục

- Lệnh: `npm install parcel -g`.
- Ưu điểm: Có thể chạy lệnh `parcel` trực tiếp ở bất kỳ thư mục nào mà không cần NPM scripts (tương tự Live Server).
- Nhược điểm: Khó cập nhật phiên bản mới; các công cụ thường khuyến nghị cài cục bộ để dễ quản lý phiên bản.

### Khuyến nghị

- Ưu tiên cài cục bộ và dùng NPM scripts để chạy.

## Ghi chú thêm

- Ôn lại khái niệm NPM scripts, output của Parcel (thư mục dist, bundle files).
- Nội dung sẽ rõ ràng hơn khi áp dụng trong dự án thực tế tiếp theo.
