# Ghi Chú Học Tập: Giới Thiệu về Promises và Fetch API

## Mục tiêu

- Hiểu khái niệm `Promises` trong JavaScript như một giải pháp thay thế cho callback hell.
- Thay thế `XMLHttpRequest` bằng `Fetch API` để thực hiện AJAX call theo cách hiện đại.
- Nắm bắt vòng đời của một Promise (pending, fulfilled, rejected) và cách sử dụng Promise để xử lý các tác vụ bất đồng bộ.

## Nội dung

### 1. Tổng quan

- **Vấn đề callback hell**:
  - Trong bài trước, việc lồng các hàm gọi lại (nested callbacks) để thực hiện chuỗi AJAX call dẫn đến mã lộn xộn, khó bảo trì (callback hell).
  - Giải pháp: Sử dụng `Promises` (tính năng ES6, ra mắt năm 2015) để quản lý tác vụ bất đồng bộ một cách rõ ràng và dễ dàng hơn.
- **Fetch API**:
  - Phương thức hiện đại để thực hiện AJAX call, thay thế `XMLHttpRequest`.
  - Trả về một Promise, giúp xử lý kết quả bất đồng bộ hiệu quả hơn.

### 2. Thay thế XMLHttpRequest bằng Fetch API

- **Cách cũ với `XMLHttpRequest`**:
  ```javascript
  const request = new XMLHttpRequest();
  request.open("GET", "https://restcountries.com/v2/name/portugal");
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
  });
  ```
- **Cách mới với `Fetch API`**:
  ```javascript
  const request = fetch("https://restcountries.com/v2/name/portugal");
  console.log(request); // Trả về Promise { <pending> }
  ```
- **Lưu ý**:
  - `Fetch API` chỉ cần URL cho yêu cầu `GET` đơn giản, không cần cấu hình phức tạp.
  - Có thể thêm đối tượng tùy chọn (options object) cho các yêu cầu phức tạp hơn (ví dụ: `POST`), nhưng không cần trong trường hợp này.
  - Kết quả trả về ngay lập tức là một `Promise` ở trạng thái `pending`.

### 3. Promise là gì?

- **Định nghĩa**:
  - Promise là một đối tượng (object) đóng vai trò như một **chỗ chứa (placeholder)** cho kết quả tương lai của một tác vụ bất đồng bộ.
  - Có thể hiểu là một **container** cho giá trị sẽ được trả về trong tương lai.
- **Ví dụ minh họa**:
  - Kết quả của một AJAX call (như dữ liệu từ API) là một giá trị tương lai.
  - Promise lưu giữ giá trị này để xử lý khi sẵn sàng.
- **So sánh với vé số (lottery ticket)**:
  - Mua vé số = tạo Promise (chứa lời hứa về giá trị tương lai).
  - Kết quả xổ số (lottery draw) = tác vụ bất đồng bộ.
  - Nếu trúng số = Promise fulfilled (giá trị thành công).
  - Nếu không trúng = Promise rejected (lỗi).

### 4. Ưu điểm của Promises

- **Không cần sự kiện và callback**:
  - Thay vì dùng `addEventListener` và callback như `XMLHttpRequest`, Promise cho phép xử lý kết quả bất đồng bộ một cách trực quan hơn.
  - Tránh được kết quả không dự đoán được từ các callback.
- **Xâu chuỗi Promise (Promise chaining)**:
  - Cho phép thực hiện chuỗi tác vụ bất đồng bộ theo thứ tự mà không cần lồng callback, giúp thoát khỏi callback hell.
- **Tính phổ biến**:
  - Là tính năng ES6, được sử dụng rộng rãi trong JavaScript hiện đại.

### 5. Vòng đời của Promise (Promise Lifecycle)

![Promise lifecycle](/md_assets/Promise-lifecycle.png)

- **Pending**:
  - Trạng thái ban đầu khi Promise được tạo, tác vụ bất đồng bộ đang chạy trong nền (background).
  - Ví dụ: Khi gọi `fetch`, Promise ở trạng thái `pending` vì dữ liệu chưa được trả về.
- **Settled**:
  - Khi tác vụ bất đồng bộ hoàn tất, Promise chuyển sang trạng thái settled.
  - Có hai loại settled:
    - **Fulfilled**: Tác vụ thành công, giá trị sẵn sàng để sử dụng (ví dụ: API trả về dữ liệu).
    - **Rejected**: Tác vụ thất bại do lỗi (ví dụ: mất kết nối mạng).
- **Tính bất biến**:
  - Một Promise chỉ được settled một lần (fulfilled hoặc rejected) và không thể thay đổi trạng thái sau đó.
- **So sánh với vé số**:
  - Pending: Chờ kết quả xổ số.
  - Fulfilled: Trúng số, nhận tiền.
  - Rejected: Không trúng, mất tiền.

### 6. Tiêu thụ và tạo Promise

- **Tiêu thụ Promise (Consume a Promise)**:
  - Sử dụng Promise đã có sẵn, ví dụ: Promise trả về từ `fetch`.
  - Đây là phần phổ biến và dễ sử dụng nhất, sẽ được khám phá trong các bài tiếp theo.
- **Tạo Promise (Build a Promise)**:
  - Tự xây dựng Promise khi cần (ít phổ biến hơn).
  - Sẽ được học sau khi làm quen với việc tiêu thụ Promise.

### 7. Ghi chú thêm

- **Fetch API và Promise**:
  - `fetch` tự động trả về một Promise, giúp đơn giản hóa việc xử lý AJAX call.
  - Trạng thái `pending` xuất hiện ngay khi gọi `fetch`, chuyển sang `fulfilled` khi dữ liệu trả về.
- **Ứng dụng thực tế**:
  - Hiểu vòng đời Promise giúp xử lý các trạng thái khác nhau (thành công/lỗi) trong ứng dụng.
  - Promise là bước đầu tiên để thoát khỏi callback hell, mở đường cho các kỹ thuật như `async/await`.
- **Tài liệu tham khảo**:
  - Tài liệu MDN về `Fetch API` và `Promises` để hiểu sâu hơn về cách sử dụng.

---

**Lưu ý**: Ghi chú này được tối ưu cho Obsidian, với cấu trúc rõ ràng, dễ liên kết chéo và tra cứu. Nội dung tập trung vào ý chính, lược bỏ phần lan man, phù hợp để ôn tập học thuật.
