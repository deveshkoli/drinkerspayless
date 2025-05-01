$(document).ready(function() {
    $('#billForm').on('submit keypress', function(e) {
      if (e.type === 'submit' || (e.type === 'keypress' && e.which === 13)) {
        e.preventDefault();
        calcbill();
      }
    });
  });
  
  function calcbill() {
    // Inputs
    var totalPaid     = parseFloat($('#totalbill').val());
    var drinkers      = parseInt($('#drinkers').val(), 10);
    var drinksbill    = parseFloat($('#drinksbill').val());
    var nondrinkers   = parseInt($('#nondrinkers').val(), 10);
    var mocktailsbill = parseFloat($('#mocktailsbill').val());
    var mocktailers   = parseInt($('#mocktailers').val(), 10);
    var serviceRate   = parseFloat($('#servicecharge').val()) / 100;
    var cgstRate      = parseFloat($('#cgst').val()) / 100;
    var sgstRate      = parseFloat($('#sgst').val()) / 100;
    var vatRate       = parseFloat($('#VAT').val()) / 100;
  
    // Tax multipliers
    var drinksMul  = parseFloat((1 + vatRate + serviceRate).toFixed(2));
    var foodMul    = parseFloat((1 + cgstRate + sgstRate + serviceRate).toFixed(2));
    var serviceMul = parseFloat((1 + serviceRate).toFixed(2));

    // Calculate totals
    var drinksTotal    = drinksbill * drinksMul;
    var mocktailsTotal = mocktailsbill * foodMul;
     // Recalculate food base more accurately
    var foodTotal       = totalPaid - drinksTotal - mocktailsTotal;

    // Individual shares
    var perNonDrinker = foodTotal / (drinkers + nondrinkers);
    var perDrinker    = perNonDrinker + (drinkers > 0 ? drinksTotal / drinkers : 0);
    var perMocktailer = perNonDrinker + (mocktailers > 0 ? mocktailsTotal / mocktailers : 0);
  
    // Results
    var html = '<p><strong>Total Paid:</strong> ₹' + totalPaid.toFixed(2) + '</p>';
    html += '<p><strong>Drinks Total (incl. VAT & Service):</strong> ₹' + drinksTotal.toFixed(2) + '</p>';
    html += '<p><strong>Mocktails Total (incl. GST & Service):</strong> ₹' + mocktailsTotal.toFixed(2) + '</p>';
    html += '<p><strong>Food Total (incl. GST & Service):</strong> ₹' + foodTotal.toFixed(2) + '</p>';
    html += '<hr>';
    html += '<p><strong>Each Non-Drinker Pays(For Food Only):</strong> ₹' + perNonDrinker.toFixed(2) + '</p>';
    html += '<p><strong>Each Drinker Pays with Food:</strong> ₹' + perDrinker.toFixed(2) + '</p>';
    html += '<p><strong>Each Mocktail Consumer Pays with Food:</strong> ₹' + perMocktailer.toFixed(2) + '</p>';
  
    $('#results').html(html);
  }
  