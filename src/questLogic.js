function Quest(title, description, dueDate, priority,complete = false) {
    return { title, description, dueDate, priority,complete};
}



function QuestLog() {
    const allQuests = [];
    const questLines = {};

    let currentQuestLine = null;

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
        if (!allQuests.includes(quest)) {
            addQuest(quest)
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
        for (const line of Object.values(questLines)) {
            const questIndex = line.indexOf(quest);
            if (questIndex !== -1) {
                line.splice(questIndex, 1);
            }
        }
    };

    const getCurrentQuestLine = () => currentQuestLine;

    const setCurrentQuestLine = (newQuestLineName) => {
        if (!questLines[newQuestLineName]) {
            throw new Error(`QuestLine '${questLine}' does not exist`);
        }
        currentQuestLine = newQuestLineName;
    }

    return {
        addQuest,
        createQuestLine,
        addQuestToQuestLine,
        removeQuest,
        getQuestsInQuestLine,
        allQuests,
        questLines,
        getCurrentQuestLine,
        setCurrentQuestLine,

    }
}


export { Quest, QuestLog };



