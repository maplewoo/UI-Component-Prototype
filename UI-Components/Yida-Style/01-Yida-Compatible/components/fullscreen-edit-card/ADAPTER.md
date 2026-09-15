# FullscreenEditCard — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| active | boolean | 是 | 是否全屏（受控） |
| onActiveChange | (b:boolean)=>void | 是 | 切换回调（宿主持有"当前哪张全屏"） |
| title | node | 否 | 卡头标题 |
| extra | node | 否 | 头部右侧其它操作；组件在其后追加全屏按钮 |
| children | node | 是 | 卡内容（自行内滚） |
| inset | number | 否 | 全屏内缩，**Default 按令牌=12** |
| onBeforeEnter | ()=>void | 否 | 进入全屏前复位兄弟卡吸顶 transform |
| enterTitle/exitTitle | string | 否 | 按钮 title 文案（默认定稿） |

## 输出 / 事件
- `onActiveChange(bool)`；`onBeforeEnter()`（宿主做 P3 复位）。

## External Dependencies
- **body 滚动锁 + window keydown(Esc)**：组件直接操作 `document.body.style.overflow` 与全局 keydown，宿主须知"全屏期间整页 body 被锁、退出还原"。
- **兄弟卡 transform 复位**：真实页由 `scroll-pin-card`(P3)/宿主实现，经 `onBeforeEnter` 注入（示例用 `data-fs-pin` 选择器演示）。
- antd `Card` / `Button`。

## 宿主需负责
- 声明 :root 令牌块（用 `--r-card/--line/--head-bg/--z-full/--sh-full`）。
- 维护"至多一张全屏"：把 `active` 计算为 `fullscreenId===thisId`，`onActiveChange` 里改 `fullscreenId`。
- 若页面用了整卡吸顶(P3)，务必传 `onBeforeEnter` 清 transform，否则全屏卡会叠加位移顶偏（§6 已知坑）。
- 卡内容（表格/筛选/保存/撤销/脏锁等）由宿主塞入 `children/extra`，不属本件。

## 注意
- 卸载/切走时 `useEffect` cleanup 会还原 body.overflow 并移除监听；宿主勿再叠加另一层 body 锁导致互踩。
- `z-index:950` 定稿：低于弹窗/抽屉(1000)，保证全屏时自家 Modal/Drawer 仍浮在其上。
