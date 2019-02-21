module.exports = {
  siteMetadata: {
    title: "HCI Shop",
    description: "Welcome to our shop!"
  },

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/catalogs`,
        name: "catalogs"
      }
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
              backgroundColor: "transparent"
            }
          }
        ]
      }
    }
  ]
};
