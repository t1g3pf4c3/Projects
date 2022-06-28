let triSide1=document.getElementById("triSide1")
let triSide2=document.getElementById("triSide2")
let triSide3=document.getElementById("triSide3")
let triSideCount=document.getElementById("triSideCount")
let triSideAnswer=document.getElementById("triSideAnswer")

triSideCount.onclick = () => {
	triSideAnswer.style.color="black"
	if(triSide1.value && triSide2.value && triSide3.value) {
	let p = (parseInt(triSide1.value)+parseInt(triSide2.value)+parseInt(triSide3.value))/2;
	triSideAnswer.innerText ="Ответ: " + Math.sqrt(p*(p-triSide2.value)*(p-triSide3.value)*(p-triSide1.value))
	}
	else {
		triSideAnswer.style.color="red";
		triSideAnswer.innerText = "Введите существующий треугольник"
	}

}
