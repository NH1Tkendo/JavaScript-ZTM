## Cơ Bản về Command Line cho Lập Trình Viên Web

### Giới thiệu

- **Command Line** (dòng lệnh) là công cụ quan trọng để sử dụng các công cụ xây dựng (build tools) như Parcel, có sẵn trên npm.
- Command Line được tích hợp trong Visual Studio Code (VS Code) hoặc sử dụng qua ứng dụng riêng (Terminal trên Mac, Command Prompt trên Windows).
- **Mục tiêu**: Hiểu các lệnh cơ bản để di chuyển trong hệ thống tệp, tạo/xóa file và thư mục, cần thiết cho lập trình viên web.

### Tại sao cần Command Line?

- Nhiều công cụ npm chỉ hoạt động qua Command Line.
- Là một phần không thể thiếu trong công việc của lập trình viên web chuyên nghiệp.
- **Lưu ý**: Nếu đã quen với Command Line, có thể bỏ qua và chuyển sang bài học tiếp theo.

### Mở Terminal trong VS Code

- **Cách mở**: Trong VS Code, mở terminal tích hợp qua menu hoặc phím tắt.
- **Ưu điểm**: Terminal trong VS Code tự động đặt thư mục làm việc (working directory) là thư mục dự án hiện tại.
- **Khác biệt hệ điều hành**:
  - Mac/Linux: Sử dụng shell như `bash`.
  - Windows: Sử dụng Command Prompt hoặc PowerShell, một số lệnh có thể khác.

### Các lệnh cơ bản

- **Hiển thị nội dung thư mục**:
  - Mac/Linux: `ls` (list).
  - Windows: `dir` (directory).
  - Ví dụ: `ls` hiển thị tất cả file và thư mục trong thư mục hiện tại.
- **Di chuyển giữa các thư mục**:
  - Lệnh: `cd` (change directory).
  - Ví dụ:
    - `cd ..`: Lùi lên thư mục cha.
    - `cd folder_name`: Vào thư mục con (dùng phím Tab để tự động hoàn thành tên).
    - `cd ../..`: Lùi lên hai cấp thư mục.
- **Xóa màn hình console**:
  - Mac/Linux: `clear`.
  - Windows: `cls` hoặc `clear` (trong VS Code, phím tắt `Cmd + T` trên Mac, kiểm tra tương ứng trên Windows).
- **Tạo thư mục**:
  - Lệnh: `mkdir <tên_thư_mục>` (make directory).
  - Ví dụ: `mkdir Test` tạo thư mục `Test`.
- **Tạo file**:
  - Mac/Linux: `touch <tên_file>`.
  - Windows: `echo. > <tên_file>` hoặc `type nul > <tên_file>`.
  - Ví dụ: `touch index.html script.js` tạo hai file cùng lúc.
  - Tạo nhiều file: `touch file1.js file2.js file3.js`.
- **Xóa file**:
  - Mac/Linux: `rm <tên_file>` (remove).
  - Windows: `del <tên_file>` (delete).
  - Ví dụ: `rm script.js` xóa file `script.js`.
- **Di chuyển file**:
  - Lệnh: `mv <tên_file> <đích_đến>` (move).
  - Ví dụ: `mv mapt.js ..` di chuyển file `mapt.js` lên thư mục cha.
- **Xóa thư mục**:
  - Mac/Linux: `rmdir <tên_thư_mục>` (chỉ xóa thư mục rỗng).
  - Xóa thư mục có nội dung (Mac/Linux): `rm -r <tên_thư_mục>` (recursive).
  - Windows: `rmdir <tên_thư_mục> /s` (xóa thư mục và nội dung).
  - Ví dụ: `rm -r Test` xóa thư mục `Test` và tất cả file bên trong.

### Mẹo sử dụng

- **Tự động hoàn thành**: Nhấn phím Tab để hoàn thành tên file/thư mục.
- **Xem lịch sử lệnh**: Sử dụng phím mũi tên lên/xuống để xem lại các lệnh đã nhập.
- **Hủy lệnh đang chạy**: Nhấn `Ctrl + C` (cả Mac và Windows).
- **Kiểm tra thư mục hiện tại**:
  - Mac/Linux: `pwd` (print working directory).
  - Windows: `cd` (hiển thị đường dẫn hiện tại).

### Ví dụ thực hành

1. Tạo thư mục `Test`:
   ```bash
   mkdir Test
   ```
2. Di chuyển vào thư mục `Test`:
   ```bash
   cd Test
   ```
3. Tạo các file `index.html` và `script.js`:
   ```bash
   touch index.html script.js
   ```
4. Kiểm tra nội dung thư mục:
   ```bash
   ls
   ```
5. Di chuyển file `script.js` lên thư mục cha:
   ```bash
   mv script.js ..
   ```
6. Xóa thư mục `Test` và nội dung:
   ```bash
   rm -r Test
   ```

### Ghi chú thêm

- **Khác biệt hệ điều hành**: Một số lệnh (như `touch` vs `echo.`, `rm` vs `del`) khác nhau giữa Mac/Linux và Windows. Kiểm tra tài liệu hoặc tìm kiếm khi cần.
- **Tầm quan trọng**: Thành thạo Command Line giúp làm việc hiệu quả với các công cụ như npm, Parcel, hoặc Live Server.
- **Khuyến nghị**: Thực hành các lệnh cơ bản để làm quen, đặc biệt khi chuẩn bị sử dụng công cụ gộp module (module bundler) như Parcel.

---

**Lưu ý**: Ghi chú được tối ưu cho Obsidian, sử dụng Markdown với cấu trúc rõ ràng, tập trung vào các lệnh quan trọng và ví dụ minh họa để dễ tra cứu.
