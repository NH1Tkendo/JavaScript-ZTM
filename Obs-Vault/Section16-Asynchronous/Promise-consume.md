# Ghi Chú Học Tập: Tiêu Thụ Promise với Fetch API

## Mục tiêu

- Hiểu cách tiêu thụ (consume) một Promise trả về từ `Fetch API`.
- Tái hiện hàm `getCountryData` từ bài giảng đầu tiên, sử dụng `Promises` thay vì `XMLHttpRequest`.
- Nắm bắt cách xử lý dữ liệu bất đồng bộ từ `fetch` và phương thức `json()`.

## Nội dung

### 1. Tổng quan

- **Mục đích**: Chuyển hàm `getCountryData` từ cách dùng `XMLHttpRequest` sang `Fetch API` với `Promises`.
- **Promise trong Fetch API**:
  - `fetch()` trả về một Promise ngay lập tức, ở trạng thái `pending` khi yêu cầu AJAX được gửi đi.
  - Khi tác vụ hoàn tất, Promise chuyển sang trạng thái `settled` (hoặc `fulfilled` nếu thành công, hoặc `rejected` nếu thất bại).

### 2. Tiêu thụ Promise từ Fetch API

- **Cấu trúc cơ bản**:
  - Gọi `fetch()` để gửi yêu cầu AJAX.
  - Sử dụng phương thức `.then()` để xử lý Promise khi nó được `fulfilled`.
  - Phương thức `response.json()` chuyển đổi dữ liệu từ phản hồi thành đối tượng JavaScript, nhưng cũng trả về một Promise mới.
- **Mã ví dụ**:
  ```javascript
  function getCountryData(country) {
    fetch(`https://restcountries.com/v2/name/${country}`)
      .then(function (response) {
        console.log(response); // Đối tượng Response
        return response.json(); // Trả về Promise mới
      })
      .then(function (data) {
        console.log(data); // Dữ liệu JSON đã chuyển đổi
        renderCountry(data[0]); // Hiển thị quốc gia
      });
  }
  ```
- **Gọi hàm**:
  ```javascript
  getCountryData("portugal");
  ```

### 3. Phân tích quy trình

- **Bước 1: Gọi `fetch`**:
  - `fetch('https://restcountries.com/v2/name/${country}')` trả về một Promise ở trạng thái `pending`.
  - Promise này chứa đối tượng `Response` khi hoàn tất (trạng thái `fulfilled`).
- **Bước 2: Xử lý Promise đầu tiên**:
  - Sử dụng `.then()` để xử lý đối tượng `Response`.
  - `response` chứa thông tin như mã trạng thái (status code), tiêu đề (headers), và thân phản hồi (body).
  - Thân phản hồi (body) là một `ReadableStream`, không thể đọc trực tiếp.
- **Bước 3: Chuyển đổi dữ liệu với `response.json()`**:
  - Gọi `response.json()` để chuyển đổi thân phản hồi thành đối tượng JavaScript.
  - `response.json()` là một hàm bất đồng bộ, trả về một Promise mới chứa dữ liệu đã chuyển đổi.
- **Bước 4: Xử lý Promise thứ hai**:
  - Sử dụng `.then()` thứ hai để xử lý dữ liệu từ `response.json()`.
  - Dữ liệu trả về là một mảng, cần lấy phần tử đầu tiên (`data[0]`) để hiển thị với hàm `renderCountry`.

### 4. Tối ưu mã

- **Mã rút gọn với arrow function**:
  ```javascript
  function getCountryData(country) {
    fetch(`https://restcountries.com/v2/name/${country}`)
      .then((response) => response.json())
      .then((data) => renderCountry(data[0]));
  }
  ```
- **Lợi ích**:
  - Mã ngắn gọn, dễ đọc, gần giống câu tiếng Anh.
  - Dễ hiểu logic: Gửi yêu cầu → Nhận phản hồi → Chuyển đổi JSON → Hiển thị dữ liệu.
  - Tránh được sự phức tạp của `XMLHttpRequest` (sự kiện `load`, callback lồng nhau).

### 5. So sánh với cách cũ

- **Cách cũ với `XMLHttpRequest`**:
  ```javascript
  function getCountryData(country) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();
    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      renderCountry(data);
    });
  }
  ```
- **Nhược điểm**:
  - Cần xử lý sự kiện `load` và callback, dẫn đến mã dài dòng.
  - Dễ dẫn đến callback hell khi thực hiện chuỗi AJAX call.
- **Ưu điểm của Fetch API + Promises**:
  - Mã ngắn gọn, dễ hiểu, dễ bảo trì.
  - Loại bỏ sự kiện và callback lồng nhau, giảm nguy cơ callback hell.
  - Dễ suy luận logic, giảm lỗi.

### 6. Callback trong Promises

- **Quan sát**:
  - Vẫn sử dụng callback trong `.then()`, nhưng không lồng nhau như callback hell.
  - Promises giúp tổ chức callback theo chuỗi (chaining), thay vì lồng ghép (nesting).
- **Tầm quan trọng**:
  - Promises không loại bỏ callback, nhưng giúp quản lý tác vụ bất đồng bộ hiệu quả hơn.
  - Lợi ích sẽ rõ ràng hơn khi thực hiện chuỗi AJAX call (ví dụ: lấy dữ liệu quốc gia láng giềng).

### 7. Ghi chú thêm

- **Đối tượng Response**:
  - Chứa thông tin như mã trạng thái (`status`), tiêu đề (`headers`), và thân phản hồi (`body`).
  - Cần gọi `response.json()` để chuyển đổi thân phản hồi thành dữ liệu sử dụng được.
- **Tính bất đồng bộ của `response.json()`**:
  - Là một hàm bất đồng bộ, trả về Promise mới, yêu cầu thêm một `.then()` để xử lý.
  - Đây là đặc điểm thiết kế của Fetch API, tuy hơi phức tạp nhưng cần chấp nhận.
- **Ứng dụng thực tế**:
  - Tiêu thụ Promise là kỹ năng cốt lõi khi làm việc với API hiện đại.
  - Chuỗi `.then()` là nền tảng để xây dựng các tác vụ bất đồng bộ phức tạp hơn (sẽ được khám phá trong bài tiếp theo với quốc gia láng giềng).
- **Tài liệu tham khảo**:
  - Tài liệu MDN về `Fetch API` và `Promises` để hiểu sâu hơn về cách xử lý phản hồi.

---

**Lưu ý**: Ghi chú này được tối ưu cho Obsidian, với cấu trúc rõ ràng, dễ liên kết chéo và tra cứu. Nội dung tập trung vào ý chính, lược bỏ phần lan man, phù hợp để ôn tập học thuật.
