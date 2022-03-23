
document.getElementById("butt").onclick = function() {myFunction()};

class FormalLang{
    constructor(ruleObj){
        if(typeof ruleObj === 'object' && ruleObj !== null){
            this.ruleObj = ruleObj;
        }
        else{
            this.ruleObj = {};
           // console.log("Give us object");
        }
    }
   
    ruleFromText(ruleText) {
        let ruleMas = ruleText.split(/\n/).map(rule=> rule.split("→"));
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
            this.ruleStrMas.push([rule.split(""),(this.ruleObj[rule].join("").split(""))]);        
        })
        return this.ruleStrMas;
    }
    getTerminals() {
        
        //// console.log(this.rulesLeft());
        this.terminals = new Set();
        this.nonTerminals = new Set();          
        this.ruleToCharArr(this.ruleObj).flat(2).forEach(symbol => {
            //// console.log(symbol);
            if (symbol == symbol.toLowerCase()){
                this.terminals.add(symbol)
            }else{
                this.nonTerminals.add(symbol);
            };
        })
            //// console.log(this.terminals);
            //// console.log(this.nonTerminals);
        return this.terminals;
    }

    
    getNonTerminals() {
        this.getTerminals()
        return this.nonTerminals;
    }

    getFirstUnTerm() {return [...this.getNonTerminals()][0]; }

    getReachable(){
        this.reachable = new Set();
        this.reachable.add(this.getFirstUnTerm());
        let c = 0;
        let reachableArr = [...this.reachable];
        while(this.ruleObj[reachableArr[c]]){
            this.ruleObj[reachableArr[c]].join("").split("").forEach(element =>{
                if(this.nonTerminals.has(element)) this.reachable.add(element)
            });
            reachableArr = [...this.reachable];
            c++;            
        }
        return this.reachable;
    }
    removeUnreachable(){
        let obj = {};
        let reachable = [...this.getReachable(this.getFirstUnTerm())]
        reachable.forEach(rule => {obj[rule] = this.ruleObj[rule]});
        this.ruleObj = obj;   
        return this;            
    }

    getProvide(){
        this.provide = new Set();
        this.rulesLeft().forEach(leftrule => {
            console.log(this.ruleObj[leftrule])
        });
        // console.log(this.provide);
        return this.provide;
    }

    removeUnprovide(){
        // let obj = {};
        // this.getProvide(0);
        // console.log(this.ruleObj);

        return this;
    }
    getEpsilonNonTerm(){
     
        // console.log(this.rulesLeft());
        this.nullNonTerm = [];
        
        this.rulesLeft().forEach(element => {
            // console.log(element);
            // console.log(this.ruleObj[element])
            let n = this.ruleObj[element].filter(rule => {
                // console.log(rule);
                if(!rule.split("").includes("ε")){return rule;}
                else{this.nullNonTerm.push(element);}
            });
        });
        return this.nullNonTerm;
    }
    removeEpsilonNonTerm(){
        
        let nullTerm = this.getEpsilonNonTerm();
        let obj = {};

        // if(this.ruleObj[this.getFirstUnTerm()].join("").split("").includes("ε")){
        //     obj[this.getFirstUnTerm() + "'"] = [this.getFirstUnTerm(), "ε"]
        // }

        if(this.ruleObj[this.getFirstUnTerm()].join("").split("").includes("ε")){
            obj[this.getFirstUnTerm() + "'"] = [this.getFirstUnTerm(), "ε"]
            
            // obj[this.getFirstUnTerm()] = this.ruleObj[this.getFirstUnTerm()].filter(rule =>{
            //     console.log(rule);
            //     if(rule!="ε") {return rule;}
            // })
        }
        this.rulesLeft().forEach(rule => {
            let j = [];
            // console.log(this.ruleObj[rule]);
            let n = this.ruleObj[rule].filter(element => {
                if (!element.split("").includes("ε")){ return element;}});
            obj[rule] = n;
        })
        this.rulesLeft().forEach(element => {
            obj[element].forEach(sus =>{
                // sus.split("").forEach( sas => {if(nullTerm.includes(sas)) 
                //     this.ruleObj[element].push(sus);
                // });

                for (let i = 0; i < sus.split("").length; i++) {
                    const ele = sus.split("")[i];
                    if(nullTerm.includes(ele) && sus.split("").length>1){
                        let b = sus.split("");
                        b[i] = null;

                        obj[element].push(b.join(""));
                    }
                    // else if(!obj[element].includes("ε") && sus.split("").length<=1){
                    //     obj[element].push("ε");
                    // }
                    
                }
            })
            
        })


        if(obj[this.getFirstUnTerm()].join("").split("").includes("ε")){
            obj[this.getFirstUnTerm() + "'"] = [this.getFirstUnTerm(), "ε"]
            
            obj[this.getFirstUnTerm()] = this.ruleObj[this.getFirstUnTerm()].filter(rule =>{
                console.log(rule);
                if(rule!="ε") {return rule;}
            })
        }
        this.ruleObj = obj;
        return this;    
    }

    rulesLeft() {return Object.getOwnPropertyNames(this.ruleObj)};

    printRules(){
        
        this.rulesString = "";
        this.rulesLeft().forEach(element => {
            // console.log(this.ruleObj[element]);
            this.rulesString += element + "→" + this.ruleObj[element].join("|") + "\n";      
        });
        document.getElementById("answer").innerText += this.rulesString;

        return this.rulesString;
    }

    getChainRules(){
        
    }

    fixRec(leftright){
        let i;
        let k;
        if(leftright==1){
            i = 0;
            k = 1;
        }
        else{
            i = 1;
            k=0
        }
        let obj = {};
        this.rulesLeft().forEach(rule => {
            let j = [];
            this.ruleObj[rule].forEach(sym => {
                j.push(sym);
                if(sym.split("").length == 2 && this.getNonTerminals().has(sym.split("")[i])){
                    j.push(sym.split("")[k])
                }
            })
            obj[rule] = j;

        })
        this.ruleObj=obj;
        return this;
    }
    clear(){
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
    //// console.log(o.ruleFromText(n));

    //// console.log(o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().fixRec(1).fixRec(0).clear().printRules());
    document.getElementById("answer").innerText="";
    document.getElementById("answer").innerText += "Непроизводящие\n\n";
    o.ruleFromText(n);
    o.ruleFromText(n).removeUnprovide().printRules();
    document.getElementById("answer").innerText += "\nНедостижимые\n\n";
    o.ruleFromText(n).removeUnreachable().printRules();
    document.getElementById("answer").innerText += "\nУдаляем е-правила\n\n";
    o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().removeEpsilonNonTerm().printRules();
    document.getElementById("answer").innerText += "\nЧиним рекурсии:\nЛевая\n\n";
    o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().fixRec(1).clear().printRules();
    document.getElementById("answer").innerText += "Правая\n\n";
    o.ruleFromText(n).removeUnprovide().removeUnreachable().removeEpsilonNonTerm().fixRec(1).fixRec(0).clear().printRules();
    let s = new FormalLang().ruleFromText(n);
    s.removeUnprovide().printRules();

  }
