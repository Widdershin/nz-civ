import {run} from '@cycle/xstream-run';
import {makeDOMDriver, svg, h, div} from '@cycle/dom';
import xs from 'xstream';

import _ from 'lodash';

function hexCorner (center, size, i) {
  const angleInDegrees = 60 * i + 30;
  const angleInRadians = Math.PI / 180 * angleInDegrees;

  return {
    x: center.x + size * Math.cos(angleInRadians),
    y: center.y + size * Math.sin(angleInRadians)
  };
}

function hexagon (center, attrs) {
  const size = 50;

  const points = _
    .range(6)
    .map(i => hexCorner(center, size, i))
    .map(({x, y}) => `${x},${y}`)
    .join(' ');

  return (
    h('polygon', {attrs: {points, ...attrs}})
  );
}

function view () {
  return (
    svg({attrs: {width: innerWidth, height: innerHeight}}, [
      hexagon({x: 143, y: 25}, {fill: 'forestgreen'}),
      hexagon({x: 229, y: 25}, {fill: 'forestgreen'}),
      hexagon({x: 100, y: 100}, {fill: 'forestgreen'}),
      hexagon({x: 272, y: 100}, {fill: 'forestgreen'}),
      hexagon({x: 57, y: 175}, {fill: 'forestgreen'}),
      hexagon({x: 314, y: 175}, {fill: 'forestgreen'}),
      hexagon({x: 100, y: 250}, {fill: 'forestgreen'}),
      hexagon({x: 186, y: 250}, {fill: 'forestgreen'}),
      hexagon({x: 272, y: 250}, {fill: 'forestgreen'}),
      hexagon({x: 185, y: 100}, {fill: 'skyblue'}),
      hexagon({x: 143, y: 175}, {fill: 'skyblue'}),
      hexagon({x: 228, y: 175}, {fill: 'skyblue'})
    ])
  );
}

function main ({DOM}) {
  return {
    DOM: xs.of(view())
  };
}

const drivers = {
  DOM: makeDOMDriver('.app')
};

run(main, drivers);
