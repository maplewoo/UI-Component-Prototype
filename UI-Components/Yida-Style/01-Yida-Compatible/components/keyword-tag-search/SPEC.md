# KeywordTagSearch — SPEC

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
- 标签/面板观感同 `dropdown-footer`：勾选框 14px、选中 `#1677ff`；命中数右靠、等宽、0 淡显。
- 提示行：`按回车添加「typed」` 文案（`typedAddLabel(typed)` 可配），命中数右靠。
- 标签名超长省略号（`.kt-name` ellipsis）。
- 面板元素作用在 `popupClassName` 作用域，颜色写字面（portal）。

## Data Contract
props：
- `value: string[]`（受控）
- `onChange(words: string[])`
- `history?: string[]`（宿主提供、去重、截断，如最近 5）
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
