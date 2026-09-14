# InlineJumpPagination — SPEC

## Purpose
返回 antd `Table` 可直接使用的 `pagination` 配置：常规页码 + `showTotal` 内嵌中文"共 N 项"与"跳至 [输入] 页"。

## Structure
- 页码区：antd 默认 prev/pages/next，控件统一 `height:28px; border-radius:6px`。
- 跳页区：`position:absolute; right:0`，含文案 + `Input`(48px 数字框) + "页"。
- 容器 `padding-right:150px` 给绝对定位的跳页区让位，避免压住页码。

## States
- 输入空：无动作。
- 输入有效页：回车/失焦前 Enter → 跳转并清空输入。
- 越界：自动夹到 `[1, maxPage]`。
- `total===0`：仍显"共 0 项"，跳页框可隐藏或禁用（默认隐藏，`hideJumpWhenEmpty` 可配）。

## Interaction Rules
- 页码点击 → `onChange(page)`。
- 输入仅数字（非数字过滤）；Enter 跳转，Blur 清空。
- 组件不持有 `current`：受控，页由宿主维护。

## Visual Rules
- 分页控件高 28（MANDATORY），页码/前后按钮 `line-height:26px; border-radius:6px`。
- 跳页文字 `14px / rgba(0,0,0,0.65)`，输入 `width:48px;height:28px;text-align:center;font-variant-numeric:tabular-nums`（MANDATORY）。
- 字体族回退 PingFang/YaHei 栈（MANDATORY：antd 分页箭头是 `button` 会带自身字体，需强制继承，否则中英文混排不齐）。
- 全部样式作用在宿主页给表格包的外层类 `.ijp-wrap` 内（MANDATORY：不全局污染）。

## Data Contract
`useJumpPagination(cfg)` / `jumpPagination(cfg, jumpState)`，cfg：
- `current: number`（1 起，必填）
- `total: number`（总条数，必填）
- `pageSize: number`（默认 10）
- `onChange(page: number)`（必填）
- `totalLabel?: (total)=>ReactNode`（默认 `共 ${total} 项`）
- `hideJumpWhenEmpty?: boolean`（默认 true）

返回：可直接展开进 `Table pagination={{ ...ret }}` 的对象（含 `showTotal` 等）。

## External Dependencies
- antd `Table` + `Input`。
- 宿主提供 `current/total/onChange`（分页状态与取数由宿主管理）。

## Implementation Constraints
- **不依赖 antd locale**：中文"跳至/页"为硬编码，正是提取本件的理由（MANDATORY rationale）。
- `showQuickJumper` 必须为 `false`（避免与自绘跳页重复）。
- `showSizeChanger` 默认 `false`。
- 跳页输入需受控 state（用 hook 内部 `useState`）。

## Demo-Only Properties
- `150px` 让位宽度、`pageSize=10`、"共 N 项/跳至/页"具体文案（可 i18n 化，此处示例中文）。

## Migration Rules
- 原页 `cs-jump / cs-jump-in / .checklist-inline-table .ant-pagination*` → `.ijp-wrap .ant-pagination* / ijp-jump / ijp-input`。
- 原页里 `pageMap[instId]`、`jumpVal`、`goJump()` 内联在 render 里 → 收敛为 hook。

## Boundary Conditions
- `maxPage = ceil(total/pageSize)`，至少 1。
- `current>maxPage`：显示夹到 maxPage。
- 非数字输入被过滤，Enter 时空串按 1 处理。
