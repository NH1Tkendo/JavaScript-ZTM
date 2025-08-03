## Tính Năng Quan Trọng của JavaScript: JavaScript Bất Đồng Bộ

### Mục tiêu

- Hiểu và áp dụng JavaScript bất đồng bộ (asynchronous JavaScript) để xử lý các tác vụ chạy lâu (long-running tasks) trong nền.
- Tập trung vào việc lấy dữ liệu từ máy chủ từ xa thông qua các cuộc gọi AJAX (Asynchronous JavaScript and XML).

### Nội dung chính

#### 1. Khái niệm JavaScript bất đồng bộ

- JavaScript bất đồng bộ cho phép thực hiện các tác vụ mà không làm gián đoạn luồng chính của chương trình.
- Thường được sử dụng để:
  - Lấy dữ liệu từ máy chủ từ xa (remote servers).
  - Xử lý các tác vụ mất thời gian như tải tài nguyên, truy vấn cơ sở dữ liệu, hoặc xử lý tệp.

#### 2. Các khái niệm quan trọng

- **Promises**: Đối tượng đại diện cho kết quả của một tác vụ bất đồng bộ, có thể ở trạng thái:
  - Chờ (pending)
  - Hoàn thành (fulfilled)
  - Từ chối (rejected)
- **Fetch function**: Hàm tích hợp để thực hiện các yêu cầu HTTP (như GET, POST) để lấy dữ liệu từ máy chủ.
- **Async/Await**: Cú pháp hiện đại để làm việc với Promises, giúp mã dễ đọc và viết giống mã đồng bộ hơn.
- **Error handling**: Xử lý lỗi trong các tác vụ bất đồng bộ để đảm bảo chương trình hoạt động ổn định.

#### 3. Ứng dụng chính

- **AJAX calls**: Gửi yêu cầu đến máy chủ và nhận dữ liệu mà không cần tải lại trang.
- Ví dụ: Lấy dữ liệu từ API công khai (public API) như thông tin thời tiết hoặc danh sách người dùng.

#### 4. Ghi chú thêm

- JavaScript bất đồng bộ là nền tảng cho các ứng dụng web hiện đại, đặc biệt trong việc xây dựng giao diện người dùng động (dynamic UI).
- Cần hiểu rõ cách quản lý lỗi và tối ưu hóa hiệu suất khi làm việc với các tác vụ bất đồng bộ.

---

_Ghi chú_: Nội dung này sẽ được tiếp tục với các ví dụ cụ thể về Promises, fetch, async/await, và xử lý lỗi trong các phần tiếp theo.

##AJAX and APIs [[AJAX-APIs]]

##CAll API with AJAX [[AJAX-practice]]

##How the web works:Requests and Responses [[How-web-work]]

##Callback Hell [[Callback-hell]]

##Promise and the Fetch API [[Promise-FetchAPI]]

##Promise consume [[Promise-consume]]

##Promise chaining [[Promise-chaining]]

##Handling rejected promise [[Promise-rejected]]

##Throw error manually [[Throw-error]]

##Asynchronous behind the scence [[Asynchronous-bts]]

##Comsume promise with aysnc/await [[Async-await]]

##Error handling with try - catch [[Try-catch]]

##Returning value from async function [[ReturnValue-Async]]

##Running parallel promise [[Parallel-promise]]

##Promise combinators [[Promise-combinators]]
