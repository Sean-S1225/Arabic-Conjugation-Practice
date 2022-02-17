/** array of all tenses chosen by user, list of integers, indices of conjugations */
let tenses = [];
/** integer, current index of tenses */
let currentTense;
/** array of all verbs chosen by the user, list of integers, indices of allVerbs */
let verbs = [];
/** integer, current index of verbs */
let currentVerb;
/** object of parameter passed in from practiceSettings.html */
let parameters;
/** When the user selects the one of each setting, this dictionary is populated with all the
 * possible pronoun-verb pairs, then popped one by one as they review.
 * This is a nested dictionary, with the structure {index: {verb: "x x x", pronoun: "____"}}
 */
let oneOfEachDict = {};
/** The index of the current verb/pronoun pair chosen from oneOfEachDict */
let currentVerbPronoun;
/** The total number of verb/pronoun objects at the start of reviewing */
let totalVerbPronoun;

window.onload = function(){
    //gets all variables from the url
    parameters = new URLSearchParams(window.location.search);

    if(getParameter("endless?") == "endless"){
        //sees which verbs have been selected and pushes them to the working array
        for(let i = 0; i < Object.keys(allVerbs).length; i++){
            if(getParameter(i.toString() + "verb")){
                verbs.push(new Verb(allVerbs[i]["roots"].split(" "), allVerbs[i]["middle"], allVerbs[i]["regular"]));
            }
        }

        //pushes selected present tense pronouns to tenses
        for(let i = 0; i < 14; i++){
            let temp = getParameter(i.toString() + "pres");
            if(temp){
                tenses.push(temp);
            }
        }

        //pushes selected past tense pronouns to tenses
        for(let i = 0; i < 14; i++){
            let temp = getParameter(i.toString() + "past");
            if(temp){
                tenses.push(temp);
            }
        }
    }else if(getParameter("endless?") == "notEndless"){
        for(let i = 0; i < Object.keys(allVerbs).length; i++){
            if(getParameter(i.toString() + "verb")){
                for(let j = 0; j <= 13; j++){
                    let temp = getParameter(j.toString() + "pres");
                    if(temp){
                        let tempObj = {};
                        tempObj["verb"] = new Verb(allVerbs[i]["roots"].split(" "), allVerbs[i]["middle"], allVerbs[i]["regular"]);
                        tempObj["pronoun"] = temp;
                        oneOfEachDict[Object.keys(oneOfEachDict).length] = tempObj;
                    }
                }
                for(let j = 28; j <= 41; j++){
                    let temp = getParameter((j - 28).toString() + "past");
                    if(temp){
                        let tempObj = {};
                        tempObj["verb"] = new Verb(allVerbs[i]["roots"].split(" "), allVerbs[i]["middle"], allVerbs[i]["regular"]);
                        tempObj["pronoun"] = temp;
                        oneOfEachDict[Object.keys(oneOfEachDict).length] = tempObj;
                    }
                }
            }
        }
        totalVerbPronoun = Object.keys(oneOfEachDict).length;
    }
    
    //initializes the window for testing
    next();
}

/** returns the parameter contained in the url given the string name */
function getParameter(parameterName){
    return parameters.get(parameterName);
}

function check(){
    let answer = document.getElementById("answer");
    let answerText = answer.value;

    let correctAnswer = "";

    //use this to avoid an if statement in each switch statement
    let workingTense;
    let workingVerb;
    if(getParameter("endless?") == "endless"){
        workingTense = currentTense;
        workingVerb = verbs[currentVerb];
    }else if(getParameter("endless?") == "notEndless"){
        workingTense = parseInt(oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]]["pronoun"]);
        workingVerb = oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]]["verb"];
    }

    switch(workingTense){
        case 0:
            correctAnswer = workingVerb.ssi;
            break;
        case 1:
            correctAnswer = workingVerb.spi;
            break;
        case 2:
            correctAnswer = workingVerb.nmsi;
            break;
        case 3:
            correctAnswer = workingVerb.nmdi;
            break;
        case 4:
            correctAnswer = workingVerb.nmpi;
            break;
        case 5:
            correctAnswer = workingVerb.nfsi;
            break;
        case 6:
            correctAnswer = workingVerb.nfdi;
            break;
        case 7:
            correctAnswer = workingVerb.nfpi;
            break;
        case 8:
            correctAnswer = workingVerb.rmsi;
            break;
        case 9:
            correctAnswer = workingVerb.rmdi;
            break;
        case 10:
            correctAnswer = workingVerb.rmpi;
            break;
        case 11:
            correctAnswer = workingVerb.rfsi;
            break;
        case 12:
            correctAnswer = workingVerb.rfdi;
            break;
        case 13:
            correctAnswer = workingVerb.rfpi;
            break;
        case 28:
            correctAnswer = workingVerb.ssp;
            break;
        case 29:
            correctAnswer = workingVerb.spp;
            break;
        case 30:
            correctAnswer = workingVerb.nmsp;
            break;
        case 31:
            correctAnswer = workingVerb.nmdp;
            break;
        case 32:
            correctAnswer = workingVerb.nmpp;
            break;
        case 33:
            correctAnswer = workingVerb.nfsp;
            break;
        case 34:
            correctAnswer = workingVerb.nfdp;
            break;
        case 35:
            correctAnswer = workingVerb.nfpp;
            break;
        case 36:
            correctAnswer = workingVerb.rmsp;
            break;
        case 37:
            correctAnswer = workingVerb.rmdp;
            break;
        case 38:
            correctAnswer = workingVerb.rmpp;
            break;
        case 39:
            correctAnswer = workingVerb.rfsp;
            break;
        case 40:
            correctAnswer = workingVerb.rfdp;
            break;
        case 41:
            correctAnswer = workingVerb.rfpp;
            break;
    }

    if(gradeAnswer(answerText, correctAnswer)){
        document.getElementById("correct").style.color = "Green";
        document.getElementById("correct").innerHTML = "Correct!";
    }else{
        document.getElementById("correct").style.color = "Red";
        document.getElementById("correct").innerHTML = "Incorrect";
        document.getElementById("override").style.display = "block";
    }

    answer.value = "";
    document.getElementById("solutionText").innerHTML = "Solution:";
    document.getElementById("solution").innerHTML = correctAnswer;
    document.getElementById("youSaid").innerHTML = "You said: " + answerText;

    document.getElementById("explain").style.display = "block";
    document.getElementById("next").style.display = "block";
    document.getElementById("correct").style.display = "block";

    document.getElementById("solutionText").style.display = "block";
    document.getElementById("solution").style.display = "block";
    document.getElementById("youSaid").style.display = "block";

    document.getElementById("answer").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
}

/** prints an explanation to screen as to why a verb conjugation is the way it is  */
function explain(){
    document.getElementById("explanation").style.display = "block";
    let explanation = "<br>"

    //use this to avoid an if statement in each switch statement
    let workingTense;
    let workingVerb;
    if(getParameter("endless?") == "endless"){
        workingTense = currentTense;
        workingVerb = verbs[currentVerb];
    }else if(getParameter("endless?") == "notEndless"){
        workingTense = parseInt(oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]]["pronoun"]);
        workingVerb = oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]]["verb"];
    }

    if(workingTense >= 0 && workingTense <= 13){
        if(workingVerb.isRegular){
            explanation += `Recall the present tense stem is formed with the following pattern: <bigArabic>◌◌◌ْ</bigArabic>. 
            The middle vowel is <bigArabic>${"◌" + workingVerb.middleVowel}</bigArabic>, thus the present tense stem of <bigArabic>${workingVerb.printRoots()}</bigArabic> is <bigArabic>${workingVerb.presentTenseStem}</bigArabic>. 
            The ${conjugationsNoBullets[workingTense]} form takes the prefix/suffix: `
            switch(workingTense){
                case 0:
                    explanation += `${"<bigArabic>◌ُ◌◌أَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.ssi}</bigArabic>.`;
                    break;
                case 1:
                    explanation += `${"<bigArabic>◌ُ◌◌نَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.spi}</bigArabic>.`;
                    break;
                case 2:
                    explanation += `${"<bigArabic>◌ُ◌◌تَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nmsi}</bigArabic>.`;
                    break;
                case 3:
                    explanation += `${"<bigArabic>تَ◌◌◌َانِ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nmdi}</bigArabic>.`;
                    break;
                case 4:
                    explanation += `${"<bigArabic>تَ◌◌◌ُونَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nmpi}</bigArabic>.`;
                    break;
                case 5:
                    explanation += `${"<bigArabic>تَ◌◌◌ِينَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nfsi}</bigArabic>.`;
                    break;
                case 6:
                    explanation += `${"<bigArabic>تَ◌◌◌َانِ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nfdi}</bigArabic>.`;
                    break;
                case 7:
                    explanation += `${"<bigArabic>تَ◌◌◌ْنَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nfpi}</bigArabic>.`;
                    break;
                case 8:
                    explanation += `${"<bigArabic>◌ُ◌◌يَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rmsi}</bigArabic>.`;
                    break;
                case 9:
                    explanation += `${"<bigArabic>يَ◌◌◌َانِ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rmdi}</bigArabic>.`;
                    break;
                case 10:
                    explanation += `${"<bigArabic>يَ◌◌◌ُونَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rmpi}</bigArabic>.`;
                    break;
                case 11:
                    explanation += `${"<bigArabic>◌ُ◌◌تَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rfsi}</bigArabic>.`;
                    break;
                case 12:
                    explanation += `${"<bigArabic>تَ◌◌◌َانِ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rfdi}</bigArabic>.`;
                    break;
                case 13:
                    explanation += `${"<bigArabic>يَ◌◌◌ْنَ</bigArabic>"}. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rfpi}</bigArabic>.`;
                    break;
            }
        }
    }else{
        if(workingVerb.isRegular){
            explanation += `Recall the past tense stem is formed in the following pattern: <bigArabic>◌◌َ◌َ</bigArabic>, 
            thus the past tense stem of <bigArabic>${workingVerb.printRoots()}</bigArabic> is <bigArabic>${workingVerb.pastTenseStem + workingVerb.roots[2]}</bigArabic>. The ${conjugationsNoBullets[workingTense]} form takes the suffix:`;
            switch(workingTense){
                case 14:
                    explanation += `<bigArabic>${"تُ◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.ssp}</bigArabic>.`;
                    break;
                case 15:
                    explanation += `<bigArabic>${"نَا◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.spp}</bigArabic>.`;
                    break;
                case 16:
                    explanation += `<bigArabic>${"تَ◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nmsp}</bigArabic>.`;
                    break;
                case 17:
                    explanation += `<bigArabic>${"تُمَا◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nmdp}</bigArabic>.`;
                    break;
                case 18:
                    explanation += `<bigArabic>${"تُمْ◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nmpp}</bigArabic>.`;
                    break;
                case 19:
                    explanation += `<bigArabic>${"تِ◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nfsp}</bigArabic>.`;
                    break;
                case 20:
                    explanation += `<bigArabic>${"تُمَا◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nfdp}</bigArabic>.`;
                    break;
                case 21:
                    explanation += `<bigArabic>${"تُنَّ◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.nfpp}</bigArabic>.`;
                    break;
                case 22:
                    explanation += `<bigArabic>${"◌َ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rmsp}</bigArabic>.`;
                    break;
                case 23:
                    explanation += `<bigArabic>${"ا◌َ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rmdp}</bigArabic>.`;
                    break;
                case 24:
                    explanation += `<bigArabic>${"واْ◌ُ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rmpp}</bigArabic>.`;
                    break;
                case 25:
                    explanation += `<bigArabic>${"تْ◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rfsp}</bigArabic>.`;
                    break;
                case 26:
                    explanation += `<bigArabic>${"تَا◌َ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rfdp}</bigArabic>.`;
                    break;
                case 27:
                    explanation += `<bigArabic>${"نَ◌ْ◌◌"}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.rfpp}</bigArabic>.`;
                    break;
            }
        }
    }

    explanation += "<br><br>"
    document.getElementById("explanation").innerHTML = explanation
}

function gradeAnswer(userAnswer, correctAnswer){
    if(userAnswer == correctAnswer){
        return true;
    }else if(correctAnswer.includes("ّ")){

        //shaddah must be with fathah, dammah, or kasrah
        correctAnswer = correctAnswer.replaceAll("َّ", "shaddahFathah");
        correctAnswer = correctAnswer.replaceAll("َّ", "shaddahFathah");
        userAnswer = userAnswer.replaceAll("َّ", "shaddahFathah");
        userAnswer = userAnswer.replaceAll("َّ", "shaddahFathah");

        correctAnswer = correctAnswer.replaceAll("ُّ", "shaddahDammah");
        correctAnswer = correctAnswer.replaceAll("ُّ", "shaddahDammah");
        userAnswer = userAnswer.replaceAll("ُّ", "shaddahDammah");
        userAnswer = userAnswer.replaceAll("ُّ", "shaddahDammah");

        correctAnswer = correctAnswer.replaceAll("ِّ", "shaddahKasrah");
        correctAnswer = correctAnswer.replaceAll("ِّ", "shaddahKasrah");
        userAnswer = userAnswer.replaceAll("ِّ", "shaddahKasrah");
        userAnswer = userAnswer.replaceAll("ِّ", "shaddahKasrah");

        console.log(userAnswer, correctAnswer);

        return (userAnswer == correctAnswer);
    }
}

/** overrides the system telling the user they were incorrect */
function override(){
    delete oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]];
    next();
}

/** shuffles current verb and current tense, turns off explanation and solution */
function next(){
    if(getParameter("endless?") == "endless"){
        //disallow duplicates in a row unless there is a single verb and tense selected
        let tempNewVerb = Math.floor(Math.random() * verbs.length);
        let tempNewTense = parseInt(tenses[Math.floor(Math.random() * tenses.length)]);
        while(tempNewVerb == currentVerb && tempNewTense == currentTense && (verbs.length > 1 || tenses.length > 1)){
            console.log("re shuffle");
            tempNewVerb = Math.floor(Math.random() * verbs.length);
            tempNewTense = parseInt(tenses[Math.floor(Math.random() * tenses.length)]);
        }
        currentVerb = tempNewVerb;
        currentTense = tempNewTense;

        document.getElementById("answer").placeholder = verbs[currentVerb].printRoots();
        document.getElementById("prompt").innerHTML = "Conjugate " + verbs[currentVerb].printRoots() + " in the following tense:" + conjugations[tenses.indexOf(currentTense.toString())];
    }else if(getParameter("endless?") == "notEndless"){
        //next() is used to initialize the window, this seems like the most effective way to stop
        //the program from trying to delete a tense that has not been tested yet
        try{
            if(document.getElementById("correct").innerHTML == "Correct!"){
                delete oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]];
            }
        }catch (err){
            console.log("error");
        }

        if(Object.keys(oneOfEachDict).length == 0){
            console.log("finished");
            window.location.href = "finished.html"
            return;
        }

        let tempCurrentVerbPronoun = Math.floor(Math.random() * Object.keys(oneOfEachDict).length);
        while(currentVerbPronoun == tempCurrentVerbPronoun && Object.keys(oneOfEachDict).length > 1){
            console.log("re shuffle");
            tempCurrentVerbPronoun = Math.floor(Math.random() * Object.keys(oneOfEachDict).length);
        }
        currentVerbPronoun = tempCurrentVerbPronoun;
        document.getElementById("answer").placeholder = oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]]["verb"].printRoots();
        document.getElementById("prompt").innerHTML = "Conjugate " + oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]]["verb"].printRoots() + " in the following tense:" + conjugations[oneOfEachDict[Object.keys(oneOfEachDict)[currentVerbPronoun]]["pronoun"]];
        // document.getElementById("progress").innerHTML = (1 + totalVerbPronoun - Object.keys(oneOfEachDict).length).toString() + "/" + totalVerbPronoun.toString();

        move();
    }

    document.getElementById("correct").style.display = "none";

    document.getElementById("explain").style.display = "none";
    document.getElementById("explanation").style.display = "none";
    document.getElementById("next").style.display = "none";
    document.getElementById("override").style.display = "none";

    document.getElementById("solutionText").style.display = "none";
    document.getElementById("solution").style.display = "none";
    document.getElementById("youSaid").style.display = "none";

    document.getElementById("answer").style.display = "block";    
    document.getElementById("submitButton").style.display = "block";

    // document.getElementById("test").innerHTML = 
    // `I ${verb.ssp} / ${verb.ssi}<br>
    // You (m, 1) ${verb.nmsp} / ${verb.nmsi}<br>
    // You (f, 1) ${verb.nfsp} / ${verb.nfsi}<br>
    // You (m, 2) ${verb.nmdp} / ${verb.nmdi}<br>
    // You (f, 2) ${verb.nfdp} / ${verb.nfdi}<br>
    // He ${verb.rmsp} / ${verb.rmsi}<br>
    // She ${verb.rfsp} / ${verb.rfsi}<br>
    // They (m, 2) ${verb.rmdp} / ${verb.rmdi}<br>
    // They (f, 2) ${verb.rfdp} / ${verb.rfdi}<br>
    // We ${verb.spp} / ${verb.spi}<br>
    // You (m, 3+) ${verb.nmpp} / ${verb.nmpi}<br>
    // You (f, 3+) ${verb.nfpp} / ${verb.nfpi}<br>
    // They (m, 3+) ${verb.rmpp} / ${verb.rmpi}<br>
    // They (f, 3+) ${verb.rfpp} / ${verb.rfpi}<br>`;
}

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("progressBar");
    var width = totalVerbPronoun;
    var id = setInterval(frame, 0.01);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = ((totalVerbPronoun - Object.keys(oneOfEachDict).length + 1) / totalVerbPronoun) * 100 + "%";
        elem.innerHTML = (totalVerbPronoun - Object.keys(oneOfEachDict).length + 1) + "/" + totalVerbPronoun;
      }
    }
  }
}