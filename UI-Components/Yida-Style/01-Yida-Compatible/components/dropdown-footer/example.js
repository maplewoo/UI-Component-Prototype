// DropdownFooter — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 配合 antd 多选 Select 的 optionRender/dropdownRender。勾选图标内联 SVG，不引外部图标库。
import React from 'react';
import { Select } from 'antd';

var dfScope = (cls) => (
  <style>{`
    .${cls} .ant-select-item-option{display:flex;align-items:center;}
    .${cls} .ant-select-item-option-state{display:none;}
    .${cls} .ant-select-item-option-selected{background:#e6f4ff !important;font-weight:600;}
    .${cls} .df-chk{width:14px;height:14px;border-radius:3px;border:1px solid #d9d9d9;background:#fff;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;}
    .${cls} .df-chk.on{background:#1677ff;border-color:#1677ff;}
    .${cls} .df-count{margin-left:auto;font-size:12px;color:rgba(0,0,0,0.45);font-variant-numeric:tabular-nums;}
  `}</style>
);

function OptionCheck(props) {
  return (
    <span className={'df-chk' + (props.checked ? ' on' : '')}>
      {props.checked ? (
        <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2"><path d="M2.5 6.5l2.5 2.5 4.5-5" /></svg>
      ) : null}
    </span>
  );
}

function OptionCount(props) {
  var n = Number(props.count) || 0;
  var zero = n === 0 && props.mutedAtZero !== false;
  return <span className="df-count" style={zero ? { color: 'rgba(0,0,0,0.25)' } : undefined}>{n}</span>;
}

function DropdownFooter(props) {
  var left = props.left != null ? props.left : ('已选 ' + (props.selectedCount || 0) + ' 项');
  var right = props.right != null ? props.right : (
    <span className="df-link" style={{ color: '#1677ff', cursor: 'pointer' }} onClick={props.onClear}>{props.clearText || '清空'}</span>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 10px', borderTop: '1px solid #f0f0f0', marginTop: 4, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
      <span>{left}</span>
      {right}
    </div>
  );
}

// —— Demo：多选筛选下拉（选项文案/计数为 mock）——
var FILTER_OPTIONS = [
  { label: '前围总成', value: 'front', count: 12 },
  { label: '侧围总成', value: 'side', count: 8 },
  { label: '后背门', value: 'tailgate', count: 0 },
];

function DropdownFooterDemo() {
  var st = React.useState(['side']);
  var val = st[0], setVal = st[1];
  var byVal = function (v) { var hit = null; FILTER_OPTIONS.forEach(function (o) { if (o.value === v) { hit = o; } }); return hit; };
  return (
    <div style={{ maxWidth: 260 }}>
      {dfScope('df-pop')}
      <Select
        mode="multiple"
        allowClear
        maxTagCount="responsive"
        style={{ width: '100%' }}
        placeholder="可多选"
        popupClassName="df-pop"
        value={val}
        onChange={setVal}
        options={FILTER_OPTIONS}
        optionRender={function (option) {
          var v = option.value;
          var o = byVal(v) || {};
          return (<span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}><OptionCheck checked={val.indexOf(v) >= 0} />{option.label}<OptionCount count={o.count} /></span>);
        }}
        dropdownRender={function (menu) {
          return (<div>{menu}<DropdownFooter selectedCount={val.length} onClear={function () { setVal([]); }} /></div>);
        }}
      />
    </div>
  );
}

export { OptionCheck, OptionCount, DropdownFooter };
export default DropdownFooterDemo;
