````markdown
## Thực hành Mô-đun trong JavaScript (Modules in JavaScript)

### Mục tiêu

- Hiểu cách sử dụng mô-đun trong JavaScript thông qua nhập (import) và xuất (export) giá trị.
- Thực hành tạo và liên kết các mô-đun, bao gồm nhập mô-đun mà không nhập giá trị cụ thể.
- Nắm bắt khái niệm kết nối trực tiếp (live connection) giữa nhập và xuất.

### Tạo và Nhập Mô-đun Cơ bản

- **Tạo mô-đun**:
  - Mô-đun là một tệp JavaScript (ví dụ: `shoppingCart.js`).
  - Quy ước đặt tên: Sử dụng camelCase (ví dụ: `shoppingCart.js`).
- **Nhập mô-đun mà không nhập giá trị**:
  - Có thể nhập một mô-đun chỉ để chạy mã trong đó mà không nhập giá trị cụ thể.
  - Cú pháp: `import './shoppingCart.js';`
  - Lưu ý: Đường dẫn bắt đầu bằng `./` để chỉ thư mục hiện tại. Phần mở rộng `.js` là tùy chọn nhưng nên giữ để rõ ràng.
- **Kết nối với HTML**:
  - Sử dụng thẻ `<script type="module">` để liên kết mô-đun với tệp HTML.
  - Ví dụ:
    ```html
    <script type="module" src="script.js"></script>
    ```
  - Nếu thiếu thuộc tính `type="module"`, trình duyệt sẽ báo lỗi: _"Cannot use import statement outside a module"_.
- **Thực thi mô-đun**:
  - Mô-đun được nhập sẽ thực thi trước mô-đun chính.
  - Các câu lệnh nhập được nâng lên (hoisted) đầu tệp, đảm bảo thực thi trước mã khác.
  - Mô-đun tự động chạy ở chế độ nghiêm ngặt (strict mode), không cần khai báo.

### Ví dụ: Nhập mô-đun cơ bản

```javascript
// shoppingCart.js (mô-đun xuất)
console.log("Exporting module");

// script.js (mô-đun nhập)
import "./shoppingCart.js";
console.log("Importing module");
```
````

- **Kết quả**:
  - Console hiển thị:
    ```
    Exporting module
    Importing module
    ```
  - Điều này chứng minh mô-đun `shoppingCart.js` được thực thi trước `script.js`.

### Phạm vi Biến trong Mô-đun

- **Biến cấp cao (top-level variables)**:
  - Các biến khai báo trong mô-đun là riêng tư (private), thuộc phạm vi của mô-đun.
  - Không thể truy cập từ bên ngoài trừ khi được xuất (export).
  - Khác với script thông thường, nơi các biến cấp cao là toàn cục (global).
- **Ví dụ**:
  ```javascript
  // shoppingCart.js
  const shippingCost = 10;
  const cart = [];
  ```
  - Các biến `shippingCost` và `cart` chỉ có thể sử dụng trong `shoppingCart.js`.
  - Truy cập `shippingCost` từ `script.js` sẽ báo lỗi: _"`shippingCost` is not defined"_.

### Xuất và Nhập Giá trị

- **Loại xuất (Exports)**:
  1. **Named Exports**:
     - Xuất nhiều giá trị từ một mô-đun.
     - Cú pháp: `export <tên_biến_hoặc_hàm>;` hoặc `export { var1, var2 };`.
     - Yêu cầu tên nhập khớp với tên xuất.
  2. **Default Exports**:
     - Xuất một giá trị duy nhất từ mô-đun.
     - Cú pháp: `export default <giá_trị>;`.
     - Có thể nhập với bất kỳ tên nào.
- **Lưu ý**:
  - Xuất phải ở cấp cao (top-level), không được đặt trong hàm hoặc khối lệnh.
  - Nhập được nâng lên (hoisted), luôn thực thi đầu tiên.

#### Named Exports

- **Ví dụ: Xuất và nhập hàm**:
  ```javascript
  // shoppingCart.js
  export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
  };
  ```
  ```javascript
  // script.js
  import { addToCart } from "./shoppingCart.js";
  addToCart("bread", 5);
  ```
  - **Kết quả**: Console hiển thị: `5 bread was added to cart`.
- **Xuất nhiều giá trị**:
  ```javascript
  // shoppingCart.js
  const totalPrice = 237;
  const totalQuantity = 23;
  export { totalPrice, totalQuantity };
  ```
  ```javascript
  // script.js
  import { addToCart, totalPrice, totalQuantity } from "./shoppingCart.js";
  console.log(totalPrice, totalQuantity); // 237 23
  ```
- **Đổi tên khi nhập/xuất**:
  - Đổi tên khi nhập: `import { totalPrice as price } from './shoppingCart.js';`
  - Đổi tên khi xuất: `export { totalQuantity as TQ };`
  - Ví dụ:
    ```javascript
    // script.js
    import {
      totalPrice as price,
      totalQuantity as TQ,
    } from "./shoppingCart.js";
    console.log(price, TQ); // 237 23
    ```

#### Nhập tất cả Named Exports

- Sử dụng cú pháp `import * as <tên_đối_tượng> from './module.js';`.
- Tạo một đối tượng chứa tất cả giá trị xuất, giống như một không gian tên (namespace).
- **Ví dụ**:
  ```javascript
  // script.js
  import * as ShoppingCart from "./shoppingCart.js";
  ShoppingCart.addToCart("bread", 5);
  console.log(ShoppingCart.totalPrice); // 237
  ```
  - `ShoppingCart` là một đối tượng chứa tất cả các xuất từ `shoppingCart.js`, hoạt động như một API công khai.

#### Default Exports

- **Ví dụ**:
  ```javascript
  // shoppingCart.js
  export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
  }
  ```
  ```javascript
  // script.js
  import add from "./shoppingCart.js";
  add("pizza", 2);
  ```
  - **Kết quả**: Console hiển thị: `2 pizza was added to cart`.
  - Lưu ý: Không cần dấu `{}` khi nhập Default Export, và tên nhập (`add`) có thể tự do đặt.
- **Tránh lạm dụng**:
  - Không nên kết hợp Named và Default Exports trong cùng một mô-đun để giảm phức tạp.
  - Ưu tiên sử dụng Default Export khi chỉ xuất một giá trị duy nhất.

### Kết nối Trực tiếp (Live Connection)

- **Đặc điểm**:
  - Nhập không phải là bản sao của giá trị xuất, mà là một tham chiếu (reference).
  - Khi giá trị xuất thay đổi, giá trị nhập cũng thay đổi theo.
- **Ví dụ**:
  ```javascript
  // shoppingCart.js
  const cart = [];
  export { cart };
  export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
  };
  ```
  ```javascript
  // script.js
  import { cart, addToCart } from "./shoppingCart.js";
  addToCart("bread", 5);
  addToCart("apples", 4);
  console.log(cart);
  ```
  - **Kết quả**:
    ```
    5 bread was added to cart
    4 apples was added to cart
    [{ product: 'bread', quantity: 5 }, { product: 'apples', quantity: 4 }]
    ```
  - **Giải thích**:
    - `cart` ban đầu là mảng rỗng khi xuất.
    - Gọi `addToCart` thêm phần tử vào `cart`, và `cart` trong `script.js` phản ánh thay đổi này.
    - Điều này chứng minh `cart` nhập là một tham chiếu trực tiếp, không phải bản sao.
- **Lưu ý**:
  - Kết nối trực tiếp có thể gây lỗi nếu không nắm rõ cơ chế, đặc biệt khi thay đổi dữ liệu (mutation) trong mô-đun xuất.

### Ghi chú thêm

- **Tầm quan trọng**:
  - Mô-đun là nền tảng trong việc tổ chức mã JavaScript hiện đại, đặc biệt trong các dự án lớn.
  - Giúp quản lý phụ thuộc, tăng khả năng tái sử dụng và bảo trì mã.
- **Thực hành**:
  - Thử nhập/xuất thêm giá trị giữa các mô-đun để hiểu rõ hơn cơ chế hoạt động.
  - Tránh kết hợp Named và Default Exports trong cùng mô-đun để giảm phức tạp.
- **Ứng dụng thực tế**:
  - Trong các dự án lớn, mô-đun giúp chia nhỏ mã nguồn, hỗ trợ làm việc nhóm và tối ưu hóa hiệu suất.
  - Ví dụ: Mô-đun giỏ hàng (`shoppingCart.js`) có thể được tái sử dụng trong nhiều dự án thương mại điện tử.

---

_Ghi chú này được tối ưu hóa cho Obsidian, với cấu trúc rõ ràng, dễ tra cứu và liên kết chéo._

```

```
