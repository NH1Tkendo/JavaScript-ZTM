````markdown
## Mô-đun trong Phát triển Phần mềm (Modules in Software Development)

### Khái niệm về Mô-đun

![Overview of modules](/md_assets/Overview-Modules.png)

- **Mô-đun (Module)** là một đoạn mã độc lập, tái sử dụng, đóng gói chi tiết triển khai của một phần cụ thể trong dự án.
- Đặc điểm:
  - Thường là một tệp riêng biệt (file), nhưng không bắt buộc.
  - Chứa mã nguồn, có thể bao gồm cả nhập (imports) và xuất (exports).
  - Phần mã xuất ra được gọi là **Giao diện Công khai (Public API)**, tương tự như trong lớp (class).
  - Mô-đun nhập giá trị từ các mô-đun khác, được gọi là **phụ thuộc (dependencies)**, vì mã trong mô-đun nhập không thể hoạt động nếu thiếu mã từ mô-đun khác.
- Mô-đun là một mẫu thiết kế (pattern) phổ biến, áp dụng trong nhiều ngôn ngữ lập trình, không chỉ riêng JavaScript.

### Lợi ích của Mô-đun

- **Tổ chức mã nguồn**:
  - Mô-đun chia mã thành các khối nhỏ, giúp tổ chức mã nguồn logic và dễ hiểu.
  - Tăng khả năng bảo trì và quản lý mã trong các dự án lớn.
- **Tái sử dụng mã**:
  - Mô-đun cho phép sử dụng lại mã trong cùng dự án hoặc giữa các dự án khác.
  - Ví dụ: Một mô-đun chứa các hàm toán học có thể được sao chép và sử dụng trong dự án mới.
- **Cách ly thành phần (Isolation)**:
  - Mỗi mô-đun có thể được phát triển độc lập mà không cần hiểu toàn bộ mã nguồn.
  - Hỗ trợ làm việc nhóm hiệu quả, khi các kỹ sư chỉ cần tập trung vào mô-đun của mình.
  - Ví dụ thực tế: Trong máy ảnh số, các mô-đun như ống kính (lens), màn hình (screen), hoặc bộ điều khiển (controller) được phát triển riêng biệt.
- **Trừu tượng hóa (Abstraction)**:
  - Mô-đun ẩn đi chi tiết triển khai cấp thấp (low-level implementation).
  - Các mô-đun khác có thể nhập và sử dụng mà không cần biết cách hoạt động bên trong.
  - Ví dụ: Mô-đun màn hình nhập bộ điều khiển mà không cần hiểu chi tiết cách bộ điều khiển hoạt động.
- **Tích hợp phần mềm (Software Composition)**:
  - Mô-đun giống như các khối xây dựng (building blocks), giúp tạo ra các ứng dụng phức tạp từ các thành phần nhỏ.

### Mô-đun trong JavaScript (ES6 Modules)

![Modules vs Scripts](/md_assets/Modules-vs-Scripts.png)

- **Giới thiệu**:
  - Từ ES6, JavaScript có hệ thống mô-đun tích hợp sẵn (native module system).
  - Mỗi tệp là một mô-đun duy nhất (one module per file).
- **So sánh với Script thông thường**:
  - **Phạm vi biến (Variable Scope)**:
    - Trong mô-đun, các biến cấp cao (top-level variables) là riêng tư (private) theo mặc định, chỉ có thể truy cập bên ngoài nếu được xuất (export).
    - Trong script, các biến cấp cao là toàn cục (global), dễ gây xung đột tên (namespace pollution).
  - **Chế độ nghiêm ngặt (Strict Mode)**:
    - Mô-đun tự động chạy ở chế độ nghiêm ngặt (strict mode), không cần khai báo thủ công.
    - Script chạy ở chế độ lỏng lẻo (sloppy mode) theo mặc định.
  - **Từ khóa `this`**:
    - Trong mô-đun, `this` ở cấp cao là `undefined`.
    - Trong script, `this` trỏ đến đối tượng `window`.
  - **Nhập/Xuất (Import/Export)**:
    - Mô-đun hỗ trợ nhập và xuất giá trị bằng cú pháp ES6 (`import`/`export`).
    - Script không hỗ trợ nhập/xuất giá trị.
  - **Vị trí nhập/xuất**:
    - Nhập/xuất chỉ được thực hiện ở cấp cao (top-level), ngoài mọi hàm hoặc khối lệnh.
    - Nhập được nâng lên (hoisted), luôn thực thi đầu tiên trong mô-đun.
  - **Tải mô-đun**:
    - Mô-đun được tải không đồng bộ (asynchronous) tự động.
    - Script tải đồng bộ (synchronous) theo mặc định, trừ khi dùng thuộc tính `async` hoặc `defer`.
  - **Liên kết HTML**:
    - Mô-đun yêu cầu thẻ `<script type="module">` trong HTML, thay vì `<script>` thông thường.

### Cách Mô-đun Hoạt động (Behind the Scenes)

- **Quy trình nhập mô-đun**:
  1. **Phân tích cú pháp (Parsing)**:
     - Mã được đọc mà không thực thi, xác định các lệnh nhập/xuất.
     - Nhập được nâng lên (hoisted) trong giai đoạn này.
  2. **Tải mô-đun**:
     - Các mô-đun phụ thuộc được tải không đồng bộ từ máy chủ.
  3. **Liên kết xuất/nhập**:
     - Giá trị xuất từ mô-đun (export) được liên kết với nhập (import) trong mô-đun chính.
     - Liên kết là một tham chiếu trực tiếp (live connection), không phải bản sao.
     - Khi giá trị xuất thay đổi, giá trị nhập cũng thay đổi tương ứng.
  4. **Thực thi mô-đun**:
     - Mô-đun phụ thuộc được thực thi trước, sau đó đến mô-đun chính.
- **Ví dụ mã nguồn**:

  ```javascript
  // math.js
  export const rent = () => {
    /* hàm tính toán */
  };

  // dom.js
  export const showDice = () => {
    /* hiển thị xúc xắc */
  };

  // index.js
  import { rent } from "./math.js";
  import { showDice } from "./dom.js";
  ```
````

![How modules are imported](/md_assets/How-Modules-Imported.png)

- **Quy trình**:
  1. `index.js` được phân tích, xác định các nhập từ `math.js` và `dom.js`.
  2. Tải và thực thi `math.js`, `dom.js` trước.
  3. Liên kết `rent` và `showDice` với các nhập trong `index.js`.
  4. Thực thi `index.js`.
- **Tại sao nhập/xuất ở cấp cao?**:
  - Đảm bảo nhập mô-đun diễn ra đồng bộ (synchronous importing), hỗ trợ các công cụ như Webpack hoặc Parcel trong việc:
    - **Gộp mô-đun (Bundling)**: Kết hợp nhiều mô-đun thành một tệp duy nhất.
    - **Loại bỏ mã thừa (Dead Code Elimination)**: Xóa mã không cần thiết.
  - Nếu nhập trong hàm, mã cần thực thi trước, phá vỡ quy trình đồng bộ.

### Ghi chú thêm

- **Tầm quan trọng của mô-đun**:
  - Mô-đun là nền tảng trong phát triển phần mềm hiện đại, đặc biệt với các dự án lớn.
  - Giúp giảm sự phức tạp, tăng khả năng tái sử dụng và bảo trì mã.
- **Khác biệt với hệ thống mô-đun khác**:
  - ES6 modules sử dụng liên kết trực tiếp (live connection), khác với các hệ thống mô-đun khác (giá trị xuất thường được sao chép).
- **Ứng dụng thực tế**:
  - Trong các dự án lớn, mô-đun giúp quản lý phụ thuộc và tối ưu hóa mã nguồn.
  - Ví dụ: Một công ty máy ảnh có thể tái sử dụng mô-đun ống kính hoặc màn hình cho nhiều mẫu máy ảnh khác nhau.

---

_Ghi chú này được tối ưu hóa cho việc lưu trữ trong Obsidian, với cấu trúc rõ ràng và dễ liên kết chéo khi cần._

```

```
