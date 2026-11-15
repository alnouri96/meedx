import catalog from '../data/catalog.json';

export const siteConfig = {
  ...{
  "brand": "MEEDX",
  "developer": {
    "ar": "أحمد النوري",
    "en": "Ahmed Al-Nouri"
  },
  "telegramUsername": "@اكتب_معرفك_هنا",
  "telegramLink": "https://t.me/MEEDXAPP",
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
  "githubReleases": "https://github.com/alnouri96/local-cinema/releases",
  "turnstileSiteKey": "",
  "downloadsMode": "local"
},
  downloads: catalog,
};
