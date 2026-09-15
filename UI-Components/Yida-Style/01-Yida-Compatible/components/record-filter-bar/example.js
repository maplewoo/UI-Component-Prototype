// RecordFilterBar — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// Pattern：组合 dropdown-footer(C8) + keyword-tag-search(C9)。此处内联两子件的最小版以自包含；
// 真实页复用 ../dropdown-footer / ../keyword-tag-search（单一来源）。行级计数/过滤/批量均宿主(External)。
import React, { useState } from 'react';
import { Select, Button } from 'antd';

var rfbStyles = `
  .rfb-bar .rfb-row{display:grid;column-gap:24px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line,#f0f0f0);}
  .rfb-bar .rfb-item{display:flex;align-items:center;min-width:max-content;}
  .rfb-bar .rfb-label{font-size:var(--f-body,14px);font-weight:500;color:var(--t2,rgba(0,0,0,.65));white-space:nowrap;}
  .rfb-bar .rfb-clear{justify-self:end;margin-right:32px;}
  .rfb-bar .rfb-actions{display:flex;align-items:center;gap:12px;padding:0 0 12px;border-bottom:1px solid var(--line,#f0f0f0);}
  .rfb-bar .rfb-cnt{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:rgba(255,255,255,.28);color:#fff;font-size:var(--f-aux,12px);font-weight:500;margin-left:6px;}
  /* panel (portal) scope, per dropdown-footer/keyword-tag-search */
  .rfb-pop .ant-select-item-option{display:flex;align-items:center;}
  .rfb-pop .ant-select-item-option-state{display:none;}
  .rfb-pop .ant-select-item-option-selected{background:var(--brand-bg,#e6f4ff) !important;font-weight:var(--fw-strong,600);}
  .rfb-pop .rfb-chk{width:14px;height:14px;border-radius:var(--r-small,4px);border:1px solid var(--line-strong,#d9d9d9);background:#fff;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;}
  .rfb-pop .rfb-chk.on{background:var(--brand,#1677ff);border-color:var(--brand,#1677ff);}
  .rfb-pop .rfb-dot{width:8px;height:8px;border-radius:2px;flex:0 0 auto;}
  .rfb-pop .rfb-count{margin-left:auto;font-size:var(--f-aux,12px);color:var(--t3,rgba(0,0,0,.45));font-variant-numeric:tabular-nums;}
  .rfb-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;border-top:1px solid var(--line,#f0f0f0);margin-top:4px;font-size:var(--f-aux,12px);color:var(--t3,rgba(0,0,0,.45));}
  .rfb-link{color:var(--brand,#1677ff);cursor:pointer;}
`;

function Chk(props) {
  return <span className={'rfb-chk' + (props.checked ? ' on' : '')}>{props.checked ? <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2"><path d="M2.5 6.5l2.5 2.5 4.5-5" /></svg> : null}</span>;
}
function Footer(props) {
  return (<div className="rfb-foot"><span>{props.left}</span>{props.right}</div>);
}

function MultiFilter(props) {
  var f = props.f;
  var val = f.value || [];
  var popup = f.popupClassName || 'rfb-pop';
  return (
    <Select
      mode="multiple" allowClear showSearch={false} maxTagCount="responsive"
      className="rfb-select" popupClassName={popup} placeholder={f.placeholder || '可多选'}
      style={{ width: props.selectWidth || 190, minWidth: props.selectWidth || 190, marginLeft: 6 }}
      value={val} onChange={f.onChange} options={f.options} tagRender={f.tagRender}
      optionRender={function (option) {
        var o = option.data || {}; var selected = val.indexOf(option.value) >= 0;
        return (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
            <Chk checked={selected} />
            {f.showDot && o.color ? <i className="rfb-dot" style={{ background: o.color }} /> : null}
            <span style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{option.label}</span>
            {f.showCount ? <span className="rfb-count" style={((o.count || 0) === 0) ? { color: 'var(--t4,rgba(0,0,0,.25))' } : undefined}>{o.count || 0}</span> : null}
          </span>
        );
      }}
      dropdownRender={function (menu) {
        return (<div>{menu}<Footer left={'已选 ' + val.length + ' 项'} right={<span className="rfb-link" onClick={function () { f.onChange([]); }}>清空</span>} /></div>);
      }}
    />
  );
}

function KeywordFilter(props) {
  var f = props.f;
  var val = f.value || [];
  var popup = f.popupClassName || 'rfb-pop';
  var sState = useState(''); var typed = sState[0], setTyped = sState[1];
  var countFor = f.countFor || function () { return 0; };
  var options = (f.history || []).map(function (w) { return { label: w, value: w }; });
  return (
    <Select
      mode="tags" allowClear maxTagCount="responsive"
      className="rfb-select" popupClassName={popup} placeholder={f.placeholder || '按回车添加'}
      style={{ width: props.selectWidth || 190, minWidth: props.selectWidth || 190, marginLeft: 6 }}
      value={val} onChange={f.onChange} onSearch={setTyped} onBlur={function () { setTyped(''); }} options={options}
      optionRender={function (option) {
        var w = option.value; var n = countFor(w); var selected = val.indexOf(w) >= 0;
        return (<span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}><Chk checked={selected} /><i className="rfb-dot" style={{ background: 'var(--line-strong,#d9d9d9)' }} /><span style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w}</span><span className="rfb-count" style={n === 0 ? { color: 'var(--t4,rgba(0,0,0,.25))' } : undefined}>{n}</span></span>);
      }}
      dropdownRender={function (menu) {
        var t = String(typed || '').trim();
        return (<div>
          {t && val.indexOf(t) < 0 ? (<div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 32, padding: '0 10px', fontSize: 'var(--f-body,14px)' }}><span style={{ flex: '1 1 auto', color: 'var(--t2,rgba(0,0,0,.65))' }}>{'按回车添加「' + t + '」'}</span><span className="rfb-count">{countFor(t)}</span></div>) : null}
          {menu}
          <Footer left={<span>{'模式[' + (f.matchMode === 'all' ? '全部' : '任一') + ']'}</span>} right={<span className="rfb-link" onClick={function () { if (f.onMatchModeChange) { f.onMatchModeChange(f.matchMode === 'all' ? 'any' : 'all'); } }}>{'改为[' + (f.matchMode === 'all' ? '任一' : '全部') + ']'}</span>} />
        </div>);
      }}
    />
  );
}

function RecordFilterBar(props) {
  var filters = props.filters || [];
  var anyActive = filters.some(function (f) { return (f.value || []).length > 0; });
  var clearDisabled = props.clearDisabled != null ? props.clearDisabled : !anyActive;
  var renderOne = function (f) { return f.type === 'keyword' ? <KeywordFilter f={f} selectWidth={props.selectWidth} /> : <MultiFilter f={f} selectWidth={props.selectWidth} />; };
  return (
    <div className="rfb-bar">
      <style>{rfbStyles}</style>
      <div className="rfb-row" style={{ gridTemplateColumns: 'repeat(' + filters.length + ', max-content) 1fr' }}>
        {filters.map(function (f) { return (<div className="rfb-item" key={f.key}><span className="rfb-label">{f.label + '：'}</span>{renderOne(f)}</div>); })}
        <div className="rfb-clear"><Button type="primary" disabled={clearDisabled} onClick={props.onClearAll}>清除筛选</Button></div>
      </div>
      {props.batch ? (<div className="rfb-actions"><Button type="primary" disabled={props.batch.disabled || (props.batch.count || 0) === 0} onClick={props.batch.onClick}>{props.batch.label}<span className="rfb-cnt">{props.batch.count || 0}</span></Button></div>) : null}
    </div>
  );
}

// —— Demo：mock 归属/状态/关键词筛选；行级 count 与过滤由宿主（此处写死示例）——
function RecordFilterBarDemo() {
  var st = useState({ owner: [], self: [], review: [], kw: [] });
  var v = st[0], setV = st[1];
  var mm = useState('any'); var mode = mm[0], setMode = mm[1];
  var sel = useState(5); var selCount = sel[0];
  function set(k) { return function (arr) { setV(Object.assign({}, v, { [k]: arr })); }; }
  var filters = [
    { key: 'owner', label: '归属', type: 'multi', value: v.owner, onChange: set('owner'), showCount: true, options: [{ label: '法规', value: '法规', count: 6 }, { label: '标准', value: '标准', count: 3 }, { label: '材料', value: '材料', count: 2 }, { label: '装配', value: '装配', count: 0 }] },
    { key: 'self', label: '自查状态', type: 'multi', value: v.self, onChange: set('self'), showDot: true, options: [{ label: '待定', value: '待定', color: 'var(--j-pending-dot,#b0bec5)' }, { label: '通过', value: '通过', color: 'var(--j-pass,#19c355)' }, { label: '不通过', value: '不通过', color: 'var(--j-fail,#f44336)' }] },
    { key: 'review', label: '复查状态', type: 'multi', value: v.review, onChange: set('review'), showDot: true, options: [{ label: '待定', value: '待定', color: 'var(--j-pending-dot,#b0bec5)' }, { label: '通过', value: '通过', color: 'var(--j-pass,#19c355)' }] },
    { key: 'kw', label: '检查内容关键词', type: 'keyword', value: v.kw, onChange: set('kw'), history: ['玻璃', '间隙', '密封条'], countFor: function (w) { return { '玻璃': 3, '间隙': 1, '密封条': 1 }[w] || 0; }, matchMode: mode, onMatchModeChange: setMode },
  ];
  return <RecordFilterBar filters={filters} onClearAll={function () { setV({ owner: [], self: [], review: [], kw: [] }); }} batch={{ label: '批量设为不适用', count: selCount, onClick: function () { } }} />;
}

export { RecordFilterBar };
export default RecordFilterBarDemo;
