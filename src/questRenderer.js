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
                <button class="delete-button">X</button>
            </div>
        `;

        attachQuestCardListeners(questElement, quest);
        return questElement;
    };

    const attachQuestCardListeners = (questElement, quest) => {
        const completeButton = questElement.querySelector('.complete-button');
        const detailsButton = questElement.querySelector('.details-button');
        const editButton = questElement.querySelector('.edit-button');
        const deleteButton = questElement.querySelector('.delete-button')

        completeButton.addEventListener("click",() => { 
            handleCompleteButton(questElement);
        })

        detailsButton.addEventListener("click",() => {
            handleDetailsButton(questElement);
        })
        editButton.addEventListener("click",() => {
            handleEditButton(questElement);
        });
        deleteButton.addEventListener("click", () => {
            handleDeleteButton(questElement);
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

    const handleEditButton = (questElement) => {
        const quest = findQuest(questElement.querySelector(".quest-title").textContent);
        if (!quest) {
            console.error('Quest not found:', quest.title);
            return;
        }
    
        const modal = createEditModal(quest);
        document.body.appendChild(modal);
        modal.showModal();
    };

    const handleDeleteButton = (questElement) =>{
        const { questList } = domElements;
        const quest = findQuest(questElement.querySelector(".quest-title").textContent)
        questList.removeChild(questElement);
        questLog.removeQuest(quest);
        console.log(questLog.getAllQuests());
    } 

    const createEditModal = (quest) => {
        const modal = document.createElement('dialog');
        modal.className = 'edit-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Edit Quest</h2>
                <form class="edit-quest-form">
                    <label for="edit-title">Title:</label>
                    <input type="text" id="edit-title" name="title" value="${quest.title}" required>
                    
                    <label for="edit-description">Description:</label>
                    <textarea id="edit-description" name="description">${quest.description}</textarea>
                    
                    <label for="edit-due-date">Due Date:</label>
                    <input type="date" id="edit-due-date" name="dueDate" value="${quest.dueDate}">
                    
                    <label for="edit-priority">Priority:</label>
                    <select id="edit-priority" name="priority">
                        <option value="Low" ${quest.priority === 'Low' ? 'selected' : ''}>Low</option>
                        <option value="Medium" ${quest.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="High" ${quest.priority === 'High' ? 'selected' : ''}>High</option>
                    </select>
                    
                    <button type="submit">Save Changes</button>
                    <button type="button" class="close-edit-modal">Cancel</button>
                </form>
            </div>
        `;
    
        const closeButton = modal.querySelector('.close-edit-modal');
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
    
        const form = modal.querySelector('.edit-quest-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const updatedQuest = {
                title: formData.get('title'),
                description: formData.get('description'),
                dueDate: formData.get('dueDate'),
                priority: formData.get('priority'),
                complete: quest.complete
            };
            questLog.editQuest(quest.title, updatedQuest);
            modal.close();
            modal.remove();
            renderQuests(); 
        });
    
        return modal;
    };

    return {
        allQuestRender,
        renderQuests,
        renderQuestLines,
        updateActiveQuestLine
    };
};