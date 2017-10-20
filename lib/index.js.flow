// @flow
import React from 'react'

type StrokeDasharrayFn = (totalLength?: number) => any
type StrokeDashoffsetFn = (totalLength?: number) => any

type Style = {
  strokeDasharray: number | StrokeDasharrayFn,
  strokeDashoffset: number | StrokeDashoffsetFn,
  [styleName: string]: any
}
type Props = {
  d: string,
  style?: Style,
  [attributeName: string]: any
}

const passStyleKeys = ['strokeDasharray', 'strokeDashoffset']

export default class PowerPath extends React.Component<Props> {
  totalLength: ?number

  constructor(props: Props) {
    super(props)
    this.setTotalLength(props.d)
  }

  setTotalLength(d: any) {
    if (isD(d)) {
      ;(d: string)
      this.totalLength = d2t(d)
    }
  }

  render() {
    const props = Object.assign({}, this.props)
    if (typeof props.style === 'object') {
      passStyleKeys.forEach(key => {
        props.style[key] = ifIsFn(props.style[key], this.totalLength)
      })
    }
    return <path {...props} />
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.d !== nextProps.d) {
      this.setTotalLength(nextProps.d)
    }
  }
}

const isD = (d: any): boolean => d && typeof d === 'string'

const d2t = (d: string): number | void => {
  const path: any = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  path.setAttribute('d', d)
  return path.getTotalLength()
}

const ifIsFn = (value: any, arg: ?number): any =>
  typeof value === 'function' ? value(arg) : value
