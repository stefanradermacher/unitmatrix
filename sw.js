const VERSION = "v2";
const CACHE = `unitmatrix-${VERSION}`;

const PRECACHE = [
    "/",
    "/impressum.html",
    "/datenschutz.html",
    "/assets/css/style.css",
    "/assets/js/app.js",
    "/assets/js/units.js",
    "/assets/js/state.js",
    "/assets/js/theme.js",
    "/assets/js/convert.js",
    "/assets/js/modals.js",
    "/assets/js/i18n.js",
    "/manifest.json",
    "/assets/img/favicon.svg",
    "/assets/img/apple-touch-icon.png",
    "/assets/fonts/inter/Inter-Regular.woff2",
    "/assets/fonts/inter/inter-tight-latin-400-normal.woff2",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    if (new URL(event.request.url).origin !== location.origin) return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                // Cache locale files on first use so they work offline too
                if (event.request.url.includes("/assets/js/locales/") && response.ok) {
                    caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
                }
                return response;
            });
        })
    );
});
