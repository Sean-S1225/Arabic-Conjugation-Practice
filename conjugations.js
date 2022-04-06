let allVerbs = {
    0: {roots: "ف ع ل", middle: "َ", regular: true},
    1: {roots: "ك ت ب", middle: "ُ", regular: true},
    2: {roots: "ج ل س", middle: "ِ", regular: true},
    3: {roots: "خ ر ج", middle: "ُ", regular: true},
    4: {roots: "ح ص ل", middle: "ُ", regular: true}
}

let conjugations = {
    0: '<ul><li>First Person</li> <li>Singular</li> <li>Imperfect</li></ul>',
    1: '<ul><li>First Person</li> <li>Plural</li> <li>Imperfect</li></ul>',
    2: '<ul><li>Second Person</li> <li>Masculine</li> <li>Singular</li> <li>Imperfect</li></ul>',
    3: '<ul><li>Second Person</li> <li>Masculine</li> <li>Dual</li> <li>Imperfect</li></ul>',
    4: '<ul><li>Second Person</li> <li>Masculine</li> <li>Plural</li> <li>Imperfect</li></ul>',
    5: '<ul><li>Second Person</li> <li>Feminine</li> <li>Singular</li> <li>Imperfect</li></ul>',
    6: '<ul><li>Second Person</li> <li>Feminine</li> <li>Dual</li> <li>Imperfect</li></ul>',
    7: '<ul><li>Second Person</li> <li>Feminine</li> <li>Plural</li> <li>Imperfect</li></ul>',
    8: '<ul><li>Third Person</li> <li>Masculine</li> <li>Singular</li> <li>Imperfect</li></ul>',
    9: '<ul><li>Third Person</li> <li>Masculine</li> <li>Dual</li> <li>Imperfect</li></ul>',
    10: '<ul><li>Third Person</li> <li>Masculine</li> <li>Plural</li> <li>Imperfect</li></ul>',
    11: '<ul><li>Third Person</li> <li>Feminine</li> <li>Singular</li> <li>Imperfect</li></ul>',
    12: '<ul><li>Third Person</li> <li>Feminine</li> <li>Dual</li> <li>Imperfect</li></ul>',
    13: '<ul><li>Third Person</li> <li>Feminine</li> <li>Plural</li> <li>Imperfect</li></ul>',
    
    

    28: '<ul><li>First Person</li> <li>Singular</li> <li>Past</li></ul>',
    29: '<ul><li>First Person</li> <li>Plural</li> <li>Past</li></ul>',
    30: '<ul><li>Second Person</li> <li>Masculine</li> <li>Singular</li> <li>Past</li></ul>',
    31: '<ul><li>Second Person</li> <li>Masculine</li> <li>Dual</li> <li>Past</li></ul>',
    32: '<ul><li>Second Person</li> <li>Masculine</li> <li>Plural</li> <li>Past</li></ul>',
    33: '<ul><li>Second Person</li> <li>Feminine</li> <li>Singular</li> <li>Past</li></ul>',
    34: '<ul><li>Second Person</li> <li>Feminine</li> <li>Dual</li> <li>Past</li></ul>',
    35: '<ul><li>Second Person</li> <li>Feminine</li> <li>Plural</li> <li>Past</li></ul>',
    36: '<ul><li>Third Person</li> <li>Masculine</li> <li>Singular</li> <li>Past</li></ul>',
    37: '<ul><li>Third Person</li> <li>Masculine</li> <li>Dual</li> <li>Past</li></ul>',
    38: '<ul><li>Third Person</li> <li>Masculine</li> <li>Plural</li> <li>Past</li></ul>',
    39: '<ul><li>Third Person</li> <li>Feminine</li> <li>Singular</li> <li>Past</li></ul>',
    40: '<ul><li>Third Person</li> <li>Feminine</li> <li>Dual</li> <li>Past</li></ul>',
    41: '<ul><li>Third Person</li> <li>Feminine</li> <li>Plural</li> <li>Past</li></ul>'
};

let pronouns = {
    0: 'First Person Singular (I)',
    1: 'First Person Plural (We)',
    2: 'Second Person Masculine Singular (You, M, 1)',
    3: 'Second Person Masculine Dual (You, M, 2)',
    4: 'Second Person Masculine Plural (You, M, 3+)',
    5: 'Second Person Feminine Singular (You, F, 1)',
    6: 'Second Person Feminine Dual (You, F, 2)',
    7: 'Second Person Feminine Plural (You, F, 3+)',
    8: 'Third Person Masculine Singular (He)',
    9: 'Third Person Masculine Dual (They, M, 2)',
    10: 'Third Person Masculine Plural (They, M, 3+)',
    11: 'Third Person Feminine Singular (She)',
    12: 'Third Person Feminine Dual (They, F, 2)',
    13: 'Third Person Feminine Plural (They, F, 3+)'
};

let conjugationsNoBullets = {
    0: 'First Person Singular (I) Imperfect',
    1: 'First Person Plural (We) Imperfect',
    2: 'Second Person Masculine Singular (You, M, 1) Imperfect',
    3: 'Second Person Masculine Dual (You, M, 2) Imperfect',
    4: 'Second Person Masculine Plural (You, M, 3+) Imperfect',
    5: 'Second Person Feminine Singular (You, F, 1) Imperfect',
    6: 'Second Person Feminine Dual (You, F, 2) Imperfect',
    7: 'Second Person Feminine Plural (You, F, 3+) Imperfect',
    8: 'Third Person Masculine Singular (He) Imperfect',
    9: 'Third Person Masculine Dual (They, M, 2) Imperfect',
    10: 'Third Person Masculine Plural (They, M, 3+) Imperfect',
    11: 'Third Person Feminine Singular (She) Imperfect',
    12: 'Third Person Feminine Dual (They, F, 2) Imperfect',
    13: 'Third Person Feminine Plural (They, F, 3+) Imperfect',



    28: 'First Person Singular (I) Past',
    29: 'First Person Plural (We) Past',
    30: 'Second Person Masculine Singular (You, M, 1) Past',
    31: 'Second Person Masculine Dual (You, M, 2) Past',
    32: 'Second Person Masculine Plural (You, M, 3+) Past',
    33: 'Second Person Feminine Singular (You, F, 1) Past',
    34: 'Second Person Feminine Dual (You, F, 2) Past',
    35: 'Second Person Feminine Plural (You, F, 3+) Past',
    36: 'Third Person Masculine Singular (He) Past',
    37: 'Third Person Masculine Dual (They, M, 2) Past',
    38: 'Third Person Masculine Plural (They, M, 3+) Past',
    39: 'Third Person Feminine Singular (She) Past',
    40: 'Third Person Feminine Dual (They, F, 2) Past',
    41: 'Third Person Feminine Plural (They, F, 3+) Past'
};

let arabicPronouns = {
    0: "أَنَا",
    1: "نَحْنُ",
    2: "أَنْتَ",
    3: "أَنْتُمَا (m)",
    4: "أَنْتُمْ",
    5: "أنْتِ",
    6: "أَنْتَُمَا (f)",
    7: "أَنْتُنَّ",
    8: "هُوَ",
    9: "هُمَا (m)",
    10: "هُمَ",
    11: "هِيَ",
    12: "هُمَا (f)",
    13: "هُنَّ"
}