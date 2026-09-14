# KeywordTagSearch — SPEC

## 0 · 令牌取值约定（Token Defaults）
本组件取色/尺寸/字号/字重/行高/圆角/阴影/层级一律引用 `../design-tokens.md` 令牌，实现写成 `var(--token, 兜底字面值)`、不裸写死。凡令牌规定的值：组件暴露了覆盖入口（props 中有对应项）的一律标 `Default 按令牌`（默认值＝令牌值，可覆盖但页面别随意改）；仅无任何覆盖入口（没有选择）的结构性规则才标 `MANDATORY`。宿主页面须先声明 design-tokens 的 :root 令牌块。

## Purpose
标签式关键词筛选：回车加词 + 历史下拉（带命中数/勾选）+ 任一/全部匹配模式切换。

## Structure
```
<Select mode="tags" optionRender={OptionCheck + name + OptionCount}
  dropdownRender={ [typed-add hint] + menu + DropdownFooter(mode) } />
```
（OptionCheck / OptionCount / DropdownFooter 与 `dropdown-footer` 组件同实现。）

## States
- 未输入：面板列历史词（每项勾选框 + 命中计数）。
- 输入且非历史项：面板顶部出现提示行"按回车添加「typed」"+ 该词命中计数。
- 已选：输入框内以标签展示；面板内该项勾选。
- 模式：底栏左"模式[任一]/[全部]"，右"改为[全部]/[任一]"链接切换。

## Interaction Rules
- 回车：把当前输入加为标签（antd tags 原生）→ `onChange(value)`，同时宿主可把它并入 history。
- 点历史项：切换勾选（增删标签）。
- 点"改为[...]"：`onMatchModeChange('any'|'all')`。
- 清除单个标签：原生标签上的 ×。
- 组件不请求数据；命中计数由 `countFor(word)` 提供。

## Visual Rules
- 面板（`popupClassName` 作用域）：圆角 6（`--r-ctrl`）、阴影 `--sh-pop`、行高 32（`--h-ctrl-lg`）、左右内距 10px（MANDATORY）。
- 勾选框/选中项/底栏观感同 `dropdown-footer`：勾选框 14x14 圆角 `--r-small`（14/3 为定稿）、未选边框 `--line-strong`、选中 `--brand`；选中项底 `--brand-bg` + `--fw-strong`(600)；命中数右靠 12（`--f-aux`）`--t3`、0 淡显 `--t4`（MANDATORY）。
- 非状态项历史行前灰点 8x8 圆角 2，颜色 `--line-strong`(#d9d9d9)（MANDATORY，属 `--j-pending-dot` 系非状态指示）。
- 提示行（回车添加）：行高 32（`--h-ctrl-lg`）、左右内距 10、字号 `--f-body`(14px)、文案色 `--t2`，命中数右靠同 OptionCount 规则（Default 按令牌；覆盖入口：`placeholder`）。
- 历史词最多最近 **5** 条（MANDATORY 业务规则，design-tokens §4）；超 5 条由宿主截断。
- 命中数只显示数字，不显示文字标签（MANDATORY）。
- 标签名超长省略号（`.kt-name` ellipsis）。
- 面板元素作用在 `popupClassName` 作用域，颜色写 `var(--token, 字面)`（portal）。

## Data Contract
props：
- `value: string[]`（受控）
- `onChange(words: string[])`
- `history?: string[]`（宿主提供、去重、截断，**最多最近 5 条 MANDATORY**）
- `countFor?: (word)=>number`（命中计数）
- `matchMode?: 'any'|'all'`
- `onMatchModeChange?: (m)=>void`（提供才显示模式切换底栏）
- `placeholder?: string`（默认"按回车添加"）
- `popupClassName?: string`（默认 `kt-pop`）
- `maxTagCount?: number|'responsive'`（默认 responsive）

## External Dependencies
- antd `Select`。
- **持久化（localStorage 等）不内置**：history 的存取由宿主在 `onChange`/外部完成，只把 `history` 数组喂进来（外部能力，见 ADAPTER）。

## Implementation Constraints
- 与 `dropdown-footer` 共用面板元素实现；资产包为独立性内联最小版（真实页可复用同一套 helper）。
- tags 模式默认按 label 子串过滤 history，不额外写 filterOption（除非要改匹配语义）。

## Demo-Only Properties
- 示例关键词、命中计数语义（当前筛选结果的行数）、`mode` 文案、宽度。

## Migration Rules
- `cs-kw-hist / cs-kw-name / contentFilter / pushKwHistory / localStorage('cs-kw-history')` → 组件仅保留 UI；history 存取移到宿主。
- `kwMatchMode` 上移为受控 `matchMode`。

## Boundary Conditions
- 输入命中已存在标签：提示行不出现（`indexOf(typed)<0` 才显）。
- `history` 为空：仅显示提示行（有输入时）或空态。
