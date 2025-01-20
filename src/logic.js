function Quest(title, description, dueDate, priority) {
    return { title, description, dueDate, priority };
}


//Gets all quests
function QuestLog() {
    const allQuests = [];
    const questLines = {};

    const addQuest = (quest) => {allQuests.push(quest)};

    const createQuestLine = (questLineName) => {
        if (questLines[questLineName]) {
            throw new Error(`QuestLine '${questLineName}' already exists`);
        }
        questLines[questLineName] = [];
    }

    const addQuestToQuestLine = (quest,questLine) => {
        if (!questLines[questLine]) {
            throw new Error(`QuestLine '${questLine}' does not exist`);
        }
        questLines[questLine].push(quest);
    }

    const getQuestsInQuestLine = (questLineName) => {
        if (!questLines[questLineName]) {
            throw new Error(`QuestLine '${questLineName}' does not exist`);
        }
        return questLines[questLineName];
    };

    const removeQuest = (quest) => {
        const index = allQuests.indexOf(quest);
        if (index !== -1) {
            allQuests.splice(index, 1);
        }
        // Remove references from all quest lines
        for (const line of Object.values(questLines)) {
            const questIndex = line.indexOf(quest);
            if (questIndex !== -1) {
                line.splice(questIndex, 1);
            }
        }
    };




    return {
        addQuest,
        createQuestLine,
        addQuestToQuestLine,
        removeQuest,
        getQuestsInQuestLine,
        allQuests,
        questLines,

    }
}


const questLog = (function(){return QuestLog()})();

const quest1 = Quest("Find the artifact", "Retrieve the lost artifact", "2025-01-30", "High");
const quest2 = Quest("Rescue the princess", "Save the princess from the tower", "2025-02-10", "Medium");

questLog.addQuest(quest1)
questLog.addQuest(quest2)

console.log(questLog.allQuests)


questLog.createQuestLine("Main Quest")
questLog.createQuestLine("Side Quests")

questLog.addQuestToQuestLine(quest1,"Main Quest")
questLog.addQuestToQuestLine(quest2,"Side Quests")
console.log(questLog.questLines)


questLog.removeQuest(quest1)

console.log(questLog.allQuests)

