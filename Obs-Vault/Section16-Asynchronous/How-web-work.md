# Ghi Chú Học Tập: Tổng Quan về Cách Hoạt Động của Yêu Cầu và Phản Hồi trên Web

## Mục tiêu

- Hiểu cách hoạt động của mô hình yêu cầu-phản hồi (request-response model) và kiến trúc máy khách-máy chủ (client-server architecture).
- Nắm bắt vai trò của các giao thức như HTTP/HTTPS, TCP/IP và DNS trong việc truyền dữ liệu trên web.
- Hiểu cấu trúc của yêu cầu HTTP (HTTP request) và phản hồi HTTP (HTTP response).
- Lưu ý: Bài học này mang tính chất tùy chọn, cung cấp cái nhìn sâu hơn về cơ chế hoạt động của web, không bắt buộc để tiếp tục khóa học.

## Nội dung

### 1. Tổng quan về mô hình yêu cầu-phản hồi

- **Mô hình yêu cầu-phản hồi (Request-Response Model)**:
  - Máy khách (client, thường là trình duyệt) gửi yêu cầu tới máy chủ (server).
  - Máy chủ trả về phản hồi chứa dữ liệu hoặc trang web được yêu cầu.
  - Áp dụng cho cả việc truy cập trang web và dữ liệu từ API.
- **Kiến trúc máy khách-máy chủ (Client-Server Architecture)**:
  - Là nền tảng của cách web hoạt động, dựa trên sự trao đổi giữa máy khách và máy chủ.

### 2. Phân tích URL

- **Cấu trúc URL**:
  - Ví dụ: `https://restcountries.eu/rest/v2/name/portugal`
  - **Giao thức (Protocol)**: `HTTP` hoặc `HTTPS` (bảo mật hơn, sử dụng mã hóa TLS/SSL).
  - **Tên miền (Domain Name)**: `restcountries.eu` – tên dễ nhớ, không phải địa chỉ thực của máy chủ.
  - **Tài nguyên (Resource)**: `/rest/v2/name/portugal` – đường dẫn tới dữ liệu cụ thể trên máy chủ.
- **Vai trò của DNS (Domain Name Server)**:
  - DNS chuyển đổi tên miền thành địa chỉ IP thực của máy chủ (ví dụ: `192.168.1.1`).
  - Hoạt động như “danh bạ điện thoại” của internet.
  - Trình duyệt gửi yêu cầu tới DNS qua nhà cung cấp dịch vụ internet (ISP) để lấy địa chỉ IP.

### 3. Thiết lập kết nối

- **Kết nối TCP Socket**:
  - Sau khi có địa chỉ IP, trình duyệt thiết lập kết nối TCP socket với máy chủ.
  - Kết nối này được duy trì trong suốt quá trình truyền dữ liệu.
- **Cổng (Port)**:
  - Là “địa chỉ phụ” để xác định dịch vụ cụ thể trên máy chủ (khác với tài nguyên trong URL).
- **TCP/IP**:
  - **TCP (Transmission Control Protocol)**: Chia dữ liệu thành các gói nhỏ (packets) trước khi gửi và lắp ráp lại tại đích.
  - **IP (Internet Protocol)**: Định tuyến các gói dữ liệu qua internet đến đúng địa chỉ IP.
  - Là hệ thống điều khiển cơ bản của internet, quy định cách dữ liệu di chuyển.

### 4. Yêu cầu HTTP (HTTP Request)

- **Giao thức HTTP (Hypertext Transfer Protocol)**:
  - Quy định cách máy khách và máy chủ giao tiếp thông qua các thông điệp yêu cầu và phản hồi.
- **Cấu trúc yêu cầu HTTP**:
  - **Dòng bắt đầu (Start Line)**:
    - **Phương thức HTTP (HTTP Method)**:
      - `GET`: Lấy dữ liệu.
      - `POST`: Gửi dữ liệu.
      - `PUT`/`PATCH`: Sửa đổi dữ liệu.
    - **Mục tiêu yêu cầu (Request Target)**: Tài nguyên được yêu cầu (ví dụ: `/rest/v2/name/portugal`).
    - **Phiên bản HTTP**: Ví dụ, HTTP/1.1.
  - **Tiêu đề yêu cầu (Request Headers)**:
    - Cung cấp thông tin về yêu cầu (trình duyệt, ngôn ngữ người dùng, thời gian, v.v.).
  - **Thân yêu cầu (Request Body)**:
    - Chứa dữ liệu gửi đi (nếu có, ví dụ: dữ liệu từ biểu mẫu HTML).
- **Lưu ý**: Nhà phát triển không cần viết yêu cầu HTTP thủ công, nhưng hiểu cấu trúc giúp làm việc hiệu quả hơn.

### 5. Phản hồi HTTP (HTTP Response)

- **Cấu trúc phản hồi HTTP**:
  - **Dòng bắt đầu (Start Line)**:
    - Phiên bản HTTP.
    - Mã trạng thái (Status Code): Ví dụ, `200 OK` (thành công), `404 Not Found` (không tìm thấy).
    - Thông điệp trạng thái.
  - **Tiêu đề phản hồi (Response Headers)**:
    - Thông tin về phản hồi (giống như tiêu đề yêu cầu).
  - **Thân phản hồi (Response Body)**:
    - Chứa dữ liệu trả về, thường là JSON (từ API) hoặc HTML (từ trang web).
- **Quy trình**:
  - Máy chủ xử lý yêu cầu, chuẩn bị dữ liệu hoặc trang web.
  - Gửi phản hồi HTTP về máy khách.

### 6. Trường hợp truy cập trang web

- Khi truy cập một trang web:
  - Yêu cầu đầu tiên trả về file HTML.
  - Trình duyệt phân tích HTML để tìm các tài nguyên liên quan (CSS, JavaScript, hình ảnh, v.v.).
  - Mỗi tài nguyên yêu cầu một HTTP request riêng.
- Nhiều yêu cầu/phản hồi có thể xảy ra đồng thời, nhưng số lượng bị giới hạn để tránh làm chậm kết nối.

### 7. Vai trò của TCP/IP trong truyền dữ liệu

- **TCP**:
  - Chia yêu cầu/phản hồi thành các gói dữ liệu nhỏ (packets).
  - Lắp ráp lại các gói tại đích để tái tạo dữ liệu gốc.
  - Đảm bảo dữ liệu đến nhanh chóng bằng cách cho phép các gói đi qua các tuyến đường khác nhau.
- **IP**:
  - Định tuyến các gói dữ liệu đến đúng địa chỉ IP.
- **Lợi ích**:
  - Truyền dữ liệu hiệu quả hơn so với gửi toàn bộ dữ liệu dưới dạng một khối lớn.

### 8. Ghi chú thêm

- **HTTPS vs HTTP**:
  - HTTPS sử dụng mã hóa TLS/SSL để bảo mật dữ liệu.
  - Logic yêu cầu/phản hồi giống HTTP, chỉ khác ở lớp mã hóa.
- **Ứng dụng thực tế**:
  - Hiểu cơ chế này giúp làm việc hiệu quả hơn với Ajax và API.
  - Cung cấp nền tảng để xử lý các vấn đề liên quan đến kết nối mạng và tối ưu hóa hiệu suất web.
- **Tài liệu tham khảo**:
  - Tài liệu về HTTP, TCP/IP, và DNS để hiểu sâu hơn về giao thức mạng.

---

**Lưu ý**: Ghi chú này được tối ưu để sử dụng trong Obsidian, với cấu trúc rõ ràng, dễ liên kết chéo và tra cứu. Nội dung tập trung vào ý chính, lược bỏ các phần không cần thiết, phù hợp cho việc ôn tập học thuật.
