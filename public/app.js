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

const projectTemplates = [
  {
    id: 'saas-delivery',
    name: 'SaaS 实施交付',
    title: 'SaaS 实施交付计划（周视图）',
    summary: '适合标准企业 SaaS 实施，从项目准备、需求调研、蓝图设计到实施测试与上线支持。',
    tags: ['项目准备', '蓝图设计', '上线支持'],
    schedule: 'saas-delivery-relative',
    durationLabel: '',
    phases: [
      {
        name: '项目准备',
        items: [
          { name: '概念培训', workdays: 1 },
          { name: '确认SOW', workdays: 2 },
          { name: '组织结构与通讯录', workdays: 3 },
          { name: '沟通管理计划', workdays: 1 },
          { name: '变更管理计划', workdays: 1 },
          { name: '项目进度计划', workdays: 1 },
          { name: '项目启动会', milestone: true },
        ],
      },
      {
        name: '需求调研',
        items: [
          { name: '访谈准备', workdays: 2 },
          { name: '需求访谈', workdays: 14 },
          { name: '功能需求清单', workdays: 3 },
          { name: '接口需求清单', workdays: 3 },
        ],
      },
      {
        name: '蓝图设计',
        items: [
          { name: '功能开发设计', workdays: 3 },
          { name: '接口开发设计', workdays: 3 },
          { name: '蓝图设计', workdays: 7 },
          { name: '蓝图内部评审', workdays: 3 },
          { name: '蓝图确认', workdays: 2, milestone: true },
        ],
      },
      {
        name: '实施测试',
        items: [
          { name: '基础数据收集', workdays: 5 },
          { name: '系统配置', workdays: 6 },
          { name: '功能开发', workdays: 10 },
          { name: '接口开发', workdays: 10 },
          { name: '单元测试', workdays: 10 },
          { name: '集成测试', workdays: 11 },
          { name: 'UAT测试', workdays: 16 },
          { name: '上线切换准备', workdays: 10 },
          { name: '用户培训', workdays: 3 },
          { name: '上线切换', milestone: true },
        ],
      },
      {
        name: '上线支持',
        items: [
          { name: '上线后支持', workdays: 30 },
          { name: '运维交接', workdays: 1 },
          { name: '项目验收', workdays: 16 },
        ],
      },
    ],
  },
  {
    id: 'software-development',
    name: '软件敏捷迭代',
    title: '软件敏捷迭代计划（周视图）',
    summary: '适合 Sprint 节奏的软件迭代，覆盖规划、并行开发、测试准出、提审与灰度发布。',
    tags: ['Sprint规划', '并行开发', '发版交付'],
    schedule: 'agile-iteration-relative',
    durationLabel: '',
    phases: [
      {
        name: 'Sprint规划',
        items: [
          { name: '用户故事梳理与优先级排序', workdays: 3 },
          { name: '技术方案评审与估时', workdays: 2, milestone: true },
        ],
      },
      {
        name: '开发实施',
        items: [
          { name: '后端接口开发', workdays: 10 },
          { name: '前端/移动端页面开发', workdays: 10 },
          { name: '前后端联调', workdays: 2, milestone: true },
        ],
      },
      {
        name: '质量保障',
        items: [
          { name: '功能测试用例编写', workdays: 5 },
          { name: '冒烟测试与系统测试', workdays: 5 },
          { name: '回归测试与Bug修复', workdays: 3, milestone: true },
        ],
      },
      {
        name: '发版与交付',
        items: [
          { name: '应用商店/应用市场提审', workdays: 7, milestone: true },
          { name: '灰度发布与监控', workdays: 2 },
          { name: '全量发布与版本号更新', workdays: 1, milestone: true },
        ],
      },
    ],
  },
  {
    id: 'large-marketing-event',
    name: '大型市场活动',
    title: '大型市场活动计划（周视图）',
    summary: '适合品牌发布会、峰会等大型市场活动，覆盖策划邀约、内容物料、宣传推广、现场执行与复盘收尾。',
    tags: ['策划邀约', '内容物料', '现场执行'],
    schedule: 'large-marketing-event-relative',
    durationLabel: '',
    phases: [
      {
        name: '策划与邀约',
        items: [
          { name: '活动方案与预算审批', workdays: 10 },
          { name: '场地预定', workdays: 3, milestone: true },
          { name: '核心嘉宾邀约', workdays: 30 },
        ],
      },
      {
        name: '内容与物料',
        items: [
          { name: '主视觉设计与延展', workdays: 15, milestone: true },
          { name: '宣传视频制作', workdays: 20 },
          { name: '展台及印刷品制作', workdays: 15 },
        ],
      },
      {
        name: '宣传推广',
        items: [
          { name: '预热期媒体投放', workdays: 15, milestone: true },
          { name: '倒计时海报/推文', workdays: 5 },
          { name: '媒体记者确认', workdays: 10 },
        ],
      },
      {
        name: '现场执行',
        items: [
          { name: '舞台搭建与彩排', workdays: 2 },
          { name: '活动当天流程管控', workdays: 1, milestone: true },
        ],
      },
      {
        name: '复盘收尾',
        items: [
          { name: '媒体通稿发布与舆情监控', workdays: 3 },
          { name: '项目结算与复盘报告', workdays: 5, milestone: true },
        ],
      },
    ],
  },
];

function createEmptyProject() {
  return {
    title: defaultProject.title,
    projectStart: '',
    phases: [],
  };
}

let state = createEmptyProject();

const API_BASE = String(window.LITEGANTT_API_BASE || '').replace(/\/+$/, '');
const phaseAccents = [
  '#116acb',
  '#13a8c8',
  '#16a272',
  '#5f6df1',
  '#8b5cf6',
  '#d89419',
  '#e11d48',
  '#0f766e',
  '#9333ea',
  '#ea580c',
  '#0891b2',
  '#65a30d',
  '#c026d3',
  '#b45309',
  '#2563eb',
  '#be123c',
];
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
const DEFAULT_TASK_DAYS = 7;
const PREVIEW_NAME_COL_WIDTH = 250;
const PREVIEW_DURATION_COL_SIZE = 'max-content';
const PREVIEW_DAY_WIDTH = 36;
const PREVIEW_WEEK_WIDTH = 72;
const PREVIEW_MONTH_WIDTH = 126;
const PREVIEW_MAX_WEEKS = 104;
const PREVIEW_WEEK_MONTH_LABEL_PADDING = 44;
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

const introScreen = document.querySelector('#introScreen');
const appShell = document.querySelector('#appShell');
const homeScreen = document.querySelector('#homeScreen');
const templateSetupScreen = document.querySelector('#templateSetupScreen');
const homeTemplateZone = document.querySelector('.home-template-zone');
const homeTemplateButtons = document.querySelectorAll('[data-home-template]');
const homeBlankBtn = document.querySelector('#homeBlankBtn');
const editorEntryBanner = document.querySelector('#editorEntryBanner');
const editorEntryMessage = document.querySelector('#editorEntryMessage');
const consoleTemplateBadge = document.querySelector('#consoleTemplateBadge');
const setupBackBtn = document.querySelector('#setupBackBtn');
const setupCancelBtn = document.querySelector('#setupCancelBtn');
const setupGenerateBtn = document.querySelector('#setupGenerateBtn');
const setupTitle = document.querySelector('#setupTitle');
const setupSummary = document.querySelector('#setupSummary');
const setupProjectNameInput = document.querySelector('#setupProjectNameInput');
const setupProjectStartInput = document.querySelector('#setupProjectStartInput');
const setupHint = document.querySelector('#setupHint');
const setupTemplateMeta = document.querySelector('#setupTemplateMeta');
const setupTemplateName = document.querySelector('#setupTemplateName');
const setupPhasePreview = document.querySelector('#setupPhasePreview');
const topbar = document.querySelector('.topbar');
const layout = document.querySelector('.layout');
const enterAppBtn = document.querySelector('#enterAppBtn');
const introPreviewBtn = document.querySelector('#introPreviewBtn');
const introSubtitleText = document.querySelector('#introSubtitleText');
const introFlowStepItems = document.querySelectorAll('[data-intro-flow-step]');
const introStepCaption = document.querySelector('#introStepCaption');
const introDemoStepButtons = document.querySelectorAll('[data-intro-step]');
const phaseList = document.querySelector('#phaseList');
const ganttModal = document.querySelector('#ganttModal');
const previewPanel = ganttModal ? ganttModal.querySelector('.gantt-modal-dialog') : null;
const previewScroll = ganttModal ? ganttModal.querySelector('.preview-scroll') : null;
const previewRiskNotice = ganttModal ? ganttModal.querySelector('#previewRiskNotice') : null;
const previewCanvas = ganttModal ? ganttModal.querySelector('#previewCanvas') : null;
const ganttPreview = ganttModal ? ganttModal.querySelector('#ganttPreview') : null;
const projectStats = document.querySelector('#projectStats');
const DEFAULT_TITLE = '甘特图 - 项目进度计划表（周视图）';
const phaseTemplate = document.querySelector('#phaseTemplate');
const taskTemplate = document.querySelector('#taskTemplate');
const templateDialog = document.querySelector('#templateDialog');
const templateBackdrop = document.querySelector('#templateBackdrop');
const templateOptions = document.querySelector('#templateOptions');
const templateStartInput = document.querySelector('#templateStartInput');
const templateHint = document.querySelector('#templateHint');
const applyTemplateBtn = document.querySelector('#applyTemplateBtn');
const cancelTemplateBtn = document.querySelector('#cancelTemplateBtn');
const closeTemplateDialogBtn = document.querySelector('#closeTemplateDialogBtn');
const saveVersionBtn = document.querySelector('#saveVersionBtn');
const saveVersionDialog = document.querySelector('#saveVersionDialog');
const saveVersionBackdrop = document.querySelector('#saveVersionBackdrop');
const saveVersionNameInput = document.querySelector('#saveVersionNameInput');
const saveVersionHint = document.querySelector('#saveVersionHint');
const confirmSaveVersionBtn = document.querySelector('#confirmSaveVersionBtn');
const cancelSaveVersionBtn = document.querySelector('#cancelSaveVersionBtn');
const dismissSaveVersionBtn = document.querySelector('#dismissSaveVersionBtn');
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
const timelineUnitSelect = document.querySelector('#timelineUnitSelect');
const previewEditBtn = ganttModal ? ganttModal.querySelector('#previewEditBtn') : null;
const fitPreviewBtn = ganttModal ? ganttModal.querySelector('#fitPreviewBtn') : null;
const zoomOutBtn = ganttModal ? ganttModal.querySelector('#zoomOutBtn') : null;
const zoomInBtn = ganttModal ? ganttModal.querySelector('#zoomInBtn') : null;
const zoomSlider = ganttModal ? ganttModal.querySelector('#zoomSlider') : null;
const zoomValue = ganttModal ? ganttModal.querySelector('#zoomValue') : null;

let previewZoomMode = 'fit';
let manualPreviewZoom = 1;
let currentPreviewZoom = 1;
let previewEditMode = false;
let previewDragState = null;
let selectedTimelineUnit = 'week';
let expandedPhaseIndexes = new Set();
let focusedPhaseIndex = null;
let focusPhaseTimer = null;
let selectedTemplateId = projectTemplates[0]?.id || '';
let introStepIndex = 0;
let introStepTimer = null;
let introSubtitleIndex = 0;
let introSubtitleTimer = null;
let currentView = 'home';
let setupMode = 'template';
let pendingSetupTemplateId = projectTemplates[0]?.id || '';
let editorEntryContext = null;

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
  '进行中': '#2563eb',
  '已完成': '#16a34a',
  '已暂停': '#8b5cf6',
  '已取消': '#475569',
};
const subtaskPriorityColors = { '高': '#f43f5e', '中': '#f59e0b', '低': '#14b8a6' };
const subtaskTemplate = document.querySelector('#subtaskTemplate');
const introSubtitlePhrases = [
  '阶段拆解',
  '任务排期',
  '里程碑验收',
];
const introStepLabels = ['定义阶段', '拆解任务', '生成预览'];
const introHealthScores = ['62', '74', '88'];

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function setScreenVisibility(screen, visible) {
  if (!screen) return;
  screen.hidden = !visible;
  screen.setAttribute('aria-hidden', String(!visible));
}

function setSetupHint(message = '模板会根据开始日期自动避开周末和节假日。', stateName = '') {
  if (!setupHint) return;
  setupHint.textContent = message;
  if (stateName) {
    setupHint.dataset.state = stateName;
  } else {
    delete setupHint.dataset.state;
  }
}

function makeTemplateEntryContext(template) {
  return {
    sourceBadge: `来自 ${template?.name || '模板'}`,
    message: `已根据「${template?.name || '项目模板'}」模板生成初版计划，可继续调整阶段、任务与里程碑。`,
  };
}

function makeBlankEntryContext() {
  return {
    sourceBadge: '空白计划',
    message: '已创建空白计划，可从添加阶段开始编制并生成甘特图。',
  };
}

function makeExcelEntryContext() {
  return {
    sourceBadge: '来自 Excel',
    message: '已从 Excel 导入项目计划，可继续校准阶段、任务与里程碑。',
  };
}

function makeHistoryEntryContext(versionName) {
  return {
    sourceBadge: '历史版本',
    message: `已恢复历史版本「${String(versionName || '未命名版本')}」，可继续编辑或导出。`,
  };
}

function setEditorEntryContext(context) {
  editorEntryContext = context ? { ...context } : null;
  renderEditorEntryContext();
}

function renderEditorEntryContext() {
  const hasContext = Boolean(editorEntryContext);
  if (editorEntryBanner) editorEntryBanner.hidden = !hasContext;
  if (consoleTemplateBadge) consoleTemplateBadge.hidden = !hasContext;
  if (!hasContext) return;

  if (editorEntryMessage) {
    editorEntryMessage.textContent = editorEntryContext.message || '已生成初版计划，可继续调整阶段、任务与里程碑。';
  }
  if (consoleTemplateBadge) consoleTemplateBadge.textContent = editorEntryContext.sourceBadge || '当前计划';
}

function showHome() {
  clearIntroTimers();
  currentView = 'home';
  document.body.classList.remove('intro-active', 'intro-leaving', 'setup-active', 'app-entered');
  document.body.classList.add('home-active');
  setScreenVisibility(homeScreen, true);
  setScreenVisibility(templateSetupScreen, false);
  setScreenVisibility(introScreen, false);
  setScreenVisibility(appShell, false);
  closeIoMenu();
  closeTemplateDialog();
  syncHealthPanelStickyOffset();
}

function showEditor() {
  clearIntroTimers();
  currentView = 'editor';
  document.body.classList.remove('home-active', 'setup-active', 'intro-active', 'intro-leaving');
  document.body.classList.add('app-entered');
  setScreenVisibility(homeScreen, false);
  setScreenVisibility(templateSetupScreen, false);
  setScreenVisibility(introScreen, false);
  setScreenVisibility(appShell, true);
  syncHealthPanelStickyOffset();
  requestAnimationFrame(() => syncHealthPanelStickyOffset());
}

function getSetupTemplate() {
  return projectTemplates.find((template) => template.id === pendingSetupTemplateId) || projectTemplates[0] || null;
}

function renderSetupPhasePreview(template) {
  if (!setupPhasePreview) return;
  setupPhasePreview.textContent = '';
  const phases = template?.phases || [];
  phases.forEach((phase, index) => {
    const item = makeElement('div', 'setup-phase-item');
    item.style.setProperty('--phase-accent', phaseAccents[index % phaseAccents.length]);
    item.append(
      makeElement('span', '', `P${index + 1}`),
      makeElement('strong', '', phase.name),
      makeElement('small', '', `${phase.items?.length || 0} 项任务`),
    );
    setupPhasePreview.append(item);
  });
}

function openTemplateSetup(templateId, mode = 'template') {
  setupMode = mode;
  if (templateId) pendingSetupTemplateId = templateId;
  const template = getSetupTemplate();
  const isBlank = setupMode === 'blank';
  currentView = 'setup';

  document.body.classList.remove('home-active', 'app-entered', 'intro-active', 'intro-leaving');
  document.body.classList.add('setup-active');
  setScreenVisibility(homeScreen, false);
  setScreenVisibility(templateSetupScreen, true);
  setScreenVisibility(introScreen, false);
  setScreenVisibility(appShell, false);

  if (setupTitle) setupTitle.textContent = isBlank ? '配置空白计划' : `配置${template?.name || '项目模板'}`;
  if (setupSummary) {
    setupSummary.textContent = isBlank
      ? '创建一个空白项目壳，进入工作台后自行添加阶段与任务。'
      : (template?.summary || '确认项目基本信息后生成计划。');
  }
  if (setupProjectNameInput) {
    setupProjectNameInput.value = isBlank
      ? '空白项目计划（周视图）'
      : (template?.title || DEFAULT_TITLE);
  }
  if (setupProjectStartInput && !isIsoDate(setupProjectStartInput.value)) {
    setupProjectStartInput.value = todayIsoDate();
  }
  if (setupTemplateMeta) {
    setupTemplateMeta.textContent = isBlank
      ? '自定义阶段'
      : getTemplateMetaText(template || {});
  }
  if (setupTemplateName) setupTemplateName.textContent = isBlank ? '空白计划' : (template?.name || '项目模板');
  if (setupGenerateBtn) setupGenerateBtn.textContent = isBlank ? '进入编辑工作台' : '生成计划';
  setSetupHint(isBlank ? '进入工作台后，可从“添加阶段”开始编制计划。' : '模板会根据开始日期自动避开周末和节假日。');
  renderSetupPhasePreview(isBlank ? null : template);
  window.setTimeout(() => setupProjectNameInput?.focus(), 0);
}

function applyBlankProjectFromSetup() {
  state = {
    title: String(setupProjectNameInput?.value || '').trim() || '空白项目计划（周视图）',
    projectStart: setupProjectStartInput?.value || '',
    phases: [],
  };
  breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
  focusedPhaseIndex = null;
  if (focusPhaseTimer) window.clearTimeout(focusPhaseTimer);
  focusPhaseTimer = null;
  expandedPhaseIndexes.clear();
  previewZoomMode = 'fit';
  setEditorEntryContext(makeBlankEntryContext());
  showEditor();
  render();
  setStatus('已创建空白计划，可从添加阶段开始编制。', 'ok');
}

function applySetupProject() {
  const projectName = String(setupProjectNameInput?.value || '').trim();
  const projectStart = setupProjectStartInput?.value || '';
  if (!projectName) {
    setSetupHint('请先填写项目名称。', 'error');
    setupProjectNameInput?.focus();
    return;
  }
  if (!isIsoDate(projectStart)) {
    setSetupHint('请先填写有效的项目开始日期。', 'error');
    setupProjectStartInput?.focus();
    return;
  }
  if (setupMode === 'blank') {
    applyBlankProjectFromSetup();
    return;
  }

  const template = getSetupTemplate();
  if (!template) {
    setSetupHint('当前没有可用模板。', 'error');
    return;
  }
  try {
    const project = buildProjectFromTemplate(template, projectStart);
    project.title = projectName;
    applyImportedProject(project, makeTemplateEntryContext(template));
    setStatus(`已生成「${template.name}」计划，共 ${project.phases.length} 个阶段、${getProjectTaskCount(project)} 项任务。`, 'ok');
  } catch (error) {
    setSetupHint(error instanceof Error ? error.message : String(error), 'error');
  }
}

function clearIntroTimers() {
  if (introStepTimer) {
    window.clearInterval(introStepTimer);
    introStepTimer = null;
  }
  if (introSubtitleTimer) {
    window.clearInterval(introSubtitleTimer);
    introSubtitleTimer = null;
  }
}

function setIntroSubtitle(nextIndex) {
  if (!introSubtitleText) return;
  introSubtitleIndex = ((Number(nextIndex) % introSubtitlePhrases.length) + introSubtitlePhrases.length) % introSubtitlePhrases.length;
  const phrase = introSubtitlePhrases[introSubtitleIndex];
  introFlowStepItems.forEach((item) => {
    item.classList.toggle('active', Number(item.dataset.introFlowStep) === introSubtitleIndex);
  });
  if (prefersReducedMotion()) {
    introSubtitleText.textContent = phrase;
    return;
  }
  introSubtitleText.classList.add('is-changing');
  window.setTimeout(() => {
    introSubtitleText.textContent = phrase;
    introSubtitleText.classList.remove('is-changing');
  }, 150);
}

function startIntroSubtitleLoop() {
  if (!introSubtitleText && introFlowStepItems.length === 0) return;
  setIntroSubtitle(0);
  if (prefersReducedMotion()) return;
  if (introSubtitleTimer) window.clearInterval(introSubtitleTimer);
  introSubtitleTimer = window.setInterval(() => setIntroSubtitle(introSubtitleIndex + 1), 3000);
}

function setIntroStep(stepIndex, { manual = false } = {}) {
  if (!introScreen) return;
  introStepIndex = ((Number(stepIndex) % introStepLabels.length) + introStepLabels.length) % introStepLabels.length;
  introScreen.dataset.step = String(introStepIndex);
  if (introStepCaption) introStepCaption.textContent = introStepLabels[introStepIndex];
  const healthScore = document.querySelector('#introHealthScore');
  if (healthScore) healthScore.textContent = introHealthScores[introStepIndex] || introHealthScores[0];

  introDemoStepButtons.forEach((button) => {
    const isActive = Number(button.dataset.introStep) === introStepIndex;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  if (manual && !prefersReducedMotion()) {
    if (introStepTimer) window.clearInterval(introStepTimer);
    introStepTimer = window.setInterval(() => setIntroStep(introStepIndex + 1), 3800);
  }
}

function startIntroStepLoop() {
  setIntroStep(0);
  if (prefersReducedMotion()) return;
  if (introStepTimer) window.clearInterval(introStepTimer);
  introStepTimer = window.setInterval(() => setIntroStep(introStepIndex + 1), 3800);
}

function enterApplication({ instant = false } = {}) {
  clearIntroTimers();
  if (enterAppBtn) enterAppBtn.disabled = true;
  if (introScreen) introScreen.setAttribute('aria-hidden', 'true');
  if (instant && introScreen) {
    introScreen.style.transition = 'none';
  }
  document.body.classList.add('intro-leaving');

  window.requestAnimationFrame(() => {
    document.body.classList.remove('intro-active');
    document.body.classList.add('app-entered');
    window.setTimeout(() => {
      if (document.body.classList.contains('app-entered') && introScreen) {
        introScreen.hidden = true;
      }
      document.body.classList.remove('intro-leaving');
      showHome();
    }, instant ? 0 : 520);
  });
}

function showIntroDemo() {
  if (!introScreen || !appShell) return;
  if (enterAppBtn) enterAppBtn.disabled = false;
  introScreen.hidden = false;
  introScreen.style.transition = '';
  introScreen.setAttribute('aria-hidden', 'false');
  setScreenVisibility(homeScreen, false);
  setScreenVisibility(templateSetupScreen, false);
  setScreenVisibility(appShell, false);
  document.body.classList.remove('home-active', 'setup-active', 'app-entered', 'intro-leaving');
  document.body.classList.add('intro-active');
  startIntroSubtitleLoop();
  startIntroStepLoop();
}

function initIntroScreen() {
  if (!introScreen || !appShell) {
    document.body.classList.remove('intro-active');
    document.body.classList.add('app-entered');
    syncHealthPanelStickyOffset();
    return;
  }

  clearIntroTimers();
  showHome();

  if (enterAppBtn) {
    enterAppBtn.addEventListener('click', () => enterApplication());
  }
  if (introPreviewBtn) {
    introPreviewBtn.addEventListener('click', () => setIntroStep(0, { manual: true }));
  }
  introDemoStepButtons.forEach((button) => {
    button.addEventListener('click', () => setIntroStep(button.dataset.introStep, { manual: true }));
    button.addEventListener('mouseenter', () => setIntroStep(button.dataset.introStep, { manual: true }));
  });
}

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
    syncTaskCompletionFromSubtasks(task);
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
        if (syncTaskCompletionFromSubtasks(task)) {
          render();
          return;
        }
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
    makeBreakdownMeta('计划用时', task.start && task.end ? `${countWorkdaysInclusive(task.start, task.end)}个工作日` : '-'),
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
  ['子任务名称', '开始日期', '结束日期', '客户负责人', '我方负责人', '前置依赖', '优先级', '完成状态', '操作'].forEach((label) => {
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

function setStatus() {}

function syncHealthPanelStickyOffset() {
  if (!topbar || !layout) return;
  const topbarHeight = topbar.getBoundingClientRect().height;
  const layoutStyles = window.getComputedStyle(layout);
  const layoutPaddingTop = Number.parseFloat(layoutStyles.paddingTop) || 0;
  const stickyTop = Math.max(0, Math.ceil(topbarHeight + layoutPaddingTop));
  document.documentElement.style.setProperty('--health-sticky-top', `${stickyTop}px`);
}

function normalizeTimelineUnit(unit) {
  if (unit === 'day') return 'day';
  return unit === 'month' ? 'month' : 'week';
}

function timelineUnitLabel(unit = selectedTimelineUnit) {
  const normalizedUnit = normalizeTimelineUnit(unit);
  if (normalizedUnit === 'day') return '天视图';
  return normalizedUnit === 'month' ? '月视图' : '周视图';
}

function isPreviewEditableUnit(unit = selectedTimelineUnit) {
  return normalizeTimelineUnit(unit) !== 'month';
}

function updatePreviewEditControls() {
  if (previewEditBtn) {
    previewEditBtn.classList.toggle('active', previewEditMode);
    previewEditBtn.setAttribute('aria-pressed', String(previewEditMode));
    previewEditBtn.textContent = previewEditMode ? '完成编辑' : '编辑';
  }
  if (previewPanel) {
    previewPanel.classList.toggle('edit-mode', previewEditMode);
  }
  if (ganttPreview) {
    ganttPreview.classList.toggle('preview-edit-mode', previewEditMode);
  }
}

function clearPreviewRiskNotice() {
  if (!previewRiskNotice) return;
  previewRiskNotice.hidden = true;
  previewRiskNotice.textContent = '';
  previewRiskNotice.dataset.tone = 'clear';
}

function showPreviewRiskNotice(messages, tone = 'warning') {
  if (!previewRiskNotice) return;
  const list = Array.isArray(messages) ? messages.filter(Boolean) : [messages].filter(Boolean);
  if (!list.length) {
    clearPreviewRiskNotice();
    return;
  }
  previewRiskNotice.hidden = false;
  previewRiskNotice.dataset.tone = tone;
  previewRiskNotice.textContent = '';
  list.forEach((message) => {
    const item = document.createElement('span');
    item.textContent = message;
    previewRiskNotice.append(item);
  });
}

function setPreviewEditMode(enabled, renderPreviewAfterChange = true) {
  if (enabled && !isPreviewEditableUnit(selectedTimelineUnit)) {
    selectedTimelineUnit = 'week';
    updateTimelineUnitControls();
  }
  previewEditMode = Boolean(enabled);
  updatePreviewEditControls();
  if (renderPreviewAfterChange && ganttModal?.classList.contains('open')) {
    renderRightPane();
  }
}

function updateTimelineUnitControls() {
  const unit = normalizeTimelineUnit(selectedTimelineUnit);
  if (timelineUnitSelect) {
    timelineUnitSelect.value = unit;
  }
  if (previewGanttBtn) {
    const label = previewGanttBtn.querySelector('span') || previewGanttBtn;
    label.textContent = '预览甘特图';
  }
  document.body.dataset.ganttUnit = unit;
  updatePreviewEditControls();
}

function setTimelineUnit(unit, announce = false) {
  const nextUnit = normalizeTimelineUnit(unit);
  if (previewEditMode && !isPreviewEditableUnit(nextUnit)) {
    previewEditMode = false;
  }
  selectedTimelineUnit = nextUnit;
  updateTimelineUnitControls();
  if (ganttModal?.classList.contains('open')) renderRightPane();
  if (announce) {
    setStatus(`已切换为${timelineUnitLabel()}预览。`, 'ok');
  }
}

function getSelectedTemplate() {
  return projectTemplates.find((template) => template.id === selectedTemplateId) || projectTemplates[0] || null;
}

function setTemplateHint(message = '应用模板会替换当前计划，建议先保存版本。', stateName = '') {
  if (!templateHint) return;
  templateHint.textContent = message;
  if (stateName) {
    templateHint.dataset.state = stateName;
  } else {
    delete templateHint.dataset.state;
  }
}

function renderTemplateOptions() {
  if (!templateOptions) return;
  templateOptions.textContent = '';
  projectTemplates.forEach((template) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'template-option';
    option.dataset.templateId = template.id;
    option.setAttribute('aria-pressed', String(template.id === selectedTemplateId));
    option.classList.toggle('active', template.id === selectedTemplateId);

    const tags = document.createElement('div');
    tags.className = 'template-tags';
    template.tags.forEach((tag) => tags.append(makeElement('span', '', tag)));

    const phaseListNode = document.createElement('div');
    phaseListNode.className = 'template-phase-strip';
    template.phases.slice(0, 5).forEach((phase) => {
      phaseListNode.append(makeElement('span', '', phase.name));
    });

    option.append(
      makeElement('strong', 'template-option-title', template.name),
      makeElement('span', 'template-option-summary', template.summary),
      tags,
      phaseListNode,
      makeElement(
        'small',
        'template-option-meta',
        getTemplateMetaText(template),
      ),
    );

    option.addEventListener('click', () => {
      selectedTemplateId = template.id;
      renderTemplateOptions();
      setTemplateHint(`已选择「${template.name}」，确认后会替换当前计划。`);
    });

    templateOptions.append(option);
  });
}

function openTemplateDialog() {
  if (!templateDialog) return;
  if (!getSelectedTemplate()) selectedTemplateId = projectTemplates[0]?.id || '';
  if (templateStartInput && !isIsoDate(templateStartInput.value)) {
    templateStartInput.value = todayIsoDate();
  }
  renderTemplateOptions();
  setTemplateHint();
  templateDialog.classList.add('open');
  templateDialog.setAttribute('aria-hidden', 'false');
  document.body.classList.add('template-dialog-open');
  window.setTimeout(() => templateStartInput?.focus(), 0);
}

function closeTemplateDialog() {
  if (!templateDialog) return;
  templateDialog.classList.remove('open');
  templateDialog.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('template-dialog-open');
}

function applySelectedTemplate() {
  const template = getSelectedTemplate();
  const projectStart = templateStartInput?.value || '';
  if (!template) {
    setTemplateHint('当前没有可用模板。', 'error');
    return;
  }
  if (!isIsoDate(projectStart)) {
    setTemplateHint('请先填写有效的项目开始日期。', 'error');
    templateStartInput?.focus();
    return;
  }

  try {
    const project = buildProjectFromTemplate(template, projectStart);
    applyImportedProject(project, makeTemplateEntryContext(template));
    closeTemplateDialog();
    setStatus(`已应用「${template.name}」模板，生成 ${project.phases.length} 个阶段、${getProjectTaskCount(project)} 项任务。`, 'ok');
  } catch (error) {
    setTemplateHint(error instanceof Error ? error.message : String(error), 'error');
  }
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

function todayIsoDate() {
  const now = new Date();
  const timezoneOffsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffsetMs).toISOString().slice(0, 10);
}

function isWorkingDay(value) {
  return isIsoDate(value) && !getHolidayMeta(value);
}

function nextWorkingDayIso(value) {
  if (!isIsoDate(value)) return '';
  let cursor = value;
  let guard = 0;
  while (!isWorkingDay(cursor) && guard < 30) {
    cursor = addDaysIso(cursor, 1);
    guard += 1;
  }
  return cursor;
}

function previousWorkingDayIso(value) {
  if (!isIsoDate(value)) return '';
  let cursor = value;
  let guard = 0;
  while (!isWorkingDay(cursor) && guard < 30) {
    cursor = addDaysIso(cursor, -1);
    guard += 1;
  }
  return cursor;
}

function addWorkingDaysIso(value, workdayCount) {
  if (!isIsoDate(value)) return '';
  const targetDays = Math.max(1, Math.round(Number(workdayCount) || 1));
  let cursor = nextWorkingDayIso(value);
  let counted = cursor ? 1 : 0;
  let guard = 0;
  while (cursor && counted < targetDays && guard < 500) {
    cursor = addDaysIso(cursor, 1);
    if (isWorkingDay(cursor)) counted += 1;
    guard += 1;
  }
  return cursor;
}

function shiftWorkingDaysIso(value, offset) {
  if (!isIsoDate(value)) return '';
  const steps = Math.round(Number(offset) || 0);
  if (steps === 0) return nextWorkingDayIso(value);

  if (steps > 0) {
    let cursor = nextWorkingDayIso(value);
    for (let index = 0; index < steps; index += 1) {
      cursor = nextWorkingDayIso(addDaysIso(cursor, 1));
    }
    return cursor;
  }

  let cursor = previousWorkingDayIso(addDaysIso(nextWorkingDayIso(value), -1));
  for (let index = -1; index > steps; index -= 1) {
    cursor = previousWorkingDayIso(addDaysIso(cursor, -1));
  }
  return cursor;
}

function makeTemplateTask(name, start, end = start, milestone = false) {
  return {
    name,
    start,
    end,
    status: '未开始',
    progress: 0,
    milestone: Boolean(milestone),
  };
}

function makeTemplateWindowTask(name, anchorDate, startOffset, endOffset, milestone = false) {
  return makeTemplateTask(
    name,
    shiftWorkingDaysIso(anchorDate, startOffset),
    shiftWorkingDaysIso(anchorDate, endOffset),
    milestone,
  );
}

function getTemplateWorkdayCount(template) {
  return (template?.phases || []).reduce((sum, phase) => {
    return sum + phase.items.reduce((phaseSum, item) => {
      return phaseSum + (item.milestone ? 1 : Math.max(1, Math.round(Number(item.workdays) || 1)));
    }, 0);
  }, 0);
}

function getTemplateTaskCount(template) {
  return (template?.phases || []).reduce((sum, phase) => sum + phase.items.length, 0);
}

function getTemplateMetaText(template) {
  const baseText = `${template?.phases?.length || 0} 个阶段 · ${getTemplateTaskCount(template)} 项任务`;
  if (template.durationLabel === '') return baseText;
  return `${baseText} · ${template.durationLabel || `约 ${getTemplateWorkdayCount(template)} 个工作日`}`;
}

function makeTemplatePhase(name, tasks) {
  return {
    name,
    start: minIsoDate(tasks.map((task) => task.start)),
    end: maxIsoDate(tasks.map((task) => task.end || task.start)),
    tasks,
  };
}

function buildSaasDeliveryProjectFromTemplate(template, projectStart) {
  const kickoffStart = nextWorkingDayIso(projectStart);
  if (!kickoffStart) throw new Error('请选择有效的项目启动日期');

  const projectPrepTasks = [
    makeTemplateWindowTask('概念培训', kickoffStart, 0, 0),
    makeTemplateWindowTask('确认SOW', kickoffStart, 0, 1),
    makeTemplateWindowTask('组织结构与通讯录', kickoffStart, 0, 2),
    makeTemplateWindowTask('沟通管理计划', kickoffStart, 0, 2),
    makeTemplateWindowTask('变更管理计划', kickoffStart, 0, 2),
    makeTemplateWindowTask('项目进度计划', kickoffStart, 0, 2),
    makeTemplateWindowTask('项目启动会', kickoffStart, 3, 4, true),
  ];
  const kickoffEnd = projectPrepTasks[projectPrepTasks.length - 1].end;

  const interviewPrepare = makeTemplateWindowTask('访谈准备', kickoffEnd, 1, 2);
  const requirementInterview = makeTemplateWindowTask('需求访谈', interviewPrepare.end, 1, 14);
  const requirementResearchTasks = [
    interviewPrepare,
    requirementInterview,
    makeTemplateWindowTask('功能需求清单', interviewPrepare.end, 10, 17),
    makeTemplateWindowTask('接口需求清单', interviewPrepare.end, 10, 17),
  ];
  const requirementResearchEnd = maxIsoDate(requirementResearchTasks.map((task) => task.end));

  const blueprintDesign = makeTemplateWindowTask('蓝图设计', requirementResearchEnd, 1, 7);
  const blueprintReview = makeTemplateWindowTask('蓝图内部评审', blueprintDesign.end, 1, 3);
  const blueprintConfirm = makeTemplateWindowTask('蓝图确认', blueprintReview.end, 1, 2, true);
  const blueprintTasks = [
    makeTemplateWindowTask('功能开发设计', requirementResearchEnd, 1, 3),
    makeTemplateWindowTask('接口开发设计', requirementResearchEnd, 1, 3),
    blueprintDesign,
    blueprintReview,
    blueprintConfirm,
  ];
  const blueprintConfirmEnd = blueprintConfirm.end;

  const uatTest = makeTemplateWindowTask('UAT测试', blueprintConfirmEnd, 20, 35);
  const goLive = makeTemplateWindowTask('上线切换', uatTest.end, 9, 9, true);
  const implementationTasks = [
    makeTemplateWindowTask('基础数据收集', blueprintConfirmEnd, 1, 5),
    makeTemplateWindowTask('系统配置', blueprintConfirmEnd, 1, 6),
    makeTemplateWindowTask('功能开发', blueprintConfirmEnd, 1, 10),
    makeTemplateWindowTask('接口开发', blueprintConfirmEnd, 1, 10),
    makeTemplateWindowTask('单元测试', blueprintConfirmEnd, 6, 15),
    makeTemplateWindowTask('集成测试', blueprintConfirmEnd, 10, 20),
    uatTest,
    makeTemplateWindowTask('上线切换准备', uatTest.end, 1, 10),
    makeTemplateWindowTask('用户培训', uatTest.end, 7, 9),
    goLive,
  ];

  const goLiveEnd = goLive.end;
  const supportTasks = [
    makeTemplateWindowTask('上线后支持', goLiveEnd, 1, 30),
    makeTemplateWindowTask('运维交接', goLiveEnd, 30, 30),
    makeTemplateWindowTask('项目验收', goLiveEnd, 30, 45),
  ];

  return {
    title: template.title || DEFAULT_TITLE,
    projectStart: kickoffStart,
    phases: [
      makeTemplatePhase('项目准备', projectPrepTasks),
      makeTemplatePhase('需求调研', requirementResearchTasks),
      makeTemplatePhase('蓝图设计', blueprintTasks),
      makeTemplatePhase('实施测试', implementationTasks),
      makeTemplatePhase('上线支持', supportTasks),
    ],
  };
}

function buildAgileIterationProjectFromTemplate(template, projectStart) {
  const iterationStart = nextWorkingDayIso(projectStart);
  if (!iterationStart) throw new Error('请选择有效的项目启动日期');

  const storyPlanning = makeTemplateWindowTask('用户故事梳理与优先级排序', iterationStart, 0, 2);
  const technicalReview = makeTemplateWindowTask('技术方案评审与估时', storyPlanning.end, 1, 2, true);
  const sprintPlanningTasks = [storyPlanning, technicalReview];
  const technicalReviewEnd = technicalReview.end;

  const backendDevelopment = makeTemplateWindowTask('后端接口开发', technicalReviewEnd, 1, 10);
  const frontendDevelopment = makeTemplateWindowTask('前端/移动端页面开发', technicalReviewEnd, 1, 10);
  const developmentEnd = maxIsoDate([backendDevelopment.end, frontendDevelopment.end]);
  const integrationTest = makeTemplateWindowTask('前后端联调', developmentEnd, 1, 2, true);
  const developmentTasks = [backendDevelopment, frontendDevelopment, integrationTest];

  const testCaseDesign = makeTemplateWindowTask('功能测试用例编写', technicalReviewEnd, 1, 5);
  const systemTest = makeTemplateWindowTask('冒烟测试与系统测试', integrationTest.end, 1, 5);
  const regressionTest = makeTemplateWindowTask('回归测试与Bug修复', systemTest.end, 1, 3, true);
  const qualityTasks = [testCaseDesign, systemTest, regressionTest];

  const storeReview = makeTemplateWindowTask('应用商店/应用市场提审', regressionTest.end, 1, 7, true);
  const grayRelease = makeTemplateWindowTask('灰度发布与监控', storeReview.end, 1, 2);
  const fullRelease = makeTemplateWindowTask('全量发布与版本号更新', grayRelease.end, 1, 1, true);
  const releaseTasks = [storeReview, grayRelease, fullRelease];

  return {
    title: template.title || DEFAULT_TITLE,
    projectStart: iterationStart,
    phases: [
      makeTemplatePhase('Sprint规划', sprintPlanningTasks),
      makeTemplatePhase('开发实施', developmentTasks),
      makeTemplatePhase('质量保障', qualityTasks),
      makeTemplatePhase('发版与交付', releaseTasks),
    ],
  };
}

function buildLargeMarketingEventProjectFromTemplate(template, projectStart) {
  const eventProjectStart = nextWorkingDayIso(projectStart);
  if (!eventProjectStart) throw new Error('请选择有效的项目启动日期');

  const planApproval = makeTemplateWindowTask('活动方案与预算审批', eventProjectStart, 0, 9);
  const venueBooking = makeTemplateWindowTask('场地预定', eventProjectStart, 0, 2, true);
  const guestInvitation = makeTemplateWindowTask('核心嘉宾邀约', eventProjectStart, 0, 29);
  const planningTasks = [planApproval, venueBooking, guestInvitation];

  const keyVisual = makeTemplateWindowTask('主视觉设计与延展', planApproval.end, 1, 15, true);
  const promoVideo = makeTemplateWindowTask('宣传视频制作', keyVisual.end, 1, 20);
  const boothMaterials = makeTemplateWindowTask('展台及印刷品制作', keyVisual.end, 1, 15);
  const contentTasks = [keyVisual, promoVideo, boothMaterials];

  const preheatMedia = makeTemplateWindowTask('预热期媒体投放', planApproval.end, 1, 15, true);
  const countdownPosts = makeTemplateWindowTask('倒计时海报/推文', preheatMedia.end, 1, 5);
  const mediaConfirmation = makeTemplateWindowTask('媒体记者确认', preheatMedia.start, 1, 10);
  const promotionTasks = [preheatMedia, countdownPosts, mediaConfirmation];

  const contentReadyEnd = maxIsoDate([promoVideo.end, boothMaterials.end]);
  const rehearsal = makeTemplateWindowTask('舞台搭建与彩排', contentReadyEnd, 1, 2);
  const eventDay = makeTemplateWindowTask('活动当天流程管控', rehearsal.end, 1, 1, true);
  const executionTasks = [rehearsal, eventDay];

  const mediaMonitoring = makeTemplateWindowTask('媒体通稿发布与舆情监控', eventDay.end, 1, 3);
  const closeoutReport = makeTemplateWindowTask('项目结算与复盘报告', mediaMonitoring.end, 1, 5, true);
  const closeoutTasks = [mediaMonitoring, closeoutReport];

  return {
    title: template.title || DEFAULT_TITLE,
    projectStart: eventProjectStart,
    phases: [
      makeTemplatePhase('策划与邀约', planningTasks),
      makeTemplatePhase('内容与物料', contentTasks),
      makeTemplatePhase('宣传推广', promotionTasks),
      makeTemplatePhase('现场执行', executionTasks),
      makeTemplatePhase('复盘收尾', closeoutTasks),
    ],
  };
}

function buildProjectFromTemplate(template, projectStart) {
  const safeStart = nextWorkingDayIso(projectStart);
  if (!template || !safeStart) throw new Error('请选择模板并填写有效的项目开始日期');

  if (template.schedule === 'saas-delivery-relative') {
    return buildSaasDeliveryProjectFromTemplate(template, safeStart);
  }
  if (template.schedule === 'agile-iteration-relative') {
    return buildAgileIterationProjectFromTemplate(template, safeStart);
  }
  if (template.schedule === 'large-marketing-event-relative') {
    return buildLargeMarketingEventProjectFromTemplate(template, safeStart);
  }

  let cursor = safeStart;
  const phases = template.phases.map((phaseTemplateItem) => {
    const tasks = phaseTemplateItem.items.map((item) => {
      const start = nextWorkingDayIso(cursor);
      const end = item.milestone ? start : addWorkingDaysIso(start, item.workdays);
      cursor = nextWorkingDayIso(addDaysIso(end, 1));
      return {
        name: item.name,
        start,
        end,
        status: '未开始',
        progress: 0,
        milestone: Boolean(item.milestone),
      };
    });

    return makeTemplatePhase(phaseTemplateItem.name, tasks);
  });

  return {
    title: template.title || DEFAULT_TITLE,
    projectStart: safeStart,
    phases,
  };
}

function sortTasksByStart(phase) {
  phase.tasks.sort((a, b) => {
    return dateSortValue(a.start) - dateSortValue(b.start);
  });
}

function sortTasksByStartWithBreakdownRemap(phase, phaseIndex) {
  const previousTasks = [...phase.tasks];
  sortTasksByStart(phase);
  if (breakdownOpen.phaseIndex !== phaseIndex || !Number.isInteger(breakdownOpen.taskIndex)) return;
  const openTask = previousTasks[breakdownOpen.taskIndex];
  const nextTaskIndex = phase.tasks.indexOf(openTask);
  breakdownOpen = nextTaskIndex >= 0
    ? { ...breakdownOpen, taskIndex: nextTaskIndex }
    : { phaseIndex: -1, taskIndex: -1 };
}

function isPhaseReadyForSort(phase) {
  return isIsoDate(phase.start) && isIsoDate(phase.end);
}

function remapPhaseIndexes(previousPhases) {
  const nextIndexByPhase = new Map(state.phases.map((phase, index) => [phase, index]));
  expandedPhaseIndexes = new Set([...expandedPhaseIndexes]
    .map((index) => nextIndexByPhase.get(previousPhases[index]))
    .filter((index) => Number.isInteger(index)));

  if (Number.isInteger(focusedPhaseIndex)) {
    const nextFocusedIndex = nextIndexByPhase.get(previousPhases[focusedPhaseIndex]);
    focusedPhaseIndex = Number.isInteger(nextFocusedIndex) ? nextFocusedIndex : null;
  }

  if (Number.isInteger(breakdownOpen.phaseIndex)) {
    const nextBreakdownPhaseIndex = nextIndexByPhase.get(previousPhases[breakdownOpen.phaseIndex]);
    breakdownOpen = Number.isInteger(nextBreakdownPhaseIndex)
      ? { ...breakdownOpen, phaseIndex: nextBreakdownPhaseIndex }
      : { phaseIndex: -1, taskIndex: -1 };
  }
}

function sortPhasesByStart() {
  const previousPhases = [...state.phases];
  const previousIndexByPhase = new Map(previousPhases.map((phase, index) => [phase, index]));
  state.phases.sort((a, b) => {
    const aReady = isPhaseReadyForSort(a);
    const bReady = isPhaseReadyForSort(b);
    if (aReady && !bReady) return 1;
    if (!aReady && bReady) return -1;
    if (!aReady && !bReady) {
      return previousIndexByPhase.get(a) - previousIndexByPhase.get(b);
    }
    return dateSortValue(a.start) - dateSortValue(b.start)
      || dateSortValue(a.end) - dateSortValue(b.end)
      || previousIndexByPhase.get(a) - previousIndexByPhase.get(b);
  });
  remapPhaseIndexes(previousPhases);
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

function areAllSubtasksCompleted(task) {
  const subtasks = Array.isArray(task?.subtasks) ? task.subtasks : [];
  return subtasks.length > 0 && subtasks.every((subtask) => subtask.status === '已完成');
}

function getIncompleteTaskStatusFromSubtasks(task) {
  const subtasks = Array.isArray(task?.subtasks) ? task.subtasks : [];
  const hasActiveSubtask = subtasks.some((subtask) => ['已完成', '进行中'].includes(subtask.status));
  return hasActiveSubtask ? '进行中' : '未开始';
}

function syncTaskCompletionFromSubtasks(task) {
  const nextStatus = areAllSubtasksCompleted(task)
    ? '已完成'
    : getTaskStatus(task) === '已完成'
      ? getIncompleteTaskStatusFromSubtasks(task)
      : null;
  if (!nextStatus || getTaskStatus(task) === nextStatus) return false;
  task.status = nextStatus;
  task.progress = defaultProgressForStatus(nextStatus);
  return true;
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

function estimatePreviewTextWidth(text, font, padding = 0) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) context.font = font;
  const textWidth = context ? context.measureText(String(text || '')).width : String(text || '').length * 10;
  return Math.ceil(textWidth + padding);
}

function getPreviewDayOffset(value, projectStartValue) {
  return Math.max(0, Math.round((dateSortValue(value) - dateSortValue(projectStartValue)) / 86400000));
}

function getPreviewDayWidth(dayIndex, dayWidthsPx) {
  return dayWidthsPx?.[dayIndex - 1] || PREVIEW_DAY_WIDTH;
}

function getPreviewDayTimelinePx(dayOffset, dayWidthsPx) {
  if (dayOffset < 0) {
    return dayOffset * getPreviewDayWidth(1, dayWidthsPx);
  }
  let px = 0;
  for (let index = 1; index <= dayOffset; index += 1) px += getPreviewDayWidth(index, dayWidthsPx);
  return px;
}

function getPreviewDayDurationPx(startOffset, durationDays, dayWidthsPx) {
  return getPreviewDayTimelinePx(startOffset + durationDays, dayWidthsPx) - getPreviewDayTimelinePx(startOffset, dayWidthsPx);
}

function getPreviewDayOffsetFromDayTimelinePx(px, dayWidthsPx) {
  const widths = Array.isArray(dayWidthsPx) && dayWidthsPx.length ? dayWidthsPx : [PREVIEW_DAY_WIDTH];
  if (px < 0) {
    return Math.round(px / (widths[0] || PREVIEW_DAY_WIDTH));
  }

  let remainingPx = px;
  for (let index = 0; index < widths.length; index += 1) {
    const widthPx = widths[index] || PREVIEW_DAY_WIDTH;
    if (remainingPx <= widthPx) {
      return index + Math.round(remainingPx / widthPx);
    }
    remainingPx -= widthPx;
  }

  const lastWidth = widths[widths.length - 1] || PREVIEW_DAY_WIDTH;
  return widths.length + Math.round(remainingPx / lastWidth);
}

function getPreviewWeekWidth(weekIndex, weekWidthsPx) {
  return weekWidthsPx?.[weekIndex - 1] || PREVIEW_WEEK_WIDTH;
}

function getPreviewTimelinePx(dayOffset, weekWidthsPx) {
  if (dayOffset < 0) {
    return (dayOffset * getPreviewWeekWidth(1, weekWidthsPx)) / 7;
  }
  const weekIndex = Math.floor(dayOffset / 7) + 1;
  const dayInWeek = dayOffset % 7;
  let px = 0;
  for (let index = 1; index < weekIndex; index += 1) px += getPreviewWeekWidth(index, weekWidthsPx);
  return px + (dayInWeek * getPreviewWeekWidth(weekIndex, weekWidthsPx)) / 7;
}

function getPreviewDurationPx(startOffset, durationDays, weekWidthsPx) {
  return getPreviewTimelinePx(startOffset + durationDays, weekWidthsPx) - getPreviewTimelinePx(startOffset, weekWidthsPx);
}

function getPreviewDayOffsetFromTimelinePx(px, weekWidthsPx) {
  const widths = Array.isArray(weekWidthsPx) && weekWidthsPx.length ? weekWidthsPx : [PREVIEW_WEEK_WIDTH];
  if (px < 0) {
    return Math.round((px / (widths[0] || PREVIEW_WEEK_WIDTH)) * 7);
  }

  let remainingPx = px;
  for (let index = 0; index < widths.length; index += 1) {
    const widthPx = widths[index] || PREVIEW_WEEK_WIDTH;
    if (remainingPx <= widthPx) {
      return index * 7 + Math.round((remainingPx / widthPx) * 7);
    }
    remainingPx -= widthPx;
  }

  const lastWidth = widths[widths.length - 1] || PREVIEW_WEEK_WIDTH;
  return widths.length * 7 + Math.round((remainingPx / lastWidth) * 7);
}

function getPreviewMilestonePointPx(item, projectStartValue, weekWidthsPx) {
  return getPreviewTimelinePx(getPreviewDayOffset(item.end, projectStartValue) + 1, weekWidthsPx);
}

function getPreviewUnitTimelinePx(dayOffset, timeline) {
  if (normalizeTimelineUnit(timeline?.unit) === 'day') {
    return getPreviewDayTimelinePx(dayOffset, timeline.dayWidthsPx);
  }
  return getPreviewTimelinePx(dayOffset, timeline?.weekWidthsPx);
}

function getPreviewUnitDurationPx(startOffset, durationDays, timeline) {
  if (normalizeTimelineUnit(timeline?.unit) === 'day') {
    return getPreviewDayDurationPx(startOffset, durationDays, timeline.dayWidthsPx);
  }
  return getPreviewDurationPx(startOffset, durationDays, timeline?.weekWidthsPx);
}

function getPreviewUnitDayOffsetFromTimelinePx(px, timeline) {
  if (normalizeTimelineUnit(timeline?.unit) === 'day') {
    return getPreviewDayOffsetFromDayTimelinePx(px, timeline.dayWidthsPx);
  }
  return getPreviewDayOffsetFromTimelinePx(px, timeline?.weekWidthsPx);
}

function getPreviewUnitMilestonePointPx(item, timeline) {
  return getPreviewUnitTimelinePx(getPreviewDayOffset(item.end, timeline.projectStartValue) + 1, timeline);
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

function getPreviewExtraDays(projectStartValue, baseDays) {
  const baseTrackWidth = baseDays * PREVIEW_DAY_WIDTH;
  let extraDays = 0;

  state.phases.forEach((phase, phaseIndex) => {
    phase.tasks.forEach((task) => {
      if (!task.milestone || !isIsoDate(task.start) || !isIsoDate(task.end)) return;
      const pointPx = (getPreviewDayOffset(task.end, projectStartValue) + 1) * PREVIEW_DAY_WIDTH;
      const markerGapPx = Number.isFinite(task.markerGapPx) ? task.markerGapPx : PREVIEW_MILESTONE_BAR_TO_STAR_GAP;
      const markerRightPx = pointPx
        + markerGapPx
        + PREVIEW_MILESTONE_STAR_WIDTH
        + PREVIEW_MILESTONE_STAR_TO_TEXT_GAP
        + estimatePreviewMilestoneWidth({ ...task, phaseIndex });
      const overflowPx = Math.max(0, markerRightPx - baseTrackWidth);
      if (overflowPx > 0) {
        extraDays = Math.max(extraDays, Math.ceil(overflowPx / PREVIEW_DAY_WIDTH));
      }
    });
  });

  return extraDays;
}

function getPreviewRange() {
  const projectStartValue = getEarliestPhaseStart();
  const allDates = getAllPreviewDates();
  const projectEndValue = maxIsoDate(allDates);
  if (!projectStartValue || !projectEndValue) return null;
  const baseDays = Math.max(1, daysInclusiveIso(projectStartValue, projectEndValue));
  const extraDays = getPreviewExtraDays(projectStartValue, baseDays);
  const totalDays = Math.min(PREVIEW_MAX_WEEKS * 7, Math.max(1, baseDays + extraDays));
  const baseWeeks = Math.max(4, Math.ceil(daysInclusiveIso(projectStartValue, projectEndValue) / 7));
  const extraWeeks = getPreviewExtraWeeks(projectStartValue, baseWeeks);
  const totalWeeks = Math.min(PREVIEW_MAX_WEEKS, Math.max(4, baseWeeks + extraWeeks));
  return { projectStartValue, projectEndValue, totalDays, totalWeeks };
}

function getPreviewRows() {
  return state.phases.flatMap((phase, phaseIndex) => [
    { ...phase, progress: getPhaseProgress(phase), kind: 'phase', phaseIndex },
    ...phase.tasks.map((task, taskIndex) => ({ ...task, kind: 'sub', phaseIndex, taskIndex })),
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
  return bands.map((band) => {
    return {
      ...band,
      spanWeeks: band.toWeek - band.fromWeek + 1,
    };
  });
}

function buildPreviewWeekColumns(projectStartValue, totalWeeks) {
  const weekColumns = Array.from({ length: totalWeeks }, (_, index) => {
    const weekStart = addDaysIso(projectStartValue, index * 7);
    return {
      weekIndex: index + 1,
      start: weekStart,
      end: addDaysIso(weekStart, 6),
      widthPx: PREVIEW_WEEK_WIDTH,
    };
  });

  getMonthBands(projectStartValue, totalWeeks).forEach((band) => {
    const requiredWidth = estimatePreviewTextWidth(
      band.label,
      '850 15px "Avenir Next", "PingFang SC", "Microsoft YaHei", sans-serif',
      PREVIEW_WEEK_MONTH_LABEL_PADDING,
    );
    const spanColumns = weekColumns.slice(band.fromWeek - 1, band.toWeek);
    const currentWidth = spanColumns.reduce((sum, column) => sum + column.widthPx, 0);
    if (!spanColumns.length || currentWidth >= requiredWidth) return;
    const extraWidth = (requiredWidth - currentWidth) / spanColumns.length;
    spanColumns.forEach((column) => {
      column.widthPx += extraWidth;
    });
  });

  weekColumns.forEach((column) => {
    column.widthPx = Math.ceil(column.widthPx);
  });
  return weekColumns;
}

function weekdayLabel(value) {
  const date = isoToUtcDate(value);
  if (!date) return '';
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getUTCDay()];
}

function isWeekendIso(value) {
  const date = isoToUtcDate(value);
  if (!date) return false;
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

function getDayMonthBands(dayColumns) {
  const bands = [];
  let activeBand = null;
  dayColumns.forEach((column) => {
    const label = monthLabel(column.date);
    if (!activeBand || activeBand.label !== label) {
      activeBand = { label, fromDay: column.dayIndex, toDay: column.dayIndex };
      bands.push(activeBand);
    } else {
      activeBand.toDay = column.dayIndex;
    }
  });
  return bands.map((band) => ({
    ...band,
    spanDays: band.toDay - band.fromDay + 1,
  }));
}

function buildPreviewDayColumns(projectStartValue, totalDays) {
  const dayColumns = Array.from({ length: totalDays }, (_, index) => {
    const date = addDaysIso(projectStartValue, index);
    return {
      dayIndex: index + 1,
      date,
      dayLabel: String(Number(date.slice(8, 10))),
      weekdayLabel: weekdayLabel(date),
      isWeekend: isWeekendIso(date),
      widthPx: PREVIEW_DAY_WIDTH,
    };
  });

  getDayMonthBands(dayColumns).forEach((band) => {
    const requiredWidth = estimatePreviewTextWidth(
      band.label,
      '850 15px "Avenir Next", "PingFang SC", "Microsoft YaHei", sans-serif',
      PREVIEW_WEEK_MONTH_LABEL_PADDING,
    );
    const spanColumns = dayColumns.slice(band.fromDay - 1, band.toDay);
    const currentWidth = spanColumns.reduce((sum, column) => sum + column.widthPx, 0);
    if (!spanColumns.length || currentWidth >= requiredWidth) return;
    const extraWidth = (requiredWidth - currentWidth) / spanColumns.length;
    spanColumns.forEach((column) => {
      column.widthPx += extraWidth;
    });
  });

  dayColumns.forEach((column) => {
    column.widthPx = Math.ceil(column.widthPx);
  });
  return dayColumns;
}

function getMonthStartIso(value) {
  if (!isIsoDate(value)) return '';
  return `${value.slice(0, 7)}-01`;
}

function addMonthsIso(value, months) {
  if (!isIsoDate(value)) return value || '';
  const [year, month] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1 + months, 1));
  return date.toISOString().slice(0, 10);
}

function getMonthEndIso(value) {
  const monthStart = getMonthStartIso(value);
  return monthStart ? addDaysIso(addMonthsIso(monthStart, 1), -1) : '';
}

function monthShortLabel(value) {
  if (!isIsoDate(value)) return '';
  return `${Number(value.slice(5, 7))}月`;
}

function buildPreviewMonthColumns(projectStartValue, projectEndValue) {
  const columns = [];
  let cursor = getMonthStartIso(projectStartValue);
  const endMonth = getMonthStartIso(projectEndValue);
  if (!cursor || !endMonth) return columns;

  while (compareIsoDates(cursor, endMonth) <= 0 && columns.length < 48) {
    const end = getMonthEndIso(cursor);
    columns.push({
      monthIndex: columns.length + 1,
      start: cursor,
      end,
      label: monthShortLabel(cursor),
      yearLabel: `${cursor.slice(0, 4)}年`,
      days: daysInclusiveIso(cursor, end),
    });
    cursor = addMonthsIso(cursor, 1);
  }

  while (columns.length < 4) {
    const last = columns[columns.length - 1];
    const nextStart = last ? addMonthsIso(last.start, 1) : getMonthStartIso(projectStartValue);
    const nextEnd = getMonthEndIso(nextStart);
    columns.push({
      monthIndex: columns.length + 1,
      start: nextStart,
      end: nextEnd,
      label: monthShortLabel(nextStart),
      yearLabel: `${nextStart.slice(0, 4)}年`,
      days: daysInclusiveIso(nextStart, nextEnd),
    });
  }

  return columns;
}

function getYearBands(monthColumns) {
  const bands = [];
  let activeBand = null;
  monthColumns.forEach((column) => {
    if (!activeBand || activeBand.label !== column.yearLabel) {
      activeBand = { label: column.yearLabel, fromMonth: column.monthIndex, toMonth: column.monthIndex };
      bands.push(activeBand);
    } else {
      activeBand.toMonth = column.monthIndex;
    }
  });
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

function setSaveVersionHint(message = '保存后可在历史版本中恢复或导出。', type = '') {
  if (!saveVersionHint) return;
  saveVersionHint.textContent = message;
  saveVersionHint.dataset.state = type;
}

function openSaveVersionDialog() {
  if (!saveVersionDialog) {
    saveCurrentVersion();
    return;
  }
  closeIoMenu();
  saveVersionDialog.classList.add('open');
  saveVersionDialog.setAttribute('aria-hidden', 'false');
  document.body.classList.add('save-version-open');
  setSaveVersionHint();
  if (saveVersionNameInput) {
    saveVersionNameInput.value = makeDefaultVersionName();
    requestAnimationFrame(() => {
      saveVersionNameInput.focus();
      saveVersionNameInput.select();
    });
  }
}

function closeSaveVersionDialog() {
  saveVersionDialog?.classList.remove('open');
  saveVersionDialog?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('save-version-open');
  setSaveVersionHint();
}

function confirmSaveVersion() {
  const name = String(saveVersionNameInput?.value || '').trim();
  if (!name) {
    setSaveVersionHint('请先填写版本名称。', 'error');
    saveVersionNameInput?.focus();
    return;
  }
  const record = saveCurrentVersion(name);
  if (record) closeSaveVersionDialog();
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
  applyImportedProject(record.project, makeHistoryEntryContext(record.name));
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
      body: JSON.stringify({
        ...record.project,
        timelineUnit: normalizeTimelineUnit(selectedTimelineUnit),
      }),
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
  if (metrics.phaseCount === 0) {
    return {
      tone: 'ready',
      label: '待排期',
      detail: '先创建阶段与任务',
    };
  }

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
  const hasSchedule = metrics.totalDays > 0;
  remainingCopy.append(
    makeElement('h3', '', '剩余工期'),
    makeElement('div', 'health-metric-value', hasSchedule ? `${metrics.remainingDays} 天` : '待排期'),
    makeElement(
      'div',
      'health-metric-sub',
      hasSchedule
        ? `总 ${metrics.totalDays} 天 · 已过 ${metrics.elapsedDays} 天 · 剩 ${metrics.remainingDays} 天`
        : '创建阶段后自动计算工期',
    ),
  );
  remainingCard.append(
    remainingCopy,
    makeElement('span', 'metric-badge', hasSchedule ? `${metrics.remainingWorkdays} 个有效工作日` : '等待计划区间'),
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

function durationText(item, unit = selectedTimelineUnit) {
  const days = daysInclusiveIso(item.start, item.end);
  const normalizedUnit = normalizeTimelineUnit(unit);
  if (!days) return '';
  if (item.kind === 'phase' && normalizedUnit === 'month') {
    return `${Math.max(1, Math.ceil(days / 30))}月（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
  }
  if (item.kind === 'phase' && normalizedUnit === 'day') {
    return `${days}天（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
  }
  if (item.kind !== 'phase') {
    const workdays = countWorkdaysInclusive(item.start, item.end);
    return `${workdays}个工作日（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
  }
  return item.kind === 'phase'
    ? `${Math.ceil(days / 7)}周（${fmtMd(item.start)}-${fmtMd(item.end)}）`
    : `${days}天（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
}

function getMonthTimelinePx(value, monthColumns, includeEnd = false) {
  if (!isIsoDate(value) || !monthColumns.length) return 0;
  const firstStart = monthColumns[0].start;
  const last = monthColumns[monthColumns.length - 1];
  if (compareIsoDates(value, firstStart) < 0) return 0;
  if (compareIsoDates(value, last.end) > 0) return monthColumns.length * PREVIEW_MONTH_WIDTH;

  const targetMonth = getMonthStartIso(value);
  const monthIndex = monthColumns.findIndex((column) => column.start === targetMonth);
  if (monthIndex < 0) return monthColumns.length * PREVIEW_MONTH_WIDTH;
  const column = monthColumns[monthIndex];
  const day = Number(value.slice(8, 10));
  const dayOffset = Math.min(column.days, Math.max(0, day - 1 + (includeEnd ? 1 : 0)));
  return monthIndex * PREVIEW_MONTH_WIDTH + (dayOffset * PREVIEW_MONTH_WIDTH) / column.days;
}

function getPreviewBarMetrics(item, timeline) {
  if (!isIsoDate(item.start) || !isIsoDate(item.end)) return;
  const durationDays = daysInclusiveIso(item.start, item.end);
  const drawAsMilestonePoint = item.kind === 'sub' && item.milestone && durationDays === 1;

  if (timeline.unit === 'month') {
    const startPx = getMonthTimelinePx(item.start, timeline.monthColumns, false);
    const endPx = getMonthTimelinePx(item.end, timeline.monthColumns, true);
    const pointPx = getMonthTimelinePx(item.end, timeline.monthColumns, true);
    const barWidthPx = drawAsMilestonePoint ? PREVIEW_MILESTONE_MARKER_WIDTH : Math.max(6, endPx - startPx);
    return {
      leftPx: drawAsMilestonePoint ? pointPx - barWidthPx : startPx,
      barWidthPx,
      pointPx,
    };
  }

  const dayOffset = getPreviewDayOffset(item.start, timeline.projectStartValue);
  const pointPx = item.milestone ? getPreviewUnitMilestonePointPx(item, timeline) : null;
  const barWidthPx = drawAsMilestonePoint
    ? PREVIEW_MILESTONE_MARKER_WIDTH
    : getPreviewUnitDurationPx(dayOffset, durationDays, timeline);
  return {
    leftPx: drawAsMilestonePoint ? pointPx - barWidthPx : getPreviewUnitTimelinePx(dayOffset, timeline),
    barWidthPx,
    pointPx,
  };
}

function shiftSubtaskSchedule(subtask, dayDelta) {
  if (!subtask || !dayDelta) return;
  if (isIsoDate(subtask.start)) subtask.start = addDaysIso(subtask.start, dayDelta);
  if (isIsoDate(subtask.end)) subtask.end = addDaysIso(subtask.end, dayDelta);
}

function shiftTaskSchedule(task, dayDelta) {
  if (!task || !dayDelta || !isIsoDate(task.start) || !isIsoDate(task.end)) return false;
  task.start = addDaysIso(task.start, dayDelta);
  task.end = addDaysIso(task.end, dayDelta);
  task.endTouched = true;
  if (Array.isArray(task.subtasks)) {
    task.subtasks.forEach((subtask) => shiftSubtaskSchedule(subtask, dayDelta));
  }
  return true;
}

function normalizeTaskSubtasks(task) {
  if (!Array.isArray(task?.subtasks)) return;
  task.subtasks.forEach((subtask) => {
    ensureSubtaskDefaults(subtask, task);
    normalizeSubtaskDates(subtask, task);
  });
}

function resizeTaskSchedule(task, nextStart, nextEnd) {
  if (!task || !isIsoDate(nextStart) || !isIsoDate(nextEnd)) return false;
  if (compareIsoDates(nextEnd, nextStart) < 0) return false;
  task.start = nextStart;
  task.end = nextEnd;
  task.endTouched = true;
  normalizeTaskSubtasks(task);
  return true;
}

function ensurePhaseCoversTask(phase, task) {
  if (!phase || !task || !isIsoDate(task.start) || !isIsoDate(task.end)) return;
  if (!isIsoDate(phase.start) || compareIsoDates(task.start, phase.start) < 0) phase.start = task.start;
  if (!isIsoDate(phase.end) || compareIsoDates(task.end, phase.end) > 0) phase.end = task.end;
}

function getPhaseBoundaryRiskMessages(phase, nextStart, nextEnd) {
  const messages = [];
  if (!phase || !isIsoDate(nextStart) || !isIsoDate(nextEnd)) return messages;
  const beforeStart = phase.start;
  const beforeEnd = phase.end;
  const willExtendStart = isIsoDate(beforeStart) && compareIsoDates(nextStart, beforeStart) < 0;
  const willExtendEnd = isIsoDate(beforeEnd) && compareIsoDates(nextEnd, beforeEnd) > 0;
  if (willExtendStart || willExtendEnd || !isIsoDate(beforeStart) || !isIsoDate(beforeEnd)) {
    const finalStart = willExtendStart || !isIsoDate(beforeStart) ? nextStart : beforeStart;
    const finalEnd = willExtendEnd || !isIsoDate(beforeEnd) ? nextEnd : beforeEnd;
    messages.push(`已超出原阶段范围，阶段周期将同步为 ${finalStart} - ${finalEnd}`);
  }
  return messages;
}

function getHolidayRiskMessages(start, end, subject = '任务') {
  const summary = summarizeHolidayRange(start, end);
  if (summary.tone !== 'holiday' && summary.tone !== 'weekend') return [];
  return [`${subject}区间包含 ${summary.primary}非工作日（${summary.secondary}）`];
}

function buildScheduleRiskMessages(phase, task, nextStart, nextEnd, subject = '任务') {
  return [
    ...getPhaseBoundaryRiskMessages(phase, nextStart, nextEnd),
    ...getHolidayRiskMessages(nextStart, nextEnd, task?.milestone ? '里程碑' : subject),
  ];
}

function applyPreviewTaskDrag(phaseIndex, taskIndex, dayDelta) {
  const phase = state.phases[phaseIndex];
  const task = phase?.tasks?.[taskIndex];
  const nextStart = task && isIsoDate(task.start) ? addDaysIso(task.start, dayDelta) : '';
  const nextEnd = task && isIsoDate(task.end) ? addDaysIso(task.end, dayDelta) : '';
  const riskMessages = buildScheduleRiskMessages(phase, task, nextStart, nextEnd, '任务');
  if (!phase || !task || !shiftTaskSchedule(task, dayDelta)) return;
  ensurePhaseCoversTask(phase, task);
  syncPhaseStartFromTasks(phase);
  sortTasksByStartWithBreakdownRemap(phase, phaseIndex);
  if (isPhaseReadyForSort(phase)) sortPhasesByStart();
  syncProjectStart();
  render();
  showPreviewRiskNotice(riskMessages, riskMessages.length ? 'warning' : 'ok');
  setStatus(`已调整任务：${task.name || '未命名任务'}（${task.start} 至 ${task.end}）。`, 'ok');
}

function applyPreviewTaskResize(phaseIndex, taskIndex, nextStart, nextEnd) {
  const phase = state.phases[phaseIndex];
  const task = phase?.tasks?.[taskIndex];
  const riskMessages = buildScheduleRiskMessages(phase, task, nextStart, nextEnd, '任务');
  if (!phase || !task || !resizeTaskSchedule(task, nextStart, nextEnd)) return;
  ensurePhaseCoversTask(phase, task);
  syncPhaseStartFromTasks(phase);
  sortTasksByStartWithBreakdownRemap(phase, phaseIndex);
  if (isPhaseReadyForSort(phase)) sortPhasesByStart();
  syncProjectStart();
  render();
  showPreviewRiskNotice(riskMessages, riskMessages.length ? 'warning' : 'ok');
  setStatus(`已调整任务工期：${task.name || '未命名任务'}（${task.start} 至 ${task.end}）。`, 'ok');
}

function applyPreviewMilestoneDrag(phaseIndex, taskIndex, nextStart, nextEnd) {
  const phase = state.phases[phaseIndex];
  const task = phase?.tasks?.[taskIndex];
  const riskMessages = buildScheduleRiskMessages(phase, task, nextStart, nextEnd, '里程碑');
  if (!phase || !task || !resizeTaskSchedule(task, nextStart, nextEnd)) return;
  ensurePhaseCoversTask(phase, task);
  syncPhaseStartFromTasks(phase);
  sortTasksByStartWithBreakdownRemap(phase, phaseIndex);
  if (isPhaseReadyForSort(phase)) sortPhasesByStart();
  syncProjectStart();
  render();
  showPreviewRiskNotice(riskMessages, riskMessages.length ? 'warning' : 'ok');
  setStatus(`已调整里程碑：${task.name || '未命名里程碑'}（${task.start} 至 ${task.end}）。`, 'ok');
}

function getPreviewDragDates(dragState) {
  const start = addDaysIso(dragState.projectStartValue, dragState.currentStartOffset);
  const end = addDaysIso(dragState.projectStartValue, dragState.currentEndOffset - 1);
  return { start, end };
}

function updatePreviewDragLabel(dragState) {
  if (!dragState.dragLabel) return;
  const { start, end } = getPreviewDragDates(dragState);
  dragState.dragLabel.textContent = `${start} - ${end}`;
}

function updatePreviewTaskDrag(event) {
  if (!previewDragState || event.pointerId !== previewDragState.pointerId) return;
  event.preventDefault();
  const zoom = Math.max(currentPreviewZoom || 1, FIT_PREVIEW_MIN_ZOOM);
  const deltaPx = (event.clientX - previewDragState.startClientX) / zoom;
  const mode = previewDragState.mode || 'move';

  if (mode === 'resize-start') {
    const nextStartOffset = Math.min(
      getPreviewUnitDayOffsetFromTimelinePx(previewDragState.startLeftPx + deltaPx, previewDragState),
      previewDragState.endDayOffset - 1,
    );
    previewDragState.currentStartOffset = nextStartOffset;
    previewDragState.currentEndOffset = previewDragState.endDayOffset;
    previewDragState.dayDelta = nextStartOffset - previewDragState.startDayOffset;
  } else if (mode === 'resize-end') {
    const nextEndOffset = Math.max(
      getPreviewUnitDayOffsetFromTimelinePx(previewDragState.startLeftPx + previewDragState.startWidthPx + deltaPx, previewDragState),
      previewDragState.startDayOffset + 1,
    );
    previewDragState.currentStartOffset = previewDragState.startDayOffset;
    previewDragState.currentEndOffset = nextEndOffset;
    previewDragState.dayDelta = nextEndOffset - previewDragState.endDayOffset;
  } else if (mode === 'milestone') {
    const nextEndOffset = getPreviewUnitDayOffsetFromTimelinePx(
      previewDragState.startMarkerPointPx + deltaPx,
      previewDragState,
    );
    if (previewDragState.singleDayMilestone) {
      previewDragState.currentStartOffset = nextEndOffset - 1;
      previewDragState.currentEndOffset = nextEndOffset;
      previewDragState.dayDelta = previewDragState.currentStartOffset - previewDragState.startDayOffset;
    } else {
      previewDragState.currentStartOffset = previewDragState.startDayOffset;
      previewDragState.currentEndOffset = Math.max(nextEndOffset, previewDragState.startDayOffset + 1);
      previewDragState.dayDelta = previewDragState.currentEndOffset - previewDragState.endDayOffset;
    }
  } else {
    const nextDayOffset = getPreviewUnitDayOffsetFromTimelinePx(
      previewDragState.startLeftPx + deltaPx,
      previewDragState,
    );
    const dayDelta = nextDayOffset - previewDragState.startDayOffset;
    previewDragState.currentStartOffset = previewDragState.startDayOffset + dayDelta;
    previewDragState.currentEndOffset = previewDragState.endDayOffset + dayDelta;
    previewDragState.dayDelta = dayDelta;
  }

  const snappedLeftPx = getPreviewUnitTimelinePx(previewDragState.currentStartOffset, previewDragState);
  const snappedRightPx = getPreviewUnitTimelinePx(previewDragState.currentEndOffset, previewDragState);
  const snappedWidthPx = Math.max(1, snappedRightPx - snappedLeftPx);
  previewDragState.shell.style.left = `${snappedLeftPx}px`;
  previewDragState.shell.style.width = `${snappedWidthPx}px`;
  if (previewDragState.fill) previewDragState.fill.style.width = `${snappedWidthPx}px`;
  if (previewDragState.marker) {
    const nextPointPx = getPreviewUnitTimelinePx(
      previewDragState.currentEndOffset,
      previewDragState,
    );
    previewDragState.marker.style.left = `${nextPointPx + previewDragState.markerGapPx}px`;
  }
  updatePreviewDragLabel(previewDragState);
}

function cleanupPreviewTaskDrag() {
  if (!previewDragState) return null;
  const dragState = previewDragState;
  const captureElement = dragState.captureElement || dragState.shell;
  captureElement.removeEventListener('pointermove', updatePreviewTaskDrag);
  captureElement.removeEventListener('pointerup', finishPreviewTaskDrag);
  captureElement.removeEventListener('pointercancel', cancelPreviewTaskDrag);
  try {
    captureElement.releasePointerCapture(dragState.pointerId);
  } catch {
    // Pointer capture may already be released when the browser cancels a drag.
  }
  dragState.dragLabel?.remove();
  dragState.shell.classList.remove('is-dragging');
  dragState.shell.classList.remove('is-resizing');
  dragState.shell.classList.remove('is-milestone-dragging');
  dragState.shell.classList.remove('resize-start');
  dragState.shell.classList.remove('resize-end');
  dragState.shell.removeAttribute('aria-grabbed');
  ganttPreview?.classList.remove('preview-is-dragging');
  document.body.classList.remove('preview-task-dragging');
  document.body.classList.remove('preview-task-resizing');
  document.body.classList.remove('preview-milestone-dragging');
  previewDragState = null;
  return dragState;
}

function finishPreviewTaskDrag(event) {
  if (!previewDragState || event.pointerId !== previewDragState.pointerId) return;
  event.preventDefault();
  const dragState = cleanupPreviewTaskDrag();
  if (!dragState) return;
  if ((dragState.mode || 'move') === 'move' && dragState.dayDelta) {
    applyPreviewTaskDrag(dragState.phaseIndex, dragState.taskIndex, dragState.dayDelta);
  } else if (dragState.mode === 'milestone'
    && (dragState.currentStartOffset !== dragState.startDayOffset || dragState.currentEndOffset !== dragState.endDayOffset)) {
    const { start, end } = getPreviewDragDates(dragState);
    applyPreviewMilestoneDrag(dragState.phaseIndex, dragState.taskIndex, start, end);
  } else if ((dragState.mode || 'move') !== 'move'
    && (dragState.currentStartOffset !== dragState.startDayOffset || dragState.currentEndOffset !== dragState.endDayOffset)) {
    const { start, end } = getPreviewDragDates(dragState);
    applyPreviewTaskResize(dragState.phaseIndex, dragState.taskIndex, start, end);
  } else {
    dragState.shell.style.left = `${dragState.startLeftPx}px`;
    dragState.shell.style.width = `${dragState.startWidthPx}px`;
    if (dragState.fill) dragState.fill.style.width = `${dragState.startWidthPx}px`;
    if (dragState.marker) dragState.marker.style.left = `${dragState.startMarkerLeftPx}px`;
  }
}

function cancelPreviewTaskDrag(event) {
  if (!previewDragState || event.pointerId !== previewDragState.pointerId) return;
  const dragState = cleanupPreviewTaskDrag();
  if (!dragState) return;
  dragState.shell.style.left = `${dragState.startLeftPx}px`;
  dragState.shell.style.width = `${dragState.startWidthPx}px`;
  if (dragState.fill) dragState.fill.style.width = `${dragState.startWidthPx}px`;
  if (dragState.marker) dragState.marker.style.left = `${dragState.startMarkerLeftPx}px`;
}

function startPreviewTaskDrag(event, shell, item, metrics, timeline, marker = null, markerGapPx = 0, mode = 'move') {
  if (!previewEditMode || !isPreviewEditableUnit(timeline.unit) || item.kind !== 'sub' || event.button !== 0) return;
  if (mode !== 'move' && mode !== 'milestone' && item.milestone) return;
  if (mode === 'milestone' && !item.milestone) return;
  if (!Number.isInteger(item.phaseIndex) || !Number.isInteger(item.taskIndex)) return;
  const phase = state.phases[item.phaseIndex];
  const task = phase?.tasks?.[item.taskIndex];
  if (!phase || !task || !isIsoDate(task.start) || !isIsoDate(task.end)) return;

  event.preventDefault();
  event.stopPropagation();
  cleanupPreviewTaskDrag();

  const dragLabel = document.createElement('span');
  dragLabel.className = 'preview-drag-label';
  shell.append(dragLabel);

  const startDayOffset = getPreviewDayOffset(task.start, timeline.projectStartValue);
  const endDayOffset = startDayOffset + daysInclusiveIso(task.start, task.end);
  const singleDayMilestone = Boolean(task.milestone) && daysInclusiveIso(task.start, task.end) === 1;
  const captureElement = event.currentTarget instanceof HTMLElement ? event.currentTarget : shell;
  previewDragState = {
    mode,
    pointerId: event.pointerId,
    shell,
    captureElement,
    fill: shell.querySelector('.preview-bar-fill'),
    marker,
    markerGapPx,
    phaseIndex: item.phaseIndex,
    taskIndex: item.taskIndex,
    projectStartValue: timeline.projectStartValue,
    originalStart: task.start,
    originalEnd: task.end,
    startClientX: event.clientX,
    startLeftPx: metrics.leftPx,
    startWidthPx: metrics.barWidthPx,
    startMarkerLeftPx: marker ? Number.parseFloat(marker.style.left) || 0 : 0,
    startMarkerPointPx: getPreviewUnitTimelinePx(endDayOffset, timeline),
    startDayOffset,
    endDayOffset,
    currentStartOffset: startDayOffset,
    currentEndOffset: endDayOffset,
    markerPointOffset: endDayOffset,
    unit: timeline.unit,
    weekWidthsPx: [...(timeline.weekWidthsPx || [])],
    dayWidthsPx: [...(timeline.dayWidthsPx || [])],
    singleDayMilestone,
    dayDelta: 0,
    dragLabel,
  };

  shell.classList.add(mode === 'move' ? 'is-dragging' : (mode === 'milestone' ? 'is-milestone-dragging' : 'is-resizing'));
  shell.classList.toggle('resize-start', mode === 'resize-start');
  shell.classList.toggle('resize-end', mode === 'resize-end');
  shell.setAttribute('aria-grabbed', 'true');
  ganttPreview?.classList.add('preview-is-dragging');
  document.body.classList.toggle('preview-task-dragging', mode === 'move');
  document.body.classList.toggle('preview-task-resizing', mode !== 'move' && mode !== 'milestone');
  document.body.classList.toggle('preview-milestone-dragging', mode === 'milestone');
  updatePreviewDragLabel(previewDragState);

  try {
    captureElement.setPointerCapture(event.pointerId);
  } catch {
    // Some browsers can skip capture when the pointer is already released.
  }
  captureElement.addEventListener('pointermove', updatePreviewTaskDrag);
  captureElement.addEventListener('pointerup', finishPreviewTaskDrag);
  captureElement.addEventListener('pointercancel', cancelPreviewTaskDrag);
}

function renderPreviewBar(track, item, timeline) {
  const metrics = getPreviewBarMetrics(item, timeline);
  if (!metrics) return;
  const { leftPx, barWidthPx, pointPx } = metrics;
  const color = phaseAccents[item.phaseIndex % phaseAccents.length];

  const shell = document.createElement('span');
  shell.className = 'preview-bar-shell';
  shell.style.left = `${leftPx}px`;
  shell.style.width = `${barWidthPx}px`;
  if (item.kind === 'sub') {
    shell.classList.add('preview-bar-task');
    shell.dataset.phaseIndex = String(item.phaseIndex);
    shell.dataset.taskIndex = String(item.taskIndex);
  }

  const fill = document.createElement('span');
  fill.className = 'preview-bar-fill';
  fill.style.width = `${barWidthPx}px`;
  fill.style.setProperty('--bar-color', color);
  fill.title = item.kind === 'sub' ? getTaskStatus(item) : `阶段完成度 ${normalizeProgress(item.progress)}%`;
  shell.append(fill);

  let marker = null;
  let markerGapPx = 0;
  if (item.kind === 'sub' && !item.milestone) {
    const startHandle = document.createElement('span');
    startHandle.className = 'preview-resize-handle preview-resize-start';
    startHandle.setAttribute('aria-hidden', 'true');
    const endHandle = document.createElement('span');
    endHandle.className = 'preview-resize-handle preview-resize-end';
    endHandle.setAttribute('aria-hidden', 'true');
    startHandle.addEventListener('pointerdown', (event) => startPreviewTaskDrag(
      event,
      shell,
      item,
      metrics,
      timeline,
      marker,
      markerGapPx,
      'resize-start',
    ));
    endHandle.addEventListener('pointerdown', (event) => startPreviewTaskDrag(
      event,
      shell,
      item,
      metrics,
      timeline,
      marker,
      markerGapPx,
      'resize-end',
    ));
    shell.append(startHandle, endHandle);
  }
  track.append(shell);

  if (item.kind === 'sub' && item.milestone) {
    const defaultGapPx = PREVIEW_MILESTONE_BAR_TO_STAR_GAP;
    markerGapPx = Number.isFinite(item.markerGapPx) ? item.markerGapPx : defaultGapPx;
    marker = document.createElement('span');
    marker.className = 'preview-milestone preview-milestone-draggable';
    marker.style.left = `${(pointPx ?? leftPx + barWidthPx) + markerGapPx}px`;
    marker.style.gap = `${PREVIEW_MILESTONE_STAR_TO_TEXT_GAP}px`;
    const star = document.createElement('span');
    star.className = 'preview-milestone-star';
    star.textContent = '★';
    const label = document.createElement('span');
    label.className = 'preview-milestone-label';
    label.textContent = `${item.name} (${fmtMd(item.end)})`;
    marker.append(star, label);
    marker.addEventListener('pointerdown', (event) => startPreviewTaskDrag(
      event,
      shell,
      item,
      metrics,
      timeline,
      marker,
      markerGapPx,
      'milestone',
    ));
    track.append(marker);
  }

  if (item.kind === 'sub') {
    shell.addEventListener('pointerdown', (event) => startPreviewTaskDrag(
      event,
      shell,
      item,
      metrics,
      timeline,
      marker,
      markerGapPx,
    ));
  }
}

function renderPreview() {
  const range = getPreviewRange();
  if (!ganttPreview) return;
  ganttPreview.textContent = '';
  ganttPreview.dataset.timelineUnit = normalizeTimelineUnit(selectedTimelineUnit);
  updatePreviewEditControls();
  if (!range) {
    ganttPreview.append(makePreviewCell('preview-empty', '请先录入项目阶段日期。'));
    return;
  }

  const unit = normalizeTimelineUnit(selectedTimelineUnit);
  const { projectStartValue, projectEndValue, totalDays, totalWeeks } = range;
  const rows = getPreviewRows();
  const monthColumns = unit === 'month' ? buildPreviewMonthColumns(projectStartValue, projectEndValue) : [];
  const dayColumns = unit === 'day' ? buildPreviewDayColumns(projectStartValue, totalDays) : [];
  const weekColumns = unit === 'week' ? buildPreviewWeekColumns(projectStartValue, totalWeeks) : [];
  const dayWidthsPx = dayColumns.map((column) => column.widthPx);
  const weekWidthsPx = weekColumns.map((column) => column.widthPx);
  const timelineColumns = unit === 'month' ? monthColumns.length : (unit === 'day' ? dayColumns.length : totalWeeks);
  const timelineWidth = unit === 'month' ? PREVIEW_MONTH_WIDTH : (unit === 'day' ? PREVIEW_DAY_WIDTH : PREVIEW_WEEK_WIDTH);
  const timeline = { unit, projectStartValue, monthColumns, dayWidthsPx, weekWidthsPx };

  ganttPreview.style.setProperty('--week-width', `${timelineWidth}px`);
  ganttPreview.style.gridTemplateColumns = unit === 'month'
    ? `${PREVIEW_NAME_COL_WIDTH}px ${PREVIEW_DURATION_COL_SIZE} repeat(${timelineColumns}, ${timelineWidth}px)`
    : `${PREVIEW_NAME_COL_WIDTH}px ${PREVIEW_DURATION_COL_SIZE} ${(unit === 'day' ? dayColumns : weekColumns).map((column) => `${column.widthPx}px`).join(' ')}`;

  ganttPreview.append(makePreviewCell('preview-head-cell preview-phase-head', '项目阶段', '1', '1 / 4'));
  ganttPreview.append(makePreviewCell('preview-head-cell preview-duration-head', '用时', '2', '1 / 4'));

  if (unit === 'month') {
    getYearBands(monthColumns).forEach((band) => {
      ganttPreview.append(makePreviewCell(
        'preview-month preview-year-band',
        band.label,
        `${band.fromMonth + 2} / span ${band.toMonth - band.fromMonth + 1}`,
        '1',
      ));
    });

    monthColumns.forEach((column) => {
      const gridColumn = `${column.monthIndex + 2}`;
      ganttPreview.append(makePreviewCell('preview-week preview-month-unit', column.label, gridColumn, '2'));
      ganttPreview.append(makePreviewCell('preview-date', `${fmtMd(column.start)}-${fmtMd(column.end)}`, gridColumn, '3'));
    });
  } else if (unit === 'day') {
    getDayMonthBands(dayColumns).forEach((band) => {
      ganttPreview.append(makePreviewCell(
        'preview-month',
        band.label,
        `${band.fromDay + 2} / span ${band.toDay - band.fromDay + 1}`,
        '1',
      ));
    });

    dayColumns.forEach((column) => {
      const gridColumn = `${column.dayIndex + 2}`;
      const weekendClass = column.isWeekend ? ' preview-day-weekend' : '';
      ganttPreview.append(makePreviewCell(`preview-week preview-day-number${weekendClass}`, column.dayLabel, gridColumn, '2'));
      ganttPreview.append(makePreviewCell(`preview-date preview-day-weekday${weekendClass}`, column.weekdayLabel, gridColumn, '3'));
    });
  } else {
    getMonthBands(projectStartValue, totalWeeks).forEach((band) => {
      ganttPreview.append(makePreviewCell(
        'preview-month',
        band.label,
        `${band.fromWeek + 2} / span ${band.toWeek - band.fromWeek + 1}`,
        '1',
      ));
    });

    for (let weekIndex = 1; weekIndex <= totalWeeks; weekIndex += 1) {
      const weekColumn = weekColumns[weekIndex - 1];
      const weekStart = weekColumn.start;
      const weekEnd = weekColumn.end;
      const gridColumn = `${weekIndex + 2}`;
      ganttPreview.append(makePreviewCell('preview-week', `W${weekIndex}`, gridColumn, '2'));
      ganttPreview.append(makePreviewCell('preview-date', `${fmtMd(weekStart)}-${fmtMd(weekEnd)}`, gridColumn, '3'));
    }
  }

  rows.forEach((item, index) => {
    const gridRow = `${index + 4}`;
    const isPhase = item.kind === 'phase';
    const color = phaseAccents[item.phaseIndex % phaseAccents.length];
    const rowClass = isPhase ? ' preview-row-phase' : '';
    const focusClass = isPhase && focusedPhaseIndex === item.phaseIndex ? ' preview-row-focused' : '';
    const displayName = isPhase ? item.name : `· ${item.name}`;
    const nameCell = makePreviewCell(`preview-name${rowClass}${focusClass}`, displayName, '1', gridRow);
    const durationCell = makePreviewCell(`preview-duration${rowClass}${focusClass}`, durationText(item, unit), '2', gridRow);
    const track = makePreviewCell(`preview-track${rowClass}${focusClass}`, '', `3 / span ${timelineColumns}`, gridRow);
    nameCell.style.setProperty('--phase-accent', color);
    durationCell.style.setProperty('--phase-accent', color);
    track.style.setProperty('--phase-accent', color);
    renderPreviewBar(track, item, timeline);
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

function syncProjectStart() {
  state.projectStart = getEarliestPhaseStart();
}

function normalizePhaseDates(phase) {
  if (isIsoDate(phase.start) && isIsoDate(phase.end) && compareIsoDates(phase.end, phase.start) < 0) {
    phase.end = phase.start;
  }
}

function getEarliestTaskStart(phase) {
  return minIsoDate((Array.isArray(phase?.tasks) ? phase.tasks : []).map((task) => task.start));
}

function syncPhaseStartFromTasks(phase) {
  const earliestTaskStart = getEarliestTaskStart(phase);
  if (earliestTaskStart) {
    phase.start = earliestTaskStart;
  }
  normalizePhaseDates(phase);
  return earliestTaskStart;
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
      task.start = clampIsoDate(task.start, '', phase.end);
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
  syncPhaseStartFromTasks(phase);
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

function addBlankPhase() {
  expandedPhaseIndexes.clear();
  breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
  state.phases.unshift({
    name: '新阶段',
    start: '',
    end: '',
    tasks: [],
  });
  focusPhase(0);
}

function renderEditorEmptyState() {
  const empty = makeElement('section', 'editor-empty-state');
  empty.append(
    makeElement('span', 'eyebrow', 'Plan Console'),
    makeElement('h3', '', '当前计划暂无阶段'),
    makeElement('p', '', '点击右上角“添加阶段”开始编制项目计划。'),
  );
  const action = makeElement('button', 'secondary-btn editor-empty-action', '+ 添加阶段');
  action.type = 'button';
  action.addEventListener('click', addBlankPhase);
  empty.append(action);
  return empty;
}

function render() {
  state.phases.forEach(normalizeTaskDates);
  syncProjectStart();
  state.title = state.title || DEFAULT_TITLE;
  renderEditorEntryContext();
  if (!isBreakdownTargetValid()) {
    breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
  }
  phaseList.textContent = '';
  renderProjectStats();

  if (state.phases.length === 0) {
    phaseList.append(renderEditorEmptyState());
    renderRightPane();
    return;
  }

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
          if (field === 'start') {
            syncPhaseStartFromTasks(phase);
            input.value = phase[field] || '';
          }
          syncProjectStart();
          renderProjectStats();
          renderRightPane();
        });
        input.addEventListener('change', () => {
          phase[field] = input.value;
          normalizeTaskDates(phase);
          if (isPhaseReadyForSort(phase)) {
            sortPhasesByStart();
          }
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
      syncTaskCompletionFromSubtasks(task);
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
          input.min = '';
          input.max = phase.end || '';
          input.value = task.start || '';
          input.addEventListener('input', () => {
            task.start = clampIsoDate(input.value, '', phase.end);
            if (input.value !== task.start) input.value = task.start;
            if (task.endTouched === false) {
              task.end = getDefaultTaskEnd(task.start, phase);
            } else {
              task.end = clampIsoDate(task.end, task.start, phase.end);
            }
            syncPhaseStartFromTasks(phase);
            const phaseStartInput = phaseNode.querySelector('.phase-fields [data-field="start"]');
            if (phaseStartInput) phaseStartInput.value = phase.start || '';
            syncProjectStart();
            updateHolidayStat(taskNode, task);
            renderProjectStats();
            renderRightPane();
          });
          input.addEventListener('change', () => {
            task.start = clampIsoDate(input.value, '', phase.end);
            if (task.endTouched === false) {
              task.end = getDefaultTaskEnd(task.start, phase);
            } else {
              task.end = clampIsoDate(task.end, task.start, phase.end);
            }
            syncPhaseStartFromTasks(phase);
            sortTasksByStart(phase);
            render();
          });
        } else if (field === 'end') {
          input.min = task.start || phase.start || '';
          input.max = phase.end || '';
          input.value = task.end || '';
          input.addEventListener('input', () => {
            task.end = clampIsoDate(input.value, task.start || phase.start, phase.end);
            if (input.value !== task.end) input.value = task.end;
            task.endTouched = true;
            updateHolidayStat(taskNode, task);
            renderProjectStats();
            renderRightPane();
          });
          input.addEventListener('change', () => {
            task.end = clampIsoDate(input.value, task.start || phase.start, phase.end);
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
    timelineUnit: normalizeTimelineUnit(selectedTimelineUnit),
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

function applyImportedProject(project, entryContext = null) {
  state = normalizeImportedProject(project);
  breakdownOpen = { phaseIndex: -1, taskIndex: -1 };
  focusedPhaseIndex = null;
  if (focusPhaseTimer) window.clearTimeout(focusPhaseTimer);
  focusPhaseTimer = null;
  expandedPhaseIndexes = new Set(state.phases.map((_, index) => index));
  previewZoomMode = 'fit';
  setEditorEntryContext(entryContext);
  showEditor();
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

    applyImportedProject(payload.project || payload, makeExcelEntryContext());
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

function setHomeTemplateActive(activeButton) {
  if (!activeButton) return;
  document.querySelectorAll('.home-template-card').forEach((button) => {
    button.classList.toggle('home-template-active', button === activeButton);
  });
}

if (homeTemplateZone) {
  homeTemplateZone.addEventListener('mousemove', (event) => {
    const card = event.target.closest?.('.home-template-card');
    if (card) setHomeTemplateActive(card);
  });
  homeTemplateZone.addEventListener('focusin', (event) => {
    const card = event.target.closest?.('.home-template-card');
    if (card) setHomeTemplateActive(card);
  });
}

document.querySelector('#addPhaseBtn').addEventListener('click', addBlankPhase);

homeTemplateButtons.forEach((button) => {
  button.addEventListener('pointerenter', () => setHomeTemplateActive(button));
  button.addEventListener('mouseenter', () => setHomeTemplateActive(button));
  button.addEventListener('focus', () => setHomeTemplateActive(button));
  button.addEventListener('click', () => openTemplateSetup(button.dataset.homeTemplate, 'template'));
});
if (homeBlankBtn) {
  homeBlankBtn.addEventListener('pointerenter', () => setHomeTemplateActive(homeBlankBtn));
  homeBlankBtn.addEventListener('mouseenter', () => setHomeTemplateActive(homeBlankBtn));
  homeBlankBtn.addEventListener('focus', () => setHomeTemplateActive(homeBlankBtn));
  homeBlankBtn.addEventListener('click', () => openTemplateSetup('', 'blank'));
}
if (setupBackBtn) setupBackBtn.addEventListener('click', showHome);
if (setupCancelBtn) setupCancelBtn.addEventListener('click', showHome);
if (setupGenerateBtn) setupGenerateBtn.addEventListener('click', applySetupProject);
if (setupProjectNameInput) setupProjectNameInput.addEventListener('input', () => setSetupHint());
if (setupProjectStartInput) setupProjectStartInput.addEventListener('input', () => setSetupHint());
if (setupProjectStartInput) {
  setupProjectStartInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applySetupProject();
    }
  });
}

if (templateBackdrop) templateBackdrop.addEventListener('click', closeTemplateDialog);
if (cancelTemplateBtn) cancelTemplateBtn.addEventListener('click', closeTemplateDialog);
if (closeTemplateDialogBtn) closeTemplateDialogBtn.addEventListener('click', closeTemplateDialog);
if (applyTemplateBtn) applyTemplateBtn.addEventListener('click', applySelectedTemplate);
if (templateStartInput) {
  templateStartInput.addEventListener('input', () => setTemplateHint());
  templateStartInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applySelectedTemplate();
    }
  });
}

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
if (saveVersionBtn) saveVersionBtn.addEventListener('click', openSaveVersionDialog);
if (saveVersionBackdrop) saveVersionBackdrop.addEventListener('click', closeSaveVersionDialog);
if (cancelSaveVersionBtn) cancelSaveVersionBtn.addEventListener('click', closeSaveVersionDialog);
if (dismissSaveVersionBtn) dismissSaveVersionBtn.addEventListener('click', closeSaveVersionDialog);
if (confirmSaveVersionBtn) confirmSaveVersionBtn.addEventListener('click', confirmSaveVersion);
if (saveVersionNameInput) {
  saveVersionNameInput.addEventListener('input', () => setSaveVersionHint());
  saveVersionNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      confirmSaveVersion();
    }
  });
}
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
  setPreviewEditMode(false, false);
  clearPreviewRiskNotice();
  ganttModal.classList.add('open');
  ganttModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('gantt-modal-visible');
  renderRightPane();
  requestAnimationFrame(() => applyPreviewZoom());
}
function closeGanttModal() {
  if (!ganttModal) return;
  cleanupPreviewTaskDrag();
  setPreviewEditMode(false, false);
  clearPreviewRiskNotice();
  ganttModal.classList.remove('open');
  ganttModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('gantt-modal-visible');
}
if (timelineUnitSelect) {
  timelineUnitSelect.addEventListener('change', () => setTimelineUnit(timelineUnitSelect.value, true));
}
updateTimelineUnitControls();

if (previewGanttBtn) previewGanttBtn.addEventListener('click', openGanttModal);
if (previewEditBtn) previewEditBtn.addEventListener('click', () => {
  setPreviewEditMode(!previewEditMode);
  if (previewEditMode) {
    setStatus('已开启甘特图编辑，可拖动任务条调整排期。', 'ok');
  }
});
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
    else if (templateDialog && templateDialog.classList.contains('open')) closeTemplateDialog();
    else if (saveVersionDialog && saveVersionDialog.classList.contains('open')) closeSaveVersionDialog();
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
  syncHealthPanelStickyOffset();
  if (previewZoomMode === 'fit') applyPreviewZoom();
});
window.addEventListener('load', syncHealthPanelStickyOffset);
document.fonts?.ready?.then(syncHealthPanelStickyOffset).catch(() => {});

syncHealthPanelStickyOffset();
initIntroScreen();
registerCodeFingerprint();
render();
