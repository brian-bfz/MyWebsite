import React, { useState } from "react";

import { navigate } from "gatsby";

import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Meta";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";

const PuzzlePage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/puzzle-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
        credentials: "include",
      });

      if (!res.ok) {
        const msg = await res.text();
        setError(msg || "Invalid password");
      } else {
        const data = await res.json();
        await navigate(data.redirect || "/");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Sidebar />
      <Page title="Enter Password">
        <p>Enter a password to unlock a secret page:</p>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>
              Password:{" "}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                style={{
                  padding: "8px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginLeft: "8px",
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007acc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Checking..." : "Unlock"}
          </button>
          {error && (
            <p style={{ color: "crimson", marginTop: "16px" }}>{error}</p>
          )}
        </form>
      </Page>
    </Layout>
  );
};

export const Head: React.FC = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Meta
      title={`Puzzle - ${title}`}
      description={subtitle}
    />
  );
};

export default PuzzlePage;
