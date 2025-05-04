$(document).ready(function () {
    $('#billForm').on('submit keypress', function (e) {
        if (e.type === 'submit' || (e.type === 'keypress' && e.which === 13)) {
            e.preventDefault();
            calcbill();
        }
    });
});

function calcbill() {
    // Inputs
    var totalPaid = parseFloat($('#totalbill').val());
    var drinkers = parseInt($('#drinkers').val(), 10);
    var drinksbill = parseFloat($('#drinksbill').val());
    var nondrinkers = parseInt($('#nondrinkers').val(), 10);
    var mocktailsbill = parseFloat($('#mocktailsbill').val());
    var mocktailers = parseInt($('#mocktailers').val(), 10);
    var serviceRate = parseFloat($('#servicecharge').val()) / 100;
    var cgstRate = parseFloat($('#cgst').val()) / 100;
    var sgstRate = parseFloat($('#sgst').val()) / 100;
    var vatRate = parseFloat($('#VAT').val()) / 100;

    // Tax multipliers
    var drinksMul = parseFloat((1 + vatRate + serviceRate).toFixed(2));
    var foodMul = parseFloat((1 + cgstRate + sgstRate + serviceRate).toFixed(2));

    // Calculate totals
    var drinksTotal = drinksbill * drinksMul;
    var mocktailsTotal = mocktailsbill * foodMul;

    // Recalculate food base more accurately
    var foodTotal = totalPaid - drinksTotal - mocktailsTotal;

    // Individual shares
    var perNonDrinker = 0;

    if (nondrinkers > 0) {
        // Non-drinkers share food cost
        perNonDrinker = foodTotal / (drinkers + nondrinkers);
    }

    var perDrinker = drinksTotal / drinkers; // Start with the drinker's share of drinks
    if (nondrinkers > 0) {
        perDrinker += foodTotal / (drinkers + nondrinkers); // Add shared food cost
    } else {
        perDrinker += foodTotal / drinkers; // Divide food cost only among drinkers
    }

    var perMocktailer = 0;
    if (mocktailers > 0) {
        perMocktailer = (mocktailsTotal / mocktailers) + (nondrinkers > 0 ? perNonDrinker : foodTotal / drinkers);
    }

    // Results
    var html = '<p><strong>Total Paid:</strong> ₹' + totalPaid.toFixed(2) + '</p>';
    html += '<p><strong>Drinks Total (incl. VAT & Service):</strong> ₹' + drinksTotal.toFixed(2) + '</p>';
    html += '<p><strong>Mocktails Total (incl. GST & Service):</strong> ₹' + mocktailsTotal.toFixed(2) + '</p>';
    html += '<p><strong>Food Total (incl. GST & Service):</strong> ₹' + foodTotal.toFixed(2) + '</p>';
    html += '<hr>';
    if (nondrinkers > 0) {
        html += '<p><strong>Each Non-Drinker Pays (For Food Only):</strong> ₹' + perNonDrinker.toFixed(2) + '</p>';
    }
    html += '<p><strong>Each Drinker Pays with Food:</strong> ₹' + perDrinker.toFixed(2) + '</p>';
    if (mocktailers > 0) {
        html += '<p><strong>Each Mocktail Consumer Pays with Food:</strong> ₹' + perMocktailer.toFixed(2) + '</p>';
    }

    $('#results').html(html);
}