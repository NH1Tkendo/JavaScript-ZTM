## Dự án Ứng dụng Mapty

### Mục tiêu

- Xây dựng ứng dụng Mapty để ghi lại và quản lý các bài tập thể dục (chạy bộ, đạp xe) trên bản đồ.
- Tích hợp các tính năng: định vị địa lý (geolocation), bản đồ từ dịch vụ bên thứ ba (third-party service), lưu trữ dữ liệu cục bộ (local storage).
- Học cách lập kế hoạch, thiết kế kiến trúc, và triển khai dự án thực tế.

### Nội dung chính

#### 1. Tổng quan ứng dụng

- **Giao diện**:
  - Thanh bên trái (sidebar) hiển thị danh sách bài tập.
  - Phần chính: bản đồ lớn hiển thị vị trí bài tập với các điểm đánh dấu (pins) và cửa sổ bật lên (popups).
- **Chức năng chính**:
  - Tự động lấy vị trí người dùng thông qua định vị địa lý (geolocation).
  - Cho phép nhập thông tin bài tập (loại, khoảng cách, thời gian, nhịp độ, độ cao).
  - Lưu trữ bài tập trong trình duyệt và hiển thị lại sau khi tải lại trang.
  - Tương tác với bản đồ: nhấp vào bài tập để di chuyển bản đồ đến vị trí tương ứng.

#### 2. Các tính năng kỹ thuật

- **Định vị địa lý (Geolocation)**:
  - Sử dụng API định vị của trình duyệt để lấy vị trí hiện tại.
  - Yêu cầu người dùng cấp quyền truy cập vị trí (location permission).
  - Tải bản đồ dựa trên vị trí hiện tại của người dùng.
- **Tích hợp bản đồ (Map Integration)**:
  - Sử dụng dịch vụ bản đồ bên thứ ba (third-party map service).
  - Hiển thị các điểm đánh dấu (pins) và cửa sổ bật lên (popups) cho mỗi bài tập.
- **Quản lý bài tập**:
  - **Chạy bộ (Running)**: Nhập khoảng cách (distance), thời gian (duration), nhịp độ (steps per minute).
  - **Đạp xe (Cycling)**: Nhập khoảng cách, thời gian, độ cao (elevation gain).
  - Form nhập liệu thay đổi linh hoạt theo loại bài tập (ví dụ: nhịp độ cho chạy bộ, độ cao cho đạp xe).
- **Lưu trữ cục bộ (Local Storage)**:
  - Lưu dữ liệu bài tập trong trình duyệt (browser storage).
  - Tải lại dữ liệu khi mở lại ứng dụng, đảm bảo trạng thái được duy trì.

#### 3. Ví dụ sử dụng

- **Bài tập chạy bộ**:
  - Vị trí: trung tâm thành phố.
  - Nhập: 5 km, 20 phút, 175 bước/phút.
  - Kết quả: Hiển thị bài tập trên sidebar và điểm đánh dấu trên bản đồ với cửa sổ bật lên.
- **Bài tập đạp xe**:
  - Vị trí: khu vực núi.
  - Nhập: 50 km, 5 giờ, độ cao 400 mét.
  - Kết quả: Hiển thị tương tự với thông tin phù hợp cho đạp xe.
- **Tương tác bản đồ**:
  - Nhấp vào bài tập trong sidebar để di chuyển bản đồ đến vị trí bài tập.

#### 4. Cấu trúc mã nguồn

- **Tệp JavaScript**:
  - Các phần tử giao diện (DOM elements) được chọn sẵn để tiết kiệm thời gian.
  - Triển khai logic cho định vị, bản đồ, và lưu trữ dữ liệu.
- **Tệp HTML**:
  - Chứa cấu trúc giao diện, cần tham chiếu để tích hợp mã JavaScript.
- **Tệp CSS**:
  - Định dạng giao diện, có thể tùy chỉnh để cải thiện trải nghiệm người dùng.

![Architecture](/JS-MaptyApp/Mapty-architecture-final.png)

- **Sơ đồ luồng (Flowchart) và kiến trúc**:
  - Sẽ được giải thích chi tiết trong bài giảng tiếp theo.
  - Hướng dẫn cách xây dựng sơ đồ luồng để lập kế hoạch dự án.

#### 5. Quy trình phát triển

![flowchart](/JS-MaptyApp/Mapty-flowchart.png)

- **Lập kế hoạch**:
  - Xây dựng sơ đồ luồng (flowchart) để xác định các bước thực hiện.
  - Thiết kế kiến trúc ứng dụng (application architecture) để tổ chức mã nguồn.
- **Triển khai**:
  - Tích hợp API định vị và bản đồ.
  - Xử lý dữ liệu người dùng và lưu trữ cục bộ.
- **Kiểm tra và tối ưu**:
  - Đảm bảo ứng dụng hoạt động ổn định sau khi tải lại trang.
  - Giữ mã nguồn đơn giản, tập trung vào học tập và các tính năng cốt lõi.

### Ghi chú thêm

- Dự án được thiết kế đơn giản để tập trung vào học tập, nhưng vẫn mô phỏng ứng dụng thực tế.
- Có thể mở rộng thêm tính năng (ví dụ: vẽ đường hoặc đa giác trên bản đồ) trong tương lai.
- Tệp khởi đầu (starter files) cung cấp sẵn các phần tử cần thiết, giúp tập trung vào logic lập trình.

_Ghi chú được định dạng chuẩn Markdown, tối ưu cho Obsidian, với cấu trúc rõ ràng và dễ tra cứu._
