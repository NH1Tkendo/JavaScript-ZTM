## Xử Lý Lỗi 404 Trong Yêu Cầu API

### Mục tiêu

- Khắc phục lỗi 404 (Not Found) trong yêu cầu API từ bài giảng trước.
- Tạo cơ chế xử lý lỗi thủ công khi `fetch` không tự động từ chối lời hứa (promise).
- Tối ưu hóa mã bằng cách xây dựng hàm trợ giúp `getJSON` để đơn giản hóa việc lấy dữ liệu và xử lý lỗi.

### Khái niệm cơ bản

- **Lỗi 404**: Xảy ra khi API không tìm thấy tài nguyên (ví dụ: quốc gia không tồn tại).
- **Promise trong fetch**: Theo mặc định, `fetch` không từ chối lời hứa khi nhận được mã trạng thái lỗi (như 404). Cần xử lý thủ công.
- **Thuộc tính `response.ok`**:
  - `true` nếu mã trạng thái là 200 (OK).
  - `false` nếu mã trạng thái là lỗi (như 404).
- **Throw Error**: Tạo lỗi thủ công để từ chối lời hứa, cho phép xử lý lỗi trong khối `catch`.

### Cách thực hiện

1. **Kiểm tra phản hồi (response)**:

   - Trong hàm `then` đầu tiên của `fetch`, kiểm tra thuộc tính `response.ok`.
   - Nếu `response.ok` là `false`, ném lỗi thủ công bằng `throw new Error`.

2. **Tạo hàm trợ giúp `getJSON`**:

   - Đóng gói logic `fetch`, xử lý lỗi, và chuyển đổi dữ liệu sang JSON.
   - Đầu vào: URL và thông báo lỗi tùy chỉnh.
   - Trả về: Một lời hứa (promise) chứa dữ liệu JSON hoặc lỗi.

3. **Xử lý trường hợp đặc biệt**:
   - Khi không có quốc gia láng giềng (neighbor), ném lỗi thủ công để thông báo cho người dùng.

### Ví dụ

#### Kiểm tra `response.ok` và ném lỗi

```javascript
fetch("https://api.example.com/country/invalid")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Quốc gia không tồn tại (${response.status})`);
    }
    return response.json();
  })
  .then((data) => {
    // Xử lý dữ liệu
  })
  .catch((err) => {
    console.error(err.message); // Hiển thị: Quốc gia không tồn tại (404)
  });
```

#### Hàm trợ giúp `getJSON`

```javascript
async function getJSON(url, errorMsg = "Đã xảy ra lỗi") {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${errorMsg} (${response.status})`);
  }
  return response.json();
}

// Sử dụng getJSON
getJSON("https://api.example.com/country/invalid", "Quốc gia không tồn tại")
  .then((data) => {
    // Xử lý dữ liệu
  })
  .catch((err) => {
    console.error(err.message); // Hiển thị: Quốc gia không tồn tại (404)
  });
```

#### Xử lý trường hợp không có láng giềng

```javascript
.then(data => {
  if (!data.neighbor) {
    throw new Error('Không tìm thấy quốc gia láng giềng');
  }
  // Tiếp tục xử lý dữ liệu
})
.catch(err => {
  console.error(err.message); // Hiển thị: Không tìm thấy quốc gia láng giềng
});
```

### Mã nguồn hoàn chỉnh

```javascript
async function getJSON(url, errorMsg = "Đã xảy ra lỗi") {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${errorMsg} (${response.status})`);
  }
  return response.json();
}

function fetchCountryData(country) {
  getJSON(
    `https://api.example.com/country/${country}`,
    "Quốc gia không tồn tại"
  )
    .then((data) => {
      renderCountry(data);
      if (!data.neighbor) {
        throw new Error("Không tìm thấy quốc gia láng giềng");
      }
      return getJSON(
        `https://api.example.com/country/${data.neighbor}`,
        "Quốc gia láng giềng không tồn tại"
      );
    })
    .then((neighborData) => {
      renderCountry(neighborData, "neighbor");
    })
    .catch((err) => {
      displayError(err.message);
    });
}
```

### Ghi chú thêm

- **Tầm quan trọng của xử lý lỗi**:
  - Hiển thị thông báo lỗi rõ ràng cho người dùng.
  - Tránh để lời hứa bị từ chối mà không được xử lý, gây ra lỗi không kiểm soát.
- **Tối ưu hóa mã**:
  - Sử dụng `getJSON` để giảm lặp lại mã, tăng tính tái sử dụng.
  - Đặt thông báo lỗi tùy chỉnh để phù hợp với ngữ cảnh.
- **Trường hợp thực tế**:
  - Trong ứng dụng web, lỗi là không thể tránh khỏi. Luôn chuẩn bị cơ chế xử lý lỗi để đảm bảo trải nghiệm người dùng tốt.
- **Kỹ thuật ném lỗi**:
  - `throw new Error` trong bất kỳ hàm `then` nào sẽ từ chối lời hứa và chuyển lỗi xuống khối `catch`.
  - Áp dụng kỹ thuật này để xử lý các tình huống không mong muốn (như không có láng giềng).
