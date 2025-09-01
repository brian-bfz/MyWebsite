const { SECRETS } = require("./_secrets");

exports.handler = async (event) => {
  const key = String((event.queryStringParameters || {}).key || "").trim();
  const entry = SECRETS[key];
  
  if (!entry) {
    return { 
      statusCode: 404, 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ error: "Secret not found" }) 
    };
  }

  // Check if user has the right cookie for this specific secret
  const cookie = event.headers.cookie || "";
  const cookieName = `puzzle_auth_${key}`;
  
  // Debug logging (remove in production)
  console.log("Looking for key:", key);
  console.log("Cookie header:", cookie);
  console.log("Looking for cookie:", cookieName);
  
  // Parse cookies more robustly
  const cookies = {};
  cookie.split(/;\s*/).forEach(c => {
    const [name, value] = c.split('=');
    if (name && value) {
      cookies[name.trim()] = value.trim();
    }
  });
  
  console.log("Parsed cookies:", cookies);
  
  const isAuthorized = cookies[cookieName] === 'true';
  
  if (!isAuthorized) {
    return { 
      statusCode: 401, 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ 
        error: "Unauthorized - please enter the correct password",
        debug: { key, cookieName, cookies } // Remove in production
      }) 
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      title: entry.title, 
      html: entry.html 
    }),
  };
};
