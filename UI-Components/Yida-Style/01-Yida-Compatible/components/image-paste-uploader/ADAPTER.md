# ImagePasteUploader — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| images | [{url\|previewUrl\|downloadUrl,name?}] | 是 | 已上传图示（归一化） |
| limit | number | 否 | 张数上限，默认 4（宿主从表单 ImageField schema 读取后传入） |
| readonly | boolean | 否 | 仅缩略图、无按钮/删除 |
| disabled | boolean | 否 | 禁用 |
| onPaste | (File[])=>void | 否 | 宿主上传并回填（组件已做超限判断） |
| onRemove | (index)=>void | 否 | 删除第 i 张 |
| onLimitReached | ()=>void | 否 | 达上限粘贴时宿主提示 |
| labelIdle/labelArmed/altPrefix/removeTitle | string | 否 | 文案覆盖，默认定稿值 |

## 输出 / 事件
- `onPaste(files)`（仅 `image/*`；`preventDefault`；未超限才回调）。
- `onRemove(index)`、`onLimitReached()`。

## External Dependencies（宿主必须提供，不焊进组件）
- **OSS 图片上传链**：`onPaste` 背后 签名→上传→回填 URL；**图片粘贴即完成、无进度百分比**。
- **数上限读取**：默认 4 来自子表 ImageField 的 schema 配置（懒加载），属宿主数据层。
- **`message` toast**：超限、上传失败的提示。
- **图示字段序列化**（JSON 串 ↔ 数组）、**dirty/fresh 草稿**：宿主维护。
- **antd `Image` / `Image.PreviewGroup`**：预览放大（`mask:false`、悬停无遮罩）。

## 宿主需负责
- 声明 design-tokens 的 `:root` 令牌块（本件用 `--brand/--danger/--r-ctrl/--r-small/--f-body/--h-ctrl`）。
- 与附件按钮保持 112 等宽、盒中点对齐。

## 已知坑（务必注意）
- **真人 Ctrl+V**：CDP 合成按键不会把系统剪贴板图片注入页面 `onPaste`，粘贴上传无法被自动化触发，验收需真人粘贴。
- **锚定盒恒等式**：`112 = 48 + 16 + 48`；改缩略图尺寸或间隙必须同步改盒宽，否则全屏列拉伸时盒中点≠按钮中点、错位。
- **armed 连贴**：粘贴完成后不退出 armed（可连续贴），复位仅靠失焦 / Esc——勿在 onPaste 里主动 disarm。
- 删除 X 与预览同区，X 需 `e.stopPropagation()` 否则误触预览。
