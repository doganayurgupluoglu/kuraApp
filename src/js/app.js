const adayListesi = document.querySelector(".aday-listesi");
const adayInput = document.querySelector("#aday-input");
const adayForm = document.querySelector("#aday-form");
const alertMessage = document.querySelector(".alert");
const resultBtn = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");

resultBtn.addEventListener("click", showWinner);
clearBtn.addEventListener("click", clearList);

let currentWinner = null;

loadBtns();
counterAndRate();


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
    adayListesi.appendChild(li);
    adayInput.value = "";
    loadBtns();
    counterAndRate();
    
});




function yeniAday(){

    const li = document.createElement("li");
    li.className = "aday";
    li.textContent = adayInput.value.trim();
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-x deleteIcon";
    deleteIcon.addEventListener("click", removeAday);

    li.appendChild(deleteIcon);

    return li;
}

function randomWinner() {
    const adaylar = document.querySelectorAll(".aday");
    const index = Math.floor(Math.random() * adaylar.length);
    if(adaylar.length === 0){
        alert("Hiçbir İsim girmediniz Lütfen isim giriniz!");
        return;
    }
    return adaylar[index];
}

function showWinner(e) {
    e.preventDefault();
    const kazananContainer = document.querySelector(".kazanan-container");
    const kazanan = randomWinner();
    currentWinner = kazanan;
    if(!kazanan){
        return;
    }

    const kazananP = document.createElement("p");
    kazananP.className = "kazanan";
    kazananP.textContent = `'${kazanan.textContent}' Tebrikler!`;

    kazananContainer.innerHTML = "";
    kazananContainer.appendChild(kazananP);
    kazananContainer.style.display = "flex";
    const deleteWinnerBtn = document.createElement("button");
    deleteWinnerBtn.innerText = "Kazananı listeden çıkar";
    deleteWinnerBtn.addEventListener("click", deleteWinner)

    kazananContainer.appendChild(deleteWinnerBtn);
}

function clearList(e) {
    e.preventDefault()
    adayListesi.innerHTML = "";
    counterAndRate();
    loadBtns();
}
function loadBtns(){
    const adaylar = document.querySelectorAll(".aday");
    clearBtn.style.display = adaylar.length > 0 ? "inline-block": "none";
    resultBtn.style.display = adaylar.length > 1 ? "inline-block": "none";
}



function removeAday(e){
    e.target.closest("li").remove();
    loadBtns();
    counterAndRate();
}
function counterAndRate(){
    const adaylar = document.querySelectorAll(".aday");
    const sayac = document.querySelector(".sayac");
    const oran = document.querySelector(".oran");

    sayac.textContent = `Katılımcı Sayısı: ${adaylar.length}`;
    if(adaylar.length === 0){
        oran.textContent = "Kazanma Şansı -"
    }else {
        oran.textContent = `Kazanma Şansı: %${(100 / adaylar.length).toFixed(2)}`;
    }
}

function deleteWinner(){
    if (currentWinner) {
        currentWinner.remove();
        currentWinner = null;
        counterAndRate();
        loadBtns();
    }
}