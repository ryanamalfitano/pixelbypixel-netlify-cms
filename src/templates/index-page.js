import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

const StyledHomePageContent = styled.section`
  .masthead {
    align-items: stretch;

    .column { padding: 0; }
    
    #titles {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;

      padding-right: 30px;
      text-align: right;

      background: ${props => props.theme.grey} center / cover no-repeat;

      h3 {
        margin-top: 0;
        font-weight: normal;
        font-style: italic;
      }
    }

    #stream {
      p { display: none; }

      .embedVideo-container {
        text-align: center;
        background: black;

        iframe {
          width: 100%;
        }
      }
    }
  }

  .container {
    .mainPitch {
      margin-top: 50px;
      text-align: center;

      p {
        max-width: 30rem;
        margin: auto;
      }

      .title, .subtitle { color: inherit; }
    }

    .downloads {
      margin: 35px auto;
      justify-content: center;

      h4 {
        font-weight: normal;
      }

      .column.is-4 { flex: none; width: 33%; }

      .streamer {
        text-align: right;
        box-shadow: inset -6px 6px 5px ${props => props.theme.purple};
        border-top:   2px solid ${props => props.theme.black};
        border-right: 1px solid ${props => props.theme.black};

        h4 { color: ${props => props.theme.purple} !important; }

        a:first-of-type img { margin-right: 20px; }
        a:not(:first-of-type) img { margin-right: 5px; }
      }

      .viewer {
        box-shadow: inset 6px 6px 5px ${props => props.theme.red};
        border-top:  2px solid ${props => props.theme.black};
        border-left: 1px solid ${props => props.theme.black};

        h4 { color: ${props => props.theme.red} !important; }

        a:first-of-type img { margin-left: 20px; }
        a:not(:first-of-type) img { margin-left: 5px; }
      }
    }

    .sellingPoints {
      margin: 100px auto 50px;
      text-align: center;
    }
  }

  @media screen and (max-width: 1024px), print {
    .masthead #stream .embedVideo-container iframe { height: 300px; }
  }

  @media screen and (max-width: 768px), print {
    .masthead #titles {
      padding: 50px 25px;
      text-align: center;
    }

    .masthead #stream .embedVideo-container iframe { height: 250px; }

    .downloads {
      display: flex;

      .column {
        width: 50% !important;

        a {
          display: block;
          margin: 10px 20px;

          img { margin: 0 !important; }
        }
      }
    }
  }
`

export const IndexPageTemplate = ({title, content, contentComponent}) => {
  const PageContent = contentComponent || Content

  return (
  <StyledHomePageContent>
    <PageContent className="content" content={content} />
  </StyledHomePageContent>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <Layout pageType="home">
      <IndexPageTemplate
        contentComponent={HTMLContent}
        title={page.frontmatter.title}
        content={page.html}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
