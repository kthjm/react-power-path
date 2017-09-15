// @flow
import React from 'react'

const defaultTransition = '1s'

export default class Ghost extends React.Component {
   handle(span) {
      if (span && !this.conditionals) {
         console.log('init')
         this.conditionals = Array.from(span.querySelectorAll('g'))
            .filter(g => getDataGhost(g))
            .map(g => {
               let { condition, transition } = JSON.parse(getDataGhost(g)),
                  shouldAppear = this.conditioner(condition)
               return {
                  condition,
                  transition,
                  pathes: Array.from(g.childNodes)
                     .filter(({ nodeName }) => nodeName == 'path')
                     .map(path => {
                        let { style } = path,
                           total = path.getTotalLength()
                        style.transition = ''
                        style.strokeDasharray = total
                        style.strokeDashoffset = shouldAppear ? 0 : total
                        return { total, style }
                     })
               }
            })
      } else {
         console.log('fin')
         this.conditionals = null
      }
   }

   conditioner(condition) {
      let entries = Object.entries(condition),
         agrees = entries.filter(
            ([key, value]) => this.props.condition[key] === value
         )
      return entries.length === agrees.length
   }

   componentDidUpdate() {
      this.conditionals.forEach(
         ({ pathes, condition, transition }) =>
            this.conditioner(condition) &&
            pathes.forEach(({ total, style }) => {
               style.transition =
                  !style.transition && (transition || defaultTransition)
               style.strokeDashoffset = 0
            })
      )
   }

   constructor(props) {
      super(props)
      this.handle = this.handle.bind(this)
   }

   render() {
      return (
         <span
            {...{
               ref: this.handle,
               style: this.props.rootStyle,
               children: this.props.children
            }}
         />
      )
   }
}

const getDataGhost = g =>
   g.dataset ? g.dataset.ghost : g.getAttribute('data-ghost')
