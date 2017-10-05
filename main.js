function buildProduct(product) {
  var productDiv = document.createElement('a');
	productDiv.className  = 'product';
	productDiv.setAttribute('href', 'http:'+product.detailUrl);

  if(product.imageName){
    var productImg = document.createElement('img');
    productImg.className  = 'product__img';
    productImg.src = 'http:'+product.imageName;
    productDiv.appendChild(productImg);
  }
	
  if(product.name) {
    var productTittle = document.createElement('div');
    productTittle.className  = 'product__title';
    productTittle.title = product.name;
    var subTitle = product.name.substring(0, 70);
    if (product.name.length > 70) {
      subTitle+= '...';
    }
    productTittle.innerHTML = subTitle;
    productDiv.appendChild(productTittle);
  }	

  if(product.oldPrice) {
    var productOldPrice = document.createElement('div');
    productOldPrice.className  = 'product__old-price';
    productOldPrice.innerHTML = 'De: ' + product.oldPrice;
    productDiv.appendChild(productOldPrice);
  }

  if(product.price) {
    var productPrice = document.createElement('div');
    productPrice.className  = 'product__price';
    productPrice.innerHTML = '<small>Por:</small> <b>' + product.price + '</b>';
    productDiv.appendChild(productPrice);
  }
	
  if(product.productInfo && product.productInfo.paymentConditions) {
    var productCondition = document.createElement('div');
    productCondition.className  = 'product__condition';  
    productCondition.innerHTML = product.productInfo.paymentConditions + '<br> sem juros';   
    productDiv.appendChild(productCondition);
  }	

	return productDiv;
}

function buildProductsList(productList) {
	var productListHtml = document.createElement('div');
  productListHtml.className  = 'carousel-container';
  var productListUl = document.createElement('ul');

	if (!productList) {
		return productListUl.innerHTML = 'Não foi possível carregar a listagem';
	}

	for (var i = 0, len = productList.length; i < len; i++) {
    var productLi = document.createElement('li');
    productLi.className = 'carousel-item';
    productLi.appendChild(buildProduct(productList[i]));
  	productListUl.appendChild(productLi);
	}

  productListHtml.appendChild(productListUl);
	return productListHtml;
}

function createProductListHTML(carouselData) {
	var carousel = document.getElementsByClassName('carousel')[0];

  var leftArrowContainer = document.createElement('div');
  leftArrowContainer.className  = 'arrow-container';
  var leftArrow = document.createElement('div');
  leftArrow.className  = 'left-arrow';
  leftArrowContainer.appendChild(leftArrow);
  carousel.appendChild(leftArrowContainer);

  carousel.appendChild(buildProductsList(carouselData));

  var rightArrowContainer = document.createElement('div');
  rightArrowContainer.className  = 'arrow-container';
  var rightArrow = document.createElement('div');    
  rightArrow.className  = 'right-arrow';
  rightArrowContainer.appendChild(rightArrow)
  carousel.appendChild(rightArrowContainer);

  createCarousel();
}

function createReferenceProduct(referenceData) {
	document.getElementsByClassName('product-reference__container')[0].appendChild(buildProduct(referenceData));
}

function X(data) {
  createReferenceProduct(data.data.reference.item);
  createProductListHTML(data.data.recommendation);
}

var tag = document.createElement('script');
tag.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
document.getElementsByTagName('head')[0].appendChild(tag);

function createCarousel() {
  var carousel = { 
    container: document.getElementsByClassName('carousel')[0]
  };
  
  if(carousel.container) {
    carousel.carouselContainer = carousel.container.querySelector('.carousel-container');
    carousel.carouselContainerUl = carousel.carouselContainer.querySelector('ul');
    carousel.items = carousel.carouselContainerUl.children;
    carousel.numberOfSlides = Math.ceil(carousel.items.length/3);

    carousel.carouselContainerUl.style.width = (carousel.items.length*182)+'px';


    carousel.buttons = {
      'prev': carousel.container.querySelector('.left-arrow'),
      'next': carousel.container.querySelector('.right-arrow')
    };

    carousel.currentItem = 0;

    (function(carousel){
      carousel.buttons.prev.addEventListener('click', function(e){ carouselPrev(carousel); });
      carousel.buttons.next.addEventListener('click', function(e){ carouselNext(carousel); });

    })(carousel);
  }
}

function carouselNext(carousel) {
  carousel.currentItem++;
  if(carousel.currentItem >= carousel.numberOfSlides) {
    carousel.currentItem = 0;
  }

  displayCarouselItem(carousel);
}

function carouselPrev(carousel) {
  carousel.currentItem--;
  if(carousel.currentItem <= -1) {
    carousel.currentItem = carousel.numberOfSlides - 1;
  }

  displayCarouselItem(carousel);
}

function displayCarouselItem(carousel) {
  carousel.carouselContainerUl.style.marginLeft = (-1 * (carousel.currentItem * 182 * 3))+'px';
}
