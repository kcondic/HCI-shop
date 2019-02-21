const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const catalogTemplate = path.resolve(`src/templates/catalog.js`);

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { slug } = node.frontmatter;
      createPage({
        path: "/catalogs/" + slug,
        component: catalogTemplate,
        context: {
          slug
        }
      });
    });
  });
};