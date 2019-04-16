'use strict';

var randomColor = function randomColor() {
  var color = '#' + (Math.random() * 0xffffff << 0).toString(16);
  return color.toUpperCase();
};

var createBlock = function createBlock(block) {
  var background = 'background: ' + block.background + ';';
  var width = 'width: ' + block.width + '%;';
  var style = background + ' ' + width;
  return '<div class="element" style="' + style + '"></div>';
};

var createElements = function createElements(blocks) {
  return blocks.map(createBlock).join('');
};

var createLines = function createLines(lines) {
  return lines.map(function createLine(line) {
    var background = 'background: ' + line.background + ';';
    var height = 'height: ' + 100 / lines.length + '%;';
    var style = background + ' ' + height;
    return '<div class="line" data-update-time="' + line.updateTime + '" style="' + style + '">' + createElements(line.elements) + '</div>';
  }).join('');
};

var changeColor = function changeColor(container) {
  var lines = [].slice.call(container.getElementsByClassName('line'));
  lines.forEach(function (line) {
    var delay = Number(line.getAttribute('data-update-time'));
    setInterval(function () {
      var elements = [].slice.call(line.children);
      elements.forEach(function (elem) {
        elem.style.background = randomColor();
      });
    }, delay);
  });
};

var renderTo = function renderTo(container, params) {
  container.innerHTML = createLines(params.lines);
  changeColor(container);
};

var params = {
  lines: [{
    background: '#00F',
    updateTime: 1000,
    elements: [{
      background: '#00F',
      width: 25
    }, {
      background: '#00F',
      width: 50
    }, {
      background: '#00F',
      width: 25
    }]
  }, {
    background: '#00F',
    updateTime: 2000,
    elements: [{
      background: '#00F',
      width: 50
    }, {
      background: '#00F',
      width: 25
    }, {
      background: '#00F',
      width: 25
    }]
  }]
};
renderTo(document.body, params);