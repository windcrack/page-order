const inputsBlock = document.querySelectorAll('.js-input-block');
const inputsBlockNoTextarea = document.querySelectorAll('.js-input-block:not(.js-no-req)');
const navLink = document.querySelectorAll('.header-nav__link');
const inputs = document.querySelectorAll('.js-input');

const addressInput = document.querySelector('.form-block__address');
const mobMenuLists = document.querySelector('.header-nav__mob');
const btnMob = document.querySelector('.btn__burger');
const headerMob = document.querySelector('.header-nav__mob');
const curSymb = document.querySelector('.comment__count-start');
const commnetSymb = document.querySelector('.comment__text');

const buttonSize = document.querySelectorAll('.btn__size');
const inputColor = document.querySelectorAll('.descr-color__input');

const allData = []

function getAllDate (){
    buttonSize.forEach(elem =>{
        if(elem.classList.contains('active')){
            let obj = {
                'size' : elem.value
            }
    
            allData.push(obj)
        }
    })
    
    inputColor.forEach(elem =>{
        if(elem.checked){
            let obj = {
                'color': elem.value
            }
            allData.push(obj)
        }
    })

    inputs.forEach(elem => {
        if(elem.value.length > 0){
            let obj = {
                [elem.placeholder]: elem.value
            }
            allData.push(obj)
        }
    })
}
getAllDate();
console.log(inputs);


function calcSymbol(){
    commnetSymb.addEventListener('keyup', () =>{
        curSymb.innerHTML = commnetSymb.value.length;
    })
    
}

calcSymbol();

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




