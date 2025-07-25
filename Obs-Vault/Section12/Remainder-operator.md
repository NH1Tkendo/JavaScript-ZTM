## **Ghi chú học tập: Toán tử chia lấy dư (Remainder Operator)**

### 1. Toán tử chia lấy dư (Remainder Operator) là gì?

- **Định nghĩa**: Toán tử chia lấy dư (remainder operator), ký hiệu là `%`, trả về phần dư của một phép chia.
- **Ví dụ**:
  - `5 % 2 = 1`
    - Vì: 5 chia 2 được 2 (phần nguyên), 2 × 2 = 4, còn dư 1 (5 - 4 = 1).
    - Công thức: 5 = 2 × 2 + 1, nên phần dư là 1.
  - `8 % 3 = 2`
    - Vì: 8 chia 3 được 2 (phần nguyên), 2 × 3 = 6, còn dư 2 (8 - 6 = 2).
    - Công thức: 8 = 2 × 3 + 2, nên phần dư là 2.

---

### 2. Ứng dụng của toán tử chia lấy dư

#### 2.1. Kiểm tra số chẵn/lẻ

- **Số chẵn**: Là số chia hết cho 2, tức là phần dư bằng 0.
  - Ví dụ: `6 % 2 = 0` (6 là số chẵn).
- **Số lẻ**: Là số có phần dư 1 khi chia cho 2.
  - Ví dụ: `7 % 2 = 1` (7 là số lẻ).
- **Hàm kiểm tra số chẵn**:
  ```javascript
  const isEven = (n) => n % 2 === 0;
  ```
  - Kết quả:
    - `isEven(8)` → `true` (8 là số chẵn).
    - `isEven(23)` → `false` (23 là số lẻ).
  - Ứng dụng: Có thể dùng để kiểm tra một số có chia hết cho bất kỳ số nào khác hay không (phần dư = 0).

---

### 3. Tổng kết

- Toán tử chia lấy dư (`%`) là công cụ mạnh mẽ để:
  - Tính phần dư của phép chia.
  - Kiểm tra tính chia hết (phần dư = 0).
  - Thực hiện các tác vụ lặp lại theo chu kỳ (mỗi N lần).
- Các ví dụ minh họa:
  - Kiểm tra số chẵn/lẻ với hàm `isEven`.
  - Tô màu xen kẽ các hàng trong danh sách giao dịch.
- Lưu ý: Khi áp dụng trong ứng dụng, cần đảm bảo mã được thực thi đúng ngữ cảnh (ví dụ: trong sự kiện hoặc sau khi giao diện được cập nhật).
