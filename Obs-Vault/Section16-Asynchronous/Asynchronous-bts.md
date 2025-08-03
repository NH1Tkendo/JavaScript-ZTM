# Ghi chú học tập: Hiểu Biết Cơ Chế Hoạt Động của JavaScript Bất Đồng Bộ

## Tổng Quan về JavaScript Runtime

### Khái niệm JavaScript Runtime

![js](/md_assets/JS-runtime.png)

- **JavaScript runtime** là một môi trường chứa các thành phần cần thiết để thực thi mã JavaScript.
- Thành phần chính:
  - **Engine**: Nơi mã được thực thi và lưu trữ đối tượng trong bộ nhớ, bao gồm:
    - **Call stack (Ngăn xếp gọi)**: Nơi thực thi mã.
    - **Heap (Bộ nhớ đệm)**: Nơi lưu trữ đối tượng.
  - JavaScript chỉ có **một luồng thực thi (single-thread)**, không hỗ trợ đa nhiệm (multitasking).
  - **Web APIs environment**: Cung cấp các API như DOM, timers, fetch API, geolocation API, không thuộc ngôn ngữ JavaScript.
  - **Callback queue (Hàng đợi gọi lại)**: Lưu trữ các hàm callback sẵn sàng thực thi khi sự kiện xảy ra.
  - **Event loop (Vòng lặp sự kiện)**: Chuyển callback từ hàng đợi vào call stack khi call stack trống, đảm bảo hành vi bất đồng bộ (asynchronous behavior).

### Vai trò của Event Loop

- **Event loop** là thành phần cốt lõi cho phép mô hình đồng thời không chặn (non-blocking concurrency model) trong JavaScript.
- **Chức năng**:
  - Kiểm tra call stack có trống không.
  - Chuyển callback từ callback queue vào call stack để thực thi khi call stack trống.
  - Mỗi lần chuyển callback được gọi là một **event loop tick (lượt vòng lặp sự kiện)**.
- Event loop điều phối (orchestration) giữa call stack và callback queue, quyết định thời điểm thực thi các callback.

## Cơ Chế Hoạt Động của JavaScript Bất Đồng Bộ

### Mô hình đồng thời không chặn (Non-blocking Concurrency Model)

- JavaScript chỉ có một luồng thực thi, nhưng vẫn xử lý các tác vụ bất đồng bộ thông qua:
  - **Web APIs environment**: Xử lý các tác vụ bất đồng bộ như tải hình ảnh, gọi AJAX, timers.
  - **Callback queue**: Lưu trữ các callback sẵn sàng thực thi.
  - **Event loop**: Điều phối việc thực thi callback.
- Các tác vụ bất đồng bộ không chạy trong call stack, tránh chặn luồng chính.

### Ví dụ minh họa

#### Tải hình ảnh bất đồng bộ

```javascript
const img = document.querySelector("img");
img.src = "dog.jpg";
img.addEventListener("load", () => {
  console.log("Image loaded");
});
```

- **Giải thích**:
  - `img.src = 'dog.jpg'`: Tải hình ảnh bất đồng bộ trong môi trường Web APIs, không chặn call stack.
  - `addEventListener('load', callback)`: Đăng ký callback trong Web APIs, chờ sự kiện `load` được kích hoạt.
  - Khi hình ảnh tải xong, callback được chuyển vào **callback queue**.
  - **Event loop** chuyển callback vào call stack khi call stack trống.

#### Gọi AJAX với Fetch API

```javascript
fetch("https://api.example.com/data").then((response) => {
  console.log("Data fetched");
});
```

- **Giải thích**:
  - `fetch`: Thực hiện gọi API bất đồng bộ trong Web APIs.
  - `.then(response => {...})`: Đăng ký callback liên kết với promise, chờ kết quả từ API.
  - Callback của promise không vào callback queue mà vào **microtasks queue**.

### Microtasks Queue

- **Microtasks queue** là hàng đợi đặc biệt dành cho các callback của promise (gọi là microtasks).
- **Ưu tiên**:
  - Microtasks queue có độ ưu tiên cao hơn callback queue.
  - Sau mỗi event loop tick, event loop kiểm tra microtasks queue trước, thực thi tất cả microtasks trước khi xử lý callback queue.
- **Hệ quả**:
  - Microtasks có thể "chen ngang" trước các callback thông thường.
  - Nếu microtasks liên tục thêm microtasks mới, callback queue có thể bị "đói" (starvation), dẫn đến trì hoãn thực thi các callback thông thường.

### Quy trình thực thi bất đồng bộ

1. **Tác vụ bất đồng bộ**:
   - Các tác vụ như tải hình ảnh, gọi AJAX, timers được xử lý trong Web APIs.
   - Không chặn call stack, cho phép mã tiếp tục chạy.
2. **Đăng ký callback**:
   - Callback được đăng ký trong Web APIs, chờ sự kiện hoàn thành (ví dụ: hình ảnh tải xong, API trả về dữ liệu).
3. **Chuyển vào hàng đợi**:
   - Callback thông thường → **Callback queue**.
   - Callback của promise → **Microtasks queue**.
4. **Event loop xử lý**:
   - Kiểm tra call stack trống → Chuyển callback từ microtasks queue (nếu có) hoặc callback queue vào call stack.
   - Microtasks được ưu tiên thực thi trước.

## Ghi chú thêm

- **Hạn chế của timers**:
  - Thời gian định sẵn (ví dụ: 5 giây) không đảm bảo callback chạy đúng sau 5 giây, mà chỉ đảm bảo không chạy trước 5 giây.
  - Nếu callback queue có nhiều callback đang chờ, timer callback có thể bị trì hoãn.
- **DOM events**:
  - Các sự kiện như click, keypress không phải bất đồng bộ, nhưng callback của chúng vẫn đi qua callback queue.
- **Tầm quan trọng của kiến thức này**:
  - Hiểu cơ chế bất đồng bộ giúp viết mã hiệu quả hơn và trả lời tốt các câu hỏi phỏng vấn.
  - Đặt bạn vào top 5-10% lập trình viên JavaScript nhờ hiểu sâu về runtime và event loop.

## Kết luận

- JavaScript runtime, với event loop, callback queue, microtasks queue và Web APIs, cho phép xử lý bất đồng bộ hiệu quả dù chỉ có một luồng thực thi.
- Việc sử dụng callback và promise giúp trì hoãn mã đến khi tác vụ bất đồng bộ hoàn thành, đảm bảo không chặn luồng chính.
- Microtasks queue ưu tiên xử lý promise, có thể ảnh hưởng đến thứ tự thực thi các callback thông thường.
