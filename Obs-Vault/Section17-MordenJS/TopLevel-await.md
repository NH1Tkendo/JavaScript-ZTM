## Top-Level Await trong ES2022

### Giới thiệu

- **Top-level await** là tính năng mới trong ES2022, cho phép sử dụng từ khóa `await` bên ngoài hàm `async`, nhưng chỉ trong các **module**.
- Tính năng này yêu cầu tệp JavaScript được đặt thuộc tính `type="module"` trong HTML.
- **Lưu ý**: Top-level await không hoạt động trong các script thông thường (non-module).

### Đặc điểm và cách sử dụng

- **Top-level await** cho phép viết mã bất đồng bộ (asynchronous code) mà không cần bọc trong hàm `async`.
- Ví dụ: Thực hiện yêu cầu HTTP (HTTP request) hoặc AJAX (AJAX request) trực tiếp trong module.
- **Cảnh báo**: Top-level await gây chặn (block) toàn bộ module cho đến khi lệnh `await` hoàn thành, có thể ảnh hưởng đến hiệu suất nếu tác vụ kéo dài.

### Ví dụ minh họa

#### Yêu cầu HTTP với Top-Level Await

- Sử dụng API `JSONPlaceholder` để lấy dữ liệu giả (fake data) về bài đăng (posts).
- Ví dụ mã nguồn:

```javascript
console.log("Bắt đầu fetch...");
const res = await fetch("https://jsonplaceholder.typicode.com/posts");
const data = await res.json();
console.log(data);
console.log("Kết thúc fetch");
```

- **Kết quả**:
  - Trả về mảng 100 bài đăng, mỗi bài là một đối tượng (object).
  - Toàn bộ mã trong module bị chặn cho đến khi lệnh `await` hoàn tất.

#### Ứng dụng thực tế: Lấy bài đăng cuối cùng

- Hàm `getLastPost` lấy bài đăng cuối cùng từ API.
- Sử dụng phương thức `at(-1)` (ES2022) để truy cập phần tử cuối của mảng.
- Ví dụ mã nguồn:

```javascript
async function getLastPost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
}

// Sử dụng top-level await để lấy kết quả
const lastPost = await getLastPost();
console.log(lastPost);
```

- **Kết quả**: Trả về đối tượng chứa tiêu đề (title) và nội dung (body) của bài đăng cuối cùng.
- **Lưu ý**: Gọi hàm `async` trả về một `Promise`. Để lấy dữ liệu thực tế, cần sử dụng `await` hoặc phương thức `.then()`.

### Hệ quả của Top-Level Await

- **Chặn module nhập (importing module)**:
  - Nếu một module sử dụng top-level await, module nhập nó sẽ phải chờ cho đến khi tác vụ bất đồng bộ hoàn tất.
  - Ví dụ: Trong module `shoppingCart.js`:

```javascript
console.log("Bắt đầu fetch users...");
await fetch("https://jsonplaceholder.typicode.com/users");
console.log("Kết thúc fetch users");
```

- Module `script.js` nhập `shoppingCart.js` sẽ bị chặn cho đến khi lệnh `await` trong `shoppingCart.js` hoàn tất.
- **Tác động**:
  - Tính năng này hữu ích cho các tác vụ bất đồng bộ đơn giản, nhưng cần thận trọng với các tác vụ lâu dài vì có thể làm chậm ứng dụng.

### Ghi chú thêm

- **Thận trọng khi sử dụng**: Top-level await là công cụ mạnh mẽ nhưng cần dùng cẩn thận để tránh chặn mã không mong muốn.
- **Tham khảo thêm**: Xem lại phần về bất đồng bộ (asynchronous JavaScript) trong các bài học trước để hiểu rõ hơn về `fetch`, `Promise`, và `async/await`.
- **Tài liệu**: Tìm hiểu thêm về phương thức `at()` trong ES2022 để làm việc với mảng.

---

**Lưu ý**: Nội dung trên được tối ưu để dễ đọc và tra cứu trong Obsidian, sử dụng cấu trúc Markdown rõ ràng, tập trung vào ý chính và giữ nguyên các đoạn mã quan trọng.
