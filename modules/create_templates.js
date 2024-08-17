
module.exports= (el, product) => {

    let output = el.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}