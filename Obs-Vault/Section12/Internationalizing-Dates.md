# Ghi chú học tập: API Quốc tế hóa trong JavaScript (Internationalization API)

## Format ngày tháng với Intl.DateTimeFormat

### Khái niệm cơ bản

- **API Quốc tế hóa (Internationalization API)**: Một tập hợp công cụ trong JavaScript cho phép định dạng số, chuỗi và ngày tháng theo các ngôn ngữ và khu vực khác nhau.
- **Mục đích**: Hỗ trợ ứng dụng hiển thị ngày tháng, số tiền, hoặc các định dạng khác phù hợp với ngôn ngữ và văn hóa của người dùng trên toàn cầu.
- **Ứng dụng chính**: Định dạng ngày tháng (DateTimeFormat) và số (NumberFormat) theo các vùng ngôn ngữ (locale).

### Định dạng ngày tháng (DateTimeFormat)

- Sử dụng `Intl.DateTimeFormat` để định dạng ngày tháng dựa trên ngôn ngữ và khu vực.
- Cú pháp cơ bản:
  ```javascript
  new Intl.DateTimeFormat(locale, options).format(date);
  ```
  - `locale`: Chuỗi định dạng ngôn ngữ và quốc gia (ví dụ: `en-US`, `pt-PT`, `ar-SY`).
  - `options`: Đối tượng tùy chỉnh để xác định cách hiển thị (ngày, tháng, năm, giờ, v.v.).
  - `date`: Đối tượng `Date` cần định dạng.

### Cách thực hiện

1. **Xác định locale**:

   - Locale thường có dạng `ngôn ngữ-quốc gia` (ví dụ: `en-US` cho tiếng Anh Mỹ, `en-GB` cho tiếng Anh Anh, `pt-PT` cho tiếng Bồ Đào Nha).
   - Để lấy locale của người dùng từ trình duyệt: `navigator.language`.
   - Danh sách mã ISO cho locale: Tra cứu tại [lingoes.net](http://www.lingoes.net) hoặc các nguồn tương tự.

2. **Tạo đối tượng định dạng**:

   ```javascript
   const formatter = new Intl.DateTimeFormat("en-US");
   const formattedDate = formatter.format(new Date());
   ```

   - Kết quả: Định dạng ngày tháng theo kiểu Mỹ (tháng trước, ngày sau, ví dụ: `8/12/2020`).

3. **Tùy chỉnh định dạng với options**:

   - Tùy chỉnh các thành phần như ngày, tháng, năm, giờ, phút, thứ trong tuần.
   - Ví dụ:
     ```javascript
     const options = {
       hour: "numeric",
       minute: "numeric",
       day: "numeric",
       month: "long", // hoặc 'numeric', '2-digit'
       year: "numeric", // hoặc '2-digit'
       weekday: "long", // hoặc 'short',iaus 'narrow'
     };
     const formatter = new Intl.DateTimeFormat("en-US", options);
     const formattedDate = formatter.format(new Date());
     ```
     - Kết quả: `Wednesday, August 12, 2020, 3:45 PM`.

4. **Áp dụng locale động**:
   - Lấy locale từ trình duyệt: `navigator.language`.
   - Ví dụ:
     ```javascript
     const locale = navigator.language;
     const formatter = new Intl.DateTimeFormat(locale, options);
     ```

### Ví dụ thực tế

1. **Định dạng ngày tháng trong ứng dụng**:

   - Trong hàm xử lý đăng nhập:
     ```javascript
     const currentAccount = account; // Đối tượng tài khoản chứa locale
     const options = {
       day: "numeric",
       month: "numeric",
       year: "numeric",
     };
     const formattedDate = new Intl.DateTimeFormat(
       currentAccount.locale,
       options
     ).format(new Date());
     document.querySelector(".date").textContent = formattedDate;
     ```
     - Kết quả: Ngày tháng hiển thị theo locale của tài khoản (ví dụ: `12/08/2020` cho `pt-PT`, `08/12/2020` cho `en-US`).

2. **Định dạng ngày tháng cho danh sách giao dịch (movements)**:
   - Hàm định dạng ngày giao dịch:
     ```javascript
     function formatMovementDate(date, locale) {
       return new Intl.DateTimeFormat(locale, {
         day: "numeric",
         month: "numeric",
         year: "numeric",
       }).format(date);
     }
     ```
   - Gọi hàm trong vòng lặp hiển thị giao dịch:
     ```javascript
     const formattedDate = formatMovementDate(movementDate, acc.locale);
     ```

### Ghi chú thêm

- **Ưu điểm**: API tự động xử lý định dạng theo chuẩn quốc tế, giảm thiểu code thủ công.
- **Tài liệu tham khảo**: Xem thêm tại [MDN Web Docs - Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

### Lưu ý khi áp dụng

- Đảm bảo locale được lấy từ tài khoản người dùng hoặc trình duyệt để cá nhân hóa.
- Tránh hiển thị các từ ngữ (như tên tháng, thứ) bằng ngôn ngữ không khớp với giao diện chung của ứng dụng.
- Thử nghiệm với các locale khác nhau để đảm bảo định dạng phù hợp (ví dụ: `ar-SY`, `pt-PT`, `en-GB`).
