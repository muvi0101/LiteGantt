/* Code Fingerprint: Caius | Project Gantt Builder | 2026 | CGFB-2026-N7Q4-X1K8 | ORIGINAL-WORK | INTERNAL-USE-ONLY */

const defaultProject = {
  title: '甘特图 - 项目进度计划表（周视图）',
  projectStart: '2026-09-01',
  phases: [
    {
      name: '示例阶段1',
      start: '2026-09-01',
      end: '2026-09-15',
      tasks: [
        { name: '阶段1-示例任务1', start: '2026-09-01', end: '2026-09-03', status: '未开始', progress: 0 },
        { name: '阶段1-示例任务2', start: '2026-09-04', end: '2026-09-08', status: '未开始', progress: 0 },
        { name: '阶段1-示例任务3', start: '2026-09-09', end: '2026-09-15', status: '未开始', progress: 0 },
        { name: '示例里程碑', start: '2026-09-15', end: '2026-09-15', status: '未开始', progress: 0, milestone: true },
      ],
    },
    {
      name: '示例阶段2',
      start: '2026-09-16',
      end: '2026-10-10',
      tasks: [
        { name: '阶段2-示例任务1', start: '2026-09-16', end: '2026-09-30', status: '未开始', progress: 0 },
        { name: '阶段2-示例任务2', start: '2026-09-16', end: '2026-09-23', status: '未开始', progress: 0 },
        { name: '阶段2-示例任务3', start: '2026-09-20', end: '2026-09-27', status: '未开始', progress: 0 },
        { name: '阶段2-示例任务4', start: '2026-09-30', end: '2026-10-09', status: '未开始', progress: 0 },
        { name: '示例里程碑', start: '2026-10-10', end: '2026-10-10', status: '未开始', progress: 0, milestone: true },
      ],
    },
    {
      name: '示例阶段3',
      start: '2026-10-11',
      end: '2026-10-30',
      tasks: [
        { name: '阶段3-示例任务1', start: '2026-10-11', end: '2026-10-18', status: '未开始', progress: 0 },
        { name: '阶段3-示例任务2', start: '2026-10-13', end: '2026-10-22', status: '未开始', progress: 0 },
        { name: '阶段3-示例任务3', start: '2026-10-19', end: '2026-10-29', status: '未开始', progress: 0 },
        { name: '示例里程碑', start: '2026-10-30', end: '2026-10-30', status: '未开始', progress: 0, milestone: true },
      ],
    },
    {
      name: '示例阶段4',
      start: '2026-10-31',
      end: '2026-11-14',
      tasks: [
        { name: '阶段4-示例任务1', start: '2026-10-31', end: '2026-11-03', status: '未开始', progress: 0 },
        { name: '阶段4-示例任务2', start: '2026-11-03', end: '2026-11-08', status: '未开始', progress: 0 },
        { name: '阶段4-示例任务3', start: '2026-11-05', end: '2026-11-12', status: '未开始', progress: 0 },
        { name: '阶段4-示例任务4', start: '2026-11-10', end: '2026-11-13', status: '未开始', progress: 0 },
        { name: '示例里程碑', start: '2026-11-14', end: '2026-11-14', status: '未开始', progress: 0, milestone: true },
      ],
    },
    {
      name: '示例阶段5',
      start: '2026-11-15',
      end: '2026-12-31',
      tasks: [
        { name: '阶段5-示例任务1', start: '2026-11-15', end: '2026-12-30', status: '未开始', progress: 0 },
        { name: '示例里程碑', start: '2026-12-31', end: '2026-12-31', status: '未开始', progress: 0, milestone: true },
      ],
    },
  ],
};

let state = structuredClone(defaultProject);

const API_BASE = String(window.LITEGANTT_API_BASE || '').replace(/\/+$/, '');
const phaseAccents = ['#116acb', '#13a8c8', '#16a272', '#5f6df1', '#8b5cf6', '#d89419', '#e11d48'];
const taskStatuses = ['未开始', '进行中', '已完成', '延期'];
const statusColorMap = {
  未开始: '#94a3b8',
  进行中: '#0ea5e9',
  已完成: '#16a34a',
  延期: '#ef4444',
};
const statusDefaultProgress = {
  未开始: 0,
  进行中: 50,
  已完成: 100,
  延期: 40,
};
const DEFAULT_PHASE_DAYS = 14;
const DEFAULT_TASK_DAYS = 7;
const PREVIEW_WEEK_WIDTH = 72;
const PREVIEW_MAX_WEEKS = 104;
const PREVIEW_MILESTONE_MARKER_WIDTH = 10;
const PREVIEW_MILESTONE_STAR_WIDTH = 16;
const PREVIEW_MILESTONE_BAR_TO_STAR_GAP = 8;
const PREVIEW_MILESTONE_STAR_TO_TEXT_GAP = 12;
const ZOOM_MIN = 0.2;
const ZOOM_MAX = 1.4;
const ZOOM_STEP = 0.05;
const FIT_PREVIEW_MIN_ZOOM = 0.08;
const VERSION_HISTORY_STORAGE_KEY = 'litegantt.versionHistory.v1';
const VERSION_HISTORY_LIMIT = 30;
const CODE_FINGERPRINT = Object.freeze({
  author: 'Caius',
  project: 'Project Gantt Builder',
  year: '2026',
  id: 'CGFB-2026-N7Q4-X1K8',
  keywords: 'ORIGINAL-WORK|INTERNAL-USE-ONLY|WRITTEN-AUTHORIZATION-REQUIRED',
});

const phaseList = document.querySelector('#phaseList');
const ganttModal = document.querySelector('#ganttModal');
const previewPanel = ganttModal ? ganttModal.querySelector('.gantt-modal-dialog') : null;
const previewScroll = ganttModal ? ganttModal.querySelector('.preview-scroll') : null;
const previewCanvas = ganttModal ? ganttModal.querySelector('#previewCanvas') : null;
const ganttPreview = ganttModal ? ganttModal.querySelector('#ganttPreview') : null;
const projectStats = document.querySelector('#projectStats');
const DEFAULT_TITLE = '甘特图 - 项目进度计划表（周视图）';
const statusBox = document.querySelector('#statusBox');
const phaseTemplate = document.querySelector('#phaseTemplate');
const taskTemplate = document.querySelector('#taskTemplate');
const saveVersionBtn = document.querySelector('#saveVersionBtn');
const versionHistoryBtn = document.querySelector('#versionHistoryBtn');
const versionHistoryBackdrop = document.querySelector('#versionHistoryBackdrop');
const versionHistoryDrawer = document.querySelector('#versionHistoryDrawer');
const closeVersionHistoryBtn = document.querySelector('#closeVersionHistoryBtn');
const versionNameInput = document.querySelector('#versionNameInput');
const drawerSaveVersionBtn = document.querySelector('#drawerSaveVersionBtn');
const versionList = document.querySelector('#versionList');
const versionEmptyState = document.querySelector('#versionEmptyState');
const versionHistoryCount = document.querySelector('#versionHistoryCount');
const ioMenu = document.querySelector('.io-menu');
const ioMenuBtn = document.querySelector('#ioMenuBtn');
const ioMenuPanel = document.querySelector('#ioMenuPanel');
const importExcelBtn = document.querySelector('#importExcelBtn');
const importExcelInput = document.querySelector('#importExcelInput');
const exportExcelBtn = document.querySelector('#exportExcelBtn');
const exportImageBtn = document.querySelector('#exportImageBtn');
const previewGanttBtn = document.querySelector('#previewGanttBtn');
const fitPreviewBtn = ganttModal ? ganttModal.querySelector('#fitPreviewBtn') : null;
const zoomOutBtn = ganttModal ? ganttModal.querySelector('#zoomOutBtn') : null;
const zoomInBtn = ganttModal ? ganttModal.querySelector('#zoomInBtn') : null;
const zoomSlider = ganttModal ? ganttModal.querySelector('#zoomSlider') : null;
const zoomValue = ganttModal ? ganttModal.querySelector('#zoomValue') : null;

let previewZoomMode = 'fit';
let manualPreviewZoom = 1;
let currentPreviewZoom = 1;
let expandedPhaseIndexes = new Set();
let focusedPhaseIndex = null;
let focusPhaseTimer = null;

const excelImportLabels = {
  action: '导入 Excel',
  busy: '导入中...',
  done: 'Excel 已导入，页面已自动填写。',
  status: '正在读取 Excel，请稍候。',
};

const excelExportLabels = {
  action: '导出 Excel',
  busy: '生成中...',
  done: 'Excel 已生成并开始下载。',
  status: '正在生成 Excel，请稍候。',
};

const imageExportLabels = {
  action: '导出图片',
  busy: '生成中...',
  done: '4K 图片已生成并开始下载。',
  status: '正在生成 4K 图片，请稍候。',
};

// Task breakdown inline state
let breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
const subtaskStatuses = ['未开始', '进行中', '已完成', '已暂停', '已取消'];
const subtaskPriorities = ['高', '中', '低'];
const subtaskStatusColors = {
  '未开始': '#94a3b8',
  '进行中': '#0ea5e9',
  '已完成': '#16a34a',
  '已暂停': '#f59e0b',
  '已取消': '#9ca3af',
};
const subtaskPriorityColors = { '高': '#e11d48', '中': '#3b82f6', '低': '#64748b' };
const subtaskTemplate = document.querySelector('#subtaskTemplate');

function getSubtasks(phaseIndex, taskIndex) {
  const task = state.phases[phaseIndex]?.tasks[taskIndex];
  if (!task) return [];
  if (!Array.isArray(task.subtasks)) task.subtasks = [];
  return task.subtasks;
}

function ensureSubtaskDefaults(subtask, parentTask) {
  subtask.name = String(subtask.name || '').trim() || '新子任务';
  subtask.start = subtask.start || parentTask?.start || '';
  subtask.end = subtask.end || parentTask?.end || subtask.start || '';
  subtask.status = subtaskStatuses.includes(subtask.status) ? subtask.status : '未开始';
  subtask.ownerClient = subtask.ownerClient || '';
  subtask.ownerVendor = subtask.ownerVendor || '';
  subtask.priority = subtaskPriorities.includes(subtask.priority) ? subtask.priority : '中';
  if (!Array.isArray(subtask.deps)) subtask.deps = [];
}

function isBreakdownOpen(phaseIndex, taskIndex) {
  return breakdownOpen.phaseIndex === phaseIndex && breakdownOpen.taskIndex === taskIndex;
}

function isBreakdownTargetValid() {
  return Boolean(state.phases[breakdownOpen.phaseIndex]?.tasks[breakdownOpen.taskIndex]);
}

function normalizeSubtaskDates(subtask, parentTask) {
  subtask.start = clampIsoDate(subtask.start || parentTask?.start || '', parentTask?.start, parentTask?.end);
  subtask.end = clampIsoDate(subtask.end || subtask.start || parentTask?.end || '', maxIsoDate([parentTask?.start, subtask.start]), parentTask?.end);
  if (isIsoDate(subtask.start) && isIsoDate(subtask.end) && compareIsoDates(subtask.end, subtask.start) < 0) {
    subtask.end = subtask.start;
  }
}

function makeDefaultSubtask(parentTask) {
  return {
    name: '新子任务',
    start: parentTask.start || '',
    end: parentTask.end || parentTask.start || '',
    status: '未开始',
    ownerClient: '',
    ownerVendor: '',
    priority: '中',
    deps: [],
  };
}

function openBreakdown(phaseIndex, taskIndex) {
  if (isBreakdownOpen(phaseIndex, taskIndex)) {
    closeBreakdown();
    return;
  }
  breakdownOpen = { phaseIndex, taskIndex };
  expandedPhaseIndexes.add(phaseIndex);
  render();
  requestAnimationFrame(() => {
    document.querySelector('.inline-breakdown-panel')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
}

function closeBreakdown() {
  breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
  render();
}

function saveBreakdown(collapse = false) {
  const { phaseIndex, taskIndex } = breakdownOpen;
  if (!Number.isInteger(phaseIndex) || !Number.isInteger(taskIndex)) return;
  const task = state.phases[phaseIndex]?.tasks[taskIndex];
  if (task && Array.isArray(task.subtasks)) {
    task.subtasks.forEach((subtask) => {
      ensureSubtaskDefaults(subtask, task);
      normalizeSubtaskDates(subtask, task);
    });
  }
  if (collapse) breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
  render();
}

function addSubtask(phaseIndex, taskIndex) {
  const task = state.phases[phaseIndex]?.tasks[taskIndex];
  if (!task) return;
  if (!Array.isArray(task.subtasks)) task.subtasks = [];
  task.subtasks.push(makeDefaultSubtask(task));
  breakdownOpen = { phaseIndex, taskIndex };
  render();
}

function populateDependencyOptions(input, phase, taskIndex, subtask, subIndex) {
  input.textContent = '';
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = '无前置依赖';
  input.append(emptyOption);
  const candidates = [];
  phase.tasks.forEach((siblingTask, sibIndex) => {
    if (sibIndex !== taskIndex && siblingTask.name) {
      candidates.push({ value: `task:${sibIndex}`, label: siblingTask.name });
    }
    if (sibIndex === taskIndex && Array.isArray(siblingTask.subtasks)) {
      siblingTask.subtasks.forEach((st, stIdx) => {
        if (stIdx !== subIndex && st.name) {
          candidates.push({ value: `sub:${stIdx}`, label: `↳ ${st.name}` });
        }
      });
    }
  });
  candidates.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    if ((subtask.deps || [])[0] === opt.value) option.selected = true;
    input.append(option);
  });
  input.value = (subtask.deps || [])[0] || '';
}

function syncBreakdownDerivedViews() {
  updateBreakdownSummaryView();
  renderProjectStats();
  renderRightPane();
}

function getOpenBreakdownTask() {
  const { phaseIndex, taskIndex } = breakdownOpen;
  if (!Number.isInteger(phaseIndex) || !Number.isInteger(taskIndex)) return null;
  return state.phases[phaseIndex]?.tasks[taskIndex] || null;
}

function updateBreakdownSummaryView() {
  const task = getOpenBreakdownTask();
  const panel = document.querySelector('.inline-breakdown-panel');
  if (!task || !panel) return;
  const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
  const progress = getTaskBreakdownProgress(task);
  const countValue = panel.querySelector('[data-breakdown-meta="subtask-count"] strong');
  const progressValue = panel.querySelector('[data-breakdown-meta="progress"] strong');
  if (countValue) countValue.textContent = `${subtasks.length}项`;
  if (progressValue) progressValue.textContent = progress === null ? '未拆解' : `${progress}%`;
}

function bindSubtaskRow(row, phase, task, taskIndex, subtask, subIndex) {
  ensureSubtaskDefaults(subtask, task);
  normalizeSubtaskDates(subtask, task);
  row.style.setProperty('--status-color', subtaskStatusColors[subtask.status] || '#64748b');
  row.style.setProperty('--priority-color', subtaskPriorityColors[subtask.priority] || '#64748b');
  row.querySelectorAll('input, select').forEach((input) => {
    const field = input.dataset.field;
    if (field === 'deps') {
      populateDependencyOptions(input, phase, taskIndex, subtask, subIndex);
      input.addEventListener('change', () => {
        subtask.deps = input.value ? [input.value] : [];
        syncBreakdownDerivedViews();
      });
      return;
    }
    if (field === 'start') {
      input.min = task.start || '';
      input.max = task.end || '';
    }
    if (field === 'end') {
      input.min = maxIsoDate([task.start, subtask.start]);
      input.max = task.end || '';
    }
    input.value = subtask[field] ?? '';
    const eventName = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(eventName, () => {
      if (field === 'start') {
        subtask.start = clampIsoDate(input.value, task.start, task.end);
        input.value = subtask.start;
        subtask.end = clampIsoDate(subtask.end, maxIsoDate([task.start, subtask.start]), task.end);
        const endInput = row.querySelector('[data-field="end"]');
        if (endInput) {
          endInput.min = maxIsoDate([task.start, subtask.start]);
          endInput.value = subtask.end;
        }
      } else if (field === 'end') {
        subtask.end = clampIsoDate(input.value, maxIsoDate([task.start, subtask.start]), task.end);
        input.value = subtask.end;
      } else {
        subtask[field] = input.value;
      }
      if (field === 'status') {
        row.style.setProperty('--status-color', subtaskStatusColors[input.value] || '#64748b');
      }
      if (field === 'priority') {
        row.style.setProperty('--priority-color', subtaskPriorityColors[input.value] || '#64748b');
      }
      syncBreakdownDerivedViews();
    });
  });
  row.querySelector('.delete-subtask').addEventListener('click', () => {
    task.subtasks.splice(subIndex, 1);
    render();
  });
}

function makeBreakdownMeta(label, value, key = '') {
  const item = makeElement('span', 'inline-breakdown-meta');
  if (key) item.dataset.breakdownMeta = key;
  item.append(makeElement('strong', '', value), makeElement('small', '', label));
  return item;
}

function renderBreakdownPanel(phaseIndex, taskIndex) {
  const phase = state.phases[phaseIndex];
  const task = phase?.tasks[taskIndex];
  if (!phase || !task) return document.createDocumentFragment();
  if (!Array.isArray(task.subtasks)) task.subtasks = [];
  const progress = getTaskBreakdownProgress(task);
  const panel = makeElement('div', 'inline-breakdown-panel');
  const summary = makeElement('aside', 'inline-breakdown-summary');
  summary.append(
    makeElement('span', 'inline-breakdown-eyebrow', '当前分解对象'),
    makeElement('h4', '', task.name || '未命名任务'),
  );
  const summaryMeta = makeElement('div', 'inline-breakdown-meta-grid');
  summaryMeta.append(
    makeBreakdownMeta('父任务区间', task.start && task.end ? `${fmtMd(task.start)}-${fmtMd(task.end)}` : '-'),
    makeBreakdownMeta('计划用时', task.start && task.end ? `${daysInclusiveIso(task.start, task.end)}天` : '-'),
    makeBreakdownMeta('子任务', `${task.subtasks.length}项`, 'subtask-count'),
    makeBreakdownMeta('完成度', progress === null ? '未拆解' : `${progress}%`, 'progress'),
  );
  summary.append(summaryMeta);

  const editor = makeElement('section', 'inline-breakdown-editor');
  const editorHead = makeElement('div', 'inline-breakdown-head');
  const title = makeElement('div', '');
  title.append(makeElement('span', 'inline-breakdown-eyebrow', 'Task Breakdown'), makeElement('h4', '', '任务分解'));
  const actions = makeElement('div', 'inline-breakdown-actions');
  const addBtn = makeElement('button', 'add-subtask-btn', '+ 添加子任务');
  addBtn.type = 'button';
  addBtn.addEventListener('click', () => addSubtask(phaseIndex, taskIndex));
  const saveBtn = makeElement('button', 'complete-breakdown-btn', '保存分解');
  saveBtn.type = 'button';
  saveBtn.addEventListener('click', () => saveBreakdown(true));
  actions.append(addBtn, saveBtn);
  editorHead.append(title, actions);

  const tableWrap = makeElement('div', 'breakdown-table-wrap inline-breakdown-table');
  const tableHead = makeElement('div', 'breakdown-table-head');
  ['子任务名称', '优先级', '开始日期', '结束日期', '完成状态', '客户负责人', '我方负责人', '前置依赖', '操作'].forEach((label) => {
    tableHead.append(makeElement('span', '', label));
  });
  const list = makeElement('div', 'breakdown-list');
  task.subtasks.forEach((subtask, subIndex) => {
    const row = subtaskTemplate.content.firstElementChild.cloneNode(true);
    row.classList.add('inline-subtask-row');
    bindSubtaskRow(row, phase, task, taskIndex, subtask, subIndex);
    list.append(row);
  });
  if (!task.subtasks.length) {
    const empty = makeElement('div', 'inline-breakdown-empty');
    empty.append(
      makeElement('strong', '', '当前任务还没有子任务'),
      makeElement('span', '', '点击“添加子任务”后，会在这里维护拆分后的任务明细。'),
    );
    list.append(empty);
  }
  tableWrap.append(tableHead, list);
  editor.append(editorHead, tableWrap);
  panel.append(summary, editor);
  return panel;
}


const HOLIDAY_OVERRIDES = Object.freeze({
  '2025-01-01': { type: 'holiday', label: '元旦' },
  '2025-01-28': { type: 'holiday', label: '春节' },
  '2025-01-29': { type: 'holiday', label: '春节' },
  '2025-01-30': { type: 'holiday', label: '春节' },
  '2025-01-31': { type: 'holiday', label: '春节' },
  '2025-02-01': { type: 'holiday', label: '春节' },
  '2025-02-02': { type: 'holiday', label: '春节' },
  '2025-02-03': { type: 'holiday', label: '春节' },
  '2025-02-04': { type: 'holiday', label: '春节' },
  '2025-01-26': { type: 'workday', label: '春节调休' },
  '2025-02-08': { type: 'workday', label: '春节调休' },
  '2025-04-04': { type: 'holiday', label: '清明节' },
  '2025-04-05': { type: 'holiday', label: '清明节' },
  '2025-04-06': { type: 'holiday', label: '清明节' },
  '2025-05-01': { type: 'holiday', label: '劳动节' },
  '2025-05-02': { type: 'holiday', label: '劳动节' },
  '2025-05-03': { type: 'holiday', label: '劳动节' },
  '2025-05-04': { type: 'holiday', label: '劳动节' },
  '2025-05-05': { type: 'holiday', label: '劳动节' },
  '2025-04-27': { type: 'workday', label: '劳动节调休' },
  '2025-05-31': { type: 'holiday', label: '端午节' },
  '2025-06-01': { type: 'holiday', label: '端午节' },
  '2025-06-02': { type: 'holiday', label: '端午节' },
  '2025-10-01': { type: 'holiday', label: '国庆节' },
  '2025-10-02': { type: 'holiday', label: '国庆节' },
  '2025-10-03': { type: 'holiday', label: '国庆节' },
  '2025-10-04': { type: 'holiday', label: '国庆节' },
  '2025-10-05': { type: 'holiday', label: '国庆节' },
  '2025-10-06': { type: 'holiday', label: '国庆节' },
  '2025-10-07': { type: 'holiday', label: '国庆节' },
  '2025-10-08': { type: 'holiday', label: '中秋节' },
  '2025-09-28': { type: 'workday', label: '国庆调休' },
  '2025-10-11': { type: 'workday', label: '国庆调休' },
  '2026-01-01': { type: 'holiday', label: '元旦' },
  '2026-01-02': { type: 'holiday', label: '元旦' },
  '2026-01-03': { type: 'holiday', label: '元旦' },
  '2026-01-04': { type: 'workday', label: '元旦调休' },
  '2026-02-15': { type: 'holiday', label: '春节' },
  '2026-02-16': { type: 'holiday', label: '春节' },
  '2026-02-17': { type: 'holiday', label: '春节' },
  '2026-02-18': { type: 'holiday', label: '春节' },
  '2026-02-19': { type: 'holiday', label: '春节' },
  '2026-02-20': { type: 'holiday', label: '春节' },
  '2026-02-21': { type: 'holiday', label: '春节' },
  '2026-02-22': { type: 'holiday', label: '春节' },
  '2026-02-23': { type: 'holiday', label: '春节' },
  '2026-02-14': { type: 'workday', label: '春节调休' },
  '2026-02-28': { type: 'workday', label: '春节调休' },
  '2026-04-04': { type: 'holiday', label: '清明节' },
  '2026-04-05': { type: 'holiday', label: '清明节' },
  '2026-04-06': { type: 'holiday', label: '清明节' },
  '2026-05-01': { type: 'holiday', label: '劳动节' },
  '2026-05-02': { type: 'holiday', label: '劳动节' },
  '2026-05-03': { type: 'holiday', label: '劳动节' },
  '2026-05-04': { type: 'holiday', label: '劳动节' },
  '2026-05-05': { type: 'holiday', label: '劳动节' },
  '2026-04-26': { type: 'workday', label: '劳动节调休' },
  '2026-05-09': { type: 'workday', label: '劳动节调休' },
  '2026-06-19': { type: 'holiday', label: '端午节' },
  '2026-06-20': { type: 'holiday', label: '端午节' },
  '2026-06-21': { type: 'holiday', label: '端午节' },
  '2026-09-25': { type: 'holiday', label: '中秋节' },
  '2026-09-26': { type: 'holiday', label: '中秋节' },
  '2026-09-27': { type: 'holiday', label: '中秋节' },
  '2026-09-20': { type: 'workday', label: '国庆调休' },
  '2026-10-01': { type: 'holiday', label: '国庆节' },
  '2026-10-02': { type: 'holiday', label: '国庆节' },
  '2026-10-03': { type: 'holiday', label: '国庆节' },
  '2026-10-04': { type: 'holiday', label: '国庆节' },
  '2026-10-05': { type: 'holiday', label: '国庆节' },
  '2026-10-06': { type: 'holiday', label: '国庆节' },
  '2026-10-07': { type: 'holiday', label: '国庆节' },
  '2026-10-10': { type: 'workday', label: '国庆调休' },
});


function registerCodeFingerprint() {
  if (typeof window === 'undefined') return;

  const existingFingerprint = Object.getOwnPropertyDescriptor(window, '__PGC_FINGERPRINT__');
  if (!existingFingerprint) {
    Object.defineProperty(window, '__PGC_FINGERPRINT__', {
      value: CODE_FINGERPRINT,
      configurable: false,
      enumerable: false,
      writable: false,
    });
  }

  if (window.__PGC_FINGERPRINT_LOGGED__) return;
  window.__PGC_FINGERPRINT_LOGGED__ = true;

  console.log(
    '%c Project Gantt Builder %c Code Fingerprint: CGFB-2026-N7Q4-X1K8 %c Caius · Original Work · Internal Use Only',
    'background:#0f172a;color:#f8fafc;padding:5px 10px;border-radius:999px;font-weight:800;',
    'background:#0ea5e9;color:#ffffff;padding:5px 10px;border-radius:999px;font-weight:800;',
    'color:#475569;font-weight:700;'
  );
}

function setStatus(message, type = '') {
  statusBox.textContent = message;
  statusBox.className = `status-box ${type}`.trim();
}

function apiUrl(path) {
  return `${API_BASE}${path}`;
}

function getDownloadFileName(response, fallbackExt = 'xlsx') {
  const header = response.headers.get('Content-Disposition') || '';
  const utf8Match = header.match(/filename\*=UTF-8''([^;]+)/);
  if (utf8Match) return decodeURIComponent(utf8Match[1]);
  const asciiMatch = header.match(/filename="?([^";]+)"?/);
  if (asciiMatch) return asciiMatch[1];
  return `项目计划甘特图-${Date.now()}.${fallbackExt}`;
}

function setExcelImporting(busy) {
  if (!importExcelBtn) return;
  importExcelBtn.disabled = busy;
  importExcelBtn.textContent = busy ? excelImportLabels.busy : excelImportLabels.action;
  if (importExcelInput) importExcelInput.disabled = busy;
}

function setExcelExporting(busy) {
  if (!exportExcelBtn) return;
  exportExcelBtn.disabled = busy;
  exportExcelBtn.textContent = busy ? excelExportLabels.busy : excelExportLabels.action;
}

function setImageExporting(busy) {
  if (!exportImageBtn) return;
  exportImageBtn.disabled = busy;
  exportImageBtn.textContent = busy ? imageExportLabels.busy : imageExportLabels.action;
}

function downloadResponseBlob(response, fallbackExt = 'xlsx') {
  return response.blob().then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = getDownloadFileName(response, fallbackExt);
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });
}

function isIsoDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function addDaysIso(value, days) {
  if (!isIsoDate(value)) return value || '';
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function fmtMd(value) {
  if (!isIsoDate(value)) return '';
  const [, month, day] = value.split('-').map(Number);
  return `${month}/${day}`;
}

function fmtHealthDate(value) {
  return isIsoDate(value) ? value.replace(/-/g, '/') : '-';
}

function monthLabel(value) {
  if (!isIsoDate(value)) return '';
  const [year, month] = value.split('-').map(Number);
  return `${year}年${month}月`;
}

function dateSortValue(value) {
  if (!isIsoDate(value)) return Number.MAX_SAFE_INTEGER;
  const [year, month, day] = value.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

function compareIsoDates(a, b) {
  return dateSortValue(a) - dateSortValue(b);
}

function isoToUtcDate(value) {
  if (!isIsoDate(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function eachIsoDateBetween(start, end) {
  if (!isIsoDate(start) || !isIsoDate(end) || compareIsoDates(end, start) < 0) return [];
  const dates = [];
  const cursor = isoToUtcDate(start);
  const endDate = isoToUtcDate(end);
  while (cursor <= endDate) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

function getHolidayMeta(value) {
  if (!isIsoDate(value)) return null;
  const override = HOLIDAY_OVERRIDES[value];
  if (override?.type === 'holiday') return override;
  if (override?.type === 'workday') return null;

  const day = isoToUtcDate(value)?.getUTCDay();
  if (day === 0 || day === 6) return { type: 'weekend', label: day === 0 ? '周日' : '周六' };
  return null;
}

function summarizeHolidayRange(start, end) {
  if (!isIsoDate(start) || !isIsoDate(end)) {
    return {
      tone: 'pending',
      primary: '待统计',
      secondary: '补全日期',
      title: '开始和结束日期完整后显示',
    };
  }

  const days = eachIsoDateBetween(start, end);
  let total = 0;
  let legalHolidayCount = 0;
  let weekendCount = 0;
  const labels = new Set();

  days.forEach((value) => {
    const meta = getHolidayMeta(value);
    if (!meta) return;
    total += 1;
    if (meta.type === 'holiday') {
      legalHolidayCount += 1;
      labels.add(meta.label);
    } else if (meta.type === 'weekend') {
      weekendCount += 1;
    }
  });

  if (!total) {
    return {
      tone: 'clear',
      primary: '0 天',
      secondary: '无节假日',
      title: `${start} 至 ${end} 之间无周末或法定节假日`,
    };
  }

  const secondaryParts = [];
  if (legalHolidayCount) secondaryParts.push(`法定 ${legalHolidayCount} 天`);
  if (weekendCount) secondaryParts.push(`周末 ${weekendCount} 天`);
  if (labels.size) secondaryParts.push([...labels].join(' / '));

  return {
    tone: legalHolidayCount ? 'holiday' : 'weekend',
    primary: `${total} 天`,
    secondary: secondaryParts.join(' · '),
    title: `${start} 至 ${end}：${secondaryParts.join('，')}`,
  };
}

function minIsoDate(values) {
  const valid = values.filter(isIsoDate).sort(compareIsoDates);
  return valid[0] || '';
}

function maxIsoDate(values) {
  const valid = values.filter(isIsoDate).sort(compareIsoDates);
  return valid[valid.length - 1] || '';
}

function clampIsoDate(value, min, max) {
  if (!isIsoDate(value)) return value || '';
  let result = value;
  if (isIsoDate(min) && compareIsoDates(result, min) < 0) result = min;
  if (isIsoDate(max) && compareIsoDates(result, max) > 0) result = max;
  return result;
}

function sortTasksByStart(phase) {
  phase.tasks.sort((a, b) => {
    return dateSortValue(a.start) - dateSortValue(b.start);
  });
}

function normalizeTaskStatus(status) {
  const normalized = String(status || '').trim();
  return taskStatuses.includes(normalized) ? normalized : '未开始';
}

function normalizeProgress(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.round(clampNumber(number, 0, 100));
}

function defaultProgressForStatus(status) {
  return statusDefaultProgress[normalizeTaskStatus(status)] ?? 0;
}

function getTaskBreakdownProgress(task) {
  const subtasks = Array.isArray(task?.subtasks) ? task.subtasks : [];
  if (!subtasks.length) return null;
  const completedCount = subtasks.filter((subtask) => subtask.status === '已完成').length;
  return Math.round((completedCount / subtasks.length) * 100);
}

function normalizeTaskProgress(task) {
  return defaultProgressForStatus(task?.status);
}

function getTaskStatus(task) {
  return normalizeTaskStatus(task?.status);
}

function getPhaseProgress(phase) {
  const tasks = Array.isArray(phase?.tasks) ? phase.tasks : [];
  if (!tasks.length) return 0;
  return Math.round(tasks.reduce((sum, task) => sum + normalizeTaskProgress(task), 0) / tasks.length);
}

function taskStatusColor(status) {
  return statusColorMap[normalizeTaskStatus(status)] || statusColorMap['未开始'];
}

function daysInclusiveIso(start, end) {
  if (!isIsoDate(start) || !isIsoDate(end)) return 0;
  return Math.max(1, Math.round((dateSortValue(end) - dateSortValue(start)) / 86400000) + 1);
}

function getAllPreviewDates() {
  const dates = [];
  state.phases.forEach((phase) => {
    dates.push(phase.start, phase.end);
    phase.tasks.forEach((task) => {
      dates.push(task.start, task.end);
    });
  });
  return dates.filter(isIsoDate);
}

function getPreviewMeasureContext() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    context.font = '800 13px "Avenir Next", "PingFang SC", "Microsoft YaHei", sans-serif';
  }
  return context;
}

function estimatePreviewMilestoneWidth(task) {
  const labelText = `${task.name} (${fmtMd(task.end)})`;
  const context = getPreviewMeasureContext();
  const textWidth = context ? context.measureText(labelText).width : labelText.length * 8;
  return Math.ceil(textWidth);
}

function getPreviewDayOffset(value, projectStartValue) {
  return Math.max(0, Math.round((dateSortValue(value) - dateSortValue(projectStartValue)) / 86400000));
}

function getPreviewTimelinePx(dayOffset) {
  return (dayOffset * PREVIEW_WEEK_WIDTH) / 7;
}

function getPreviewDurationPx(startOffset, durationDays) {
  return getPreviewTimelinePx(startOffset + durationDays) - getPreviewTimelinePx(startOffset);
}

function getPreviewMilestonePointPx(item, projectStartValue) {
  return getPreviewTimelinePx(getPreviewDayOffset(item.end, projectStartValue) + 1);
}

function getPreviewExtraWeeks(projectStartValue, baseWeeks) {
  const baseTrackWidth = baseWeeks * PREVIEW_WEEK_WIDTH;
  let extraWeeks = 0;

  state.phases.forEach((phase, phaseIndex) => {
    phase.tasks.forEach((task) => {
      if (!task.milestone || !isIsoDate(task.start) || !isIsoDate(task.end)) return;
      const pointPx = getPreviewMilestonePointPx(task, projectStartValue);
      const markerGapPx = Number.isFinite(task.markerGapPx) ? task.markerGapPx : PREVIEW_MILESTONE_BAR_TO_STAR_GAP;
      const markerRightPx = pointPx
        + markerGapPx
        + PREVIEW_MILESTONE_STAR_WIDTH
        + PREVIEW_MILESTONE_STAR_TO_TEXT_GAP
        + estimatePreviewMilestoneWidth({ ...task, phaseIndex });
      const overflowPx = Math.max(0, markerRightPx - baseTrackWidth);
      if (overflowPx > 0) {
        extraWeeks = Math.max(extraWeeks, Math.ceil(overflowPx / PREVIEW_WEEK_WIDTH));
      }
    });
  });

  return extraWeeks;
}

function getPreviewRange() {
  const projectStartValue = getEarliestPhaseStart();
  const allDates = getAllPreviewDates();
  const projectEndValue = maxIsoDate(allDates);
  if (!projectStartValue || !projectEndValue) return null;
  const baseWeeks = Math.max(4, Math.ceil(daysInclusiveIso(projectStartValue, projectEndValue) / 7));
  const extraWeeks = getPreviewExtraWeeks(projectStartValue, baseWeeks);
  const totalWeeks = Math.min(PREVIEW_MAX_WEEKS, Math.max(4, baseWeeks + extraWeeks));
  return { projectStartValue, projectEndValue, totalWeeks };
}

function getPreviewRows() {
  return state.phases.flatMap((phase, phaseIndex) => [
    { ...phase, progress: getPhaseProgress(phase), kind: 'phase', phaseIndex },
    ...phase.tasks.map((task) => ({ ...task, kind: 'sub', phaseIndex })),
  ]);
}

function getMonthBands(projectStartValue, totalWeeks) {
  const bands = [];
  let activeBand = null;
  for (let weekIndex = 1; weekIndex <= totalWeeks; weekIndex += 1) {
    const weekStart = addDaysIso(projectStartValue, (weekIndex - 1) * 7);
    const label = monthLabel(weekStart);
    if (!activeBand || activeBand.label !== label) {
      activeBand = { label, fromWeek: weekIndex, toWeek: weekIndex };
      bands.push(activeBand);
    } else {
      activeBand.toWeek = weekIndex;
    }
  }
  return bands;
}

function makePreviewCell(className, text, gridColumn, gridRow) {
  const cell = document.createElement('div');
  cell.className = className;
  cell.textContent = text;
  if (gridColumn) cell.style.gridColumn = gridColumn;
  if (gridRow) cell.style.gridRow = gridRow;
  return cell;
}

function makeElement(tagName, className, text = '') {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function readVersionHistory() {
  try {
    const raw = window.localStorage.getItem(VERSION_HISTORY_STORAGE_KEY);
    const records = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(records)) return [];
    return records
      .filter((record) => record && record.id && record.project && Array.isArray(record.project.phases))
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')))
      .slice(0, VERSION_HISTORY_LIMIT);
  } catch {
    return [];
  }
}

function writeVersionHistory(records) {
  try {
    window.localStorage.setItem(VERSION_HISTORY_STORAGE_KEY, JSON.stringify(records.slice(0, VERSION_HISTORY_LIMIT)));
  } catch {
    throw new Error('历史版本保存失败，请检查浏览器本地存储空间');
  }
}

function formatVersionTime(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return '未知时间';
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function makeDefaultVersionName() {
  return `计划版本 ${formatVersionTime(new Date().toISOString())}`;
}

function getProjectVersionSummary(project) {
  const phases = Array.isArray(project?.phases) ? project.phases : [];
  const tasks = phases.flatMap((phase) => Array.isArray(phase.tasks) ? phase.tasks : []);
  const dates = [];
  phases.forEach((phase) => {
    dates.push(phase.start, phase.end);
    (Array.isArray(phase.tasks) ? phase.tasks : []).forEach((task) => dates.push(task.start, task.end));
  });
  return {
    phaseCount: phases.length,
    taskCount: tasks.length,
    milestoneCount: tasks.filter((task) => task.milestone).length,
    subtaskCount: tasks.reduce((sum, task) => sum + (Array.isArray(task.subtasks) ? task.subtasks.length : 0), 0),
    start: minIsoDate(dates),
    end: maxIsoDate(dates),
  };
}

function createVersionRecord(name = '') {
  const project = JSON.parse(JSON.stringify(toPayload()));
  const createdAt = new Date().toISOString();
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(name || '').trim() || makeDefaultVersionName(),
    createdAt,
    project,
    summary: getProjectVersionSummary(project),
  };
}

function saveCurrentVersion(name = '') {
  try {
    const record = createVersionRecord(name);
    const records = [record, ...readVersionHistory()].slice(0, VERSION_HISTORY_LIMIT);
    writeVersionHistory(records);
    if (versionNameInput) versionNameInput.value = '';
    renderVersionHistory();
    setStatus(`已保存版本：${record.name}`, 'ok');
    return record;
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error');
    return null;
  }
}

function openVersionHistory() {
  renderVersionHistory();
  versionHistoryDrawer?.classList.add('open');
  versionHistoryBackdrop?.classList.add('open');
  versionHistoryDrawer?.setAttribute('aria-hidden', 'false');
  versionHistoryBackdrop?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('version-history-open');
  requestAnimationFrame(() => versionNameInput?.focus());
}

function closeVersionHistory() {
  versionHistoryDrawer?.classList.remove('open');
  versionHistoryBackdrop?.classList.remove('open');
  versionHistoryDrawer?.setAttribute('aria-hidden', 'true');
  versionHistoryBackdrop?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('version-history-open');
}

function makeVersionMetaChips(summary) {
  const meta = makeElement('div', 'version-card-meta');
  const range = summary?.start && summary?.end ? `${summary.start} - ${summary.end}` : '未设置周期';
  [
    `${summary?.phaseCount || 0} 个阶段`,
    `${summary?.taskCount || 0} 项任务`,
    `${summary?.milestoneCount || 0} 个里程碑`,
    `${summary?.subtaskCount || 0} 个子任务`,
    range,
  ].forEach((text) => meta.append(makeElement('span', '', text)));
  return meta;
}

function restoreVersion(record) {
  if (!window.confirm(`恢复到版本「${record.name}」？当前页面未保存的修改会被覆盖。`)) return;
  applyImportedProject(record.project);
  closeVersionHistory();
  setStatus(`已恢复版本：${record.name}`, 'ok');
}

function deleteVersion(recordId) {
  const records = readVersionHistory();
  const target = records.find((record) => record.id === recordId);
  if (!target) return;
  if (!window.confirm(`删除版本「${target.name}」？`)) return;
  writeVersionHistory(records.filter((record) => record.id !== recordId));
  renderVersionHistory();
  setStatus(`已删除版本：${target.name}`, 'ok');
}

async function exportVersionExcel(record, triggerButton) {
  triggerButton.disabled = true;
  setStatus(`正在导出历史版本：${record.name}`);
  try {
    const response = await fetch(apiUrl('/api/export-xlsx'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record.project),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || `历史版本 Excel 生成失败：${response.status}`);
    }

    await downloadResponseBlob(response, 'xlsx');
    setStatus(`历史版本 Excel 已生成：${record.name}`, 'ok');
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error');
  } finally {
    triggerButton.disabled = false;
  }
}

function renderVersionHistory() {
  if (!versionList || !versionEmptyState) return;
  const records = readVersionHistory();
  versionList.textContent = '';
  versionEmptyState.hidden = records.length > 0;
  if (versionHistoryCount) versionHistoryCount.textContent = `${records.length} 个版本`;

  records.forEach((record) => {
    const summary = record.summary || getProjectVersionSummary(record.project);
    const card = makeElement('article', 'version-card');
    const head = makeElement('div', 'version-card-head');
    head.append(
      makeElement('strong', '', record.name || '未命名版本'),
      makeElement('span', '', formatVersionTime(record.createdAt)),
    );

    const actions = makeElement('div', 'version-card-actions');
    const restoreBtn = makeElement('button', 'restore-version-btn', '恢复');
    const exportBtn = makeElement('button', 'export-version-btn', '导出 Excel');
    const deleteBtn = makeElement('button', 'delete-version-btn', '删除');
    restoreBtn.type = 'button';
    exportBtn.type = 'button';
    deleteBtn.type = 'button';
    restoreBtn.addEventListener('click', () => restoreVersion(record));
    exportBtn.addEventListener('click', () => exportVersionExcel(record, exportBtn));
    deleteBtn.addEventListener('click', () => deleteVersion(record.id));
    actions.append(restoreBtn, exportBtn, deleteBtn);

    card.append(head, makeVersionMetaChips(summary), actions);
    versionList.append(card);
  });
}

function makePhaseSummaryPill(label, value) {
  const pill = makeElement('span', 'phase-summary-pill');
  pill.append(
    makeElement('span', 'phase-summary-label', label),
    makeElement('strong', '', value),
  );
  return pill;
}

function makeCompactMetric(value) {
  return makeElement('span', 'phase-compact-metric', value);
}

function updateHolidayStat(taskNode, task) {
  const holidayStat = taskNode.querySelector('[data-field="holidaySummary"]');
  if (!holidayStat) return;
  const primaryNode = holidayStat.querySelector('[data-role="holidayPrimary"]');
  const secondaryNode = holidayStat.querySelector('[data-role="holidaySecondary"]');
  const summary = summarizeHolidayRange(task.start, task.end);
  holidayStat.dataset.tone = summary.tone;
  holidayStat.title = summary.title;
  primaryNode.textContent = summary.primary;
  secondaryNode.textContent = summary.secondary;
}

function holidayDaysText(item) {
  return summarizeHolidayRange(item.start, item.end).primary;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setPreviewZoomLabel(zoom) {
  const percent = Math.round(zoom * 100);
  zoomSlider.value = String(clampNumber(percent, Number(zoomSlider.min), Number(zoomSlider.max)));
  zoomValue.textContent = `${percent}%`;
  fitPreviewBtn.classList.toggle('active', previewZoomMode === 'fit');
  if (previewPanel) {
    previewPanel.classList.toggle('fit-mode', previewZoomMode === 'fit');
    previewPanel.classList.toggle('manual-mode', previewZoomMode === 'manual');
  }
}

function applyPreviewZoom() {
  if (!previewCanvas || !ganttPreview) return;
  ganttPreview.style.width = 'max-content';
  const contentWidth = Math.max(ganttPreview.scrollWidth, ganttPreview.offsetWidth);
  const contentHeight = ganttPreview.scrollHeight;
  if (!contentWidth || !contentHeight) return;

  const availableWidth = Math.max(1, previewScroll.clientWidth - 2);
  const availableHeight = Math.max(1, previewScroll.clientHeight - 2);
  const fitZoom = clampNumber(
    Math.min(availableWidth / contentWidth, availableHeight / contentHeight),
    FIT_PREVIEW_MIN_ZOOM,
    ZOOM_MAX,
  );
  const zoom = previewZoomMode === 'fit'
    ? fitZoom
    : clampNumber(manualPreviewZoom, ZOOM_MIN, ZOOM_MAX);

  const scaledWidth = Math.ceil(contentWidth * zoom);
  const scaledHeight = Math.ceil(contentHeight * zoom);
  const offsetX = Math.max(0, Math.floor((availableWidth - scaledWidth) / 2));
  const offsetY = Math.max(0, Math.floor((availableHeight - scaledHeight) / 2));

  currentPreviewZoom = zoom;
  ganttPreview.style.width = `${contentWidth}px`;
  ganttPreview.style.height = `${contentHeight}px`;
  ganttPreview.style.left = `${offsetX}px`;
  ganttPreview.style.top = `${offsetY}px`;
  ganttPreview.style.transform = `scale(${zoom})`;
  previewCanvas.style.width = `${availableWidth}px`;
  previewCanvas.style.height = `${availableHeight}px`;
  previewCanvas.style.minWidth = `${availableWidth}px`;
  previewCanvas.style.minHeight = `${availableHeight}px`;
  setPreviewZoomLabel(zoom);
}

function schedulePreviewZoom() {
  requestAnimationFrame(() => {
    applyPreviewZoom();
    requestAnimationFrame(() => {
      applyPreviewZoom();
      window.setTimeout(applyPreviewZoom, 80);
    });
  });
}

function setManualPreviewZoom(nextZoom) {
  previewZoomMode = 'manual';
  manualPreviewZoom = clampNumber(nextZoom, ZOOM_MIN, ZOOM_MAX);
  applyPreviewZoom();
}

function getTodayIso() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function getProjectTasks() {
  return state.phases.flatMap((phase, phaseIndex) => (
    phase.tasks.map((task, taskIndex) => ({ ...task, phase, phaseIndex, taskIndex }))
  ));
}

function isTaskCompleted(task) {
  return getTaskStatus(task) === '已完成' || normalizeTaskProgress(task) >= 100;
}

function countWorkdaysInclusive(start, end) {
  if (!isIsoDate(start) || !isIsoDate(end) || compareIsoDates(end, start) < 0) return 0;
  return eachIsoDateBetween(start, end).filter((date) => !getHolidayMeta(date)).length;
}

function getProjectTimelineReference(start, end) {
  const today = getTodayIso();
  if (!isIsoDate(start) || !isIsoDate(end)) {
    return { date: '', source: 'empty', label: '暂无项目周期' };
  }

  if (compareIsoDates(today, start) < 0) {
    return { date: start, source: 'planned', label: '计划周期尚未开始' };
  }

  if (compareIsoDates(today, end) > 0) {
    return {
      date: end,
      source: 'ended',
      label: `计划周期已结束于 ${fmtHealthDate(end)}`,
    };
  }

  return {
    date: today,
    source: 'calendar',
    label: `按今日 ${fmtHealthDate(today)} 计算`,
  };
}

function getElapsedProjectDays(start, end, reference) {
  if (!isIsoDate(start) || !isIsoDate(end) || !isIsoDate(reference.date)) return 0;
  const totalDays = daysInclusiveIso(start, end);
  if (reference.source === 'planned') return 0;
  if (reference.source === 'calendar') {
    return clampNumber(daysInclusiveIso(start, reference.date) - 1, 0, totalDays);
  }
  return clampNumber(daysInclusiveIso(start, reference.date), 0, totalDays);
}

function getRemainingProjectDays(start, end, reference) {
  if (!isIsoDate(start) || !isIsoDate(end) || !isIsoDate(reference.date)) return 0;
  if (reference.source === 'planned') return daysInclusiveIso(start, end);
  if (reference.source === 'ended') return 0;
  if (reference.source === 'calendar') return daysInclusiveIso(reference.date, end);
  return 0;
}

function getRemainingWorkdays(start, end, reference) {
  if (!isIsoDate(start) || !isIsoDate(end) || !isIsoDate(reference.date)) return 0;
  const remainingStart = reference.source === 'planned'
    ? start
    : reference.source === 'calendar'
      ? reference.date
      : addDaysIso(reference.date, 1);
  if (!isIsoDate(remainingStart) || compareIsoDates(remainingStart, end) > 0) return 0;
  return countWorkdaysInclusive(remainingStart, end);
}

function getProjectHealthMetrics() {
  const tasks = getProjectTasks();
  const milestones = tasks.filter((task) => task.milestone);
  const completedMilestones = milestones.filter(isTaskCompleted);
  const totalProgress = tasks.length
    ? Math.round(tasks.reduce((sum, task) => sum + normalizeTaskProgress(task), 0) / tasks.length)
    : 0;
  const start = getEarliestPhaseStart();
  const end = getLatestPhaseEnd();
  const totalDays = start && end ? daysInclusiveIso(start, end) : 0;
  const timelineReference = getProjectTimelineReference(start, end);
  const elapsedDays = totalDays ? getElapsedProjectDays(start, end, timelineReference) : 0;
  const remainingDays = totalDays ? getRemainingProjectDays(start, end, timelineReference) : 0;
  const remainingWorkdays = totalDays ? getRemainingWorkdays(start, end, timelineReference) : 0;
  const today = getTodayIso();
  const overdueTasks = tasks.filter((task) => (
    isIsoDate(task.end)
    && compareIsoDates(task.end, today) < 0
    && !isTaskCompleted(task)
  ));

  return {
    totalProgress,
    taskCount: tasks.length,
    phaseCount: state.phases.length,
    overdueCount: overdueTasks.length,
    totalDays,
    elapsedDays,
    remainingDays,
    remainingWorkdays,
    milestoneCount: milestones.length,
    completedMilestoneCount: completedMilestones.length,
    timelineRatio: totalDays ? Math.round(clampNumber((elapsedDays / totalDays) * 100, 0, 100)) : 0,
    timelineLabel: timelineReference.label,
    timelineSource: timelineReference.source,
  };
}

function makeHealthStat(label, value, detail, tone = '') {
  const item = makeElement('div', `health-stat ${tone}`.trim());
  item.append(
    makeElement('span', 'health-label', label),
    makeElement('strong', 'health-value', value),
    makeElement('small', 'health-detail', detail),
  );
  return item;
}

function getProjectHealthTone(metrics) {
  if (metrics.overdueCount > 0) {
    return {
      tone: 'risk',
      label: '存在逾期',
      detail: '优先处理逾期任务',
    };
  }

  if (!metrics.totalDays || metrics.timelineRatio <= 0) {
    return {
      tone: 'ready',
      label: '待启动',
      detail: '计划周期尚未开始',
    };
  }

  if (metrics.totalProgress + 8 < metrics.timelineRatio) {
    return {
      tone: 'watch',
      label: '进度偏慢',
      detail: `进度落后时间 ${metrics.timelineRatio - metrics.totalProgress}%`,
    };
  }

  return {
    tone: 'good',
    label: '节奏正常',
    detail: '当前计划健康运行',
  };
}

function makeHealthPhaseFlow() {
  const flow = makeElement('div', 'health-phase-flow');
  state.phases.forEach((phase, phaseIndex) => {
    const segment = makeElement('span', 'health-phase-segment');
    const progress = getPhaseProgress(phase);
    segment.style.setProperty('--phase-accent', phaseAccents[phaseIndex % phaseAccents.length]);
    segment.style.setProperty('--phase-progress', `${progress}%`);
    segment.title = `${phase.name || `阶段${phaseIndex + 1}`} · ${progress}%`;
    segment.setAttribute('aria-label', segment.title);
    flow.append(segment);
  });
  return flow;
}

function renderProjectStats() {
  projectStats.textContent = '';
  const metrics = getProjectHealthMetrics();
  const healthTone = getProjectHealthTone(metrics);
  const healthNote = document.querySelector('.health-panel-note');
  if (healthNote) {
    healthNote.textContent = healthTone.label;
    healthNote.dataset.tone = healthTone.tone;
  }

  const dashboard = makeElement('section', 'health-dashboard');
  dashboard.dataset.tone = healthTone.tone;
  dashboard.style.setProperty('--progress-ratio', `${metrics.totalProgress}%`);
  dashboard.style.setProperty('--timeline-ratio', `${metrics.timelineRatio}%`);

  const makeBar = (className, value) => {
    const bar = makeElement('span', `health-bar ${className}`.trim());
    const fill = makeElement('i', '');
    fill.style.width = `${clampNumber(value, 0, 100)}%`;
    bar.append(fill);
    return bar;
  };

  const lag = Math.max(0, metrics.timelineRatio - metrics.totalProgress);
  const paceHint = healthTone.tone === 'risk'
    ? `存在 ${metrics.overdueCount} 项逾期任务，请优先处理。`
    : healthTone.tone === 'watch'
      ? `进度落后于时间消耗 ${lag}%，建议优先推进当前阶段关键任务。`
      : healthTone.tone === 'ready'
        ? '计划周期尚未开始，可先完善阶段与任务排期。'
        : '进度与时间消耗匹配，当前节奏正常。';

  const progressCard = makeElement('article', 'health-card health-compare-card');
  progressCard.append(makeElement('h3', '', '进度对比'));
  const progressRow = makeElement('div', 'bar-row');
  progressRow.append(
    makeElement('span', '', '任务进度'),
    makeBar('', metrics.totalProgress),
    makeElement('strong', '', `${metrics.totalProgress}%`),
  );
  const timeRow = makeElement('div', 'bar-row');
  timeRow.append(
    makeElement('span', '', '时间消耗'),
    makeBar('time', metrics.timelineRatio),
    makeElement('strong', '', `${metrics.timelineRatio}%`),
  );
  progressCard.append(
    progressRow,
    timeRow,
    makeElement('div', 'health-hint', paceHint),
  );

  const remainingCard = makeElement('article', 'health-card health-metric-card');
  const remainingCopy = makeElement('div', 'health-metric-copy');
  remainingCopy.append(
    makeElement('h3', '', '剩余工期'),
    makeElement('div', 'health-metric-value', `${metrics.remainingDays} 天`),
    makeElement('div', 'health-metric-sub', `总 ${metrics.totalDays || '-'} 天 · 已过 ${metrics.elapsedDays} 天 · 剩 ${metrics.remainingDays} 天`),
  );
  remainingCard.append(
    remainingCopy,
    makeElement('span', 'metric-badge', `${metrics.remainingWorkdays} 个有效工作日`),
  );

  const milestonePercent = metrics.milestoneCount
    ? Math.round((metrics.completedMilestoneCount / metrics.milestoneCount) * 100)
    : 0;
  const milestoneCard = makeElement('article', 'health-card health-milestone-card');
  const milestoneValue = makeElement('div', 'milestone-value-row');
  milestoneValue.append(
    makeElement('strong', 'milestone-ratio', metrics.milestoneCount ? `${metrics.completedMilestoneCount}/${metrics.milestoneCount}` : '暂无'),
    makeElement('span', 'milestone-percent', metrics.milestoneCount ? `${milestonePercent}%` : '0%'),
  );
  const milestoneTrack = makeElement('div', 'milestone-track');
  const milestoneFill = makeElement('i', '');
  milestoneFill.style.width = `${milestonePercent}%`;
  milestoneTrack.append(milestoneFill);
  milestoneCard.append(
    makeElement('h3', '', '里程碑达成'),
    milestoneValue,
    milestoneTrack,
    makeElement('div', 'health-metric-sub', metrics.milestoneCount ? '需要加快后续里程碑关闭节奏' : '暂无里程碑'),
  );

  const overdueCard = makeElement('article', 'health-card health-metric-card overdue-card');
  const overdueCopy = makeElement('div', 'health-metric-copy');
  overdueCopy.append(
    makeElement('h3', '', '逾期任务'),
    makeElement('div', 'health-metric-value', `${metrics.overdueCount} 项`),
    makeElement('div', 'health-metric-sub', metrics.overdueCount ? '存在逾期风险' : '当前无逾期风险'),
  );
  overdueCard.append(
    overdueCopy,
    makeElement('span', metrics.overdueCount ? 'overdue-risk' : 'overdue-ok', metrics.overdueCount ? '需处理' : '无风险'),
  );

  dashboard.append(progressCard, remainingCard, milestoneCard, overdueCard);
  projectStats.append(dashboard);
}

function renderRightPane() {
  renderPreview();
}

function durationText(item) {
  const days = daysInclusiveIso(item.start, item.end);
  if (!days) return '';
  return item.kind === 'phase'
    ? `${Math.ceil(days / 7)}周（${fmtMd(item.start)}-${fmtMd(item.end)}）`
    : `${days}天（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
}

function renderPreviewBar(track, item, projectStartValue) {
  if (!isIsoDate(item.start) || !isIsoDate(item.end)) return;
  const dayOffset = getPreviewDayOffset(item.start, projectStartValue);
  const durationDays = daysInclusiveIso(item.start, item.end);
  const pointPx = item.milestone ? getPreviewMilestonePointPx(item, projectStartValue) : null;
  const drawAsMilestonePoint = item.kind === 'sub' && item.milestone && durationDays === 1;
  const barWidthPx = drawAsMilestonePoint
    ? PREVIEW_MILESTONE_MARKER_WIDTH
    : getPreviewDurationPx(dayOffset, durationDays);
  const leftPx = drawAsMilestonePoint
    ? pointPx - barWidthPx
    : getPreviewTimelinePx(dayOffset);
  const color = phaseAccents[item.phaseIndex % phaseAccents.length];

  const shell = document.createElement('span');
  shell.className = 'preview-bar-shell';
  shell.style.left = `${leftPx}px`;
  shell.style.width = `${barWidthPx}px`;

  const fill = document.createElement('span');
  fill.className = 'preview-bar-fill';
  fill.style.width = `${barWidthPx}px`;
  fill.style.setProperty('--bar-color', color);
  fill.title = item.kind === 'sub' ? getTaskStatus(item) : `阶段完成度 ${normalizeProgress(item.progress)}%`;
  shell.append(fill);
  track.append(shell);

  if (item.kind === 'sub' && item.milestone) {
    const defaultGapPx = PREVIEW_MILESTONE_BAR_TO_STAR_GAP;
    const markerGapPx = Number.isFinite(item.markerGapPx) ? item.markerGapPx : defaultGapPx;
    const marker = document.createElement('span');
    marker.className = 'preview-milestone';
    marker.style.left = `${(pointPx ?? leftPx + barWidthPx) + markerGapPx}px`;
    marker.style.gap = `${PREVIEW_MILESTONE_STAR_TO_TEXT_GAP}px`;
    const star = document.createElement('span');
    star.className = 'preview-milestone-star';
    star.textContent = '★';
    const label = document.createElement('span');
    label.className = 'preview-milestone-label';
    label.textContent = `${item.name} (${fmtMd(item.end)})`;
    marker.append(star, label);
    track.append(marker);
  }
}

function renderPreview() {
  const range = getPreviewRange();
  if (!ganttPreview) return;
  ganttPreview.textContent = '';
  if (!range) {
    ganttPreview.append(makePreviewCell('preview-empty', '请先录入项目阶段日期。'));
    return;
  }

  const { projectStartValue, totalWeeks } = range;
  const rows = getPreviewRows();
  ganttPreview.style.gridTemplateColumns = `250px 160px repeat(${totalWeeks}, ${PREVIEW_WEEK_WIDTH}px)`;

  ganttPreview.append(makePreviewCell('preview-head-cell preview-phase-head', '项目阶段', '1', '1 / 4'));
  ganttPreview.append(makePreviewCell('preview-head-cell preview-duration-head', '用时', '2', '1 / 4'));

  getMonthBands(projectStartValue, totalWeeks).forEach((band) => {
    ganttPreview.append(makePreviewCell(
      'preview-month',
      band.label,
      `${band.fromWeek + 2} / span ${band.toWeek - band.fromWeek + 1}`,
      '1',
    ));
  });

  for (let weekIndex = 1; weekIndex <= totalWeeks; weekIndex += 1) {
    const weekStart = addDaysIso(projectStartValue, (weekIndex - 1) * 7);
    const weekEnd = addDaysIso(weekStart, 6);
    const gridColumn = `${weekIndex + 2}`;
    ganttPreview.append(makePreviewCell('preview-week', `W${weekIndex}`, gridColumn, '2'));
    ganttPreview.append(makePreviewCell('preview-date', `${fmtMd(weekStart)}-${fmtMd(weekEnd)}`, gridColumn, '3'));
  }

  rows.forEach((item, index) => {
    const gridRow = `${index + 4}`;
    const isPhase = item.kind === 'phase';
    const color = phaseAccents[item.phaseIndex % phaseAccents.length];
    const rowClass = isPhase ? ' preview-row-phase' : '';
    const focusClass = isPhase && focusedPhaseIndex === item.phaseIndex ? ' preview-row-focused' : '';
    const displayName = isPhase ? item.name : `· ${item.name}`;
    const nameCell = makePreviewCell(`preview-name${rowClass}${focusClass}`, displayName, '1', gridRow);
    const durationCell = makePreviewCell(`preview-duration${rowClass}${focusClass}`, durationText(item), '2', gridRow);
    const track = makePreviewCell(`preview-track${rowClass}${focusClass}`, '', `3 / span ${totalWeeks}`, gridRow);
    nameCell.style.setProperty('--phase-accent', color);
    durationCell.style.setProperty('--phase-accent', color);
    track.style.setProperty('--phase-accent', color);
    renderPreviewBar(track, item, projectStartValue);
    ganttPreview.append(nameCell, durationCell, track);
  });
  schedulePreviewZoom();
}

function getEarliestPhaseStart() {
  return minIsoDate(state.phases.map((phase) => phase.start));
}

function getLatestPhaseEnd() {
  return state.phases.reduce((latest, phase) => {
    const phaseEnd = isIsoDate(phase.end) ? phase.end : phase.start;
    if (!isIsoDate(phaseEnd)) return latest;
    if (!isIsoDate(latest)) return phaseEnd;
    return compareIsoDates(phaseEnd, latest) > 0 ? phaseEnd : latest;
  }, '');
}

function getNewPhaseDates() {
  const latestEnd = getLatestPhaseEnd();
  const start = isIsoDate(latestEnd) ? addDaysIso(latestEnd, 1) : '2026-09-01';
  return {
    start,
    end: addDaysIso(start, DEFAULT_PHASE_DAYS),
  };
}

function syncProjectStart() {
  state.projectStart = getEarliestPhaseStart();
}

function normalizePhaseDates(phase) {
  if (isIsoDate(phase.start) && isIsoDate(phase.end) && compareIsoDates(phase.end, phase.start) < 0) {
    phase.end = phase.start;
  }
}

function getDefaultTaskEnd(start, phase) {
  return clampIsoDate(addDaysIso(start, DEFAULT_TASK_DAYS), start, phase.end);
}

function getNewTaskDates(phase) {
  const latestTaskEnd = maxIsoDate((Array.isArray(phase.tasks) ? phase.tasks : [])
    .map((task) => task.end || task.start));
  const phaseStart = phase.start || new Date().toISOString().slice(0, 10);
  const baseStart = latestTaskEnd ? addDaysIso(latestTaskEnd, 1) : phaseStart;
  const start = clampIsoDate(baseStart, phase.start, phase.end);
  return {
    start,
    end: getDefaultTaskEnd(start, phase),
  };
}

function normalizeTaskDates(phase) {
  normalizePhaseDates(phase);
  phase.tasks.forEach((task) => {
    if (isIsoDate(task.start)) {
      task.start = clampIsoDate(task.start, phase.start, phase.end);
    } else if (isIsoDate(phase.start)) {
      task.start = phase.start;
    }

    if (isIsoDate(task.start) && !task.end) {
      task.end = getDefaultTaskEnd(task.start, phase);
    }

    if (task.endTouched === false && isIsoDate(task.start)) {
      task.end = getDefaultTaskEnd(task.start, phase);
    }

    if (isIsoDate(task.end)) {
      task.end = clampIsoDate(task.end, phase.start, phase.end);
    }

    if (isIsoDate(task.start) && isIsoDate(task.end) && compareIsoDates(task.end, task.start) < 0) {
      task.end = task.start;
    }
  });
  sortTasksByStart(phase);
}

function updateProjectFields() {
  state.title = state.title || DEFAULT_TITLE;
  syncProjectStart();
  renderRightPane();
}

function bindInput(input, getter, setter, afterInput = () => {}) {
  input.value = getter() || '';
  input.addEventListener('input', () => {
    setter(input.type === 'checkbox' ? input.checked : input.value);
    afterInput();
  });
}

function focusPhase(phaseIndex) {
  if (!Number.isInteger(phaseIndex) || !state.phases[phaseIndex]) return;
  focusedPhaseIndex = phaseIndex;
  expandedPhaseIndexes.add(phaseIndex);
  render();
  requestAnimationFrame(() => {
    phaseList.querySelector(`[data-phase-index="${phaseIndex}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  });
  if (focusPhaseTimer) window.clearTimeout(focusPhaseTimer);
  focusPhaseTimer = window.setTimeout(() => {
    if (focusedPhaseIndex !== phaseIndex) return;
    focusedPhaseIndex = null;
    render();
  }, 1800);
}

function render() {
  state.phases.forEach(normalizeTaskDates);
  syncProjectStart();
  state.title = state.title || DEFAULT_TITLE;
  if (!isBreakdownTargetValid()) {
    breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
  }
  phaseList.textContent = '';
  renderProjectStats();

  state.phases.forEach((phase, phaseIndex) => {
    const phaseNode = phaseTemplate.content.firstElementChild.cloneNode(true);
    const isExpanded = expandedPhaseIndexes.has(phaseIndex);
    const phaseHasOpenBreakdown = breakdownOpen.phaseIndex === phaseIndex;
    const milestoneCount = phase.tasks.filter((task) => task.milestone).length;
    const phaseProgress = getPhaseProgress(phase);
    phaseNode.dataset.phaseIndex = String(phaseIndex);
    phaseNode.style.setProperty('--phase-accent', phaseAccents[phaseIndex % phaseAccents.length]);
    phaseNode.classList.toggle('collapsed', !isExpanded);
    phaseNode.classList.toggle('expanded', isExpanded);
    phaseNode.classList.toggle('has-open-breakdown', phaseHasOpenBreakdown);
    phaseNode.classList.toggle('phase-focused', focusedPhaseIndex === phaseIndex);
    phaseNode.querySelector('.phase-index').textContent = `P${phaseIndex + 1}`;

    const compactSummary = phaseNode.querySelector('.phase-compact-summary');
    compactSummary.append(
      makeElement('strong', 'phase-compact-name', phase.name || `阶段 ${phaseIndex + 1}`),
      makeElement('span', 'phase-compact-date', phase.start && phase.end ? `${phase.start} - ${phase.end}` : '-'),
      makeCompactMetric(`${phase.tasks.length} 项`),
      makeCompactMetric(`完成 ${phaseProgress}%`),
      makeCompactMetric(`${milestoneCount} 个里程碑`),
    );

    const toggleButton = phaseNode.querySelector('.phase-toggle');
    toggleButton.textContent = isExpanded ? '收起' : '展开';
    toggleButton.setAttribute('aria-expanded', String(isExpanded));
    toggleButton.addEventListener('click', () => {
      if (expandedPhaseIndexes.has(phaseIndex)) {
        expandedPhaseIndexes.delete(phaseIndex);
      } else {
        expandedPhaseIndexes.add(phaseIndex);
      }
      render();
    });

    const phaseSummary = phaseNode.querySelector('.phase-summary');
    phaseSummary.append(
      makePhaseSummaryPill('周期', phase.start && phase.end ? `${phase.start} - ${phase.end}` : '-'),
      makePhaseSummaryPill('完成度', `${phaseProgress}%`),
      makePhaseSummaryPill('任务', `${phase.tasks.length} 项`),
      makePhaseSummaryPill('里程碑', `${milestoneCount} 个`),
    );

    phaseNode.querySelectorAll('.phase-fields input').forEach((input) => {
      const field = input.dataset.field;
      if (field === 'start' || field === 'end') {
        input.value = phase[field] || '';
        input.addEventListener('input', () => {
          phase[field] = input.value;
          syncProjectStart();
          renderProjectStats();
          renderRightPane();
        });
        input.addEventListener('change', () => {
          phase[field] = input.value;
          normalizeTaskDates(phase);
          render();
        });
      } else {
        bindInput(input, () => phase[field], (value) => {
          phase[field] = value;
        }, renderRightPane);
      }
    });

    phaseNode.querySelector('.delete-phase').addEventListener('click', () => {
      state.phases.splice(phaseIndex, 1);
      expandedPhaseIndexes = new Set([...expandedPhaseIndexes]
        .filter((index) => index !== phaseIndex)
        .map((index) => (index > phaseIndex ? index - 1 : index)));
      if (focusedPhaseIndex === phaseIndex) {
        focusedPhaseIndex = null;
      } else if (focusedPhaseIndex > phaseIndex) {
        focusedPhaseIndex -= 1;
      }
      render();
    });

    const taskList = phaseNode.querySelector('.task-list');
    phase.tasks.forEach((task, taskIndex) => {
      const taskNode = taskTemplate.content.firstElementChild.cloneNode(true);
      const taskBreakdownOpen = isBreakdownOpen(phaseIndex, taskIndex);
      taskNode.classList.toggle('task-row-breakdown-open', taskBreakdownOpen);
      updateHolidayStat(taskNode, task);
      const computedStatus = getTaskStatus(task);
      task.status = computedStatus;
      task.progress = normalizeTaskProgress(task);
      taskNode.querySelectorAll('input, select').forEach((input) => {
        const field = input.dataset.field;
        if (field === 'milestone') {
          input.checked = Boolean(task.milestone);
          input.addEventListener('change', () => {
            task.milestone = input.checked;
            render();
          });
        } else if (field === 'start') {
          input.min = phase.start || '';
          input.max = phase.end || '';
          input.value = task.start || '';
          input.addEventListener('input', () => {
            task.start = clampIsoDate(input.value, phase.start, phase.end);
            if (input.value !== task.start) input.value = task.start;
            if (task.endTouched === false) {
              task.end = getDefaultTaskEnd(task.start, phase);
            } else {
              task.end = clampIsoDate(task.end, task.start, phase.end);
            }
            updateHolidayStat(taskNode, task);
            renderProjectStats();
            renderRightPane();
          });
          input.addEventListener('change', () => {
            task.start = clampIsoDate(input.value, phase.start, phase.end);
            if (task.endTouched === false) {
              task.end = getDefaultTaskEnd(task.start, phase);
            } else {
              task.end = clampIsoDate(task.end, task.start, phase.end);
            }
            sortTasksByStart(phase);
            render();
          });
        } else if (field === 'end') {
          input.min = maxIsoDate([phase.start, task.start]);
          input.max = phase.end || '';
          input.value = task.end || '';
          input.addEventListener('input', () => {
            task.end = clampIsoDate(input.value, maxIsoDate([phase.start, task.start]), phase.end);
            if (input.value !== task.end) input.value = task.end;
            task.endTouched = true;
            updateHolidayStat(taskNode, task);
            renderProjectStats();
            renderRightPane();
          });
          input.addEventListener('change', () => {
            task.end = clampIsoDate(input.value, maxIsoDate([phase.start, task.start]), phase.end);
            task.endTouched = true;
            render();
          });
        } else if (field === 'status') {
          input.value = computedStatus;
          input.style.setProperty('--status-color', taskStatusColor(computedStatus));
          input.addEventListener('change', () => {
            task.status = normalizeTaskStatus(input.value);
            task.progress = defaultProgressForStatus(task.status);
            input.style.setProperty('--status-color', taskStatusColor(task.status));
            renderProjectStats();
            renderRightPane();
          });
        } else {
          bindInput(input, () => task[field], (value) => {
            task[field] = value;
          }, renderRightPane);
        }
      });
      taskNode.querySelector('.delete-task').addEventListener('click', () => {
        phase.tasks.splice(taskIndex, 1);
        render();
      });
      const breakdownBtn = taskNode.querySelector('.breakdown-btn');
      if (breakdownBtn) {
        const subtaskCount = Array.isArray(task.subtasks) ? task.subtasks.length : 0;
        breakdownBtn.textContent = taskBreakdownOpen ? '收起' : (subtaskCount ? `拆解 ${subtaskCount}` : '任务拆解');
        breakdownBtn.setAttribute('aria-expanded', String(taskBreakdownOpen));
        breakdownBtn.addEventListener('click', () => openBreakdown(phaseIndex, taskIndex));
      }
      taskList.append(taskNode);
      if (taskBreakdownOpen) {
        taskList.append(renderBreakdownPanel(phaseIndex, taskIndex));
      }
    });

    phaseNode.querySelector('.add-task').addEventListener('click', () => {
      const { start, end } = getNewTaskDates(phase);
      phase.tasks.push({
        name: '新任务',
        start,
        end,
        status: '未开始',
        progress: 0,
        endTouched: false,
        milestone: false,
      });
      expandedPhaseIndexes.add(phaseIndex);
      sortTasksByStart(phase);
      render();
    });

    phaseList.append(phaseNode);
  });
  renderRightPane();
}

function toPayload() {
  updateProjectFields();
  return {
    title: state.title,
    projectStart: getEarliestPhaseStart() || undefined,
    phases: state.phases.map((phase) => ({
      name: phase.name,
      start: phase.start,
      end: phase.end,
      progress: getPhaseProgress(phase),
      tasks: phase.tasks.map((task) => ({
        name: task.name,
        start: task.start,
        end: task.end,
        status: getTaskStatus(task),
        progress: normalizeTaskProgress(task),
        milestone: Boolean(task.milestone),
        markerGapPx: task.markerGapPx,
        subtasks: (Array.isArray(task.subtasks) ? task.subtasks : []).map((st) => ({
          name: String(st.name || '').trim(),
          start: st.start || task.start || '',
          end: st.end || task.end || '',
          status: subtaskStatuses.includes(st.status) ? st.status : '未开始',
          ownerClient: String(st.ownerClient || '').trim(),
          ownerVendor: String(st.ownerVendor || '').trim(),
          priority: subtaskPriorities.includes(st.priority) ? st.priority : '中',
          deps: Array.isArray(st.deps) ? st.deps : [],
        })),
      })),
    })),
  };
}

function normalizeImportedProject(project) {
  const phases = Array.isArray(project?.phases) ? project.phases : [];
  if (!phases.length) throw new Error('Excel 中没有可导入的项目阶段');
  const imported = {
    title: String(project.title || '甘特图 - 项目进度计划表（周视图）').trim(),
    projectStart: project.projectStart || '',
    phases: phases.map((phase, phaseIndex) => ({
      name: String(phase.name || `阶段 ${phaseIndex + 1}`).trim(),
      start: phase.start || '',
      end: phase.end || '',
      tasks: (Array.isArray(phase.tasks) ? phase.tasks : []).map((task, taskIndex) => ({
        name: String(task.name || `任务 ${taskIndex + 1}`).trim(),
        start: task.start || phase.start || '',
        end: task.end || task.start || phase.end || '',
        status: getTaskStatus(task),
        progress: normalizeTaskProgress(task),
        milestone: Boolean(task.milestone),
        markerGapPx: task.markerGapPx,
        subtasks: (Array.isArray(task.subtasks) ? task.subtasks : []).map((st) => ({
          name: String(st.name || '').trim(),
          start: st.start || task.start || '',
          end: st.end || task.end || '',
          status: subtaskStatuses.includes(st.status) ? st.status : '未开始',
          ownerClient: String(st.ownerClient || '').trim(),
          ownerVendor: String(st.ownerVendor || '').trim(),
          priority: subtaskPriorities.includes(st.priority) ? st.priority : '中',
          deps: Array.isArray(st.deps) ? st.deps : [],
        })),
      })),
    })),
  };
  imported.phases.forEach((phase) => {
    phase.tasks.forEach((task) => {
      task.subtasks.forEach((subtask) => {
        ensureSubtaskDefaults(subtask, task);
        normalizeSubtaskDates(subtask, task);
      });
    });
    normalizeTaskDates(phase);
  });
  return imported;
}

function applyImportedProject(project) {
  state = normalizeImportedProject(project);
  breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
  focusedPhaseIndex = null;
  if (focusPhaseTimer) window.clearTimeout(focusPhaseTimer);
  focusPhaseTimer = null;
  expandedPhaseIndexes = new Set(state.phases.map((_, index) => index));
  previewZoomMode = 'fit';
  render();
  requestAnimationFrame(() => applyPreviewZoom());
}

function getProjectTaskCount(project = state) {
  return project.phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
}

function validateExcelFile(file) {
  if (!file) throw new Error('请选择需要导入的 Excel 文件');
  if (!/\.xlsx$/i.test(file.name || '')) throw new Error('请导入从本工具导出的 .xlsx 文件');
}

async function importExcel(file) {
  try {
    validateExcelFile(file);
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error');
    if (importExcelInput) importExcelInput.value = '';
    return;
  }

  setExcelImporting(true);
  setStatus(excelImportLabels.status);

  try {
    const response = await fetch(apiUrl('/api/import-xlsx'), {
      method: 'POST',
      headers: {
        'Content-Type': file.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      body: await file.arrayBuffer(),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || `Excel 导入失败：${response.status}`);
    }

    applyImportedProject(payload.project || payload);
    setStatus(`${excelImportLabels.done} 共 ${state.phases.length} 个阶段、${getProjectTaskCount()} 项任务。`, 'ok');
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error');
  } finally {
    setExcelImporting(false);
    if (importExcelInput) importExcelInput.value = '';
  }
}

async function exportExcel() {
  setExcelExporting(true);
  setStatus(excelExportLabels.status);

  try {
    const response = await fetch(apiUrl('/api/export-xlsx'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toPayload()),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || `Excel 生成失败：${response.status}`);
    }

    await downloadResponseBlob(response, 'xlsx');
    setStatus(excelExportLabels.done, 'ok');
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error');
  } finally {
    setExcelExporting(false);
  }
}

async function exportImage() {
  setImageExporting(true);
  setStatus(imageExportLabels.status);

  try {
    const response = await fetch(apiUrl('/api/export-png'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toPayload()),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || `图片生成失败：${response.status}`);
    }

    await downloadResponseBlob(response, 'png');
    setStatus(imageExportLabels.done, 'ok');
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error');
  } finally {
    setImageExporting(false);
  }
}

function closeIoMenu() {
  if (!ioMenu || !ioMenuBtn) return;
  ioMenu.classList.remove('open');
  ioMenuBtn.setAttribute('aria-expanded', 'false');
}

function toggleIoMenu() {
  if (!ioMenu || !ioMenuBtn) return;
  const isOpen = ioMenu.classList.toggle('open');
  ioMenuBtn.setAttribute('aria-expanded', String(isOpen));
}

document.querySelector('#addPhaseBtn').addEventListener('click', () => {
  const { start, end } = getNewPhaseDates();
  state.phases.push({
    name: '新阶段',
    start,
    end,
    tasks: [{ name: '新任务', start, end, status: '未开始', progress: 0, milestone: false }],
  });
  focusPhase(state.phases.length - 1);
});

document.querySelector('#clearBtn').addEventListener('click', () => {
  state = {
    title: state.title || defaultProject.title,
    projectStart: '',
    phases: [],
  };
  focusedPhaseIndex = null;
  if (focusPhaseTimer) window.clearTimeout(focusPhaseTimer);
  focusPhaseTimer = null;
  expandedPhaseIndexes.clear();
  previewZoomMode = 'fit';
  render();
  setStatus('已清空计划，可重新添加阶段。', 'ok');
});

document.querySelector('#resetBtn').addEventListener('click', () => {
  state = structuredClone(defaultProject);
  focusedPhaseIndex = null;
  if (focusPhaseTimer) window.clearTimeout(focusPhaseTimer);
  focusPhaseTimer = null;
  expandedPhaseIndexes.clear();
  render();
  setStatus('已恢复示例数据。');
});

if (ioMenuBtn) ioMenuBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleIoMenu();
});
if (ioMenuPanel) ioMenuPanel.addEventListener('click', (event) => event.stopPropagation());
document.addEventListener('click', (event) => {
  if (!ioMenu?.classList.contains('open')) return;
  if (event.target instanceof Node && ioMenu.contains(event.target)) return;
  closeIoMenu();
});
if (importExcelBtn && importExcelInput) {
  importExcelBtn.addEventListener('click', () => {
    closeIoMenu();
    importExcelInput.click();
  });
  importExcelInput.addEventListener('change', () => importExcel(importExcelInput.files?.[0]));
}
if (saveVersionBtn) saveVersionBtn.addEventListener('click', () => saveCurrentVersion());
if (versionHistoryBtn) versionHistoryBtn.addEventListener('click', openVersionHistory);
if (drawerSaveVersionBtn) drawerSaveVersionBtn.addEventListener('click', () => saveCurrentVersion(versionNameInput?.value));
if (closeVersionHistoryBtn) closeVersionHistoryBtn.addEventListener('click', closeVersionHistory);
if (versionHistoryBackdrop) versionHistoryBackdrop.addEventListener('click', closeVersionHistory);
if (exportExcelBtn) exportExcelBtn.addEventListener('click', () => {
  closeIoMenu();
  exportExcel();
});
if (exportImageBtn) exportImageBtn.addEventListener('click', () => {
  closeIoMenu();
  exportImage();
});

// Gantt modal open/close
function openGanttModal() {
  if (!ganttModal) return;
  ganttModal.classList.add('open');
  ganttModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('gantt-modal-visible');
  renderRightPane();
  requestAnimationFrame(() => applyPreviewZoom());
}
function closeGanttModal() {
  if (!ganttModal) return;
  ganttModal.classList.remove('open');
  ganttModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('gantt-modal-visible');
}
if (previewGanttBtn) previewGanttBtn.addEventListener('click', openGanttModal);
if (ganttModal) {
  const modalCloseBtn = ganttModal.querySelector('.gantt-modal-close');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeGanttModal);
  const modalBackdrop = ganttModal.querySelector('.gantt-modal-backdrop');
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeGanttModal);
}
// ESC key closes modal
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    if (ioMenu && ioMenu.classList.contains('open')) closeIoMenu();
    else if (versionHistoryDrawer && versionHistoryDrawer.classList.contains('open')) closeVersionHistory();
    else if (ganttModal && ganttModal.classList.contains('open')) closeGanttModal();
    else if (isBreakdownTargetValid()) closeBreakdown();
  }
});

if (fitPreviewBtn) fitPreviewBtn.addEventListener('click', () => {
  previewZoomMode = 'fit';
  applyPreviewZoom();
});
if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => setManualPreviewZoom(currentPreviewZoom - ZOOM_STEP));
if (zoomInBtn) zoomInBtn.addEventListener('click', () => setManualPreviewZoom(currentPreviewZoom + ZOOM_STEP));
if (zoomSlider) zoomSlider.addEventListener('input', () => setManualPreviewZoom(Number(zoomSlider.value) / 100));
window.addEventListener('resize', () => {
  if (previewZoomMode === 'fit') applyPreviewZoom();
});

registerCodeFingerprint();
render();
