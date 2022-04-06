/** a list of all selected verbs */
let verb = [];
/** a list of all selected pronouns */
let pronoun = [];
/** has a mode been chosen? */
let mode = false;
/** has a pronoun style been chosen? */
let pronounStyle = false;

window.onload = function(){
    //Automatically create checkboxes and labels for each verb in allVerbs
    let container = document.getElementById("center");
    for(let i = 0; i < Object.keys(allVerbs).length; i++){
        let tempCheck = container.appendChild(document.createElement(`input`));
        tempCheck.type = "checkbox"
        tempCheck.id = i + "verb";
        tempCheck.name = i + "verb";
        tempCheck.value = i + "";
        tempCheck.className = "verbCheck";
        let tempLabel = container.appendChild(document.createElement(`label`));
        tempLabel.htmlFor = i + "verb";
        tempLabel.className = "verb";
        container.appendChild(document.createElement(`br`));
    }
    container.appendChild(document.createElement(`br`));

    //Populate the verb labels to the checkboxes with allVerbs 0...x
    let verbLabels = document.getElementsByClassName("verb");
    for(let i = 0; i < verbLabels.length; i++){
        verbLabels[i].innerHTML = " " + allVerbs[i]["roots"];
    }

    //Populate the present tense labels to the checkboxes with each pronoun
    let presentLabels = document.getElementsByClassName("present");
    for(let i = 0; i < presentLabels.length; i++){
        presentLabels[i].innerHTML = pronouns[i];
    }

    //Populate the past tense labels to the checkboxes with each pronoun
    let pastLabels = document.getElementsByClassName("past");
    for(let i = 0; i < pastLabels.length; i++){
        pastLabels[i].innerHTML = pronouns[i];
    }

    //initiate collapsible drop downs
    let coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }

    for (let i = 0; i < coll.length; i++) {
        coll[i].nextElementSibling.style.display = "block";
    }


    //Set up event listeners to ensure the user selects a verb, tense, and mode
    //Each individual verb checkbox
    let verbs = document.getElementsByClassName("verbCheck");
    for(let i = 0; i < verbs.length; i++){
        verbs[i].addEventListener("click", pushIDtoVerbArray);
    }

    //Toggle all verbs button
    document.getElementById("toggleVerbs").addEventListener("click", () => {
        for(let i = 0; i < verbs.length; i++){
            triggerEvent(verbs[i], "click");
        }
    });

    //each pronoun checkbox
    let pronouns2 = document.getElementsByClassName("pronoun");
    for(let i = 0; i < pronouns2.length; i++){
        pronouns2[i].addEventListener("click", pushIDtoPronounArray);
    }

    //toggle pronoun buttons
    let pronounsPresentFirst = document.getElementsByClassName("presentFirst");
    let pronounsPresentSecond = document.getElementsByClassName("presentSecond");
    let pronounsPresentThird = document.getElementsByClassName("presentThird");
    let pronounsPastFirst = document.getElementsByClassName("pastFirst");
    let pronounsPastSecond = document.getElementsByClassName("pastSecond");
    let pronounsPastThird = document.getElementsByClassName("pastThird");
    document.getElementById("selectAllPresent").addEventListener("click", event =>{
        for(let i = 0; i < pronounsPresentFirst.length; i++){triggerEvent(pronounsPresentFirst[i], "click");}
        for(let i = 0; i < pronounsPresentSecond.length; i++){triggerEvent(pronounsPresentSecond[i], "click");}
        for(let i = 0; i < pronounsPresentThird.length; i++){triggerEvent(pronounsPresentThird[i], "click");}
    });
    document.getElementById("selectFirstPresent").addEventListener("click", event => {for(let i = 0; i < pronounsPresentFirst.length; i++){triggerEvent(pronounsPresentFirst[i], "click");}});
    document.getElementById("selectSecondPresent").addEventListener("click", event => {for(let i = 0; i < pronounsPresentSecond.length; i++){triggerEvent(pronounsPresentSecond[i], "click");}});
    document.getElementById("selectThirdPresent").addEventListener("click", event => {for(let i = 0; i < pronounsPresentThird.length; i++){triggerEvent(pronounsPresentThird[i], "click");}});
    document.getElementById("selectAllPast").addEventListener("click", event =>{
        for(let i = 0; i < pronounsPastFirst.length; i++){triggerEvent(pronounsPastFirst[i], "click");}
        for(let i = 0; i < pronounsPastSecond.length; i++){triggerEvent(pronounsPastSecond[i], "click");}
        for(let i = 0; i < pronounsPastThird.length; i++){triggerEvent(pronounsPastThird[i], "click");}
    });
    document.getElementById("selectFirstPast").addEventListener("click", event => {for(let i = 0; i < pronounsPastFirst.length; i++){triggerEvent(pronounsPastFirst[i], "click");}});
    document.getElementById("selectSecondPast").addEventListener("click", event => {for(let i = 0; i < pronounsPastSecond.length; i++){triggerEvent(pronounsPastSecond[i], "click");}});
    document.getElementById("selectThirdPast").addEventListener("click", event => {for(let i = 0; i < pronounsPastThird.length; i++){triggerEvent(pronounsPastThird[i], "click");}});
    

    //different study modes
    let modes = document.getElementsByClassName("mode");
    for(let i = 0; i < modes.length; i++){
        modes[i].addEventListener("click", event => {if(!mode){mode = true}});
    }

    //different pronoun styles
    let pronounStyles = document.getElementsByClassName("pronounStyle");
    for(let i = 0; i < pronounStyles.length; i++){
        pronounStyles[i].addEventListener("click", event => {if(!pronounStyle){pronounStyle = true}});
    }

    //If at least one verb, one pronoun, and one mode and pronoun style have been selected, begin studying
    let settings = document.getElementById("Settings");
    settings.addEventListener('submit', event => {
        if(verb.length == 0 || pronoun.length == 0 || !mode || !pronounStyle){
            event.preventDefault();
            console.log('Form submission cancelled.');
        }
      });
}

function pushIDtoVerbArray(event){
    if(verb.includes(event.target.id)){
        verb.splice(verb.indexOf(event.target.id), 1);
    }else{
        verb.push(event.target.id);
    }
}

function pushIDtoPronounArray(event){
    if(pronoun.includes(event.target.id)){
        pronoun.splice(pronoun.indexOf(event.target.id), 1);
    }else{
        pronoun.push(event.target.id);
    }
}

/** selects all checkboxes with a certain class name, used as onclick function */
function selectAll(className){
    let option = document.getElementsByClassName(className);
    if(option[0].checked){
        for(let i = 0; i < option.length; i++){
            option[i].checked = false;
        }
    }else{
        for(let i = 0; i < option.length; i++){
            option[i].checked = true;
        }
    }
}

function triggerEvent(el, type) {
    // IE9+ and other modern browsers
    if ('createEvent' in document) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on' + e.eventType, e);
    }
}