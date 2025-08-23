// Basic Service Worker for TaxPro Consulting Website
// Provides basic caching for improved performance

const CACHE_NAME = 'taxpro-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/css/responsive.css',
  '/css/animations.css',
  '/js/main.js',
  '/js/hero-interactive.js',
  '/js/form-validation.js',
  '/js/accessibility.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Cache install failed:', error);
        // Don't fail the install if caching fails
      })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(function(error) {
        console.log('Fetch failed:', error);
        // Return the request anyway
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});