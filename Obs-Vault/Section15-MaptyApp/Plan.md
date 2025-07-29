## Lập Kế Hoạch Dự Án Mapty

### Tổng Quan về Quy Trình Lập Kế Hoạch

![Project planning](/md_assets/Project-Planning.png)

- Lập kế hoạch là bước quan trọng trước khi bắt đầu phát triển dự án, đặc biệt với các dự án phức tạp.
- Quy trình lập kế hoạch bao gồm:
  - Xác định **câu chuyện người dùng (User Stories)** để mô tả chức năng từ góc độ người dùng.
  - Lập **biểu đồ luồng (Flowchart)** để hình dung các hành động và phản ứng của chương trình.
  - Xây dựng **kiến trúc dự án (Project Architecture)** để tổ chức mã nguồn và xác định các tính năng JavaScript sẽ sử dụng.
  - Chuyển sang bước phát triển để triển khai kế hoạch bằng mã JavaScript.

### Câu Chuyện Người Dùng (User Stories)

[User story](/md_assets/User-story.png)

- **Định nghĩa**: Mô tả chức năng ứng dụng từ góc độ người dùng, trả lời các câu hỏi: Ai? Làm gì? Tại sao?
- **Định dạng**: "Là một [loại người dùng], tôi muốn [thực hiện hành động] để [đạt được lợi ích]."
- **Câu chuyện người dùng cho dự án Mapty**:
  - Là một người dùng, tôi muốn ghi lại các bài tập chạy bộ với vị trí, quãng đường, thời gian, tốc độ trung bình, và số bước mỗi phút (cadence), để lưu giữ nhật ký các hoạt động chạy bộ.
  - Là một người dùng, tôi muốn ghi lại các bài tập đạp xe với vị trí, quãng đường, thời gian, tốc độ, và độ cao tăng (elevation gain), để lưu giữ nhật ký các hoạt động đạp xe.
  - Là một người dùng, tôi muốn xem tất cả các bài tập của mình một cách tổng quan để dễ dàng theo dõi tiến độ theo thời gian.
  - Là một người dùng, tôi muốn xem tất cả các bài tập trên bản đồ để kiểm tra nơi tôi tập luyện nhiều nhất.
  - Là một người dùng, tôi muốn xem lại tất cả các bài tập khi quay lại ứng dụng, để tiếp tục sử dụng ứng dụng theo thời gian.

### Tính Năng Cần Thiết

[Features](/md_assets/Features.png)
Dựa trên các câu chuyện người dùng, các tính năng cần triển khai bao gồm:

- **Bản đồ (Map)**:
  - Cho phép người dùng nhấp để thêm bài tập mới với thông tin vị trí.
  - Sử dụng API định vị (Geolocation API) để hiển thị bản đồ tại vị trí hiện tại của người dùng, tăng tính thân thiện.
- **Biểu mẫu nhập liệu (Form)**:
  - Biểu mẫu cho bài tập chạy bộ: nhập quãng đường, thời gian, tốc độ trung bình, và số bước mỗi phút (cadence).
  - Biểu mẫu cho bài tập đạp xe: nhập quãng đường, thời gian, tốc độ, và độ cao tăng (elevation gain).
- **Hiển thị bài tập**:
  - Hiển thị danh sách tất cả các bài tập để người dùng xem tổng quan.
  - Hiển thị các bài tập trên bản đồ để người dùng kiểm tra vị trí tập luyện.
- **Lưu trữ dữ liệu**:
  - Lưu dữ liệu bài tập vào bộ nhớ cục bộ (Local Storage) của trình duyệt.
  - Đọc dữ liệu từ bộ nhớ cục bộ khi người dùng quay lại ứng dụng để hiển thị trên danh sách và bản đồ.
- **Tính năng bổ sung**:
  - Di chuyển bản đồ đến vị trí bài tập khi người dùng nhấp vào một bài tập trong danh sách.

### Biểu Đồ Luồng (Flowchart)

[Flow chart](/JS-MaptyApp/Mapty-flowchart.png)

- **Mục đích**: Hình dung các hành động người dùng, phản ứng của chương trình, và luồng dữ liệu.
- **Cấu trúc biểu đồ luồng**:
  - **Sự kiện ban đầu**: Trang tải (page load).
    - Lấy tọa độ vị trí người dùng bằng API định vị (Geolocation API) (thao tác bất đồng bộ).
    - Hiển thị bản đồ tại vị trí hiện tại của người dùng.
  - **Thêm bài tập**:
    - Khi người dùng nhấp vào bản đồ, hiển thị biểu mẫu nhập liệu.
    - Người dùng nhập dữ liệu bài tập (chạy bộ hoặc đạp xe) và gửi biểu mẫu.
    - Hiển thị bài tập mới trên danh sách và bản đồ.
  - **Lưu trữ và khôi phục dữ liệu**:
    - Lưu bài tập mới vào bộ nhớ cục bộ (Local Storage) sau khi gửi biểu mẫu.
    - Khi trang tải, đọc dữ liệu từ bộ nhớ cục bộ và hiển thị bài tập trên danh sách và bản đồ.
  - **Tương tác bổ sung**:
    - Khi nhấp vào bài tập trong danh sách, di chuyển bản đồ đến vị trí bài tập tương ứng.
- **Lưu ý**:
  - Các thao tác bất đồng bộ (asynchronous operations) như lấy vị trí hoặc đọc bộ nhớ cục bộ được đánh dấu để xử lý đúng thứ tự.
  - Biểu đồ luồng có thể được vẽ sơ bộ ban đầu và hoàn thiện chi tiết trong quá trình triển khai.

### Kiến Trúc Dự Án (Project Architecture)

[Project architecture](/JS-MaptyApp/Mapty-architecture-final.png)

- **Định nghĩa**: Cách tổ chức mã nguồn và các tính năng JavaScript sẽ sử dụng để triển khai các tính năng.
- **Nguyên tắc**:
  - Tránh mã nguồn không có tổ chức (spaghetti code) bằng cách suy nghĩ trước về cấu trúc.
  - Có thể thử nghiệm mã trước khi xác định kiến trúc cuối cùng.
- **Kế hoạch cho Mapty**:
  - Bắt đầu triển khai các tính năng theo biểu đồ luồng.
  - Khi cần tổ chức mã hoặc quản lý dữ liệu, quay lại thiết kế kiến trúc chi tiết.
  - Có thể sử dụng hàm (functions), lớp (classes), hoặc chia nhỏ thành nhiều tệp, tùy thuộc vào nhu cầu.

### Ghi Chú Thêm

- Quy trình lập kế hoạch này phù hợp cho các dự án nhỏ và trung bình.
- Khi mới bắt đầu, không cần tạo biểu đồ luồng hoặc kiến trúc hoàn hảo ngay từ đầu. Có thể vẽ sơ bộ và cải thiện qua thực hành.
- Tập trung vào việc hiểu nhu cầu người dùng thông qua câu chuyện người dùng và chuyển đổi thành các tính năng cụ thể.
- Trong thực tế, cần đặt mình vào vị trí người dùng để xác định các câu chuyện người dùng chính xác.
