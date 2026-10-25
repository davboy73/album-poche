// /g/CODE → ouvre la galerie du client
exports.handler = async (event) => {
  const token = (event.path.split('/').pop() || '').trim().toUpperCase();

  if (!/^[A-Z0-9-]{6,40}$/.test(token)) {
    return { statusCode: 302, headers: { Location: '/' } };
  }

  return {
    statusCode: 302,
    headers: {
      Location: `/gallery.html?t=${encodeURIComponent(token)}`,
      // Cookie posé par le serveur (plus durable sur iPhone qu'un cookie posé en JavaScript)
      'Set-Cookie': `albumToken=${token}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`,
      'Cache-Control': 'no-store'
    },
    body: ''
  };
};
