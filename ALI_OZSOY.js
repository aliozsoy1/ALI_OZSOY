(() => {

    const buildHTML = () =>{
        const html = `
        <div class="container-products">
            <div class="carousel-title">
                <h1>Sizin için Seçtiklerimiz</h1>
            </div>
            <div class="carousel">
                <div class="left-arrow"></div>
                <div class="carousel-container">
                        <div class="product-cards"></div>
                </div>
                <div class="right-arrow"></div>
            </div>
        </div>
        `;
        $('.product-detail').append(html);
    };
    const buildCSS = () =>{
        const css = `
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                .container-products{
                max-width:1320px;
                height:auto;
                margin:0 auto;
                }
                .carousel-title{
                background-color:#fef6eb;
                border-radius:35px 35px 0px 0px;
                font-weight:700;
                }
                .carousel-title h1{
                color:#f28e00;
                padding: 25px 67px;
                font-family: "Quicksand";
                font-size:28px;
                font-weight:700;
                }
                .carousel{
                position:relative;
                }
                .carousel-container {
                position: relative;
                overflow: hidden;
                }
                .left-arrow,
                .right-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: #fef6eb !important;
                cursor: pointer;
                font-size: 18px;
                padding: 25px;
                z-index: 10;
                border-radius:50px;
                border:1px solid transparent;
                }
                .left-arrow:hover,
                .right-arrow:hover{
                border:1px solid #f28e00;
                background-color:#fff !important;
                }
                .left-arrow { 
                left: -65px; 
                background: url(https://cdn06.e-bebek.com/assets/svg/prev.svg) no-repeat center center;
                }
                .right-arrow { 
                right: -65px; 
                background: url(https://cdn06.e-bebek.com/assets/svg/next.svg) no-repeat center center;
                }
                .product-cards{
                display:flex;
                transition: transform 0.3s ease;
                gap:20px;
                }
                a{
                text-decoration: none;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                color:#7d7d7d;
                }
                .product-card{
                flex: 0 0 calc(93% / 5);
                border:1px solid #ededed;
                border-radius:10px;
                padding:20px;
                color:#7d7d7d;
                font-family:Poppins,"cursive";
                box-sizing:border-box;
                }
                .product-card:last-child {
                margin-right: 0;
                }
                .product-img img{
                object-fit: contain;
                width: 100%;
                }   
                .product-item-content{
                padding:0px 17px;
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                height:100%;
                }
                .product-title h2{
                font-size:12px;
                font-weight:500;
                }
                .discount-products {
                display: flex;
                gap: 15px;
                align-items: center;
                }
                .product-discount{
                font-size:18px;
                color:#00a365;
                font-weight:bold;
                }
                .product-price-discount{
                color:#00a365;
                font-size:22px;
                font-weight:600;
                }
                .product-original-price{
                text-decoration:line-through;
                font-size:14px;
                }
                .product-price{
                font-size:22px;
                font-weight:600;
                }
                .product-add-basket-btn button{
                background-color:#fff7ec;
                color:#f28e00;
                font-size:14px;
                font-weight:700;
                padding:15px 20px;
                border-radius:37px;
                width:100%;
                border:0px;
                margin-top:30px;
                cursor:pointer;
                }
        `;
        $('<style>').addClass('carousel-style')
                    .html(css)
                    .appendTo('head');
    };
    
    const setEvents = () =>{
        $('.container').on('click', () => {
                console.log('clicked');
        });
        
    };
async function getData() {
  const url = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.json();
}

    async function renderData() {
        try {
            const products = await getData();
            const $container = $('.product-cards');
            $container.empty();

            products.forEach(data => {
                let priceHtml = '';
                if (data.price === data.original_price) {
                priceHtml = `<div class="product-price">${data.price.toFixed(2)} TL</div>`;
                } else {
                const discountPercent = Math.round(100 - (data.price / data.original_price) * 100);
                priceHtml = `
                <div class="discount-products">
                    <div class="product-original-price">
                    ${data.original_price.toFixed(2)} TL
                    </div>
                    <div class="product-discount">
                    <span>&#10549;</span>%${discountPercent}
                    </div>
                </div>
                    <div class="product-price-discount">
                    ${data.price.toFixed(2)} TL
                    </div>
                    
                `;
                }
            const $card = $(`
                <div class="product-card">
                    <a href="${data.url}">
                        <div class="product-img">
                            <img src="${data.img}" alt="${data.name.trim()}" />
                        </div>
                        <div class="product-item-content">
                            <div class="product-title">
                            <h2><b>${data.brand}</b> - ${data.name.trim()}</h2>
                            </div>
                            ${priceHtml}
                        </div>
                        <div class="product-add-basket-btn button"><button>Sepete Ekle</button></div>
                    </a>
                </div>
            `);
            $container.append($card);
            });

    let currentIndex = 0;
    const visibleCount = 5;
    const totalProducts = products.length;

    $('.right-arrow').on('click', () => {
      if (currentIndex < totalProducts - visibleCount) {
        currentIndex++;
        $container.css('transform', `translateX(-${(100 / visibleCount) * currentIndex}%)`);
      }
    });

    $('.left-arrow').on('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        $container.css('transform', `translateX(-${(100 / visibleCount) * currentIndex}%)`);
      }
    });

  } catch (e) {
    console.error('Ürünler alınamadı:', e);
  }
}
    const self = { buildHTML, buildCSS, setEvents };
    const init = () => {
        self.buildHTML();
        self.buildCSS();
        renderData();
    }
    init();
})(); 