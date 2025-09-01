import React, { useEffect, useMemo, useState } from "react";

import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Meta";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";

interface Props {
  params?: { "*": string };
}

interface SecretData {
  title: string;
  html: string;
}

interface SecretState {
  data?: SecretData;
  error?: string;
  loading: boolean;
}

const SecretTemplate: React.FC<Props> = ({ params }) => {
  const key = useMemo(() => (params?.["*"] || "").replace(/^\/+/, ""), [params]);
  const [state, setState] = useState<SecretState>({ loading: true });

  useEffect(() => {
    let mounted = true;

    const fetchSecret = async () => {
      if (!key) {
        if (mounted) {
          setState({ 
            loading: false, 
            error: "No secret key provided" 
          });
        }
        return;
      }

      try {
        const res = await fetch(`/.netlify/functions/secret?key=${encodeURIComponent(key)}`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ error: "Unauthorized" }));
          if (mounted) {
            setState({ 
              loading: false, 
              error: errorData.error || "Unauthorized" 
            });
          }
          return;
        }

        const data = await res.json();
        if (mounted) {
          setState({ 
            loading: false, 
            data: { title: data.title, html: data.html }
          });
        }
      } catch {
        if (mounted) {
          setState({ 
            loading: false, 
            error: "Failed to load secret content" 
          });
        }
      }
    };

    fetchSecret();

    return () => {
      mounted = false;
    };
  }, [key]);



  if (state.loading) {
    return (
      <Layout>
        <Sidebar />
        <Page title="Loading...">
          <p>Loading secret content...</p>
        </Page>
      </Layout>
    );
  }

  if (state.error) {
    return (
      <Layout>
        <Sidebar />
        <Page title="Access Denied">
          <div>
            <p>{state.error}</p>
            <p>
              Go to <a href="/puzzle">/puzzle</a> to enter the correct password.
            </p>
          </div>
        </Page>
      </Layout>
    );
  }

  if (!state.data) {
    return (
      <Layout>
        <Sidebar />
        <Page title="Not Found">
          <p>Secret page not found.</p>
        </Page>
      </Layout>
    );
  }

  return (
    <Layout>
      <Sidebar />
      <Page title={state.data.title}>
        <div dangerouslySetInnerHTML={{ __html: state.data.html }} />
      </Page>
    </Layout>
  );
};

export const Head: React.FC<Props> = ({ params }) => {
  const key = useMemo(() => (params?.["*"] || "").replace(/^\/+/, ""), [params]);
  const { title, subtitle } = useSiteMetadata();

  return (
    <Meta
      title={`Secret ${key} - ${title}`}
      description={subtitle}
    />
  );
};

export default SecretTemplate;
