//создание экземпляра vue
let app = new Vue({
    el: '#app',     //подключение экземпляра к html странице
    data: {     //место для хранения данных
        product: "Socks",
        description: 'A pair of warm, fuzzy socks',
        image: "./assets/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: true,
        inventory: 100,
        onSale: true,
    }
})
