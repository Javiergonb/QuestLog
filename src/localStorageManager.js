export const LocalStorageManager = () =>{
    
    
    const saveQuestsToLocalStorage = (allQuests,questLines) => {
        localStorage.setItem('allQuests', JSON.stringify(allQuests));
        localStorage.setItem('questLines', JSON.stringify(questLines));
    };

    const getQuestsFromLocalStorage= (allQuests,questLines) =>{
        const savedQuests = localStorage.getItem('allQuests');
        const savedQuestLines = localStorage.getItem('questLines');

        if (savedQuests) {
            allQuests.push(...JSON.parse(savedQuests));
        }
        if (savedQuestLines) {
            Object.assign(questLines, JSON.parse(savedQuestLines));
        }
    }

    return {
        saveQuestsToLocalStorage,
        getQuestsFromLocalStorage
    }
}