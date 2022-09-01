import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Jazz Chordle`,
    siteUrl: `https://jazzchordle.gatsbyjs.io`,
    description:
      'A Wordle like game to guess jazz chord progressions based on well known Jazz Standards.',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-WRR6LXR',
        includeInDevelopment: false,
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: './src/images/jazzchordle.png',
      },
    },
    'gatsby-plugin-sass',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
  ],
};

export default config;
