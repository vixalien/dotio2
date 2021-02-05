let fs = require('fs');
let { resolve } = require('path');
let glob = require('glob');

let allPages = glob.sync(resolve('out/**/*'));

let siteMap = `<?xml version="1.0" encoding="UTF-8"?>

<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

   ${allPages.map(page => `
   <sitemap>

      <loc>https://www.vixalien.ga/${page.replace(/^out\//, '')}</loc>

   </sitemap>
`).join('\n')}
</sitemapindex>`

fs.writeFileSync(resolve('out', 'sitemap.xml', siteMap));
