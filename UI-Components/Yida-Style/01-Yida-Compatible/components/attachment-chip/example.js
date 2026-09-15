// AttachmentChip — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 颜色/尺寸引用 design-tokens 令牌 var(--token,#兜底)。上传/预览/删除/校验均为宿主能力（External Dependency）。
// 示例内用 Mock：customRequest 模拟进度、onOpen 用 window.open、onRemove 由宿主弹确认——此处仅演示回调，不接真接口。
import React from 'react';
import { Upload } from 'antd';

var attStyles = `
  .att-chip{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;width:112px;height:var(--h-ctrl,28px);padding:0;border-radius:var(--r-ctrl,6px);font-size:14px;font-weight:400;cursor:pointer;white-space:nowrap;overflow:hidden;border:1px solid var(--brand,#1677ff);background:var(--brand,#1677ff);color:#fff;font-family:inherit;}
  .att-chip.empty:hover{background:#4096ff;border-color:#4096ff;}
  .att-chip.server{background:#fff;color:var(--brand,#1677ff);}
  .att-chip.uploaded{background:var(--j-pass,#19c355);border-color:var(--j-pass,#19c355);color:#fff;}
  .att-chip .ac-fill{position:absolute;left:0;top:0;bottom:0;background:var(--brand-hover,#69b1ff);}
  .att-chip .ac-txt{position:relative;display:inline-flex;align-items:center;gap:6px;transition:transform .18s cubic-bezier(0.4,0,0.2,1);}
  .att-chip.delable:hover .ac-txt{transform:translateX(-14px);}
  .att-chip .ac-del{position:absolute;top:0;right:-28px;width:28px;height:100%;background:var(--danger,#f44336);color:#fff;display:flex;align-items:center;justify-content:center;border-radius:0 5px 5px 0;transition:right .18s cubic-bezier(0.4,0,0.2,1);cursor:pointer;}
  .att-chip:hover .ac-del{right:0;}
  .att-chip:disabled{cursor:not-allowed;opacity:.6;}
`;

function DelIcon() {
  return <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 3l6 6M9 3l-6 6" /></svg>;
}

function AttachmentChip(props) {
  var onOpen = props.onOpen || function (f) { if (f && f.url) { try { window.open(f.url, '_blank'); } catch (e) {} } };
  var uploading = props.uploading;
  var pct = Math.max(0, Math.min(100, Number(props.percent) || 0));
  var hasFile = (props.files || []).length >= 1;
  var file = (props.files || [])[0];

  return (
    <span className="att-wrap">
      <style>{attStyles}</style>
      {uploading ? (
        <span className="att-chip uploading"><i className="ac-fill" style={{ width: pct + '%' }} /><span className="ac-txt">{pct}%</span></span>
      ) : hasFile ? (
        <button type="button"
          className={'att-chip delable' + (props.fresh ? ' uploaded' : ' server')}
          onClick={function () { onOpen(file); }}>
          <span className="ac-txt">{props.fresh ? '已上传' : '当前附件'}</span>
          {!props.readonly ? <span className="ac-del" title="删除附件" onClick={function (e) { e.stopPropagation(); if (props.onRemove) { props.onRemove(file); } }}><DelIcon /></span> : null}
        </button>
      ) : (
        <Upload beforeUpload={props.beforeUpload} customRequest={props.customRequest} accept={props.accept} showUploadList={false} disabled={props.disabled}>
          <button className="att-chip empty" type="button" disabled={props.disabled}><span className="ac-txt">上传附件</span></button>
        </Upload>
      )}
    </span>
  );
}

// —— Demo：Mock 展示五态。真实页应接宿主 OSS 上传/预览/删除 ——
function AttachmentChipDemo() {
  var MockFile = [{ name: '示例.pdf', url: 'https://example.invalid/示例.pdf', uid: 'mock-1' }];
  function mockUpload(options) {
    var p = 0; var t = setInterval(function () { p += 20; options.onProgress && options.onProgress({ percent: p }); if (p >= 100) { clearInterval(t); options.onSuccess && options.onSuccess({}, {}); } }, 300);
  }
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <style>{attStyles}</style>
      <AttachmentChip beforeUpload={function () { return false; }} customRequest={mockUpload} />
      <AttachmentChip uploading percent={48} />
      <AttachmentChip files={MockFile} fresh onRemove={function () { alert('宿主弹 Modal.confirm 后删除'); }} />
      <AttachmentChip files={MockFile} onRemove={function () { alert('宿主弹 Modal.confirm 后删除'); }} />
      <AttachmentChip files={MockFile} readonly />
    </div>
  );
}

export { AttachmentChip };
export default AttachmentChipDemo;
