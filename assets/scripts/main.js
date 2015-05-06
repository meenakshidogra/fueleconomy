var MileageCalculator  = function () {
	var self = this;

	this.init = function () {
		this.initEventListeners();
	};

	this.initEventListeners = function () {
		//when the selected value of the distance dropdown is changed
		$('#distance').on('change', function (e) {
			e.stopPropagation();
			var target = $(e.target);
			var selectedValue = target.val();
			//if user selects kilo-meters in the distance dropdown...
			if (selectedValue === 'kms') {
				//then the fuel dropdown should change to 'liters' itself
				$('#fuelunit').val('litr');
				//and oldDistanceField dropdown should change to the same value
				$('#oldDistance').val('kms');
			} 
			//else if user selects miles in the distance dropdown...
			else if (selectedValue === 'mil') {
				//then the fuel dropdown should change to 'gallons'
				$('#fuelunit').val('galn');
				//and oldDistanceField dropdown should change to the same value
				$('#oldDistance').val('mil');
			}
		});

		//whne the submit button is clicked
		$('#mileageForm').submit( function () {
			//first remove all the inline errors
			$('.form-group').removeClass('has-error');
			//check if the fields are empty show error messages
			var distanceValue = $.trim($('#distanceField').val());
			var fuelValue = $.trim($('#fuelField').val());
			var oldDistanceValue = $.trim($('#oldDistanceField').val());
			if ( !distanceValue || distanceValue === '') {
				//show the error under the distance field
				$('#distanceField').closest('.form-group').addClass('has-error');

			} 
			if ( !fuelValue || fuelValue === '') {
				//show the error under the fuel field
				//show the error under the distance field
				$('#fuelField').closest('.form-group').addClass('has-error');

			}
			if ( !oldDistanceValue || oldDistanceValue === '') {
				//show the error under the distance field
				//$('#oldDistanceField').closest('.form-group').addClass('has-error');
				alert('for this app to work, you should have the odometer value of the last time when you refilled your car tank');

			}
			//else
			if (distanceValue && distanceValue !== '' && 
				fuelValue && fuelValue !== '' &&
				oldDistanceValue && oldDistanceValue !== '') {
				//calculate the mileage
				var mileage = self.getMileage(distanceValue, oldDistanceValue, fuelValue);
				var mileageUnit = self.getMileageUnit() || '';
				if (mileage) {
					//show the mileage
					alert('your mileage is ' + mileage + mileageUnit);
				} else {
					alert('something went wrong');
				}

			}
			return false;
		});
	};

	/**
	* getMileage
	*
	* @desc Function to calculate the mileage of the car
	* @param newReading - The reading of the odometer of the car just after refill
	* @param oldReading - The reading of the odometer of the car last time the car was refilled
	* @param fuelAmount - Amount of the fuel filled to full the fule tank of the car. 
	*					  This could be red on the meter of the station pump or in the receipt
	*/
	this.getMileage = function (newReading, oldReading, fuelAmount) {
		var distanceCovered = 0;
		if (this.isNumber(newReading) && this.isNumber(oldReading)) {
			distanceCovered = Number(newReading) - Number(oldReading);
		}
		if(this.isNumber(fuelAmount)) {
			//mileage is distance covered divided by the fuelAmount spent
			var mileage = distanceCovered/Number(fuelAmount);
			//return the rounded off value
			return Math.round(mileage * 10) / 10;
		}
		return null;
	};

	/**
	* isNumber
	*
	* @desc returns true if the value is positive numeric (decimal number or integer)
	* @param value - Any string 
	*/
	this.isNumber = function (value) {
		return $.isNumeric(value) && (value > 0);
	};

	/**
	* getMileageUnit
	*
	* @desc returns the units of mileage based on the selected units
	* @param value - Any string 
	*/
	this.getMileageUnit = function () {
		var fuelunit = $( "#fuelunit option:selected" ).text();
		var distanceunit = $( "#distance option:selected" ).text();
		return distanceunit + '/' + fuelunit;
	};
};
