let imageUrl;

document.querySelector("#productform").addEventListener("submit",
function (e) {
    
    const productname =document.querySelector ("#productname").value;
    const productmodel =document.querySelector ("#productmodel").value;
    const productprice =document.querySelector ("#productprice").value;  

    const product = new Products(productname, productmodel, productprice);
    const ui = new UI ();

    if(productname == "" || productprice == "" || productmodel == "" ){
        ui.alerts("Boş alan bırakmayınız !", "error")
    }else{
        ui.productadd(product);

        ui.alerts("Ürün Ekleme Başarılı!", "confirmation")
    ui.formclean();

    }

    e.preventDefault();
})

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){

    var dataURL = reader.result;
    console.log('dataURL', dataURL)

    imageUrl = dataURL;

};
    reader.readAsDataURL(input.files[0]);
};



function Products(productname, productmodel, productprice){
    this.productname = productname;
    this.productmodel = productmodel;
    this.productprice = productprice;

}



function UI() {}

UI.prototype.productadd = function (product){
   
    const list = document.querySelector(".productlists");


    const ull= document.createElement("ul");
    ull.innerHTML =`<li><img id='output' src=${imageUrl} /></li><li>${product.productname}</li> <li>${product.productmodel}</li><li>${product.productprice}</li><i class="fas fa-trash-alt" id="icons"></i></li>`;
list.appendChild(ull);
}

UI.prototype.formclean = function(){
    document.querySelector("#productname").value= "";
    document.querySelector("#productmodel").value= "";
    document.querySelector("#productprice").value= "";
   
}


UI.prototype.alerts = function(message, classnames ){

    const div = document.createElement("div");
    div.className= `warn ${classnames}`
    const text = document.createTextNode(message)
    div.appendChild(text);
    const form = document.querySelector("#productform");
   document.body.insertBefore(div, form);



setTimeout(()=> {
    document.querySelector(".warn").remove();
}, 3000);

}

UI.prototype.productlistsdelete = function(targets){

   if(targets.className == "fas fa-trash-alt"){
    result = confirm("Ürünü silmeyi onaylıyor musunuz?");
   

       targets.parentElement.remove();
   }
}


document.querySelector(".productlists").addEventListener("click", function(e){

   

  const ui = new UI();

  ui.productlistsdelete(e.target);
  
    e.preventDefault();
});



