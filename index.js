var fs = require('fs');

fs.readFile('words.txt', 'utf8', (err, data) => process(data, 4));

function hasVowel(word) {
    var vowels = ['a', 'e', 'u', 'i', 'o'];
    for (var i = 0; i < vowels.length; i++) {
        if (word.includes(vowels[i])) {
            return true;
        }
    }
    return false;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function top(combination, count) {
    var arr = [];
    var keys = Object.keys(combination);
    keys.forEach(k => arr.push({ key: k, val: combination[k] }));
    arr.sort((a, b) => b.val - a.val);
    return arr.slice(0, count);
}

function process(data, letterCount) {
    var words = data.split('\n');
    var combination = {};
    words.forEach(word => {
        word = word.toLowerCase().replace(/ /g, '');
        if (hasVowel(word)) {
            for (var i = letterCount - 1; i < word.length; i++) {
                var comb = word.substr(i - letterCount - 1, letterCount);
                if (comb.length > (letterCount - 1)) {
                    if (combination[comb]) {
                        combination[comb]++;
                    } else {
                        combination[comb] = 1;
                    }
                }
            }
        }
    });
    var topCombs = top(combination, 1000);
    fs.writeFile('top', topCombs.map(m => m.key).join('|'));
    return combination;
}