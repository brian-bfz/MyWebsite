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
  const cookieName = `puzzle_auth_${key}=true`;
  const isAuthorized = cookie.split(/;\s*/).some((c) => c === cookieName);
  
  if (!isAuthorized) {
    return { 
      statusCode: 401, 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ error: "Unauthorized - please enter the correct password" }) 
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
