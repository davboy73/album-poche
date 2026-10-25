// /m/CODE → manifeste de la tuile « Album Poche » de ce client
exports.handler = async (event) => {
  const token = (event.path.split('/').pop() || '').trim().toUpperCase();
  const ok = /^[A-Z0-9-]{6,40}$/.test(token);
  const start = ok ? `/g/${token}` : '/index.html';

  const manifest = {
    id: start,
    name: 'Album Poche — David Boyer Photographe',
    short_name: 'Album Poche',
    description: 'Votre galerie photo personnelle',
    start_url: start,
    scope: '/',
    display: 'standalone',
    background_color: '#0e1b2a',
    theme_color: '#0e1b2a',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
    ]
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(manifest)
  };
};
