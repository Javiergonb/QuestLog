export const QuestRenderer = (questLog, domElements) => {
    const createQuestCard = (quest) => {
        const questElement = document.createElement("div");
        questElement.className = "quest-card";
        if(quest.complete) {questElement.classList.add("completed")}
        questElement.innerHTML = `
            <div class="title-status">
                <button class="complete-button ">✓</button>
                <div class="quest-title">${quest.title}</div>
            </div>
            <div class="details-rest">
                <button class="details-button">Details</button>
                <button class="edit-button">Edit</button>
                <div class="due-date">${quest.dueDate}</div>
                <div class="priority">${quest.priority}</div>
            </div>
        `;

        attachQuestCardListeners(questElement, quest);
        return questElement;
    };

    const attachQuestCardListeners = (questElement, quest) => {
        const completeButton = questElement.querySelector('.complete-button');
        const detailsButton = questElement.querySelector('.details-button');
        const editButton = questElement.querySelector('.edit-button');

        completeButton.addEventListener("click",()=>{
            handleCompleteButton(questElement);
        })

        detailsButton.addEventListener("click",()=>{
            handleDetailsButton(questElement);
        })
    };

    const renderQuests = () => {
        const {questList}  = domElements;
        questList.textContent = "";
        
        const questLine = questLog.getCurrentQuestLine();
    
        const questsToBeRendered = questLine 
            ? questLog.getQuestsInQuestLine(questLine) 
            : questLog.getAllQuests();

        questsToBeRendered.forEach(quest => {
            questList.appendChild(createQuestCard(quest));
        });
    };

    const createQuestLineCard = (questLineName) => {
        const element = document.createElement("div");
        element.className = "quest-line-card";
        element.textContent = questLineName;
        element.addEventListener("click", () => {
            updateActiveQuestLine(element);
            renderQuests();
        });
        return element;
    };

    const renderQuestLines = () => {
        const { questLinesList } = domElements;
        questLinesList.textContent = "";
        
        Object.keys(questLog.getQuestLines()).forEach(questLineName => {
            const questLineElement = createQuestLineCard(questLineName);
            if (questLineName === questLog.getCurrentQuestLine()) {
                updateActiveQuestLine(questLineElement);
            }
            questLinesList.appendChild(questLineElement);
        });
    };
    
    const updateActiveQuestLine = (newActive) => {
        const currentActive = document.querySelector(".active");
        if(currentActive){
            currentActive.classList.remove("active");
        }
        newActive.classList.add("active");
        questLog.setCurrentQuestLine(newActive.textContent);
    };

    const allQuestRender = () => {
        const { allQuests } = domElements;

        allQuests.addEventListener("click",()=>{
            questLog.setCurrentQuestLine("All Quests");
            updateActiveQuestLine(allQuests);
            renderQuests();
        })
    }
    const findQuest = (questTitle) => {
        const currentQuestLine = questLog.getCurrentQuestLine();
        
        if (currentQuestLine) {
            const questsInLine = questLog.getQuestsInQuestLine(currentQuestLine);
            return questsInLine.find(quest => quest.title === questTitle);
        }
        
        return questLog.getAllQuests().find(quest => quest.title === questTitle);
    };

    const createDetailsModal = (quest) => {
        const modal = document.createElement('dialog');
        modal.className = 'details-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${quest.title}</h2>
                <div class="quest-info">
                    <p><strong>Description:</strong> ${quest.description}</p>
                    <p><strong>Due Date:</strong> ${quest.dueDate}</p>
                    <p><strong>Priority:</strong> ${quest.priority}</p>
                    <p><strong>Status:</strong> ${quest.complete ? 'Completed' : 'In Progress'}</p>
                </div>
                <button class="close-details-modal">Close</button>
            </div>
        `;

        const closeButton = modal.querySelector('.close-details-modal');
        closeButton.addEventListener('click', () => {
            modal.close();
            modal.remove(); 
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
                modal.remove();
            }
        });

        return modal;
    };

    const handleDetailsButton = (questElement) =>{
        const quest = findQuest(questElement.querySelector(".quest-title").textContent)
        if (!quest) {
            console.error('Quest not found:', questTitle);
            return;
        }

        const modal = createDetailsModal(quest);
        document.body.appendChild(modal);
        modal.showModal()
        
    }

    const handleCompleteButton = (questElement) =>{
        const quest = findQuest(questElement.querySelector(".quest-title").textContent)
        quest.complete = quest.complete? false : true;
        questElement.classList.toggle("completed")

    }

    return {
        allQuestRender,
        renderQuests,
        renderQuestLines,
        updateActiveQuestLine
    };
};