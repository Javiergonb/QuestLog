export function QuestLog(){
    const allQuests = [];
    const questLines = {};
    let currentQuestLine = null;



    const addQuest = (quest) => {
        allQuests.push(quest);
        if(currentQuestLine){
            questLines[currentQuestLine].push(quest);
        }
    };

    const createQuestLine = (questLineName) => {
        if (questLines[questLineName]) {
            throw new Error(`QuestLine '${questLineName}' already exists`);
        }
        questLines[questLineName] = [];
    };

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
            Object.values(questLines).forEach(line => {
                const questIndex = line.indexOf(quest);
                if (questIndex !== -1) {
                    line.splice(questIndex, 1);
                }
            });
        }
    };

    const getCurrentQuestLine = () => currentQuestLine;

    const setCurrentQuestLine = (newQuestLineName) => {
        if (newQuestLineName === "All Quests") {
            currentQuestLine = null;
            return;
        }
        if (!questLines[newQuestLineName]) {
            throw new Error(`QuestLine '${newQuestLineName}' does not exist`);
        }
        currentQuestLine = newQuestLineName;
    };

    const editQuest = (oldTitle,newQuestInfo) =>{
        const questIndex = allQuests.findIndex(quest => quest.title === oldTitle);
        const quest = allQuests[questIndex];
        quest.title = newQuestInfo["title"];
        quest.description = newQuestInfo["description"];
        quest.dueDate = newQuestInfo["dueDate"];
        quest.priority = newQuestInfo["priority"];
        quest.complete = newQuestInfo["complete"];

    }

    const getAllQuests = () => allQuests;
    const getQuestLines = () => questLines;

    return {
        addQuest,
        createQuestLine,
        removeQuest,
        getQuestsInQuestLine,
        getCurrentQuestLine,
        setCurrentQuestLine,
        getAllQuests,
        getQuestLines,
        editQuest,
    };
};