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
    // if(adayInput.value.trim() === ""){
    //     alertMessage.style.opacity = "1";
    //     return
    // }
    // else{
    //     alertMessage.style.opacity = "0";
    // }
    const li = yeniAday();
    adayListesi.appendChild(li);
    adayInput.value = "";
    loadBtns();
    counterAndRate();
    hideWinnerContainer();
    
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
    const winnerSound = document.getElementById("winner-sound");
    const winnerHistoryList = document.querySelector(".winner-history"); 
    const kazanan = randomWinner();
    currentWinner = kazanan; 

    if (!kazanan) {
        return;
    }

    winnerSound.currentTime = 0;
    winnerSound.play().catch(err => {
        console.warn("Ses çalınamadı:", err);
    });
    const kazananP = document.createElement("p");
    kazananP.className = "kazanan";
    const winnerName = kazanan.firstChild.textContent.trim();  
    kazananP.textContent = `'${winnerName}' Tebrikler!`;


    kazananContainer.innerHTML = "";  
    kazananContainer.appendChild(kazananP);


    const historyItem = document.createElement("li");
    historyItem.className = "history-item";
    historyItem.textContent = winnerName; 
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-x deleteIcon";
    deleteIcon.addEventListener("click", removeAday);
    
    historyItem.appendChild(deleteIcon);
    winnerHistoryList.appendChild(historyItem);


    kazananContainer.style.display = "flex";


    const deleteWinnerBtn = document.createElement("button");
    deleteWinnerBtn.innerText = "Kazananı listeden çıkar";
    deleteWinnerBtn.className = "delete-winner-btn";
    deleteWinnerBtn.addEventListener("click", deleteWinner);
    kazananContainer.appendChild(deleteWinnerBtn);

    showWinnerContainer();
} 

function clearList(e) {
    e.preventDefault()
    adayListesi.innerHTML = "";
    document.querySelector(".winner-history").innerHTML = ""; 
    counterAndRate();
    loadBtns();
    currentWinner = null;  
    hideWinnerContainer();
}
function loadBtns(){
    const adaylar = document.querySelectorAll(".aday");
    clearBtn.disabled = adaylar.length === 0;
    resultBtn.disabled = adaylar.length <= 1;
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
        const deleteSound = document.querySelector("#delete-sound");
        deleteSound.currentTime = 0;
        deleteSound.play().catch(err => {
            console.warn("Ses çalınamadı:", err);
        });

        const deleteBtn = document.querySelector(".delete-winner-btn");
        deleteBtn.textContent ="Kazanan Listeden Silindi";
        deleteBtn.classList.add("disabled");
        deleteBtn.disabled = true;
        hideWinnerContainer();
    }
}

function hideWinnerContainer() {
    setTimeout(() => {
        const kazananContainer = document.querySelector(".kazanan-container");
            kazananContainer.classList.remove("show");
    }, 100);
}
function showWinnerContainer() {
    setTimeout(() => {
        const kazananContainer = document.querySelector(".kazanan-container");
        kazananContainer.classList.add("show");
    }, 0);
}