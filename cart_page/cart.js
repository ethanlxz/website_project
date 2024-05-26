var discountCode = document.getElementById('discount_code');

const discount_code = () => {
	// let totalamtcurr = parseInt(total_cart_amt.innerHTML);
	// let error_trw = document.getElementById('error_trw');
	if (discountCode.value === 'ETHAN') {

		calculateTotal('ETHAN');
		alert('Code applied! You got 100% discount');

	} else if (discountCode.value === 'FREESHIP') {
		calculateTotal('FREESHIP');
		alert('Code applied! You got free shipping !');
	}
	else {
		alert('Invalid code');
	}
}


function upadateCaseNumber(product, price, isIncreasing){
    const caseInput = document.getElementById(product + '-number');
    let caseNumber = caseInput.value;
            if(isIncreasing){
                caseNumber = parseInt(caseNumber) + 1;
            }
            
    else if(caseNumber > 0){
           caseNumber = parseInt(caseNumber) - 1;
         }
        
        caseInput.value = caseNumber;
    // update case total 
    const caseTotal = document.getElementById(product + '-total');
    caseTotal.innerText = caseNumber * price;
    calculateTotal();
    }


    function getInputvalue(product){
        const productInput = document.getElementById(product + '-number');
        const productNumber = parseInt(productInput.value);
        return productNumber;
    }
    function calculateTotal(code){
        const phoneTotal = getInputvalue('phone') * 329;
        const caseTotal = getInputvalue('case') * 419;
        const subTotal = phoneTotal + caseTotal;
        const tax = subTotal * 0.06;
        let totalPrice = subTotal + tax + 30;

		if (code === 'ETHAN') {
			totalPrice = 0;
		}

		if (code === 'FREESHIP') {
			totalPrice  = subTotal + tax;
		}


        // update on the html 
        document.getElementById('sub-total').innerText = subTotal;
        document.getElementById('tax-amount').innerText = tax.toFixed(2);
        document.getElementById('total-price').innerText = totalPrice.toFixed(2);

    }





document.getElementById('case-plus').addEventListener('click',function(){
        // const caseInput = document.getElementById('case-number');
        // const caseNumber = caseInput.value;
        // caseInput.value = parseInt(caseNumber) + 1;
   upadateCaseNumber('case', 419 ,true);
});

document.getElementById('case-minus').addEventListener('click',function(){
    // const caseInput = document.getElementById('case-number');
//     const caseNumber = caseInput.value;
//    if(caseInput.value > 1){
//         caseInput.value = parseInt(caseNumber) - 1;
//    }
upadateCaseNumber('case', 419, false);
});

// phone prcie update using add event linstner 
document.getElementById('phone-plus').addEventListener('click',function(){
    upadateCaseNumber('phone',329, true);
});


document.getElementById('phone-minus').addEventListener('click',function(){
    upadateCaseNumber('phone',329 , false);
});