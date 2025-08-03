## Hiểu Biết và Xử Lý Giá Trị Trả Về của Async Function

### Async Function và Giá Trị Trả Về

- **Async function** luôn trả về một **promise**, bất kể giá trị trả về trong hàm là gì.
- Giá trị `return` trong async function trở thành giá trị fulfilled của promise.
- Nếu xảy ra lỗi trong async function, giá trị trả về có thể là `undefined` trừ khi lỗi được ném lại (rethrow) để reject promise.

### Minh họa Async Function với Console Log

- Async function chạy bất đồng bộ trong nền (background), không chặn luồng chính.
- Ví dụ: Thêm các console.log để kiểm tra thứ tự thực thi.

```javascript
console.log("1: Start");
whereAmI();
console.log("3: End");

async function whereAmI() {
  console.log("2: Will get location");
  // ... mã bất đồng bộ ...
  console.log("2: Finished getting location");
}
```

- **Kết quả**:
  - `1: Start` → `3: End` → `2: Will get location` → `2: Finished getting location`.
  - Lý do: Hàm async chạy trong nền, JavaScript tiếp tục thực thi các dòng tiếp theo trước khi async function hoàn thành.

### Trả về Giá trị từ Async Function

- Ví dụ: Trả về chuỗi từ `whereAmI` dựa trên dữ liệu geocoding.

```javascript
async function whereAmI() {
  try {
    const pos = await getPosition();
    const { lat, lng } = pos.coords;
    const resGeo = await fetch(
      `https://api.geocoding.com/...?lat=${lat}&lng=${lng}`
    );
    if (!resGeo.ok) throw new Error("Problem getting location data");
    const dataGeo = await resGeo.json();
    const country = dataGeo.country;
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error("Problem getting country");
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${country}`; // Trả về chuỗi
  } catch (error) {
    console.error(`🚫 ${error.message}`);
    renderError(`🚫 ${error.message}`);
    // Nếu không ném lại lỗi, promise vẫn fulfilled với giá trị undefined
  }
}
```

- **Vấn đề**: Nếu gọi hàm như hàm thông thường, kết quả là promise, không phải chuỗi.

```javascript
const city = whereAmI();
console.log(city); // Promise {<pending>}
```

- **Giải pháp**: Sử dụng `.then()` để lấy giá trị fulfilled.

```javascript
whereAmI().then((city) => console.log(`2: ${city}`));
```

- **Kết quả**: `2: You are in Olhao, Portugal`.

### Xử lý Lỗi và Promise State

- Nếu lỗi xảy ra trong `try` block, mã nhảy đến `catch`, bỏ qua `return`.
- Promise từ async function vẫn **fulfilled** với giá trị `undefined` trừ khi lỗi được ném lại (rethrow).

```javascript
catch (error) {
  console.error(`🚫 ${error.message}`);
  renderError(`🚫 ${error.message}`);
  throw error; // Ném lại lỗi để reject promise
}
```

- Sau khi ném lại lỗi, promise sẽ **rejected**, cho phép xử lý bằng `.catch()`.

```javascript
whereAmI()
  .then((city) => console.log(`2: ${city}`))
  .catch((error) => console.error(`2: 🚫 ${error.message}`));
```

### Sử dụng Finally

- `finally` block luôn được thực thi, bất kể promise fulfilled hay rejected.
- Ví dụ: Đảm bảo thứ tự console.log đúng (1 → 2 → 3).

```javascript
whereAmI()
  .then((city) => console.log(`2: ${city}`))
  .catch((error) => console.error(`2: 🚫 ${error.message}`))
  .finally(() => console.log("3: End"));
```

### Chuyển đổi sang Async/Await Hoàn Toàn

- **Vấn đề**: Kết hợp `.then()/catch()` với async/await không nhất quán, trộn lẫn cách cũ và mới.
- **Giải pháp**: Sử dụng **Immediately Invoked Async Function Expression (IIAFE)** để xử lý promise bằng async/await.

```javascript
console.log("1: Start");
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (error) {
    console.error(`2: 🚫 ${error.message}`);
  }
  console.log("3: End");
})();
```

- **Lợi ích**:
  - Mã hoàn toàn sử dụng async/await, nhất quán và dễ đọc.
  - Loại bỏ sự phụ thuộc vào `.then()/catch()`.
  - `IIAFE` là một trong những trường hợp hiếm hoi vẫn hữu ích trong JavaScript hiện đại.

### Ghi chú thêm

- Async function thường gọi các async function khác, trả về và xử lý giá trị giữa chúng.
- Hiện tại, `await` chỉ hoạt động trong async function (đề xuất dùng `await` ở top-level đang được xem xét).
- Luôn ném lại lỗi trong catch block nếu muốn reject promise từ async function.
- Try/catch trong IIAFE giúp xử lý lỗi một cách gọn gàng khi gọi async function.

---

**Tham khảo**: Hiểu rõ cách async function trả về promise và cách xử lý giá trị/lỗi giúp viết mã bất đồng bộ hiệu quả và dễ bảo trì.
