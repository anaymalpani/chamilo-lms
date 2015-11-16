/*
 *  /MathJax/extensions/TeX/mhchem.js
 *
 *  Copyright (c) 2009-2015 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/mhchem"] = {version: "2.5.0"};
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
    var b = MathJax.InputJax.TeX;
    var a = MathJax.Object.Subclass({
        string: "",
        i: 0,
        tex: "",
        atom: false,
        sup: "",
        sub: "",
        Init: function (c) {
            this.string = c
        },
        ParseTable: {
            "-": "Minus",
            "+": "Plus",
            "(": "Open",
            ")": "Close",
            "[": "Open",
            "]": "Close",
            "<": "Less",
            "^": "Superscript",
            _: "Subscript",
            "*": "Dot",
            ".": "Dot",
            "=": "Equal",
            "#": "Pound",
            "$": "Math",
            "\\": "Macro",
            " ": "Space"
        },
        Arrows: {
            "->": "rightarrow",
            "<-": "leftarrow",
            "<->": "leftrightarrow",
            "<=>": "rightleftharpoons",
            "<=>>": "Rightleftharpoons",
            "<<=>": "Leftrightharpoons",
            "^": "uparrow",
            v: "downarrow"
        },
        Bonds: {
            "-": "-",
            "=": "=",
            "#": "\\equiv",
            "~": "\\tripledash",
            "~-": "\\begin{CEstack}{}\\tripledash\\\\-\\end{CEstack}",
            "~=": "\\raise2mu{\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}",
            "~--": "\\raise2mu{\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}",
            "-~-": "\\raise2mu{\\begin{CEstack}{}-\\\\\\tripledash\\\\-\\end{CEstack}}",
            "...": "{\\cdot}{\\cdot}{\\cdot}",
            "....": "{\\cdot}{\\cdot}{\\cdot}{\\cdot}",
            "->": "\\rightarrow",
            "<-": "\\leftarrow",
            "??": "\\text{??}"
        },
        Parse: function () {
            this.tex = "";
            this.atom = false;
            while (this.i < this.string.length) {
                var d = this.string.charAt(this.i);
                if (d.match(/[a-z]/i)) {
                    this.ParseLetter()
                } else {
                    if (d.match(/[0-9]/)) {
                        this.ParseNumber()
                    } else {
                        this["Parse" + (this.ParseTable[d] || "Other")](d)
                    }
                }
            }
            this.FinishAtom();
            return this.tex
        },
        ParseLetter: function () {
            this.FinishAtom();
            if (this.Match(/^v( |$)/)) {
                this.tex += "{\\" + this.Arrows.v + "}"
            } else {
                this.tex += "\\text{" + this.Match(/^[a-z]+/i) + "}";
                this.atom = true
            }
        },
        ParseNumber: function () {
            var e = this.Match(/^\d+/);
            if (this.atom && !this.sub) {
                this.sub = e
            } else {
                this.FinishAtom();
                var d = this.Match(/^\/\d+/);
                if (d) {
                    var c = "\\frac{" + e + "}{" + d.substr(1) + "}";
                    this.tex += "\\mathchoice{\\textstyle" + c + "}{" + c + "}{" + c + "}{" + c + "}"
                } else {
                    this.tex += e;
                    if (this.i < this.string.length) {
                        this.tex += "\\,"
                    }
                }
            }
        },
        ParseMinus: function (d) {
            if (this.atom && (this.i === this.string.length - 1 || this.string.charAt(this.i + 1) === " ")) {
                this.sup += d
            } else {
                this.FinishAtom();
                if (this.string.substr(this.i, 2) === "->") {
                    this.i += 2;
                    this.AddArrow("->");
                    return
                } else {
                    this.tex += "{-}"
                }
            }
            this.i++
        },
        ParsePlus: function (d) {
            if (this.atom) {
                this.sup += d
            } else {
                this.FinishAtom();
                this.tex += d
            }
            this.i++
        },
        ParseDot: function (d) {
            this.FinishAtom();
            this.tex += "\\cdot ";
            this.i++
        },
        ParseEqual: function (d) {
            this.FinishAtom();
            this.tex += "{=}";
            this.i++
        },
        ParsePound: function (d) {
            this.FinishAtom();
            this.tex += "{\\equiv}";
            this.i++
        },
        ParseOpen: function (e) {
            this.FinishAtom();
            var d = this.Match(/^\([v^]\)/);
            if (d) {
                this.tex += "{\\" + this.Arrows[d.charAt(1)] + "}"
            } else {
                this.tex += "{" + e;
                this.i++
            }
        },
        ParseClose: function (d) {
            this.FinishAtom();
            this.atom = true;
            this.tex += d + "}";
            this.i++
        },
        ParseLess: function (e) {
            this.FinishAtom();
            var d = this.Match(/^(<->?|<=>>?|<<=>)/);
            if (!d) {
                this.tex += e;
                this.i++
            } else {
                this.AddArrow(d)
            }
        },
        ParseSuperscript: function (f) {
            f = this.string.charAt(++this.i);
            if (f === "{") {
                this.i++;
                var d = this.Find("}");
                if (d === "-.") {
                    this.sup += "{-}{\\cdot}"
                } else {
                    if (d) {
                        this.sup += a(d).Parse().replace(/^\{-\}/, "-")
                    }
                }
            } else {
                if (f === " " || f === "") {
                    this.tex += "{\\" + this.Arrows["^"] + "}";
                    this.i++
                } else {
                    var e = this.Match(/^(\d+|-\.)/);
                    if (e) {
                        this.sup += e
                    }
                }
            }
        },
        ParseSubscript: function (e) {
            if (this.string.charAt(++this.i) == "{") {
                this.i++;
                this.sub += a(this.Find("}")).Parse().replace(/^\{-\}/, "-")
            } else {
                var d = this.Match(/^\d+/);
                if (d) {
                    this.sub += d
                }
            }
        },
        ParseMath: function (d) {
            this.FinishAtom();
            this.i++;
            this.tex += this.Find(d)
        },
        ParseMacro: function (f) {
            this.FinishAtom();
            this.i++;
            var d = this.Match(/^([a-z]+|.)/i) || " ";
            if (d === "sbond") {
                this.tex += "{-}"
            } else {
                if (d === "dbond") {
                    this.tex += "{=}"
                } else {
                    if (d === "tbond") {
                        this.tex += "{\\equiv}"
                    } else {
                        if (d === "bond") {
                            var e = (this.Match(/^\{.*?\}/) || "");
                            e = e.substr(1, e.length - 2);
                            this.tex += "{" + (this.Bonds[e] || "\\text{??}") + "}"
                        } else {
                            if (d === "{") {
                                this.tex += "{\\{"
                            } else {
                                if (d === "}") {
                                    this.tex += "\\}}";
                                    this.atom = true
                                } else {
                                    this.tex += f + d
                                }
                            }
                        }
                    }
                }
            }
        },
        ParseSpace: function (d) {
            this.FinishAtom();
            this.i++
        },
        ParseOther: function (d) {
            this.FinishAtom();
            this.tex += d;
            this.i++
        },
        AddArrow: function (e) {
            var g = this.Match(/^[CT]\[/);
            if (g) {
                this.i--;
                g = g.charAt(0)
            }
            var d = this.GetBracket(g), f = this.GetBracket(g);
            e = this.Arrows[e];
            if (d || f) {
                if (f) {
                    e += "[" + f + "]"
                }
                e += "{" + d + "}";
                e = "\\mathrel{\\x" + e + "}"
            } else {
                e = "\\long" + e + " "
            }
            this.tex += e
        },
        FinishAtom: function () {
            if (this.sup || this.sub) {
                if (this.sup && this.sub && !this.atom) {
                    var c = this.sup, d = this.sub;
                    if (!c.match(/\d/)) {
                        c += "\\vphantom{0}"
                    }
                    if (!d.match(/\d/)) {
                        d += "\\vphantom{0}"
                    }
                    this.tex += "\\raise 1pt{\\scriptstyle\\begin{CEscriptstack}" + c + "\\\\" + d + "\\end{CEscriptstack}}\\kern-.125em "
                } else {
                    if (!this.sup) {
                        this.sup = "\\Space{0pt}{0pt}{.2em}"
                    }
                    this.tex += "^{" + this.sup + "}_{" + this.sub + "}"
                }
                this.sup = this.sub = ""
            }
            this.atom = false
        },
        GetBracket: function (e) {
            if (this.string.charAt(this.i) !== "[") {
                return ""
            }
            this.i++;
            var d = this.Find("]");
            if (e === "C") {
                d = "\\ce{" + d + "}"
            } else {
                if (e === "T") {
                    if (!d.match(/^\{.*\}$/)) {
                        d = "{" + d + "}"
                    }
                    d = "\\text" + d
                }
            }
            return d
        },
        Match: function (d) {
            var c = d.exec(this.string.substr(this.i));
            if (c) {
                c = c[0];
                this.i += c.length
            }
            return c
        },
        Find: function (h) {
            var d = this.string.length, e = this.i, g = 0;
            while (this.i < d) {
                var f = this.string.charAt(this.i++);
                if (f === h && g === 0) {
                    return this.string.substr(e, this.i - e - 1)
                }
                if (f === "{") {
                    g++
                } else {
                    if (f === "}") {
                        if (g) {
                            g--
                        } else {
                            b.Error(["ExtraCloseMissingOpen", "Extra close brace or missing open brace"])
                        }
                    }
                }
            }
            if (g) {
                b.Error(["MissingCloseBrace", "Missing close brace"])
            }
            b.Error(["NoClosingChar", "Can't find closing %1", h])
        }
    });
    MathJax.Extension["TeX/mhchem"].CE = a;
    b.Definitions.Add({
        macros: {
            ce: "CE",
            cf: "CE",
            cee: "CE",
            xleftrightarrow: ["Extension", "AMSmath"],
            xrightleftharpoons: ["Extension", "AMSmath"],
            xRightleftharpoons: ["Extension", "AMSmath"],
            xLeftrightharpoons: ["Extension", "AMSmath"],
            longrightleftharpoons: ["Macro", "\\stackrel{\\textstyle{{-}\\!\\!{\\rightharpoonup}}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}"],
            longRightleftharpoons: ["Macro", "\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\small\\smash\\leftharpoondown}"],
            longLeftrightharpoons: ["Macro", "\\stackrel{\\rightharpoonup}{{{\\leftharpoondown}\\!\\!\\textstyle{-}}}"],
            hyphen: ["Macro", "\\text{-}"],
            tripledash: ["Macro", "\\raise3mu{\\tiny\\text{-}\\kern2mu\\text{-}\\kern2mu\\text{-}}"]
        },
        environment: {
            CEstack: ["Array", null, null, null, "r", null, "0.001em", "T", 1],
            CEscriptstack: ["Array", null, null, null, "r", null, "0.2em", "S", 1]
        }
    }, null, true);
    if (!MathJax.Extension["TeX/AMSmath"]) {
        b.Definitions.Add({
            macros: {
                xrightarrow: ["Extension", "AMSmath"],
                xleftarrow: ["Extension", "AMSmath"]
            }
        }, null, true)
    }
    MathJax.Hub.Register.StartupHook("TeX AMSmath Ready", function () {
        b.Definitions.Add({
            macros: {
                xleftrightarrow: ["xArrow", 8596, 6, 6],
                xrightleftharpoons: ["xArrow", 8652, 5, 7],
                xRightleftharpoons: ["xArrow", 8652, 5, 7],
                xLeftrightharpoons: ["xArrow", 8652, 5, 7]
            }
        }, null, true)
    });
    b.Parse.Augment({
        CE: function (e) {
            var c = this.GetArgument(e);
            var d = a(c).Parse();
            this.string = d + this.string.substr(this.i);
            this.i = 0
        }
    });
    MathJax.Hub.Startup.signal.Post("TeX mhchem Ready")
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/mhchem.js");
