## Lập Trình Hướng Đối Tượng trong JavaScript

### Khái niệm cơ bản

- **Lập trình hướng đối tượng (OOP)** trong JavaScript khác với OOP truyền thống vì sử dụng **kế thừa nguyên mẫu (prototypal inheritance)** thay vì mô hình lớp-thực thể (class-instance) cổ điển.
- **Nguyên mẫu (Prototype)**:
  - Mọi đối tượng trong JavaScript đều liên kết với một **đối tượng nguyên mẫu (prototype object)**.
  - Nguyên mẫu chứa các **phương thức (methods)** và **thuộc tính (properties)** mà các đối tượng liên kết có thể truy cập.
- **Kế thừa nguyên mẫu (Prototypal Inheritance)**:
  - Các đối tượng kế thừa phương thức và thuộc tính từ nguyên mẫu của chúng.
  - Cũng được gọi là **ủy quyền (delegation)**, vì đối tượng "ủy quyền" hành vi (behavior) cho nguyên mẫu.
  - Khác với kế thừa trong OOP truyền thống (lớp con kế thừa từ lớp cha), trong JavaScript, các **thực thể (instances)** kế thừa từ nguyên mẫu.

### So sánh với OOP truyền thống

![Prototypes](/md_assets/Prototypes.png)

- **OOP truyền thống**:
  - Sử dụng **lớp (classes)** như một bản thiết kế (blueprint) để tạo **thực thể (instances)** thông qua quá trình **khởi tạo (instantiation)**.
  - Phương thức được sao chép từ lớp sang thực thể.
- **OOP trong JavaScript**:
  - Không sao chép phương thức, mà các đối tượng **truy cập** phương thức từ nguyên mẫu thông qua liên kết.
  - Ví dụ: Phương thức `map` của mảng không nằm trực tiếp trên mảng mà nằm trên `Array.prototype`. Mảng truy cập `map` thông qua kế thừa nguyên mẫu.

### Ví dụ minh họa

- Mảng `num` trong JavaScript có thể sử dụng phương thức `map` vì:
  - `num` liên kết với `Array.prototype`.
  - `Array.prototype` chứa phương thức `map`.
  - Nhờ kế thừa nguyên mẫu, `num` có thể gọi `map` như thể nó là phương thức của chính mình.

### Các cách triển khai OOP trong JavaScript

![@@](/md_assets/Implement-Prototypes.png)

1. **Hàm khởi tạo (Constructor Functions)**:
   - Là cách truyền thống để tạo đối tượng theo chương trình.
   - Đặt nguyên mẫu (prototype) cho đối tượng mới.
   - Ví dụ: Các đối tượng tích hợp như `Array`, `Map`, `Set` được triển khai bằng hàm khởi tạo.
2. **Lớp ES6 (ES6 Classes)**:
   - Cú pháp hiện đại, đơn giản hóa việc triển khai OOP.
   - Là **đường cú pháp (syntactic sugar)** cho hàm khởi tạo, vẫn dựa trên kế thừa nguyên mẫu.
   - Dễ sử dụng hơn, đặc biệt cho người mới học JavaScript.
3. **Object.create()**:
   - Cách đơn giản nhất để liên kết một đối tượng với một nguyên mẫu.
   - Ít được sử dụng hơn hai phương pháp trên nhưng vẫn hiệu quả trong một số trường hợp.

### Các nguyên tắc OOP trong JavaScript

- Bốn nguyên tắc OOP (**trừu tượng hóa, đóng gói, kế thừa, đa hình**) vẫn áp dụng trong JavaScript, dù được triển khai thông qua kế thừa nguyên mẫu.
- Các nguyên tắc này sẽ được thực hành và làm rõ trong các bài giảng tiếp theo.

### Ghi chú thêm

- **Kế thừa nguyên mẫu** là khái niệm cốt lõi của OOP trong JavaScript, cần hiểu rõ để sử dụng hiệu quả.
- Mặc dù thuật ngữ như "kế thừa" và "ủy quyền" có thể gây nhầm lẫn, điều quan trọng là hiểu cách các đối tượng truy cập phương thức/thuộc tính từ nguyên mẫu.
- Các phương pháp như hàm khởi tạo, lớp ES6, và `Object.create()` sẽ được khám phá chi tiết trong thực hành.
