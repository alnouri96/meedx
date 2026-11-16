import catalog from '../data/catalog.json';

export const siteConfig = {
  "brand": "MEEDX",
  "developer": {
    "ar": "استوديو MEEDX",
    "en": "MEEDX Studio"
  },
  "telegramUsername": "@اكتب_معرفك_هنا",
  "telegramLink": "https://t.me/MEEDXAPP",
  "tvDownloaderCode": "3213660",
  "tvShortUrl": "meedx.pages.dev/tv",
  "payments": {
    "zaincash": {
      "number": "+964781714448",
      "qr": "/assets/qr/zaincash-qr.png",
      "configured": true
    },
    "qicard": {
      "number": "7110031577",
      "qr": "/assets/qr/qicard-qr.png",
      "configured": true
    }
  },
  "githubReleases": "https://github.com/alnouri96/meedx/releases",
  "turnstileSiteKey": "",
  "downloadsMode": "github-releases",
  downloads: catalog,
};
