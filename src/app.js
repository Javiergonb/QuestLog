import { QuestLog } from './questLog';
import { QuestRenderer } from './questRenderer';
import { FormManager } from './formManager'
import "./styles.css";

const initializeApp = () => {
    const domElements = {
        allQuestsContainer: document.querySelector('all-quests-container'),
        allQuests: document.querySelector('#all-quests'),
        questList: document.querySelector('.quest-list'),
        questLinesList: document.querySelector('.quest-line-list'),
        newQuestButton: document.querySelector('.new-quest-button'),
        modal: document.querySelector('#new-quest-modal'),
        questForm: document.querySelector('#new-quest-form')
    };

    const questLog = (function(){ return QuestLog()})();
    const renderer = (function(){ return QuestRenderer(questLog, domElements)})();
    const formManager = (function(){ return FormManager(questLog, renderer)})();

    

    // Initialize event listeners
    formManager.initializeEventListeners();
    questLog.createQuestLine("Side");

    // Initial render
    renderer.allQuestRender();
    renderer.renderQuests();
    renderer.renderQuestLines();

    return { questLog, renderer, formManager };
};

export const app = initializeApp();