/* ============================================================
   文件：js/tabs.js
   作者：林洁 ｜ 建立时间：2026-11-02 ｜ 使用模型：GLM-5.3-Flash
   功能名称及简介：可复用 Tab 选项卡组件。
   通过 linjie_initTabs(配置对象) 在任意页面初始化一组选项卡；
   切换采用「排他思想」——先清除所有选项卡/面板的选中状态，
   再设置当前元素的选中状态；配合 aria 属性保证可访问性。
   ============================================================ */
'use strict';

/* linjie_clearSelected —— 功能：清除一组元素的全部选中状态（排他思想第一步） */
function linjie_clearSelected(linjie_elements, linjie_class) {
  linjie_elements.forEach(function (linjie_el) {
    linjie_el.classList.remove(linjie_class);
    linjie_el.setAttribute('aria-selected', 'false');
  });
}

/* linjie_initTabs —— 功能：初始化一组选项卡（绑定事件监听，实现排他切换与面板联动）。
   配置对象参数：
   linjie_options.root          选项卡容器选择器
   linjie_options.tabSelector   选项卡按钮选择器
   linjie_options.panelSelector 内容面板选择器
   linjie_options.activeClass   按钮选中态类名（默认 linjie_active）
   linjie_options.showClass     面板显示态类名（默认 linjie_show）
   linjie_options.defaultIndex  默认选中的选项卡下标（默认 0）
   linjie_options.trigger       触发切换的事件：'click' 点击（默认）| 'mouseover' 移过切换 | 'both' 两者同时 */
function linjie_initTabs(linjie_options) {
  var linjie_root = document.querySelector(linjie_options.root);
  if (!linjie_root) { return; }

  var linjie_tabs = linjie_root.querySelectorAll(linjie_options.tabSelector);
  var linjie_panels = linjie_root.querySelectorAll(linjie_options.panelSelector);
  var linjie_activeClass = linjie_options.activeClass || 'linjie_active';
  var linjie_showClass = linjie_options.showClass || 'linjie_show';
  var linjie_current = linjie_options.defaultIndex || 0;
  var linjie_trigger = linjie_options.trigger || 'click';

  /* linjie_showTab —— 功能：切换到指定下标的选项卡（先清全部选中态，再设置当前元素选中态） */
  function linjie_showTab(linjie_index) {
    linjie_clearSelected(linjie_tabs, linjie_activeClass);
    linjie_clearSelected(linjie_panels, linjie_showClass);

    linjie_tabs[linjie_index].classList.add(linjie_activeClass);
    linjie_tabs[linjie_index].setAttribute('aria-selected', 'true');

    linjie_panels[linjie_index].classList.add(linjie_showClass);
    linjie_panels[linjie_index].setAttribute('aria-selected', 'true');
    linjie_current = linjie_index;
  }

  /* 事件监听：按配置的触发方式为每个选项卡绑定切换事件 */
  linjie_tabs.forEach(function (linjie_btn, linjie_index) {
    /* linjie_switch —— 功能：事件处理函数，切换到当前下标的选项卡（已是当前项则不重复切换） */
    var linjie_switch = function () {
      if (linjie_index !== linjie_current) {
        linjie_showTab(linjie_index);
      }
    };
    if (linjie_trigger === 'mouseover') {
      linjie_btn.addEventListener('mouseover', linjie_switch);
    } else if (linjie_trigger === 'both') {
      linjie_btn.addEventListener('mouseover', linjie_switch);
      linjie_btn.addEventListener('click', linjie_switch);
    } else {
      linjie_btn.addEventListener('click', linjie_switch);
    }
  });

  /* 初始化：显示默认选项卡 */
  linjie_showTab(linjie_current);
}
