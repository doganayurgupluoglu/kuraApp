const adayListesi = document.querySelector(".aday-listesi");
const adayInput = document.querySelector("#aday-input");
const adayForm = document.querySelector("#aday-form");
const alertMessage = document.querySelector(".alert");
const resultBtn = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");

resultBtn.addEventListener("click", showWinner);
clearBtn.addEventListener("click", clearList);



adayForm.addEventListener("submit", e => {
    e.preventDefault();

    // console.log("submit");
    if(adayInput.value.trim() === ""){
        alertMessage.style.opacity = "1";
        return
    }
    else{
        alertMessage.style.opacity = "0";
    }
    const li = yeniAday();
    adayListesi.prepend(li);
    adayInput.value = "";
});




function yeniAday(){

    const li = document.createElement("li");
    li.className = "aday";
    li.textContent = adayInput.value.trim();


    return li;
}

function randomWinner() {
    const adaylar = document.querySelectorAll(".aday");
    const index = Math.floor(Math.random() * adaylar.length);
    if(adaylar.length === 0){
        alert("Hiçbir İsim girmediniz Lütfen isim giriniz!");
        return;
    }
    return adaylar[index].textContent;
}

function showWinner(e) {
    e.preventDefault();
    const kazananContainer = document.querySelector(".kazanan-container");
    const kazanan = randomWinner();
    if(!kazanan){
        return;
    }

    const kazananP = document.createElement("p");
    kazananP.className = "kazanan";
    kazananP.textContent = `Kazanan ${kazanan}. Tebrikler!`;

    kazananContainer.innerHTML = "";
    kazananContainer.appendChild(kazananP);
    kazananContainer.style.display = "flex";

}

function clearList(e) {
    e.preventDefault()
    adayListesi.innerHTML = "";
}





