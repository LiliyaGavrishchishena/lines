'use strict';

const randomColor = () => {
  let color = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  return color.toUpperCase();
};

const createBlock = block => {
  let background = 'background: ' + block.background + ';';
  let width = 'width: ' + block.width + '%;';
  let style = background + ' ' + width;
  return '<div class="element" style="' + style + '"></div>';
};

const createElements = blocks => {
  return blocks.map(createBlock).join('');
};

const createLines = lines => {
  return lines
    .map(function createLine(line) {
      let background = 'background: ' + line.background + ';';
      let height = 'height: ' + 100 / lines.length + '%;';
      let style = background + ' ' + height;
      return (
        '<div class="line" data-update-time="' +
        line.updateTime +
        '" style="' +
        style +
        '">' +
        createElements(line.elements) +
        '</div>'
      );
    })
    .join('');
};

const changeColor = container => {
  const lines = [].slice.call(container.getElementsByClassName('line'));
  lines.forEach(function(line) {
    let delay = Number(line.getAttribute('data-update-time'));
    setInterval(function() {
      let elements = [].slice.call(line.children);
      elements.forEach(function(elem) {
        elem.style.background = randomColor();
      });
    }, delay);
  });
};

const renderTo = (container, params) => {
  container.innerHTML = createLines(params.lines);
  changeColor(container);
};

const params = {
  lines: [
    {
      background: '#00F',
      updateTime: 1000,
      elements: [
        {
          background: '#00F',
          width: 25,
        },
        {
          background: '#00F',
          width: 50,
        },
        {
          background: '#00F',
          width: 25,
        },
      ],
    },
    {
      background: '#00F',
      updateTime: 2000,
      elements: [
        {
          background: '#00F',
          width: 50,
        },
        {
          background: '#00F',
          width: 25,
        },

        {
          background: '#00F',
          width: 25,
        },
      ],
    },
  ],
};

renderTo(document.body, params);
