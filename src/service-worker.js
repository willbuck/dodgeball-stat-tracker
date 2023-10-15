/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);


registerRoute(
// app will try to pull data from the network first for all pages
// if the network is offline or unavailable we will use the cache
  ({ url }) => url.origin === self.location.origin && !url.pathname.startsWith('/_'),
  new StaleWhileRevalidate({
    cacheName: 'pages',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Adjust this value according to your needs
      }),
    ],
  })
);


// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Work in progress to save requests until online
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'DELETE') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            // Save the failed request to be retried later
            console.log('saving delete response')
            return saveRequest(event.request);
          }
        })
        .catch(() => {
          // Save the failed request to be retried later
          return saveRequest(event.request);
        })
    );
  }
});

// Any other custom service worker logic can go here.