exports.handler = async (event) => {
  const token = event.path.split('/').pop().toUpperCase();

  if (!token || token.length < 10) {
    return { statusCode: 302, headers: { Location: '/' } };
  }

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ma Galerie — David Boyer Photographe</title>
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta name="theme-color" content="#0e1b2a">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Album Poche">
  <script>
    const TOKEN = '${token}';
    function setCookie(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
    }
    setCookie('albumToken', TOKEN, 365);
    window.location.href = '/gallery.html';
  </script>
</head>
<body style="background:#0e1b2a;"></body>
</html>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: html
  };
};
