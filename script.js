const $ = (id)=>document.getElementById(id);

/* =========================
   PAGES
========================= */

const pages = [
"loginPage",
"homePage",
"offlinePage",
"onlinePage",
"createRoomPage",
"joinRoomPage",
"friendsPage",
"inboxPage",
"announcementPage",
"settingsPage",
"cardPage",
"discussionPage",
"votingPage",
"resultPage"
];

function showPage(pageId){

pages.forEach(page=>{
if($(page)){
$(page).classList.add("hidden");
}
});

$(pageId).classList.remove("hidden");
}

/* =========================
   STARTUP
========================= */

window.onload=()=>{

const savedLogin=localStorage.getItem("findSpyLogin");

if(savedLogin==="true"){
showPage("homePage");
}else{
showPage("loginPage");
}

};

/* =========================
   LOGIN SYSTEM
========================= */

$("loginBtn").onclick=()=>{

localStorage.setItem("findSpyLogin","true");

showPage("homePage");
};

$("guestBtn").onclick=()=>{
showPage("homePage");
};

/* =========================
   SIDEBAR
========================= */

$("menuBtn").onclick=()=>{
$("sidebar").classList.toggle("hidden");
};

/* =========================
   SIDEBAR NAVIGATION
========================= */

const sidebarButtons = $("sidebar").querySelectorAll("button");

sidebarButtons[0].onclick=()=>{
showPage("homePage");
};

sidebarButtons[1].onclick=()=>{
showPage("offlinePage");
};

sidebarButtons[2].onclick=()=>{
showPage("friendsPage");
};

sidebarButtons[3].onclick=()=>{
showPage("inboxPage");
};

sidebarButtons[4].onclick=()=>{
showPage("announcementPage");
};

sidebarButtons[5].onclick=()=>{
showPage("settingsPage");
};

sidebarButtons[6].onclick=()=>{

localStorage.removeItem("findSpyLogin");

showPage("loginPage");
};

/* =========================
   HOME BUTTONS
========================= */

$("offlineBtn").onclick=()=>{
showPage("offlinePage");
};

$("onlineBtn").onclick=()=>{
showPage("onlinePage");
};

/* =========================
   BACK BUTTONS
========================= */

document.querySelectorAll(".backBtn").forEach(btn=>{

btn.onclick=()=>{
showPage("homePage");
};

});

/* =========================
   ONLINE MODE
========================= */

$("createRoomBtn").onclick=()=>{
showPage("createRoomPage");
};

$("joinRoomBtn").onclick=()=>{
showPage("joinRoomPage");
};

/* =========================
   OFFLINE GAME
========================= */

const words = {

Food:[
"Pizza",
"Burger",
"Biryani",
"Pasta",
"Fries",
"Sandwich"
],

Cars:[
"BMW",
"Honda",
"Audi",
"Toyota",
"Tesla",
"Ferrari"
],

Objects:[
"Phone",
"Bottle",
"Chair",
"Laptop",
"Watch",
"Camera"
],

Places:[
"School",
"Airport",
"Hospital",
"Market",
"Beach",
"Mall"
]

};

let roles = [];
let alivePlayers = [];
let votes = [];

let currentPlayer = 0;
let currentVoter = 0;

let selectedWord = "";
let discussionTime = 30;

let discussionInterval;

/* =========================
   START GAME
========================= */

$("startOfflineGame").onclick=()=>{

roles=[];
alivePlayers=[];
votes=[];

currentPlayer=0;
currentVoter=0;

const totalPlayers =
parseInt($("playersInp").value);

const totalSpies =
parseInt($("spiesInp").value);

const selectedCategory =
$("categorySel").value;

discussionTime =
parseInt($("timerInp").value);

/* PLAYERS */

for(let i=0;i<totalPlayers;i++){

roles.push("CITIZEN");

alivePlayers.push(i);

}

/* RANDOM SPIES */

let spiesLeft = totalSpies;

while(spiesLeft>0){

let randomPlayer =
Math.floor(Math.random()*totalPlayers);

if(roles[randomPlayer]!=="SPY"){

roles[randomPlayer]="SPY";

spiesLeft--;

}

}

/* RANDOM WORD */

selectedWord =
words[selectedCategory][
Math.floor(
Math.random() *
words[selectedCategory].length
)
];

showPage("cardPage");

showCard();

};

/* =========================
   SHOW CARD
========================= */

function showCard(){

$("playerTitle").innerText =
"PLAYER " + (currentPlayer+1);

document.querySelector(".cardBack").innerText="";

document.querySelector(".card")
.classList.remove("flip");

}

/* =========================
   CARD REVEAL
========================= */

document.querySelector(".card")
.onclick=()=>{

const role = roles[currentPlayer];

if(role==="SPY"){

document.querySelector(".cardBack")
.innerText="🕵️ YOU ARE SPY";

}else{

document.querySelector(".cardBack")
.innerText=selectedWord;

}

document.querySelector(".card")
.classList.add("flip");

};

/* =========================
   NEXT PLAYER
========================= */

$("nextBtn").onclick=()=>{

currentPlayer++;

if(currentPlayer>=roles.length){

startDiscussion();

}else{

showCard();

}

};

/* =========================
   DISCUSSION
========================= */

function startDiscussion(){

showPage("discussionPage");

$("discussionTimer").innerText =
discussionTime + "s";

discussionInterval = setInterval(()=>{

discussionTime--;

$("discussionTimer").innerText =
discussionTime + "s";

if(discussionTime<=0){

clearInterval(discussionInterval);

startVoting();

}

},1000);

}

/* =========================
   VOTING
========================= */

function startVoting(){

showPage("votingPage");

votes = new Array(roles.length).fill(0);

currentVoter=0;

nextVote();

}

function nextVote(){

if(currentVoter>=alivePlayers.length){

processVotes();

return;

}

$("voteButtons").innerHTML="";

alivePlayers.forEach(player=>{

if(player!==alivePlayers[currentVoter]){

const btn =
document.createElement("button");

btn.innerText =
"PLAYER " + (player+1);

btn.onclick=()=>{

votes[player]++;

currentVoter++;

nextVote();

};

$("voteButtons").appendChild(btn);

}

});

}

/* =========================
   RESULT
========================= */

function processVotes(){

const maxVotes =
Math.max(...votes);

const outPlayer =
votes.indexOf(maxVotes);

showPage("resultPage");

if(roles[outPlayer]==="SPY"){

$("resultTitle").innerText =
"🎉 CITIZENS WIN";

$("resultText").innerText =
"Spy was Player " + (outPlayer+1);

}else{

$("resultTitle").innerText =
"❌ WRONG VOTE";

$("resultText").innerText =
"Player " + (outPlayer+1) +
" was innocent.";

}

}

/* =========================
   RESTART
========================= */

$("restartBtn").onclick=()=>{

showPage("offlinePage");

};

/* =========================
   MAIN MENU
========================= */

$("mainMenuBtn").onclick=()=>{

showPage("homePage");

};
