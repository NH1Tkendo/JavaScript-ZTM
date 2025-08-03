## Các Hàm Kết Hợp Promise (Promise Combinators)

### Mục tiêu

- Hiểu và áp dụng bốn hàm kết hợp `Promise` (`Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`) để xử lý nhiều tác vụ bất đồng bộ.
- Tập trung vào đặc điểm, cách sử dụng và ứng dụng thực tế của từng hàm.

### Khái niệm chính

#### 1. Promise.race

- **Định nghĩa**: Nhận một mảng các `Promise` và trả về một `Promise` mới. `Promise` này hoàn thành (settled) ngay khi một trong các `Promise` đầu vào hoàn thành (fulfilled hoặc rejected).
- **Đặc điểm**:
  - "Cuộc đua" giữa các `Promise`, `Promise` hoàn thành đầu tiên sẽ quyết định kết quả của `Promise.race`.
  - Nếu `Promise` thắng là fulfilled, kết quả là giá trị fulfilled của nó. Nếu là rejected, `Promise.race` cũng rejected.
  - **Short-circuit**: Kết thúc ngay khi có một `Promise` hoàn thành.
- **Ứng dụng**: Ngăn chặn các yêu cầu kéo dài quá lâu (ví dụ: timeout cho yêu cầu API).

#### 2. Promise.allSettled

- **Định nghĩa**: Nhận một mảng các `Promise` và trả về một mảng chứa trạng thái của tất cả `Promise` (fulfilled hoặc rejected).
- **Đặc điểm**:
  - Không short-circuit, luôn trả về kết quả của tất cả `Promise` bất kể trạng thái.
  - Mỗi phần tử trong mảng kết quả là một đối tượng `{ status: 'fulfilled' | 'rejected', value | reason }`.
- **Ứng dụng**: Cần thu thập kết quả của tất cả `Promise`, kể cả khi một số thất bại.

#### 3. Promise.any

- **Định nghĩa**: Nhận một mảng các `Promise` và trả về `Promise` fulfilled đầu tiên, bỏ qua các `Promise` rejected.
- **Đặc điểm**:
  - Chỉ trả về `Promise` fulfilled đầu tiên.
  - Nếu tất cả `Promise` đều rejected, trả về một `AggregateError`.
  - Ra mắt trong ES2021, có thể chưa hỗ trợ ở một số trình duyệt cũ.
- **Ứng dụng**: Tìm kiếm kết quả thành công đầu tiên từ nhiều nguồn.

#### 4. Promise.all (Đã trình bày trước đó)

- **Định nghĩa**: Chạy tất cả `Promise` song song và trả về một mảng các kết quả fulfilled.
- **Đặc điểm**: Short-circuit nếu bất kỳ `Promise` nào rejected.
- **Ứng dụng**: Tải đồng thời dữ liệu từ nhiều nguồn không phụ thuộc lẫn nhau.

### Mã nguồn

#### Promise.race

- **Ví dụ**: So sánh tốc độ tải dữ liệu từ ba quốc gia.

```javascript
(async function () {
  try {
    const res = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/Italy`),
      getJSON(`https://restcountries.com/v3.1/name/Egypt`),
      getJSON(`https://restcountries.com/v3.1/name/Mexico`),
    ]);
    console.log(res[0].capital[0]); // Thủ đô của quốc gia nhanh nhất
  } catch (err) {
    console.error("Lỗi:", err);
  }
})();
```

- **Ví dụ Timeout**: Ngăn yêu cầu API kéo dài quá lâu.

```javascript
const timeout = (sec) => {
  return new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error("Yêu cầu mất quá nhiều thời gian!")),
      sec * 1000
    );
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/Tanzania`),
  timeout(0.2), // Timeout sau 0.2 giây
])
  .then((res) => console.log(res[0].capital[0]))
  .catch((err) => console.error("Lỗi:", err));
```

#### Promise.allSettled

- **Ví dụ**: Kiểm tra trạng thái của nhiều `Promise`.

```javascript
Promise.allSettled([
  Promise.resolve("Thành công 1"),
  Promise.reject(new Error("Lỗi")),
  Promise.resolve("Thành công 2"),
])
  .then((results) => console.log(results))
  .catch((err) => console.error("Lỗi:", err));
```

- **Kết quả**:

```json
[
  { status: 'fulfilled', value: 'Thành công 1' },
  { status: 'rejected', reason: Error: Lỗi },
  { status: 'fulfilled', value: 'Thành công 2' }
]
```

#### Promise.any

- **Ví dụ**: Lấy `Promise` fulfilled đầu tiên.

```javascript
Promise.any([
  Promise.reject(new Error("Lỗi 1")),
  Promise.resolve("Thành công 1"),
  Promise.resolve("Thành công 2"),
])
  .then((result) => console.log(result)) // 'Thành công 1'
  .catch((err) => console.error("Lỗi:", err));
```

### Ghi chú thêm

- **Promise.race**:
  - Hữu ích khi cần kết quả nhanh nhất hoặc kiểm soát thời gian chờ (timeout).
  - Ví dụ: Đặt timeout 5 giây cho yêu cầu API trong ứng dụng thực tế.
- **Promise.allSettled**:
  - Phù hợp khi cần biết trạng thái của tất cả `Promise`, đặc biệt trong báo cáo hoặc phân tích.
- **Promise.any**:
  - Lý tưởng khi chỉ cần một kết quả thành công từ nhiều nguồn (ví dụ: thử nhiều API mirror).
  - Lưu ý kiểm tra hỗ trợ trình duyệt do là tính năng mới (ES2021).
- **Quan trọng nhất**: `Promise.all` và `Promise.race` là hai hàm phổ biến nhất trong phát triển thực tế.
- **Lưu ý về timeout**:
  - Đảm bảo chuyển đổi đúng đơn vị thời gian (giây sang mili giây).
  - Điều chỉnh giá trị timeout dựa trên tốc độ mạng hoặc yêu cầu cụ thể.

### Lưu ý khi sử dụng

- Luôn xử lý lỗi trong khối `catch` để tránh ứng dụng bị treo.
- Kiểm tra tính tương thích của `Promise.any` với môi trường mục tiêu.
- Sử dụng các hàm kết hợp phù hợp với kịch bản cụ thể để tối ưu hóa hiệu suất và trải nghiệm người dùng.
