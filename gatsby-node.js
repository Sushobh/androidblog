
const path = require("path");


 exports.createPages = async ({ actions, graphql, reporter }) => {
       await createPostPages(actions,graphql);
       createAuthorPages();
  }

  async function createAuthorPages(actions,graphql){

  }

  async function createPostPages(actions,graphql){
    const { createPage } = actions
  
    const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)
  
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: blogPostTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })
  }