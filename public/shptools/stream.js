/*
    Stream Reader from Gordon.JS
    Copyright (c) 2010 Tobias Schneider

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

var win = self, doc = win.document, fromCharCode = String.fromCharCode, push = Array.prototype.push, min = Math.min,
  max = Math.max;

(function (window, undefined) {

  window.Gordon = {};

  var DEFLATE_CODE_LENGTH_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    DEFLATE_CODE_LENGHT_MAP = [[0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [1, 11], [1, 13], [1, 15], [1, 17], [2, 19], [2, 23], [2, 27], [2, 31], [3, 35], [3, 43], [3, 51], [3, 59], [4, 67], [4, 83], [4, 99], [4, 115], [5, 131], [5, 163], [5, 195], [5, 227], [0, 258]],
    DEFLATE_DISTANCE_MAP = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 7], [2, 9], [2, 13], [3, 17], [3, 25], [4, 33], [4, 49], [5, 65], [5, 97], [6, 129], [6, 193], [7, 257], [7, 385], [8, 513], [8, 769], [9, 1025], [9, 1537], [10, 2049], [10, 3073], [11, 4097], [11, 6145], [12, 8193], [12, 12289], [13, 16385], [13, 24577]];

  Gordon.Stream = function (data) {
    var buff = [], t = this, i = t.length = data.length;
    t.offset = 0;
    for (var i = 0; data[i]; i++) {
      buff.push(fromCharCode(data.charCodeAt(i) & 0xff));
    }
    t._buffer = buff.join('');
    t._bitBuffer = null;
    t._bitOffset = 8;
  };


  function decodeSymbol(s, table) {
    var code = 0, len = 0;
    while (true) {
      code = (code << 1) | s.readUB(1, true);
      len++;
      var entry = table[code];
      if (undefined != entry && entry.length == len) {
        return entry.symbol
      }
    }
  }
})(this);

