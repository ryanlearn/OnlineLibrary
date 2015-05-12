/************************************
*   Register Form  Controller  *
************************************/
app.controller('registerFormController', function ($scope){
	
	$scope.removeErrors = function(){
		$(".formerror").remove();
	};

	$scope.checkRegisterForm = function(){
		console.log("checking form for errors");
		$scope.removeErrors();
		/*

				<select id="cust_t" name="cust_t">
					<option value="dr.">Dr. </option>
					<option value="Mr.">Mr. </option>
					<option value="Mrs.">Mrs. </option>
					<option value="Ms.">Ms. </option>
				</select>
				<input type="text" onclick="if (this.value = 'Username') this.value='';" value="Username" name="cust_u" id="cust_u"><br>
				<input type="text" onclick="if (this.value = 'First Name') this.value='';" value="First Name" name="cust_f" id="cust_f"><br>
				<input type="text" onclick="if (this.value = 'Last Name') this.value='';" value="Last Name" name="cust_l" id="cust_l"><br>
				<input type="text" onclick="if (this.value = 'Customer ID') this.value='';" value="Customer ID" name="cust_id" id="cust_id"><br>
				<input type="text" onclick="if (this.value = 'Clinic Name') this.value='';" value="Clinic Name" name="cust_cn" id="cust_cn"><br>
				<input type="text" onclick="if (this.value = 'E-mail') this.value='';" value="E-mail" name="cust_em" id="cust_em"><br>

		*/
		if ($('#cust_u').val() == "" || $('#cust_u').val() == "Username"){
			$('#cust_u').after("<span class='formerror'>Please enter a username.</span>");
		} else if ($('#cust_u').val().length < 5){
			$('#cust_u').after("<span class='formerror'>Please enter a username longer than 5 characters.</span>");
		}

		if ($('#cust_f').val() == "" || $('#cust_f').val() == "First Name"){
			$('#cust_f').after("<span class='formerror'>Please enter a first name.</span>");
		} else if ($('#cust_f').val().length < 2){
			$('#cust_f').after("<span class='formerror'>Please enter a first name longer than 1 character.</span>");
		}

		if ($('#cust_l').val() == "" || $('#cust_l').val() == "Last Name"){
			$('#cust_l').after("<span class='formerror'>Please enter a last name.</span>");
		} else if ($('#cust_l').val().length < 2){
			$('#cust_l').after("<span class='formerror'>Please enter a last name longer than 1 character.</span>");
		}

		if ($('#cust_id').val() == "" || $('#cust_id').val() == "Customer ID"){
			$('#cust_id').after("<span class='formerror'>Please enter a customer ID.</span>");
		}

		if ($('#cust_cn').val() == "" || $('#cust_cn').val() == "Clinic Name"){
			$('#cust_cn').after("<span class='formerror'>Please enter a clinic name.</span>");
		}

		if ($('#cust_em').val() == "" || $('#cust_em').val() == "E-mail"){
			$('#cust_em').after("<span class='formerror'>Please enter an e-mail address.</span>");
		} else if (!$scope.validateEmail($('#cust_em').val())){
			$('#cust_em').after("<span class='formerror'>Please enter a valid e-mail address.</span>");
		} 

	};

	$scope.validateEmail = function(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	};

});