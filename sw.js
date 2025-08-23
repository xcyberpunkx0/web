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

// Fetch event - serve from cache only (offline deployment)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version only, no network fallback
        if (response) {
          return response;
        }
        // For offline deployment, return a basic response for missing resources
        return new Response('Resource not available offline', {
          status: 404,
          statusText: 'Not Found'
        });
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