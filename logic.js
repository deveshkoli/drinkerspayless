
function calcbill(){
    var totalbill = $('#totalbill').val();
    var drinkers = $('#drinkers').val();
    var drinksbill = $('#drinksbill').val();
    var nondrinkers = $('#nondrinkers').val();
    var totalbill = $('#totalbill').val();
    var servicecharge = $('#servicecharge').val();
    var cgst = $('#cgst').val();
    var sgst = $('#sgst').val();
    var vat = $('#VAT').val();

    console.log("Total Bill:", totalbill);
    console.log("Drinkers:", drinkers);
    console.log("Drinks Bill:", drinksbill);
    console.log("Non-Drinkers:", nondrinkers);
    console.log("Service Charge:", servicecharge);
    console.log("CGST:", cgst);
    console.log("SGST:", sgst);
    console.log("VAT:", vat);
}