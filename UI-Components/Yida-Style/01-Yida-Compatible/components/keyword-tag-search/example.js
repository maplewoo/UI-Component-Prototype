// KeywordTagSearch — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 基于 antd Select（tags 模式）。面板元素与 dropdown-footer 同源，此处内联最小版保持独立。
// history 与命中计数由宿主传入；持久化(localStorage 等)属外部能力，不在组件内做。
import React, { useState } from 'react';
import { Select } from 'antd';

var ktScope = (cls) => (
  <style>{`
    .${cls} .ant-select-item-option{display:flex;align-items:center;}
    .${cls} .ant-select-item-option-state{display:none;}
    .${cls} .ant-select-item-option-selected{background:var(--brand-bg,#e6f4ff) !important;font-weight:var(--fw-strong,600);}
    .${cls} .kt-chk{width:14px;height:14px;border-radius:var(--r-small,3px);border:1px solid var(--line-strong,#d9d9d9);background:#fff;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;}
    .${cls} .kt-chk.on{background:var(--brand,#1677ff);border-color:var(--brand,#1677ff);}
    .${cls} .kt-name{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .${cls} .kt-cnt{margin-left:auto;font-size:var(--f-aux,12px);color:var(--t3,rgba(0,0,0,.45));font-variant-numeric:tabular-nums;}
  `}</style>
);

function Check(props) {
  return <span className={'kt-chk' + (props.checked ? ' on' : '')}>{props.checked ? (<svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2"><path d="M2.5 6.5l2.5 2.5 4.5-5" /></svg>) : null}</span>;
}

function KeywordTagSearch(props) {
  var cls = props.popupClassName || 'kt-pop';
  var value = props.value || [];
  var history = props.history || [];
  var countFor = props.countFor || function () { return 0; };
  var searchState = useState('');
  var typed = searchState[0], setTyped = searchState[1];

  var options = history.map(function (w) { return { label: w, value: w }; });

  return (
    <React.Fragment>
      {ktScope(cls)}
      <Select
        mode="tags"
        allowClear
        maxTagCount={props.maxTagCount || 'responsive'}
        className={cls}
        popupClassName={cls}
        style={props.style || { width: '100%' }}
        placeholder={props.placeholder || '按回车添加'}
        value={value}
        onChange={props.onChange}
        onSearch={setTyped}
        onBlur={function () { setTyped(''); }}
        options={options}
        optionRender={function (option) {
          var w = option.value;
          var n = countFor(w);
          return (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
              <Check checked={value.indexOf(w) >= 0} />
              <i style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--line-strong,#d9d9d9)', flex: '0 0 auto' }} />
              <span className="kt-name">{w}</span>
              <span className="kt-cnt" style={n === 0 ? { color: 'var(--t4,rgba(0,0,0,.25))' } : undefined}>{n}</span>
            </span>
          );
        }}
        dropdownRender={function (menu) {
          var t = String(typed || '').trim();
          var showHint = t && value.indexOf(t) < 0;
          return (
            <div>
              {showHint ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 'var(--h-ctrl-lg,32px)', padding: '0 10px', fontSize: 'var(--f-body,14px)' }}>
                  <span style={{ flex: '1 1 auto', color: 'var(--t2,rgba(0,0,0,.65))' }}>{props.typedAddLabel ? props.typedAddLabel(t) : ('按回车添加「' + t + '」')}</span>
                  <span className="kt-cnt">{countFor(t)}</span>
                </div>
              ) : null}
              {menu}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 10px', borderTop: '1px solid var(--line,#f0f0f0)', marginTop: 4, fontSize: 'var(--f-aux,12px)', color: 'var(--t3,rgba(0,0,0,.45))' }}>
                {props.onMatchModeChange ? (
                  <React.Fragment>
                    <span>模式[{props.matchMode === 'all' ? '全部' : '任一'}]</span>
                    <span style={{ color: 'var(--brand,#1677ff)', cursor: 'pointer' }} onClick={function () { props.onMatchModeChange(props.matchMode === 'all' ? 'any' : 'all'); }}>改为[{props.matchMode === 'all' ? '任一' : '全部'}]</span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span>已选 {value.length} 项</span>
                    <span style={{ color: 'var(--brand,#1677ff)', cursor: 'pointer' }} onClick={function () { props.onChange([]); }}>清空</span>
                  </React.Fragment>
                )}
              </div>
            </div>
          );
        }}
      />
    </React.Fragment>
  );
}

// —— Demo：history/计数由宿主（此处 mock）。持久化在真实页由宿主用 localStorage 承接 ——
function KeywordTagSearchDemo() {
  var st = useState([]);
  var words = st[0], setWords = st[1];
  var mm = useState('any');
  var mode = mm[0], setMode = mm[1];
  var history = ['面差', '间隙', '卡扣', '配合尺寸'];
  var counts = { '面差': 8, '间隙': 5, '卡扣': 3, '配合尺寸': 0 };
  return (
    <div style={{ width: 280 }}>
      <KeywordTagSearch
        value={words}
        onChange={setWords}
        history={history}
        countFor={function (w) { return counts[w] || 0; }}
        matchMode={mode}
        onMatchModeChange={setMode}
      />
    </div>
  );
}

export { KeywordTagSearch };
export default KeywordTagSearchDemo;
