// Title:
module.exports = {
  title: 'jOV2',
  description: 'A light Javascript API for extracting POI (Point Of Interest) from an OV2 database file',
}

// Theme
module.exports = {
  themeConfig: {
    // Navbar
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jclo/jov2' },
    ],

    // Sidebar
    sidebar: {

      // Guide
      '/guide/': [
        '',
      ],

      // fallback
      '/': [
        '',        /* / */
        'license.md',
      ]
    },

    lastUpdated: 'Last Updated', // string | boolean
  },
}
