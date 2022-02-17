//Note on abbreviations
// s = first (1st)
// n = second (2nd)
// r = third (3rd)

// m = masculine
// f = feminine

// s = singular
// d = dual
// p = plural

// p = past tense
// i = imperfect tense

// assumed affirmative unless otherwise specified
// n = negative (لن\لم)
// n2 = negative (ما)

//e.g. rfdp = 3rd person feminine dual past tense
//e.g. nms = 2nd person masculine singular

class Verb{
    constructor(roots, middleVowel, isRegular){
        this.roots = roots;
        this.middleVowel = middleVowel;
        this.isRegular = isRegular;
        if(this.isRegular){
            this.presentTenseStem = this.roots[0] + "ْ" + this.roots[1] + this.middleVowel + this.roots[2];
            /**first person singular indefinite*/
            this.ssi = "أَ" + this.presentTenseStem + "ُ";
            /**first person plural indefinite*/
            this.spi = "نَ" + this.presentTenseStem + "ُ";
            /**second person masculine singular indefinite*/
            this.nmsi = "تَ" + this.presentTenseStem + "ُ";
            /**second person masculine dual indefinite*/
            this.nmdi = "تَ" + this.presentTenseStem + "َانِ";
            /**second person masculine plural indefinite*/
            this.nmpi = "تَ" + this.presentTenseStem + "ُونَ";
            /**second person feminine singular indefinite*/
            this.nfsi = "تَ" + this.presentTenseStem + "ِينَ";
            /**second person feminine dual indefinite*/
            this.nfdi = "تَ" + this.presentTenseStem + "َانِ";
            /**second person feminine plural indefinite*/
            this.nfpi = "تَ" + this.presentTenseStem + "ْنَ";
            /** third person masculine singular indefinite */
            this.rmsi = "يَ" + this.presentTenseStem + "ُ";
            /** third person masculine dual indefinite */
            this.rmdi = "يَ" + this.presentTenseStem + "َانِ";
            /** third person masculine plural indefinite */
            this.rmpi = "يَ" + this.presentTenseStem + "ُونَ";
            /** third person feminine singular indefinite */
            this.rfsi = "تَ" + this.presentTenseStem + "ُ";
            /** third person feminine dual indefinite */
            this.rfdi = "تَ" + this.presentTenseStem + "َانِ";
            /** third person feminine plural indefinite */
            this.rfpi = "يَ" + this.presentTenseStem + "ْنَ";

            this.pastTenseStem = this.roots[0] + "َ" + this.roots[1] + "َ";
            /**first person singular past*/
            this.ssp = this.pastTenseStem + this.roots[2] + "ْ" + "تُ";
            /**first person plural past*/
            this.spp = this.pastTenseStem + this.roots[2] + "ْ" + "نَا";
            /**second person masculine singular past*/
            this.nmsp = this.pastTenseStem + this.roots[2] + "ْ" + "تَ";
            /**second person masculine dual past*/
            this.nmdp = this.pastTenseStem + this.roots[2] + "ْ" + "تُمَا";
            /**second person masculine plural past*/
            this.nmpp = this.pastTenseStem + this.roots[2] + "ْ" + "تُمْ";
            /**second person feminine singular past*/
            this.nfsp = this.pastTenseStem + this.roots[2] + "ْ" + "تِ";
            /**second person feminine dual past*/
            this.nfdp = this.pastTenseStem + this.roots[2] + "ْ" + "تُمَا";
            /**second person feminine plural past*/
            this.nfpp = this.pastTenseStem + this.roots[2] + "ْتُنَّ";
            /** third person masculine singular past */
            this.rmsp = this.pastTenseStem + this.roots[2] + "َ";
            /** third person masculine dual past */
            this.rmdp = this.pastTenseStem + this.roots[2] + "َا";
            /** third person masculine plural past */
            this.rmpp = this.pastTenseStem + this.roots[2] + "ُواْ";
            /** third person feminine singular past */
            this.rfsp = this.pastTenseStem + this.roots[2] + "َتْ";
            /** third person feminine dual past */
            this.rfdp = this.pastTenseStem + this.roots[2] + "َتَا";
            /** third person feminine plural past */
            this.rfpp = this.pastTenseStem + this.roots[2] + "ْنَ";

            /**first person singular present negative*/
            this.ssin = "لا " + this.ssi;
            /**first person plural present negative*/
            this.spin = "لا " + this.spi;
            /**second person masculine singular present negative*/
            this.nmsin = "لا " + this.nmsi;
            /**second person masculine dual present negative*/
            this.nmdin = "لا " + this.nmdi;
            /**second person masculine plural present negative*/
            this.nmpin = "لا " + this.nmpi;
            /**second person feminine singular present negative*/
            this.nfsin = "لا " + this.nfsi;
            /**second person feminine dual present negative*/
            this.nfdin = "لا " + this.nfdi;
            /**second person feminine plural present negative*/
            this.nfpin = "لا " + this.nfpi;
            /** third person masculine singular present negative */
            this.rmsin = "لا " + this.rmsi;
            /** third person masculine dual present negative */
            this.rmdin = "لا " + this.rmdi;
            /** third person masculine plural present negative */
            this.rmpin = "لا " + this.rmpi;
            /** third person feminine singular present negative */
            this.rfsin = "لا " + this.rfsi;
            /** third person feminine dual present negative */
            this.rfdin = "لا " + this.rfdi;
            /** third person feminine plural present negative */
            this.rfpin = "لا " + this.rfpi;
        }
    }

    printRoots(){
        return(`${this.roots[0]} ${this.roots[1]} ${this.roots[2]}`)
    }
}