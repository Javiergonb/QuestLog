import { Quest,QuestLog } from "./questLogic";
import "./styles.css";




function RendererManager() {
    //Quest init dummy for now
    const questLog = (function(){return QuestLog()})();
    const quest1 = Quest("Find the artifact", "Retrieve the lost artifact", "2025-01-30", "High");
    const quest2 = Quest("Rescue the princess", "Save the princess from the tower", "2025-02-10", "Medium");
    questLog.addQuest(quest1);
    questLog.addQuest(quest2);
    questLog.createQuestLine("Main Quest!")
    questLog.createQuestLine("Side Quests!")
    questLog.createQuestLine("Misc")

    //relevant doms
    const questLinesList = document.querySelector(".quest-line-list");
    const questList = document.querySelector(".quest-list");
    const activeQuestLine = document.querySelector(".active");

    
    const renderQuests = () =>{
        
        questList.textContent = ""
        const questsToRender = activeQuestLine.textContent === "All Quests" ? questLog.allQuests : questLog.getQuestsInQuestLine(activeQuestLine.textContent);

        questsToRender.forEach((quest) => {
            questList.appendChild(createQuestCard(quest));
        });
    }

    const renderQuestsLines = () =>{
        questLinesList.textContent = ""
        Object.keys(questLog.questLines).forEach((questLineName) => {
            questLinesList.appendChild(createQuestLineCard(questLineName))
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
        questLineElement.innerHTML = `
            ${questLine}
        `;
        return questLineElement
    }
    
    const addQuest = (quest) =>{
        questLog.addQuest(quest)
        if (activeQuestLine.textContent === "All Quests") {
            return;
        }
        questLog.addQuestToQuestLine(quest,activeQuestLine.textContent)
    }

    const addQuestLine = (questLineName) =>{
        questLog.createQuestLine(questLineName)
    }

    renderQuests()
    renderQuestsLines()

    return{
        renderQuests,
        renderQuestsLines,
        addQuest,
        addQuestLine,
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



    plusButton.addEventListener("click", () => {
        modal.showModal();
    });

    cancelFormButton.addEventListener("click", () => {
        modal.close();
    });

    questForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const dueDate = document.querySelector("#dueDate").value;
        const priority = document.querySelector("#priority").value;

    
        const newQuest = Quest(title, description, dueDate, priority);
        UI.addQuest(newQuest)
        UI.renderQuests();

        questForm.reset();
        modal.close();
    });

    questlineForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const questlineName = document.querySelector("#questline-name").value;

        UI.addQuestLine(questlineName);
        UI.renderQuestsLines();

        questlineForm.reset();
        modal.close();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close()
        }
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

