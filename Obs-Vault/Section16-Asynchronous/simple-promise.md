## Xây dựng và sử dụng Promise trong JavaScript

### Khái niệm cơ bản về Promise

- Promise là một đối tượng đặc biệt trong JavaScript, được sử dụng để xử lý các thao tác bất đồng bộ (asynchronous operations).
- Promise có hai trạng thái chính:
  - **Fulfilled (hoàn thành)**: Thao tác thành công, trả về giá trị.
  - **Rejected (từ chối)**: Thao tác thất bại, trả về lỗi.
- Promise được tạo bằng hàm tạo `Promise` (Promise constructor), nhận một hàm thực thi (executor function) làm tham số.

### Tạo một Promise

- Sử dụng cú pháp: `new Promise(executorFunction)`.
- Hàm thực thi nhận hai tham số:
  - `resolve`: Hàm đánh dấu Promise hoàn thành và truyền giá trị kết quả.
  - `reject`: Hàm đánh dấu Promise thất bại và truyền thông báo lỗi.

#### Ví dụ: Mô phỏng xổ số bằng Promise

- Tạo một Promise mô phỏng xổ số, với 50% cơ hội thắng và 50% cơ hội thua.

```javascript
const lotteryPromise = new Promise((resolve, reject) => {
  console.log("Đang quay số... 🔮");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("Bạn đã thắng xổ số! 🎉");
    } else {
      reject(new Error("Bạn đã thua! 💸"));
    }
  }, 2000);
});
```

````

- **Giải thích**:
  - `setTimeout` mô phỏng thời gian chờ kết quả xổ số (2 giây).
  - Sử dụng `Math.random()` để tạo số ngẫu nhiên (0 đến 1).
  - Nếu số ngẫu nhiên ≥ 0.5, gọi `resolve` với thông điệp thắng.
  - Nếu không, gọi `reject` với một đối tượng `Error` chứa thông điệp thua.

### Sử dụng Promise

- Sử dụng phương thức `.then()` để xử lý kết quả khi Promise hoàn thành.
- Sử dụng phương thức `.catch()` để xử lý lỗi khi Promise bị từ chối.

```javascript
lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

- **Kết quả**:
  - Nếu Promise hoàn thành: In ra `"Bạn đã thắng xổ số! 🎉"`.
  - Nếu Promise bị từ chối: In ra lỗi `"Bạn đã thua! 💸"`.

### Promisifying: Chuyển đổi hàm dựa trên callback thành Promise

- **Promisifying** là quá trình chuyển đổi hành vi bất đồng bộ dựa trên callback thành hành vi dựa trên Promise.
- Ví dụ: Chuyển đổi `setTimeout` thành hàm `wait` trả về Promise.

#### Ví dụ: Tạo hàm `wait`

```javascript
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};
```

- **Giải thích**:
  - Hàm `wait` nhận số giây và trả về một Promise.
  - Promise tự động gọi `resolve` sau thời gian chờ (không cần `reject` vì `setTimeout` không thất bại).
  - Không truyền giá trị vào `resolve` vì mục đích chỉ là chờ thời gian.

#### Sử dụng hàm `wait`

```javascript
wait(2)
  .then(() => {
    console.log("Đã chờ 2 giây");
    return wait(1);
  })
  .then(() => console.log("Đã chờ thêm 1 giây"));
```

- **Kết quả**:
  - In `"Đã chờ 2 giây"` sau 2 giây.
  - In `"Đã chờ thêm 1 giây"` sau thêm 1 giây.
  - Tạo chuỗi các thao tác bất đồng bộ tuần tự, tránh callback hell.

### Tạo Promise hoàn thành/từ chối ngay lập tức

- Sử dụng `Promise.resolve(value)` để tạo Promise hoàn thành ngay với giá trị `value`.
- Sử dụng `Promise.reject(error)` để tạo Promise bị từ chối ngay với lỗi `error`.

#### Ví dụ

```javascript
Promise.resolve("abc").then((res) => console.log(res));

Promise.reject(new Error("abc")).catch((err) => console.error(err));
```

- **Kết quả**:
  - In `"abc"` (từ `Promise.resolve`).
  - In lỗi `"abc"` (từ `Promise.reject`).

### Ghi chú thêm

- Promise giúp quản lý các thao tác bất đồng bộ một cách rõ ràng và dễ đọc hơn so với callback.
- Trong thực tế, thường chỉ tạo Promise khi cần chuyển đổi các hàm callback cũ thành Promise (promisifying).
- Luôn đảm bảo Promise chuyển sang trạng thái `fulfilled` hoặc `rejected` để tránh trạng thái treo (pending).
- Sử dụng `new Error()` khi gọi `reject` để cung cấp thông tin lỗi chi tiết hơn.

````

PART 2 2. Comsume the promise using .then and also add an error handler; 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier; 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉); 5. After the second image has loaded, pause execution for 2 seconds again; 6. After the 2 seconds have passed, hide the current image.

PART 1

1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
