import { Quest,QuestLog } from "./questLogic";
import "./styles.css";


function QuestRenderer() {
    const questLog = (function(){return QuestLog()})();

    const quest1 = Quest("Find the artifact", "Retrieve the lost artifact", "2025-01-30", "High");
    const quest2 = Quest("Rescue the princess", "Save the princess from the tower", "2025-02-10", "Medium");

    questLog.addQuest(quest1);
    questLog.addQuest(quest2);

    const contentDiv = document.querySelector(".all-projects-div")

    questLog.allQuests.forEach((quest)=>{
        const questParagraph = document.createElement("p");
        questParagraph.textContent = quest.title;

        contentDiv.appendChild(questParagraph);
    })


}
