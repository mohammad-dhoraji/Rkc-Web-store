const addone = document.querySelector("#add_one");
const removeOne = document.querySelector("#remove_one");
const quantityInput = document.querySelector("#quantity_input");

addone.addEventListener('click', ()=>{
    quantityInput.value = Number(quantityInput.value) + 1;
});

removeOne.addEventListener('click', ()=>{
    if (quantityInput.value >1 ){
        quantityInput.value = Number(quantityInput.value) - 1;
    }
    
});