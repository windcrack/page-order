const inputsBlock = document.querySelectorAll('.js-input-block');
const addressInput = document.querySelector('.form-block__address');

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



ymaps.ready(init)

function init(){
    let suggestView = new ymaps.SuggestView('address');
    let placemark;
    let map;

    addressInput.addEventListener('click', (e) =>{
        if(e.keyPress === '13'){
            getAddress();
        }
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
        let mapState = ymaps.util.bounds.getCenterAndZoom(bounds, [myMap.width(), myMap.height()])
        createMap(mapState)
    }

    
    function createMap(state){
        map = new ymaps.Map('map-body', state);
    }

    
}




