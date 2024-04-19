let KATEGORIJE,POPULARNOST,PROIZVODI
window.onload = () => {
    asynFunctionCalls()
    // console.log(KATEGORIJE)
    $(document).on('click', '.kategorije, .popularnost',() => {
        console.log(KATEGORIJE)
    })

}

$(document).ready(function(){
    $('.btnShop').hover(
        function(){
            $(this).addClass('ub-bg3','ub-c3')
            $(this).addClass('ub-c3')
        },
        function(){
            $(this).removeClass('ub-bg3')
            $(this).removeClass('ub-c3')
        }
    )
})

function ajaxCall(method,url,callback){
    $.ajax({
        method: method,
        url: url,
        dataType: 'json',
        success(data){
            callback(data)
            // console.log(data)
        },
        error(xhr){
            console.log(xhr)
        }
    })
}





ajaxCall("get","assets/js/kategorije.json",setCategory)
function setCategory(data){
    
    let div = $('.options')
    
    let ispis = `<h3>Brands</h3>`

    for(let i = 0; i < data.length; i++){
        ispis += `
        <div class="col-12 fs-5">
            <input type="checkbox" class="kategorije" name="chb${data[i].name}" id="${data[i].name.toLowerCase()}" value="${data[i].id}"/>
            <label for="${data[i].name.toLowerCase()}">${data[i].name}</label>
        </div>
        `
    }

    div.html(ispis)
}

ajaxCall("get","assets/js/popularnost.json",setPopularity)
function setPopularity(data){

    let ispis = ""

    for(let i = 0; i < data.length; i++){
        if(data[i].popularity === true ){
            ispis += `
            <div class="col-12 fs-5 mt-3">
                <h3>Popularity</h3>
                <input type="checkbox" class="popularnost" name="chbPopular" id="chbPopular" value="${data[i].popularity}"/>
                <label for="chbPopular">popular</label>
            </div>
            `
        }
        
    }

    document.querySelector(".options").innerHTML += ispis
}







// ajaxCall("get","assets/js/proizvodi.json",getProducts)
// function getProducts(data){
//     postavi(data)
// }



ajaxCall("get","assets/js/proizvodi.json",setProducts)
function setProducts(data){

    let div = $(".products")
    let ispis = ""
    // width="300px" height="300px"
    for(let i = 0; i < data.length;i++ ){
        ispis += `
        <div class="col-3 pb-2">
            <img src="${data[i].src}" alt="" class="imgProducts" width="330px" height="350px" />
            <p class="py-2">${data[i].name}</p>
            <p>${data[i].price.oldPrice}</p>
            <p>${data[i].popularityID == 1 ? "popular":""}</p>
        </div>
        `
    }

    div.html(ispis)
}


async function asynFunctionCalls(){

    let kategorijeFtc = await fetch('assets/js/kategorije.json')
    let kategorije = await kategorijeFtc.json();

    let popularnostFtc = await fetch('assets/js/popularnost.json')
    let popularnost = await popularnostFtc.json();

    let proizvodiFtc = await fetch('assets/js/kategorije.json')
    let proizvodi = await proizvodiFtc.json();

    // displayCategoriesAndPublisher('Kategorije', kategorije, '#categories')
    // displayCategoriesAndPublisher('Izdavaci', popularnost, '#publishers')

    // displayBooks(books, categories, publishers)

    KATEGORIJE = kategorije;
    POPULARNOST = popularnost;
    PROIZVODI = proizvodi;
}






