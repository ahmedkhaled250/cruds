var NameInput = document.getElementById("productName");
var priceInput = document.getElementById("productPrice");
var taxsInput = document.getElementById("productTaxs");
var adsInput = document.getElementById("productAds");
var discoundInput = document.getElementById("productDiscound");
var total = document.getElementById("total");
var counter = document.getElementById("productCount")
var CategoryInput = document.getElementById("productCategory");
var DescInput = document.getElementById("productDesc");
var submit = document.getElementById('submit');
var mood = 'creat';
var tmp;

var productContainer;
if (localStorage.getItem("product") != null) {
    productContainer = JSON.parse(localStorage.getItem("product", productContainer));
    displayProduct()
}
else {
    productContainer = [];
}

function getTotal() {
    if (priceInput.value != '') {
        let result = (+priceInput.value + +taxsInput.value + +adsInput.value) - +discoundInput.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    }
    else {
        priceInput.value = '';
        total.innerHTML = '';
        total.style.background = '#dc3545';
    }
}

function creatProduct() {

if(validateProductName()==true)
{
    let products = {
        name: NameInput.value,
        price: priceInput.value,
        taxs: taxsInput.value,
        ads: adsInput.value,
        discound: discoundInput.value,
        total: total.innerHTML,
        counter: counter.value,
        category: CategoryInput.value,
        desc: DescInput.value,
    }
    if(products.name != ''&&
    products.price !=''&&
    products.category!=''&&
    products.counter <101){
    if (mood === 'creat') {
        if (products.counter > 1) {
            for (let i = 0; i < counter.value; i++) {
                productContainer.push(products);
            }
        }
        else {
            productContainer.push(products);
        }
    } else {
        productContainer[tmp] = products;
        mood = 'creat';
        submit.innerHTML = 'Create';
        counter.style.display = 'block';
    }
    clearForm();
}
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayProduct();
    getTotal();
}
else
{
    alert('Product name input invalid');
}
}
function displayProduct() {
    let cartona = ``;
    for (i = 0; i < productContainer.length; i++) {
        cartona += `                        <tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].taxs}</td>
        <td>${productContainer[i].ads}</td>
        <td>${productContainer[i].discound}</td>
        <td>${productContainer[i].total}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button class="btn btn-outline-warning " onclick="updateProduct(${i})">update</button></td>
        <td><button class="btn btn-outline-info" onclick="deleteProduct(${i})">delete</button></td>
    </tr>`;
    };
    document.getElementById("tableRow").innerHTML = cartona;
    let deleteAllProduct = document.getElementById("deleteAll");
    if (productContainer.length > 0) {
        deleteAllProduct.innerHTML = `<button onclick="deleteAllProducts()" class="btn btn-outline-info w-100 rounded-pill">delete all (${productContainer.length})</button>`;
    }
    else {
        deleteAllProduct.innerHTML = ``;
    }
    getTotal();
}
function clearForm() {
    NameInput.value = "";
    priceInput.value = "";
    taxsInput.value = "";
    adsInput.value = "";
    discoundInput.value = "";
    total.innerHTML = "";
    counter.value = "";
    CategoryInput.value = "";
    DescInput.value = "";
}
function deleteProduct(index) {
    productContainer.splice(index, 1)
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayProduct()
}
function deleteAllProducts() {
    localStorage.clear();
    productContainer.splice(0);
    displayProduct();
}
function updateProduct(i) {
    NameInput.value = productContainer[i].name;
    priceInput.value = productContainer[i].price;
    taxsInput.value = productContainer[i].taxs;
    adsInput.value = productContainer[i].ads;
    discoundInput.value = productContainer[i].discound;
    CategoryInput.value = productContainer[i].category;
    DescInput.value = productContainer[i].desc;
    getTotal();
    submit.innerHTML = 'Update';
    counter.style.display = 'none';
    mood = 'update';
    tmp = i;
    scroll(
        {
            top: 0,
            behavior: "smooth"
        }
    )
}
var searshMood = 'name';
function getSearshMood(id) {
    let searsh = document.getElementById('searsh');
    switch (id) {
        case 'searshName':
            searshMood = 'name';
            break;
        default:
            searshMood = 'category';
            break;
    }
    searsh.placeholder = 'Searsh by ' + searshMood+' ...';
    searsh.focus();
}
function searshProduct(value) {
    let cartona = '';
    for (let i = 0; productContainer.length; i++) {
        switch (searshMood) {
            case 'name':
                if (productContainer[i].name.toLowerCase().includes(value.toLowerCase())) {
                    cartona += `                        <tr>
                    <td>${i}</td>
                    <td>${productContainer[i].name}</td>
                    <td>${productContainer[i].price}</td>
                    <td>${productContainer[i].taxs}</td>
                    <td>${productContainer[i].ads}</td>
                    <td>${productContainer[i].discound}</td>
                    <td>${productContainer[i].total}</td>
                    <td>${productContainer[i].category}</td>
                    <td>${productContainer[i].desc}</td>
                    <td><button class="btn btn-outline-warning " onclick="updateProduct(${i})">update</button></td>
                    <td><button class="btn btn-outline-info" onclick="deleteProduct(${i})">delete</button></td>
                </tr>`;
                };
                break;
            default:
                if (productContainer[i].category.toLowerCase().includes(value.toLowerCase())) {
                    cartona += `                        <tr>
                        <td>${i}</td>
                        <td>${productContainer[i].name}</td>
                        <td>${productContainer[i].price}</td>
                        <td>${productContainer[i].taxs}</td>
                        <td>${productContainer[i].ads}</td>
                        <td>${productContainer[i].discound}</td>
                        <td>${productContainer[i].total}</td>
                        <td>${productContainer[i].category}</td>
                        <td>${productContainer[i].desc}</td>
                        <td><button class="btn btn-outline-warning " onclick="updateProduct(${i})">update</button></td>
                        <td><button class="btn btn-outline-info" onclick="deleteProduct(${i})">delete</button></td>
                    </tr>`;
                };
                break;
        }
        document.getElementById("tableRow").innerHTML = cartona;
    }
}
function validateProductName()
{
    let regex = /^[A-Z][a-z]{3,10}$/;
    if(regex.test(NameInput.value))
    {
        return true;
    }
    else
    {
        return false;
    }
}