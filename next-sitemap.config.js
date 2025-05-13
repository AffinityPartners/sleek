/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yourdomain.com', // Replace with your domain
  generateRobotsTxt: true, // Generates robots.txt based on sitemap
  // Optional: List of pages to exclude
  // exclude: ['/admin/*', '/private-page'],
  // Optional: Add alternateRefs for multilingual sites
  // alternateRefs: [
  //   {
  //     href: 'https://es.example.com',
  //     hreflang: 'es',
  //   },
  // ],
  // Optional: Add custom transform function to modify sitemap entries
  // transform: async (config, path) => {
  //   return {
  //     loc: path, // => This will be exported as http(s)://<config.siteUrl>/<path>
  //     changefreq: 'daily',
  //     priority: 0.7,
  //     lastmod: new Date().toISOString(), // Use current date for RSS feed items
  //   }
  // },
  // Optional: For more advanced options, refer to the next-sitemap documentation
}; 