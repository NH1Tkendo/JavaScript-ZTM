```markdown
## Tổng Quan về Lập Trình Hướng Đối Tượng (OOP)

### Khái niệm cơ bản

![OOP](/md_assets/OOP-details.png)

- **Lập trình hướng đối tượng (Object-Oriented Programming - OOP)** là một mô hình lập trình dựa trên khái niệm **đối tượng (objects)**.
  - Đối tượng chứa:
    - **Dữ liệu (Properties)**: Thông tin về đối tượng.
    - **Hành vi (Methods)**: Các hàm hoặc chức năng liên quan đến dữ liệu.
  - Đối tượng được sử dụng để mô hình hóa các khía cạnh thực tế (như người dùng, mục danh sách công việc) hoặc các tính năng trừu tượng (như thành phần HTML, cấu trúc dữ liệu).
- **Mô hình (Paradigm)**: Cách tổ chức và viết mã.
- Trong OOP, đối tượng là các **khối mã độc lập (self-contained code blocks)**, giống như các ứng dụng nhỏ, có thể tương tác với nhau thông qua **giao diện công khai (public interface/API)**.

### Mục đích của OOP

- **Tổ chức mã nguồn**: Giúp mã dễ quản lý, linh hoạt và dễ bảo trì, tránh **mã spaghetti (spaghetti code)** – mã lộn xộn, khó duy trì trong các dự án lớn.
- So sánh với các mô hình khác:
  - Lập trình chức năng (Functional Programming) cũng giúp tổ chức mã nhưng theo cách khác.
  - OOP là mô hình phổ biến nhất trong kỹ thuật phần mềm quy mô lớn.

### Cách hoạt động của OOP

[OOP](/md_assets/Class-OOP.png)

- **Đối tượng (Objects)**:
  - Là các khối mã chứa dữ liệu và hành vi liên quan, giúp thao tác trực tiếp trên dữ liệu.
  - Các đối tượng tương tác với nhau thông qua **API** (các phương thức công khai).
- **Lớp (Classes)**:
  - Lớp là **bản thiết kế (blueprint)** trừu tượng, dùng để tạo ra các đối tượng.
  - Ví dụ: Lớp `User` mô tả người dùng với các thuộc tính như `username`, `password`, `email` và các phương thức như `login`, `sendMessage`.
  - **Thực thể (Instance)**: Một đối tượng cụ thể được tạo từ lớp, chứa dữ liệu thực tế (ví dụ: một người dùng cụ thể với `username` là "john_doe").
- So sánh: Lớp giống như bản vẽ kiến trúc, còn thực thể là ngôi nhà thực tế được xây từ bản vẽ.

### Bốn nguyên tắc cơ bản của OOP

#### 1. **Trừu tượng hóa (Abstraction)**

[Abstraction](/md_assets/Abstraction.png)

- **Định nghĩa**: Ẩn đi các chi tiết không cần thiết, chỉ giữ lại thông tin quan trọng để có cái nhìn tổng quan.
- **Ví dụ**:
  - Khi thiết kế một lớp `Phone`, ta không cần quan tâm đến các chi tiết như nhiệt độ, điện áp, hay cơ chế rung. Người dùng chỉ cần tương tác với các thành phần như nút home, nút âm lượng, và màn hình.
  - Trong lập trình, các hàm như `addEventListener` là một dạng trừu tượng hóa, vì ta không cần biết chi tiết cách chúng hoạt động bên trong.
- **Lợi ích**: Giảm độ phức tạp, tập trung vào những gì cần thiết cho ứng dụng.

#### 2. **Đóng gói (Encapsulation)**

[Encapsulation](/md_assets/Encapsulation.png)

- **Định nghĩa**: Giữ một số thuộc tính và phương thức ở trạng thái **riêng tư (private)**, không cho phép truy cập từ bên ngoài lớp, chỉ cung cấp một **giao diện công khai (public interface/API)**.
- **Ví dụ**:
  - Trong lớp `User`, thuộc tính `password` và phương thức `checkSpam` có thể được giữ riêng tư, chỉ sử dụng nội bộ trong lớp (ví dụ: để kiểm tra đăng nhập hoặc lọc bình luận spam).
  - Các phương thức công khai như `login` hoặc `sendMessage` tạo thành API để tương tác với đối tượng.
- **Lợi ích**:
  - Ngăn mã bên ngoài thay đổi trạng thái nội bộ (state) của đối tượng, giảm nguy cơ lỗi.
  - Dễ dàng thay đổi mã nội bộ mà không ảnh hưởng đến mã bên ngoài phụ thuộc vào API.

#### 3. **Kế thừa (Inheritance)**

[Inheritance](/md_assets/Inheritance.png)

- **Định nghĩa**: Một lớp con (child class) kế thừa các thuộc tính và phương thức từ lớp cha (parent class), tạo thành một hệ thống phân cấp (hierarchy).
- **Ví dụ**:
  - Lớp `User` có các thuộc tính (`username`, `password`, `email`) và phương thức (`login`).
  - Lớp `Admin` kế thừa từ `User`, có thêm các thuộc tính/phương thức riêng (như quyền quản trị).
  - `Admin` là một dạng mở rộng của `User`, tái sử dụng logic từ `User` mà không cần viết lại.
- **Lợi ích**: Giảm mã trùng lặp, tái sử dụng logic chung, tăng tính linh hoạt.

#### 4. **Đa hình (Polymorphism)**

[Poly](/md_assets/Poly.png)

- **Định nghĩa**: Lớp con có thể ghi đè (override) phương thức kế thừa từ lớp cha để cung cấp triển khai riêng.
- **Ví dụ**:
  - Lớp `User` có phương thức `login` chung.
  - Lớp `Admin` và `Author` (kế thừa từ `User`) có thể ghi đè phương thức `login` để triển khai đăng nhập đặc biệt (ví dụ: `Admin` yêu cầu xác thực hai yếu tố).
- **Lợi ích**: Cho phép các lớp con tùy chỉnh hành vi kế thừa, tăng tính linh hoạt và khả năng mở rộng.

### Ghi chú thêm

- OOP trong JavaScript có một số khác biệt so với OOP truyền thống:
  - JavaScript không hỗ trợ lớp thực sự như các ngôn ngữ khác, nhưng cú pháp lớp (class syntax) vẫn mô phỏng khái niệm này.
  - Hiểu mô hình lớp và thực thể là một cách tư duy hữu ích, dù cách triển khai trong JavaScript có thể khác.
- Các nguyên tắc OOP (trừu tượng hóa, đóng gói, kế thừa, đa hình) không chỉ áp dụng trong OOP mà còn trong các mô hình lập trình khác.
- Để áp dụng OOP hiệu quả, cần hiểu cách thiết kế lớp sao cho phù hợp với dữ liệu và yêu cầu thực tế.
```
