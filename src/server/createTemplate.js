import { Helmet } from 'react-helmet';

export default function createTemplate(content, storeScript, css) {
  const helmet = Helmet.renderStatic();

  return `<html lang="en">
  <head>
      <meta charset="UTF-8">
      ${helmet.meta.toString()}
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <style type="text/css">${[...css].join('')}</style>
      <link rel="shortcut icon" href="${process.env.WEB_URL}/assets/favicon.ico">
      ${helmet.title.toString()}

      <!-- @TODO Add dynamic load from chunk and hash in the future -->
      <link rel="stylesheet" href="${process.env.WEB_URL}/app.css">

      <!-- Load external dependencies CSS -->
      <link rel="stylesheet" href="react-loader-spinner/dist/loader/css/react-spinner-loader.css">
      <link rel="stylesheet" href="react-toastify/dist/ReactToastify.css">
  </head>
  <body ${helmet.bodyAttributes.toString()}>
      <div id="root">${content}</div>

      ${storeScript}

      <!-- @TODO Add dynamic load from chunk and hash in the future -->
      <script src="${process.env.WEB_URL}/runtime~app.bundle.js"></script>
      <script src="${process.env.WEB_URL}/app.bundle.js"></script>
      <script src="${process.env.WEB_URL}/vendor.bundle.js"></script>
  </body>
</html>`;
}
