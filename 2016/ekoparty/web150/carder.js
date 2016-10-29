// takes the form field value and returns true on valid number
function valid_credit_card(value) {
// accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

// The Luhn Algorithm. It's so pretty.
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}


$.ajax({
	url: 'api.php',
        type: 'POST',
	contentType: 'application/json',
	dataType: 'json',
	data: JSON.stringify({ 'action': 'start' }),
	success: function (data) {
		console.log(data);

		var new_data = {};

		for(i = 0; i < 10; i++) {
			if(valid_credit_card(data.pamex+"000000"+i+data.samex)) {
				new_data.namex = "000000"+i;
			}
		}
		for(i = 0; i < 10; i++) {
			if(valid_credit_card(data.pmcard+"0000000"+i+data.smcard)) {
				new_data.nmcard = "0000000"+i;
			}
		}

		for(i = 0; i < 10; i++) {
			if(valid_credit_card(data.pvisa+"0000"+i+data.svisa)) {
				new_data.nvisa = "0000"+i;
			}
		}

		new_data.action = "validate";

		console.log(new_data);

		console.log(valid_credit_card(data.pamex+new_data.namex+data.samex));
		console.log(valid_credit_card(data.pvisa+new_data.nvisa+data.svisa));
		console.log(valid_credit_card(data.pmcard+new_data.nmcard+data.smcard));

		$.ajax({
                url: 'api.php', 
                type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(new_data),
                success: function(data) {
			console.log(data);
                },
                error: function(xhr, resp, text) {
			alert(error);
                }
            })
	}
});
