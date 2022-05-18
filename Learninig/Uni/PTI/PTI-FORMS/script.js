
let submitButton = document.getElementById("submit");
let cvc = document.getElementById("cvc");
let checkbox = document.getElementById("checkbox");
let name = document.getElementById("name");
let fileUpload = document.getElementById("file");
let answerField = document.getElementById("answerField");
let date = document.getElementById("date");


let numb = document.getElementById("numb");
let createElementFromHtml = (htmlString) => {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}

submit = () => {
	console.log(cvc.value)
	if (/[0-9]$/.test(numb.value) && /[А-Я]$/.test(name.value) && /[0-9]$/.test(cvc.value) && date.value && checkbox.checked) {
		answerField.innerHTML = "";
		answerField.appendChild(createElementFromHtml(`
<div class="card my-3" style="width: 18rem;">
<img src="avatar.png" alt="...">
<div class="card-body">
<h5 class="card-title">${name.value}</h5>
<p class="card-text">Номер моей карты:</p>
<p class="card-text">${numb.value}</p>
<p class="card-text">Мой cvc код: ${cvc.value}</p>
<p class="card-text">Дата окончания: ${date.value}</p>
<a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div>
`))
	}
	else {
		answerField.innerHTML = "";
		answerField.appendChild(createElementFromHtml(`
<h2 style="color:red"> FILL EVERYTHING </h2>
`))
	}
}
submitButton.addEventListener('click', submit);
