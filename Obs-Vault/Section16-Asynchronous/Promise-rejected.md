# Ghi chú học tập: Xử lý lỗi trong Promises (Ajax)

## Xử lý lỗi trong Promises

### Khái niệm cơ bản

- **Promise bị từ chối (Rejected Promise)**: Một promise được coi là bị từ chối khi xảy ra lỗi trong quá trình thực thi, ví dụ như mất kết nối mạng.
- **Lỗi thường gặp**: Trong các ứng dụng web, lỗi thường xảy ra, đặc biệt với các yêu cầu Ajax (như fetch API). Ví dụ: mất kết nối internet khiến fetch promise bị từ chối.
- **Mục tiêu**: Học cách xử lý các promise bị từ chối (rejections) để đảm bảo ứng dụng web hoạt động ổn định và cung cấp phản hồi phù hợp cho người dùng.

### Cách thực hiện

#### 1. Xử lý lỗi bằng phương thức `.then()`

- Phương thức `.then()` chấp nhận hai callback:
  - Callback thứ nhất: Xử lý khi promise được thực hiện thành công (fulfilled).
  - Callback thứ hai: Xử lý khi promise bị từ chối (rejected).
- Ví dụ:
  ```javascript
  fetch("https://api.example.com/data").then(
    (response) => response.json(),
    (error) => alert(error)
  );
  ```
- **Hạn chế**: Cần thêm callback xử lý lỗi cho mỗi `.then()` trong chuỗi promise, dẫn đến code lặp lại và khó bảo trì.

#### 2. Xử lý lỗi toàn cục bằng phương thức `.catch()`

- Phương thức `.catch()` được đặt ở cuối chuỗi promise để bắt toàn bộ lỗi xảy ra trong chuỗi, bất kể lỗi xuất hiện ở đâu.
- **Lợi ích**: Chỉ cần một nơi duy nhất để xử lý lỗi, giúp code gọn gàng và dễ bảo trì.
- Ví dụ:
  ```javascript
  fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => processData(data))
    .catch((error) => {
      console.error(`Lỗi: ${error.message} 😢😢`);
      renderError(`Có lỗi xảy ra: ${error.message} 😢😢`);
    });
  ```
- **Cơ chế**: Lỗi trong chuỗi promise sẽ "lan truyền" (propagate) xuống cho đến khi được bắt bởi `.catch()`. Nếu không được bắt, lỗi sẽ hiển thị dưới dạng "uncaught promise" trong console.

#### 3. Sử dụng phương thức `.finally()`

- **Mục đích**: Thực thi một hành động bất kể promise được fulfilled hay rejected.
- **Ứng dụng**: Dùng cho các tác vụ cần thực hiện trong mọi trường hợp, ví dụ: ẩn spinner tải dữ liệu hoặc đặt lại giao diện.
- Ví dụ:
  ```javascript
  fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => processData(data))
    .catch((error) => {
      console.error(`Lỗi: ${error.message} 😢😢`);
      renderError(`Có lỗi xảy ra: ${error.message} 😢😢`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1; // Hiển thị container bất kể thành công hay thất bại
    });
  ```
- **Lưu ý**: `.finally()` luôn được gọi và không nhận tham số từ promise (fulfilled hay rejected).

### Ví dụ thực tế

#### Mô phỏng mất kết nối internet

- **Kịch bản**: Người dùng nhấn nút để gửi yêu cầu Ajax, nhưng mất kết nối mạng.
- **Cách thực hiện**:
  1. Thêm sự kiện click cho nút:
     ```javascript
     btn.addEventListener("click", function () {
       getCountryData("germany");
     });
     ```
  2. Mô phỏng mất kết nối: Trong trình duyệt, vào tab Network, chuyển sang chế độ Offline.
  3. Xử lý lỗi bằng `.catch()`:
     ```javascript
     function getCountryData(country) {
       fetch(`https://restcountries.com/v3.1/name/${country}`)
         .then((response) => response.json())
         .then((data) => renderCountry(data[0]))
         .catch((error) => {
           console.error(`Lỗi: ${error.message} 😢😢`);
           renderError(`Có lỗi xảy ra: ${error.message} 😢😢`);
         })
         .finally(() => {
           countriesContainer.style.opacity = 1;
         });
     }
     ```

#### Hàm renderError

- **Mục đích**: Hiển thị thông báo lỗi cho người dùng.
- **Cấu trúc**:
  ```javascript
  function renderError(message) {
    countriesContainer.insertAdjacentText("beforeend", message);
    countriesContainer.style.opacity = 1;
  }
  ```
- **Giải thích**:
  - Sử dụng `insertAdjacentText` để thêm thông báo lỗi dạng văn bản (không phải HTML).
  - Đặt `opacity = 1` để đảm bảo container hiển thị.

### Ghi chú thêm

- **Đối tượng Error trong JavaScript**:
  - Mỗi lỗi là một đối tượng Error, chứa thuộc tính `message` (mô tả lỗi) và `stack` (stack trace – thông tin về nguồn gốc lỗi).
  - Ví dụ: `error.message` chỉ lấy nội dung lỗi, thay vì toàn bộ đối tượng.
- **Lỗi 404 (Not Found)**:
  - Fetch promise không coi lỗi 404 là rejected, mà vẫn fulfilled, nên `.catch()` không bắt được.
  - Cần xử lý riêng trong `.then()` bằng cách kiểm tra `response.ok` hoặc `response.status`.
  - Ví dụ:
    ```javascript
    fetch(`https://restcountries.com/v3.1/name/invalid`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Không tìm thấy quốc gia (${response.status})`);
        return response.json();
      })
      .then((data) => renderCountry(data[0]))
      .catch((error) => renderError(`Lỗi: ${error.message}`));
    ```
- **Tối ưu hóa**:
  - Sử dụng `.catch()` để xử lý lỗi tập trung.
  - Dùng `.finally()` cho các tác vụ chung như cập nhật giao diện.
  - Kiểm tra trạng thái phản hồi (response status) để xử lý các lỗi như 404.

### Tóm tắt

- **Xử lý lỗi promise**:
  - Dùng `.then()` với callback thứ hai để xử lý lỗi cục bộ (ít khuyến khích).
  - Dùng `.catch()` để xử lý lỗi toàn cục trong chuỗi promise.
  - Dùng `.finally()` cho các tác vụ luôn cần thực hiện.
- **Ứng dụng thực tế**: Hiển thị thông báo lỗi thân thiện cho người dùng, ghi log lỗi vào console để debug.
- **Lưu ý với lỗi 404**: Cần kiểm tra `response.status` để xử lý riêng, vì fetch không reject với lỗi HTTP.
