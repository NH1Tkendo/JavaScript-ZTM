## Xử lý lỗi với Async/Await trong JavaScript

### Giới thiệu về Try/Catch

- **Try/catch** là một cơ chế xử lý lỗi có sẵn trong JavaScript, không chỉ dành riêng cho async/await.
- Try/catch được sử dụng để bắt và xử lý lỗi trong các hàm bất đồng bộ (async functions).
- Không thể sử dụng phương thức `.catch()` trực tiếp với async/await, thay vào đó dùng **try/catch**.

### Cách sử dụng Try/Catch

- **Try block**: Chứa mã cần thực thi. Nếu có lỗi xảy ra, JavaScript sẽ chuyển sang catch block.
- **Catch block**: Nhận đối tượng lỗi (`error`) và xử lý nó (ví dụ: hiển thị thông báo, ghi log).
- Nếu không có lỗi, catch block sẽ không được thực thi.

#### Ví dụ đơn giản về Try/Catch

```javascript
try {
  let y = 1;
  const x = 2;
  x = 3; // Lỗi: Gán lại giá trị cho hằng số
} catch (error) {
  alert(error.message); // Hiển thị: "Assignment to constant variable"
}
```

- **Giải thích**:
  - Lỗi được bắt trong catch block, ngăn mã dừng đột ngột.
  - Thông báo lỗi được hiển thị qua `alert`, không xuất hiện trong console.

### Áp dụng Try/Catch trong Async/Await

- Trong hàm async, bao bọc toàn bộ mã trong `try` block để bắt lỗi từ các promise.
- Sử dụng `catch` block để xử lý lỗi, ví dụ: hiển thị thông báo lỗi hoặc ghi log.

#### Ví dụ: Hàm `whereAmI` với Try/Catch

```javascript
async function whereAmI() {
  try {
    // Lấy vị trí địa lý
    const pos = await getPosition();
    const { lat, lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.geocoding.com/...?lat=${lat}&lng=${lng}`
    );
    if (!resGeo.ok) throw new Error("Problem getting location data"); // Tạo lỗi thủ công
    const dataGeo = await resGeo.json();
    const country = dataGeo.country;

    // Lấy dữ liệu quốc gia
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error("Problem getting country"); // Tạo lỗi thủ công
    const data = await res.json();

    // Hiển thị dữ liệu
    renderCountry(data[0]);
  } catch (error) {
    console.error(error); // Ghi log lỗi
    renderError(`🚫 ${error.message}`); // Hiển thị lỗi lên giao diện
  }
}

// Gọi hàm
whereAmI();
```

### Các điểm quan trọng trong xử lý lỗi

1. **Lỗi từ Fetch**:
   - Promise từ `fetch` không bị từ chối (rejected) với lỗi HTTP (như 403 hoặc 404), mà chỉ khi mất kết nối mạng.
   - Kiểm tra thuộc tính `ok` của response và ném lỗi thủ công với `throw new Error()` nếu cần.
2. **Lỗi từ Geolocation**:
   - Hàm `getPosition()` đã được thiết kế để tự động từ chối (reject) promise nếu có lỗi, nên không cần kiểm tra thủ công.
3. **Hiển thị lỗi**:
   - Sử dụng `renderError` để hiển thị thông báo lỗi thân thiện với người dùng.
   - Ví dụ: `🚫 Problem getting location data` khi API geocoding trả về lỗi 403 do vượt giới hạn yêu cầu.

### Lợi ích của Try/Catch trong Async/Await

- Ngăn mã dừng đột ngột khi xảy ra lỗi.
- Cho phép xử lý lỗi một cách rõ ràng và hiển thị thông báo thân thiện.
- Dễ dàng tích hợp vào luồng bất đồng bộ mà không cần chuỗi `.catch()` phức tạp.

### Ghi chú thêm

- **Không bỏ qua xử lý lỗi**: Đặc biệt quan trọng trong mã bất đồng bộ, vì nhiều lỗi có thể xảy ra (mất mạng, API từ chối, giới hạn yêu cầu...).
- Try/catch không dùng để sửa lỗi cú pháp, mà để xử lý các lỗi thực tế trong quá trình chạy.
- Có thể kết hợp async/await với `.then()/catch()` trong một số trường hợp cụ thể.

---

**Tham khảo**: Luôn kiểm tra và xử lý lỗi trong mã bất đồng bộ để đảm bảo ứng dụng hoạt động ổn định.
