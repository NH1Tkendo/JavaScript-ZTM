# Ghi Chú Học Tập: Gọi API Đầu Tiên với Ajax và Xây Dựng Thành Phần UI

## Mục tiêu

- Tạo một thành phần giao diện người dùng (UI component) hiển thị thông tin về một quốc gia.
- Sử dụng API bên thứ ba (third-party API) để lấy dữ liệu quốc gia thông qua Ajax.
- Hiểu cách sử dụng `XMLHTTPRequest` để thực hiện Ajax call theo cách truyền thống.
- Nắm bắt khái niệm bất đồng bộ (asynchronous) và cách xử lý dữ liệu từ API.

## Nội dung

### 1. Tổng quan về bài học

- **Mục đích**: Xây dựng một thẻ (card) hiển thị thông tin quốc gia (ví dụ: Bồ Đào Nha, Mỹ) với dữ liệu lấy từ API công khai `REST Countries`.
- **Ý nghĩa**: Kết nối với dữ liệu trực tuyến và tích hợp vào ứng dụng, tạo cảm giác "thần kỳ" khi làm việc với dữ liệu từ internet.
- **Công cụ**: Visual Studio Code (VS Code), Live Server, API công khai `REST Countries` (phiên bản 2).

### 2. Giới thiệu về XMLHTTPRequest

- `XMLHTTPRequest` là cách truyền thống để thực hiện Ajax call trong JavaScript.
- Lý do học `XMLHTTPRequest`:
  - Hiểu cách Ajax hoạt động với sự kiện (event) và hàm gọi lại (callback function).
  - Có thể cần dùng trong các dự án cũ hoặc tương lai.
- Sau phần này, sẽ chuyển sang cách hiện đại hơn sử dụng `Promises`.

### 3. Các bước thực hiện Ajax call với XMLHTTPRequest

#### a. Khởi tạo yêu cầu

- Tạo đối tượng yêu cầu (request object):
  ```javascript
  const request = new XMLHttpRequest();
  ```
- Mở kết nối tới API với phương thức `GET` và URL:
  ```javascript
  request.open("GET", "https://restcountries.com/v2/name/portugal");
  ```
- Gửi yêu cầu:
  ```javascript
  request.send();
  ```

#### b. Xử lý phản hồi bất đồng bộ

- Ajax call là bất đồng bộ (asynchronous), nghĩa là mã tiếp tục chạy mà không chờ dữ liệu trả về.
- Đăng ký hàm gọi lại (callback) để xử lý sự kiện `load`:
  ```javascript
  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
  });
  ```
- Dữ liệu trả về ở định dạng JSON (chuỗi văn bản) cần được chuyển thành đối tượng JavaScript bằng `JSON.parse`.

#### c. Lưu ý về bất đồng bộ

- Không thể gán trực tiếp `request.responseText` vào biến ngoài hàm gọi lại vì dữ liệu chưa sẵn sàng.
- Ví dụ sai:
  ```javascript
  const result = request.responseText; // Không hoạt động vì dữ liệu chưa tải xong
  ```
- Thay vào đó, xử lý dữ liệu trong hàm gọi lại khi sự kiện `load` được kích hoạt.

### 4. Tìm và sử dụng API công khai

#### a. Nguồn API

- Tìm API công khai trên kho GitHub “Public APIs”.
- API được chọn: `REST Countries` (https://restcountries.com/v2).
- Đặc điểm:
  - Không cần xác thực (no authentication).
  - Sử dụng HTTPS.
  - Hỗ trợ CORS (Cross-Origin Resource Sharing) để truy cập từ mã cục bộ.
- Lưu ý: Sử dụng phiên bản 2 của API (theo file khởi tạo) để đảm bảo mã hoạt động đúng.

#### b. API Endpoint

- Endpoint để lấy thông tin quốc gia theo tên:
  ```
  https://restcountries.com/v2/name/{country}
  ```
- Ví dụ: `https://restcountries.com/v2/name/portugal` trả về dữ liệu về Bồ Đào Nha.

### 5. Xây dựng thành phần UI (Card Component)

#### a. Cấu trúc dữ liệu từ API

- Dữ liệu trả về là một mảng chứa một đối tượng với các thuộc tính:
  - `name`: Tên quốc gia.
  - `flag`: URL hình ảnh cờ quốc gia.
  - `capital`: Thủ đô.
  - `region`: Khu vực (ví dụ: Europe).
  - `population`: Dân số.
  - `languages`: Danh sách ngôn ngữ.
  - `currencies`: Danh sách tiền tệ.
- Ví dụ dữ liệu cho Bồ Đào Nha:
  ```javascript
  [
    {
      name: "Portugal",
      flag: "https://flagcdn.com/pt.svg",
      capital: "Lisbon",
      region: "Europe",
      population: 10347892,
      languages: [{ name: "Portuguese" }],
      currencies: [{ name: "Euro" }],
    },
  ];
  ```

#### b. Tạo giao diện

- Sử dụng template literal để tạo HTML cho thẻ quốc gia:
  ```javascript
  const [data] = JSON.parse(this.responseText); // Phá hủy mảng để lấy đối tượng
  const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
          +data.population / 1000000
        ).toFixed(1)} million</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
  ```
- Chèn HTML vào container:
  ```javascript
  const countriesContainer = document.querySelector(".countries");
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1; // Kích hoạt hiệu ứng hiển thị
  ```

#### c. Xử lý dữ liệu

- Dân số: Chia cho 1 triệu và làm tròn đến 1 chữ số thập phân (`toFixed(1)`).
- Ngôn ngữ và tiền tệ: Lấy tên của phần tử đầu tiên trong mảng (`languages[0].name`, `currencies[0].name`).

### 6. Tái sử dụng mã với hàm

- Tạo hàm `getCountryData` để lấy dữ liệu và hiển thị thẻ quốc gia:
  ```javascript
  function getCountryData(country) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();
    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      const html = `
        <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
              +data.population / 1000000
            ).toFixed(1)} million</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
      `;
      countriesContainer.insertAdjacentHTML("beforeend", html);
      countriesContainer.style.opacity = 1;
    });
  }
  ```
- Gọi hàm với các quốc gia khác nhau:
  ```javascript
  getCountryData("portugal");
  getCountryData("usa");
  getCountryData("germany");
  ```

### 7. Hành vi bất đồng bộ trong thực tế

- Các Ajax call chạy song song (parallel), dẫn đến thứ tự hiển thị thẻ quốc gia có thể thay đổi mỗi lần tải trang.
- Lý do: Dữ liệu từ API trả về ở thời điểm khác nhau, tùy thuộc vào tốc độ phản hồi.
- Để kiểm soát thứ tự, cần xâu chuỗi (chain) các yêu cầu, tức là chỉ gửi yêu cầu tiếp theo sau khi yêu cầu trước hoàn tất (sẽ được đề cập trong bài tiếp theo).

### 8. Ghi chú thêm

- **CORS (Cross-Origin Resource Sharing)**: API phải hỗ trợ CORS để truy cập từ mã cục bộ.
- **Callback Hell**: Khi xâu chuỗi nhiều Ajax call, mã có thể trở nên phức tạp, dẫn đến hiện tượng "callback hell" (sẽ được giải quyết bằng `Promises` trong bài sau).
- **Tài liệu tham khảo**: Sử dụng tài liệu API chính thức và file khởi tạo để đảm bảo tính tương thích.

---

**Lưu ý**: Ghi chú này được tối ưu để sử dụng trong Obsidian, với cấu trúc rõ ràng, dễ liên kết chéo và tra cứu.
