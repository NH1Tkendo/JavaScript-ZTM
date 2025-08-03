# Ghi chú học tập: Kiến trúc dự án (Project Architecture)

## Kiến trúc tổng quan

### Mục tiêu

- Cung cấp cấu trúc rõ ràng cho dự án để phát triển chức năng.
- Sử dụng lập trình hướng đối tượng (OOP) với các lớp (`classes`) để tổ chức mã nguồn.
- Tách biệt dữ liệu và logic ứng dụng một cách logic và dễ bảo trì.

### Tầm quan trọng của kiến trúc

- **Kiến trúc dự án (Project Architecture)**: Xác định cách tổ chức mã nguồn và dữ liệu, giúp dự án dễ mở rộng và bảo trì.
- Đảm bảo dữ liệu và chức năng được quản lý hiệu quả, tránh sự lộn xộn trong mã nguồn.

## Quản lý dữ liệu

### Tổng quan về dữ liệu

- Dữ liệu là thành phần cốt lõi của ứng dụng, được xác định từ các **câu chuyện người dùng (user stories)**.
- Dữ liệu cần lưu trữ:
  - **Vị trí (Location)**, **khoảng cách (Distance)**, **thời gian (Time)**, **tốc độ (Pace/Speed)**, **số bước mỗi phút (Steps per Minute)** (cho hoạt động chạy bộ).
  - **Độ cao tăng (Elevation Gain)** (thay cho số bước mỗi phút, dùng cho hoạt động đạp xe).

### Thiết kế lớp dữ liệu

- **Lớp cha (Parent Class)**: `Workout`
  - Chứa các thuộc tính chung: **khoảng cách (Distance)**, **thời gian (Duration)**, **tọa độ (Coordinates)**.
  - Chứa các phương thức chung cho cả hai loại hoạt động (chạy bộ và đạp xe).
- **Lớp con (Child Classes)**:
  - `Running`: Lưu trữ **nhịp độ (Cadence)** và **tốc độ (Pace)**.
  - `Cycling`: Lưu trữ **độ cao tăng (Elevation Gain)** và **tốc độ (Speed)**.
- **Lý do sử dụng kế thừa (Inheritance)**:
  - Các thuộc tính và phương thức chung được đặt trong lớp cha để tránh lặp mã.
  - Các thuộc tính/phương thức cụ thể cho từng loại hoạt động được đặt trong lớp con tương ứng.
- **Thuộc tính bổ sung**:
  - `ID`: Định danh duy nhất cho mỗi phiên tập luyện.
  - `Date`: Thời điểm thực hiện phiên tập luyện.
- **Sơ đồ lớp (Class Diagram)**:
  - Mỗi lớp được biểu diễn bằng một hộp:
    - Phần trên: Các thuộc tính (properties).
    - Phần dưới: Các phương thức (methods).
  - Ví dụ: Lớp `Workout` chứa các thuộc tính chung và phương thức khởi tạo (`constructor`), các lớp con bổ sung thuộc tính và phương thức cụ thể.

## Kiến trúc ứng dụng

### Lớp ứng dụng chính: `App`

- **Mục đích**: Tổ chức toàn bộ logic ứng dụng trong một lớp duy nhất, chứa các phương thức xử lý các sự kiện chính.
- **Các sự kiện cần xử lý**:
  - **Tải trang (Page Load)**: Kích hoạt phương thức khởi tạo (`constructor`) để lấy vị trí hiện tại của người dùng thông qua **API định vị (Geolocation API)**.
  - **Nhận vị trí (Receive Position)**: Tải bản đồ dựa trên vị trí nhận được.
  - **Nhấp chuột lên bản đồ (Map Click)**: Hiển thị biểu mẫu nhập liệu.
  - **Thay đổi loại hoạt động (Change Input)**: Chuyển đổi giữa chạy bộ (`Running`) và đạp xe (`Cycling`).
  - **Gửi biểu mẫu (Form Submission)**: Tạo đối tượng `Running` hoặc `Cycling` mới dựa trên dữ liệu từ biểu mẫu.

### Các phương thức trong lớp `App`

- **`_getPosition()`**: Lấy vị trí hiện tại của người dùng thông qua API định vị.
- **`_loadMap()`**: Tải bản đồ dựa trên vị trí nhận được.
- **`_showForm()`**: Hiển thị biểu mẫu khi người dùng nhấp vào bản đồ.
- **`_toggleElevationField()`**: Chuyển đổi trường nhập liệu giữa **nhịp độ (Cadence)** (cho chạy bộ) và **độ cao tăng (Elevation Gain)** (cho đạp xe).
- **`_newWorkout()`**: Tạo đối tượng tập luyện mới (`Running` hoặc `Cycling`) và lưu vào mảng `workouts`.

### Quản lý tập luyện

- **Mảng `workouts`**: Lưu trữ tất cả các đối tượng tập luyện (`Running` hoặc `Cycling`).
- Mỗi phiên tập luyện được lưu dưới dạng một đối tượng, chứa dữ liệu như khoảng cách, thời gian, tọa độ, v.v.

## Bảo vệ mã nguồn (Encapsulation)

- **Bảo vệ phương thức**: Sử dụng tiền tố `_` (ví dụ: `_getPosition`, `_loadMap`) để đánh dấu các phương thức là private, ngăn truy cập từ bên ngoài.
- **Lợi ích**:
  - Đảm bảo dữ liệu và phương thức chỉ được truy cập trong phạm vi lớp `App`.
  - Giảm nguy cơ mã nguồn bị sửa đổi ngoài ý muốn, tăng tính dễ bảo trì.

## Ghi chú thêm

- **Phân tách logic**:
  - Trong ứng dụng đơn giản, lớp `App` kết hợp cả giao diện người dùng (UI) và logic nghiệp vụ (business logic).
  - Trong các dự án phức tạp hơn, có thể tách thành hai lớp riêng:
    - Lớp cho giao diện người dùng (UI).
    - Lớp cho logic nghiệp vụ (xử lý dữ liệu).
- **Tiếp theo**:
  - Tái cấu trúc (refactor) mã nguồn hiện có để phù hợp với kiến trúc này.
  - Thêm các phương thức và thuộc tính mới khi cần trong quá trình phát triển.

---
