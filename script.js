/* ===========================
   STUDY QUEST
   PART 1
===========================*/

// اطلاعات بازیکن
let xp = Number(localStorage.getItem("xp")) || 0;
let coin = Number(localStorage.getItem("coin")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

// چالش‌ها
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// دریافت المان‌ها
const xpText = document.getElementById("xp");
const coinText = document.getElementById("coin");
const levelText = document.getElementById("level");
const progressBar = document.getElementById("progressBar");

const taskList = document.getElementById("taskList");

const taskModal = document.getElementById("taskModal");

const xpAnimation = document.getElementById("xpAnimation");
const levelAnimation = document.getElementById("levelAnimation");

const xpSound = document.getElementById("xpSound");
const levelSound = document.getElementById("levelSound");

// ذخیره اطلاعات
function saveData(){

    localStorage.setItem("xp",xp);
    localStorage.setItem("coin",coin);
    localStorage.setItem("level",level);

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

// آپدیت اطلاعات بازیکن
function updatePlayer(){

    xpText.textContent=xp;
    coinText.textContent=coin;
    levelText.textContent=level;

    const needXP = level*100;

    let percent=(xp/needXP)*100;

    if(percent>100){
        percent=100;
    }

    progressBar.style.width=percent+"%";

    saveData();

}

// نمایش انیمیشن XP
function showXPAnimation(amount){

    xpAnimation.innerHTML="⭐ +"+amount+" XP";

    xpAnimation.classList.remove("show");

    void xpAnimation.offsetWidth;

    xpAnimation.classList.add("show");

    if(xpSound){

        xpSound.currentTime=0;
        xpSound.play().catch(()=>{});

    }

}

// انیمیشن Level Up
function showLevelUp(){

    levelAnimation.classList.remove("show");

    void levelAnimation.offsetWidth;

    levelAnimation.classList.add("show");

    if(levelSound){

        levelSound.currentTime=0;
        levelSound.play().catch(()=>{});

    }

    createConfetti();

}

// بررسی Level
function checkLevel(){

    let needXP=level*100;

    while(xp>=needXP){

        xp-=needXP;

        level++;

        needXP=level*100;

        showLevelUp();

    }

    updatePlayer();

}
/* ===========================
   STUDY QUEST
   PART 2
===========================*/

// نمایش چالش‌ها
function renderTasks(){

    taskList.innerHTML="";

    if(tasks.length===0){

        taskList.innerHTML=`
        <div class="task">
            <div>
                <h3>هنوز هیچ چالشی نداری 🎯</h3>
                <p>از دکمه «افزودن چالش» استفاده کن.</p>
            </div>
        </div>`;

        return;
    }

    tasks.forEach((task,index)=>{

        const div=document.createElement("div");

        div.className="task";

        div.innerHTML=`

        <div>

            <h3>${task.name}</h3>

            <p>⭐ ${task.xp} XP</p>

        </div>

        ${
            task.done
            ?
            `<button disabled>✅ انجام شد</button>`
            :
            `<button class="doneBtn" onclick="finishTask(${index})">
                انجام شد
            </button>`
        }

        `;

        taskList.appendChild(div);

    });

}

// انجام چالش
function finishTask(index){

    if(tasks[index].done) return;

    tasks[index].done=true;

    xp+=tasks[index].xp;

    // هر 5 XP = یک Coin
    coin+=Math.floor(tasks[index].xp/5);

    showXPAnimation(tasks[index].xp);

    checkLevel();

    renderTasks();

    saveData();

}

// افزودن چالش
document.getElementById("saveTask").onclick=function(){

    const name=document.getElementById("taskName").value.trim();

    const taskXP=Number(document.getElementById("taskXP").value);

    if(name==="" || taskXP<=0){

        alert("اطلاعات را کامل وارد کن.");

        return;

    }

    tasks.push({

        name:name,

        xp:taskXP,

        done:false

    });

    document.getElementById("taskName").value="";

    document.getElementById("taskXP").value="";

    taskModal.style.display="none";

    renderTasks();

    saveData();

};

// باز کردن پنجره افزودن چالش
document.getElementById("openAddTask").onclick=function(){

    taskModal.style.display="flex";

};

// بستن مودال با کلیک روی پس‌زمینه
window.onclick=function(e){

    if(e.target.classList.contains("modal")){

        e.target.style.display="none";

    }

};

// مقداردهی اولیه
updatePlayer();
renderTasks();
/* ===========================
   STUDY QUEST
   PART 3
===========================*/

// ساخت افکت Confetti
function createConfetti(){

    const box = document.getElementById("confetti");

    if(!box) return;

    const colors=[
        "#ff4d6d",
        "#ffd60a",
        "#00e5ff",
        "#7c5cff",
        "#00ff99",
        "#ff9f1c"
    ];

    for(let i=0;i<80;i++){

        const c=document.createElement("div");

        c.className="confetti";

        c.style.left=Math.random()*100+"vw";

        c.style.top="-20px";

        c.style.background=
        colors[Math.floor(Math.random()*colors.length)];

        c.style.animationDelay=
        (Math.random()*0.8)+"s";

        c.style.animationDuration=
        (2+Math.random()*2)+"s";

        c.style.transform=
        `rotate(${Math.random()*360}deg)`;

        box.appendChild(c);

        setTimeout(()=>{

            c.remove();

        },4500);

    }

}

/* ===========================
   RESET DATA
===========================*/

const resetBtn=document.getElementById("resetData");

if(resetBtn){

resetBtn.onclick=function(){

const ok=confirm("تمام اطلاعات حذف شود؟");

if(!ok) return;

localStorage.clear();

location.reload();

};

}

/* ===========================
   SHOP
===========================*/

const shopBtn=document.getElementById("shopBtn");
const shopModal=document.getElementById("shopModal");

if(shopBtn){

shopBtn.onclick=function(){

shopModal.style.display="flex";

};

}

/* ===========================
   REWARD
===========================*/

const rewardBtn=document.getElementById("rewardBtn");
const rewardModal=document.getElementById("rewardModal");

if(rewardBtn){

rewardBtn.onclick=function(){

rewardModal.style.display="flex";

};

}

/* ===========================
   SETTINGS
===========================*/

const settingBtn=document.getElementById("settingBtn");
const settingModal=document.getElementById("settingModal");

if(settingBtn){

settingBtn.onclick=function(){

settingModal.style.display="flex";

};

}

/* ===========================
   HOME
===========================*/

const homeBtn=document.getElementById("homeBtn");

if(homeBtn){

homeBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};

}

/* ===========================
   CLOSE MODALS WITH ESC
===========================*/

document.addEventListener("keydown",function(e){

if(e.key==="Escape"){

document.querySelectorAll(".modal")

.forEach(m=>m.style.display="none");

}

});

/* ===========================
   START
===========================*/

updatePlayer();
renderTasks();

console.log("🎮 Study Quest Loaded");
