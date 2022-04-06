const para = document.createElement("p");
let signMas = ["Овен","Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпиолн","Стрелец", "Рыбы", "Водолей", "Козерог"];
let imageMas = ["Act.png",
"Body.png",
"Carpet.png",
"Eye.png",
"Ha.png",
"Hi.png",
"Hmm.png",
"peeling.png",
"Sad.png"];
for (let index = 0; index < 5; index++) {
    let summary = document.createElement("summary");
    let details = document.createElement("details");
    let img = document.createElement("img");
    let p = document.createElement("p");
    p.innerText=makeid(1000);
    img.src = imageMas[index]; 
    summary.innerText = signMas[index]; 
    details.appendChild(summary);
    details.appendChild(img);
    details.appendChild(p);
    
    document.body.appendChild(details);

}


function makeid(length) {
    var result           = '';
    var characters       = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ_ ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

console.log(makeid(5));

para.innerText = "This is a parag";

// Append to body:
let mum = document.getElementById("sus");
mum.appendChild(para);
