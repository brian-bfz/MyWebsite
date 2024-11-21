import React, { useState } from "react";

import { graphql } from "gatsby";

import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Meta";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { Node } from "@/types";
import { Button } from '@/components/NewButton';
import { Toggle } from '@/components/Toggle';

interface Props {
  data: {
    markdownRemark: Node;
  };
}

const PageTemplate: React.FC<Props> = ({ data }: Props) => {
  const { frontmatter } = data.markdownRemark;
  const { title, casual, nerdy, resume } = frontmatter;
  const [selectedOption, setSelectedOption] = useState(1);

  return (
    <Layout>
      <Sidebar />
      <Page title={title}>
        <Toggle
          title="Casual"
          onClick={() => setSelectedOption(1)}
        />
        <Toggle
          title="Nerdy"
          onClick={() => setSelectedOption(2)}
        />
        <Toggle
          title="Nerdier"
          onClick={() => setSelectedOption(3)}
        />
        <div>
          {selectedOption === 1 && <div dangerouslySetInnerHTML={{ __html: casual }} />}
          {selectedOption === 2 && <div dangerouslySetInnerHTML={{ __html: nerdy }} />}
          {selectedOption === 3 && <Button title="Download Resume" to={resume.publicURL} download/>}
        </div>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
        casual
        nerdy
        resume {
            publicURL
        }      
      }
    }
  }
`;

export const Head: React.FC<Props> = ({ data }) => {
  const { title, subtitle } = useSiteMetadata();

  const {
    frontmatter: {
      title: pageTitle,
      description: pageDescription = "",
    },
  } = data.markdownRemark;
  const description = pageDescription || subtitle;

  return (
    <Meta
      title={`${pageTitle} - ${title}`}
      description={description}
    />
  );
};

export default PageTemplate;
