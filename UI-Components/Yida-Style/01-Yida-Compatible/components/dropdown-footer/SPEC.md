# DropdownFooter — SPEC

## 0 · 令牌取值约定（Token Defaults）
本组件取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 令牌，实现写成 `var(--token, 兜底字面值)`、不裸写死。凡令牌规定的值：组件暴露了覆盖入口（props 中有对应项）的一律标 `Default 按令牌`（默认值＝令牌值，可覆盖但页面别随意改）；仅无任何覆盖入口（没有选择）的结构性规则才标 `MANDATORY`。宿主页面须先声明 design-tokens 的 :root 令牌块。

## Purpose
多选下拉面板的两件自定义元素 + 可选计数：`OptionCheck`（勾选框）、`DropdownFooter`（底栏）、`OptionCount`（右侧灰计数）。三者配套 antd 多选 `Select`。

## Structure
```
<Select mode="multiple"
  optionRender={o => <span><OptionCheck checked/>{label}<OptionCount/></span>}
  dropdownRender={menu => <div>{menu}<DropdownFooter .../></div>} />
```

## States
- OptionCheck：未选=白底灰框；选中=蓝底白勾。
- DropdownFooter：常态一行；左文案可为字符串或节点；右为"清空"链接或自定义节点（如模式切换）。
- OptionCount：`count===0` 时淡显（浅灰），>0 常规。

## Interaction Rules
- `DropdownFooter` 右链接 `onClick → onClear`；不做数据操作（清空逻辑在宿主）。
- 勾选框纯视觉，选中态由 antd `optionRender` 的 `selected` 传入，不代表真实状态源。
- 左/右若传入 ReactNode，则 `DropdownFooter` 不接管其交互。

## Visual Rules
- 面板（`popupClassName` 作用域）：圆角 6（`--r-ctrl`）、阴影 `--sh-pop`、行高 32（`--h-ctrl-lg`）、左右内距 10px（MANDATORY）。
- OptionCheck：`14x14`，圆角 `--r-small`（14/3 为定稿），边框 `--line-strong`（#d9d9d9），未选背景 `#fff`；选中背景/边框 `--brand`（#1677ff）、勾为白色（MANDATORY）。
- DropdownFooter：`display:flex; justify-content:space-between; gap:8px; padding:6px 10px; border-top:1px solid var(--line,#f0f0f0); margin-top:4px; font-size:var(--f-aux,12px); color:var(--t3,rgba(0,0,0,.45))`（Default 按令牌；覆盖入口：`left`/`right`/`clearText`/`onClear`/`selectedCount`）。
- 链接 `.df-link`：`color:var(--brand,#1677ff); cursor:pointer`（Default 按令牌；覆盖入口：`clearText`/`right`）。
- OptionCount：`margin-left:auto; font-size:var(--f-aux,12px); color:var(--t3,rgba(0,0,0,.45)); font-variant-numeric:tabular-nums`（MANDATORY 右靠 + 等宽）；`count===0` 淡显 `color:var(--t4,rgba(0,0,0,.25))`（MANDATORY）。
- 选中项底色 `var(--brand-bg,#e6f4ff)` + `font-weight:var(--fw-strong,600)`（MANDATORY，覆盖 antd 默认选中样式）。
- 上述作用于 `popupClassName` 作用域（面板 portal 到 body）。

## Data Contract
OptionCheck：`{ checked:boolean }`。
OptionCount：`{ count:number, mutedAtZero?:boolean=true }`。
DropdownFooter：
- `selectedCount: number`（当未显式传 left 时用于"已选 N 项"）。
- `left?: ReactNode`（覆盖默认文案）。
- `right?: ReactNode`（覆盖默认"清空"）。
- `onClear?: ()=>void`（默认右侧"清空"点击回调）。
- `clearText?: string`（默认 `'清空'`）。

## External Dependencies
- antd `Select`。勾选图标用内联 SVG（不引入 `@ant-design/icons`，减少依赖）。
- 清空/模式切换的实际数据处理在宿主。

## Implementation Constraints
- Portal：勾选框/选中底色写在 `popupClassName` 作用域内，值用 `var(--token, 字面兜底)`（fallback 保证脱离令牌容器时仍生效）。
- 关闭 antd 默认右侧状态勾选（`.ant-select-item-option-state{display:none}`），用 OptionCheck 取代。

## Demo-Only Properties
- 具体筛选项文案、计数含义（命中数/条数）、右侧"模式[任一/全部]"节点——均为示例用法。

## Migration Rules
- `cs-opt-chk / cs-opt-cnt / cs-dd-foot / cs-dd-link / cs-filter-pop` → `df-*` 前缀。
- 原页 `foot()/chk()` 两个内部函数抽成导出组件；其"额外左节点/右节点"参数保留。

## Boundary Conditions
- `selectedCount` 缺省且无 `left`：底栏左侧留空（不显示"已选 0 项"由宿主决定，默认显示 0）。
- `right` 传入时忽略 `onClear/clearText`。
