// /g/CODE → sert directement la galerie du client, à cette adresse.
// La page porte sa propre fiche d'installation (/m/CODE) : la tuile de l'écran
// d'accueil s'ouvre donc toujours sur /g/CODE, quoi que le téléphone oublie.
exports.handler = async (event) => {
  const token = (event.path.split('/').pop() || '').trim().toUpperCase();

  if (!/^[A-Z0-9-]{6,40}$/.test(token)) {
    return { statusCode: 302, headers: { Location: '/' } };
  }

  const site = process.env.URL || 'https://david-boyer-photographe.netlify.app';
  let html;
  try {
    const r = await fetch(`${site}/gallery.html`, { headers: { 'Cache-Control': 'no-cache' } });
    if (!r.ok) throw new Error('gallery.html ' + r.status);
    html = await r.text();
  } catch (e) {
    // En secours : ancienne méthode (redirection)
    return { statusCode: 302, headers: { Location: `/gallery.html?t=${token}` } };
  }

  html = html
    .replace('<head>', `<head>\n  <base href="/">\n  <script>window.__ALBUM_T = '${token}';</script>`)
    .replace(/<link rel="manifest"[^>]*>/, `<link rel="manifest" href="/m/${token}">`);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': `albumToken=${token}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`
    },
    body: html
  };
};
