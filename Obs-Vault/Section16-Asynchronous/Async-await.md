## Async/Await trong JavaScript

### Giới thiệu về Async/Await

- **Async/await** là một cách mới và dễ dàng hơn để tiêu thụ (consume) các promise, được giới thiệu từ ES2017.
- Mục đích: Làm cho mã bất đồng bộ (asynchronous code) trông giống mã đồng bộ (synchronous code), giúp dễ đọc và bảo trì.
- Async/await là **syntactic sugar** (cú pháp đơn giản hóa) của phương thức `.then()` khi xử lý promise.

### Cách sử dụng Async/Await

- **Async function**: Tạo một hàm bất đồng bộ bằng cách thêm từ khóa `async` trước khai báo hàm.
  - Hàm async luôn trả về một **promise**.
  - Hàm chạy bất đồng bộ trong nền (background), không chặn luồng chính (main thread).
- **Await**: Sử dụng từ khóa `await` bên trong hàm async để đợi promise được giải quyết (resolved).
  - `await` tạm dừng thực thi mã tại điểm đó cho đến khi promise hoàn thành, nhưng không chặn luồng chính.
  - Giá trị của biểu thức `await` là giá trị đã được giải quyết của promise.

### Ví dụ: Hàm `whereAmI` sử dụng Async/Await

Hàm `whereAmI` sử dụng async/await để lấy thông tin vị trí và dữ liệu quốc gia từ các API.

```javascript
async function whereAmI() {
  console.log("FIRST"); // In trước vì hàm async chạy trong nền
  // Lấy vị trí địa lý (Geolocation)
  const pos = await getPosition(); // getPosition trả về promise
  const { lat, lng } = pos.coords;

  // Reverse geocoding: Lấy thông tin quốc gia từ tọa độ
  const resGeo = await fetch(
    `https://api.geocoding.com/...?lat=${lat}&lng=${lng}`
  );
  const dataGeo = await resGeo.json();
  const country = dataGeo.country;

  // Lấy thông tin quốc gia
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();

  // Hiển thị dữ liệu quốc gia
  renderCountry(data[0]);
}

// Gọi hàm
whereAmI();
```

```

### Các bước thực hiện trong hàm `whereAmI`

1. **Lấy vị trí địa lý (Geolocation)**:
   - Gọi hàm `getPosition()` (trả về promise).
   - Dùng `await` để lấy kết quả và trích xuất `lat`, `lng`.
2. **Reverse Geocoding**:
   - Gửi yêu cầu API với tọa độ để lấy tên quốc gia.
   - Dùng `await` để lấy phản hồi và chuyển đổi sang JSON.
3. **Lấy dữ liệu quốc gia**:
   - Gửi yêu cầu đến API `restcountries` với tên quốc gia.
   - Dùng `await` để lấy dữ liệu JSON và hiển thị.

### Lợi ích của Async/Await

- Mã dễ đọc, trông giống mã đồng bộ, không cần lồng nhiều `.then()`.
- Loại bỏ sự phức tạp của callback hell hoặc chuỗi `.then()`.
- Dễ dàng gán giá trị promise đã giải quyết vào biến.
- Không chặn luồng chính, giữ cho ứng dụng mượt mà.

### Lưu ý

- Async/await chỉ áp dụng cho **tiêu thụ promise**, không ảnh hưởng đến cách tạo promise.
- Async/await là cách đơn giản hóa cú pháp, nhưng vẫn sử dụng promise bên dưới.
- Cần xử lý lỗi (error handling) để tránh cascade lỗi khi một promise bị từ chối (rejected).
  - Ví dụ: Lỗi 403 từ API reverse geocoding do giới hạn yêu cầu (3 yêu cầu/giây).

### Ghi chú thêm

- Async/await thường được kết hợp với `.then()` trong một số trường hợp (sẽ được đề cập trong bài tiếp theo).
- Để xử lý lỗi, cần thêm cơ chế try/catch (sẽ được trình bày sau).
- Nếu không có hàm `renderCountry`, có thể lấy từ kho mã nguồn (GitHub repository) của khóa học.

---

**Tham khảo**: Sử dụng async/await giúp mã dễ bảo trì hơn, đặc biệt trong các ứng dụng gọi nhiều API liên tiếp.

```
