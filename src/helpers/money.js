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

export {showMoney}