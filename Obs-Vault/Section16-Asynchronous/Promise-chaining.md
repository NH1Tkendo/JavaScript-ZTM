# Ghi Chú Học Tập: Xâu Chuỗi Promises để Lấy Dữ Liệu Quốc Gia và Láng Giềng

## Mục tiêu

- Hiểu cách xâu chuỗi (chain) các Promise để thực hiện chuỗi AJAX call theo thứ tự.
- Tái hiện chức năng lấy dữ liệu quốc gia và quốc gia láng giềng, sử dụng `Fetch API` và `Promises`.
- Nhận biết lỗi phổ biến khi xâu chuỗi Promise và cách tránh quay lại callback hell.

## Nội dung

### 1. Tổng quan

- **Mục đích**:
  - Xây dựng chuỗi AJAX call để lấy dữ liệu quốc gia (call 1) và quốc gia láng giềng (call 2), dựa trên dữ liệu từ call 1.
  - Sử dụng `Promises` để tránh callback hell, tạo chuỗi Promise phẳng (flat chain of promises).
- **Tình huống**:
  - AJAX call 2 (lấy dữ liệu láng giềng) phụ thuộc vào mã code láng giềng (`borders`) từ dữ liệu của AJAX call 1.
  - Cần đảm bảo call 2 chỉ thực hiện sau khi call 1 hoàn tất.

### 2. Xâu chuỗi Promises

- **Mã cơ bản**:
  ```javascript
  function getCountryData(country) {
    fetch(`https://restcountries.com/v2/name/${country}`)
      .then((response) => response.json())
      .then((data) => {
        renderCountry(data[0]); // Hiển thị quốc gia 1
        const neighbor = data[0].borders?.[0]; // Lấy mã láng giềng đầu tiên
        if (!neighbor) return; // Thoát nếu không có láng giềng
        return fetch(`https://restcountries.com/v2/alpha/${neighbor}`); // AJAX call 2
      })
      .then((response) => response.json())
      .then((data) => renderCountry(data, "neighbor")); // Hiển thị quốc gia láng giềng
  }
  ```
- **Gọi hàm**:
  ```javascript
  getCountryData("portugal"); // Hiển thị Bồ Đào Nha và Tây Ban Nha
  getCountryData("germany"); // Hiển thị Đức và Áo
  ```

### 3. Phân tích quy trình xâu chuỗi

- **Bước 1: AJAX call 1**:
  - `fetch('https://restcountries.com/v2/name/${country}')` trả về Promise 1.
  - `.then(response => response.json())` xử lý Promise 1, trả về Promise 2 (dữ liệu JSON).
- **Bước 2: Xử lý dữ liệu quốc gia 1**:
  - `.then(data => {...})` nhận dữ liệu từ Promise 2.
  - Hiển thị quốc gia 1 bằng `renderCountry(data[0])`.
  - Lấy mã láng giềng: `data[0].borders?.[0]` (dùng optional chaining để tránh lỗi nếu `borders` không tồn tại).
  - Thoát sớm nếu không có láng giềng: `if (!neighbor) return`.
- **Bước 3: AJAX call 2**:
  - Trả về Promise mới từ `fetch('https://restcountries.com/v2/alpha/${neighbor}')`.
  - Promise này trở thành giá trị fulfilled của `.then()` hiện tại.
- **Bước 4: Xử lý dữ liệu quốc gia láng giềng**:
  - `.then(response => response.json())` xử lý Promise từ AJAX call 2, trả về Promise chứa dữ liệu JSON.
  - `.then(data => renderCountry(data, 'neighbor'))` hiển thị quốc gia láng giềng với lớp CSS `neighbor`.

### 4. Cơ chế xâu chuỗi Promises

- **Quy tắc**:
  - Phương thức `.then()` luôn trả về một Promise mới, bất kể có `return` giá trị hay không.
  - Nếu `return` một giá trị (bao gồm Promise), giá trị đó trở thành giá trị fulfilled của Promise mới.
- **Ví dụ minh họa**:
  ```javascript
  fetch(`https://restcountries.com/v2/name/portugal`)
    .then((response) => response.json())
    .then((data) => {
      return 23; // Trả về giá trị 23
    })
    .then((data) => alert(data)); // Hiển thị 23
  ```
  - Giá trị `23` từ `.then()` trước trở thành giá trị fulfilled của `.then()` sau.
- **Áp dụng với AJAX call**:
  - `return fetch(...)` trong `.then()` tạo Promise mới, cho phép tiếp tục xâu chuỗi `.then()` để xử lý kết quả.

### 5. Lỗi phổ biến: Quay lại callback hell

- **Sai lầm**:
  - Xâu chuỗi `.then()` trực tiếp bên trong một Promise mới, thay vì `return` Promise:
    ```javascript
    .then(data => {
      fetch(`https://restcountries.com/v2/alpha/${neighbor}`)
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbor')); // Callback hell
    })
    ```
  - Dẫn đến callback lồng nhau, giống callback hell.
- **Cách đúng**:
  - `return` Promise từ `.then()` và tiếp tục xâu chuỗi bên ngoài:
    ```javascript
    .then(data => {
      return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbor'));
    ```
  - Tạo chuỗi Promise phẳng, dễ đọc và bảo trì.

### 6. Ưu điểm của chuỗi Promise phẳng

- **So với callback hell**:
  - Callback hell: Callback lồng nhau tạo hình dạng “tam giác” (do thụt lề), khó đọc, khó bảo trì.
  - Chuỗi Promise phẳng: Các `.then()` xếp hàng ngang, logic rõ ràng, dễ mở rộng.
- **Khả năng mở rộng**:
  - Có thể xâu chuỗi nhiều AJAX call (ví dụ: láng giềng của láng giềng) mà không làm mã phức tạp.
- **Dễ hiểu**:
  - Logic đọc như câu tiếng Anh: Gửi yêu cầu → Nhận dữ liệu → Lấy láng giềng → Gửi yêu cầu mới → Hiển thị.

### 7. Ghi chú thêm

- **Xử lý trường hợp đặc biệt**:
  - Kiểm tra `data[0].borders` để tránh lỗi khi quốc gia không có láng giềng.
  - Sử dụng optional chaining (`?.`) để an toàn hơn khi truy cập thuộc tính.
- **Hạn chế của Fetch API**:
  - Cần gọi `response.json()` (trả về Promise mới), làm tăng số lượng `.then()`.
  - Đây là thiết kế của Fetch API, cần chấp nhận.
- **Hướng phát triển**:
  - Bài tiếp theo sẽ học cách xử lý lỗi (error handling) khi Promise bị `rejected` (ví dụ: lỗi mạng, API không phản hồi).
- **Tài liệu tham khảo**:
  - Tài liệu MDN về `Promises` và `Fetch API` để hiểu sâu hơn về xâu chuỗi và xử lý Promise.

---

**Lưu ý**: Ghi chú này được tối ưu cho Obsidian, với cấu trúc rõ ràng, dễ liên kết chéo và tra cứu. Nội dung tập trung vào ý chính, lược bỏ phần lan man, phù hợp để ôn tập học thuật.
