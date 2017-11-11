# react power path
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://img.shields.io/travis/kthjm/react-power-path.svg?style=flat-square)](https://travis-ci.org/kthjm/react-power-path)
[![Coverage Status](https://img.shields.io/coveralls/github/kthjm/react-power-path.svg?style=flat-square)](https://coveralls.io/github/kthjm/react-power-path)

> enhanced `<path />` that recieve its totalLength via specific styles.

## Installation
```shell
yarn add react-power-path
```

## Usage
```js
import React from 'react'
import Path from 'react-power-path'

export default (props) => (
  <svg viewBox='0 0 300 300'>
    <g>
      <Path {...{
        d: 'M 100 100 L 300 100 L 200 300 z',
        style: {
          strokeDasharray: (totalLength) => {},
          strokeDashoffset: (totalLength) => {},
          animation: (totalLength) => {},
          animationName: (totalLength) => {},
        }
      }} />
    </g>
  </svg>
)

```

## API

specific styles:
- `strokeDasharray`
- `strokeDashoffset`
- `animation`
- `animationName`

If they are set as function, the totalLength passed, and the result will be value. Or set as values, nothing happens.

> `react-power-path` depend on [`createElementNS`](https://developer.mozilla.org/ja/docs/Web/API/Document/createElementNS) and [`path.getTotalLength`](https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getTotalLength).

## License
MIT (http://opensource.org/licenses/MIT)
