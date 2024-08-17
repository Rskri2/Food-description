const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replace_template = require('./modules/create_templates');

const product_cart = fs.readFileSync('product_cart.html', 'utf-8');
const index = fs.readFileSync('index.html', 'utf-8');
const product = fs.readFileSync('product.html', 'utf-8');
const data = fs.readFileSync('response.json', 'utf-8');
const dataObj = JSON.parse(data);

const slug = dataObj.map(el => slugify(el.productName));

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        const card_html = dataObj.map(el => {
            return replace_template(product, el);
        }).join('');

        let output = index.replace(/{%PRODUCT_CARDS%}/g, card_html);
        res.end(output);
    }
    // Handle product page
    else if (pathname === '/product') {
        const product_id = query.id;
        const product_name = dataObj[product_id];

        if (!product_name) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Product not found</h1>');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        const output = replace_template(product_cart, product_name);
        res.end(output);
    }
    // Handle invalid routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Server started");
});
