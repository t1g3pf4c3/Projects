
document.getElementById("TestFunc").onclick = function() { TestFunc() };
document.getElementById("RemoveEpsilon").onclick = function() { RemoveEpsilon() };
document.getElementById("Factorize").onclick = function() { Factorize() };
document.getElementById("Recursion").onclick = function() { Recursion() };
document.getElementById("Chains").onclick = function() { Chains() };
class FormalLang {
	constructor(rule_template) {
		// switch (rule_template) {
		//   case rule_template == null: throw new Error("Null");
		//   case typeof rule_template == 'object': this.ruleObj = rule_template;
		//   case typeof rule_template == 'string': this.ruleObj = JSON.parse(rule_template);
		// }
		this.rule_template = rule_template;
		this.ruleObj = JSON.parse(rule_template);
	}

	rest_alphabet = new Set(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y"]);

	clear_alphabet() {
		[... this.non_terminals].forEach((symbol) => {
			if (this.rest_alphabet.has(symbol)) this.rest_alphabet.delete(symbol);
		});
	}

	get random_symbol() {
		let alphabet = [... this.rest_alphabet];
		let symbol = alphabet[Math.floor(Math.random() * alphabet.length)];
		return symbol;
	}

	get first_rule() { return this.rule_template.match(/[A-Z]/)[0] }

	// Нетерминалы
	get terminals() { return new Set(this.rule_template.match(/[a-z]/g)); };

	// Терминалы
	get non_terminals() { return new Set(this.rule_template.match(/[A-Z]/g)); }

	// Производящие
	get providers() {
		let providers = new Set();
		for (let left_rule in this.ruleObj) {
			if (/[^A-Z]/.test(this.ruleObj[left_rule].join(''))) { providers.add(left_rule); }
		}
		return providers;
	}

	get non_providers() { return new Set([...this.terminals].filter(x => !this.providers.has(x))); }

	// Эпсилоны
	get epsilons() {
		let epsilons = new Set();
		for (let rule in this.ruleObj) {
			if (this.ruleObj[rule].join('').includes('ε')) { epsilons.add(rule); }
		}
		return epsilons;
	}
	first_rule = "S"

	// Достижимые 
	get reachable() {
		let reachable = [];
		reachable.push(this.first_rule);
		for (let rule in this.ruleObj) {
			// console.log(this.ruleObj[rule].join('').match(/[A-Z]/g));
			this.ruleObj[rule].forEach(sus => {
				reachable.push(sus.match(/[A-Z]/g));
			})
		}
		let final = new Set(reachable.flat(2).filter(n => n));
		return final
	}

	chain_rules_finder(object, startchar, ruleset) {
		// console.log(startchar + "{");
		let n = [];
		object[startchar].forEach(rule => {
			if (rule.length == 1 && rule != startchar && this.non_terminals.has(rule)) {
				n.push(rule)
				this.chain_rules_finder(object, rule, n);
			}
		})
		if (n[0]) ruleset.push(n);
		return n;
	}

	get_Nest(array, ruleset) {
		// array.forEach(function(item, i, array) {
		//   if (Array.isArray(item)) {
		//     console.log(item);
		//     this.get_Nest(array)
		//   };
		// })
		for (let i = 0; i < array.length; i++) {
			if (Array.isArray(array[i])) {
				// this.get_Nest(array)
				this.get_Nest(array[i], ruleset);
			}
			if (array.length - 1 == i) ruleset.push(array[i]);
		}
		// console.log(ruleset)
		return ruleset;
	}

	get un_reachable() { return new Set([...this.terminals].filter(x => !this.reachable.has(x))); }

	chain_rules(start) {
		let i = this.chain_rules_finder(this.ruleObj, start, [])
		let rule_set = [];
		// console.log(i);
		// let sus = this.get_Nest(i, rule_set);
		// return new Set(sus.flat(2));
		return i;
	}


	//REMOVERS

	remove_chain_rules(start) {
		let n = []
		let chain_set = this.chain_rules(start);
		console.log(chain_set);
		this.ruleObj[start].forEach((rule) => {
			if (chain_set.includes(rule)) {
				console.log(rule);
				n.push(this.ruleObj[rule]);
			}
			else n.push(rule);
		})
		console.log(n);
		this.ruleObj[start] = [... new Set(n.flat(2))];
		console.log(this.ruleObj)
		return this;
	}

	remove_all_chain_rules() {
		for (let left_rule in this.ruleObj) {
			for (let left_rule_1 in this.ruleObj) {
				this.remove_chain_rules(left_rule)

			}
		}
		for (let left_rule in this.ruleObj) {

		}
		return this;
	}

	remove_epsilon_rules() {
		for (let left_rule in this.ruleObj) {
			let n = [];
			this.ruleObj[left_rule].forEach((rule) => {
				let k = rule.split('');
				rule.split('').forEach((symbol, index, splitrule) => {

					if (this.epsilons.has(symbol)) {
						let l = [...splitrule];
						l[index] = null
						k[index] = null;
						n.push(l.join(''))
					}
					if (k.join('').length > 0) n.push(k.join(''))
					else n.push('ε');
				})
				n.push(rule);
			})
			this.ruleObj[left_rule] = [... new Set(n)];

			// let k = this.ruleObj[left_rule].filter((rule) => { if (rule != "ε") return rule });
			// this.ruleObj[left_rule] = k;
		}
		if (this.epsilons.has(this.first_rule)) {
			let dummy = 0;
			for (let left_rule in this.ruleObj) { if (this.ruleObj[left_rule].join("").split("").includes(this.first_rule)) dummy = 1; }
			if (dummy) {
				let n = this.ruleObj[this.first_rule].filter((rule) => { if (rule != "ε") return rule });

				this.ruleObj[this.first_rule] = n;
				this.ruleObj["Z"] = [this.first_rule, "e"]
				this.first_rule = "Z";
			}
		}
		for (let left_rule in this.ruleObj) {
			this.ruleObj[left_rule].forEach((rule) => {

				let k = this.ruleObj[left_rule].filter((rule) => { if (rule != "ε") return rule });
				this.ruleObj[left_rule] = k;
			})
		}
		console.log(this.ruleObj)
		return this;
	}

	remove_unreachable() {
		let newObj = {};
		newObj[this.first_rule] = this.ruleObj[this.first_rule];
		for (let left_rule in this.ruleObj) {
			console.log(left_rule);
			if (this.reachable.has(left_rule)) {
				newObj[left_rule] = this.ruleObj[left_rule];
			}
		}
		this.ruleObj = newObj;
		return this;
	}

	//Удаление рекурсии
	remove_rec(left_rule) {
		let n = [];
		this.ruleObj[left_rule].forEach((rule) => {
			if (left_rule == rule[0] && /[^A-Z]/.test(rule.substr(1))) {
				let new_symbol = this.random_symbol;
				this.ruleObj[new_symbol] = [rule.substr(1) + new_symbol, rule.substr(1)];
				this.ruleObj[left_rule].forEach((rule) => {
					if (left_rule != rule[0]) {
						// && !n.includes(rule)
						n.push(rule + new_symbol);
					}
				})
			}
			else n.push(rule)
		})
		this.ruleObj[left_rule] = n
		return this;
	}

	remove_recursion() {
		for (let left_rule in this.ruleObj) {
			this.remove_rec(left_rule);
		}
		return this;
	}
	// Факторизация
	find_factorize(len, left_rule) {
		let simObj = {}
		for (let i = 0; i < this.ruleObj[left_rule].length - 1; i++) {
			let first = this.ruleObj[left_rule][i]
			let left_substring = first.substr(0, len)
			let similar_arr = [];
			similar_arr.push(first.substr(len))
			for (let j = i + 1; j < this.ruleObj[left_rule].length; j++) {
				let second = this.ruleObj[left_rule][j]
				// console.log(second);
				if (left_substring == second.substr(0, len) && left_substring.length >= 1) {
					// console.log("sus")
					if (second.substr(len).length + 0 && !similar_arr.includes(second.substr(len))) similar_arr.push(second.substr(len));
				}
			}
			if (similar_arr.length > 1 && !simObj[first.substr(0, len)]) {
				simObj[first.substr(0, len)] = similar_arr;
			}
		}
		return simObj;
	}
	replace_factor(len, left_rule) {
		let simObj = this.find_factorize(len, left_rule);
		let replaceObj = {}

		for (let left_rule in simObj) {
			let sym = this.random_symbol;
			replaceObj[left_rule] = sym;
			this.ruleObj[sym] = simObj[left_rule];
		}
		let n = []
		for (let i = 0; i < this.ruleObj[left_rule].length; i++) {
			let rule = this.ruleObj[left_rule][i]
			let subsritng = rule.substr(0, len)
			if (replaceObj[subsritng]) {
				n.push(rule.substr(0, len) + replaceObj[subsritng])
			}
			else n.push(rule);
		}
		this.ruleObj[left_rule] = n;
		return this;
	}


	replace_factorize() {
		for (let left_rule in this.ruleObj) {
			this.replace_factor(1, left_rule);
		}
		return this;
	}
	remove_unprovide() {
		console.log(this.providers);
		return this;
	}

	remove_nulls() {

	}
}

function ruleFromText(ruleText) {
	newObj = {};
	ruleText = ruleText.split(" ").join("");
	// console.log(ruleText.split(" ").join(""));
	let ruleMas = ruleText.split(/\n/).map(rule => rule.split("→"));
	//// console.log(ruleMas);
	ruleMas.forEach(rule => {
		newObj[rule[0]] = rule[1].split("|");
	});
	return newObj;
}

function printRules(object) {
	let rulesString = "\n";
	Object.keys(object).forEach(element => {
		// console.log(this.ruleObj[element]);
		if (object[element]) {
			rulesString += element + "→" + object[element].join("|") + "\n";
		}
	});
	rulesString += "\n"
	document.getElementById("answer").innerText += rulesString;
}



function TestFunc() {

	let answer = document.getElementById("answer").innerText;
	let n = document.getElementById("text").value;
	let ruleObj = JSON.stringify(ruleFromText(n));
	// let JSON_template = '{"S" : ["abSa", "aaAb", "b"], "A" : ["baAb", "b"]}';
	// let test_lang = new FormalLang(JSON_template);
	let test_lang = new FormalLang(ruleObj);
	test_lang.clear_alphabet();

}

function RemoveEpsilon() {

	let answer = document.getElementById("answer").innerText;
	let n = document.getElementById("text").value;
	let ruleObj = JSON.stringify(ruleFromText(n));
	let test_lang = new FormalLang(ruleObj);
	test_lang.clear_alphabet();
	printRules(test_lang.remove_epsilon_rules().ruleObj)

}
function Factorize() {

	let answer = document.getElementById("answer").innerText;
	let n = document.getElementById("text").value;
	let ruleObj = JSON.stringify(ruleFromText(n));
	let test_lang = new FormalLang(ruleObj);
	test_lang.clear_alphabet();
	printRules(test_lang.replace_factorize().ruleObj)
}
function Recursion() {


	let answer = document.getElementById("answer").innerText;
	answer += "Recursion\n"
	let n = document.getElementById("text").value;
	let ruleObj = JSON.stringify(ruleFromText(n));
	let test_lang = new FormalLang(ruleObj);
	test_lang.clear_alphabet();
	printRules(test_lang.remove_recursion().ruleObj)
}
function Chains() {
	let answer = document.getElementById("answer").innerText;
	answer += "Recursion\n"
	let n = document.getElementById("text").value;
	let ruleObj = JSON.stringify(ruleFromText(n));
	let test_lang = new FormalLang(ruleObj);
	test_lang.clear_alphabet();
	printRules(test_lang.remove_chain_rules("B").remove_chain_rules("S").ruleObj)
}

