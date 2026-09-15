// StatusFilterSelect — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 多选筛选下拉：勾选框 + 状态色点 + 文字，已选灰底 tag，底部计数/清空。复用 dropdown-footer(C8) 面板元素。
// 颜色引用 design-tokens var(--token,#兜底)。勾/叉内联 SVG，不引 @ant-design/icons。
import React from 'react';
import { Select } from 'antd';

function sfsScope(cls) {
  return (
    <style>{`
      .${cls} .ant-select-item-option{display:flex;align-items:center;}
      .${cls} .ant-select-item-option-state{display:none;}
      .${cls} .ant-select-item-option-selected{background:var(--brand-bg,#e6f4ff) !important;font-weight:var(--fw-strong,600);}
      .${cls} .sfs-chk{width:14px;height:14px;border-radius:var(--r-small,4px);border:1px solid var(--line-strong,#d9d9d9);background:#fff;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;}
      .${cls} .sfs-chk.on{background:var(--brand,#1677ff);border-color:var(--brand,#1677ff);}
      .${cls} .sfs-dot{width:8px;height:8px;border-radius:2px;flex:0 0 auto;}
      .${cls} .sfs-cnt{margin-left:auto;font-size:var(--f-aux,12px);color:var(--t3,rgba(0,0,0,.45));font-variant-numeric:tabular-nums;}
      .${cls} .sfs-tag{display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 6px;border-radius:var(--r-small,4px);background:var(--line,#f0f0f0);color:var(--t1,rgba(0,0,0,.88));font-size:var(--f-aux,12px);white-space:nowrap;}
      .${cls} .sfs-tag i{font-style:normal;color:var(--t4,rgba(0,0,0,.25));cursor:pointer;}
      .${cls} .sfs-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;border-top:1px solid var(--line,#f0f0f0);margin-top:4px;font-size:var(--f-aux,12px);color:var(--t3,rgba(0,0,0,.45));}
      .${cls} .sfs-link{color:var(--brand,#1677ff);cursor:pointer;}
    `}</style>
  );
}
function Chk(props) {
  return <span className={'sfs-chk' + (props.checked ? ' on' : '')}>{props.checked ? <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2"><path d="M2.5 6.5l2.5 2.5 4.5-5" /></svg> : null}</span>;
}

function StatusFilterSelect(props) {
  var cls = props.popupClassName || 'sfs-pop';
  var value = props.value || [];
  var options = props.options || [];
  var byVal = function (v) { var h = null; options.forEach(function (o) { if (o.value === v) { h = o; } }); return h || {}; };
  var countOf = props.countFor || function (v) { return (byVal(v).count || 0); };

  return (
    <React.Fragment>
      {sfsScope(cls)}
      <Select
        mode="multiple"
        allowClear
        showSearch={false}
        maxTagCount={props.maxTagCount || 'responsive'}
        className="sfs-select"
        popupClassName={cls}
        style={{ width: props.width || 190 }}
        placeholder={props.placeholder || '可多选'}
        value={value}
        onChange={props.onChange}
        options={options.map(function (o) { return { label: o.label, value: o.value }; })}
        optionRender={function (option) {
          var v = option.value; var o = byVal(v);
          return (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
              <Chk checked={value.indexOf(v) >= 0} />
              <i className="sfs-dot" style={{ background: o.color || 'var(--j-pending-dot,#b0bec5)' }} />
              <span style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{option.label}</span>
              {props.showCount ? <span className="sfs-cnt" style={((countOf(v) || 0) === 0) ? { color: 'var(--t4,rgba(0,0,0,.25))' } : undefined}>{countOf(v) || 0}</span> : null}
            </span>
          );
        }}
        tagRender={function (tp) {
          return <span className="sfs-tag">{tp.label}<i onClick={tp.onClose}>×</i></span>;
        }}
        dropdownRender={function (menu) {
          return (<div>{menu}<div className="sfs-foot"><span>{'已选 ' + value.length + ' 项'}</span><span className="sfs-link" onClick={function () { if (props.onClearAll) { props.onClearAll(); } else if (props.onChange) { props.onChange([]); } }}>{props.clearText || '清空'}</span></div></div>);
        }}
      />
    </React.Fragment>
  );
}

// —— Demo：mock 判定 5 态；行级命中数由宿主（此处写死）——
function StatusFilterSelectDemo() {
  var st = React.useState(['通过', '不通过']);
  var v = st[0], setV = st[1];
  var OPTS = [
    { label: '待定', value: '待定', color: 'var(--j-pending-dot,#b0bec5)', count: 5 },
    { label: '通过', value: '通过', color: 'var(--j-pass,#19c355)', count: 34 },
    { label: '带条件通过', value: '带条件通过', color: 'var(--j-cond,#ffb300)', count: 2 },
    { label: '不通过', value: '不通过', color: 'var(--j-fail,#f44336)', count: 1 },
    { label: '不适用', value: '不适用', color: 'var(--j-na,#9e9e9e)', count: 5 },
  ];
  return (
    <div style={{ width: 210 }}>
      <span style={{ display: 'inline-block', fontSize: 14, color: 'rgba(0,0,0,.65)', marginBottom: 6 }}>自查状态</span><br />
      <StatusFilterSelect options={OPTS} value={v} onChange={setV} showCount />
    </div>
  );
}

export { StatusFilterSelect };
export default StatusFilterSelectDemo;
