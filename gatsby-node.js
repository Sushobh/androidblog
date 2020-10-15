
const path = require("path");


 exports.createPages = async ({ actions, graphql, reporter }) => {
       await createPostPages(actions,graphql,reporter);
       await createAuthorPages(actions,graphql,reporter);
  }

  async function createAuthorPages(actions,graphql,reporter){
    const { createPage } = actions
    const template = require.resolve(`./src/templates/authorsindex.js`)
    const result = await graphql(`
      {
        allAuthorsJson {
          nodes {
            id
          }
        }
      }
    `)
     // Handle errors
     if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    result.data.allAuthorsJson.nodes.forEach( (node) => {
      reporter.info("Looping for "+node.id)
      createPage({
        path: '/authors/'+node.id,
        component: template,
        context: {
          // additional data can be passed via context
          author: node.id,
        },
      })
    })
  }

  async function createPostPages(actions,graphql,reporter){
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