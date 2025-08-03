# Ghi Chú Học Tập: Tạo Chuỗi AJAX Call và Hiểu Về Callback Hell

## Mục tiêu

- Tạo chuỗi AJAX call (sequential AJAX calls) để lấy dữ liệu quốc gia và quốc gia láng giềng.
- Hiểu cách phụ thuộc dữ liệu giữa các AJAX call (ví dụ: cần dữ liệu từ call đầu tiên để thực hiện call thứ hai).
- Nhận biết hiện tượng "callback hell" khi sử dụng các hàm gọi lại lồng nhau (nested callbacks).
- Giới thiệu về `Promises` như một giải pháp thay thế cho callback hell.

## Nội dung

### 1. Tổng quan

- Trong bài trước:
  - Tạo hàm `getCountryData` để gọi AJAX và hiển thị thông tin quốc gia.
  - Nhiều AJAX call chạy song song (parallel), không kiểm soát được thứ tự hoàn thành.
- Trong bài này:
  - Xây dựng chuỗi AJAX call để lấy dữ liệu quốc gia, sau đó lấy dữ liệu quốc gia láng giềng dựa trên kết quả của call đầu tiên.
  - Mục tiêu: Hiển thị thẻ quốc gia và thẻ quốc gia láng giềng cạnh nhau.
  - Ví dụ: Gọi dữ liệu Bồ Đào Nha, sau đó lấy dữ liệu Tây Ban Nha (quốc gia láng giềng).

### 2. Phân tích dữ liệu API

- API `REST Countries` cung cấp thuộc tính `borders` chứa mã code (alpha code) của các quốc gia láng giềng.
  - Ví dụ: Bồ Đào Nha có `borders: ["ESP"]` (Tây Ban Nha).
- Cần thực hiện:
  - AJAX call 1: Lấy dữ liệu quốc gia (dùng endpoint `/name/{country}`).
  - AJAX call 2: Lấy dữ liệu quốc gia láng giềng (dùng endpoint `/alpha/{code}`).
- Phụ thuộc: AJAX call 2 cần mã code từ kết quả của AJAX call 1.

### 3. Tái cấu trúc mã

#### a. Tách hàm hiển thị

- Tạo hàm `renderCountry` để hiển thị thẻ quốc gia:
  ```javascript
  function renderCountry(data, className = "") {
    const html = `
      <article class="country ${className}">
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
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  }
  ```
- Tham số `className` (mặc định rỗng) để thêm lớp CSS (ví dụ: `neighbor` cho quốc gia láng giềng, hiển thị nhỏ hơn).

#### b. Hàm lấy dữ liệu quốc gia và láng giềng

- Tạo hàm `getCountryAndNeighbor`:

  ```javascript
  function getCountryAndNeighbor(country) {
    // AJAX call quốc gia 1
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText); // Phá hủy mảng để lấy đối tượng
      // Hiển thị quốc gia 1
      renderCountry(data);

      // Lấy quốc gia láng giềng
      const [neighbor] = data.borders || []; // Xử lý trường hợp không có láng giềng
      if (!neighbor) return;

      // AJAX call quốc gia 2
      const request2 = new XMLHttpRequest();
      request2.open("GET", `https://restcountries.com/v2/alpha/${neighbor}`);
      request2.send();

      request2.addEventListener("load", function () {
        const data2 = JSON.parse(this.responseText); // Không cần phá hủy vì trả về đối tượng
        // Hiển thị quốc gia láng giềng
        renderCountry(data2, "neighbor");
      });
    });
  }
  ```

- Gọi hàm:
  ```javascript
  getCountryAndNeighbor("portugal"); // Hiển thị Bồ Đào Nha và Tây Ban Nha
  getCountryAndNeighbor("usa"); // Hiển thị Mỹ và Canada
  ```

#### c. Lưu ý về API endpoint

- Endpoint `/name/{country}` trả về mảng chứa đối tượng (cần phá hủy).
- Endpoint `/alpha/{code}` trả về đối tượng trực tiếp (vì mã code là duy nhất).
- Xử lý trường hợp không có láng giềng (ví dụ: đảo quốc) bằng cách kiểm tra `data.borders` và thoát sớm nếu rỗng.

### 4. Chuỗi AJAX call

- **Cơ chế**:
  - AJAX call 1 (`/name/{country}`) lấy dữ liệu quốc gia.
  - Trong hàm gọi lại của call 1, lấy mã láng giềng (`data.borders[0]`) và thực hiện AJAX call 2 (`/alpha/{code}`).
  - AJAX call 2 chỉ được thực hiện sau khi call 1 hoàn tất, đảm bảo thứ tự hiển thị.
- **Kết quả**:
  - Quốc gia láng giềng (ví dụ: Tây Ban Nha) luôn hiển thị sau quốc gia chính (Bồ Đào Nha).
  - Với Mỹ, láng giềng như Canada hoặc Mexico được hiển thị.

### 5. Callback Hell

- **Định nghĩa**:
  - Callback hell là hiện tượng lồng nhiều hàm gọi lại (nested callbacks) để thực hiện các tác vụ bất đồng bộ theo thứ tự.
  - Ví dụ: AJAX call 2 lồng trong hàm gọi lại của AJAX call 1.
  - Nếu cần thêm nhiều AJAX call (ví dụ: láng giềng của láng giềng), mã sẽ có nhiều cấp lồng nhau.
- **Ví dụ minh họa callback hell**:
  - Với `setTimeout`:
    ```javascript
    setTimeout(() => {
      console.log("1 second passed");
      setTimeout(() => {
        console.log("2 seconds passed");
        setTimeout(() => {
          console.log("3 seconds passed");
          setTimeout(() => {
            console.log("4 seconds passed");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
    ```
  - Tạo ra hình dạng “tam giác” do thụt lề (indentation) tăng dần.
- **Vấn đề của callback hell**:
  - Mã lộn xộn, khó đọc, khó bảo trì.
  - Khó hiểu và suy luận logic, dễ gây lỗi (bugs).
  - Cản trở việc thêm tính năng mới.
- **Nguyên tắc quan trọng**:
  - Mã khó hiểu là mã kém chất lượng, vì dễ gây lỗi và khó mở rộng.

### 6. Giải pháp cho callback hell

- Từ ES6, JavaScript giới thiệu `Promises` để thay thế callback hell.
- `Promises` giúp quản lý các tác vụ bất đồng bộ theo cách rõ ràng và dễ bảo trì hơn.
- Sẽ được tìm hiểu chi tiết trong bài học tiếp theo.

### 7. Ghi chú thêm

- **Xử lý lỗi**:
  - Kiểm tra `data.borders` để tránh lỗi khi quốc gia không có láng giềng.
  - Xem xét tài liệu API để hiểu định dạng dữ liệu trả về (mảng hoặc đối tượng).
- **Tối ưu giao diện**:
  - Thêm lớp `neighbor` để hiển thị quốc gia láng giềng nhỏ hơn, tăng tính trực quan.
- **Ứng dụng thực tế**:
  - Chuỗi AJAX call thường gặp khi dữ liệu từ call này là đầu vào cho call tiếp theo.
  - Hiểu callback hell giúp nhận thức được tầm quan trọng của các kỹ thuật hiện đại như `Promises` hoặc `async/await`.

---

**Lưu ý**: Ghi chú này được tối ưu cho Obsidian, với cấu trúc rõ ràng, dễ liên kết chéo và tra cứu. Nội dung tập trung vào ý chính, lược bỏ phần lan man, phù hợp để ôn tập học thuật.
