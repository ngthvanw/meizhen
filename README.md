# Hai người diễn theo nhạc - ReactJS

## Chạy dự án

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ Vite hiện ra, thường là http://localhost:5173.

## Cách dùng

1. Bấm **Chọn nhạc** và chọn MP3/WAV trên máy.
2. Bấm **Phát nhạc**.
3. Animation thay đổi theo `currentTime` của audio.
4. Muốn khớp đúng bài của bạn, sửa mảng `TIMELINE` trong `src/App.jsx`.

Ví dụ:

```js
{ from: 12, to: 16, left: 'pointRight', right: 'surprised', text: '...' }
```

Các action có sẵn:

- idle
- lookRight / lookLeft
- wave
- pointRight / pointLeft
- surprised
- heart
- jump
- danceLeft / danceRight
- hugLeft / hugRight
- spin
- bow
