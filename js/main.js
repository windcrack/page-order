const inputsBlock = document.querySelectorAll('.js-input-block');
const addressInput = document.querySelector('.form-block__address');
const navLink = document.querySelectorAll('.header-nav__link');
const mobMenuLists = document.querySelector('.header-nav__mob')

let address = [];
let def = [55.75399399999374,37.62209300000001];
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
    //let suggestView = new ymaps.SuggestView('address');
    let placemark;
    let map;

    addressInput.addEventListener('change', (e) =>{
        getAddress();
    })

    function getAddress(){
            let cur = addressInput.value
            ymaps.geocode(cur).then((res) => {
                let obj = res.geoObjects.get(0)
                
                //address = obj.geometry._coordinates;
                // console.log(obj.properties.get('boundedBy'));
                showResult(obj)
            }, function(e){
                console.log(e);
            })
    }

    function showResult(obj){
        let bounds = obj.properties.get('boundedBy');
        let myMap = document.querySelector('#map-body');
        let mapState = ymaps.util.bounds.getCenterAndZoom(bounds, [myMap.clientHeight, myMap.clientWidth])
        createMap(mapState)
    }

    map = new ymaps.Map('map-body', {
        center: def,
        zoom: 13,
        controls: []
    });
    
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



