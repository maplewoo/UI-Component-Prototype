// ImagePasteUploader — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 锚定盒 + idle/armed 上传按钮 + 缩略图(删除/预览)。上传/预览/删除/超限均为宿主能力(External Dependency)。
// 颜色/尺寸引用 design-tokens 令牌 var(--token,#兜底)。删除 X 用内联 SVG，不引 @ant-design/icons。
import React, { useState } from 'react';
import { Image } from 'antd';

var ipStyles = `
  .ip-cell{width:112px;margin:0 auto;}
  .ip-up{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;width:112px;height:var(--h-ctrl,28px);padding:0;border-radius:var(--r-ctrl,6px);font-size:var(--f-body,14px);font-weight:400;cursor:pointer;white-space:nowrap;overflow:hidden;border:1px solid var(--brand,#1677ff);background:var(--brand,#1677ff);color:#fff;font-family:inherit;}
  .ip-up:hover{background:#4096ff;border-color:#4096ff;}
  .ip-up.armed{background:#fff;color:var(--brand,#1677ff);}
  .ip-up.armed:hover{background:#fff;}
  .ip-lamp{display:inline-block;width:6px;height:6px;border-radius:50%;background:currentColor;animation:ip-blink 1.1s ease-in-out infinite;}
  @keyframes ip-blink{0%,100%{opacity:1;}50%{opacity:.22;}}
  .ip-thumbs{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:6px;}
  .ip-thumb-wrap{position:relative;display:inline-block;}
  .ip-thumb-x{position:absolute;top:2px;right:2px;width:16px;height:16px;border-radius:var(--r-small,4px);background:var(--danger,#f44336);border:1px solid #e8e8e8;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity .18s ease;z-index:2;line-height:0;}
  .ip-thumb-wrap:hover .ip-thumb-x{opacity:1;}
`;

function DelIcon() {
  return <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 3l6 6M9 3l-6 6" /></svg>;
}
function urlOf(f) { return f.previewUrl || f.url || f.downloadUrl || ''; }
function normSrc(src) { return src && /^\//.test(src) ? window.location.origin + src : (src || ''); }

function ImagePasteUploader(props) {
  var state = useState(false);
  var armed = state[0], setArmed = state[1];
  var images = props.images || [];
  var limit = props.limit == null ? 4 : props.limit;
  var readOnly = props.readonly;
  var disabled = props.disabled;

  function arm() { if (!disabled) { setArmed(true); } }
  function disarm() { setArmed(false); }
  function handlePaste(e) {
    var files = [];
    var items = e.clipboardData && e.clipboardData.items;
    if (items) {
      for (var i = 0; i < items.length; i += 1) {
        if (items[i].type && items[i].type.indexOf('image/') === 0) { var f = items[i].getAsFile(); if (f) { files.push(f); } }
      }
    }
    if (!files.length && e.clipboardData && e.clipboardData.files && e.clipboardData.files.length) { files = Array.prototype.slice.call(e.clipboardData.files); }
    if (!files.length) { return; }
    e.preventDefault();
    if (images.length >= limit) { if (props.onLimitReached) { props.onLimitReached(); } return; }
    if (props.onPaste) { props.onPaste(files); }
  }

  var urls = images.map(function (f) { return normSrc(urlOf(f)); }).filter(Boolean);

  return (
    <div className="ip-cell">
      <style>{ipStyles}</style>
      {!readOnly && (armed ? (
        <span className="ip-up armed" tabIndex={0} onClick={function (e) { e.stopPropagation(); }} onPaste={handlePaste} onBlur={disarm} onKeyDown={function (e) { if (e.key === 'Escape') { disarm(); } }}>
          <span className="ip-lamp" />{props.labelArmed || 'Ctrl+V'}
        </span>
      ) : (
        <span className="ip-up" role="button" tabIndex={0} onClick={function (e) { e.stopPropagation(); arm(); }} onKeyDown={function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); arm(); } }}>
          {props.labelIdle || '图片上传'}
        </span>
      ))}
      <div className="ip-thumbs">
        <Image.PreviewGroup items={urls}>
          {images.map(function (f, i) {
            return (
              <span key={i} className="ip-thumb-wrap">
                <Image src={normSrc(urlOf(f))} alt={(props.altPrefix || '图示') + (i + 1)} width={48} height={48} preview={{ mask: false }} style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #e8e8e8', cursor: 'pointer' }} />
                {!readOnly && !disabled ? <span className="ip-thumb-x" title={props.removeTitle || '删除图片'} onClick={function (e) { e.stopPropagation(); if (props.onRemove) { props.onRemove(i); } }}><DelIcon /></span> : null}
              </span>
            );
          })}
        </Image.PreviewGroup>
      </div>
    </div>
  );
}

// —— Demo：Mock 上传=把本地 File 转 objectURL 直接追加；真实页接宿主 OSS ——
function ImagePasteUploaderDemo() {
  var st = useState([]);
  var imgs = st[0], setImgs = st[1];
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <style>{ipStyles}</style>
      <ImagePasteUploader
        images={imgs}
        limit={4}
        onPaste={function (files) {
          var next = files.map(function (f) { return { name: f.name, url: URL.createObjectURL(f) }; });
          setImgs(imgs.concat(next).slice(0, 4));
        }}
        onRemove={function (i) { setImgs(imgs.filter(function (_, k) { return k !== i; })); }}
        onLimitReached={function () { alert('图示最多上传 4 张'); }}
      />
      <ImagePasteUploader readonly images={[{ url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="%23dfe7ef"/></svg>' }]} />
    </div>
  );
}

export { ImagePasteUploader };
export default ImagePasteUploaderDemo;
