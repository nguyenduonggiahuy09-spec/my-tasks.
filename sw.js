const CACHE_NAME = 'huy-taskflow-v14-cache';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Cài đặt và lưu trữ giao diện vào bộ nhớ đệm
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Trả về giao diện từ bộ nhớ đệm khi mất mạng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Trả về bản Offline
        }
        return fetch(event.request); // Nếu có mạng thì tải bình thường
      })
  );
});
