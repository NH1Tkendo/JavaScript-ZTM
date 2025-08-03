## Lấy Dữ Liệu Thủ Đô của Ba Quốc Gia Song Song (Parallel Data Fetching)

### Mục tiêu

- Tạo một hàm bất đồng bộ (async function) để lấy thông tin thủ đô của ba quốc gia từ API.
- Sử dụng `Promise.all` để chạy các yêu cầu API song song, thay vì tuần tự, nhằm tiết kiệm thời gian tải.
- Định dạng kết quả trả về là một mảng chứa các thủ đô của ba quốc gia.

### Khái niệm chính

- **Hàm bất đồng bộ (Async Function)**: Hàm được khai báo với từ khóa `async`, luôn trả về một `Promise`. Cần được xử lý trong khối `try-catch` để quản lý lỗi.
- **Promise.all**: Một hàm tĩnh (static method) của đối tượng `Promise`, nhận vào một mảng các `Promise` và thực thi chúng đồng thời (song song). Kết quả trả về là một mảng chứa kết quả của các `Promise` theo thứ tự đầu vào.
- **Ưu điểm của chạy song song**: Tiết kiệm thời gian tải khi các yêu cầu không phụ thuộc lẫn nhau, so với chạy tuần tự (sequential).

### Cách thực hiện

1. **Khai báo hàm bất đồng bộ**:

   - Tạo hàm `getThreeCountries` nhận ba tham số là tên ba quốc gia.
   - Sử dụng khối `try-catch` để xử lý lỗi.

2. **Sử dụng `Promise.all`**:

   - Gọi hàm `getJSON` (được giả định đã định nghĩa trước) để lấy dữ liệu từ API REST Countries cho từng quốc gia.
   - Truyền một mảng các `Promise` vào `Promise.all` để thực thi song song.
   - Lấy dữ liệu thủ đô từ kết quả trả về.

3. **Xử lý kết quả**:
   - Sử dụng `map` để trích xuất trường `capital` từ mảng kết quả của `Promise.all`.
   - Trả về mảng chứa các thủ đô.

### Mã nguồn

```javascript
async function getThreeCountries(c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    const capitals = data.map((d) => d[0].capital[0]);
    return capitals;
  } catch (err) {
    console.error(err);
    throw err; // Ném lỗi để xử lý bên ngoài nếu cần
  }
}

// Gọi hàm
getThreeCountries("Portugal", "Canada", "Tanzania")
  .then((capitals) => console.log(capitals))
  .catch((err) => console.error("Lỗi:", err));
```

### Ví dụ kết quả

- Đầu vào: `getThreeCountries('Portugal', 'Canada', 'Tanzania')`
- Đầu ra: `['Lisbon', 'Ottawa', 'Dodoma']`

### Ghi chú thêm

- **Hiệu suất**: Chạy các yêu cầu API song song với `Promise.all` giảm thời gian chờ so với chạy tuần tự. Ví dụ, nếu mỗi yêu cầu mất 0.5 giây, chạy song song chỉ mất 0.5 giây thay vì 1.5 giây.
- **Xử lý lỗi**: Nếu bất kỳ `Promise` nào trong `Promise.all` bị từ chối (reject), toàn bộ `Promise.all` sẽ bị từ chối ngay lập tức (short-circuit).
- **Ứng dụng thực tế**: Sử dụng `Promise.all` trong các tình huống cần thực hiện nhiều tác vụ bất đồng bộ không phụ thuộc lẫn nhau, như lấy dữ liệu từ nhiều nguồn API.
- **Hàm `getJSON`**: Được giả định là hàm tiện ích đã định nghĩa trước, thực hiện yêu cầu `fetch` và chuyển đổi phản hồi thành JSON, bao gồm xử lý lỗi cơ bản.

### Lưu ý khi sử dụng

- Đảm bảo API được gọi (như REST Countries) hỗ trợ định dạng dữ liệu mong muốn.
- Trong môi trường thực tế, cần triển khai xử lý lỗi chi tiết hơn thay vì chỉ ghi log ra console.
- Kiểm tra kỹ tên quốc gia để tránh lỗi cú pháp (ví dụ: "Portugal" thay vì "Portugall").
