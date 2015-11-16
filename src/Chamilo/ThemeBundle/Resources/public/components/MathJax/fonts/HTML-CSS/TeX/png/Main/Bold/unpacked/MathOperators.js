/*************************************************************
 *
 *  MathJax/fonts/HTML-CSS/TeX/png/Main/Bold/MathOperators.js
 *
 *  Defines the image size data needed for the HTML-CSS OutputJax
 *  to display mathematics using fallback images when the fonts
 *  are not availble to the client browser.
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2009-2013 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

MathJax.OutputJax["HTML-CSS"].defineImageData({
    "MathJax_Main-bold": {
        0x2200: [  // FOR ALL
            [6, 5, 0], [7, 7, 1], [8, 8, 1], [9, 10, 1], [10, 10, 0], [12, 13, 1], [14, 15, 1], [16, 18, 1],
            [19, 21, 1], [23, 25, 1], [26, 28, 1], [31, 34, 1], [37, 40, 1], [44, 48, 2]
        ],
        0x2202: [  // PARTIAL DIFFERENTIAL
            [5, 5, 0], [6, 6, 0], [7, 7, 0], [8, 9, 0], [10, 11, 1], [11, 13, 1], [13, 15, 1], [16, 18, 1],
            [19, 21, 1], [22, 25, 1], [26, 29, 1], [31, 34, 1], [37, 41, 1], [44, 49, 2]
        ],
        0x2203: [  // THERE EXISTS
            [4, 5, 0], [5, 6, 0], [6, 7, 0], [7, 8, 0], [8, 10, 0], [10, 12, 0], [12, 14, 0], [14, 17, 0],
            [16, 20, 0], [19, 23, 0], [23, 28, 0], [27, 33, 0], [32, 39, 0], [38, 46, 0]
        ],
        0x2205: [  // EMPTY SET
            [4, 7, 1], [5, 8, 1], [6, 9, 1], [7, 11, 1], [8, 12, 1], [9, 15, 2], [11, 17, 2], [13, 20, 2],
            [15, 25, 3], [18, 29, 3], [21, 35, 4], [25, 40, 4], [30, 48, 5], [35, 56, 5]
        ],
        0x2207: [  // NABLA
            [7, 5, 0], [8, 6, 0], [9, 8, 1], [11, 10, 1], [13, 11, 1], [15, 13, 1], [18, 15, 1], [21, 17, 1],
            [25, 20, 1], [30, 24, 1], [36, 28, 1], [42, 34, 2], [50, 40, 2], [60, 48, 2]
        ],
        0x2208: [  // ELEMENT OF
            [5, 5, 1], [6, 6, 1], [7, 7, 1], [8, 8, 1], [10, 9, 1], [12, 12, 2], [14, 14, 2], [16, 16, 2],
            [19, 20, 3], [23, 23, 3], [27, 27, 4], [31, 32, 4], [38, 38, 5], [44, 45, 6]
        ],
        0x2209: [  // stix-negated (vert) set membership, variant
            [5, 7, 2], [6, 8, 2], [7, 10, 3], [8, 12, 3], [10, 13, 3], [12, 16, 4], [13, 19, 5], [16, 22, 5],
            [19, 26, 6], [22, 31, 7], [27, 37, 9], [31, 43, 10], [37, 51, 12], [44, 62, 15]
        ],
        0x220B: [  // CONTAINS AS MEMBER
            [5, 5, 1], [6, 6, 1], [7, 7, 1], [8, 8, 1], [10, 9, 1], [12, 12, 2], [14, 14, 2], [16, 16, 2],
            [19, 20, 3], [23, 23, 3], [27, 27, 4], [32, 32, 4], [37, 38, 5], [45, 45, 6]
        ],
        0x2212: [  // MINUS SIGN
            [6, 1, -1], [7, 1, -2], [8, 1, -2], [10, 2, -2], [12, 1, -3], [14, 2, -3], [16, 2, -4], [19, 2, -5],
            [23, 2, -6], [27, 3, -7], [32, 3, -8], [38, 4, -10], [45, 4, -12], [53, 5, -14]
        ],
        0x2213: [  // MINUS-OR-PLUS SIGN
            [6, 6, 2], [7, 7, 2], [9, 9, 3], [10, 10, 3], [12, 11, 3], [14, 13, 4], [17, 16, 5], [20, 19, 6],
            [23, 22, 7], [28, 26, 8], [33, 31, 9], [39, 36, 11], [46, 43, 13], [55, 52, 16]
        ],
        0x2215: [  // DIVISION SLASH
            [4, 8, 2], [5, 10, 3], [5, 11, 3], [6, 12, 3], [8, 15, 4], [9, 18, 5], [10, 20, 5], [12, 24, 6],
            [15, 28, 7], [17, 34, 9], [20, 40, 10], [24, 47, 12], [29, 56, 14], [34, 67, 17]
        ],
        0x2216: [  // SET MINUS
            [4, 8, 2], [5, 10, 3], [5, 11, 3], [6, 12, 3], [8, 15, 4], [9, 18, 5], [10, 20, 5], [12, 24, 6],
            [15, 28, 7], [17, 34, 9], [20, 40, 10], [24, 47, 12], [29, 56, 14], [34, 67, 17]
        ],
        0x2217: [  // ASTERISK OPERATOR
            [4, 4, 0], [5, 4, 0], [5, 5, 0], [6, 6, 0], [7, 7, 0], [9, 8, 0], [10, 10, 0], [12, 11, 0],
            [14, 14, 0], [17, 16, 0], [20, 18, -1], [24, 21, -1], [28, 26, -1], [33, 31, -1]
        ],
        0x2218: [  // RING OPERATOR
            [4, 4, 0], [4, 4, 0], [5, 5, 0], [6, 6, 0], [8, 7, 0], [9, 8, 0], [10, 10, 0], [12, 11, 0],
            [15, 14, 0], [17, 16, 0], [20, 18, -1], [24, 22, -1], [29, 26, -1], [34, 31, -1]
        ],
        0x2219: [  // BULLET OPERATOR
            [4, 4, 0], [5, 4, 0], [5, 5, 0], [6, 6, 0], [8, 7, 0], [9, 8, 0], [10, 10, 0], [12, 11, 0],
            [15, 14, 0], [17, 16, 0], [20, 18, -1], [24, 22, -1], [29, 26, -1], [34, 31, -1]
        ],
        0x221A: [  // SQUARE ROOT
            [7, 8, 2], [9, 9, 2], [10, 11, 2], [12, 13, 3], [14, 15, 3], [17, 17, 3], [20, 20, 4], [24, 25, 5],
            [28, 28, 5], [33, 33, 6], [39, 41, 8], [47, 48, 9], [55, 56, 10], [66, 66, 12]
        ],
        0x221D: [  // PROPORTIONAL TO
            [6, 3, 0], [7, 4, 0], [9, 5, 0], [10, 7, 1], [12, 8, 1], [14, 9, 1], [17, 10, 1], [20, 12, 1],
            [24, 14, 1], [28, 16, 1], [33, 19, 1], [39, 22, 1], [47, 26, 1], [55, 31, 1]
        ],
        0x221E: [  // INFINITY
            [8, 3, 0], [9, 4, 0], [11, 6, 1], [13, 7, 1], [15, 8, 1], [18, 9, 1], [22, 10, 1], [26, 12, 1],
            [30, 14, 1], [36, 16, 1], [43, 19, 1], [51, 22, 1], [61, 26, 1], [72, 31, 1]
        ],
        0x2220: [  // ANGLE
            [5, 5, 0], [6, 6, 0], [7, 7, 0], [8, 9, 0], [10, 10, 0], [12, 12, 0], [14, 14, 0], [16, 17, 0],
            [19, 20, 0], [23, 24, 0], [27, 28, 0], [32, 33, 0], [38, 40, 0], [45, 47, 0]
        ],
        0x2223: [  // DIVIDES
            [2, 8, 2], [2, 10, 3], [2, 11, 3], [3, 12, 3], [3, 15, 4], [4, 18, 5], [4, 20, 5], [5, 24, 6],
            [6, 28, 7], [7, 34, 9], [8, 40, 10], [9, 47, 12], [11, 56, 14], [13, 67, 17]
        ],
        0x2225: [  // PARALLEL TO
            [3, 8, 2], [4, 10, 3], [5, 11, 3], [6, 12, 3], [6, 15, 4], [7, 18, 5], [9, 20, 5], [11, 24, 6],
            [12, 28, 7], [15, 34, 9], [17, 40, 10], [21, 47, 12], [24, 56, 14], [29, 67, 17]
        ],
        0x2227: [  // LOGICAL AND
            [5, 6, 1], [6, 7, 1], [7, 7, 1], [9, 9, 1], [10, 10, 1], [12, 12, 1], [14, 13, 1], [17, 16, 1],
            [20, 18, 1], [24, 21, 1], [28, 25, 1], [33, 30, 1], [39, 35, 1], [47, 42, 2]
        ],
        0x2228: [  // LOGICAL OR
            [5, 6, 1], [6, 7, 1], [7, 7, 1], [9, 9, 1], [10, 10, 1], [12, 12, 1], [14, 13, 1], [17, 16, 1],
            [20, 18, 1], [24, 21, 1], [28, 25, 1], [33, 30, 1], [39, 35, 1], [47, 42, 2]
        ],
        0x2229: [  // stix-intersection, serifs
            [5, 5, 1], [6, 6, 1], [7, 7, 1], [9, 8, 1], [10, 10, 1], [12, 11, 1], [14, 13, 1], [17, 15, 1],
            [20, 18, 1], [24, 21, 1], [28, 25, 1], [33, 30, 1], [39, 35, 1], [47, 41, 1]
        ],
        0x222A: [  // stix-union, serifs
            [5, 5, 0], [6, 6, 0], [7, 7, 0], [9, 8, 0], [10, 9, 0], [12, 12, 1], [14, 13, 1], [17, 16, 1],
            [20, 18, 1], [24, 21, 1], [28, 25, 1], [33, 30, 1], [39, 35, 1], [47, 42, 2]
        ],
        0x222B: [  // INTEGRAL
            [5, 7, 2], [6, 8, 2], [7, 10, 3], [8, 12, 3], [9, 13, 3], [11, 16, 4], [13, 19, 5], [15, 22, 5],
            [18, 26, 6], [21, 31, 7], [25, 37, 9], [30, 43, 10], [35, 52, 12], [42, 61, 14]
        ],
        0x223C: [  // TILDE OPERATOR
            [6, 3, 0], [7, 3, -1], [8, 3, -1], [10, 4, -1], [12, 5, -1], [14, 6, -1], [17, 6, -2], [20, 8, -2],
            [23, 8, -3], [28, 10, -3], [33, 12, -4], [39, 14, -5], [46, 16, -6], [55, 19, -7]
        ],
        0x2240: [  // WREATH PRODUCT
            [2, 5, 1], [2, 6, 1], [3, 7, 1], [3, 8, 1], [4, 9, 1], [5, 12, 2], [5, 14, 2], [6, 16, 2],
            [8, 20, 3], [9, 23, 3], [10, 27, 4], [12, 32, 4], [15, 38, 5], [17, 45, 6]
        ],
        0x2243: [  // ASYMPTOTICALLY EQUAL TO
            [6, 4, 0], [7, 4, 0], [9, 5, 0], [10, 6, 0], [12, 7, 0], [14, 10, 1], [17, 11, 1], [20, 13, 1],
            [23, 15, 1], [28, 18, 1], [33, 21, 1], [39, 25, 1], [46, 29, 1], [55, 35, 1]
        ],
        0x2245: [  // APPROXIMATELY EQUAL TO
            [6, 5, 0], [7, 6, 0], [9, 8, 1], [10, 9, 1], [12, 10, 1], [14, 12, 1], [17, 14, 1], [20, 16, 1],
            [23, 19, 1], [28, 22, 1], [33, 27, 2], [39, 32, 2], [46, 38, 2], [55, 44, 2]
        ],
        0x2248: [  // ALMOST EQUAL TO
            [6, 4, 0], [7, 5, 0], [8, 5, 0], [10, 7, 0], [12, 8, 0], [14, 9, 0], [17, 11, 0], [20, 13, 0],
            [23, 15, 0], [28, 17, -1], [33, 20, -1], [39, 24, -1], [46, 28, -1], [55, 33, -2]
        ],
        0x224D: [  // EQUIVALENT TO
            [6, 5, 1], [7, 6, 1], [9, 7, 1], [10, 8, 1], [12, 9, 1], [14, 10, 1], [17, 12, 1], [20, 14, 1],
            [23, 16, 1], [28, 20, 2], [33, 23, 2], [39, 27, 2], [46, 32, 2], [55, 39, 3]
        ],
        0x2250: [  // APPROACHES THE LIMIT
            [6, 5, 0], [7, 5, -1], [9, 7, -1], [10, 8, -1], [12, 9, -1], [14, 11, -1], [17, 13, -2], [20, 15, -2],
            [23, 17, -3], [28, 21, -3], [33, 25, -4], [39, 29, -5], [46, 34, -6], [55, 41, -7]
        ],
        0x2260: [  // stix-not (vert) equals
            [6, 7, 2], [7, 9, 2], [9, 10, 3], [10, 12, 3], [12, 14, 4], [14, 16, 4], [17, 20, 5], [20, 22, 5],
            [23, 26, 6], [28, 31, 7], [33, 37, 9], [39, 43, 10], [46, 51, 12], [55, 61, 14]
        ],
        0x2261: [  // IDENTICAL TO
            [6, 4, 0], [7, 4, 0], [9, 5, 0], [10, 6, 0], [12, 7, 0], [14, 10, 1], [17, 11, 1], [20, 13, 1],
            [23, 15, 1], [28, 18, 1], [33, 21, 1], [39, 25, 1], [46, 29, 1], [55, 35, 1]
        ],
        0x2264: [  // LESS-THAN OR EQUAL TO
            [6, 7, 2], [7, 8, 2], [8, 9, 2], [10, 12, 3], [12, 13, 3], [14, 16, 4], [16, 18, 4], [19, 22, 5],
            [23, 26, 6], [27, 30, 7], [32, 36, 8], [38, 43, 10], [45, 50, 11], [53, 60, 14]
        ],
        0x2265: [  // GREATER-THAN OR EQUAL TO
            [6, 7, 2], [7, 8, 2], [8, 9, 2], [10, 12, 3], [12, 13, 3], [14, 16, 4], [16, 18, 4], [19, 22, 5],
            [23, 26, 6], [27, 30, 7], [32, 36, 8], [38, 43, 10], [45, 50, 11], [53, 60, 14]
        ],
        0x226A: [  // MUCH LESS-THAN
            [8, 6, 1], [9, 7, 1], [11, 9, 2], [13, 10, 2], [15, 11, 2], [18, 13, 2], [22, 16, 3], [26, 18, 3],
            [30, 22, 4], [36, 25, 4], [43, 30, 5], [51, 35, 6], [60, 42, 7], [72, 49, 8]
        ],
        0x226B: [  // MUCH GREATER-THAN
            [8, 6, 1], [10, 7, 1], [11, 9, 2], [13, 10, 2], [16, 11, 2], [19, 13, 2], [22, 16, 3], [26, 18, 3],
            [31, 22, 4], [36, 25, 4], [43, 30, 5], [51, 35, 6], [61, 42, 7], [72, 49, 8]
        ],
        0x227A: [  // PRECEDES
            [6, 6, 1], [7, 6, 1], [8, 7, 1], [10, 8, 1], [12, 11, 2], [14, 12, 2], [16, 14, 2], [19, 16, 2],
            [23, 20, 3], [27, 23, 3], [32, 27, 4], [38, 32, 4], [45, 38, 5], [53, 45, 6]
        ],
        0x227B: [  // SUCCEEDS
            [6, 6, 1], [7, 6, 1], [8, 7, 1], [10, 9, 2], [11, 11, 2], [14, 12, 2], [16, 14, 2], [19, 16, 2],
            [22, 20, 3], [27, 23, 3], [32, 27, 4], [37, 32, 4], [44, 38, 5], [53, 45, 6]
        ],
        0x2282: [  // SUBSET OF
            [6, 5, 1], [7, 6, 1], [8, 7, 1], [10, 8, 1], [12, 9, 1], [14, 12, 2], [16, 14, 2], [19, 16, 2],
            [23, 20, 3], [27, 23, 3], [32, 27, 4], [37, 32, 4], [45, 38, 5], [53, 45, 6]
        ],
        0x2283: [  // SUPERSET OF
            [6, 6, 1], [7, 6, 1], [8, 7, 1], [10, 8, 1], [12, 10, 1], [14, 12, 2], [16, 14, 2], [19, 16, 2],
            [23, 20, 3], [27, 23, 3], [32, 27, 4], [38, 32, 4], [45, 38, 5], [53, 45, 6]
        ],
        0x2286: [  // SUBSET OF OR EQUAL TO
            [6, 7, 2], [7, 8, 2], [8, 9, 2], [10, 12, 3], [12, 13, 3], [14, 16, 4], [16, 18, 4], [19, 22, 5],
            [23, 26, 6], [27, 30, 7], [32, 36, 8], [37, 43, 10], [45, 50, 11], [53, 60, 14]
        ],
        0x2287: [  // SUPERSET OF OR EQUAL TO
            [6, 7, 2], [7, 8, 2], [8, 9, 2], [10, 12, 3], [11, 13, 3], [14, 16, 4], [16, 18, 4], [19, 22, 5],
            [23, 26, 6], [27, 30, 7], [32, 36, 8], [38, 43, 10], [44, 50, 11], [53, 60, 14]
        ],
        0x228E: [  // MULTISET UNION
            [5, 5, 0], [6, 6, 0], [7, 6, 0], [9, 8, 0], [10, 9, 0], [12, 12, 1], [14, 13, 1], [17, 16, 1],
            [20, 18, 1], [24, 21, 1], [28, 25, 1], [33, 29, 1], [39, 35, 1], [47, 42, 2]
        ],
        0x2291: [  // SQUARE IMAGE OF OR EQUAL TO
            [6, 7, 2], [7, 8, 2], [9, 9, 2], [10, 12, 3], [12, 13, 3], [14, 16, 4], [17, 18, 4], [20, 22, 5],
            [23, 26, 6], [28, 30, 7], [33, 36, 8], [39, 43, 10], [46, 50, 11], [55, 60, 14]
        ],
        0x2292: [  // SQUARE ORIGINAL OF OR EQUAL TO
            [6, 7, 2], [7, 8, 2], [8, 9, 2], [10, 12, 3], [12, 13, 3], [14, 16, 4], [16, 18, 4], [19, 22, 5],
            [23, 26, 6], [27, 30, 7], [32, 36, 8], [38, 43, 10], [45, 50, 11], [53, 60, 14]
        ],
        0x2293: [  // stix-square intersection, serifs
            [5, 5, 1], [6, 5, 0], [7, 6, 0], [9, 8, 1], [10, 10, 1], [12, 11, 0], [14, 12, 0], [17, 15, 0],
            [20, 17, 0], [23, 20, 0], [28, 25, 1], [33, 29, 0], [39, 34, 0], [47, 40, 0]
        ],
        0x2294: [  // stix-square union, serifs
            [5, 5, 0], [6, 6, 0], [7, 6, 0], [9, 8, 0], [10, 9, 0], [12, 11, 0], [14, 12, 0], [17, 15, 0],
            [20, 17, 0], [23, 20, 0], [28, 24, 0], [33, 29, 0], [39, 34, 0], [47, 40, 0]
        ],
        0x2295: [  // stix-circled plus (with rim)
            [7, 6, 1], [7, 7, 1], [8, 8, 2], [10, 10, 2], [12, 11, 2], [14, 14, 3], [17, 16, 3], [20, 19, 4],
            [23, 22, 4], [28, 26, 5], [33, 31, 6], [39, 37, 7], [46, 43, 8], [55, 51, 9]
        ],
        0x2296: [  // CIRCLED MINUS
            [6, 6, 1], [7, 7, 1], [9, 8, 2], [10, 10, 2], [12, 11, 2], [14, 14, 3], [17, 16, 3], [20, 19, 4],
            [23, 22, 4], [28, 26, 5], [33, 31, 6], [39, 37, 7], [46, 43, 8], [55, 51, 9]
        ],
        0x2297: [  // stix-circled times (with rim)
            [6, 6, 1], [7, 7, 1], [8, 8, 2], [10, 10, 2], [12, 11, 2], [14, 14, 3], [17, 16, 3], [20, 19, 4],
            [23, 22, 4], [28, 26, 5], [33, 31, 6], [39, 37, 7], [46, 43, 8], [55, 51, 9]
        ],
        0x2298: [  // CIRCLED DIVISION SLASH
            [6, 6, 1], [7, 7, 1], [8, 8, 2], [10, 10, 2], [12, 11, 2], [14, 14, 3], [17, 16, 3], [20, 19, 4],
            [23, 22, 4], [28, 26, 5], [33, 31, 6], [39, 37, 7], [46, 43, 8], [55, 51, 9]
        ],
        0x2299: [  // CIRCLED DOT OPERATOR
            [6, 6, 1], [7, 7, 1], [8, 8, 2], [10, 10, 2], [12, 11, 2], [14, 14, 3], [17, 16, 3], [20, 19, 4],
            [23, 22, 4], [28, 26, 5], [33, 31, 6], [39, 37, 7], [46, 43, 8], [55, 51, 9]
        ],
        0x22A2: [  // RIGHT TACK
            [5, 5, 0], [6, 6, 0], [7, 7, 0], [8, 9, 0], [9, 10, 0], [11, 12, 0], [13, 14, 0], [15, 17, 0],
            [18, 20, 0], [21, 23, 0], [25, 28, 0], [30, 33, 0], [36, 39, 0], [42, 46, 0]
        ],
        0x22A3: [  // LEFT TACK
            [5, 5, 0], [6, 6, 0], [7, 7, 0], [8, 9, 0], [9, 10, 0], [11, 12, 0], [13, 14, 0], [15, 17, 0],
            [18, 20, 0], [21, 23, 0], [25, 28, 0], [30, 33, 0], [36, 39, 0], [42, 46, 0]
        ],
        0x22A4: [  // DOWN TACK
            [6, 5, 0], [7, 6, 0], [9, 7, 0], [10, 10, 1], [12, 10, 0], [14, 13, 1], [17, 15, 1], [20, 17, 0],
            [23, 21, 1], [28, 23, 0], [33, 28, 0], [39, 34, 1], [46, 39, 0], [55, 46, 0]
        ],
        0x22A5: [  // UP TACK
            [6, 5, 0], [7, 6, 0], [9, 7, 0], [10, 9, 0], [12, 10, 0], [14, 12, 0], [17, 14, 0], [20, 17, 0],
            [23, 20, 0], [28, 23, 0], [33, 28, 0], [39, 33, 0], [46, 39, 0], [55, 46, 0]
        ],
        0x22A8: [  // TRUE
            [7, 8, 2], [8, 10, 3], [10, 11, 3], [11, 12, 3], [13, 15, 4], [16, 18, 5], [19, 20, 5], [22, 24, 6],
            [26, 28, 7], [31, 34, 9], [36, 40, 10], [43, 47, 12], [51, 56, 14], [61, 67, 17]
        ],
        0x22C4: [  // DIAMOND OPERATOR
            [4, 5, 1], [5, 6, 1], [6, 7, 1], [7, 8, 1], [8, 9, 1], [10, 10, 1], [11, 12, 1], [14, 14, 1],
            [16, 16, 1], [19, 19, 1], [22, 22, 1], [27, 26, 1], [32, 31, 2], [37, 37, 2]
        ],
        0x22C5: [  // DOT OPERATOR
            [2, 2, -1], [3, 2, -1], [3, 3, -1], [3, 3, -1], [4, 3, -2], [5, 4, -2], [5, 4, -3], [6, 5, -3],
            [7, 6, -4], [9, 7, -5], [10, 8, -6], [12, 9, -7], [14, 10, -9], [17, 13, -10]
        ],
        0x22C6: [  // STAR OPERATOR
            [4, 4, 0], [5, 5, 0], [6, 5, 0], [7, 6, 0], [8, 7, 0], [10, 9, 0], [11, 10, 0], [13, 12, 0],
            [16, 14, 0], [19, 17, 0], [22, 20, 0], [26, 24, 0], [31, 28, 0], [37, 34, 0]
        ],
        0x22C8: [  // BOWTIE
            [7, 5, 1], [8, 6, 1], [10, 7, 1], [12, 8, 1], [13, 9, 1], [17, 10, 1], [19, 12, 1], [23, 14, 1],
            [27, 17, 2], [32, 20, 2], [38, 24, 2], [45, 28, 2], [54, 33, 3], [64, 39, 3]
        ],
        0x22EE: [  // VERTICAL ELLIPSIS
            [2, 8, 1], [3, 9, 1], [3, 11, 1], [3, 13, 1], [4, 15, 1], [5, 17, 1], [5, 20, 1], [6, 24, 1],
            [7, 28, 1], [9, 33, 1], [10, 40, 2], [12, 47, 2], [14, 55, 2], [17, 65, 2]
        ],
        0x22EF: [  // MIDLINE HORIZONTAL ELLIPSIS
            [9, 2, -1], [11, 2, -1], [13, 3, -1], [15, 3, -1], [17, 3, -2], [21, 4, -2], [24, 4, -3], [29, 5, -3],
            [34, 6, -4], [41, 7, -5], [48, 8, -6], [57, 9, -7], [68, 10, -9], [81, 13, -10]
        ],
        0x22F1: [  // DOWN RIGHT DIAGONAL ELLIPSIS
            [9, 7, 0], [10, 8, 0], [12, 9, 0], [15, 10, -1], [17, 12, -1], [20, 14, -1], [24, 16, -1], [28, 19, -2],
            [33, 23, -2], [40, 26, -3], [47, 32, -3], [56, 37, -4], [67, 44, -5], [79, 52, -6]
        ]
    }
});

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].imgDir + "/Main/Bold" +
    MathJax.OutputJax["HTML-CSS"].imgPacked + "/MathOperators.js");
