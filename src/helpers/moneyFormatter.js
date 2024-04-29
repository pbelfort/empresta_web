function showMoney(value){
    const formate = new Intl.NumberFormat("pt-BR",
    {
        style:"currency",
        currency:"BRL",
        currencyDisplay:"symbol"
    }
).format(value).replace("R$","").trim();
return formate;
}

function onlyNumber ($event) {
    let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
    if ((keyCode < 48 || keyCode > 57)) {
       $event.preventDefault();
    }
 }

export {showMoney, onlyNumber}