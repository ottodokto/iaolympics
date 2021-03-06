$(function() {
	var highestFormNumber = 1;

	$("#addform").click(function() {

		highestFormNumber++;

		var newForm = document.createElement("form");
		newForm.setAttribute("action", "");
		newForm.setAttribute("method", "post");
		newForm.setAttribute("id", "form"+highestFormNumber);
		newForm.setAttribute("style", "display:none;");

		document.getElementById("forms").appendChild(newForm);

		// add input fields

		var deleteP = document.createElement("p");
		deleteP.setAttribute("id", "x");
		deleteP.appendChild(document.createTextNode("x"));

		var yearInput = document.createElement("input");
		yearInput.setAttribute("type", "text");
		yearInput.setAttribute("name", "year");
		yearInput.setAttribute("placeholder", "Class year");

		var nameInput = document.createElement("select");
		nameInput.setAttribute("name", "name");

		var names = ["Freshmen", "Sophomores", "Juniors", "Seniors"];
		for(var i = 0; i < names.length; i++) {
			var option = document.createElement("option");
			option.setAttribute("name", names[i].toLowerCase());
			option.appendChild(document.createTextNode(names[i]));
			nameInput.appendChild(option);
		}

		var colorInput = document.createElement("input");
		colorInput.setAttribute("type", "text");
		colorInput.setAttribute("name", "color");
		colorInput.setAttribute("placeholder", "Class color");

		var themeInput = document.createElement("input");
		themeInput.setAttribute("type", "text");
		themeInput.setAttribute("name", "theme");
		themeInput.setAttribute("placeholder", "Class theme");

		var hr = document.createElement("hr");

		newForm.appendChild(deleteP);
		newForm.appendChild(yearInput);
		newForm.appendChild(nameInput);
		newForm.appendChild(colorInput);
		newForm.appendChild(themeInput);
		newForm.appendChild(hr);

		$(deleteP).click(function() {
			$(this).parent().hide();
		});

		$("#form"+highestFormNumber).fadeIn();
	});

	$("#save").click(function() {
		var formData = [];
		var valid = true;
		for(var i = 1; i <= 4; i++) {
			var ithForm = document.getElementById("form"+i);

			var ithYear = ithForm.year.value;
			var ithName = ithForm.name.value;
			var ithColor = ithForm.color.value;
			var ithTheme = ithForm.theme.value;

			formData.push({'year': ithYear, 'name': ithName, 'color': ithColor, 'theme': ithTheme});

			if(ithYear == "Year..." || ithName == "Name..." || ithTheme == "Theme...") {
				valid = false;
			}
		}
		if(valid) {
			$.post('/manager', {'data': formData}, function(data) {
				if(data == "ok") {
					var confirmation = document.createElement("div");
					confirmation.setAttribute("class", "confirmation");
					confirmation.appendChild(document.createTextNode("Changes saved."));
					document.getElementById("save-container").insertBefore(confirmation, document.getElementById("save"));
					setTimeout(function() {
						$(confirmation).fadeOut(500);
					}, 3000);
				}
				else {
					console.log("there was an error.");
				}
			});
		}
	});

	$("#x").on('click', function() {
		$(this).parent().hide();
		$.post('/api/grade/' + $(this).attr('data-grade') + '/delete', function(data) {
			if(data == "ok") {
				// ...
			}
			else {
				console.log("there was an error.");
			}
		});
	});
});