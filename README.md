# react power path
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/kthjm/react-power-path.svg)](https://travis-ci.org/kthjm/react-power-path)
[![Coverage Status](https://coveralls.io/repos/github/kthjm/react-power-path/badge.svg)](https://coveralls.io/github/kthjm/react-power-path)

enhance `<path />` that recieve its totalLength in `strokeDasharray` / `strokeDashoffset`.

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
          strokeDashoffset: (totalLength) => {}
        }
      }} />
      <Path {...{
        d: 'M 200 100 L 300 100 L 200 300 z',
        style: {
          strokeDasharray: 1000,
          strokeDashoffset: 1000
        }
      }} />
    </g>
  </svg>
)

```

depending on [`createElementNS`](https://developer.mozilla.org/ja/docs/Web/API/Document/createElementNS) and [`path.getTotalLength`](https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getTotalLength).

## License
MIT (http://opensource.org/licenses/MIT)
