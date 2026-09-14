# CornerBadge — SPEC

## 0 · 令牌合规 Token Compliance（MANDATORY）
本组件所有取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 定义的令牌变量，实现里写成 `var(--token, 兜底字面值)`，不得裸写死数值。凡 design-tokens 规定的值即本件强制默认值；props 仅作覆盖入口，默认必须等于令牌值，页面级随意改令牌值视为违规。宿主页面须先声明 design-tokens 的 :root 令牌块。下方各节 MANDATORY 项均已按令牌取值。

## Purpose
在按钮上叠加一个数量提示，两种形态：`corner`（右上角红角标）与 `inline`（按钮文字后的半透明计数胶囊）。

## Structure
`corner`（宿主按钮须 `position:relative`，本组件绝对定位）：
```
<span class="corner-badge corner">3</span>
```
`inline`（作为按钮子节点随文字流动）：
```
<span class="corner-badge inline">5</span>
```

## States / 可见性规则（MANDATORY，来自定稿）
- `corner`：`count <= 0` 或 `disabled === true` 时**不渲染**（返回 null）；有值时渲染红角标。
- `inline`：始终渲染，`0` 也显示（表示"当前选中 0"，配合按钮禁用态）。
- 溢出：`count > max`（默认 99）显示 `{max}+`。

## Visual Rules
- `corner`：`background:#F44336（--danger，=--j-fail）; color:#fff`（白字非令牌），圆角胶囊 `border-radius:9px`（=18px 高的一半成圆形，非独立令牌），`min-width:18px;height:18px;padding:0 5px;font-size:12px（--f-aux）;font-weight:500（--fw-medium）;line-height:18px;text-align:center`，绝对定位 `top:-8px;right:-8px; z-index:2; pointer-events:none`（MANDATORY，18×18 与 (-8,-8) 越出见 design-tokens §4）。
- **无白圈/无描边**：角标为纯红底白字，不加 border/box-shadow 白环（MANDATORY 定稿规则）。
- `inline`：`background:rgba(255,255,255,0.28); color:#fff`——半透明白为定稿值，design-tokens 未定义（非令牌，保留字面），`min-width:18px;height:18px;padding:0 5px;border-radius:9px;font-size:12px（--f-aux）;font-weight:500（--fw-medium）;line-height:1;margin-left:6px;display:inline-flex;align-items:center;justify-content:center`（MANDATORY）。
- 两态均 `font-variant-numeric: tabular-nums`（MANDATORY）。

## Data Contract（props）
- `count: number` 必填，显示的数量。
- `variant: 'corner' | 'inline'` 选填，默认 `'corner'`。
- `max: number` 选填，默认 `99`，超出显示 `{max}+`。
- `disabled: boolean` 选填，仅影响 `corner` 的可见性（true 时不渲染）。

## Interaction Rules
组件本身不可点击（`corner` 为 `pointer-events:none`），点击由宿主按钮承担。

## External Dependencies
无。不接 Toast / Save / 权限 / 后端；计数来源由宿主传入。

## Implementation Constraints
- `corner` 依赖宿主容器为定位上下文：若宿主按钮无 `position:relative`，角标会相对更外层定位——迁移时必须确认（宜搭 antd Button 默认非 relative，需宿主给按钮加 `position:relative` 或包一层）。
- 纯 CSS，不依赖 antd Badge 组件（避免平台 Badge 白圈/尺寸不可控）。

## Demo-Only Properties
- 具体数字、按钮文案、示例色之外的展示排布。`#F44336` 即令牌 `--danger`（=`--j-fail`）；`rgba(255,255,255,0.28)` 为定稿值但非令牌（design-tokens 未定义，保留字面）。两者均非 Demo。

## Migration Rules
- 原页 `cs-badge`→`variant=corner`，`cs-cnt-t`→`variant=inline`。
- 保留"保存↔撤销切换 20px""新建在 0 数据时禁用"等属宿主逻辑，不进组件。

## Boundary Conditions
- `count` 为小数按四舍五入到整数位显示？否——按原样 `String(count)` 渲染，宿主须传整数。
- `count` 负数等同 0（`corner` 不渲染，`inline` 显示负值由宿主避免）。
