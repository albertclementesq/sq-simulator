var sequraConfigParams = {
    merchant: "ac_test", // Your merchant reference given by SeQura.
    assetKey: "05XA7Pqa0b", // Your asset key given by SeQura.
    products: ["pp3"], // List of SeQura products that you want to include components.
    scriptUri: "https://sandbox.sequracdn.com/assets/sequra-checkout.min.js", // SeQura Javascript library uri for production or sandbox.
    decimalSeparator: ",", // Decimal separator used in currencies formatting. Optional, default `,`.
    thousandSeparator: ".", // Thousand separator used in currencies formatting. Optional, default `.`.
    locale: "es-ES", // Language and country codes separated by hyphen -. Optional, default `es-ES`.
    currency: "EUR", // Currency code available for chosen locale. Optional, default `EUR`.
};

(function(i, s, o, g, r, a, m) {i["SequraConfiguration"] = g;i["SequraOnLoad"] = [];i[r] = {};i[r][a] = function(callback) {i["SequraOnLoad"].push(callback);};(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);a.async = 1;a.src = g.scriptUri;m.parentNode.insertBefore(a, m);})(window, document, "script", sequraConfigParams, "Sequra", "onLoad");

var totalAmountInputCtrl = document.getElementById('totalAmountInput');
var totalAmountRangeCtrl = document.getElementById('totalAmountRange');
var totalInstalmentsInputCtrl = document.getElementById('totalInstalmentsAmount');
var totalInstalmentsRangeCtrl = document.getElementById('totalInstalmentsRange');

totalAmountInputCtrl.addEventListener('keyup', function(){
    totalAmountRangeCtrl.value = totalAmountInputCtrl.value;
});

totalAmountRangeCtrl.addEventListener('mousemove', function(){
    totalAmountInputCtrl.value = totalAmountRangeCtrl.value;
});


var availableInstalments = [3,6,12,18,24];


totalInstalmentsRangeCtrl.setAttribute("min", availableInstalments[0]);
totalInstalmentsRangeCtrl.setAttribute("max", availableInstalments[availableInstalments.length - 1]);
totalInstalmentsRangeCtrl.setAttribute("step", availableInstalments.length);

function a(){
    totalInstalmentsRange.removeAttribute('step');
    var value = totalInstalmentsRangeCtrl.value;

    for (var index = 0; index < availableInstalments.length; index++) {
        if(availableInstalments[index] >= value){
            totalInstalmentsRangeCtrl.value = availableInstalments[index];
            break;
        }
    }
}


totalInstalmentsInputCtrl.addEventListener('keyup', function(){
    totalInstalmentsRangeCtrl.value = totalInstalmentsInputCtrl.value;
});

totalInstalmentsRangeCtrl.addEventListener('mousemove', function(){
    totalInstalmentsInputCtrl.value = totalInstalmentsRangeCtrl.value;
});

Sequra.onLoad(function() {
    var amount = parseInt(totalAmountInputCtrl.value) * 100;
    var ca = Sequra.computeCreditAgreements({
        amount: amount.toString(),
        product: "pp3",
        instalmentCount: totalInstalmentsInputCtrl
    });

    console.log(ca);

    var instalmentAmount = (ca.pp3[0].instalment_amount.value / 100).toFixed(2);
    var instalmentCount = (ca.pp3[0].instalment_count);
    var instalmentFee = (ca.pp3[0].instalment_fee.value / 100).toFixed(2);
    var grandTotal = (ca.pp3[0].grand_total.value / 100).toFixed(2);

    
    document.getElementById('instalmentAmountMonth').innerText = instalmentAmount;
    document.getElementById('instalmentCount').innerText = instalmentCount;
    document.getElementById('instalmentFee').innerText = instalmentFee;
    document.getElementById('grandTotal').innerText = grandTotal;
});