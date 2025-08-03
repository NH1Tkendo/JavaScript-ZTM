## JavaScript Bất Đồng Bộ và Gọi AJAX

### Khái niệm cơ bản

#### 1. Mã đồng bộ (Synchronous Code)

- Mã đồng bộ được thực thi từng dòng, theo thứ tự xác định trong mã.
- Mỗi dòng mã chờ dòng trước hoàn thành trước khi thực thi.
- **Vấn đề**: Các tác vụ chạy lâu (long-running tasks) như `alert()` sẽ chặn luồng thực thi, làm giao diện người dùng không phản hồi.
  - Ví dụ: Cửa sổ `alert()` ngăn mã tiếp tục cho đến khi người dùng nhấn "OK".

#### 2. Mã bất đồng bộ (Asynchronous Code)

- Mã bất đồng bộ cho phép các tác vụ chạy trong nền (background), không chặn luồng chính.
- **Đặc điểm**:
  - Không chờ tác vụ hoàn thành để thực thi dòng mã tiếp theo.
  - Sử dụng **callback functions** để xử lý kết quả khi tác vụ hoàn tất.
- **Ví dụ**: Hàm `setTimeout()`
  ```javascript
  console.log("Dòng 1: Đồng bộ");
  setTimeout(() => console.log("Dòng 2: Bất đồng bộ sau 5s"), 5000);
  console.log("Dòng 3: Đồng bộ, chạy ngay");
  ```
  - Dòng 2 chạy sau 5 giây, nhưng dòng 3 chạy ngay lập tức, không bị chặn.

#### 3. So sánh đồng bộ và bất đồng bộ

- **Đồng bộ**: Chặn luồng (blocking), chờ từng dòng mã hoàn thành.
- **Bất đồng bộ**: Không chặn (non-blocking), cho phép mã tiếp tục chạy trong khi tác vụ nền đang thực thi.
- **Lưu ý**: Không phải mọi callback function đều bất đồng bộ (ví dụ: callback trong `Array.map()` là đồng bộ).

#### 4. Ví dụ về mã bất đồng bộ

- **Tải hình ảnh**:
  ```javascript
  const img = document.querySelector("img");
  img.src = "image.jpg"; // Tải ảnh bất đồng bộ
  img.addEventListener("load", () => {
    console.log("Hình ảnh đã tải xong");
  });
  console.log("Dòng tiếp theo chạy ngay");
  ```
  - Việc đặt `src` cho ảnh là bất đồng bộ, không chặn mã.
  - Sự kiện `load` kích hoạt callback khi ảnh tải xong.

### AJAX và API

#### 1. AJAX là gì?

![AJAX](/md_assets/AJAX.png)

- **AJAX** (Asynchronous JavaScript and XML): Công nghệ cho phép giao tiếp với máy chủ từ xa một cách bất đồng bộ.
- **Ứng dụng**: Lấy dữ liệu từ máy chủ mà không cần tải lại trang (dynamic data fetching).
- **Quy trình**:
  - Ứng dụng JavaScript (client) gửi yêu cầu HTTP (HTTP request) đến máy chủ.
  - Máy chủ trả về phản hồi (response) chứa dữ liệu.
  - Tất cả diễn ra trong nền, không làm gián đoạn giao diện.

#### 2. API là gì?

- **API** (Application Programming Interface): Giao diện lập trình ứng dụng, cho phép các phần mềm giao tiếp và trao đổi dữ liệu.
- **Online API** (Web API): Ứng dụng chạy trên máy chủ, cung cấp dữ liệu khi nhận yêu cầu.
  - Ví dụ: API cung cấp thông tin thời tiết, thông tin quốc gia, hoặc tỷ giá ngoại tệ.
- **API bên thứ ba** (Third-party APIs): API do nhà phát triển khác cung cấp, thường miễn phí.

#### 3. Ứng dụng thực tế của AJAX và API

- Xây dựng ứng dụng du lịch:
  - Lấy dữ liệu thời tiết, thông tin quốc gia, chuyến bay, tỷ giá tiền tệ.
  - Gửi email, tin nhắn, hoặc nhúng Google Maps.
- **Ví dụ**: Gửi yêu cầu lấy dữ liệu quốc gia từ API để hiển thị thông tin trong ứng dụng.

#### 4. Định dạng dữ liệu API

- **XML**: Định dạng cũ, ít được sử dụng hiện nay.
- **JSON** (JavaScript Object Notation): Định dạng phổ biến nhất hiện nay.
  - JSON là một đối tượng JavaScript được chuyển thành chuỗi (string).
  - Dễ gửi qua web và sử dụng trong JavaScript.

### Ghi chú thêm

- **Quan trọng**: Không phải mọi sự kiện hoặc callback đều bất đồng bộ. Chỉ các tác vụ như tải ảnh, chạy bộ đếm thời gian (`setTimeout`), hoặc gọi AJAX mới có hành vi bất đồng bộ.
- AJAX và API là nền tảng cho các ứng dụng web hiện đại, cho phép tạo trải nghiệm người dùng động và mượt mà.
- Các bài học tiếp theo sẽ hướng dẫn thực hành gọi AJAX bằng `fetch`, xử lý Promises, và sử dụng async/await.

---

_Ghi chú_: Để ôn tập, hãy thử phân tích các đoạn mã ví dụ và kiểm tra cách chúng hoạt động trong trình duyệt. Liên kết với các ghi chú về Promises và async/await khi học tiếp.
