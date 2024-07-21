/* eslint-disable no-restricted-globals, no-underscore-dangle */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// Take control of the page as soon as possible
clientsClaim();

// Precache all assets generated by the build process
precacheAndRoute([...self.__WB_MANIFEST]);

// Regular expression to detect file extensions
const fileExtensionRegexp = /[^?/]+\.[^/]+$/;

// Register route to handle navigation requests
registerRoute(
    ({ request, url }) => {
        // Skip non-navigation requests
        if (request.mode !== "navigate") return false;

        // Exclude URLs that start with "/_"
        if (url.pathname.startsWith("/_")) return false;

        // Exclude URLs with file extensions
        if (url.pathname.match(fileExtensionRegexp)) return false;

        // Return true for navigation requests to be handled by the service worker
        return true;
    },
    // Serve the index.html shell for navigation requests
    createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`)
);

// Register route to cache image files with a stale-while-revalidate strategy
registerRoute(
    ({ url }) => {
        const path = url.pathname.split("/");
        const lastSegment = path[path.length - 1];
        return url.origin === self.location.origin && ["png", "jpg", "jpeg", "svg"].includes(lastSegment);
    },
    new StaleWhileRevalidate({
        cacheName: "images",
        plugins: [new ExpirationPlugin({ maxEntries: 50 })],
    })
);

// Listen for "SKIP_WAITING" messages to activate the new service worker immediately
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
