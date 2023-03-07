async function getProducts () {
  try {
    const data = await fetch('https://ecommercebackend.fundamentos-29.repl.co/')

    const res = await data.json()

    window.localStorage.setItem('products', JSON.stringify(res))

    return res
  } catch (error) {
    console.log(error)
  }
}

function printProducts (db) {
  const productsHTML = document.querySelector('.products_items')

  let html = ''

  for (const product of db.products) {
    html += `
    <div class="product_item">
        <div class="product_item_img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product_item_info">
            <h3>$ ${product.price} <span>Stock: ${product.quantity}</span></h3> 
            <p>${product.name}
            <i class='bx bx-plus' id='${product.id}'></i>
            </p>
        </div>
    </div>`
  }

  productsHTML.innerHTML = html
}

async function main () {
  const db = {
    products:
      JSON.parse(window.localStorage.getItem('products')) ||
      (await getProducts()),
    cart: {}
  }

  printProducts(db)
}

main()
