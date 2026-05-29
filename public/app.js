/* Code Fingerprint: Caius | Project Gantt Builder | 2026 | CGFB-2026-N7Q4-X1K8 | ORIGINAL-WORK | INTERNAL-USE-ONLY */

const defaultProject = {
  title: '甘特图 - 项目进度计划表（周视图）',
  projectStart: '2026-09-01',
  phases: [
    {
      name: '示例阶段1',
      start: '2026-09-01',
      end: '2026-09-15',
      progress: 100,
      tasks: [
        { name: '阶段1-示例任务1', start: '2026-09-01', end: '2026-09-03', status: '已完成' },
        { name: '阶段1-示例任务2', start: '2026-09-04', end: '2026-09-08', status: '已完成' },
        { name: '阶段1-示例任务3', start: '2026-09-09', end: '2026-09-15', status: '已完成' },
        { name: '示例里程碑', start: '2026-09-15', end: '2026-09-15', status: '已完成', milestone: true },
      ],
    },
    {
      name: '示例阶段2',
      start: '2026-09-16',
      end: '2026-10-10',
      progress: 65,
      tasks: [
        { name: '阶段2-示例任务1', start: '2026-09-16', end: '2026-09-30', status: '进行中' },
        { name: '阶段2-示例任务2', start: '2026-09-16', end: '2026-09-23', status: '已完成' },
        { name: '阶段2-示例任务3', start: '2026-09-20', end: '2026-09-27', status: '进行中' },
        { name: '阶段2-示例任务4', start: '2026-09-30', end: '2026-10-09', status: '未开始' },
        { name: '示例里程碑', start: '2026-10-10', end: '2026-10-10', status: '未开始', milestone: true },
      ],
    },
    {
      name: '示例阶段3',
      start: '2026-10-11',
      end: '2026-10-30',
      progress: 25,
      tasks: [
        { name: '阶段3-示例任务1', start: '2026-10-11', end: '2026-10-18', status: '进行中' },
        { name: '阶段3-示例任务2', start: '2026-10-13', end: '2026-10-22', status: '未开始' },
        { name: '阶段3-示例任务3', start: '2026-10-19', end: '2026-10-29', status: '未开始' },
        { name: '示例里程碑', start: '2026-10-30', end: '2026-10-30', status: '未开始', milestone: true },
      ],
    },
    {
      name: '示例阶段4',
      start: '2026-10-31',
      end: '2026-11-14',
      progress: 0,
      tasks: [
        { name: '阶段4-示例任务1', start: '2026-10-31', end: '2026-11-03', status: '未开始' },
        { name: '阶段4-示例任务2', start: '2026-11-03', end: '2026-11-08', status: '未开始' },
        { name: '阶段4-示例任务3', start: '2026-11-05', end: '2026-11-12', status: '未开始' },
        { name: '阶段4-示例任务4', start: '2026-11-10', end: '2026-11-13', status: '未开始' },
        { name: '示例里程碑', start: '2026-11-14', end: '2026-11-14', status: '未开始', milestone: true },
      ],
    },
    {
      name: '示例阶段5',
      start: '2026-11-15',
      end: '2026-12-31',
      progress: 0,
      tasks: [
        { name: '阶段5-示例任务1', start: '2026-11-15', end: '2026-12-30', status: '未开始' },
        { name: '示例里程碑', start: '2026-12-31', end: '2026-12-31', status: '未开始', milestone: true },
      ],
    },
  ],
};

let state = structuredClone(defaultProject);

const API_BASE = String(window.LITEGANTT_API_BASE || '').replace(/\/+$/, '');
const phaseAccents = ['#116acb', '#13a8c8', '#16a272', '#5f6df1', '#8b5cf6', '#d89419', '#e11d48'];
const taskStatuses = ['未开始', '进行中', '已完成', '延期', '暂停'];
const DEFAULT_PHASE_DAYS = 14;
const DEFAULT_TASK_DAYS = 7;
const PREVIEW_WEEK_WIDTH = 72;
const PREVIEW_MAX_WEEKS = 30;
const ZOOM_MIN = 0.2;
const ZOOM_MAX = 1.4;
const ZOOM_STEP = 0.05;
const READ_PREVIEW_ZOOM = 0.9;
const FIT_PREVIEW_MIN_ZOOM = 0.08;
const CODE_FINGERPRINT = Object.freeze({
  author: 'Caius',
  project: 'Project Gantt Builder',
  year: '2026',
  id: 'CGFB-2026-N7Q4-X1K8',
  keywords: 'ORIGINAL-WORK|INTERNAL-USE-ONLY|WRITTEN-AUTHORIZATION-REQUIRED',
});

const phaseList = document.querySelector('#phaseList');
const previewPanel = document.querySelector('.preview-panel');
const previewScroll = document.querySelector('.preview-scroll');
const previewCanvas = document.querySelector('#previewCanvas');
const ganttPreview = document.querySelector('#ganttPreview');
const projectOverview = document.querySelector('#projectOverview');
const projectStats = document.querySelector('#projectStats');
const DEFAULT_TITLE = '甘特图 - 项目进度计划表（周视图）';
const statusBox = document.querySelector('#statusBox');
const phaseTemplate = document.querySelector('#phaseTemplate');
const taskTemplate = document.querySelector('#taskTemplate');
const generateBtn = document.querySelector('#generateBtn');
const imageBtn = document.querySelector('#imageBtn');
const importBtn = document.querySelector('#importBtn');
const importFile = document.querySelector('#importFile');
const fitPreviewBtn = document.querySelector('#fitPreviewBtn');
const readPreviewBtn = document.querySelector('#readPreviewBtn');
const zoomOutBtn = document.querySelector('#zoomOutBtn');
const zoomInBtn = document.querySelector('#zoomInBtn');
const zoomSlider = document.querySelector('#zoomSlider');
const zoomValue = document.querySelector('#zoomValue');

let previewZoomMode = 'fit';
let manualPreviewZoom = 1;
let currentPreviewZoom = 1;
let expandedPhaseIndexes = new Set();
let focusedPhaseIndex = null;
let focusPhaseTimer = null;

const formatLabels = {
  xlsx: { action: '生成 Excel', busy: '生成中...', done: '已生成并开始下载 Excel。', status: '正在生成 Excel，请稍候。' },
  png: { action: '生成图片', busy: '生成中...', done: '已生成并开始下载图片。', status: '正在生成图片，请稍候。' },
};

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

function getPreviewRange() {
  const projectStartValue = getEarliestPhaseStart();
  const allDates = getAllPreviewDates();
  const projectEndValue = maxIsoDate(allDates);
  if (!projectStartValue || !projectEndValue) return null;
  const totalWeeks = Math.min(
    PREVIEW_MAX_WEEKS,
    Math.max(4, Math.ceil(daysInclusiveIso(projectStartValue, projectEndValue) / 7)),
  );
  return { projectStartValue, projectEndValue, totalWeeks };
}

function getPreviewRows() {
  return state.phases.flatMap((phase, phaseIndex) => [
    { ...phase, kind: 'phase', phaseIndex },
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
  readPreviewBtn.classList.toggle('active', previewZoomMode === 'read');
  previewPanel.classList.toggle('fit-mode', previewZoomMode === 'fit');
  previewPanel.classList.toggle('read-mode', previewZoomMode === 'read');
  previewPanel.classList.toggle('manual-mode', previewZoomMode === 'manual');
}

function applyPreviewZoom() {
  const contentWidth = ganttPreview.scrollWidth;
  const contentHeight = ganttPreview.scrollHeight;
  if (!contentWidth || !contentHeight) return;

  const availableWidth = Math.max(1, previewScroll.clientWidth - 2);
  const availableHeight = Math.max(1, previewScroll.clientHeight - 2);
  const fitZoom = clampNumber(
    Math.min(availableWidth / contentWidth, availableHeight / contentHeight),
    FIT_PREVIEW_MIN_ZOOM,
    1,
  );
  const zoom = previewZoomMode === 'fit'
    ? fitZoom
    : previewZoomMode === 'read'
      ? clampNumber(READ_PREVIEW_ZOOM, ZOOM_MIN, ZOOM_MAX)
      : clampNumber(manualPreviewZoom, ZOOM_MIN, ZOOM_MAX);

  const scaledWidth = Math.ceil(contentWidth * zoom);
  const scaledHeight = Math.ceil(contentHeight * zoom);

  currentPreviewZoom = zoom;
  ganttPreview.style.transform = `scale(${zoom})`;
  previewCanvas.style.width = `${Math.max(scaledWidth, availableWidth)}px`;
  previewCanvas.style.height = `${Math.max(scaledHeight, availableHeight)}px`;
  previewCanvas.style.minWidth = `${scaledWidth}px`;
  previewCanvas.style.minHeight = `${scaledHeight}px`;
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

function renderProjectOverview() {
  projectOverview.textContent = '';

  if (!state.phases.length) {
    projectOverview.append(makeElement('div', 'overview-empty', '暂无项目阶段。'));
    return;
  }

  const strip = makeElement('div', 'overview-strip');

  state.phases.forEach((phase, phaseIndex) => {
    const card = makeElement('div', 'overview-card');
    card.dataset.phaseIndex = String(phaseIndex);
    card.style.setProperty('--phase-accent', phaseAccents[phaseIndex % phaseAccents.length]);
    card.classList.toggle('located', focusedPhaseIndex === phaseIndex);
    const titleRow = makeElement('div', 'overview-title-row');
    titleRow.append(makeElement('span', 'overview-phase-name', phase.name || `阶段 ${phaseIndex + 1}`));
    card.append(
      titleRow,
      makeElement('span', 'overview-date', `${phase.start || '-'} - ${phase.end || '-'}`),
    );
    strip.append(card);
  });

  projectOverview.append(strip);
}

function renderProjectStats() {
  projectStats.textContent = '';
  const phaseCount = state.phases.length;
  const taskCount = state.phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const milestoneCount = state.phases.reduce((sum, phase) => sum + phase.tasks.filter((task) => task.milestone).length, 0);
  const averageProgress = state.phases.length
    ? Math.round(state.phases.reduce((sum, phase) => sum + normalizeProgress(phase.progress), 0) / state.phases.length)
    : 0;
  const start = getEarliestPhaseStart();
  const end = getLatestPhaseEnd();
  const duration = start && end ? `${daysInclusiveIso(start, end)} 天` : '-';
  [
    ['阶段', `${phaseCount} 个`],
    ['任务', `${taskCount} 项`],
    ['周期', duration],
    ['里程碑', `${milestoneCount} 个`],
    ['完成度', `${averageProgress}%`],
  ].forEach(([label, value]) => {
    const item = makeElement('div', 'stat-card');
    item.append(
      makeElement('span', 'stat-label', label),
      makeElement('strong', 'stat-value', value),
    );
    projectStats.append(item);
  });
}

function renderRightPane() {
  renderProjectOverview();
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
  const dayOffset = Math.max(0, Math.round((dateSortValue(item.start) - dateSortValue(projectStartValue)) / 86400000));
  const durationDays = daysInclusiveIso(item.start, item.end);
  const leftPx = (dayOffset * PREVIEW_WEEK_WIDTH) / 7 + 2;
  const exactWidthPx = (durationDays * PREVIEW_WEEK_WIDTH) / 7;
  const shellWidthPx = Math.max(12, exactWidthPx + 4);
  const fillWidthPx = Math.max(8, exactWidthPx - (item.kind === 'phase' ? 4 : 6));
  const color = phaseAccents[item.phaseIndex % phaseAccents.length];

  const shell = document.createElement('span');
  shell.className = 'preview-bar-shell';
  shell.style.left = `${leftPx}px`;
  shell.style.width = `${shellWidthPx}px`;

  const fill = document.createElement('span');
  fill.className = 'preview-bar-fill';
  fill.style.width = `${fillWidthPx}px`;
  fill.style.setProperty('--bar-color', color);
  shell.append(fill);
  track.append(shell);

  if (item.kind === 'sub' && item.milestone) {
    const defaultGapPx = 6;
    const markerGapPx = Number.isFinite(item.markerGapPx) ? item.markerGapPx : defaultGapPx;
    const marker = document.createElement('span');
    marker.className = 'preview-milestone';
    marker.style.left = `${leftPx + shellWidthPx + markerGapPx}px`;
    const star = document.createElement('span');
    star.className = 'preview-milestone-star';
    star.textContent = '★';
    const label = document.createElement('span');
    label.textContent = `${item.name} (${fmtMd(item.end)})`;
    marker.append(star, label);
    track.append(marker);
  }
}

function renderPreview() {
  const range = getPreviewRange();
  ganttPreview.textContent = '';
  if (!range) {
    ganttPreview.append(makePreviewCell('preview-empty', '请先录入项目阶段日期。'));
    return;
  }

  const { projectStartValue, totalWeeks } = range;
  const rows = getPreviewRows();
  ganttPreview.style.gridTemplateColumns = `250px 160px 110px 94px 118px 118px repeat(${totalWeeks}, ${PREVIEW_WEEK_WIDTH}px)`;

  const title = makePreviewCell('preview-title', state.title || '甘特图 - 项目进度计划表（周视图）', '1 / -1', '1');
  ganttPreview.append(title);

  ganttPreview.append(makePreviewCell('preview-head-cell preview-phase-head', '项目阶段', '1', '2 / 5'));
  ganttPreview.append(makePreviewCell('preview-head-cell preview-duration-head', '用时', '2', '2 / 5'));
  ganttPreview.append(makePreviewCell('preview-head-cell preview-holiday-head', '节假日天数', '3', '2 / 5'));
  ganttPreview.append(makePreviewCell('preview-head-cell preview-status-head', '状态/完成度', '4', '2 / 5'));
  ganttPreview.append(makePreviewCell('preview-head-cell preview-owner-head', '负责人（甲方）', '5', '2 / 5'));
  ganttPreview.append(makePreviewCell('preview-head-cell preview-owner-head', '负责人（乙方）', '6', '2 / 5'));

  getMonthBands(projectStartValue, totalWeeks).forEach((band) => {
    ganttPreview.append(makePreviewCell(
      'preview-month',
      band.label,
      `${band.fromWeek + 6} / span ${band.toWeek - band.fromWeek + 1}`,
      '2',
    ));
  });

  for (let weekIndex = 1; weekIndex <= totalWeeks; weekIndex += 1) {
    const weekStart = addDaysIso(projectStartValue, (weekIndex - 1) * 7);
    const weekEnd = addDaysIso(weekStart, 6);
    const gridColumn = `${weekIndex + 6}`;
    ganttPreview.append(makePreviewCell('preview-week', `W${weekIndex}`, gridColumn, '3'));
    ganttPreview.append(makePreviewCell('preview-date', `${fmtMd(weekStart)}-${fmtMd(weekEnd)}`, gridColumn, '4'));
  }

  rows.forEach((item, index) => {
    const gridRow = `${index + 5}`;
    const isPhase = item.kind === 'phase';
    const color = phaseAccents[item.phaseIndex % phaseAccents.length];
    const rowClass = isPhase ? ' preview-row-phase' : '';
    const focusClass = isPhase && focusedPhaseIndex === item.phaseIndex ? ' preview-row-focused' : '';
    const displayName = isPhase ? item.name : `· ${item.name}`;
    const nameCell = makePreviewCell(`preview-name${rowClass}${focusClass}`, displayName, '1', gridRow);
    const durationCell = makePreviewCell(`preview-duration${rowClass}${focusClass}`, durationText(item), '2', gridRow);
    const holidayCell = makePreviewCell(`preview-holiday${rowClass}${focusClass}`, holidayDaysText(item), '3', gridRow);
    const statusCell = makePreviewCell(`preview-status${rowClass}${focusClass}`, isPhase ? `${normalizeProgress(item.progress)}%` : normalizeTaskStatus(item.status), '4', gridRow);
    const ownerClientCell = makePreviewCell(`preview-owner${rowClass}${focusClass}`, isPhase ? '-' : (item.ownerClient || '-'), '5', gridRow);
    const ownerVendorCell = makePreviewCell(`preview-owner${rowClass}${focusClass}`, isPhase ? '-' : (item.ownerVendor || '-'), '6', gridRow);
    const track = makePreviewCell(`preview-track${rowClass}${focusClass}`, '', `7 / span ${totalWeeks}`, gridRow);
    nameCell.style.setProperty('--phase-accent', color);
    durationCell.style.setProperty('--phase-accent', color);
    holidayCell.style.setProperty('--phase-accent', color);
    statusCell.style.setProperty('--phase-accent', color);
    ownerClientCell.style.setProperty('--phase-accent', color);
    ownerVendorCell.style.setProperty('--phase-accent', color);
    track.style.setProperty('--phase-accent', color);
    renderPreviewBar(track, item, projectStartValue);
    ganttPreview.append(nameCell, durationCell, holidayCell, statusCell, ownerClientCell, ownerVendorCell, track);
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

function togglePhaseFromOverview(phaseIndex) {
  if (!Number.isInteger(phaseIndex) || !state.phases[phaseIndex]) return;
  focusedPhaseIndex = phaseIndex;
  if (expandedPhaseIndexes.has(phaseIndex)) {
    expandedPhaseIndexes.delete(phaseIndex);
  } else {
    expandedPhaseIndexes.add(phaseIndex);
  }
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
  phaseList.textContent = '';
  renderProjectStats();

  state.phases.forEach((phase, phaseIndex) => {
    const phaseNode = phaseTemplate.content.firstElementChild.cloneNode(true);
    const isExpanded = expandedPhaseIndexes.has(phaseIndex);
    const milestoneCount = phase.tasks.filter((task) => task.milestone).length;
    phaseNode.dataset.phaseIndex = String(phaseIndex);
    phaseNode.style.setProperty('--phase-accent', phaseAccents[phaseIndex % phaseAccents.length]);
    phaseNode.classList.toggle('collapsed', !isExpanded);
    phaseNode.classList.toggle('expanded', isExpanded);
    phaseNode.classList.toggle('phase-focused', focusedPhaseIndex === phaseIndex);
    phaseNode.querySelector('.phase-index').textContent = `P${phaseIndex + 1}`;

    const compactSummary = phaseNode.querySelector('.phase-compact-summary');
    compactSummary.append(
      makeElement('strong', 'phase-compact-name', phase.name || `阶段 ${phaseIndex + 1}`),
      makeElement('span', 'phase-compact-date', phase.start && phase.end ? `${phase.start} - ${phase.end}` : '-'),
      makeCompactMetric(`${phase.tasks.length} 项`),
      makeCompactMetric(`完成 ${normalizeProgress(phase.progress)}%`),
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
      makePhaseSummaryPill('完成度', `${normalizeProgress(phase.progress)}%`),
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
          renderRightPane();
        });
        input.addEventListener('change', () => {
          phase[field] = input.value;
          normalizeTaskDates(phase);
          render();
        });
      } else if (field === 'progress') {
        input.value = String(normalizeProgress(phase.progress));
        input.addEventListener('input', () => {
          phase.progress = normalizeProgress(input.value);
          input.value = String(phase.progress);
          renderRightPane();
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
      updateHolidayStat(taskNode, task);
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
            renderRightPane();
          });
          input.addEventListener('change', () => {
            task.end = clampIsoDate(input.value, maxIsoDate([phase.start, task.start]), phase.end);
            task.endTouched = true;
            render();
          });
        } else if (field === 'status') {
          input.value = normalizeTaskStatus(task.status);
          input.addEventListener('change', () => {
            task.status = normalizeTaskStatus(input.value);
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
      taskList.append(taskNode);
    });

    phaseNode.querySelector('.add-task').addEventListener('click', () => {
      const start = phase.start || new Date().toISOString().slice(0, 10);
      phase.tasks.push({
        name: '新任务',
        start,
        end: getDefaultTaskEnd(start, phase),
        status: '未开始',
        ownerClient: '',
        ownerVendor: '',
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
      progress: normalizeProgress(phase.progress),
      tasks: phase.tasks.map((task) => ({
        name: task.name,
        start: task.start,
        end: task.end,
        status: normalizeTaskStatus(task.status),
        ownerClient: String(task.ownerClient || '').trim(),
        ownerVendor: String(task.ownerVendor || '').trim(),
        milestone: Boolean(task.milestone),
        markerGapPx: task.markerGapPx,
      })),
    })),
  };
}

function normalizeImportedProject(project) {
  const phases = Array.isArray(project?.phases) ? project.phases : [];
  if (!phases.length) throw new Error('Excel 中没有可导入的项目阶段');
  return {
    title: String(project.title || '甘特图 - 项目进度计划表（周视图）').trim(),
    projectStart: project.projectStart || '',
    phases: phases.map((phase, phaseIndex) => ({
      name: String(phase.name || `阶段 ${phaseIndex + 1}`).trim(),
      start: phase.start || '',
      end: phase.end || '',
      progress: normalizeProgress(phase.progress),
      tasks: (Array.isArray(phase.tasks) ? phase.tasks : []).map((task, taskIndex) => ({
        name: String(task.name || `任务 ${taskIndex + 1}`).trim(),
        start: task.start || phase.start || '',
        end: task.end || task.start || phase.end || '',
        status: normalizeTaskStatus(task.status),
        ownerClient: String(task.ownerClient || '').trim(),
        ownerVendor: String(task.ownerVendor || '').trim(),
        milestone: Boolean(task.milestone),
        markerGapPx: task.markerGapPx,
      })),
    })),
  };
}

function getFileName(response) {
  const header = response.headers.get('Content-Disposition') || '';
  const match = header.match(/filename\*=UTF-8''([^;]+)/);
  return match ? decodeURIComponent(match[1]) : `项目计划甘特图-${Date.now()}.xlsx`;
}

function apiUrl(path) {
  return `${API_BASE}${path}`;
}

function requestExportKey(format) {
  const formatName = format === 'png' ? '图片' : 'Excel';
  const exportKey = window.prompt(`请输入${formatName}导出密钥。每个密钥只能使用 1 次。`, '');
  if (exportKey === null) return null;
  const normalizedKey = exportKey.trim();
  if (!normalizedKey) {
    setStatus('请输入导出密钥后再导出。', 'error');
    return null;
  }
  return normalizedKey;
}

function setGenerating(format, busy) {
  const activeButton = format === 'png' ? imageBtn : generateBtn;
  generateBtn.disabled = busy;
  imageBtn.disabled = busy;
  importBtn.disabled = busy;
  generateBtn.innerHTML = `<span>${formatLabels.xlsx.action}</span>`;
  imageBtn.innerHTML = `<span>${formatLabels.png.action}</span>`;
  if (busy) activeButton.textContent = formatLabels[format].busy;
}

function setImporting(busy) {
  importBtn.disabled = busy;
  generateBtn.disabled = busy;
  imageBtn.disabled = busy;
  importBtn.textContent = busy ? '导入中...' : '导入 Excel';
}

async function generate(format = 'xlsx') {
  const exportKey = requestExportKey(format);
  if (!exportKey) return;

  setGenerating(format, true);
  setStatus(formatLabels[format].status);

  try {
    const response = await fetch(apiUrl('/api/generate'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...toPayload(), format, exportKey }),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      throw new Error(errorPayload.error || '生成失败');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = getFileName(response);
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus(formatLabels[format].done, 'ok');
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error');
  } finally {
    setGenerating(format, false);
  }
}

async function importExcel(file) {
  if (!file) return;
  if (!/\.xlsx$/i.test(file.name)) {
    setStatus('请上传 .xlsx 格式的甘特图文件。', 'error');
    return;
  }

  setImporting(true);
  setStatus('正在读取 Excel 项目计划，请稍候。');

  try {
    const response = await fetch(apiUrl('/api/import'), {
      method: 'POST',
      headers: {
        'Content-Type': file.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      body: file,
    });

    const responseText = await response.text();
    let payload = {};
    try {
      payload = responseText ? JSON.parse(responseText) : {};
    } catch {
      payload = { error: responseText };
    }
    if (!response.ok) throw new Error(payload.error || '导入失败');

    state = normalizeImportedProject(payload.project);
    focusedPhaseIndex = null;
    expandedPhaseIndexes.clear();
    previewZoomMode = 'fit';
    render();
    schedulePreviewZoom();
    setStatus(`已导入：${file.name}`, 'ok');
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error');
  } finally {
    importFile.value = '';
    setImporting(false);
  }
}

document.querySelector('#addPhaseBtn').addEventListener('click', () => {
  const { start, end } = getNewPhaseDates();
  state.phases.push({
    name: '新阶段',
    start,
    end,
    progress: 0,
    tasks: [{ name: '新任务', start, end, status: '未开始', ownerClient: '', ownerVendor: '', milestone: false }],
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

generateBtn.addEventListener('click', () => generate('xlsx'));
imageBtn.addEventListener('click', () => generate('png'));
importBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', () => importExcel(importFile.files[0]));
projectOverview.addEventListener('click', (event) => {
  const card = event.target.closest('.overview-card');
  if (!card) return;
  const phaseIndex = Number(card.dataset.phaseIndex);
  togglePhaseFromOverview(phaseIndex);
});
fitPreviewBtn.addEventListener('click', () => {
  previewZoomMode = 'fit';
  applyPreviewZoom();
});
readPreviewBtn.addEventListener('click', () => {
  previewZoomMode = 'read';
  applyPreviewZoom();
});
zoomOutBtn.addEventListener('click', () => setManualPreviewZoom(currentPreviewZoom - ZOOM_STEP));
zoomInBtn.addEventListener('click', () => setManualPreviewZoom(currentPreviewZoom + ZOOM_STEP));
zoomSlider.addEventListener('input', () => setManualPreviewZoom(Number(zoomSlider.value) / 100));
window.addEventListener('resize', () => {
  if (previewZoomMode === 'fit' || previewZoomMode === 'read') applyPreviewZoom();
});

registerCodeFingerprint();
render();
