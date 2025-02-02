import { Quest } from "./quest";
export function FormManager(questLog, renderer){
    const elements = {
        modal: document.querySelector("#new-quest-modal"),
        plusButton: document.querySelector(".new-quest-button"),
        questForm: document.querySelector("#new-quest-form"),
        questLineForm: document.querySelector("#create-questline-form"),
        cancelFormButton: document.querySelector("#cancel-form"),
        cancelQuestLineForm: document.querySelector("#cancel-modal-questline"),
        createQuestTab: document.querySelector("#create-quest-tab"),
        createQuestLineTab: document.querySelector("#create-questline-tab"),
        questFormContainer: document.querySelector("#create-quest-form-container"),
        questLineFormContainer: document.querySelector("#create-questline-form-container")
    };

    const handleModalOpen = () => {
        elements.modal.showModal();
    };

    const handleModalClose = () => {
        elements.modal.close();
    };

    const handleQuestSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            dueDate: document.querySelector("#dueDate").value,
            priority: document.querySelector("#priority").value
        };

        console.log(formData.title)

        const newQuest = Quest(
            formData.title,
            formData.description,
            formData.dueDate,
            formData.priority
        );

        questLog.addQuest(newQuest);
        renderer.renderQuests();
        
        elements.questForm.reset();
        handleModalClose();
    };

    const handleQuestLineSubmit = (e) => {
        e.preventDefault();

        const questLineName = document.querySelector("#questline-name").value;

        questLog.createQuestLine(questLineName);
        questLog.setCurrentQuestLine(questLineName);
        
        renderer.renderQuestLines();
        renderer.renderQuests();
        
        elements.questLineForm.reset();
        handleModalClose();
    };

    const switchToQuestTab = () => {
        elements.questFormContainer.classList.remove("hidden");
        elements.questLineFormContainer.classList.add("hidden");
        elements.createQuestTab.classList.add("current-tab");
        elements.createQuestLineTab.classList.remove("current-tab");
    };

    const switchToQuestLineTab = () => {
        elements.questFormContainer.classList.add("hidden");
        elements.questLineFormContainer.classList.remove("hidden");
        elements.createQuestTab.classList.remove("current-tab");
        elements.createQuestLineTab.classList.add("current-tab");
    };

    const initializeEventListeners = () => {
        // Modal controls
        elements.plusButton.addEventListener("click", handleModalOpen);
        elements.cancelFormButton.addEventListener("click", handleModalClose);
        elements.cancelQuestLineForm.addEventListener("click", handleModalClose);

        // Form submissions
        elements.questForm.addEventListener("submit", handleQuestSubmit);
        elements.questLineForm.addEventListener("submit", handleQuestLineSubmit);

        // Tab switching
        elements.createQuestTab.addEventListener("click", switchToQuestTab);
        elements.createQuestLineTab.addEventListener("click", switchToQuestLineTab);
    };

    return {
        initializeEventListeners
    };
};