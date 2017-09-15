# react svg ghost

When condition poured is matched with `data-ghost`'s condition, children pathes appear.

`data-ghost` must be set as json string.

default transition is `1s`.

```html
<g data-ghost='{
    "condition": {
        "order": 0
    },
    "transition": "3s"
}'>
    <path d="" />
    <path d="" />
    <path d="" />
</g>
```

```javascript
import Ghost from "react-svg-ghost";

const rootStyle = {
    height: "100%"
};

export default (view,order,children) => (
    view && <Ghost {...{
        condition: {order},
        rootStyle,
        children
    }} />
)
```

if `order === 0`, the children's strokeDashoffset is set as 0, and they appear view.
