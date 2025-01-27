import { Quest,QuestLog } from "./questLogic";
import "./styles.css";




function RendererManager() {
    //Quest init dummy for now
    const questLog = (function(){return QuestLog()})();
    const quest1 = Quest("Find the artifact", "Retrieve the lost artifact", "2025-01-30", "High");
    const quest2 = Quest("Rescue the princess", "Save the princess from the tower", "2025-02-10", "Medium");
    questLog.addQuest(quest1);
    questLog.addQuest(quest2);
    questLog.createQuestLine("Side")
    

    //relevant doms
    const questLinesList = document.querySelector(".quest-line-list");
    const questList = document.querySelector(".quest-list");



    
    const renderQuests = () =>{
        questList.textContent = ""
        const questLine = questLog.getCurrentQuestLine();

        console.log(questLine);

        const questsToRender = questLine? questLog.getQuestsInQuestLine(questLine) : questLog.allQuests;

        questsToRender.forEach((quest) => {
            questList.appendChild(createQuestCard(quest));
        });
    }

    const renderQuestsLines = () =>{
        questLinesList.textContent = ""
        Object.keys(questLog.questLines).forEach((questLineName) => {
            const questLineElement = createQuestLineCard(questLineName);
            questLinesList.appendChild(questLineElement);
        });   
    }

    const createQuestCard = (quest) =>{
        const questElement = document.createElement("div");
        questElement.className = "quest-card";
        questElement.innerHTML = `
            <div class="title-status">
                <button>y</button>
                <div class="quest-title">${quest.title}</div>
            </div>
            <div class="details-rest">
                <button class="details-button">Details</button>
                <button class="edit-button">edit</button>
                <div>${quest.dueDate}</div>
                <div class="priority">${quest.priority}</div>
            </div>
        `;
        return questElement
    }

    const createQuestLineCard = (questLine) =>{
        const questLineElement = document.createElement("div");
        questLineElement.className = "quest-line-card";
        questLineElement.innerHTML = `${questLine}`;

        //questLineElement.addEventListener("click", () => {
        //    questLineElement.classList.add("active");
        //    activeQuestLine.classList.remove("active");
        //    activeQuestLine = questLineElement;
        //    renderQuests(); 
        //});

        return questLineElement
    }
    
    //const addQuest = (quest) =>{
    //    questLog.addQuest(quest)
    //    if (activeQuestLine.textContent === "All Quests") {
    //        return;
    //    }
    //    questLog.addQuestToQuestLine(quest,activeQuestLine.textContent)
    //}

    const addQuestLine = (questLineName) =>{
        questLog.createQuestLine(questLineName)
    }

    const setCurrentQuestLineActive = (questLineName) => {
        questLog.setCurrentQuestLine(questLineName);
        const questLines = document.querySelectorAll(".quest-line-card");
        const currentActive = document.querySelector(".active");
        console.log(currentActive);
        currentActive.classList.remove("active");
        
        
        questLines.forEach(item => {
            console.log("Hello1")
            if(item.textContent === questLineName){
                console.log("Hello2")
                item.classList.add("active");
            }
        })

    }


    renderQuests()
    renderQuestsLines()

    return{
        renderQuests,
        renderQuestsLines,
        questLog,
        //addQuest,
        addQuestLine,
        setCurrentQuestLineActive,

    }


}


function DOM_EVENTS(UI) {
    const plusButton = document.querySelector(".new-quest-button");
    const modal = document.querySelector("#new-quest-modal");
    const questForm = document.querySelector("#new-quest-form");
    const cancelFormButton = document.querySelector("#cancel-form");

    const createQuestTab = document.querySelector("#create-quest-tab");
    const createQuestLineTab = document.querySelector("#create-questline-tab");
    const questFormContainer = document.querySelector("#create-quest-form-container");
    const questlineFormContainer = document.querySelector("#create-questline-form-container");
    const questlineForm = document.querySelector("#create-questline-form");
    const cancelQuestLineForm= document.querySelector("#cancel-modal-questline");

   



    plusButton.addEventListener("click", () => {
        modal.showModal();
    });

    cancelFormButton.addEventListener("click", () => {
        modal.close();
    });

    cancelQuestLineForm.addEventListener("click", () => {
        modal.close();
    });

    questForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const dueDate = document.querySelector("#dueDate").value;
        const priority = document.querySelector("#priority").value;

    
        const newQuest = Quest(title, description, dueDate, priority);
        //UI.addQuest(newQuest)
        UI.renderQuests();
        
        questForm.reset();
        modal.close();
    });

    questlineForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const questlineName = document.querySelector("#questline-name").value;

        UI.addQuestLine(questlineName);        
        UI.questLog.setCurrentQuestLine(questlineName);

        UI.renderQuestsLines();
        
        UI.setCurrentQuestLineActive(questlineName);
        UI.renderQuests();
        questlineForm.reset();
        modal.close();
        
    });


    createQuestTab.addEventListener("click", () => {
        questFormContainer.classList.remove("hidden");
        questlineFormContainer.classList.add("hidden");
        createQuestTab.classList.add("current-tab");
        createQuestLineTab.classList.remove("current-tab");
    });

    createQuestLineTab.addEventListener("click", () => {
        questFormContainer.classList.add("hidden");
        questlineFormContainer.classList.remove("hidden");
        createQuestTab.classList.remove("current-tab");
        createQuestLineTab.classList.add("current-tab");
    });
    

    

}

const UI = (function(){return RendererManager()})();
DOM_EVENTS(UI)

