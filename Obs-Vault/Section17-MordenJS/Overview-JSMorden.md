## Tổng quan về Phát triển JavaScript Hiện đại

### Giới thiệu

- Phần này cung cấp cái nhìn tổng quan về cách viết và phát triển ứng dụng JavaScript hiện đại.
- Không chỉ đơn thuần là viết mã trong một tệp script lớn và gửi thẳng tới trình duyệt, mà sử dụng các quy trình và công cụ hiện đại để tổ chức và tối ưu hóa mã.
- Mục tiêu: Hiểu cách các nhà phát triển chuyên nghiệp xây dựng ứng dụng JavaScript trong thực tế.

### Nội dung chính

#### 1. Tổ chức mã theo mô-đun (Modules)

- **Khái niệm**:
  - Thay vì viết toàn bộ mã trong một hoặc vài tệp script lớn, mã được chia thành nhiều mô-đun (modules).
  - Các mô-đun giúp:
    - Tổ chức mã tốt hơn, dễ bảo trì (maintainable).
    - Cho phép chia sẻ dữ liệu giữa các mô-đun.
  - Có thể tích hợp các mô-đun bên thứ ba (3rd-party modules) từ kho lưu trữ NPM.
- **Ví dụ**:
  - Các thư viện phổ biến như React, jQuery, hoặc Leaflet (dùng trong dự án Mapty) đều là các gói (packages) có sẵn trên NPM.

#### 2. NPM - Quản lý gói (Node Package Manager)

- **Khái niệm**:
  - NPM là cả một kho lưu trữ (repository) chứa hàng ngàn gói mã nguồn mở (open-source packages) và một giao diện dòng lệnh (command line interface) để quản lý các gói này.
  - Ban đầu được phát triển cùng Node.js, nhưng hiện là công cụ tiêu chuẩn cho phát triển JavaScript hiện đại.
- **Chức năng**:
  - Tải xuống, cài đặt và quản lý các gói từ kho NPM.
  - Ví dụ: Cài đặt React hoặc Leaflet để sử dụng trong dự án.

#### 3. Quy trình xây dựng (Build Process)

![Modern JavaScript Development](/md_assets/Morden-JS-Dev.png)

- **Tổng quan**:
  - Sau khi hoàn thành mã nguồn (chia thành mô-đun và tích hợp các gói bên thứ ba), dự án cần trải qua quy trình xây dựng để tạo ra một tệp JavaScript cuối cùng (bundle) dùng cho triển khai (deployment) trong môi trường sản xuất (production).
  - Môi trường sản xuất: Ứng dụng được sử dụng bởi người dùng thực tế.
- **Các bước chính**:
  1. **Gộp mã (Bundling)**:
     - Gộp tất cả các mô-đun thành một tệp JavaScript duy nhất.
     - Loại bỏ mã không sử dụng (unused code) và nén mã (compress) để tối ưu hóa.
     - Lý do:
       - Một số trình duyệt cũ không hỗ trợ mô-đun.
       - Gửi ít tệp hơn tới trình duyệt giúp cải thiện hiệu suất (performance).
  2. **Chuyển đổi mã (Transpiling và Polyfilling)**:
     - Sử dụng công cụ như Babel để chuyển đổi cú pháp JavaScript hiện đại (ES6+) về cú pháp ES5, đảm bảo tương thích với trình duyệt cũ.
     - Polyfilling: Cung cấp các tính năng hiện đại cho trình duyệt cũ.

#### 4. Công cụ xây dựng (Build Tools)

- **Khái niệm**:
  - Các công cụ tự động hóa quy trình xây dựng, giúp gộp mã và chuyển đổi cú pháp.
  - Phổ biến: Webpack và Parcel.
- **So sánh**:
  - **Webpack**:
    - Phổ biến hơn, nhưng phức tạp do cần cấu hình thủ công.
  - **Parcel**:
    - Không cần cấu hình (zero-configuration), hoạt động ngay khi cài đặt.
    - Dễ sử dụng, phù hợp cho người mới bắt đầu.
- **Cách sử dụng**:
  - Các công cụ này cũng được tải xuống và quản lý thông qua NPM, tương tự như các gói mã nguồn.

#### 5. Các công cụ phát triển khác

- **Ví dụ**:
  - **Live-server**: Dùng để chạy ứng dụng trong quá trình phát triển.
  - **Babel**: Chuyển đổi mã về ES5.
  - **Parcel**: Công cụ gộp mã.
- Tất cả đều được cài đặt và quản lý qua NPM.

### Ghi chú thêm

- Quy trình phát triển hiện đại giúp mã nguồn trở nên dễ quản lý, tối ưu hóa hiệu suất và tương thích với nhiều trình duyệt.
- Sử dụng Parcel làm công cụ gộp mã chính trong khóa học do tính đơn giản và hiệu quả.
- Phần này giúp người học tiếp cận cách làm việc của các nhà phát triển chuyên nghiệp, là bước tiến quan trọng trong việc trở thành lập trình viên JavaScript chuyên nghiệp.
