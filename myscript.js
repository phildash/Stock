var order = [];
function AddStock(){
    validate();
    var formData = readFormData();
    var StockData = readStockData();
    if(formData.drpAS !='--Select--' && formData.ItemsReceived !='' && formData.PricePerItem !=''){
        let myArray = [
            {ProductCode: "PRODUCT01",priceProduct:StockData.priceProduct1,totalProduct:StockData.totalProduct1},
            {ProductCode: "PRODUCT02",priceProduct:StockData.priceProduct2,totalProduct:StockData.totalProduct2},
            {ProductCode: "PRODUCT03",priceProduct:StockData.priceProduct3,totalProduct:StockData.totalProduct3}
        ],  
        objIndex = myArray.findIndex((obj => obj.ProductCode == formData.drpAS));
  
        var totalcost = (parseFloat(myArray[objIndex].priceProduct)*parseFloat(myArray[objIndex].totalProduct)) + (parseFloat(formData.PricePerItem)*parseFloat(formData.ItemsReceived))
        var totalpr= parseInt(myArray[objIndex].totalProduct) + parseInt(formData.ItemsReceived)
        myArray[objIndex].priceProduct = (totalcost/totalpr).toFixed(2);
        myArray[objIndex].totalProduct = totalpr
  
        var newmData = {};
        newmData["priceProduct1"] = myArray[0].priceProduct;
        newmData["totalProduct1"] = myArray[0].totalProduct;
        newmData["priceProduct2"] = myArray[1].priceProduct;
        newmData["totalProduct2"] = myArray[1].totalProduct;
        newmData["priceProduct3"] = myArray[2].priceProduct;
        newmData["totalProduct3"] = myArray[2].totalProduct;
        updateRecord(newmData);
        resetForm();
    }
}

function RemoveStock(){
    validateform();
    var formData = readRMData();
    objI = order.findIndex((obj => obj.email == formData.BuyerEmail));
    if(objI>=0){
        alert('your email already place order')
    }
    else{
        var StockData = readStockData();
        if(formData.drpRS !='--Select--' && formData.BuyerEmail !='' && formData.ItemsBought !=''){
            let myArray = [
                {ProductCode: "PRODUCT01",priceProduct:StockData.priceProduct1,totalProduct:StockData.totalProduct1},
                {ProductCode: "PRODUCT02",priceProduct:StockData.priceProduct2,totalProduct:StockData.totalProduct2},
                {ProductCode: "PRODUCT03",priceProduct:StockData.priceProduct3,totalProduct:StockData.totalProduct3}
            ],  
            objIndex = myArray.findIndex((obj => obj.ProductCode == formData.drpRS));
            if((myArray[objIndex].totalProduct >= formData.ItemsBought) && (myArray[objIndex].totalProduct >0)){
                var totalcost = parseFloat(myArray[objIndex].priceProduct)
                var totalpr= parseInt(myArray[objIndex].totalProduct) - parseInt(formData.ItemsBought)
                if(totalpr==0){
                    myArray[objIndex].priceProduct = '0.00'
                }
                else{
                    myArray[objIndex].priceProduct = totalcost.toFixed(2);
                }
                myArray[objIndex].totalProduct = totalpr
  
                var newmData = {};
                newmData["priceProduct1"] = myArray[0].priceProduct;
                newmData["totalProduct1"] = myArray[0].totalProduct;
                newmData["priceProduct2"] = myArray[1].priceProduct;
                newmData["totalProduct2"] = myArray[1].totalProduct;
                newmData["priceProduct3"] = myArray[2].priceProduct;
                newmData["totalProduct3"] = myArray[2].totalProduct;
                updateRecord(newmData);
                order[order.length]={"email":formData.BuyerEmail,"product":formData.ItemsBought}
                resetForm();
            }else{
                alert('Available Items : '+myArray[objIndex].totalProduct)
            }
        }
    }
}

function readFormData() {
    var formData = {};
    formData["drpAS"] = document.getElementById("drpAS").value;
    formData["ItemsReceived"] = document.getElementById("ItemsReceived").value;
    formData["PricePerItem"] = document.getElementById("PricePerItem").value;
    return formData;
}

function readRMData() {
    var formData = {};
    formData["drpRS"] = document.getElementById("drpRS").value;
    formData["BuyerEmail"] = document.getElementById("BuyerEmail").value;
    formData["ItemsBought"] = document.getElementById("ItemsBought").value;
    return formData;
}

function readStockData() {
    var StockData = {};
    StockData["priceProduct1"] = document.getElementById("priceProduct1").innerText;
    StockData["totalProduct1"] = document.getElementById("totalProduct1").innerText;
    StockData["priceProduct2"] = document.getElementById("priceProduct2").innerText;
    StockData["totalProduct2"] = document.getElementById("totalProduct2").innerText;
    StockData["priceProduct3"] = document.getElementById("priceProduct3").innerText;
    StockData["totalProduct3"] = document.getElementById("totalProduct3").innerText;
    return StockData;
}

function resetForm() {
    if(document.getElementById("drpAS").value != "--Select--"){
        document.getElementById("drpAS").value = "--Select--";
        document.getElementById("ItemsReceived").value = "";
        document.getElementById("PricePerItem").value = "";
    }
    if(document.getElementById("drpRS").value != "--Select--"){
        document.getElementById("drpRS").value = "--Select--";
        document.getElementById("BuyerEmail").value = "";
        document.getElementById("ItemsBought").value = "";
    }
}

function updateRecord(newmData) {
    document.getElementById("priceProduct1").innerText = newmData.priceProduct1;
    document.getElementById("totalProduct1").innerText = newmData.totalProduct1;
    document.getElementById("priceProduct2").innerText = newmData.priceProduct2;
    document.getElementById("totalProduct2").innerText = newmData.totalProduct2;
    document.getElementById("priceProduct3").innerText = newmData.priceProduct3;
    document.getElementById("totalProduct3").innerText = newmData.totalProduct3;
}

function validate() {
    if (document.getElementById("drpAS").value == "--Select--") {
        document.getElementById("drpAS").style.border = "1px solid red";
        document.getElementById("drpAS").focus();
        return false;
    }
    if (document.getElementById("ItemsReceived").value == "") {
        document.getElementById("ItemsReceived").style.border = "1px solid red";
        document.getElementById("ItemsReceived").focus();
        return false;
    }
    if (document.getElementById("PricePerItem").value == "") {
        document.getElementById("PricePerItem").style.border = "1px solid red";
        document.getElementById("PricePerItem").focus();
        return false;
    }
    else{
        document.getElementById("drpAS").style.border = "1px solid #ccc";
        document.getElementById("ItemsReceived").style.border = "1px solid #ccc";
        document.getElementById("PricePerItem").style.border = "1px solid #ccc";
    }
}

function validateform(){
    if (document.getElementById("drpRS").value == "--Select--") {
        document.getElementById("drpRS").style.border = "1px solid red";
        document.getElementById("drpRS").focus();
        return false;
    }
    if (document.getElementById("BuyerEmail").value == "") {
        document.getElementById("BuyerEmail").style.border = "1px solid red";
        document.getElementById("BuyerEmail").focus();
        return false;
    }
    if (document.getElementById("ItemsBought").value == "") {
        document.getElementById("ItemsBought").style.border = "1px solid red";
        document.getElementById("ItemsBought").focus();
        return false;
    }
    else{
        document.getElementById("drpRS").style.border = "1px solid #ccc";
        document.getElementById("BuyerEmail").style.border = "1px solid #ccc";
        document.getElementById("ItemsBought").style.border = "1px solid #ccc";
    }
}