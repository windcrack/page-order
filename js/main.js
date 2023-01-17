const inputsBlock = document.querySelectorAll('.js-input-block');
const inputsBlockNoTextarea = document.querySelectorAll('.js-input-block:not(.js-no-req)');
const navLink = document.querySelectorAll('.header-nav__link');
const inputs = document.querySelectorAll('.js-input');
const payments = document.querySelectorAll('.payment__input');
const orderCard = document.querySelectorAll('.order-card')

const addressInput = document.querySelector('.form-block__address');
const mobMenuLists = document.querySelector('.header-nav__mob');
const headerMob = document.querySelector('.header-nav__mob');
const curSymb = document.querySelector('.comment__count-start');
const commnetSymb = document.querySelector('.comment__text');
const howDeviliry = document.querySelector('.aside-block__deviliry-radio');
const totalSumm = document.querySelector('.aside-block__total-number');


const buttonOrder = document.querySelector('.btn__order');
const btnMob = document.querySelector('.btn__burger');
const btnApply = document.querySelector('.btn__promo');
const btnAddress = document.querySelector('.btn__address');

const inputPromo = document.querySelector('.js-input-promo');
const sucsessPromo = document.querySelector('.form-block__promo-sucsess');
const failPromo = document.querySelector('.form-block__promo-fail');

const inputEmail = document.querySelector('.js-email');
const btnSaleFooter = document.querySelector('.btn__sale-footer');

const totalBlock = document.querySelector('.aside-block');

const FomData = []

let mokPromo = '1B6D9FC'

function getAllDate (){
    let obj = {}

    obj['card'] = getInfoCard();
    
    inputs.forEach(elem => {
        if(elem.value.length > 0){
            obj[elem.placeholder] = elem.value
        }
    })

    payments.forEach((payment) => {
        if(payment.checked){
            obj['payment'] = payment.value
        }
    })

    if(howDeviliry.checked){
        obj['Доставка'] = "Со склада"
    }else{
        obj['Доставка'] = "Курьером"
    }

    obj['Итого'] = totalSumm.innerText
    
    console.log(obj);
    return FomData.push(obj)
}

function createDoneBlock(){
    let div = document.createElement('div');
    div.classList.add('aside-block__done')
    div.innerHTML = `
    <svg class="done" width="64" height="64">
      <use xlink:href="#done"></use>
    </svg>
    <p>Спасибо за Ваш заказа. В ближашее время с Вами свяжется наш менеджер для подтвеждения заказа.</p>
    `;
    totalBlock.innerHTML = '';
    totalBlock.append(div);
}

buttonOrder.addEventListener('click', e =>{
    e.preventDefault();
    createDoneBlock();

    getAllDate();
})

function calcSymbol(){
    commnetSymb.addEventListener('keyup', () =>{
        curSymb.innerHTML = commnetSymb.value.length;
    })
}

calcSymbol();

function getInfoCard(){
    let result = []
    orderCard.forEach(elem =>{
        let title = elem.querySelector('.descr-title').innerHTML;
        let article = elem.querySelector('.descr-article span').innerHTML;
        let count = elem.querySelector('.order-card__number_total').innerHTML;

        let sizes = elem.querySelectorAll('.descr-size__item-input');
        let colors = elem.querySelectorAll('.descr-color__input');
        let selectSize, selectColor;

        sizes.forEach(size =>{
            if(size.checked){
                selectSize = size.value
            }
        })

        colors.forEach(color =>{
            if(color.checked){
                selectColor = color.value
            }
        })
        result.push({title, article, selectSize, selectColor, count});
    })

    return result
}

function changeCountProduct(){
    orderCard.forEach(elem =>{
        let btnIncriment = elem.querySelector('.order-card__number_plus');
        let btnDecriment = elem.querySelector('.order-card__number_minus');
        let count = elem.querySelector('.order-card__number_total');

        btnIncriment.addEventListener('click', ()=>{
            let curCount = +count.innerHTML
            curCount++;
            if(curCount > 1) btnDecriment.disabled = false;
            count.innerHTML = curCount;
        })

        btnDecriment.addEventListener('click', ()=>{
            let curCount = +count.innerHTML
            curCount--
            if(curCount <= 0){
                btnDecriment.disabled = true;
                return false;
            };
            count.innerHTML = curCount;
        })
    })
}

changeCountProduct();

function isShowBlock(btn, block){
    document.addEventListener('click', (e) =>{
        if(! e.composedPath().includes(btn)){
            block.classList.remove('grid');
        }else{
            block.classList.toggle('grid');
        }
    })
}

isShowBlock(btnMob, headerMob)

function showAfter(arr){
    if(arr.length > 0){
        arr.forEach((elem) => {
            const input = elem.querySelector('.js-input');
            const after = elem.querySelector('.form-block__after');
            isShow(input, after)
        })
    }
}

showAfter(inputsBlock);

function showValid(arr){
    if(arr.length > 0){
        arr.forEach(el =>{
            let curVal = el.querySelector('.form-block__valid');
            let input = el.querySelector('.js-input');
            input.addEventListener('change', () =>{
                if(input.value.length === 0){
                    curVal.style.display = 'block'
                }else{
                    curVal.style.display = 'none'
                }
            })
            input.addEventListener('blur', () =>{
                if(input.value.length === 0){
                    curVal.style.display = 'block'
                }else{
                    curVal.style.display = 'none'
                }
            })
            
            return el
        })
    }
}

showValid(inputsBlockNoTextarea)


function isShow(input, after){
    input.addEventListener('focus', () =>{
        after.style.display = 'block'
    });
    input.addEventListener('blur', () =>{
        if(input.value !== ""){
            after.style.display = 'block'
        }else{
            after.style.display = 'none'
        }
    })
}

function moveItems(navTopItems, mobMenuLists) {
    if(navTopItems !== null){
        navTopItems.forEach((el, ind) => {
            if (window.matchMedia("(max-width: 850px)").matches) {
                if (ind >= 0) {
                    mobMenuLists.append(el);
                }
            }
        });
    }
}

moveItems(navLink, mobMenuLists)

// Карта

ymaps.ready(init)

function init(){
    let def = [55.75399399999374,37.62209300000001];
    let placemark;
    let map;

    addressInput.addEventListener('change', (e) =>{
        getAddress();
    })

    function getAddress(){
            let cur = addressInput.value
            ymaps.geocode(cur).then((res) => {
                let obj = res.geoObjects.get(0)
                showResult(obj)
            }, function(e){
                console.log(e);
            })
    }

    function showResult(obj){
        let bounds = obj.properties.get('boundedBy');
        let myMap = window.matchMedia("(max-width: 850px)").matches ? document.querySelector('#map-body_mob') : document.querySelector('#map-body');
        let mapState = ymaps.util.bounds.getCenterAndZoom(bounds, [myMap.clientHeight, myMap.clientWidth])
        createMap(mapState)
    }

    map = new ymaps.Map('map-body', {
        center: def,
        zoom: 13,
        controls: []
    });

    if(window.matchMedia("(max-width: 850px)").matches){
        map = new ymaps.Map('map-body_mob', {
            center: def,
            zoom: 13,
            controls: []
        });
    }

    
    
    function createMap(state){
        
        map.setCenter(state.center, state.zoom);
        placemark = new ymaps.Placemark(
            map.getCenter(), {}, {
                iconLayout: 'default#image',
                iconImageHref: './img/pin.png',
                iconImageSize: [27, 39],
                iconImageOffset: [-16, -30]
            });
        map.geoObjects.add(placemark);
        //placemark.geometry.setCoordinates(state.center);
    }

    
}


function addText(){
    if(inputPromo.value === mokPromo){
        sucsessPromo.innerHTML = `${inputPromo.value}- купон применен`;
    }else{
        failPromo.innerHTML = `${inputPromo.value} - купон не найден`;
    }
}

function isShowPromoMessange(){
    btnApply.addEventListener('click', e=>{
        e.preventDefault();
        addText();
    });
    inputPromo.addEventListener('change', addText);

    isShowButton(inputPromo, btnApply);
}

function isShowButton(elem, btn, type = 'block'){
    elem.addEventListener('focus', () =>{
        btn.style.display = type;
    });
    
    elem.addEventListener('blur', () =>{
        btn.style.display = 'none';
    })
}

function sendEmail(){
    btnSaleFooter.addEventListener('click', () =>{
        if(inputEmail.value.length > 0){
            console.log('sendEmail:', inputEmail.value);
        }
    })
    
}

sendEmail();

isShowButton(addressInput, btnAddress)
isShowButton(inputEmail, btnSaleFooter, 'flex')

isShowPromoMessange();
