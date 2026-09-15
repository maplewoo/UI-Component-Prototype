# StatusFilterSelect — SPEC

## 0 · 令牌取值约定（Token Defaults）
取色/尺寸/字号/圆角/间距引用 `../design-tokens.md`，实现写成 `var(--token, 兜底字面值)`、不裸写死。有覆盖入口（props）标 `Default 按令牌`；无覆盖入口的结构性规则标 `MANDATORY`。面板子件令牌同 `dropdown-footer`。

## Purpose
多选筛选下拉：勾选框 + 状态色点 + 选项；已选渲染灰底 tag；底部计数/清空。给"状态类枚举"（如判定 5 态）做多选过滤。

## Structure
```
<Select mode="multiple" popupClassName
  options=[{label,value,color?}]
  optionRender = <span><OptionCheck checked/><i class=sfs-dot style=bg:color/><span>{label}</span>[<OptionCount/>]</span>
  tagRender    = <span class=sfs-tag>{label}<i>×</i></span>
  dropdownRender = {menu + DropdownFooter(已选 N 项 / 清空)} />
```

## States
- 收起：已选 tag（灰底 `--line`、可删 ×）；无选 placeholder。
- 展开：每项勾选框（选中蓝底白勾）+ 状态色点 + 文字；选中项底 `--brand-bg`；hover 高亮。
- 底部：`已选 N 项` + `清空`（0 项时清空可禁用或隐藏，宿主）。
- 可选右靠命中计数（`showCount`）：0 淡显 `--t4`。

## Interaction Rules
- 受控：`value: string[]` + `onChange(arr)`（多选增删 / × 删单个 / 清空置 []）。
- `allowClear`：输入框右侧整体清除。
- 色点/计数纯视觉，不改变选中逻辑。
- 组件不请求数据、不做过滤（见 External）。

## Visual Rules
- 下拉宽 190、`maxTagCount:'responsive'`、`showSearch:false`（**MANDATORY** §4"下拉等宽 190"，可经 `width` 覆盖则属 `Default 按令牌`）。
- 状态色点：`8×8`、圆角 2px、`flex:0 0 auto`、取选项 `color`（缺省 `--j-pending-dot`#b0bec5）（**MANDATORY** §4/§2 色点单一来源）。
- 勾选框：`14×14`、圆角 `--r-small`、未选 `--line-strong`、选中 `--brand` 白勾（同 C8，**MANDATORY**）。
- 已选 tag：`height:22; padding:0 6; border-radius:4(--r-small); background:var(--line,#f0f0f0); color:var(--t1); font-size:12`；× 为 `--t4`、cursor pointer（**MANDATORY** 灰底 tag，非彩色——颜色在色点）。
- 选中项底 `--brand-bg` + `--fw-strong`(600)（**MANDATORY**）。
- 底部栏、计数样式同 `dropdown-footer`（`--line` 上边框、`--t3`、右靠等宽数字）。
- 面板 portal：全部写在 `popupClassName` 作用域、颜色字面/`var()`。

## Data Contract
props：
- `value: string[]`、`onChange(arr)`（受控）
- `options: [{ label, value, color?, count? }]`（`color`＝状态色点色，缺省灰点）
- `placeholder?`（默认"可多选"）
- `width?`（**Default 按令牌=190**）
- `showCount?: boolean`（右靠命中数，需 options[].count 或 `countFor`）
- `countFor?: (value)=>number`（与 options[].count 二选一）
- `clearText?` / `onClearAll?`（底部清空，默认 `onChange([])`）
- `popupClassName?`（默认 `sfs-pop`）
- 透传 `allowClear`、`maxTagCount`

## External Dependencies
- antd `Select`（multiple）。
- **命中计数 `countFor`/`options[].count`**：当前结果集里命中该值的行数，宿主算。
- **过滤应用**：把 `value` 作用到表格由宿主做；本件只维护选择。
- 复用件 `dropdown-footer`(C8)。

## Implementation Constraints
- 关原生右上角状态勾（`.ant-select-item-option-state{display:none}`），用 OptionCheck 取代。
- 色点颜色一律 `var(--j-*, 字面)`，与判定 pill/进度条/徽标同源。

## Demo-Only Properties
- 具体状态枚举与色（示例判定 5 态）、示例 count、placeholder、`width`、是否显计数。

## Migration Rules
- 原页 `renderFilterBar` 内 自查/复查 `Select`（`cs-opt-dot`+`chk`+`judgeTagRender`(cs-jtag)+`cs-dd-foot` foot）→ 抽成 `status-filter-select`。
- `judgeFilter/reviewFilter` state、`JUDGE_DOT` 映射、行级计数上移宿主。

## Boundary Conditions
- `options[].color` 缺省：灰点兜底（不隐藏色点位）。
- `showCount` 开但无 count 数据：显 0 淡显。
- 值含 options 里没有的项：tag 仍显 label=值、无色点。
