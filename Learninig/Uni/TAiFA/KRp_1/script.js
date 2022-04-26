
document.getElementById("butt").onclick = function() { myFunction() };

class FormalLang {
  constructor(ruleObj) {
    if (typeof ruleObj === 'object' && ruleObj !== null) {
      this.ruleObj = ruleObj;
    }
    else {
      this.ruleObj = {};
      // console.log("Give us object");
    }
  }

  ruleFromText(ruleText) {
    ruleText = ruleText.split(" ").join("");
    // console.log(ruleText.split(" ").join(""));
    let ruleMas = ruleText.split(/\n/).map(rule => rule.split("→"));
    //// console.log(ruleMas);
    ruleMas.forEach(rule => {
      // console.log(rule)
      this.ruleObj[rule[0]] = rule[1].split("|");
    });
    return this;
  }
  ruleToCharArr(rule) {

    this.ruleStrMas = [];
    this.rulesLeft().forEach(rule => {

      // console.log(this.ruleObj[rule]);         
      if (this.ruleObj[rule]) {
        this.ruleStrMas.push([rule.split(""), (this.ruleObj[rule].join("").split(""))]);
      }
    })
    return this.ruleStrMas;
  }
  getTerminals() {

    //// console.log(this.rulesLeft());
    this.terminals = new Set();
    this.nonTerminals = new Set();
    this.ruleToCharArr(this.ruleObj).flat(2).forEach(symbol => {
      //// console.log(symbol);
      if (symbol == symbol.toLowerCase()) {
      } else {
        this.terminals.add(symbol)
        this.nonTerminals.add(symbol);
      };
    })
    //// console.log(this.terminals);
    //// console.log(this.nonTerminals);
    return this.terminals;
  }


  getNonTerminals() {

    this.getTerminals()
    // console.log(this.nonTerminals);
    return this.nonTerminals;
  }

  getFirstUnTerm() { return [...this.getNonTerminals()][0]; }

  getReachable() {
    this.reachable = new Set();
    this.reachable.add(this.getFirstUnTerm());
    let c = 0;
    let reachableArr = [...this.reachable];
    while (this.ruleObj[reachableArr[c]]) {
      this.ruleObj[reachableArr[c]].join("").split("").forEach(element => {
        if (this.nonTerminals.has(element)) this.reachable.add(element)
      });
      reachableArr = [...this.reachable];
      c++;
    }
    return this.reachable;
  }

  removeUnreachable() {
    let obj = {};
    let reachable = [...this.getReachable(this.getFirstUnTerm())]
    reachable.forEach(rule => { obj[rule] = this.ruleObj[rule] });
    this.ruleObj = obj;
    return this;
  }

  removeUnprovide() {
    this.unprovide = new Set();
    this.rulesLeft().forEach(leftrule => {
      // console.log(this.ruleObj[leftrule])
      // this.ruleObj[leftrule].forEach
      let ruleCheck = 0;
      this.ruleObj[leftrule].forEach(rule => {
        let termCheck = 0;
        rule.split("").forEach(symbol => {
          if (this.getTerminals().has(symbol)) {
            termCheck = 1;
          }
        })
        if (termCheck == 0) {
          ruleCheck += 1;
        }
      });

      if (ruleCheck == this.ruleObj[leftrule].length) {
        this.unprovide.add(leftrule);
      }
    });
    console.log(this.unprovide);

    let obj = {}

    this.rulesLeft().forEach(leftrule => {
      let j = []
      this.ruleObj[leftrule].forEach(rule => {

        let c = 1;
        rule.split("").forEach(symbol => {
          if (this.unprovide.has(symbol)) { c = 0 }
        })
        if (c) { j.push(rule) }
      })
      if (!this.unprovide.has(leftrule)) { obj[leftrule] = j }
    })
    console.log(obj)
    this.ruleObj = obj;
    return this;
  }


  getChains() {
    this.chains = new Set();
    this.rulesLeft().forEach(leftrule => {
      // obj[leftrule] = this.ruleObj[leftrule];
      this.ruleObj[leftrule].forEach(rule => {
        if (rule.split("").length == 1 && this.getNonTerminals().has(rule.split("")[0])) {

          this.chains.add(leftrule)
        }
      })
    })
    return this.chains
  }

  removeChains() {


    let obj = {}
    this.rulesLeft().forEach(leftrule => {
      // obj[leftrule] = this.ruleObj[leftrule];
      let j = [];
      this.ruleObj[leftrule].forEach(rule => {
        //    console.log(rule);
        if (rule.split("").length == 1 && this.getNonTerminals().has(rule.split("")[0])) {
          // console.log(this.ruleObj[rule.split("")[0]]);
          j.push(this.ruleObj[rule.split("")[0]])
        }
        else j.push(rule);
      })
      // j.flat(1);
      // console.log(j);
      obj[leftrule] = [... new Set(j.flat(2))];
    })
    this.ruleObj = obj
    console.log(obj);
    return this;
  }

  Chains() {
    // while(this.getChains().size >0 )

    this.removeChains();
    this.removeChains();
    this.removeChains();
    this.removeChains();
    console.log(this.getChains().size)
    return this;
  }

  getEpsilonNonTerm() {

    // console.log(this.rulesLeft());
    this.nullNonTerm = new Set();

    this.rulesLeft().forEach(leftrule => {
      if (this.ruleObj[leftrule]) {
        // console.log(leftrule);

        if (this.ruleObj[leftrule].join("").split("").includes("ε")) {
          // console.log(leftrule);
          this.nullNonTerm.add(leftrule);
          // console.log(this.nullNonTerm)
        }
      }
    })
    // console.log(this.nullNonTerm);
    return this.nullNonTerm;
  }

  removeEpsilonNonTerm() {

    let nullTerm = this.getEpsilonNonTerm();
    let obj = {};
    if (this.ruleObj[this.getFirstUnTerm()].join("").split("").includes("ε")) {
      obj["Z"] = [this.getFirstUnTerm(), "ε"]
    }


    this.rulesLeft().forEach(rule => {
      let j = [];
      // console.log(this.ruleObj[rule]);
      if (this.ruleObj[rule]) {
        let n = this.ruleObj[rule].filter(element => {
          if (!element.split("").includes("ε")) { return element; }
        });
        obj[rule] = n;
      }
    })


    this.rulesLeft().forEach(element => {
      if (obj[element]) {
        obj[element].forEach(sus => {
          // sus.split("").forEach( sas => {if(nullTerm.includes(sas)) 
          //     this.ruleObj[element].push(sus);
          // });

          for (let i = 0; i < sus.split("").length; i++) {
            const ele = sus.split("")[i];

            if (nullTerm.has(ele) && sus.split("").length > 1) {
              let b = sus.split("");
              b[i] = null;

              if (b.join("").split("").length <= 1) {
                console.log(b.join("").split(""))
                obj[element].push("ε");
              }

              obj[element].push(b.join(""));
            }


          }
          obj[element] = [... new Set(obj[element])]

        })
      }
    })
    this.ruleObj = obj;
    // console.log(this.getEpsilonNonTerm())
    return this;

  }



  Eps() {
    for (; ;) {
      this.removeEpsilonNonTerm();
      if ([... this.getEpsilonNonTerm()].join("").split("").includes("Z") || this.getEpsilonNonTerm().size == 0) { break; }

    }

    console.log(this.ruleObj);
    return this;
  }

  rulesLeft() { return Object.getOwnPropertyNames(this.ruleObj) };

  printRules() {
    // console.log(this.ruleObj);
    this.rulesString = "";
    this.rulesLeft().forEach(element => {
      // console.log(this.ruleObj[element]);
      if (this.ruleObj[element]) {
        this.rulesString += element + "→" + this.ruleObj[element].join("|") + "\n";
      }
    });
    document.getElementById("answer").innerText += this.rulesString;

    return this.rulesString;
  }

  fixRec(leftright) {
    let i;
    let k;
    if (leftright == 1) {
      i = 0;
      k = 1;
    }
    else {
      i = 1;
      k = 0
    }
    let obj = {};
    this.rulesLeft().forEach(rule => {
      let j = [];
      this.ruleObj[rule].forEach(sym => {
        j.push(sym);
        if (sym.split("").length == 2 && this.getNonTerminals().has(sym.split("")[i]) && !this.getNonTerminals().has(sym.split("")[k])) {
          j.push(sym.split("")[k])
        }
      })
      obj[rule] = j;

    })
    this.ruleObj = obj;
    this.clear();
    return this;
  }
  clear() {
    let obj = {}
    this.rulesLeft().forEach(rule => {
      obj[rule] = [... new Set(this.ruleObj[rule])];
    });
    this.ruleObj = obj;
    return this;
  }
}

function myFunction() {
  let n = document.getElementById("text").value;

  let o = new FormalLang();

  console.log(JSON.stringify(o.ruleFromText(n)));
  console.log(o.ruleObj);
  //// console.log(o.ruleFromText(n));

  //// console.log(o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().fixRec(1).fixRec(0).clear().printRules());
  document.getElementById("answer").innerText = "";
  document.getElementById("answer").innerText += "Непроизводящие\n\n";
  console.log("sus")
  o.ruleFromText(n).removeUnprovide().printRules();
  document.getElementById("answer").innerText += "\nНедостижимые\n\n";

  console.log("sus")
  o.ruleFromText(n).removeUnprovide().removeUnreachable().printRules();

  document.getElementById("answer").innerText += "\nУдаляем е-правила\n\n";
  console.log("sus")
  o.ruleFromText(n).removeUnprovide().removeUnreachable().Eps().printRules();
  // o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().printRules();
  // document.getElementById("answer").innerText += "\nЧиним рекурсии:\nЛевая\n\n";
  // o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().fixRec(1).clear().printRules();
  // document.getElementById("answer").innerText += "Правая\n\n";
  // o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().fixRec(1).fixRec(0).clear().printRules();
  // document.getElementById("answer").innerText += "Цепные\n\n"
  // o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().fixRec(1).fixRec(0).clear().removeChains().printRules();
  // o.ruleFromText(n).Eps().printRules();
  // o.ruleFromText(n).Eps().Chains().printRules();

  document.getElementById("answer").innerText += "\nЧиним рекурсии:\nЛевая\n\n";
  o.ruleFromText(n).removeUnprovide().removeUnreachable().Eps().Chains().fixRec(1).printRules();
  // let s = new FormalLang().ruleFromText(n);
  // s.removeUnprovide().printRules();

}
