/*
 *  /MathJax/jax/output/SVG/jax.js
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

(function (b, c, g, h) {
    var a;
    var e = "http://www.w3.org/2000/svg";
    var f = "http://www.w3.org/1999/xlink";
    h.Augment({
        config: {
            styles: {
                ".MathJax_SVG": {
                    display: "inline",
                    "font-style": "normal",
                    "font-weight": "normal",
                    "line-height": "normal",
                    "font-size": "100%",
                    "font-size-adjust": "none",
                    "text-indent": 0,
                    "text-align": "left",
                    "text-transform": "none",
                    "letter-spacing": "normal",
                    "word-spacing": "normal",
                    "word-wrap": "normal",
                    "white-space": "nowrap",
                    "float": "none",
                    direction: "ltr",
                    "max-width": "none",
                    "max-height": "none",
                    "min-width": 0,
                    "min-height": 0,
                    border: 0,
                    padding: 0,
                    margin: 0
                },
                ".MathJax_SVG_Display": {
                    position: "relative",
                    display: "block!important",
                    "text-indent": 0,
                    "max-width": "none",
                    "max-height": "none",
                    "min-width": 0,
                    "min-height": 0,
                    width: "100%"
                },
                ".MathJax_SVG *": {
                    transition: "none",
                    "-webkit-transition": "none",
                    "-moz-transition": "none",
                    "-ms-transition": "none",
                    "-o-transition": "none"
                },
                ".mjx-svg-href": {fill: "blue", stroke: "blue"},
                ".MathJax_SVG_Processing": {
                    visibility: "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    overflow: "hidden",
                    display: "block!important"
                },
                ".MathJax_SVG_Processed": {display: "none!important"},
                ".MathJax_SVG_ExBox": {
                    display: "block!important",
                    overflow: "hidden",
                    width: "1px",
                    height: "60ex",
                    "min-height": 0,
                    "max-height": "none",
                    padding: 0,
                    border: 0,
                    margin: 0
                },
                "#MathJax_SVG_Tooltip": {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "auto",
                    height: "auto",
                    display: "none"
                }
            }
        },
        hideProcessedMath: true,
        fontNames: ["TeX", "STIX", "STIX-Web", "Asana-Math", "Gyre-Termes", "Gyre-Pagella", "Latin-Modern", "Neo-Euler"],
        Config: function () {
            this.SUPER(arguments).Config.apply(this, arguments);
            var k = c.config.menuSettings, j = this.config, i = k.font;
            if (k.scale) {
                j.scale = k.scale
            }
            if (i && i !== "Auto") {
                i = i.replace(/(Local|Web|Image)$/i, "");
                i = i.replace(/([a-z])([A-Z])/, "$1-$2");
                this.fontInUse = i
            } else {
                this.fontInUse = j.font || "TeX"
            }
            if (this.fontNames.indexOf(this.fontInUse) < 0) {
                this.fontInUse = "TeX"
            }
            this.fontDir += "/" + this.fontInUse;
            if (!this.require) {
                this.require = []
            }
            this.require.push(this.fontDir + "/fontdata.js");
            this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js")
        },
        Startup: function () {
            EVENT = MathJax.Extension.MathEvents.Event;
            TOUCH = MathJax.Extension.MathEvents.Touch;
            HOVER = MathJax.Extension.MathEvents.Hover;
            this.ContextMenu = EVENT.ContextMenu;
            this.Mousedown = EVENT.AltContextMenu;
            this.Mouseover = HOVER.Mouseover;
            this.Mouseout = HOVER.Mouseout;
            this.Mousemove = HOVER.Mousemove;
            this.hiddenDiv = g.Element("div", {
                style: {
                    visibility: "hidden",
                    overflow: "hidden",
                    position: "absolute",
                    top: 0,
                    height: "1px",
                    width: "auto",
                    padding: 0,
                    border: 0,
                    margin: 0,
                    textAlign: "left",
                    textIndent: 0,
                    textTransform: "none",
                    lineHeight: "normal",
                    letterSpacing: "normal",
                    wordSpacing: "normal"
                }
            });
            if (!document.body.firstChild) {
                document.body.appendChild(this.hiddenDiv)
            } else {
                document.body.insertBefore(this.hiddenDiv, document.body.firstChild)
            }
            this.hiddenDiv = g.addElement(this.hiddenDiv, "div", {id: "MathJax_SVG_Hidden"});
            var i = g.addElement(this.hiddenDiv, "div", {style: {width: "5in"}});
            this.pxPerInch = i.offsetWidth / 5;
            this.hiddenDiv.removeChild(i);
            this.textSVG = this.Element("svg");
            d.GLYPH.defs = this.addElement(this.addElement(this.hiddenDiv.parentNode, "svg"), "defs", {id: "MathJax_SVG_glyphs"});
            this.ExSpan = g.Element("span", {
                style: {
                    position: "absolute",
                    "font-size-adjust": "none"
                }
            }, [["span", {className: "MathJax_SVG_ExBox"}]]);
            this.linebreakSpan = g.Element("span", null, [["hr", {
                style: {
                    width: "auto",
                    size: 1,
                    padding: 0,
                    border: 0,
                    margin: 0
                }
            }]]);
            return b.Styles(this.config.styles, ["InitializeSVG", this])
        },
        InitializeSVG: function () {
            document.body.appendChild(this.ExSpan);
            document.body.appendChild(this.linebreakSpan);
            this.defaultEx = this.ExSpan.firstChild.offsetHeight / 60;
            this.defaultWidth = this.linebreakSpan.firstChild.offsetWidth;
            document.body.removeChild(this.linebreakSpan);
            document.body.removeChild(this.ExSpan)
        },
        preTranslate: function (n) {
            var s = n.jax[this.id], t, q = s.length, y, r, z, l, x, k, w, p, j, v = false, u, A = this.config.linebreaks.automatic, o = this.config.linebreaks.width;
            if (A) {
                v = (o.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/) != null);
                if (v) {
                    o = o.replace(/\s*container\s*/, "")
                } else {
                    j = this.defaultWidth
                }
                if (o === "") {
                    o = "100%"
                }
            } else {
                j = 100000
            }
            for (t = 0; t < q; t++) {
                y = s[t];
                if (!y.parentNode) {
                    continue
                }
                r = y.previousSibling;
                if (r && String(r.className).match(/^MathJax(_SVG)?(_Display)?( MathJax(_SVG)?_Processing)?$/)) {
                    r.parentNode.removeChild(r)
                }
                k = y.MathJax.elementJax;
                if (!k) {
                    continue
                }
                k.SVG = {display: (k.root.Get("display") === "block")};
                z = l = g.Element("span", {
                    style: {
                        "font-size": this.config.scale + "%",
                        display: "inline-block"
                    },
                    className: "MathJax_SVG",
                    id: k.inputID + "-Frame",
                    isMathJax: true,
                    jaxID: this.id,
                    oncontextmenu: EVENT.Menu,
                    onmousedown: EVENT.Mousedown,
                    onmouseover: EVENT.Mouseover,
                    onmouseout: EVENT.Mouseout,
                    onmousemove: EVENT.Mousemove,
                    onclick: EVENT.Click,
                    ondblclick: EVENT.DblClick
                });
                if (c.Browser.noContextMenu) {
                    z.ontouchstart = TOUCH.start;
                    z.ontouchend = TOUCH.end
                }
                if (k.SVG.display) {
                    l = g.Element("div", {className: "MathJax_SVG_Display"});
                    l.appendChild(z)
                }
                l.className += " MathJax_SVG_Processing";
                y.parentNode.insertBefore(l, y);
                y.parentNode.insertBefore(this.ExSpan.cloneNode(true), y);
                l.parentNode.insertBefore(this.linebreakSpan.cloneNode(true), l)
            }
            for (t = 0; t < q; t++) {
                y = s[t];
                if (!y.parentNode) {
                    continue
                }
                x = y.previousSibling;
                l = x.previousSibling;
                k = y.MathJax.elementJax;
                if (!k) {
                    continue
                }
                w = x.firstChild.offsetHeight / 60;
                u = l.previousSibling.firstChild.offsetWidth;
                if (v) {
                    j = u
                }
                if (w === 0 || w === "NaN") {
                    this.hiddenDiv.appendChild(l);
                    k.SVG.isHidden = true;
                    w = this.defaultEx;
                    u = this.defaultWidth;
                    if (v) {
                        j = u
                    }
                }
                k.SVG.ex = w;
                k.SVG.em = p = w / h.TeX.x_height * 1000;
                k.SVG.cwidth = u / p * 1000;
                k.SVG.lineWidth = (A ? this.length2em(o, 1, j / p * 1000) : h.BIGDIMEN)
            }
            for (t = 0; t < q; t++) {
                y = s[t];
                if (!y.parentNode) {
                    continue
                }
                x = s[t].previousSibling;
                z = x.previousSibling;
                k = s[t].MathJax.elementJax;
                if (!k) {
                    continue
                }
                if (!k.SVG.isHidden) {
                    z = z.previousSibling
                }
                z.parentNode.removeChild(z);
                x.parentNode.removeChild(x)
            }
            n.SVGeqn = n.SVGlast = 0;
            n.SVGi = -1;
            n.SVGchunk = this.config.EqnChunk;
            n.SVGdelay = false
        },
        Translate: function (j, n) {
            if (!j.parentNode) {
                return
            }
            if (n.SVGdelay) {
                n.SVGdelay = false;
                c.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay))
            }
            var i = j.MathJax.elementJax, m = i.root, k = document.getElementById(i.inputID + "-Frame"), p = (i.SVG.display ? (k || {}).parentNode : k), o = (h.config.useFontCache && !h.config.useGlobalCache);
            if (!p) {
                return
            }
            this.em = a.mbase.prototype.em = i.SVG.em;
            this.ex = i.SVG.ex;
            this.linebreakWidth = i.SVG.lineWidth;
            this.cwidth = i.SVG.cwidth;
            this.mathDiv = p;
            k.appendChild(this.textSVG);
            if (o) {
                h.resetGlyphs()
            }
            this.initSVG(m, k);
            m.setTeXclass();
            try {
                m.toSVG(k, p)
            } catch (l) {
                if (l.restart) {
                    while (k.firstChild) {
                        k.removeChild(k.firstChild)
                    }
                }
                if (o) {
                    d.GLYPH.n--
                }
                throw l
            }
            k.removeChild(this.textSVG);
            if (i.SVG.isHidden) {
                j.parentNode.insertBefore(p, j)
            }
            p.className = p.className.split(/ /)[0];
            if (this.hideProcessedMath) {
                p.className += " MathJax_SVG_Processed";
                if (j.MathJax.preview) {
                    i.SVG.preview = j.MathJax.preview;
                    delete j.MathJax.preview
                }
                n.SVGeqn += (n.i - n.SVGi);
                n.SVGi = n.i;
                if (n.SVGeqn >= n.SVGlast + n.SVGchunk) {
                    this.postTranslate(n, true);
                    n.SVGchunk = Math.floor(n.SVGchunk * this.config.EqnChunkFactor);
                    n.SVGdelay = true
                }
            }
        },
        postTranslate: function (q, n) {
            var k = q.jax[this.id];
            if (!this.hideProcessedMath) {
                return
            }
            for (var o = q.SVGlast, j = q.SVGeqn; o < j; o++) {
                var l = k[o];
                if (l && l.MathJax.elementJax) {
                    l.previousSibling.className = l.previousSibling.className.split(/ /)[0];
                    var p = l.MathJax.elementJax.SVG;
                    if (p.preview) {
                        p.preview.innerHTML = "";
                        l.MathJax.preview = p.preview;
                        delete p.preview
                    }
                }
            }
            q.SVGlast = q.SVGeqn
        },
        resetGlyphs: function (j) {
            if (this.config.useFontCache) {
                var i = d.GLYPH;
                if (this.config.useGlobalCache) {
                    i.defs = document.getElementById("MathJax_SVG_glyphs");
                    i.defs.innerHTML = ""
                } else {
                    i.defs = this.Element("defs");
                    i.n++
                }
                i.glyphs = {};
                if (j) {
                    i.n = 0
                }
            }
        },
        hashCheck: function (i) {
            if (i && i.nodeName.toLowerCase() === "g") {
                do {
                    i = i.parentNode
                } while (i && i.firstChild.nodeName !== "svg")
            }
            return i
        },
        getJaxFromMath: function (i) {
            if (i.parentNode.className === "MathJax_SVG_Display") {
                i = i.parentNode
            }
            do {
                i = i.nextSibling
            } while (i && i.nodeName.toLowerCase() !== "script");
            return c.getJaxFor(i)
        },
        getHoverSpan: function (i, j) {
            j.style.position = "relative";
            return j.firstChild
        },
        getHoverBBox: function (i, j, k) {
            var l = EVENT.getBBox(j.parentNode);
            l.h += 2;
            l.d -= 2;
            return l
        },
        Zoom: function (j, s, r, i, p) {
            s.className = "MathJax_SVG";
            var u = s.appendChild(this.ExSpan.cloneNode(true));
            var o = u.firstChild.offsetHeight / 60;
            this.em = a.mbase.prototype.em = o / h.TeX.x_height * 1000;
            this.ex = o;
            this.linebreakWidth = j.SVG.lineWidth;
            this.cwidth = j.SVG.cwidth;
            u.parentNode.removeChild(u);
            s.appendChild(this.textSVG);
            this.mathDIV = s;
            this.zoomScale = parseInt(c.config.menuSettings.zscale) / 100;
            var n = j.root.data[0].SVGdata.tw;
            if (n && n < this.cwidth) {
                this.cwidth = n
            }
            this.idPostfix = "-zoom";
            j.root.toSVG(s, s);
            this.idPostfix = "";
            this.zoomScale = 1;
            s.removeChild(this.textSVG);
            var m = s.getElementsByTagName("svg")[0].style;
            m.marginTop = m.marginRight = m.marginLeft = 0;
            if (m.marginBottom.charAt(0) === "-") {
                s.style.marginBottom = m.marginBottom.substr(1)
            }
            if (this.operaZoomRefresh) {
                setTimeout(function () {
                    s.firstChild.style.border = "1px solid transparent"
                }, 1)
            }
            if (s.offsetWidth < s.firstChild.offsetWidth) {
                s.style.minWidth = s.firstChild.offsetWidth + "px";
                r.style.minWidth = r.firstChild.offsetWidth + "px"
            }
            s.style.position = r.style.position = "absolute";
            var q = s.offsetWidth, l = s.offsetHeight, t = r.offsetHeight, k = r.offsetWidth;
            s.style.position = r.style.position = "";
            return {Y: -EVENT.getBBox(s).h, mW: k, mH: t, zW: q, zH: l}
        },
        initSVG: function (j, i) {
        },
        Remove: function (i) {
            var j = document.getElementById(i.inputID + "-Frame");
            if (j) {
                if (i.SVG.display) {
                    j = j.parentNode
                }
                j.parentNode.removeChild(j)
            }
            delete i.SVG
        },
        Em: function (i) {
            if (Math.abs(i) < 0.0006) {
                return "0em"
            }
            return i.toFixed(3).replace(/\.?0+$/, "") + "em"
        },
        Ex: function (i) {
            i = Math.round(i / this.TeX.x_height * this.ex) / this.ex;
            if (Math.abs(i) < 0.0006) {
                return "0ex"
            }
            return i.toFixed(3).replace(/\.?0+$/, "") + "ex"
        },
        Percent: function (i) {
            return (100 * i).toFixed(1).replace(/\.?0+$/, "") + "%"
        },
        Fixed: function (i, j) {
            if (Math.abs(i) < 0.0006) {
                return "0"
            }
            return i.toFixed(j || 3).replace(/\.?0+$/, "")
        },
        length2em: function (o, j, l) {
            if (typeof(o) !== "string") {
                o = o.toString()
            }
            if (o === "") {
                return ""
            }
            if (o === a.SIZE.NORMAL) {
                return 1000
            }
            if (o === a.SIZE.BIG) {
                return 2000
            }
            if (o === a.SIZE.SMALL) {
                return 710
            }
            if (o === "infinity") {
                return h.BIGDIMEN
            }
            if (o.match(/mathspace$/)) {
                return 1000 * h.MATHSPACE[o]
            }
            var p = (this.zoomScale || 1) / h.em;
            var k = o.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
            var i = parseFloat(k[1] || "1") * 1000, n = k[2];
            if (l == null) {
                l = 1000
            }
            if (j == null) {
                j = 1
            }
            if (n === "em") {
                return i
            }
            if (n === "ex") {
                return i * h.TeX.x_height / 1000
            }
            if (n === "%") {
                return i / 100 * l / 1000
            }
            if (n === "px") {
                return i * p
            }
            if (n === "pt") {
                return i / 10
            }
            if (n === "pc") {
                return i * 1.2
            }
            if (n === "in") {
                return i * this.pxPerInch * p
            }
            if (n === "cm") {
                return i * this.pxPerInch * p / 2.54
            }
            if (n === "mm") {
                return i * this.pxPerInch * p / 25.4
            }
            if (n === "mu") {
                return i / 18 * j
            }
            return i * l / 1000
        },
        thickness2em: function (j, i) {
            var k = h.TeX.rule_thickness;
            if (j === a.LINETHICKNESS.MEDIUM) {
                return k
            }
            if (j === a.LINETHICKNESS.THIN) {
                return 0.67 * k
            }
            if (j === a.LINETHICKNESS.THICK) {
                return 1.67 * k
            }
            return this.length2em(j, i, k)
        },
        getPadding: function (j) {
            var l = {top: 0, right: 0, bottom: 0, left: 0}, i = false;
            for (var m in l) {
                if (l.hasOwnProperty(m)) {
                    var k = j["padding" + m.charAt(0).toUpperCase() + m.substr(1)];
                    if (k) {
                        l[m] = this.length2em(k);
                        i = true
                    }
                }
            }
            return (i ? l : false)
        },
        getBorders: function (m) {
            var k = {top: 0, right: 0, bottom: 0, left: 0}, j = false;
            for (var n in k) {
                if (k.hasOwnProperty(n)) {
                    var i = "border" + n.charAt(0).toUpperCase() + n.substr(1);
                    var l = m[i + "Style"];
                    if (l && l !== "none") {
                        j = true;
                        k[n] = this.length2em(m[i + "Width"]);
                        k[n + "Style"] = m[i + "Style"];
                        k[n + "Color"] = m[i + "Color"];
                        if (k[n + "Color"] === "initial") {
                            k[n + "Color"] = ""
                        }
                    } else {
                        delete k[n]
                    }
                }
            }
            return (j ? k : false)
        },
        Element: function (i, j) {
            var k = (typeof(i) === "string" ? document.createElementNS(e, i) : i);
            k.isMathJax = true;
            if (j) {
                for (var l in j) {
                    if (j.hasOwnProperty(l)) {
                        k.setAttribute(l, j[l].toString())
                    }
                }
            }
            return k
        },
        addElement: function (j, i, k) {
            return j.appendChild(this.Element(i, k))
        },
        TextNode: g.TextNode,
        addText: g.addText,
        ucMatch: g.ucMatch,
        HandleVariant: function (r, q, A) {
            var u = d.G();
            var l, w, y, o, z, s, p, k, x, j;
            if (!r) {
                r = this.FONTDATA.VARIANT[a.VARIANT.NORMAL]
            }
            if (r.forceFamily) {
                A = d.TEXT(q, A, r.font);
                if (r.h != null) {
                    A.h = r.h
                }
                if (r.d != null) {
                    A.d = r.d
                }
                u.Add(A);
                A = ""
            }
            z = r;
            for (s = 0, p = A.length; s < p; s++) {
                r = z;
                l = A.charCodeAt(s);
                y = A.charAt(s);
                if (l >= 55296 && l < 56319) {
                    s++;
                    l = (((l - 55296) << 10) + (A.charCodeAt(s) - 56320)) + 65536;
                    if (this.FONTDATA.RemapPlane1) {
                        var v = this.FONTDATA.RemapPlane1(l, r);
                        l = v.n;
                        r = v.variant
                    }
                } else {
                    j = this.FONTDATA.RANGES;
                    for (k = 0, x = j.length; k < x; k++) {
                        if (j[k].name === "alpha" && r.noLowerCase) {
                            continue
                        }
                        w = r["offset" + j[k].offset];
                        if (w && l >= j[k].low && l <= j[k].high) {
                            if (j[k].remap && j[k].remap[l]) {
                                l = w + j[k].remap[l]
                            } else {
                                l = l - j[k].low + w;
                                if (j[k].add) {
                                    l += j[k].add
                                }
                            }
                            if (r["variant" + j[k].offset]) {
                                r = this.FONTDATA.VARIANT[r["variant" + j[k].offset]]
                            }
                            break
                        }
                    }
                }
                if (r.remap && r.remap[l]) {
                    l = r.remap[l];
                    if (r.remap.variant) {
                        r = this.FONTDATA.VARIANT[r.remap.variant]
                    }
                } else {
                    if (this.FONTDATA.REMAP[l] && !r.noRemap) {
                        l = this.FONTDATA.REMAP[l]
                    }
                }
                if (l instanceof Array) {
                    r = this.FONTDATA.VARIANT[l[1]];
                    l = l[0]
                }
                if (typeof(l) === "string") {
                    A = l + A.substr(s + 1);
                    p = A.length;
                    s = -1;
                    continue
                }
                o = this.lookupChar(r, l);
                y = o[l];
                if (y) {
                    if ((y[5] && y[5].space) || (y[5] === "" && y[0] + y[1] === 0)) {
                        u.w += y[2]
                    } else {
                        y = [q, o.id + "-" + l.toString(16).toUpperCase()].concat(y);
                        u.Add(d.GLYPH.apply(d, y), u.w, 0)
                    }
                } else {
                    if (this.FONTDATA.DELIMITERS[l]) {
                        y = this.createDelimiter(l, 0, 1, o);
                        u.Add(y, u.w, (this.FONTDATA.DELIMITERS[l].dir === "V" ? y.d : 0))
                    } else {
                        if (l <= 65535) {
                            y = String.fromCharCode(l)
                        } else {
                            w = l - 65536;
                            y = String.fromCharCode((w >> 10) + 55296) + String.fromCharCode((w & 1023) + 56320)
                        }
                        var t = d.TEXT(q * 100 / h.config.scale, y, {
                            "font-family": r.defaultFamily || h.config.undefinedFamily,
                            "font-style": (r.italic ? "italic" : ""),
                            "font-weight": (r.bold ? "bold" : "")
                        });
                        if (r.h != null) {
                            t.h = r.h
                        }
                        if (r.d != null) {
                            t.d = r.d
                        }
                        y = d.G();
                        y.Add(t);
                        u.Add(y, u.w, 0);
                        c.signal.Post(["SVG Jax - unknown char", l, r])
                    }
                }
            }
            if (A.length == 1 && o.skew && o.skew[l]) {
                u.skew = o.skew[l] * 1000
            }
            if (u.element.childNodes.length === 1) {
                u.element = u.element.firstChild;
                u.removeable = false;
                u.scale = q
            }
            return u
        },
        lookupChar: function (o, r) {
            var l, j;
            if (!o.FONTS) {
                var q = this.FONTDATA.FONTS;
                var p = (o.fonts || this.FONTDATA.VARIANT.normal.fonts);
                if (!(p instanceof Array)) {
                    p = [p]
                }
                if (o.fonts != p) {
                    o.fonts = p
                }
                o.FONTS = [];
                for (l = 0, j = p.length; l < j; l++) {
                    if (q[p[l]]) {
                        o.FONTS.push(q[p[l]])
                    }
                }
            }
            for (l = 0, j = o.FONTS.length; l < j; l++) {
                var k = o.FONTS[l];
                if (typeof(k) === "string") {
                    delete o.FONTS;
                    this.loadFont(k)
                }
                if (k[r]) {
                    return k
                } else {
                    this.findBlock(k, r)
                }
            }
            return {id: "unknown"}
        },
        findBlock: function (l, q) {
            if (l.Ranges) {
                for (var p = 0, k = l.Ranges.length; p < k; p++) {
                    if (q < l.Ranges[p][0]) {
                        return
                    }
                    if (q <= l.Ranges[p][1]) {
                        var o = l.Ranges[p][2];
                        for (var n = l.Ranges.length - 1; n >= 0; n--) {
                            if (l.Ranges[n][2] == o) {
                                l.Ranges.splice(n, 1)
                            }
                        }
                        this.loadFont(l.directory + "/" + o + ".js")
                    }
                }
            }
        },
        loadFont: function (i) {
            c.RestartAfter(b.Require(this.fontDir + "/" + i))
        },
        createDelimiter: function (j, l, p, n) {
            if (!p) {
                p = 1
            }
            var r = d.G();
            if (!j) {
                r.Clean();
                delete r.element;
                r.w = r.r = this.TeX.nulldelimiterspace * p;
                return r
            }
            if (!(l instanceof Array)) {
                l = [l, l]
            }
            var s = l[1];
            l = l[0];
            var k = {alias: j};
            while (k.alias) {
                j = k.alias;
                k = this.FONTDATA.DELIMITERS[j];
                if (!k) {
                    k = {HW: [0, this.FONTDATA.VARIANT[a.VARIANT.NORMAL]]}
                }
            }
            if (k.load) {
                c.RestartAfter(b.Require(this.fontDir + "/fontdata-" + k.load + ".js"))
            }
            for (var q = 0, o = k.HW.length; q < o; q++) {
                if (k.HW[q][0] * p >= l - 10 - h.config.blacker || (q == o - 1 && !k.stretch)) {
                    if (k.HW[q][2]) {
                        p *= k.HW[q][2]
                    }
                    if (k.HW[q][3]) {
                        j = k.HW[q][3]
                    }
                    return this.createChar(p, [j, k.HW[q][1]], n).With({stretched: true})
                }
            }
            if (k.stretch) {
                this["extendDelimiter" + k.dir](r, s, k.stretch, p, n)
            }
            return r
        },
        createChar: function (r, p, l) {
            var q = "", o = {fonts: [p[1]], noRemap: true};
            if (l && l === a.VARIANT.BOLD) {
                o.fonts = [p[1] + "-bold", p[1]]
            }
            if (typeof(p[1]) !== "string") {
                o = p[1]
            }
            if (p[0] instanceof Array) {
                for (var n = 0, j = p[0].length; n < j; n++) {
                    q += String.fromCharCode(p[0][n])
                }
            } else {
                q = String.fromCharCode(p[0])
            }
            if (p[4]) {
                r = r * p[4]
            }
            var k = this.HandleVariant(o, r, q);
            if (p[2]) {
                k.x = p[2] * 1000
            }
            if (p[3]) {
                k.y = p[3] * 1000
            }
            if (p[5]) {
                k.h += p[5] * 1000
            }
            if (p[6]) {
                k.d += p[6] * 1000
            }
            return k
        },
        extendDelimiterV: function (p, x, j, m, l) {
            var v = this.createChar(m, (j.top || j.ext), l);
            var r = this.createChar(m, (j.bot || j.ext), l);
            var o = v.h + v.d + r.h + r.d;
            var u = -v.h;
            p.Add(v, 0, u);
            u -= v.d;
            if (j.mid) {
                var w = this.createChar(m, j.mid, l);
                o += w.h + w.d
            }
            if (j.min && x < o * j.min) {
                x = o * j.min
            }
            if (x > o) {
                var i = this.createChar(m, j.ext, l);
                var n = (j.mid ? 2 : 1), t = (x - o) / n, z = (t + 100) / (i.h + i.d);
                while (n-- > 0) {
                    var q = h.Element("g", {transform: "translate(" + i.y + "," + (u - z * i.h + 50 + i.y) + ") scale(1," + z + ")"});
                    q.appendChild(i.element.cloneNode(false));
                    p.element.appendChild(q);
                    u -= t;
                    if (j.mid && n) {
                        p.Add(w, 0, u - w.h);
                        u -= (w.h + w.d)
                    }
                }
            } else {
                if (j.mid) {
                    u += (o - x) / 2;
                    p.Add(w, 0, u - w.h);
                    u += -(w.h + w.d) + (o - x) / 2
                } else {
                    u += (o - x)
                }
            }
            p.Add(r, 0, u - r.h);
            p.Clean();
            p.scale = m;
            p.isMultiChar = true
        },
        extendDelimiterH: function (q, m, j, o, l) {
            var n = this.createChar(o, (j.left || j.rep), l);
            var A = this.createChar(o, (j.right || j.rep), l);
            q.Add(n, -n.l, 0);
            var z = (n.r - n.l) + (A.r - A.l), v = n.r - n.l;
            if (j.mid) {
                var y = this.createChar(o, j.mid, l);
                z += y.w
            }
            if (j.min && m < z * j.min) {
                m = z * j.min
            }
            if (m > z) {
                var u = this.createChar(o, j.rep, l), i = j.fuzz || 0;
                var p = (j.mid ? 2 : 1), t = (m - z) / p, B = (t + i) / (u.r - u.l);
                while (p-- > 0) {
                    var r = h.Element("g", {transform: "translate(" + (v - i / 2 - B * u.l + u.x) + "," + u.y + ") scale(" + B + ",1)"});
                    r.appendChild(u.element.cloneNode(false));
                    q.element.appendChild(r);
                    v += t;
                    if (j.mid && p) {
                        q.Add(y, v, 0);
                        v += y.w
                    }
                }
            } else {
                if (j.mid) {
                    v -= (z - m) / 2;
                    q.Add(y, v, 0);
                    v += y.w - (z - m) / 2
                } else {
                    v -= (z - m)
                }
            }
            q.Add(A, v - A.l, 0);
            q.Clean();
            q.scale = o;
            q.isMultiChar = true
        },
        MATHSPACE: {
            veryverythinmathspace: 1 / 18,
            verythinmathspace: 2 / 18,
            thinmathspace: 3 / 18,
            mediummathspace: 4 / 18,
            thickmathspace: 5 / 18,
            verythickmathspace: 6 / 18,
            veryverythickmathspace: 7 / 18,
            negativeveryverythinmathspace: -1 / 18,
            negativeverythinmathspace: -2 / 18,
            negativethinmathspace: -3 / 18,
            negativemediummathspace: -4 / 18,
            negativethickmathspace: -5 / 18,
            negativeverythickmathspace: -6 / 18,
            negativeveryverythickmathspace: -7 / 18
        },
        TeX: {
            x_height: 430.554,
            quad: 1000,
            num1: 676.508,
            num2: 393.732,
            num3: 443.73,
            denom1: 685.951,
            denom2: 344.841,
            sup1: 412.892,
            sup2: 362.892,
            sup3: 288.888,
            sub1: 150,
            sub2: 247.217,
            sup_drop: 386.108,
            sub_drop: 50,
            delim1: 2390,
            delim2: 1000,
            axis_height: 250,
            rule_thickness: 60,
            big_op_spacing1: 111.111,
            big_op_spacing2: 166.666,
            big_op_spacing3: 200,
            big_op_spacing4: 600,
            big_op_spacing5: 100,
            scriptspace: 100,
            nulldelimiterspace: 120,
            delimiterfactor: 901,
            delimitershortfall: 300,
            min_rule_thickness: 1.25,
            min_root_space: 1.5
        },
        BIGDIMEN: 10000000,
        NBSP: "\u00A0"
    });
    var d = h.BBOX = MathJax.Object.Subclass({
        type: "g",
        removeable: true,
        Init: function (i) {
            this.h = this.d = -h.BIGDIMEN;
            this.H = this.D = 0;
            this.w = this.r = 0;
            this.l = h.BIGDIMEN;
            this.x = this.y = 0;
            this.scale = 1;
            this.n = 0;
            if (this.type) {
                this.element = h.Element(this.type, i)
            }
        },
        With: function (i) {
            return c.Insert(this, i)
        },
        Add: function (k, q, p, i, o) {
            if (q) {
                k.x += q
            }
            if (p) {
                k.y += p
            }
            if (k.element) {
                if (k.removeable && k.element.childNodes.length === 1 && k.n === 1) {
                    var j = k.element.firstChild, m = j.nodeName.toLowerCase();
                    if (m === "use" || m === "rect") {
                        k.element = j;
                        k.scale = k.childScale;
                        var n = k.childX, l = k.childY;
                        k.x += n;
                        k.y += l;
                        k.h -= l;
                        k.d += l;
                        k.H -= l;
                        k.D += l;
                        k.w -= n;
                        k.r -= n;
                        k.l += n;
                        k.removeable = false;
                        j.setAttribute("x", Math.floor(k.x / k.scale));
                        j.setAttribute("y", Math.floor(k.y / k.scale))
                    }
                }
                if (Math.abs(k.x) < 1 && Math.abs(k.y) < 1) {
                    k.remove = k.removeable
                } else {
                    m = k.element.nodeName.toLowerCase();
                    if (m === "g") {
                        if (!k.element.firstChild) {
                            k.remove = k.removeable
                        } else {
                            k.element.setAttribute("transform", "translate(" + Math.floor(k.x) + "," + Math.floor(k.y) + ")")
                        }
                    } else {
                        if (m === "line" || m === "polygon" || m === "path" || m === "a") {
                            k.element.setAttribute("transform", "translate(" + Math.floor(k.x) + "," + Math.floor(k.y) + ")")
                        } else {
                            k.element.setAttribute("x", Math.floor(k.x / k.scale));
                            k.element.setAttribute("y", Math.floor(k.y / k.scale))
                        }
                    }
                }
                if (k.remove) {
                    this.n += k.n;
                    while (k.element.firstChild) {
                        if (o && this.element.firstChild) {
                            this.element.insertBefore(k.element.firstChild, this.element.firstChild)
                        } else {
                            this.element.appendChild(k.element.firstChild)
                        }
                    }
                } else {
                    if (o) {
                        this.element.insertBefore(k.element, this.element.firstChild)
                    } else {
                        this.element.appendChild(k.element)
                    }
                }
                delete k.element
            }
            if (k.hasIndent) {
                this.hasIndent = k.hasIndent
            }
            if (k.tw != null) {
                this.tw = k.tw
            }
            if (k.d - k.y > this.d) {
                this.d = k.d - k.y;
                if (this.d > this.D) {
                    this.D = this.d
                }
            }
            if (k.y + k.h > this.h) {
                this.h = k.y + k.h;
                if (this.h > this.H) {
                    this.H = this.h
                }
            }
            if (k.D - k.y > this.D) {
                this.D = k.D - k.y
            }
            if (k.y + k.H > this.H) {
                this.H = k.y + k.H
            }
            if (k.x + k.l < this.l) {
                this.l = k.x + k.l
            }
            if (k.x + k.r > this.r) {
                this.r = k.x + k.r
            }
            if (i || k.x + k.w + (k.X || 0) > this.w) {
                this.w = k.x + k.w + (k.X || 0)
            }
            this.childScale = k.scale;
            this.childX = k.x;
            this.childY = k.y;
            this.n++;
            return k
        },
        Align: function (m, n, l, k, j) {
            l = ({
                    left: l,
                    center: (this.w - m.w) / 2,
                    right: this.w - m.w - l
                })[n] || 0;
            var i = this.w;
            this.Add(m, l + (j || 0), k);
            this.w = i
        },
        Clean: function () {
            if (this.h === -h.BIGDIMEN) {
                this.h = this.d = this.l = 0
            }
            return this
        }
    });
    d.ROW = d.Subclass({
        Init: function () {
            this.SUPER(arguments).Init.call(this);
            this.svg = [];
            this.sh = this.sd = 0
        }, Check: function (j) {
            var i = j.toSVG();
            this.svg.push(i);
            if (j.SVGcanStretch("Vertical")) {
                i.mml = j
            }
            if (i.h > this.sh) {
                this.sh = i.h
            }
            if (i.d > this.sd) {
                this.sd = i.d
            }
        }, Stretch: function () {
            for (var n = 0, j = this.svg.length; n < j; n++) {
                var k = this.svg[n], l = k.mml;
                if (l) {
                    if (l.forceStretch || l.SVGdata.h !== this.sh || l.SVGdata.d !== this.sd) {
                        k = l.SVGstretchV(this.sh, this.sd)
                    }
                    l.SVGdata.HW = this.sh;
                    l.SVGdata.D = this.sd
                }
                if (k.ic) {
                    this.ic = k.ic
                } else {
                    delete this.ic
                }
                this.Add(k, this.w, 0, true)
            }
            delete this.svg
        }
    });
    d.RECT = d.Subclass({
        type: "rect",
        removeable: false,
        Init: function (j, l, i, k) {
            if (k == null) {
                k = {stroke: "none"}
            }
            k.width = Math.floor(i);
            k.height = Math.floor(j + l);
            this.SUPER(arguments).Init.call(this, k);
            this.w = this.r = i;
            this.h = this.H = j + l;
            this.d = this.D = this.l = 0;
            this.y = -l
        }
    });
    d.FRAME = d.Subclass({
        type: "rect",
        removeable: false,
        Init: function (l, o, i, k, n, j, m) {
            if (m == null) {
                m = {}
            }
            m.fill = "none";
            m["stroke-width"] = h.Fixed(k, 2);
            m.width = Math.floor(i - k);
            m.height = Math.floor(l + o - k);
            m.transform = "translate(" + Math.floor(k / 2) + "," + Math.floor(-o + k / 2) + ")";
            if (n === "dashed") {
                m["stroke-dasharray"] = [Math.floor(6 * h.em), Math.floor(6 * h.em)].join(" ")
            }
            this.SUPER(arguments).Init.call(this, m);
            this.w = this.r = i;
            this.h = this.H = l;
            this.d = this.D = o;
            this.l = 0
        }
    });
    d.HLINE = d.Subclass({
        type: "line",
        removeable: false,
        Init: function (j, l, p, k, o) {
            if (o == null) {
                o = {"stroke-linecap": "square"}
            }
            if (k && k !== "") {
                o.stroke = k
            }
            o["stroke-width"] = h.Fixed(l, 2);
            o.x1 = o.y1 = o.y2 = Math.floor(l / 2);
            o.x2 = Math.floor(j - l / 2);
            if (p === "dashed") {
                var q = Math.floor(Math.max(0, j - l) / (6 * l)), i = Math.floor(Math.max(0, j - l) / (2 * q + 1));
                o["stroke-dasharray"] = i + " " + i
            }
            if (p === "dotted") {
                o["stroke-dasharray"] = [1, Math.max(150, Math.floor(2 * l))].join(" ");
                o["stroke-linecap"] = "round"
            }
            this.SUPER(arguments).Init.call(this, o);
            this.w = this.r = j;
            this.l = 0;
            this.h = this.H = l;
            this.d = this.D = 0
        }
    });
    d.VLINE = d.Subclass({
        type: "line",
        removeable: false,
        Init: function (l, k, p, j, o) {
            if (o == null) {
                o = {"stroke-linecap": "square"}
            }
            if (j && j !== "") {
                o.stroke = j
            }
            o["stroke-width"] = h.Fixed(k, 2);
            o.x1 = o.x2 = o.y1 = Math.floor(k / 2);
            o.y2 = Math.floor(l - k / 2);
            if (p === "dashed") {
                var q = Math.floor(Math.max(0, l - k) / (6 * k)), i = Math.floor(Math.max(0, l - k) / (2 * q + 1));
                o["stroke-dasharray"] = i + " " + i
            }
            if (p === "dotted") {
                o["stroke-dasharray"] = [1, Math.max(150, Math.floor(2 * k))].join(" ");
                o["stroke-linecap"] = "round"
            }
            this.SUPER(arguments).Init.call(this, o);
            this.w = this.r = k;
            this.l = 0;
            this.h = this.H = l;
            this.d = this.D = 0
        }
    });
    d.TEXT = d.Subclass({
        type: "text",
        removeable: false,
        Init: function (l, k, i) {
            if (!i) {
                i = {}
            }
            i.stroke = "none";
            if (i["font-style"] === "") {
                delete i["font-style"]
            }
            if (i["font-weight"] === "") {
                delete i["font-weight"]
            }
            this.SUPER(arguments).Init.call(this, i);
            h.addText(this.element, k);
            h.textSVG.appendChild(this.element);
            var j = this.element.getBBox();
            h.textSVG.removeChild(this.element);
            l *= 1000 / h.em;
            this.element.setAttribute("transform", "scale(" + h.Fixed(l) + ") matrix(1 0 0 -1 0 0)");
            this.w = this.r = j.width * l;
            this.l = 0;
            this.h = this.H = -j.y * l;
            this.d = this.D = (j.height + j.y) * l
        }
    });
    d.G = d;
    d.NULL = d.Subclass({
        Init: function () {
            this.SUPER(arguments).Init.apply(this, arguments);
            this.Clean()
        }
    });
    d.GLYPH = d.Subclass({
        type: "path",
        removeable: false,
        Init: function (q, k, v, x, y, s, j, m) {
            var n, z = h.config.blacker, u = d.GLYPH;
            var i = h.config.useFontCache;
            var o = (q === 1 ? null : "scale(" + h.Fixed(q) + ")");
            if (i && !h.config.useGlobalCache) {
                k = "E" + u.n + "-" + k
            }
            if (!i || !u.glyphs[k]) {
                n = {"stroke-width": z};
                if (i) {
                    n.id = k
                } else {
                    if (o) {
                        n.transform = o
                    }
                }
                n.d = (m ? "M" + m + "Z" : "");
                this.SUPER(arguments).Init.call(this, n);
                if (i) {
                    u.defs.appendChild(this.element);
                    u.glyphs[k] = true
                }
            }
            if (i) {
                n = {};
                if (o) {
                    n.transform = o
                }
                this.element = h.Element("use", n);
                this.element.setAttributeNS(f, "href", "#" + k)
            }
            this.h = (v + z) * q;
            this.d = (x + z) * q;
            this.w = (y + z / 2) * q;
            this.l = (s + z / 2) * q;
            this.r = (j + z / 2) * q;
            this.H = Math.max(0, this.h);
            this.D = Math.max(0, this.d);
            this.x = this.y = 0;
            this.scale = q
        }
    }, {glyphs: {}, defs: null, n: 0});
    c.Register.StartupHook("mml Jax Ready", function () {
        a = MathJax.ElementJax.mml;
        a.mbase.Augment({
            SVG: d, toSVG: function () {
                this.SVGgetStyles();
                var n = this.SVGgetVariant();
                var k = this.SVG();
                this.SVGgetScale(k);
                this.SVGhandleSpace(k);
                for (var l = 0, j = this.data.length; l < j; l++) {
                    if (this.data[l]) {
                        var p = k.Add(this.data[l].toSVG(n, k.scale), k.w, 0, true);
                        if (p.skew) {
                            k.skew = p.skew
                        }
                    }
                }
                k.Clean();
                var o = this.data.join("");
                if (k.skew && o.length !== 1) {
                    delete k.skew
                }
                if (k.r > k.w && o.length === 1 && !n.noIC) {
                    k.ic = k.r - k.w;
                    k.w = k.r
                }
                this.SVGhandleColor(k);
                this.SVGsaveData(k);
                return k
            }, SVGchildSVG: function (j) {
                return (this.data[j] ? this.data[j].toSVG() : d())
            }, SVGdataStretched: function (k, j, l) {
                this.SVGdata = {HW: j, D: l};
                if (!this.data[k]) {
                    return d()
                }
                if (l != null) {
                    return this.data[k].SVGstretchV(j, l)
                }
                if (j != null) {
                    return this.data[k].SVGstretchH(j)
                }
                return this.data[k].toSVG()
            }, SVGsaveData: function (j) {
                if (!this.SVGdata) {
                    this.SVGdata = {}
                }
                this.SVGdata.w = j.w, this.SVGdata.x = j.x;
                this.SVGdata.h = j.h, this.SVGdata.d = j.d;
                if (j.y) {
                    this.SVGdata.h += j.y;
                    this.SVGdata.d -= j.y
                }
                if (j.X != null) {
                    this.SVGdata.X = j.X
                }
                if (j.tw != null) {
                    this.SVGdata.tw = j.tw
                }
                if (j.skew) {
                    this.SVGdata.skew = j.skew
                }
                if (j.ic) {
                    this.SVGdata.ic = j.ic
                }
                if (this["class"]) {
                    j.removeable = false;
                    h.Element(j.element, {"class": this["class"]})
                }
                if (this.id) {
                    j.removeable = false;
                    h.Element(j.element, {id: this.id})
                }
                if (this.href) {
                    var i = h.Element("a", {"class": "mjx-svg-href"});
                    i.setAttributeNS(f, "href", this.href);
                    i.onclick = this.SVGlink;
                    h.addElement(i, "rect", {
                        width: j.w,
                        height: j.h + j.d,
                        y: -j.d,
                        fill: "none",
                        stroke: "none",
                        "pointer-events": "all"
                    });
                    if (j.type === "svg") {
                        var l = j.element.firstChild;
                        while (l.firstChild) {
                            i.appendChild(l.firstChild)
                        }
                        l.appendChild(i)
                    } else {
                        i.appendChild(j.element);
                        j.element = i
                    }
                    j.removeable = false
                }
                if (h.config.addMMLclasses) {
                    this.SVGaddClass(j.element, "mjx-svg-" + this.type);
                    j.removeable = false
                }
                var k = this.style;
                if (k && j.element) {
                    j.element.style.cssText = k;
                    if (j.element.style.fontSize) {
                        j.element.style.fontSize = ""
                    }
                    j.element.style.border = j.element.style.padding = "";
                    if (j.removeable) {
                        j.removeable = (j.element.style.cssText === "")
                    }
                }
                this.SVGaddAttributes(j)
            }, SVGaddClass: function (k, i) {
                var j = k.getAttribute("class");
                k.setAttribute("class", (j ? j + " " : "") + i)
            }, SVGaddAttributes: function (k) {
                if (this.attrNames) {
                    var r = this.attrNames, n = a.nocopyAttributes, q = c.config.ignoreMMLattributes;
                    var o = (this.type === "mstyle" ? a.math.prototype.defaults : this.defaults);
                    for (var l = 0, j = r.length; l < j; l++) {
                        var p = r[l];
                        if (q[p] == false || (!n[p] && !q[p] && o[p] == null && typeof(k.element[p]) === "undefined")) {
                            k.element.setAttribute(p, this.attr[p]);
                            k.removeable = false
                        }
                    }
                }
            }, SVGlink: function () {
                var i = this.href.animVal;
                if (i.charAt(0) === "#") {
                    var j = h.hashCheck(document.getElementById(i.substr(1)));
                    if (j && j.scrollIntoView) {
                        setTimeout(function () {
                            j.parentNode.scrollIntoView(true)
                        }, 1)
                    }
                }
                document.location = i
            }, SVGgetStyles: function () {
                if (this.style) {
                    var i = g.Element("span");
                    i.style.cssText = this.style;
                    this.styles = this.SVGprocessStyles(i.style)
                }
            }, SVGprocessStyles: function (i) {
                var j = {border: h.getBorders(i), padding: h.getPadding(i)};
                if (!j.border) {
                    delete j.border
                }
                if (!j.padding) {
                    delete j.padding
                }
                if (i.fontSize) {
                    j.fontSize = i.fontSize
                }
                if (i.color) {
                    j.color = i.color
                }
                if (i.backgroundColor) {
                    j.background = i.backgroundColor
                }
                if (i.fontStyle) {
                    j.fontStyle = i.fontStyle
                }
                if (i.fontWeight) {
                    j.fontWeight = i.fontWeight
                }
                if (i.fontFamily) {
                    j.fontFamily = i.fontFamily
                }
                if (j.fontWeight && j.fontWeight.match(/^\d+$/)) {
                    j.fontWeight = (parseInt(j.fontWeight) > 600 ? "bold" : "normal")
                }
                return j
            }, SVGhandleSpace: function (l) {
                if (this.useMMLspacing) {
                    if (this.type !== "mo") {
                        return
                    }
                    var k = this.getValues("scriptlevel", "lspace", "rspace");
                    if (k.scriptlevel <= 0 || this.hasValue("lspace") || this.hasValue("rspace")) {
                        var j = this.SVGgetMu(l);
                        k.lspace = Math.max(0, h.length2em(k.lspace, j));
                        k.rspace = Math.max(0, h.length2em(k.rspace, j));
                        var i = this, m = this.Parent();
                        while (m && m.isEmbellished() && m.Core() === i) {
                            i = m;
                            m = m.Parent()
                        }
                        if (k.lspace) {
                            l.x += k.lspace
                        }
                        if (k.rspace) {
                            l.X = k.rspace
                        }
                    }
                } else {
                    var n = this.texSpacing();
                    this.SVGgetScale();
                    if (n !== "") {
                        l.x += h.length2em(n, this.scale) * this.mscale
                    }
                }
            }, SVGhandleColor: function (m) {
                var v = this.getValues("mathcolor", "color");
                if (this.styles && this.styles.color && !v.color) {
                    v.color = this.styles.color
                }
                if (v.color && !this.mathcolor) {
                    v.mathcolor = v.color
                }
                if (v.mathcolor) {
                    h.Element(m.element, {
                        fill: v.mathcolor,
                        stroke: v.mathcolor
                    });
                    m.removeable = false
                }
                var q = (this.styles || {}).border, t = (this.styles || {}).padding, r = ((q || {}).left || 0), o = ((t || {}).left || 0), i;
                v.background = (this.mathbackground || this.background || (this.styles || {}).background || a.COLOR.TRANSPARENT);
                if (r + o) {
                    var j = d();
                    for (i in m) {
                        if (m.hasOwnProperty(i)) {
                            j[i] = m[i]
                        }
                    }
                    j.x = 0;
                    j.y = 0;
                    m.element = h.Element("g");
                    m.removeable = true;
                    m.Add(j, r + o, 0)
                }
                if (t) {
                    m.w += t.right || 0;
                    m.h += t.top || 0;
                    m.d += t.bottom || 0
                }
                if (q) {
                    m.w += q.right || 0;
                    m.h += q.top || 0;
                    m.d += q.bottom || 0
                }
                if (v.background !== a.COLOR.TRANSPARENT) {
                    var s = m.element.nodeName.toLowerCase();
                    if (s !== "g" && s !== "svg") {
                        var n = h.Element("g");
                        n.appendChild(m.element);
                        m.element = n;
                        m.removeable = true
                    }
                    m.Add(d.RECT(m.h, m.d, m.w, {
                        fill: v.background,
                        stroke: "none"
                    }), 0, 0, false, true)
                }
                if (q) {
                    var u = 5;
                    var k = {
                        left: ["V", m.h + m.d, -u, -m.d],
                        right: ["V", m.h + m.d, m.w - q.right + u, -m.d],
                        top: ["H", m.w, 0, m.h - q.top + u],
                        bottom: ["H", m.w, 0, -m.d - u]
                    };
                    for (i in k) {
                        if (k.hasOwnProperty(i)) {
                            if (q[i]) {
                                var p = k[i], l = d[p[0] + "LINE"];
                                m.Add(l(p[1], q[i], q[i + "Style"], q[i + "Color"]), p[2], p[3])
                            }
                        }
                    }
                }
            }, SVGhandleVariant: function (i, k, j) {
                return h.HandleVariant(i, k, j)
            }, SVGgetVariant: function () {
                var i = this.getValues("mathvariant", "fontfamily", "fontweight", "fontstyle");
                var j = i.mathvariant;
                if (this.variantForm) {
                    j = "-TeX-variant"
                }
                i.hasVariant = this.Get("mathvariant", true);
                if (!i.hasVariant) {
                    i.family = i.fontfamily;
                    i.weight = i.fontweight;
                    i.style = i.fontstyle
                }
                if (this.styles) {
                    if (!i.style && this.styles.fontStyle) {
                        i.style = this.styles.fontStyle
                    }
                    if (!i.weight && this.styles.fontWeight) {
                        i.weight = this.styles.fontWeight
                    }
                    if (!i.family && this.styles.fontFamily) {
                        i.family = this.styles.fontFamily
                    }
                }
                if (i.family && !i.hasVariant) {
                    if (!i.weight && i.mathvariant.match(/bold/)) {
                        i.weight = "bold"
                    }
                    if (!i.style && i.mathvariant.match(/italic/)) {
                        i.style = "italic"
                    }
                    j = {forceFamily: true, font: {"font-family": i.family}};
                    if (i.style) {
                        j.font["font-style"] = i.style
                    }
                    if (i.weight) {
                        j.font["font-weight"] = i.weight
                    }
                    return j
                }
                if (i.weight === "bold") {
                    j = {
                            normal: a.VARIANT.BOLD,
                            italic: a.VARIANT.BOLDITALIC,
                            fraktur: a.VARIANT.BOLDFRAKTUR,
                            script: a.VARIANT.BOLDSCRIPT,
                            "sans-serif": a.VARIANT.BOLDSANSSERIF,
                            "sans-serif-italic": a.VARIANT.SANSSERIFBOLDITALIC
                        }[j] || j
                } else {
                    if (i.weight === "normal") {
                        j = {
                                bold: a.VARIANT.normal,
                                "bold-italic": a.VARIANT.ITALIC,
                                "bold-fraktur": a.VARIANT.FRAKTUR,
                                "bold-script": a.VARIANT.SCRIPT,
                                "bold-sans-serif": a.VARIANT.SANSSERIF,
                                "sans-serif-bold-italic": a.VARIANT.SANSSERIFITALIC
                            }[j] || j
                    }
                }
                if (i.style === "italic") {
                    j = {
                            normal: a.VARIANT.ITALIC,
                            bold: a.VARIANT.BOLDITALIC,
                            "sans-serif": a.VARIANT.SANSSERIFITALIC,
                            "bold-sans-serif": a.VARIANT.SANSSERIFBOLDITALIC
                        }[j] || j
                } else {
                    if (i.style === "normal") {
                        j = {
                                italic: a.VARIANT.NORMAL,
                                "bold-italic": a.VARIANT.BOLD,
                                "sans-serif-italic": a.VARIANT.SANSSERIF,
                                "sans-serif-bold-italic": a.VARIANT.BOLDSANSSERIF
                            }[j] || j
                    }
                }
                if (!(j in h.FONTDATA.VARIANT)) {
                    j = "normal"
                }
                return h.FONTDATA.VARIANT[j]
            }, SVGgetScale: function (j) {
                var k = 1;
                if (this.mscale) {
                    k = this.scale
                } else {
                    var i = this.getValues("scriptlevel", "fontsize");
                    i.mathsize = (this.isToken ? this : this.Parent()).Get("mathsize");
                    if ((this.styles || {}).fontSize && !i.fontsize) {
                        i.fontsize = this.styles.fontSize
                    }
                    if (i.fontsize && !this.mathsize) {
                        i.mathsize = i.fontsize
                    }
                    if (i.scriptlevel !== 0) {
                        if (i.scriptlevel > 2) {
                            i.scriptlevel = 2
                        }
                        k = Math.pow(this.Get("scriptsizemultiplier"), i.scriptlevel);
                        i.scriptminsize = h.length2em(this.Get("scriptminsize")) / 1000;
                        if (k < i.scriptminsize) {
                            k = i.scriptminsize
                        }
                    }
                    this.scale = k;
                    this.mscale = h.length2em(i.mathsize) / 1000
                }
                if (j) {
                    j.scale = k;
                    if (this.isToken) {
                        j.scale *= this.mscale
                    }
                }
                return k * this.mscale
            }, SVGgetMu: function (k) {
                var i = 1, j = this.getValues("scriptlevel", "scriptsizemultiplier");
                if (k.scale && k.scale !== 1) {
                    i = 1 / k.scale
                }
                if (j.scriptlevel !== 0) {
                    if (j.scriptlevel > 2) {
                        j.scriptlevel = 2
                    }
                    i = Math.sqrt(Math.pow(j.scriptsizemultiplier, j.scriptlevel))
                }
                return i
            }, SVGnotEmpty: function (i) {
                while (i) {
                    if ((i.type !== "mrow" && i.type !== "texatom") || i.data.length > 1) {
                        return true
                    }
                    i = i.data[0]
                }
                return false
            }, SVGcanStretch: function (k) {
                var j = false;
                if (this.isEmbellished()) {
                    var i = this.Core();
                    if (i && i !== this) {
                        j = i.SVGcanStretch(k);
                        if (j && i.forceStretch) {
                            this.forceStretch = true
                        }
                    }
                }
                return j
            }, SVGstretchV: function (i, j) {
                return this.toSVG(i, j)
            }, SVGstretchH: function (i) {
                return this.toSVG(i)
            }, SVGlineBreaks: function () {
                return false
            }
        }, {
            SVGautoload: function () {
                var i = h.autoloadDir + "/" + this.type + ".js";
                c.RestartAfter(b.Require(i))
            }, SVGautoloadFile: function (i) {
                var j = h.autoloadDir + "/" + i + ".js";
                c.RestartAfter(b.Require(j))
            }
        });
        a.chars.Augment({
            toSVG: function (j, m, i, k) {
                var l = this.data.join("").replace(/[\u2061-\u2064]/g, "");
                if (i) {
                    l = i(l, k)
                }
                return this.SVGhandleVariant(j, m, l)
            }
        });
        a.entity.Augment({
            toSVG: function (j, m, i, k) {
                var l = this.toString().replace(/[\u2061-\u2064]/g, "");
                if (i) {
                    l = i(l, k)
                }
                return this.SVGhandleVariant(j, m, l)
            }
        });
        a.mo.Augment({
            toSVG: function (k, j) {
                this.SVGgetStyles();
                var s = this.svg = this.SVG();
                var o = this.SVGgetScale(s);
                this.SVGhandleSpace(s);
                if (this.data.length == 0) {
                    s.Clean();
                    this.SVGsaveData(s);
                    return s
                }
                if (j != null) {
                    return this.SVGstretchV(k, j)
                } else {
                    if (k != null) {
                        return this.SVG.strechH(k)
                    }
                }
                var q = this.SVGgetVariant();
                var y = this.getValues("largeop", "displaystyle");
                if (y.largeop) {
                    q = h.FONTDATA.VARIANT[y.displaystyle ? "-largeOp" : "-smallOp"]
                }
                var w = this.CoreParent(), p = (w && w.isa(a.msubsup) && this !== w.data[0]), l = (p ? this.remapChars : null);
                if (this.data.join("").length === 1 && w && w.isa(a.munderover) && this.CoreText(w.data[w.base]).length === 1) {
                    var t = w.data[w.over], v = w.data[w.under];
                    if (t && this === t.CoreMO() && w.Get("accent")) {
                        l = h.FONTDATA.REMAPACCENT
                    } else {
                        if (v && this === v.CoreMO() && w.Get("accentunder")) {
                            l = h.FONTDATA.REMAPACCENTUNDER
                        }
                    }
                }
                if (p && this.data.join("").match(/['`"\u00B4\u2032-\u2037\u2057]/)) {
                    q = h.FONTDATA.VARIANT["-TeX-variant"]
                }
                for (var r = 0, n = this.data.length; r < n; r++) {
                    if (this.data[r]) {
                        var z = this.data[r].toSVG(q, o, this.remap, l), u = s.w;
                        if (u === 0 && -z.l > 10 * z.w) {
                            u += -z.l
                        }
                        s.Add(z, u, 0, true);
                        if (z.skew) {
                            s.skew = z.skew
                        }
                    }
                }
                s.Clean();
                if (this.data.join("").length !== 1) {
                    delete s.skew
                }
                if (y.largeop) {
                    s.y = h.TeX.axis_height - (s.h - s.d) / 2 / o;
                    if (s.r > s.w) {
                        s.ic = s.r - s.w;
                        s.w = s.r
                    }
                }
                this.SVGhandleColor(s);
                this.SVGsaveData(s);
                return s
            }, SVGcanStretch: function (m) {
                if (!this.Get("stretchy")) {
                    return false
                }
                var n = this.data.join("");
                if (n.length > 1) {
                    return false
                }
                var j = this.CoreParent();
                if (j && j.isa(a.munderover) && this.CoreText(j.data[j.base]).length === 1) {
                    var l = j.data[j.over], i = j.data[j.under];
                    if (l && this === l.CoreMO() && j.Get("accent")) {
                        n = h.FONTDATA.REMAPACCENT[n] || n
                    } else {
                        if (i && this === i.CoreMO() && j.Get("accentunder")) {
                            n = h.FONTDATA.REMAPACCENTUNDER[n] || n
                        }
                    }
                }
                n = h.FONTDATA.DELIMITERS[n.charCodeAt(0)];
                var k = (n && n.dir == m.substr(0, 1));
                if (!k) {
                    delete this.svg
                }
                this.forceStretch = k && (this.Get("minsize", true) || this.Get("maxsize", true));
                return k
            }, SVGstretchV: function (n, o) {
                var k = this.svg || this.toSVG();
                var j = this.getValues("symmetric", "maxsize", "minsize");
                var m = h.TeX.axis_height * k.scale, i = this.SVGgetMu(k), l;
                if (j.symmetric) {
                    l = 2 * Math.max(n - m, o + m)
                } else {
                    l = n + o
                }
                j.maxsize = h.length2em(j.maxsize, i, k.h + k.d);
                j.minsize = h.length2em(j.minsize, i, k.h + k.d);
                l = Math.max(j.minsize, Math.min(j.maxsize, l));
                if (l != j.minsize) {
                    l = [Math.max(l * h.TeX.delimiterfactor / 1000, l - h.TeX.delimitershortfall), l]
                }
                k = h.createDelimiter(this.data.join("").charCodeAt(0), l, k.scale);
                if (j.symmetric) {
                    l = (k.h + k.d) / 2 + m
                } else {
                    l = (k.h + k.d) * n / (n + o)
                }
                k.y = l - k.h;
                this.SVGhandleSpace(k);
                this.SVGhandleColor(k);
                delete this.svg.element;
                this.SVGsaveData(k);
                k.stretched = true;
                return k
            }, SVGstretchH: function (j) {
                var l = this.svg || this.toSVG(), i = this.SVGgetMu(l);
                var k = this.getValues("maxsize", "minsize", "mathvariant", "fontweight");
                if ((k.fontweight === "bold" || parseInt(k.fontweight) >= 600) && !this.Get("mathvariant", true)) {
                    k.mathvariant = a.VARIANT.BOLD
                }
                k.maxsize = h.length2em(k.maxsize, i, l.w);
                k.minsize = h.length2em(k.minsize, i, l.w);
                j = Math.max(k.minsize, Math.min(k.maxsize, j));
                l = h.createDelimiter(this.data.join("").charCodeAt(0), j, l.scale, k.mathvariant);
                this.SVGhandleSpace(l);
                this.SVGhandleColor(l);
                delete this.svg.element;
                this.SVGsaveData(l);
                l.stretched = true;
                return l
            }
        });
        a.mtext.Augment({
            toSVG: function () {
                if (h.config.mtextFontInherit || this.Parent().type === "merror") {
                    this.SVGgetStyles();
                    var i = this.SVG(), l = this.SVGgetScale(i);
                    this.SVGhandleSpace(i);
                    var j = this.SVGgetVariant(), k = {direction: this.Get("dir")};
                    if (j.bold) {
                        k["font-weight"] = "bold"
                    }
                    if (j.italic) {
                        k["font-style"] = "italic"
                    }
                    j = this.Get("mathvariant");
                    if (j === "monospace") {
                        k["class"] = "MJX-monospace"
                    } else {
                        if (j.match(/sans-serif/)) {
                            k["class"] = "MJX-sans-serif"
                        }
                    }
                    i.Add(d.TEXT(l * 100 / h.config.scale, this.data.join(""), k));
                    i.Clean();
                    this.SVGhandleColor(i);
                    this.SVGsaveData(i);
                    return i
                } else {
                    return this.SUPER(arguments).toSVG.call(this)
                }
            }
        });
        a.merror.Augment({
            toSVG: function (l, j) {
                this.SVGgetStyles();
                var q = this.SVG(), o = h.length2em(this.styles.fontSize || 1) / 1000;
                this.SVGhandleSpace(q);
                var k = (o !== 1 ? {transform: "scale(" + h.Fixed(o) + ")"} : {});
                var s = d(k);
                s.Add(this.SVGchildSVG(0));
                s.Clean();
                if (o !== 1) {
                    s.removeable = false;
                    var r = ["w", "h", "d", "l", "r", "D", "H"];
                    for (var p = 0, n = r.length; p < n; p++) {
                        s[r[p]] *= o
                    }
                }
                q.Add(s);
                q.Clean();
                this.SVGhandleColor(q);
                this.SVGsaveData(q);
                return q
            }, SVGgetStyles: function () {
                var i = g.Element("span", {style: h.config.merrorStyle});
                this.styles = this.SVGprocessStyles(i.style);
                if (this.style) {
                    i.style.cssText = this.style;
                    c.Insert(this.styles, this.SVGprocessStyles(i.style))
                }
            }
        });
        a.ms.Augment({toSVG: a.mbase.SVGautoload});
        a.mglyph.Augment({toSVG: a.mbase.SVGautoload});
        a.mspace.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var k = this.getValues("height", "depth", "width");
                k.mathbackground = this.mathbackground;
                if (this.background && !this.mathbackground) {
                    k.mathbackground = this.background
                }
                var j = this.SVG();
                this.SVGgetScale(j);
                var l = this.mscale, i = this.SVGgetMu(j);
                j.h = h.length2em(k.height, i) * l;
                j.d = h.length2em(k.depth, i) * l;
                j.w = j.r = h.length2em(k.width, i) * l;
                if (j.w < 0) {
                    j.x = j.w;
                    j.w = j.r = 0
                }
                if (j.h < -j.d) {
                    j.d = -j.h
                }
                j.l = 0;
                j.Clean();
                this.SVGhandleColor(j);
                this.SVGsaveData(j);
                return j
            }
        });
        a.mphantom.Augment({
            toSVG: function (i, k) {
                this.SVGgetStyles();
                var j = this.SVG();
                this.SVGgetScale(j);
                if (this.data[0] != null) {
                    this.SVGhandleSpace(j);
                    j.Add(this.SVGdataStretched(0, i, k));
                    j.Clean();
                    while (j.element.firstChild) {
                        j.element.removeChild(j.element.firstChild)
                    }
                }
                this.SVGhandleColor(j);
                this.SVGsaveData(j);
                if (j.removeable && !j.element.firstChild) {
                    delete j.element
                }
                return j
            }
        });
        a.mpadded.Augment({
            toSVG: function (l, i) {
                this.SVGgetStyles();
                var o = this.SVG();
                if (this.data[0] != null) {
                    this.SVGgetScale(o);
                    this.SVGhandleSpace(o);
                    var m = this.SVGdataStretched(0, l, i), t = this.SVGgetMu(o);
                    var s = this.getValues("height", "depth", "width", "lspace", "voffset"), k = 0, j = 0;
                    if (s.lspace) {
                        k = this.SVGlength2em(m, s.lspace, t)
                    }
                    if (s.voffset) {
                        j = this.SVGlength2em(m, s.voffset, t)
                    }
                    var n = m.h, p = m.d, r = m.w, q = m.y;
                    o.Add(m, k, j);
                    o.Clean();
                    o.h = n + q;
                    o.d = p - q;
                    o.w = r;
                    o.removeable = false;
                    if (s.height !== "") {
                        o.h = this.SVGlength2em(o, s.height, t, "h", 0)
                    }
                    if (s.depth !== "") {
                        o.d = this.SVGlength2em(o, s.depth, t, "d", 0)
                    }
                    if (s.width !== "") {
                        o.w = this.SVGlength2em(o, s.width, t, "w", 0)
                    }
                    if (o.h > o.H) {
                        o.H = o.h
                    }
                    if (o.d > o.D) {
                        o.D = o.d
                    }
                }
                this.SVGhandleColor(o);
                this.SVGsaveData(o);
                return o
            }, SVGlength2em: function (l, p, j, q, i) {
                if (i == null) {
                    i = -h.BIGDIMEN
                }
                var n = String(p).match(/width|height|depth/);
                var o = (n ? l[n[0].charAt(0)] : (q ? l[q] : 0));
                var k = h.length2em(p, j, o / this.mscale) * this.mscale;
                if (q && String(p).match(/^\s*[-+]/)) {
                    return Math.max(i, l[q] + k)
                } else {
                    return k
                }
            }
        });
        a.mrow.Augment({
            SVG: d.ROW, toSVG: function (n, p) {
                this.SVGgetStyles();
                var k = this.SVG();
                this.SVGhandleSpace(k);
                if (p != null) {
                    k.sh = n;
                    k.sd = p
                }
                for (var l = 0, j = this.data.length; l < j; l++) {
                    if (this.data[l]) {
                        k.Check(this.data[l])
                    }
                }
                k.Stretch();
                k.Clean();
                if (this.data.length === 1 && this.data[0]) {
                    var o = this.data[0].SVGdata;
                    if (o.skew) {
                        k.skew = o.skew
                    }
                }
                if (this.SVGlineBreaks(k)) {
                    k = this.SVGmultiline(k)
                }
                this.SVGhandleColor(k);
                this.SVGsaveData(k);
                return k
            }, SVGlineBreaks: function (i) {
                if (!this.parent.linebreakContainer) {
                    return false
                }
                return (h.config.linebreaks.automatic && i.w > h.linebreakWidth) || this.hasNewline()
            }, SVGmultiline: function (i) {
                a.mbase.SVGautoloadFile("multiline")
            }, SVGstretchH: function (k) {
                var l = this.SVG();
                this.SVGhandleSpace(l);
                for (var n = 0, j = this.data.length; n < j; n++) {
                    l.Add(this.SVGdataStretched(n, k), l.w, 0)
                }
                l.Clean();
                this.SVGhandleColor(l);
                this.SVGsaveData(l);
                return l
            }
        });
        a.mstyle.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var i = this.SVG();
                if (this.data[0] != null) {
                    this.SVGhandleSpace(i);
                    var j = i.Add(this.data[0].toSVG());
                    i.Clean();
                    if (j.ic) {
                        i.ic = j.ic
                    }
                    this.SVGhandleColor(i)
                }
                this.SVGsaveData(i);
                return i
            }, SVGstretchH: function (i) {
                return (this.data[0] != null ? this.data[0].SVGstretchH(i) : d.NULL())
            }, SVGstretchV: function (i, j) {
                return (this.data[0] != null ? this.data[0].SVGstretchV(i, j) : d.NULL())
            }
        });
        a.mfrac.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var w = this.SVG(), E = this.SVGgetScale(w);
                var k = d();
                k.scale = w.scale;
                this.SVGhandleSpace(k);
                var m = this.SVGchildSVG(0), l = this.SVGchildSVG(1);
                var i = this.getValues("displaystyle", "linethickness", "numalign", "denomalign", "bevelled");
                var A = i.displaystyle;
                var D = h.TeX.axis_height * E;
                if (i.bevelled) {
                    var C = (A ? 400 : 150);
                    var n = Math.max(m.h + m.d, l.h + l.d) + 2 * C;
                    var B = h.createDelimiter(47, n);
                    k.Add(m, 0, (m.d - m.h) / 2 + D + C);
                    k.Add(B, m.w - C / 2, (B.d - B.h) / 2 + D);
                    k.Add(l, m.w + B.w - C, (l.d - l.h) / 2 + D - C)
                } else {
                    var j = Math.max(m.w, l.w);
                    var s = h.thickness2em(i.linethickness, this.scale) * this.mscale, y, x, r, o;
                    var z = h.TeX.min_rule_thickness / h.em * 1000;
                    if (A) {
                        r = h.TeX.num1;
                        o = h.TeX.denom1
                    } else {
                        r = (s === 0 ? h.TeX.num3 : h.TeX.num2);
                        o = h.TeX.denom2
                    }
                    r *= E;
                    o *= E;
                    if (s === 0) {
                        y = Math.max((A ? 7 : 3) * h.TeX.rule_thickness, 2 * z);
                        x = (r - m.d) - (l.h - o);
                        if (x < y) {
                            r += (y - x) / 2;
                            o += (y - x) / 2
                        }
                        k.w = j;
                        s = 0
                    } else {
                        y = Math.max((A ? 2 : 0) * z + s, s / 2 + 1.5 * z);
                        x = (r - m.d) - (D + s / 2);
                        if (x < y) {
                            r += y - x
                        }
                        x = (D - s / 2) - (l.h - o);
                        if (x < y) {
                            o += y - x
                        }
                        k.Add(d.RECT(s / 2, s / 2, j + 2 * s), 0, D)
                    }
                    k.Align(m, i.numalign, s, r);
                    k.Align(l, i.denomalign, s, -o)
                }
                k.Clean();
                w.Add(k, 0, 0);
                w.Clean();
                this.SVGhandleColor(w);
                this.SVGsaveData(w);
                return w
            }, SVGcanStretch: function (i) {
                return false
            }, SVGhandleSpace: function (i) {
                if (!this.texWithDelims && !this.useMMLspacing) {
                    i.x = i.X = h.TeX.nulldelimiterspace * this.mscale
                }
                this.SUPER(arguments).SVGhandleSpace.call(this, i)
            }
        });
        a.msqrt.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var n = this.SVG(), l = this.SVGgetScale(n);
                this.SVGhandleSpace(n);
                var k = this.SVGchildSVG(0), o, m;
                var u = h.TeX.rule_thickness * l, j, i, s, r = 0;
                if (this.Get("displaystyle")) {
                    j = h.TeX.x_height * l
                } else {
                    j = u
                }
                i = Math.max(u + j / 4, 1000 * h.TeX.min_root_space / h.em);
                s = k.h + k.d + i + u;
                m = h.createDelimiter(8730, s, l);
                if (m.h + m.d > s) {
                    i = ((m.h + m.d) - (s - u)) / 2
                }
                o = d.RECT(u, 0, k.w);
                s = k.h + i + u;
                r = this.SVGaddRoot(n, m, r, m.h + m.d - s, l);
                n.Add(m, r, s - m.h);
                n.Add(o, r + m.w, s - o.h);
                n.Add(k, r + m.w, 0);
                n.Clean();
                n.h += u;
                n.H += u;
                this.SVGhandleColor(n);
                this.SVGsaveData(n);
                return n
            }, SVGaddRoot: function (j, k, i, m, l) {
                return i
            }
        });
        a.mroot.Augment({
            toSVG: a.msqrt.prototype.toSVG,
            SVGaddRoot: function (l, j, o, m, i) {
                var q = (j.isMultiChar ? 0.55 : 0.65) * j.w;
                if (this.data[1]) {
                    var n = this.data[1].toSVG();
                    n.x = 0;
                    var k = this.SVGrootHeight(j.h + j.d, i, n) - m;
                    var p = Math.min(n.w, n.r);
                    o = Math.max(p, q);
                    l.Add(n, o - p, k)
                } else {
                    q = o
                }
                return o - q
            },
            SVGrootHeight: function (k, j, i) {
                return 0.45 * (k - 900 * j) + 600 * j + Math.max(0, i.d - 75)
            }
        });
        a.mfenced.Augment({
            SVG: d.ROW, toSVG: function () {
                this.SVGgetStyles();
                var k = this.SVG();
                this.SVGhandleSpace(k);
                if (this.data.open) {
                    k.Check(this.data.open)
                }
                if (this.data[0] != null) {
                    k.Check(this.data[0])
                }
                for (var l = 1, j = this.data.length; l < j; l++) {
                    if (this.data[l]) {
                        if (this.data["sep" + l]) {
                            k.Check(this.data["sep" + l])
                        }
                        k.Check(this.data[l])
                    }
                }
                if (this.data.close) {
                    k.Check(this.data.close)
                }
                k.Stretch();
                k.Clean();
                this.SVGhandleColor(k);
                this.SVGsaveData(k);
                return k
            }
        });
        a.menclose.Augment({toSVG: a.mbase.SVGautoload});
        a.maction.Augment({toSVG: a.mbase.SVGautoload});
        a.semantics.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var i = this.SVG();
                if (this.data[0] != null) {
                    this.SVGhandleSpace(i);
                    i.Add(this.data[0].toSVG());
                    i.Clean()
                } else {
                    i.Clean()
                }
                this.SVGsaveData(i);
                return i
            }, SVGstretchH: function (i) {
                return (this.data[0] != null ? this.data[0].SVGstretchH(i) : d.NULL())
            }, SVGstretchV: function (i, j) {
                return (this.data[0] != null ? this.data[0].SVGstretchV(i, j) : d.NULL())
            }
        });
        a.munderover.Augment({
            toSVG: function (E, B) {
                this.SVGgetStyles();
                var j = this.getValues("displaystyle", "accent", "accentunder", "align");
                if (!j.displaystyle && this.data[this.base] != null && this.data[this.base].CoreMO().Get("movablelimits")) {
                    return a.msubsup.prototype.toSVG.call(this)
                }
                var C = this.SVG(), L = this.SVGgetScale(C);
                this.SVGhandleSpace(C);
                var o = [], J = [], s, I, F, l = -h.BIGDIMEN, H = l;
                for (I = 0, F = this.data.length; I < F; I++) {
                    if (this.data[I] != null) {
                        if (I == this.base) {
                            o[I] = this.SVGdataStretched(I, E, B);
                            J[I] = (B != null || E == null) && this.data[I].SVGcanStretch("Horizontal")
                        } else {
                            o[I] = this.data[I].toSVG();
                            o[I].x = 0;
                            delete o[I].X;
                            J[I] = this.data[I].SVGcanStretch("Horizontal")
                        }
                        if (o[I].w > H) {
                            H = o[I].w
                        }
                        if (!J[I] && H > l) {
                            l = H
                        }
                    }
                }
                if (B == null && E != null) {
                    l = E
                } else {
                    if (l == -h.BIGDIMEN) {
                        l = H
                    }
                }
                for (I = H = 0, F = this.data.length; I < F; I++) {
                    if (this.data[I]) {
                        if (J[I]) {
                            o[I] = this.data[I].SVGstretchH(l);
                            if (I !== this.base) {
                                o[I].x = 0;
                                delete o[I].X
                            }
                        }
                        if (o[I].w > H) {
                            H = o[I].w
                        }
                    }
                }
                var A = h.TeX.rule_thickness * this.mscale;
                var n = o[this.base] || {
                        w: 0,
                        h: 0,
                        d: 0,
                        H: 0,
                        D: 0,
                        l: 0,
                        r: 0,
                        y: 0,
                        scale: L
                    };
                var r, p, v, u, q, z, G, K = 0;
                if (n.ic) {
                    K = 1.3 * n.ic + 0.05
                }
                for (I = 0, F = this.data.length; I < F; I++) {
                    if (this.data[I] != null) {
                        s = o[I];
                        q = h.TeX.big_op_spacing5 * L;
                        var w = (I != this.base && j[this.ACCENTS[I]]);
                        if (w && s.w <= 1) {
                            s.x = -s.l;
                            o[I] = d.G().With({removeable: false});
                            o[I].Add(s);
                            o[I].Clean();
                            o[I].w = -s.l;
                            s = o[I]
                        }
                        z = {
                            left: 0,
                            center: (H - s.w) / 2,
                            right: H - s.w
                        }[j.align];
                        r = z;
                        p = 0;
                        if (I == this.over) {
                            if (w) {
                                G = A * L;
                                q = 0;
                                if (n.skew) {
                                    r += n.skew;
                                    C.skew = n.skew;
                                    if (r + s.w > H) {
                                        C.skew += (H - s.w - r) / 2
                                    }
                                }
                            } else {
                                v = h.TeX.big_op_spacing1 * L;
                                u = h.TeX.big_op_spacing3 * L;
                                G = Math.max(v, u - Math.max(0, s.d))
                            }
                            G = Math.max(G, 1500 / h.em);
                            r += K / 2;
                            p = n.y + n.h + s.d + G;
                            s.h += q;
                            if (s.h > s.H) {
                                s.H = s.h
                            }
                        } else {
                            if (I == this.under) {
                                if (w) {
                                    G = 3 * A * L;
                                    q = 0
                                } else {
                                    v = h.TeX.big_op_spacing2 * L;
                                    u = h.TeX.big_op_spacing4 * L;
                                    G = Math.max(v, u - s.h)
                                }
                                G = Math.max(G, 1500 / h.em);
                                r -= K / 2;
                                p = n.y - (n.d + s.h + G);
                                s.d += q;
                                if (s.d > s.D) {
                                    s.D = s.d
                                }
                            }
                        }
                        C.Add(s, r, p)
                    }
                }
                C.Clean();
                this.SVGhandleColor(C);
                this.SVGsaveData(C);
                return C
            }
        });
        a.msubsup.Augment({
            toSVG: function (G, z) {
                this.SVGgetStyles();
                var B = this.SVG(), K = this.SVGgetScale(B);
                this.SVGhandleSpace(B);
                var E = this.SVGgetMu(B);
                var k = B.Add(this.SVGdataStretched(this.base, G, z));
                var j = (this.data[this.sup] || this.data[this.sub] || this).SVGgetScale();
                var I = h.TeX.x_height * K, y = h.TeX.scriptspace * K;
                var i, l;
                if (this.SVGnotEmpty(this.data[this.sup])) {
                    i = this.data[this.sup].toSVG();
                    i.w += y;
                    i.r = Math.max(i.w, i.r)
                }
                if (this.SVGnotEmpty(this.data[this.sub])) {
                    l = this.data[this.sub].toSVG();
                    l.w += y;
                    l.r = Math.max(l.w, l.r)
                }
                var C = h.TeX.sup_drop * j, A = h.TeX.sub_drop * j;
                var o = k.h + (k.y || 0) - C, n = k.d - (k.y || 0) + A, J = 0, F;
                if (k.ic) {
                    k.w -= k.ic;
                    J = 1.3 * k.ic + 0.05
                }
                if (this.data[this.base] && (this.data[this.base].type === "mi" || this.data[this.base].type === "mo")) {
                    if (this.data[this.base].data.join("").length === 1 && k.scale === 1 && !k.stretched && !this.data[this.base].Get("largeop")) {
                        o = n = 0
                    }
                }
                var H = this.getValues("subscriptshift", "superscriptshift");
                H.subscriptshift = (H.subscriptshift === "" ? 0 : h.length2em(H.subscriptshift, E));
                H.superscriptshift = (H.superscriptshift === "" ? 0 : h.length2em(H.superscriptshift, E));
                var m = k.w + k.x;
                if (!i) {
                    if (l) {
                        n = Math.max(n, h.TeX.sub1 * K, l.h - (4 / 5) * I, H.subscriptshift);
                        B.Add(l, m, -n);
                        this.data[this.sub].SVGdata.dy = -n
                    }
                } else {
                    if (!l) {
                        values = this.getValues("displaystyle", "texprimestyle");
                        F = h.TeX[(values.displaystyle ? "sup1" : (values.texprimestyle ? "sup3" : "sup2"))];
                        o = Math.max(o, F * K, i.d + (1 / 4) * I, H.superscriptshift);
                        B.Add(i, m + J, o);
                        this.data[this.sup].SVGdata.dx = J;
                        this.data[this.sup].SVGdata.dy = o
                    } else {
                        n = Math.max(n, h.TeX.sub2 * K);
                        var w = h.TeX.rule_thickness * K;
                        if ((o - i.d) - (l.h - n) < 3 * w) {
                            n = 3 * w - o + i.d + l.h;
                            C = (4 / 5) * I - (o - i.d);
                            if (C > 0) {
                                o += C;
                                n -= C
                            }
                        }
                        B.Add(i, m + J, Math.max(o, H.superscriptshift));
                        B.Add(l, m, -Math.max(n, H.subscriptshift));
                        this.data[this.sup].SVGdata.dx = J;
                        this.data[this.sup].SVGdata.dy = Math.max(o, H.superscriptshift);
                        this.data[this.sub].SVGdata.dy = -Math.max(n, H.subscriptshift)
                    }
                }
                B.Clean();
                this.SVGhandleColor(B);
                this.SVGsaveData(B);
                return B
            }
        });
        a.mmultiscripts.Augment({toSVG: a.mbase.SVGautoload});
        a.mtable.Augment({toSVG: a.mbase.SVGautoload});
        a["annotation-xml"].Augment({toSVG: a.mbase.SVGautoload});
        a.math.Augment({
            SVG: d.Subclass({type: "svg", removeable: false}),
            toSVG: function (t, j) {
                var v = h.config;
                if (this.data[0]) {
                    this.SVGgetStyles();
                    a.mbase.prototype.displayAlign = c.config.displayAlign;
                    a.mbase.prototype.displayIndent = c.config.displayIndent;
                    if (String(c.config.displayIndent).match(/^0($|[a-z%])/i)) {
                        a.mbase.prototype.displayIndent = "0"
                    }
                    var p = d.G();
                    p.Add(this.data[0].toSVG(), 0, 0, true);
                    p.Clean();
                    this.SVGhandleColor(p);
                    h.Element(p.element, {
                        stroke: "currentColor",
                        fill: "currentColor",
                        "stroke-width": 0,
                        transform: "matrix(1 0 0 -1 0 0)"
                    });
                    p.removeable = false;
                    var q = this.SVG();
                    q.element.setAttribute("xmlns:xlink", f);
                    if (v.useFontCache && !v.useGlobalCache) {
                        q.element.appendChild(d.GLYPH.defs)
                    }
                    q.Add(p);
                    q.Clean();
                    this.SVGsaveData(q);
                    if (!t) {
                        q.element = q.element.firstChild;
                        q.element.removeAttribute("transform");
                        q.removable = true;
                        return q
                    }
                    var o = Math.max(-q.l, 0), i = Math.max(q.r - q.w, 0);
                    var k = q.element.style;
                    q.element.setAttribute("width", h.Ex(o + q.w + i));
                    q.element.setAttribute("height", h.Ex(q.H + q.D + 2 * h.em));
                    k.verticalAlign = h.Ex(-q.D - 2 * h.em);
                    k.marginLeft = h.Ex(-o);
                    k.marginRight = h.Ex(-i);
                    q.element.setAttribute("viewBox", h.Fixed(-o, 1) + " " + h.Fixed(-q.H - h.em, 1) + " " + h.Fixed(o + q.w + i, 1) + " " + h.Fixed(q.H + q.D + 2 * h.em, 1));
                    k.marginTop = k.marginBottom = "1px";
                    if (q.H > q.h) {
                        k.marginTop = h.Ex(q.h - q.H)
                    }
                    if (q.D > q.d) {
                        k.marginBottom = h.Ex(q.d - q.D);
                        k.verticalAlign = h.Ex(-q.d)
                    }
                    var s = this.Get("alttext");
                    if (s && !q.element.getAttribute("aria-label")) {
                        t.setAttribute("aria-label", s)
                    }
                    if (!q.element.getAttribute("role")) {
                        t.setAttribute("role", "math")
                    }
                    t.appendChild(q.element);
                    q.element = null;
                    if (!this.isMultiline && this.Get("display") === "block" && !q.hasIndent) {
                        var u = this.getValues("indentalignfirst", "indentshiftfirst", "indentalign", "indentshift");
                        if (u.indentalignfirst !== a.INDENTALIGN.INDENTALIGN) {
                            u.indentalign = u.indentalignfirst
                        }
                        if (u.indentalign === a.INDENTALIGN.AUTO) {
                            u.indentalign = this.displayAlign
                        }
                        if (u.indentshiftfirst !== a.INDENTSHIFT.INDENTSHIFT) {
                            u.indentshift = u.indentshiftfirst
                        }
                        if (u.indentshift === "auto") {
                            u.indentshift = "0"
                        }
                        var m = h.length2em(u.indentshift, 1, h.cwidth);
                        if (this.displayIndent !== "0") {
                            var n = h.length2em(this.displayIndent, 1, h.cwidth);
                            m += (u.indentalign === a.INDENTALIGN.RIGHT ? -n : n)
                        }
                        j.style.textAlign = u.indentalign;
                        if (m) {
                            c.Insert(k, ({
                                left: {marginLeft: h.Ex(m)},
                                right: {marginRight: h.Ex(-m)},
                                center: {
                                    marginLeft: h.Ex(m),
                                    marginRight: h.Ex(-m)
                                }
                            })[u.indentalign])
                        }
                    }
                }
                return t
            }
        });
        a.TeXAtom.Augment({
            toSVG: function (i, l) {
                this.SVGgetStyles();
                var j = this.SVG();
                this.SVGhandleSpace(j);
                if (this.data[0] != null) {
                    var k = this.SVGdataStretched(0, i, l), m = 0;
                    if (this.texClass === a.TEXCLASS.VCENTER) {
                        m = h.TeX.axis_height - (k.h + k.d) / 2 + k.d
                    }
                    j.Add(k, 0, m);
                    j.ic = k.ic;
                    j.skew = k.skew
                }
                this.SVGhandleColor(j);
                this.SVGsaveData(j);
                return j
            }
        });
        c.Register.StartupHook("onLoad", function () {
            setTimeout(MathJax.Callback(["loadComplete", h, "jax.js"]), 0)
        })
    });
    c.Browser.Select({
        Opera: function (i) {
            h.Augment({operaZoomRefresh: true})
        }
    });
    c.Register.StartupHook("End Cookie", function () {
        if (c.config.menuSettings.zoom !== "None") {
            b.Require("[MathJax]/extensions/MathZoom.js")
        }
    });
    if (!document.createElementNS) {
        if (!document.namespaces.svg) {
            document.namespaces.add("svg", e)
        }
        h.Augment({
            Element: function (i, j) {
                var k = (typeof(i) === "string" ? document.createElement("svg:" + i) : i);
                k.isMathJax = true;
                if (j) {
                    for (var l in j) {
                        if (j.hasOwnProperty(l)) {
                            k.setAttribute(l, j[l].toString())
                        }
                    }
                }
                return k
            }
        })
    }
})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.SVG);
