let KATEGORIJE,POPULARNOST,PROIZVODI


window.onload = () => {
    asynFunctionCalls()
    
    $(document).on('click', '.kategorije, .popularnost, .sort',() => {
        setProducts(PROIZVODI,KATEGORIJE,POPULARNOST)
        
        sortiranje(PROIZVODI)
        
    })
    $(document).on('click','.addToCart', () => {
        
    })
}


async function asynFunctionCalls(){

    let kFtc = await fetch('assets/js/kategorije.json')
    let kategorije = await kFtc.json();

    let pFtc = await fetch('assets/js/popularnost.json')
    let popularnost = await pFtc.json();

    let prFtc = await fetch('assets/js/proizvodi.json')
    let proizvodi = await prFtc.json();

    
    setSortButton()
    setCategory(kategorije)
    setPopularity(popularnost)
    
    setProducts(proizvodi,kategorije,popularnost)

    // console.log($(".addToCart"))
    dodajULocalStorage(proizvodi)
    
    KATEGORIJE = kategorije;
    POPULARNOST = popularnost;
    PROIZVODI = proizvodi;
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





// ajaxCall("get","assets/js/kategorije.json",setCategory)
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

    document.querySelector(".options").innerHTML += ispis
}

// ajaxCall("get","assets/js/popularnost.json",setPopularity)
function setPopularity(data){

    let ispis = ""

    for(let i = 0; i < data.length; i++){
        if(data[i].popularity === true ){
            ispis += `
            <div class="col-12 fs-5 mt-3">
                <h3>Popularity</h3>
                <input type="checkbox" class="popularnost" name="chbPopular" id="chbPopular" value="${data[i].id}"/>
                <label for="chbPopular">popular</label>
            </div>
            `
        }
        
    }

    document.querySelector(".options").innerHTML += ispis
}

function setSortButton(){
    let ispis = `<div class="col-12 fs-5 mt-3">
                 <h3>Sort</h3>`
    let values = ["desc","asc"]
    let valuesNames = ["descending","ascending"]

    for(let i = 0; i < values.length; i++){
            ispis += `
            <div class="col-12">
                <input type="radio" class="sort" name="radioSort" id="radioSort${values[i]}" value="${values[i]}"/>
                <label for="radioSort">${valuesNames[i]}</label>
            </div>
        `
    }
    
    ispis += `</div>`

    document.querySelector(".options").innerHTML += ispis    
}

    


function sortiranje(data){
    const elm = document.getElementsByName("radioSort")
    let sortTip 
    
    
    for(let i = 0; i < elm.length; i++){
        if(elm[i].checked){
            sortTip = elm[i].value
        }
    }
    
    if(sortTip == 'asc'){
        return data.sort((a,b) => a.price.newPrice > b.price.newPrice ? 1 : -1)
    }
    if(sortTip == 'desc'){
        return data.sort((a,b) => a.price.newPrice < b.price.newPrice ? 1 : -1)
    }
    return data
    
    
}





function priceResult(oldPrice,newPrice){
    
    if(oldPrice === false){
        // console.log("usao")
        return `<h3>${newPrice}$</h3>
                <h3 class="invisible"></h3>`
        
    }else {
        return `<h5><s>${oldPrice}$</s></h5>
                <h3>${newPrice}$</h3>
                `
    }
    
}




function filterProizvodi(proizvodi,div,ID){
    
    let divFiltera = $(div)

    let nizCekiranih = []
    
    for(let item of divFiltera){
        if(item.checked){
            nizCekiranih.push($(item).val())
        }
    }

    if(nizCekiranih != 0){
        return proizvodi.filter(proizvod => nizCekiranih.includes(String(proizvod[ID])))
    }else {
        return proizvodi
    }   
    
}


// ajaxCall("get","assets/js/proizvodi.json",setProducts)
function setProducts(proizvodi,kategorije,popularnost){

    proizvodi = filterProizvodi(proizvodi,".kategorije","categoryID")
    proizvodi = filterProizvodi(proizvodi, ".popularnost","popularityID")
    proizvodi = sortiranje(proizvodi)
    // console.log(proizvodi)
    

    let div = $(".products")
    let ispis = ""
    // width="300px" height="300px"
    for(let i = 0; i < proizvodi.length;i++ ){
        ispis += `
                <div class="kartica  mb-5 d-flex flex-column justify-content-around">                        
                    <h4>${proizvodi[i].name}</h4>
                    <img src="${proizvodi[i].src}" alt="" class="mb-3"/>
                    ${priceResult(proizvodi[i].price.oldPrice,proizvodi[i].price.newPrice)}
                    <button class="addToCart" value="${proizvodi[i].id}">add to cart</button>
                </div>      
            `
    }

    div.html(ispis)
}





function dodajULocalStorage(data){

    let buttons = $(".addToCart")

    buttons.click(dodajUKorpu)
}

function dodajUKorpu(){
    let idProizvod = $(this).val()
    console.log(idProizvod)
    
}










