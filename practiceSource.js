/** stores each verb object and pronoun, used for both one of each and endless mode.
 *  data is stored in the form {[verb: verbObject, tenses: [index]]}
 */
let verbPronounObject = []
/** integer, current index of tenses */
let currentTense;
/** integer, current index of verbs */
let currentVerb;
/** object of parameter passed in from practiceSettings.html */
let parameters;
/** The total number of verb/pronoun objects at the start of reviewing */
let totalVerbPronoun;
/** the number of questions the user has gotten correct in endless mode */
let totalCorrect;
/** either 0 or 1, determines if the pronoun displayed will be a linguistic description or the arabic pronoun. 0 is arabic, 1 is linguistic */
let arabicLinguisticPronounRandom;
/** a dictionary storing various different patterns depending on the tense */
patternDictionary = new Map([
    [0, "◌ُ◌◌أَ"],
    [1, "◌ُ◌◌نَ"],
    [2, "◌ُ◌◌تَ"],
    [3, "تَ◌◌◌َانِ"],
    [4, "تَ◌◌◌ُونَ"],
    [5, "تَ◌◌◌ِينَ"],
    [6, "تَ◌◌◌َانِ"],
    [7, "تَ◌◌◌ْنَ"],
    [8, "◌ُ◌◌يَ"],
    [9, "يَ◌◌◌َانِ"],
    [10, "يَ◌◌◌ُونَ"],
    [11, "◌ُ◌◌تَ"],
    [12, "تَ◌◌◌َانِ"],
    [13, "يَ◌◌◌ْنَ"],

    [28, "تُ◌ْ◌◌"],
    [29, "نَا◌ْ◌◌"],
    [30, "تَ◌ْ◌◌"],
    [31, "تُمَا◌ْ◌◌"],
    [32, "تُمْ◌ْ◌◌"],
    [33, "تِ◌ْ◌◌"],
    [34, "تُمَا◌ْ◌◌"],
    [35, "تُنَّ◌ْ◌◌"],
    [36, "◌َ◌◌"],
    [37, "ا◌َ◌◌"],
    [38, "واْ◌ُ◌◌"],
    [39, "تْ◌َ◌◌"],
    [40, "تَا◌َ◌◌"],
    [41, "نَ◌ْ◌◌"],
]);

window.onload = function(){
    totalCorrect = 0;

    //gets all variables from the url
    parameters = new URLSearchParams(window.location.search);

    let pronouns = [];
    for(let i = 0; i < 14; i++){
        let temp = getParameter(i.toString() + "pres");
        if(temp){
            pronouns.push(temp);
        }
    }

    for(let i = 0; i < 14; i++){
        let temp = getParameter(i.toString() + "past");
        if(temp){
            pronouns.push(temp);
        }
    }

    for(let i = 0; i < Object.keys(allVerbs).length; i++){
        if(getParameter(i.toString() + "verb")){
            verbPronounObject.push({"verb": new Verb(allVerbs[i]["roots"].split(" "), allVerbs[i]["middle"], allVerbs[i]["regular"]), "pronouns": pronouns})
        }
    }

    totalVerbPronoun = verbPronounObject.length * verbPronounObject[0]["pronouns"].length;
    
    if(getParameter("pronounMode") == "desc"){
        document.getElementById("arabicpronoun").remove();
        spacers = document.getElementsByClassName("arabicPronounSpacer");
        for(let i = 0; i < spacers.length; i++){
            spacers[i].remove();
        }
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

    //use this to avoid an if statement in each switch statement
    let workingTense = currentTense;
    let workingVerb = verbPronounObject[currentVerb]["verb"];

    let correctAnswer = workingVerb.verbDictionary.get(workingTense);

    // if(gradeAnswer(answerText, correctAnswer)){
    if(gradeAnswer(answerText, correctAnswer)){
        totalCorrect++;
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

    // document.getElementById("arabicpronoun").innerHTML = "";

    let pronounStyle = getParameter("pronounMode");
    switch(pronounStyle){
        case "arabic":
            displayArabicOrLinguisticPronoun();
            break;
        case "mixed":
            displayArabicOrLinguisticPronoun();
            break;
    }

}

/** prints an explanation to screen as to why a verb conjugation is the way it is  */
function explain(){
    document.getElementById("explanation").style.display = "block";
    let explanation = "<br>"

    //use this to avoid an if statement in each switch statement
    let workingTense = currentTense;
    let workingVerb = verbPronounObject[currentVerb]["verb"];

    if(workingTense >= 0 && workingTense <= 13){
        if(workingVerb.isRegular){
            explanation += `Recall the present tense stem is formed with the following pattern: <bigArabic>◌◌◌ْ</bigArabic>. 
            The middle vowel is <bigArabic>${"◌" + workingVerb.middleVowel}</bigArabic>, thus the present tense stem of <bigArabic>${workingVerb.printRoots()}</bigArabic> is <bigArabic>${workingVerb.presentTenseStem}</bigArabic>. 
            The ${conjugationsNoBullets[workingTense]} form takes the prefix/suffix: <bigArabic>${patternDictionary.get(currentTense)}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.verbDictionary.get(currentTense)}</bigArabic>.`;
        }
    }else{
        if(workingVerb.isRegular){
            explanation += `Recall the past tense stem is formed in the following pattern: <bigArabic>◌◌َ◌َ</bigArabic>, 
            thus the past tense stem of <bigArabic>${workingVerb.printRoots()}</bigArabic> is <bigArabic>${workingVerb.pastTenseStem + workingVerb.roots[2]}</bigArabic>. 
            The ${conjugationsNoBullets[workingTense]} form takes the suffix: <bigArabic>${patternDictionary.get(currentTense)}</bigArabic>. Thus the correct conjugation of the verb is <bigArabic>${workingVerb.verbDictionary.get(currentTense)}</bigArabic>.`;
        }
    }


    explanation += "<br><br>";
    document.getElementById("explanation").innerHTML = explanation;
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
    verbPronounObject[currentVerb]["pronouns"].splice(verbPronounObject[currentVerb]["pronouns"].indexOf(currentTense.toString()), 1);
    if(verbPronounObject[currentVerb]["pronouns"].length == 0){
        verbPronounObject.splice(currentVerb, 1);
    }
    totalCorrect++;
    move();
    next();
}

/** shuffles current verb and current tense, turns off explanation and solution */
function next(){

    if(getParameter("endless?") == "endless"){
        document.getElementById("numCorrect").innerHTML = "Number correct: " + totalCorrect + "<br>";
    }else if(getParameter("endless?") == "notEndless"){
        //next() is used to initialize the window, this seems like the most effective way to stop
        //the program from trying to delete a tense that has not been tested yet
        try{
            if(document.getElementById("correct").innerHTML == "Correct!"){
                verbPronounObject[currentVerb]["pronouns"].splice(verbPronounObject[currentVerb]["pronouns"].indexOf(currentTense.toString()), 1);
                if(verbPronounObject[currentVerb]["pronouns"].length == 0){
                    verbPronounObject.splice(currentVerb, 1);
                }
            }
        }catch (err){
            console.log("error");
        }

        if(verbPronounObject.length == 0){
            console.log("finished");
            window.location.href = "finished.html"
            return;
        }

        move();
    }

    let tempNewVerb = Math.floor(Math.random() * verbPronounObject.length);
    let tempNewTense = parseInt(verbPronounObject[tempNewVerb]["pronouns"][Math.floor(Math.random() * verbPronounObject[tempNewVerb]["pronouns"].length)]);
    // disallow duplicates unless there is only one verb-pronoun pair remaining
    while(tempNewVerb == currentVerb && tempNewTense == currentTense && (verbPronounObject.length > 1 || verbPronounObject[currentVerb]["pronouns"].length > 1)){
        console.log("re shuffle");
        tempNewVerb = Math.floor(Math.random() * verbPronounObject.length);
        tempNewTense = parseInt(verbPronounObject[tempNewVerb]["pronouns"][Math.floor(Math.random() * verbPronounObject[tempNewVerb]["pronouns"].length)]);
    }
    currentVerb = tempNewVerb;
    currentTense = tempNewTense;

    document.getElementById("prompt").innerHTML = "";
    if(getParameter("pronounMode") == "arabic" || getParameter("pronounMode") == "mixed"){
        document.getElementById("arabicpronoun").innerHTML = "";
    }

    document.getElementById("answer").placeholder = verbPronounObject[currentVerb]["verb"].printRoots();
    let pronounStyle = getParameter("pronounMode");
    switch(pronounStyle){
        case "desc":
            document.getElementById("prompt").innerHTML = "Conjugate " + verbPronounObject[currentVerb]["verb"].printRoots() + " in the following tense:" + conjugations[currentTense];
            break;
        case "arabic":
            document.getElementById("prompt").innerHTML = "Conjugate " + verbPronounObject[currentVerb]["verb"].printRoots() + " in the "
            if(currentTense <= 13){
                document.getElementById("prompt").innerHTML += "present tense"
            }else if(currentTense <= 41){
                document.getElementById("prompt").innerHTML += "past tense"
            }
            document.getElementById("arabicpronoun").innerHTML = arabicPronouns[currentTense % 14];
            break;
        case "both":
            document.getElementById("prompt").innerHTML = "Conjugate " + verbPronounObject[currentVerb]["verb"].printRoots() + " in the following tense:" + conjugations[currentTense];
            document.getElementById("arabicpronoun").innerHTML = arabicPronouns[currentTense % 14];
            break;
        case "mixed":
            arabicLinguisticPronounRandom = Math.floor(Math.random() * 2);
            console.log(arabicLinguisticPronounRandom)
            displayArabicOrLinguisticPronoun();
            break;
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
}

/** determines if the arabic or linguistic description of the pronoun should be displayed, and then writes it to the screen */
function displayArabicOrLinguisticPronoun(){
    if(arabicLinguisticPronounRandom > 0){
        document.getElementById("prompt").innerHTML = "Conjugate " + verbPronounObject[currentVerb]["verb"].printRoots() + " in the following tense:" + conjugations[currentTense];
        spacers = document.getElementsByClassName("arabicPronounSpacer");
        for(let i = 0; i < spacers.length; i++){
            spacers[i].style.display = "none";
        }
    }else{
        document.getElementById("prompt").innerHTML = "Conjugate " + verbPronounObject[currentVerb]["verb"].printRoots() + " in the "
        if(currentTense <= 13){
            document.getElementById("prompt").innerHTML += "present tense"
        }else if(currentTense <= 41){
            document.getElementById("prompt").innerHTML += "past tense"
        }
        document.getElementById("arabicpronoun").innerHTML = arabicPronouns[currentTense % 14];
    }
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
        elem.style.width = (totalCorrect / totalVerbPronoun) * 100 + "%";
        elem.innerHTML = totalCorrect + "/" + totalVerbPronoun;
      }
    }
  }
}