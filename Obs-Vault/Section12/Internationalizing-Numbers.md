# Ghi chú học tập: Định dạng số với API Quốc tế hóa trong JavaScript

## Định dạng số với Intl.NumberFormat

### Khái niệm cơ bản

- **API Quốc tế hóa (Internationalization API)**: Công cụ trong JavaScript để định dạng số, chuỗi, và ngày tháng theo các ngôn ngữ và khu vực (locale).
- **Intl.NumberFormat**: Dùng để định dạng số, bao gồm tiền tệ, phần trăm, và đơn vị, phù hợp với các chuẩn quốc tế.
- **Mục đích**: Hiển thị số theo cách dễ đọc và phù hợp với văn hóa của người dùng (ví dụ: dấu phân cách hàng nghìn, tiền tệ, hoặc đơn vị).

### Cách thực hiện

1. **Cú pháp cơ bản**:

   ```javascript
   const formatter = new Intl.NumberFormat(locale, options);
   const formattedNumber = formatter.format(number);
   ```

   - `locale`: Chuỗi định dạng ngôn ngữ và quốc gia (ví dụ: `en-US`, `de-DE`, `ar-SY`).
   - `options`: Đối tượng tùy chỉnh để định dạng kiểu số (style), đơn vị (unit), hoặc tiền tệ (currency).
   - `number`: Giá trị số cần định dạng.

2. **Ví dụ định dạng cơ bản**:

   ```javascript
   const number = 3884000.235;
   const formatterUS = new Intl.NumberFormat("en-US");
   console.log(formatterUS.format(number)); // Kết quả: 3,884,000.235
   const formatterDE = new Intl.NumberFormat("de-DE");
   console.log(formatterDE.format(number)); // Kết quả: 3.884.000,235
   const formatterSY = new Intl.NumberFormat("ar-SY");
   console.log(formatterSY.format(number)); // Kết quả: ٣٬٨٨٤٬٠٠٠٫٢٣٥
   ```

3. **Tùy chỉnh với options**:

   - **style**: Xác định kiểu định dạng (`decimal`, `currency`, `percent`, `unit`).
   - **currency**: Mã tiền tệ (ví dụ: `USD`, `EUR`) khi `style: 'currency'`.
   - **unit**: Đơn vị đo lường (ví dụ: `mile-per-hour`, `celsius`) khi `style: 'unit'`.
   - **useGrouping**: Bật/tắt dấu phân cách hàng nghìn (`true`/`false`).
   - Ví dụ:
     ```javascript
     const number = 3884000.235;
     const options = {
       style: "currency",
       currency: "EUR",
       useGrouping: true,
     };
     const formatter = new Intl.NumberFormat("en-US", options);
     console.log(formatter.format(number)); // Kết quả: €3,884,000.24
     ```

4. **Lưu ý về currency**:
   - Tiền tệ không tự động được xác định bởi locale, cần chỉ định rõ trong `options.currency`.
   - Ví dụ: Có thể hiển thị `EUR` ở `en-US` hoặc `USD` ở `de-DE`.

### Ví dụ thực tế

1. **Định dạng tiền tệ trong danh sách giao dịch (movements)**:

   ```javascript
   function formatCur(value, locale, currency) {
     return new Intl.NumberFormat(locale, {
       style: "currency",
       currency: currency,
       useGrouping: true,
     }).format(value);
   }
   ```

   - Sử dụng trong hàm hiển thị giao dịch:
     ```javascript
     const formattedMov = formatCur(mov, acc.locale, acc.currency);
     ```

2. **Định dạng số dư tài khoản (balance)**:

   ```javascript
   document.querySelector(".balance").textContent = formatCur(
     account.balance,
     account.locale,
     account.currency
   );
   ```

3. **Định dạng thống kê (incomes, outcomes, interest)**:
   ```javascript
   document.querySelector(".summary__value--in").textContent = formatCur(
     incomes,
     account.locale,
     account.currency
   );
   document.querySelector(".summary__value--out").textContent = formatCur(
     Math.abs(out),
     account.locale,
     account.currency
   );
   document.querySelector(".summary__value--interest").textContent = formatCur(
     interest,
     account.locale,
     account.currency
   );
   ```

### Ghi chú thêm

- **Tính tái sử dụng**: Tạo hàm `formatCur(value, locale, currency)` để sử dụng linh hoạt trong nhiều ngữ cảnh, tránh lặp code.
- **Tài liệu tham khảo**: Xem chi tiết tại [MDN Web Docs - Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

### Lưu ý khi áp dụng

- Đảm bảo lấy `locale` và `currency` từ dữ liệu tài khoản để cá nhân hóa định dạng.
- Kiểm tra cẩn thận các tùy chọn trong `options` để phù hợp với mục đích (ví dụ: bật/tắt `useGrouping`).
- Thử nghiệm với nhiều locale để đảm bảo định dạng chính xác (ví dụ: `en-US`, `de-DE`, `ar-SY`).
