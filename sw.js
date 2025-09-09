const CACHE_NAME = 'menu-roulette-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './og_image.png',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
];

// 서비스 워커 설치
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('캐시 열기 완료');
        return cache.addAll(urlsToCache);
      })
  );
});

// 캐시된 리소스 서빙
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에서 발견되면 캐시 버전 반환
        if (response) {
          return response;
        }
        
        // 아니면 네트워크에서 가져오기
        return fetch(event.request).then(response => {
          // 유효하지 않은 응답이면 그대로 반환
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 응답 복사 (한 번만 사용할 수 있음)
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// 오래된 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('오래된 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});