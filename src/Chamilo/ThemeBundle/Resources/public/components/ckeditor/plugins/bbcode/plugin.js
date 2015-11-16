﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
    CKEDITOR.on("dialogDefinition", function (a) {
        var b;
        b = a.data.name;
        a = a.data.definition;
        "link" == b ? (a.removeContents("target"), a.removeContents("upload"), a.removeContents("advanced"), b = a.getContents("info"), b.remove("emailSubject"), b.remove("emailBody")) : "image" == b && (a.removeContents("advanced"), b = a.getContents("Link"), b.remove("cmbTarget"), b = a.getContents("info"), b.remove("txtAlt"), b.remove("basic"))
    });
    var l = {
        b: "strong",
        u: "u",
        i: "em",
        color: "span",
        size: "span",
        quote: "blockquote",
        code: "code",
        url: "a",
        email: "span",
        img: "span",
        "*": "li",
        list: "ol"
    }, x = {
        strong: "b",
        b: "b",
        u: "u",
        em: "i",
        i: "i",
        code: "code",
        li: "*"
    }, m = {
        strong: "b",
        em: "i",
        u: "u",
        li: "*",
        ul: "list",
        ol: "list",
        code: "code",
        a: "link",
        img: "img",
        blockquote: "quote"
    }, y = {color: "color", size: "font-size"}, z = {
        url: "href",
        email: "mailhref",
        quote: "cite",
        list: "listType"
    }, n = CKEDITOR.dtd, A = CKEDITOR.tools.extend({table: 1}, n.$block, n.$listItem, n.$tableContent, n.$list), C = /\s*(?:;\s*|$)/, q = {
        smiley: ":)",
        sad: ":(",
        wink: ";)",
        laugh: ":D",
        cheeky: ":P",
        blush: ":*)",
        surprise: ":-o",
        indecision: ":|",
        angry: "\x3e:(",
        angel: "o:)",
        cool: "8-)",
        devil: "\x3e:-)",
        crying: ";(",
        kiss: ":-*"
    }, B = {}, r = [], t;
    for (t in q)B[q[t]] = t, r.push(q[t].replace(/\(|\)|\:|\/|\*|\-|\|/g, function (a) {
        return "\\" + a
    }));
    var r = new RegExp(r.join("|"), "g"), D = function () {
        var a = [], b = {nbsp: " ", shy: "­"}, c;
        for (c in b)a.push(c);
        a = new RegExp("\x26(" + a.join("|") + ");", "g");
        return function (c) {
            return c.replace(a, function (a, c) {
                return b[c]
            })
        }
    }();
    CKEDITOR.BBCodeParser = function () {
        this._ = {bbcPartsRegex: /(?:\[([^\/\]=]*?)(?:=([^\]]*?))?\])|(?:\[\/([a-z]{1,16})\])/ig}
    };
    CKEDITOR.BBCodeParser.prototype = {
        parse: function (a) {
            for (var b, c, h = 0; b = this._.bbcPartsRegex.exec(a);)if (c = b.index, c > h && (h = a.substring(h, c), this.onText(h, 1)), h = this._.bbcPartsRegex.lastIndex, (c = (b[1] || b[3] || "").toLowerCase()) && !l[c])this.onText(b[0]); else if (b[1]) {
                var f = l[c], k = {}, g = {};
                if (b = b[2])if ("list" == c && (isNaN(b) ? /^[a-z]+$/.test(b) ? b = "lower-alpha" : /^[A-Z]+$/.test(b) && (b = "upper-alpha") : b = "decimal"), y[c]) {
                    "size" == c && (b += "%");
                    g[y[c]] = b;
                    b = k;
                    var e = "", d = void 0;
                    for (d in g)var u = (d + ":" + g[d]).replace(C,
                        ";"), e = e + u;
                    b.style = e
                } else z[c] && (k[z[c]] = CKEDITOR.tools.htmlDecode(b));
                if ("email" == c || "img" == c)k.bbcode = c;
                this.onTagOpen(f, k, CKEDITOR.dtd.$empty[f])
            } else if (b[3])this.onTagClose(l[c]);
            if (a.length > h)this.onText(a.substring(h, a.length), 1)
        }
    };
    CKEDITOR.htmlParser.fragment.fromBBCode = function (a) {
        function b(a) {
            if (0 < g.length)for (var f = 0; f < g.length; f++) {
                var b = g[f], c = b.name, k = CKEDITOR.dtd[c], e = d.name && CKEDITOR.dtd[d.name];
                e && !e[c] || a && k && !k[a] && CKEDITOR.dtd[a] || (b = b.clone(), b.parent = d, d = b, g.splice(f, 1), f--)
            }
        }

        function c(a, f) {
            var b = d.children.length, c = 0 < b && d.children[b - 1], b = !c && v.getRule(m[d.name], "breakAfterOpen"), c = c && c.type == CKEDITOR.NODE_ELEMENT && v.getRule(m[c.name], "breakAfterClose"), k = a && v.getRule(m[a], f ? "breakBeforeClose" : "breakBeforeOpen");
            e && (b || c || k) && e--;
            e && a in A && e++;
            for (; e && e--;)d.children.push(new CKEDITOR.htmlParser.element("br"))
        }

        function h(a, f) {
            c(a.name, 1);
            f = f || d || k;
            var b = f.children.length;
            a.previous = 0 < b && f.children[b - 1] || null;
            a.parent = f;
            f.children.push(a);
            a.returnPoint && (d = a.returnPoint,
                delete a.returnPoint)
        }

        var f = new CKEDITOR.BBCodeParser, k = new CKEDITOR.htmlParser.fragment, g = [], e = 0, d = k, u;
        f.onTagOpen = function (a, k) {
            var e = new CKEDITOR.htmlParser.element(a, k);
            if (CKEDITOR.dtd.$removeEmpty[a])g.push(e); else {
                var w = d.name, p = w && (CKEDITOR.dtd[w] || (d._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span));
                if (p && !p[a]) {
                    var p = !1, l;
                    a == w ? h(d, d.parent) : (a in CKEDITOR.dtd.$listItem ? (f.onTagOpen("ul", {}), l = d) : (h(d, d.parent), g.unshift(d)), p = !0);
                    d = l ? l : d.returnPoint || d.parent;
                    if (p) {
                        f.onTagOpen.apply(this,
                            arguments);
                        return
                    }
                }
                b(a);
                c(a);
                e.parent = d;
                e.returnPoint = u;
                u = 0;
                e.isEmpty ? h(e) : d = e
            }
        };
        f.onTagClose = function (a) {
            for (var f = g.length - 1; 0 <= f; f--)if (a == g[f].name) {
                g.splice(f, 1);
                return
            }
            for (var b = [], c = [], e = d; e.type && e.name != a;)e._.isBlockLike || c.unshift(e), b.push(e), e = e.parent;
            if (e.type) {
                for (f = 0; f < b.length; f++)a = b[f], h(a, a.parent);
                d = e;
                h(e, e.parent);
                e == d && (d = d.parent);
                g = g.concat(c)
            }
        };
        f.onText = function (a) {
            var f = CKEDITOR.dtd[d.name];
            if (!f || f["#"])c(), b(), a.replace(/(\r\n|[\r\n])|[^\r\n]*/g, function (a, f) {
                if (void 0 !==
                    f && f.length)e++; else if (a.length) {
                    var b = 0;
                    a.replace(r, function (f, c) {
                        h(new CKEDITOR.htmlParser.text(a.substring(b, c)), d);
                        h(new CKEDITOR.htmlParser.element("smiley", {desc: B[f]}), d);
                        b = c + f.length
                    });
                    b != a.length && h(new CKEDITOR.htmlParser.text(a.substring(b, a.length)), d)
                }
            })
        };
        for (f.parse(CKEDITOR.tools.htmlEncode(a)); d.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT;)a = d.parent, h(d, a), d = a;
        return k
    };
    var v = new (CKEDITOR.tools.createClass({
        $: function () {
            this._ = {output: [], rules: []};
            this.setRules("list", {
                breakBeforeOpen: 1,
                breakAfterOpen: 1, breakBeforeClose: 1, breakAfterClose: 1
            });
            this.setRules("*", {
                breakBeforeOpen: 1,
                breakAfterOpen: 0,
                breakBeforeClose: 1,
                breakAfterClose: 0
            });
            this.setRules("quote", {
                breakBeforeOpen: 1,
                breakAfterOpen: 0,
                breakBeforeClose: 0,
                breakAfterClose: 1
            })
        }, proto: {
            setRules: function (a, b) {
                var c = this._.rules[a];
                c ? CKEDITOR.tools.extend(c, b, !0) : this._.rules[a] = b
            }, getRule: function (a, b) {
                return this._.rules[a] && this._.rules[a][b]
            }, openTag: function (a) {
                a in l && (this.getRule(a, "breakBeforeOpen") && this.lineBreak(1), this.write("[",
                    a))
            }, openTagClose: function (a) {
                "br" == a ? this._.output.push("\n") : a in l && (this.write("]"), this.getRule(a, "breakAfterOpen") && this.lineBreak(1))
            }, attribute: function (a, b) {
                "option" == a && this.write("\x3d", b)
            }, closeTag: function (a) {
                a in l && (this.getRule(a, "breakBeforeClose") && this.lineBreak(1), "*" != a && this.write("[/", a, "]"), this.getRule(a, "breakAfterClose") && this.lineBreak(1))
            }, text: function (a) {
                this.write(a)
            }, comment: function () {
            }, lineBreak: function () {
                !this._.hasLineBreak && this._.output.length && (this.write("\n"),
                    this._.hasLineBreak = 1)
            }, write: function () {
                this._.hasLineBreak = 0;
                var a = Array.prototype.join.call(arguments, "");
                this._.output.push(a)
            }, reset: function () {
                this._.output = [];
                this._.hasLineBreak = 0
            }, getHtml: function (a) {
                var b = this._.output.join("");
                a && this.reset();
                return D(b)
            }
        }
    }));
    CKEDITOR.plugins.add("bbcode", {
        requires: "entities", beforeInit: function (a) {
            CKEDITOR.tools.extend(a.config, {
                enterMode: CKEDITOR.ENTER_BR,
                basicEntities: !1,
                entities: !1,
                fillEmptyBlocks: !1
            }, !0);
            a.filter.disable();
            a.activeEnterMode = a.enterMode =
                CKEDITOR.ENTER_BR
        }, init: function (a) {
            function b(a) {
                var b = a.data;
                a = CKEDITOR.htmlParser.fragment.fromBBCode(a.data.dataValue);
                var c = new CKEDITOR.htmlParser.basicWriter;
                a.writeHtml(c, h);
                a = c.getHtml(!0);
                b.dataValue = a
            }

            var c = a.config, h = new CKEDITOR.htmlParser.filter;
            h.addRules({
                elements: {
                    blockquote: function (a) {
                        var b = new CKEDITOR.htmlParser.element("div");
                        b.children = a.children;
                        a.children = [b];
                        if (b = a.attributes.cite) {
                            var c = new CKEDITOR.htmlParser.element("cite");
                            c.add(new CKEDITOR.htmlParser.text(b.replace(/^"|"$/g,
                                "")));
                            delete a.attributes.cite;
                            a.children.unshift(c)
                        }
                    }, span: function (a) {
                        var b;
                        if (b = a.attributes.bbcode)"img" == b ? (a.name = "img", a.attributes.src = a.children[0].value, a.children = []) : "email" == b && (a.name = "a", a.attributes.href = "mailto:" + a.children[0].value), delete a.attributes.bbcode
                    }, ol: function (a) {
                        a.attributes.listType ? "decimal" != a.attributes.listType && (a.attributes.style = "list-style-type:" + a.attributes.listType) : a.name = "ul";
                        delete a.attributes.listType
                    }, a: function (a) {
                        a.attributes.href || (a.attributes.href =
                            a.children[0].value)
                    }, smiley: function (a) {
                        a.name = "img";
                        var b = a.attributes.desc, g = c.smiley_images[CKEDITOR.tools.indexOf(c.smiley_descriptions, b)], g = CKEDITOR.tools.htmlEncode(c.smiley_path + g);
                        a.attributes = {
                            src: g,
                            "data-cke-saved-src": g,
                            title: b,
                            alt: b
                        }
                    }
                }
            });
            a.dataProcessor.htmlFilter.addRules({
                elements: {
                    $: function (b) {
                        var c = b.attributes, g = CKEDITOR.tools.parseCssText(c.style, 1), e, d = b.name;
                        if (d in x)d = x[d]; else if ("span" == d)if (e = g.color)d = "color", e = CKEDITOR.tools.convertRgbToHex(e); else {
                            if (e = g["font-size"])if (c =
                                    e.match(/(\d+)%$/))e = c[1], d = "size"
                        } else if ("ol" == d || "ul" == d) {
                            if (e = g["list-style-type"])switch (e) {
                                case "lower-alpha":
                                    e = "a";
                                    break;
                                case "upper-alpha":
                                    e = "A"
                            } else"ol" == d && (e = 1);
                            d = "list"
                        } else if ("blockquote" == d) {
                            try {
                                var h = b.children[0], l = b.children[1], m = "cite" == h.name && h.children[0].value;
                                m && (e = '"' + m + '"', b.children = l.children)
                            } catch (n) {
                            }
                            d = "quote"
                        } else if ("a" == d) {
                            if (e = c.href)-1 !== e.indexOf("mailto:") ? (d = "email", b.children = [new CKEDITOR.htmlParser.text(e.replace("mailto:", ""))], e = "") : ((d = 1 == b.children.length &&
                                b.children[0]) && d.type == CKEDITOR.NODE_TEXT && d.value == e && (e = ""), d = "url")
                        } else if ("img" == d) {
                            b.isEmpty = 0;
                            g = c["data-cke-saved-src"] || c.src;
                            c = c.alt;
                            if (g && -1 != g.indexOf(a.config.smiley_path) && c)return new CKEDITOR.htmlParser.text(q[c]);
                            b.children = [new CKEDITOR.htmlParser.text(g)]
                        }
                        b.name = d;
                        e && (b.attributes.option = e);
                        return null
                    }, br: function (a) {
                        if ((a = a.next) && a.name in A)return !1
                    }
                }
            }, 1);
            a.dataProcessor.writer = v;
            if (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE)a.once("contentDom", function () {
                a.on("setData", b)
            });
            else a.on("setData", b)
        }, afterInit: function (a) {
            var b;
            a._.elementsPath && (b = a._.elementsPath.filters) && b.push(function (b) {
                var h = b.getName(), f = m[h] || !1;
                "link" == f && 0 === b.getAttribute("href").indexOf("mailto:") ? f = "email" : "span" == h ? b.getStyle("font-size") ? f = "size" : b.getStyle("color") && (f = "color") : "img" == f && (b = b.data("cke-saved-src") || b.getAttribute("src")) && 0 === b.indexOf(a.config.smiley_path) && (f = "smiley");
                return f
            })
        }
    })
})();
