## Module Pattern trong JavaScript

### Giới thiệu

- **Module pattern** là một cách triển khai module trong JavaScript trước khi có **ES6 modules**, nhằm:
  - **Đóng gói chức năng** (encapsulate functionality).
  - **Ẩn dữ liệu riêng tư** (private data).
  - **Cung cấp API công khai** (public API).
- Sử dụng **IIFE** (Immediately Invoked Function Expression - Biểu thức hàm được gọi ngay lập tức) để tạo phạm vi riêng (scope) và trả về dữ liệu một lần duy nhất.
- **Tầm quan trọng**: Hiểu module pattern giúp nhận biết mã cũ và ứng dụng khái niệm **closures** (đóng gói).

### Cách triển khai Module Pattern

- **Sử dụng IIFE**:
  - IIFE tạo một phạm vi mới, đảm bảo hàm chỉ chạy một lần và không cần gọi lại.
  - Cú pháp: `(function() { ... })()`.
- **Đóng gói dữ liệu**:
  - Các biến trong IIFE là riêng tư (private) vì thuộc phạm vi của hàm.
  - Trả về một đối tượng chứa các thành phần công khai (public API).
- **Ví dụ mã nguồn**:

```javascript
const shoppingCart2 = (function () {
  // Dữ liệu riêng tư (private data)
  const cart = [];
  const totalPrice = 237;
  const totalQuantity = 23;
  const shippingCost = 10;

  // Hàm riêng tư (private function)
  const orderStock = () => console.log("Đặt hàng từ nhà cung cấp");

  // Hàm công khai (public function)
  const addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} được thêm vào giỏ hàng, phí vận chuyển: ${shippingCost}`
    );
  };

  // Trả về API công khai
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
```

- **Giải thích**:
  - Các biến (`cart`, `totalPrice`, `totalQuantity`, `shippingCost`) và hàm `orderStock` là riêng tư, không thể truy cập từ bên ngoài.
  - Đối tượng trả về chứa các thuộc tính và phương thức công khai (`addToCart`, `cart`, `totalPrice`, `totalQuantity`).
  - Gán IIFE vào biến `shoppingCart2` để lưu trữ API công khai.

### Cách sử dụng

- Gọi phương thức công khai:

```javascript
shoppingCart2.addToCart("táo", 4);
shoppingCart2.addToCart("pizza", 2);
```

- **Kết quả**:
  - Thêm sản phẩm vào `cart` và in thông báo, ví dụ: `4 táo được thêm vào giỏ hàng, phí vận chuyển: 10`.
  - Biến `shippingCost` (riêng tư) vẫn được truy cập bởi `addToCart` nhờ **closures**.
- **Kiểm tra**:
  - Có thể xem `shoppingCart2.cart`, `shoppingCart2.totalPrice`, v.v.
  - Không thể truy cập `shoppingCart2.shippingCost` hoặc `shoppingCart2.orderStock` (undefined).

### Tại sao Module Pattern hoạt động?

- **Closures**:
  - Hàm `addToCart` được tạo trong phạm vi của IIFE, giữ kết nối với các biến tại "nơi sinh" (birthplace) của nó.
  - Nhờ closures, `addToCart` truy cập được `cart` và `shippingCost` dù IIFE đã chạy xong.
  - Ví dụ: `addToCart` sử dụng `shippingCost` (biến riêng tư) để in thông báo.
- **Minh họa**:
  - Dù `cart` không nằm trong đối tượng trả về, `addToCart` vẫn có thể thay đổi `cart` nhờ closures.
  - Điều này đảm bảo dữ liệu riêng tư được bảo vệ nhưng vẫn có thể thao tác thông qua API công khai.

### Hạn chế của Module Pattern

- **Không hỗ trợ module riêng lẻ**:
  - Để có nhiều module, cần tạo nhiều file script và liên kết trong HTML, gây khó khăn trong:
    - **Thứ tự tải** (script order).
    - **Phạm vi toàn cục** (global scope pollution).
    - **Gộp module** (bundling) bằng module bundler.
- **So sánh với ES6 Modules**:
  - ES6 modules giải quyết các vấn đề trên bằng cách cung cấp cú pháp chuẩn, hỗ trợ nhập/xuất (import/export) và gộp module dễ dàng.
  - Module pattern vẫn hữu ích trong mã cũ hoặc khi không dùng module bundler.

### Ghi chú thêm

- **Ứng dụng closures**: Module pattern là một ví dụ thực tiễn của closures, giúp hiểu sâu hơn về cách hàm giữ truy cập vào phạm vi cha.
- **Tham khảo**: Xem lại bài giảng về **closures** để hiểu rõ cơ chế hoạt động.
- **Khuyến nghị**: Sử dụng ES6 modules trong các dự án hiện đại để tận dụng tính năng chuẩn và tối ưu hóa.

---

**Lưu ý**: Ghi chú được tối ưu cho Obsidian, sử dụng Markdown với cấu trúc rõ ràng, tập trung vào ý chính và giữ nguyên mã nguồn để dễ tra cứu.
