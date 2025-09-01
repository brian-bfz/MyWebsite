const { SECRETS } = require("./_secrets");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: "Method Not Allowed" 
    };
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { 
      statusCode: 400, 
      body: "Invalid JSON" 
    };
  }

  const password = String(payload.password || "").trim();

  // Find which secret this password unlocks
  let matchedKey = null;
  for (const [key, entry] of Object.entries(SECRETS)) {
    if (entry.password === password) {
      matchedKey = key;
      break;
    }
  }

  if (!matchedKey) {
    return { 
      statusCode: 401, 
      body: "Invalid password" 
    };
  }

  // Set a simple cookie for this specific secret
  const isSecure = Boolean(process.env.URL || process.env.NETLIFY);
  const cookie = [
    `puzzle_auth_${matchedKey}=true`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=86400", // 24 hours
    isSecure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      ok: true, 
      redirect: `/secret/${encodeURIComponent(matchedKey)}` 
    }),
  };
};
