# AttachmentChip — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| files | [{name?,url,uid?}] | 否 | 归一化附件；length≥1 即有附件 |
| uploading | boolean | 否 | 上传中态 |
| percent | number | 否 | 0–100，仅 uploading 时显 |
| fresh | boolean | 否 | true→已上传(绿) / false→当前附件(白) |
| readonly | boolean | 否 | 只读预览、无删除 |
| disabled | boolean | 否 | 禁用 |
| onOpen | (file)=>void | 否 | 预览，缺省 window.open(url) |
| onRemove | (file)=>void | 否 | 点删除 X（宿主弹确认+删） |
| beforeUpload / customRequest / accept | - | 否 | 透传 antd Upload |

## 输出 / 事件
- `onOpen(file)`、`onRemove(file)`、上传经 `customRequest`。

## External Dependencies（宿主必须提供，不焊进组件）
- **OSS 上传链**：`customRequest` 背后 签名→XHR 上传→上传回调，用真实百分比驱动 `uploading/percent`。
- **附件预览/下载 URL** 与 `window.open`（页面能力）。
- **删除确认**：`Modal.confirm`（危险主按钮红底白字，§5"删除附件"）+ 删除后回写。
- **上传前校验**：类型（示例 .pptx/.pdf）、单文件大小上限、数量上限——上限原从表单 schema 读，属宿主数据层；不合规 `message.error` 并返回 `Upload.LIST_IGNORE`。
- **dirty/fresh 判定**：区分"本次会话新写入未保存(绿·已上传)" vs "服务器已存在(白·当前附件)"，由宿主草稿态传入。
- **Toast/message**：错误与提示。

## 宿主需负责
- 声明 design-tokens 的 `:root` 令牌块（本件用 `--brand/--brand-hover/--j-pass/--danger/--h-ctrl/--r-ctrl`）。
- 附件字段序列化/反序列化（组件只吃归一化 `files`）。
- 与图片上传按钮（若同页提取）保持 112 等宽对齐。
