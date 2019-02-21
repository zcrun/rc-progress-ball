# rc-progress-ball

水波进度球组件 react 实现

![example](./docs/imgs/example.gif)

## Install

```bash
npm install rc-progress-ball --save-dev
```

## Use

1. import Component

```js
import ProgressBall from "rc-progress-ball";
```

2. Use in your react component

```jsx
<ProgressBall value={50} />
```

## props

| prop       | meaning                  | Type   | example      |
| ---------- | ------------------------ | ------ | ------------ |
| id         | canvas 的 id             | string | progressBall |
| value      | 进度值                   | number | 50           |
| size       | canvas 大小              | number | 140          |
| color      | 背景颜色                 | string | #20b3ff      |
| textColor  | 文字颜色                 | string | #000         |
| waveWidth  | 波浪宽度,数越小越宽      | number | 0.045        |
| waveHeight | 波浪高度,数越大越高      | number | 16           |
| speed      | 波浪速度，数越大速度越快  | number | 0.04         |
| xOffset    | 波浪 x 偏移量            | number | 0            |
