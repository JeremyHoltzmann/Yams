class yamsRule {
  ruleCheckerFunction;
  scoreCalculatorFunction;
  diceNumber;
  id;

  constructor(_ruleCheckerFunction, _scoreCalculatorFunction, value, id) {
    this.id = id;
    this.value = value;
    this.ruleCheckerFunction = _ruleCheckerFunction;
    this.scoreCalculatorFunction = _scoreCalculatorFunction;
  }
}

function getAllDiceRepartition(diceArray) {
  let array = [];

  for (let i = 0; i < diceArray.length; i++) {
    var tmp = diceArray.filter(
      (element) => element.faceValue === diceArray[i].faceValue
    ).length;
    if (
      array.filter((element) => element.faceValue === diceArray[i].faceValue)
        .length === 0
    ) {
      array.push({ faceValue: diceArray[i].faceValue, number: tmp });
    }
  }
  array = array.sort((a, b) => a.faceValue - b.faceValue);
  return array;
}

function groupsCount(diceArray) {
  let array = [];

  for (let i = 0; i < diceArray.length; i++) {
    var tmp = diceArray.filter(
      (element) => element.faceValue === diceArray[i].faceValue
    ).length;
    if (
      array.filter((element) => element.faceValue === diceArray[i].faceValue)
        .length === 0
    ) {
      array.push({ faceValue: diceArray[i].faceValue, number: tmp });
    }
  }
  array = array.sort((a, b) => a.faceValue - b.faceValue);
  return array.reduce(function (prev, current) {
    return prev.number > current.number ? prev : current;
  });
}

var yamsRuleChecker = {
  noRule: function (diceArray) {
    return true;
  },

  diceRuleChecker: function (diceArray, value) {
    return (
      diceArray.filter((element) => element.faceValue === value).length > 0
    );
  },
  oneScore: function (diceArray) {
    return diceArray.filter((element) => element.faceValue === 1).length;
  },
  twoScore: function (diceArray) {
    return diceArray.filter((element) => element.faceValue === 2).length * 2;
  },
  threeScore: function (diceArray) {
    return diceArray.filter((element) => element.faceValue === 3).length * 3;
  },
  fourScore: function (diceArray) {
    return diceArray.filter((element) => element.faceValue === 4).length * 4;
  },
  fiveScore: function (diceArray) {
    return diceArray.filter((element) => element.faceValue === 5).length * 5;
  },
  sixScore: function (diceArray) {
    return diceArray.filter((element) => element.faceValue === 6).length * 6;
  },

  brelanRuleChecker: function (diceArray) {
    return this.groupsCount(diceArray).number > 3;
  },
  carreRuleChecker: function (diceArray) {
    return this.groupsCount(diceArray).number > 4;
  },

  fullRuleChecker: function (diceArray) {
    var diceRepartition = getAllDiceRepartition(diceArray);
    if (diceRepartition.length !== 2) return false;
    return (
      (diceRepartition[0].number === 3 || diceRepartition[0].number === 2) &&
      (diceRepartition[1].number === 3 || diceRepartition[1].number === 2)
    );
  },

  petiteSuiteRuleChecker: function (diceArray) {
    let count = 0;
    var diceRepartition = getAllDiceRepartition(diceArray);
    console.log("CHECKING SUITE", diceRepartition);

    for (var i = 0; i < diceRepartition.length - 1; i++) {
      if (
        diceRepartition[i].faceValue ===
        diceRepartition[i + 1].faceValue - 1
      ) {
        count++;

        if (count === 3) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    return false;
  },

  fixScore: function (value) {
    return value;
  },

  grandeSuiteRuleChecker: function (diceArray) {
    let count = 0;
    var diceRepartition = getAllDiceRepartition(diceArray);
    for (var i = 0; i < diceRepartition.length - 1; i++) {
      if (
        diceRepartition[i].faceValue ===
        diceRepartition[i + 1].faceValue - 1
      ) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
  },

  yahtzeeRuleChecker: function (diceArray) {
    console.log("YAMS type ", typeof this.getAllDiceRepartition);

    var diceRepartition = getAllDiceRepartition(diceArray);
    return diceRepartition.length === 1;
  },

  diceSumScoreCalculator: function diceSumScore(diceArray) {
    var sum = 0;
    diceArray.forEach((element) => {
      sum += element.faceValue;
    });
    return sum;
  },
};

class yamsAllRules {
  ruleArray = [
    {
      rule: new yamsRule(
        yamsRuleChecker.diceRuleChecker,
        yamsRuleChecker.oneScore,
        1,
        "as"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.diceRuleChecker,
        yamsRuleChecker.twoScore,
        2,
        "deux"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.diceRuleChecker,
        yamsRuleChecker.threeScore,
        3,
        "trois"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.diceRuleChecker,
        yamsRuleChecker.fourScore,
        4,
        "quatre"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.diceRuleChecker,
        yamsRuleChecker.fiveScore,
        5,
        "cinq"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.diceRuleChecker,
        yamsRuleChecker.sixScore,
        6,
        "six"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.brelanRuleChecker,
        yamsRuleChecker.diceSumScoreCalculator,
        "brelan"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.carreRuleChecker,
        yamsRuleChecker.diceSumScoreCalculator,
        "carre"
      ),
    },
    {
      rule: new yamsRule(yamsRuleChecker.fullRuleChecker, null, 25, "full"),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.petiteSuiteRuleChecker,
        null,
        30,
        "petite"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.grandeSuiteRuleChecker,
        null,
        40,
        "grande"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.noRule,
        yamsRuleChecker.diceSumScoreCalculator,
        40,
        "min"
      ),
    },
    {
      rule: new yamsRule(
        yamsRuleChecker.noRule,
        yamsRuleChecker.diceSumScoreCalculator,
        40,
        "max"
      ),
    },
    {
      rule: new yamsRule(yamsRuleChecker.yahtzeeRuleChecker, null, 50, "yam"),
    },
    //ajout de mini et max function
  ];
}

module.exports = yamsAllRules;
