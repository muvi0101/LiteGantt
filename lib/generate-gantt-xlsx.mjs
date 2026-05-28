import fs from 'node:fs/promises';
import path from 'node:path';
import ExcelJS from 'exceljs';
import sharp from 'sharp';

const DAY = 24 * 60 * 60 * 1000;
const WEEK_START_COL = 4; // D
const FIRST_DATA_ROW = 6;
const MAX_WEEKS = 30;
const METADATA_SHEET = '_metadata';
const METADATA_MARKER = '__PROJECT_GANTT_BUILDER_DATA__';

const PALETTE = [
  { phase: 'FF1E88E5', sub: 'FF42A5F5', svg: '#1E88E5', subSvg: '#42A5F5' },
  { phase: 'FF16B7D4', sub: 'FF1EC8E0', svg: '#16B7D4', subSvg: '#1EC8E0' },
  { phase: 'FF10B981', sub: 'FF15C994', svg: '#10B981', subSvg: '#15C994' },
  { phase: 'FF6366F1', sub: 'FF7C83F6', svg: '#6366F1', subSvg: '#7C83F6' },
  { phase: 'FF8B5CF6', sub: 'FFA178F9', svg: '#8B5CF6', subSvg: '#A178F9' },
  { phase: 'FFF59E0B', sub: 'FFFBBF24', svg: '#F59E0B', subSvg: '#FBBF24' },
  { phase: 'FFEF4444', sub: 'FFF87171', svg: '#EF4444', subSvg: '#F87171' },
];

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

function parseDate(value, label) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} 必须是 YYYY-MM-DD 格式`);
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new Error(`${label} 不是有效日期：${value}`);
  }
  return date;
}

function iso(date) {
  return date.toISOString().slice(0, 10);
}

function fmtMd(date) {
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
}

function monthLabel(date) {
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月`;
}

function daysInclusive(start, end) {
  return Math.round((end - start) / DAY) + 1;
}

function addDays(date, days) {
  return new Date(date.getTime() + days * DAY);
}

function colLabel(n) {
  let result = '';
  let x = n;
  while (x > 0) {
    const mod = (x - 1) % 26;
    result = String.fromCharCode(65 + mod) + result;
    x = Math.floor((x - 1) / 26);
  }
  return result;
}

function getHolidayMeta(date) {
  const override = HOLIDAY_OVERRIDES[iso(date)];
  if (override?.type === 'holiday') return override;
  if (override?.type === 'workday') return null;
  const day = date.getUTCDay();
  if (day === 0 || day === 6) return { type: 'weekend', label: day === 0 ? '周日' : '周六' };
  return null;
}

function countHolidayDays(start, end) {
  let total = 0;
  for (let cursor = new Date(start.getTime()); cursor <= end; cursor = addDays(cursor, 1)) {
    if (getHolidayMeta(cursor)) total += 1;
  }
  return total;
}

function normalizeProject(input) {
  const title = String(input?.title || '甘特图 - 项目进度计划表（周视图）').trim();
  const phases = Array.isArray(input?.phases) ? input.phases : [];
  if (!phases.length) throw new Error('至少需要 1 个项目阶段');

  const normalized = phases.map((phase, phaseIndex) => {
    const name = String(phase?.name || '').trim();
    if (!name) throw new Error(`第 ${phaseIndex + 1} 个阶段缺少名称`);

    const start = parseDate(phase.start, `${name} 开始日期`);
    const end = parseDate(phase.end, `${name} 结束日期`);
    if (end < start) throw new Error(`${name} 的结束日期不能早于开始日期`);

    const tasks = Array.isArray(phase.tasks) ? phase.tasks : [];
    const normalizedTasks = tasks.map((task, taskIndex) => {
      const taskName = String(task?.name || '').trim();
      if (!taskName) throw new Error(`${name} 第 ${taskIndex + 1} 个任务缺少名称`);

      const taskStart = parseDate(task.start, `${taskName} 开始日期`);
      const taskEnd = parseDate(task.end, `${taskName} 结束日期`);
      if (taskEnd < taskStart) throw new Error(`${taskName} 的结束日期不能早于开始日期`);
      if (taskStart < start || taskEnd > end) {
        throw new Error(`${taskName} 的日期必须在「${name}」阶段范围内`);
      }

      return {
        kind: 'sub',
        phaseIndex,
        name: taskName,
        start: taskStart,
        end: taskEnd,
        milestone: Boolean(task.milestone),
        milestoneName: String(task.milestoneName || taskName).trim(),
      };
    }).sort((a, b) => a.start - b.start);

    return { kind: 'phase', phaseIndex, name, start, end, tasks: normalizedTasks };
  });

  const allDates = [];
  for (const phase of normalized) {
    allDates.push(phase.start, phase.end);
    for (const task of phase.tasks) allDates.push(task.start, task.end);
  }
  const projectStart = new Date(Math.min(...normalized.map((phase) => phase.start.getTime())));
  const projectEnd = new Date(Math.max(...allDates.map((date) => date.getTime())));
  const totalWeeks = Math.max(4, Math.min(MAX_WEEKS, Math.ceil(daysInclusive(projectStart, projectEnd) / 7)));
  if (daysInclusive(projectStart, projectEnd) > MAX_WEEKS * 7) {
    throw new Error(`当前页面最多支持 ${MAX_WEEKS} 周，请缩短周期或拆分项目`);
  }

  const rows = normalized.flatMap((phase) => [phase, ...phase.tasks]);
  return { title, phases: normalized, rows, projectStart, projectEnd, totalWeeks };
}

function serializeProject(project) {
  return {
    title: project.title,
    projectStart: iso(project.projectStart),
    phases: project.phases.map((phase) => ({
      name: phase.name,
      start: iso(phase.start),
      end: iso(phase.end),
      tasks: phase.tasks.map((task) => ({
        name: task.name,
        start: iso(task.start),
        end: iso(task.end),
        milestone: Boolean(task.milestone),
      })),
    })),
  };
}

function fill(argb) {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb } };
}

function border(color = 'FFE3EAF4', style = 'thin') {
  return {
    top: { style, color: { argb: color } },
    left: { style, color: { argb: color } },
    bottom: { style, color: { argb: color } },
    right: { style, color: { argb: color } },
  };
}

function styleCell(cell, options = {}) {
  if (options.fill) cell.fill = fill(options.fill);
  cell.border = border(options.borderColor || 'FFE3EAF4', options.borderStyle || 'thin');
  cell.alignment = {
    horizontal: options.horizontal || 'center',
    vertical: 'middle',
    wrapText: Boolean(options.wrapText),
  };
  cell.font = {
    name: 'Noto Sans CJK SC',
    size: options.size || 11,
    bold: Boolean(options.bold),
    color: { argb: options.color || 'FF334155' },
  };
}

function weekOverlap(itemStart, itemEnd, weekStart) {
  const weekEnd = addDays(weekStart, 6);
  return itemStart <= weekEnd && itemEnd >= weekStart;
}

function milestoneWeek(item, projectStart) {
  return Math.floor(Math.max(0, Math.round((item.end - projectStart) / DAY)) / 7) + 1;
}

async function buildGanttWorkbook(input) {
  const project = normalizeProject(input);
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'LiteGantt';
  workbook.created = new Date();
  workbook.modified = new Date();

  const sheet = workbook.addWorksheet('周视图甘特图', {
    views: [{ state: 'frozen', xSplit: 3, ySplit: 5 }],
  });
  const weekEndCol = WEEK_START_COL + project.totalWeeks - 1;
  const lastCol = weekEndCol + 1;
  const lastDataRow = FIRST_DATA_ROW + project.rows.length - 1;

  sheet.columns = [
    { width: 34 },
    { width: 24 },
    { width: 14 },
    ...Array.from({ length: project.totalWeeks }, (_, index) => ({ width: index === 0 ? 13 : 10 })),
    { width: 3 },
  ];

  sheet.mergeCells(1, 1, 1, weekEndCol);
  const titleCell = sheet.getCell(1, 1);
  titleCell.value = project.title;
  styleCell(titleCell, { fill: 'FFFFFFFF', color: 'FF1E40AF', size: 22, bold: true, horizontal: 'left' });
  sheet.getRow(1).height = 42;
  sheet.getRow(2).height = 8;

  sheet.mergeCells(3, 1, 5, 1);
  sheet.mergeCells(3, 2, 5, 2);
  sheet.mergeCells(3, 3, 5, 3);
  sheet.getCell(3, 1).value = '项目阶段';
  sheet.getCell(3, 2).value = '用时';
  sheet.getCell(3, 3).value = '节假日天数';
  styleCell(sheet.getCell(3, 1), { fill: 'FFDDE8FA', color: 'FF1E3A8A', bold: true, size: 13, horizontal: 'left' });
  styleCell(sheet.getCell(3, 2), { fill: 'FFDFF2F8', color: 'FF0F4C63', bold: true, size: 13 });
  styleCell(sheet.getCell(3, 3), { fill: 'FFE8EEF6', color: 'FF35516F', bold: true, size: 13 });
  sheet.getRow(3).height = 28;
  sheet.getRow(4).height = 24;
  sheet.getRow(5).height = 20;

  const monthBands = [];
  let activeBand = null;
  for (let weekIndex = 1; weekIndex <= project.totalWeeks; weekIndex += 1) {
    const weekStart = addDays(project.projectStart, (weekIndex - 1) * 7);
    const label = monthLabel(weekStart);
    if (!activeBand || activeBand.label !== label) {
      activeBand = { label, fromWeek: weekIndex, toWeek: weekIndex };
      monthBands.push(activeBand);
    } else {
      activeBand.toWeek = weekIndex;
    }

    const weekEnd = addDays(weekStart, 6);
    const col = WEEK_START_COL + weekIndex - 1;
    sheet.getCell(4, col).value = `W${weekIndex}`;
    sheet.getCell(5, col).value = `${fmtMd(weekStart)}-${fmtMd(weekEnd)}`;
    styleCell(sheet.getCell(4, col), { fill: 'FFEEF2F8', bold: true });
    styleCell(sheet.getCell(5, col), { fill: 'FFF5F8FC', color: 'FF64748B', size: 9 });
  }

  for (const band of monthBands) {
    const fromCol = WEEK_START_COL + band.fromWeek - 1;
    const toCol = WEEK_START_COL + band.toWeek - 1;
    if (fromCol !== toCol) sheet.mergeCells(3, fromCol, 3, toCol);
    sheet.getCell(3, fromCol).value = band.label;
    styleCell(sheet.getCell(3, fromCol), { fill: 'FFE6EBF3', bold: true });
  }

  for (let index = 0; index < project.rows.length; index += 1) {
    const rowNo = FIRST_DATA_ROW + index;
    const item = project.rows[index];
    const durationDays = daysInclusive(item.start, item.end);
    const holidayDays = countHolidayDays(item.start, item.end);
    const durationText = item.kind === 'phase'
      ? `${Math.ceil(durationDays / 7)}周（${fmtMd(item.start)}-${fmtMd(item.end)}）`
      : `${durationDays}天（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
    const colors = PALETTE[item.phaseIndex % PALETTE.length];
    const isPhase = item.kind === 'phase';
    const row = sheet.getRow(rowNo);
    row.height = isPhase ? 26 : 22;

    sheet.getCell(rowNo, 1).value = isPhase ? item.name : `  · ${item.name}`;
    sheet.getCell(rowNo, 2).value = durationText;
    sheet.getCell(rowNo, 3).value = `${holidayDays}天`;
    styleCell(sheet.getCell(rowNo, 1), {
      fill: isPhase ? 'FFE7EEFA' : 'FFF1F5FC',
      color: isPhase ? 'FF1E3A8A' : 'FF334155',
      bold: isPhase,
      horizontal: 'left',
    });
    styleCell(sheet.getCell(rowNo, 2), {
      fill: isPhase ? 'FFE5F3F8' : 'FFEEF7FB',
      color: isPhase ? 'FF0F4C63' : 'FF475569',
      bold: isPhase,
    });
    styleCell(sheet.getCell(rowNo, 3), {
      fill: isPhase ? 'FFF2F6FB' : 'FFF7FAFD',
      color: 'FF486177',
      bold: isPhase,
    });

    for (let weekIndex = 1; weekIndex <= project.totalWeeks; weekIndex += 1) {
      const col = WEEK_START_COL + weekIndex - 1;
      const weekStart = addDays(project.projectStart, (weekIndex - 1) * 7);
      const cell = sheet.getCell(rowNo, col);
      const overlapped = weekOverlap(item.start, item.end, weekStart);
      const background = isPhase ? 'FFF3F7FF' : 'FFF9FBFE';
      styleCell(cell, { fill: overlapped ? (isPhase ? colors.phase : colors.sub) : background });
      if (overlapped) {
        cell.value = ' ';
      }
    }

    if (item.kind === 'sub' && item.milestone) {
      const col = Math.min(weekEndCol, WEEK_START_COL + milestoneWeek(item, project.projectStart) - 1);
      const cell = sheet.getCell(rowNo, col);
      cell.value = `★ ${item.milestoneName || item.name}`;
      cell.font = { name: 'Noto Sans CJK SC', size: 10, bold: true, color: { argb: 'FFE11D48' } };
      cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: false };
      cell.fill = fill('FFFFF1F2');
    }
  }

  for (let row = 1; row <= lastDataRow; row += 1) {
    for (let col = 1; col <= lastCol; col += 1) {
      const cell = sheet.getCell(row, col);
      if (!cell.border) cell.border = border();
    }
  }

  const metadata = workbook.addWorksheet(METADATA_SHEET, { state: 'veryHidden' });
  metadata.getCell('A1').value = METADATA_MARKER;
  metadata.getCell('A2').value = JSON.stringify(serializeProject(project));

  return { workbook, project };
}

function parseMdRange(value) {
  const match = String(value || '').match(/(\d{1,2})\/(\d{1,2})\s*-\s*(\d{1,2})\/(\d{1,2})/);
  if (!match) return null;
  return {
    startMonth: Number(match[1]),
    startDay: Number(match[2]),
    endMonth: Number(match[3]),
    endDay: Number(match[4]),
  };
}

function buildMonthYearMap(sheet) {
  const monthYears = new Map();
  let activeYear = null;
  let activeMonth = null;
  for (let col = WEEK_START_COL; col <= sheet.columnCount; col += 1) {
    const monthValue = String(sheet.getCell(3, col).value || '').trim();
    const labelMatch = monthValue.match(/(\d{4})年(\d{1,2})月/);
    if (labelMatch) {
      activeYear = Number(labelMatch[1]);
      activeMonth = Number(labelMatch[2]);
      monthYears.set(activeMonth, activeYear);
    }
    const range = parseMdRange(sheet.getCell(5, col).value);
    if (!range) continue;
    if (activeYear) monthYears.set(range.startMonth, activeYear);
    if (activeYear) {
      monthYears.set(range.endMonth, activeMonth && range.endMonth < activeMonth ? activeYear + 1 : activeYear);
    }
  }
  return monthYears;
}

function mdToIso(month, day, year) {
  return iso(parseDate(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`, '导入日期'));
}

function parseImportedDuration(value, monthYears, fallbackYear) {
  const range = parseMdRange(value);
  if (!range) throw new Error(`无法识别用时日期范围：${value || ''}`);
  const startYear = monthYears.get(range.startMonth) || fallbackYear;
  let endYear = monthYears.get(range.endMonth) || startYear;
  if (endYear < startYear || (endYear === startYear && range.endMonth < range.startMonth)) endYear = startYear + 1;
  return {
    start: mdToIso(range.startMonth, range.startDay, startYear),
    end: mdToIso(range.endMonth, range.endDay, endYear),
  };
}

function inferLegacyMilestone(name, start, end) {
  return start === end && /milestone|里程碑|启动会|签署|上线|验收|go\s*-?\s*live/i.test(name);
}

async function loadWorkbook(input) {
  const workbook = new ExcelJS.Workbook();
  if (Buffer.isBuffer(input) || input instanceof Uint8Array) {
    await workbook.xlsx.load(input);
  } else {
    await workbook.xlsx.readFile(input);
  }
  return workbook;
}

export async function importGanttXlsx(input) {
  const workbook = await loadWorkbook(input);
  const metadata = workbook.getWorksheet(METADATA_SHEET);
  if (metadata && String(metadata.getCell('A1').value || '') === METADATA_MARKER) {
    const payload = String(metadata.getCell('A2').value || '');
    if (payload) return serializeProject(normalizeProject(JSON.parse(payload)));
  }

  const sheet = workbook.getWorksheet('周视图甘特图') || workbook.worksheets[0];
  if (!sheet) throw new Error('未能读取 Excel 工作表');
  const title = String(sheet.getCell('A1').value || '甘特图 - 项目进度计划表（周视图）').trim();
  const monthYears = buildMonthYearMap(sheet);
  const fallbackYear = monthYears.values().next().value;
  const phases = [];
  let currentPhase = null;

  for (let rowNo = FIRST_DATA_ROW; rowNo <= sheet.rowCount; rowNo += 1) {
    const rawName = String(sheet.getCell(rowNo, 1).value || '');
    const duration = String(sheet.getCell(rowNo, 2).value || '');
    const name = rawName.replace(/^\s*[·•]\s*/, '').trim();
    if (!name || !parseMdRange(duration)) continue;
    const dates = parseImportedDuration(duration, monthYears, fallbackYear);
    const isTask = /^\s*[·•]/.test(rawName);
    if (!isTask) {
      currentPhase = { name, start: dates.start, end: dates.end, tasks: [] };
      phases.push(currentPhase);
    } else if (currentPhase) {
      currentPhase.tasks.push({
        name,
        start: dates.start,
        end: dates.end,
        milestone: inferLegacyMilestone(name, dates.start, dates.end),
      });
    }
  }

  if (!phases.length) throw new Error('未能在 Excel 中识别项目阶段，请确认文件来自本甘特图生成器。');
  return serializeProject(normalizeProject({ title, phases }));
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildGanttSvg(project) {
  const leftA = 270;
  const leftB = 168;
  const leftC = 110;
  const weekWidth = 72;
  const rowHeight = 34;
  const headerHeight = 112;
  const padding = 10;
  const timelineLeft = padding + leftA + leftB + leftC;
  const width = padding * 2 + leftA + leftB + leftC + project.totalWeeks * weekWidth + 20;
  const height = padding * 2 + headerHeight + project.rows.length * rowHeight;

  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    '<style>text{font-family:"Noto Sans CJK SC","PingFang SC","Microsoft YaHei",Arial,sans-serif}.small{font-size:12px}.head{font-size:13px;font-weight:700}.title{font-size:24px;font-weight:800}.phase{font-weight:700}.task{font-size:13px}.muted{fill:#64748B}</style>',
    '<rect width="100%" height="100%" fill="#F7F9FC"/>',
    `<rect x="${padding}" y="${padding}" width="${width - padding * 2}" height="54" fill="#FFFFFF" stroke="#E2E8F0"/>`,
    `<text class="title" x="${padding + 16}" y="${padding + 36}" fill="#1E40AF">${escapeXml(project.title)}</text>`,
  ];

  const headerY = padding + 70;
  const dataY = padding + headerHeight;
  const headCells = [
    { x: padding, w: leftA, text: '项目阶段', fill: '#DDE8FA', color: '#1E3A8A', align: 'left' },
    { x: padding + leftA, w: leftB, text: '用时', fill: '#DFF2F8', color: '#0F4C63', align: 'middle' },
    { x: padding + leftA + leftB, w: leftC, text: '节假日天数', fill: '#E8EEF6', color: '#35516F', align: 'middle' },
  ];
  for (const cell of headCells) {
    parts.push(`<rect x="${cell.x}" y="${headerY}" width="${cell.w}" height="42" fill="${cell.fill}" stroke="#C2D1E1"/>`);
    const textX = cell.align === 'left' ? cell.x + 12 : cell.x + cell.w / 2;
    const anchor = cell.align === 'left' ? 'start' : 'middle';
    parts.push(`<text class="head" x="${textX}" y="${headerY + 27}" fill="${cell.color}" text-anchor="${anchor}">${cell.text}</text>`);
  }

  for (let weekIndex = 1; weekIndex <= project.totalWeeks; weekIndex += 1) {
    const x = timelineLeft + (weekIndex - 1) * weekWidth;
    const weekStart = addDays(project.projectStart, (weekIndex - 1) * 7);
    const weekEnd = addDays(weekStart, 6);
    parts.push(`<rect x="${x}" y="${headerY}" width="${weekWidth}" height="20" fill="#E6EBF3" stroke="#D4DDEA"/>`);
    parts.push(`<rect x="${x}" y="${headerY + 20}" width="${weekWidth}" height="22" fill="#EEF2F8" stroke="#D4DDEA"/>`);
    parts.push(`<text class="small" x="${x + weekWidth / 2}" y="${headerY + 15}" fill="#334155" text-anchor="middle">${escapeXml(monthLabel(weekStart))}</text>`);
    parts.push(`<text class="small" x="${x + weekWidth / 2}" y="${headerY + 35}" fill="#334155" text-anchor="middle">W${weekIndex} ${fmtMd(weekStart)}-${fmtMd(weekEnd)}</text>`);
  }

  for (let index = 0; index < project.rows.length; index += 1) {
    const item = project.rows[index];
    const y = dataY + index * rowHeight;
    const isPhase = item.kind === 'phase';
    const colors = PALETTE[item.phaseIndex % PALETTE.length];
    const durationDays = daysInclusive(item.start, item.end);
    const holidayDays = countHolidayDays(item.start, item.end);
    const durationText = isPhase
      ? `${Math.ceil(durationDays / 7)}周（${fmtMd(item.start)}-${fmtMd(item.end)}）`
      : `${durationDays}天（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
    const name = isPhase ? item.name : `· ${item.name}`;
    const baseFill = isPhase ? '#F3F7FF' : '#F9FBFE';

    parts.push(`<rect x="${padding}" y="${y}" width="${leftA}" height="${rowHeight}" fill="${isPhase ? '#E7EEFA' : '#F1F5FC'}" stroke="#DCE5F2"/>`);
    parts.push(`<rect x="${padding + leftA}" y="${y}" width="${leftB}" height="${rowHeight}" fill="${isPhase ? '#E5F3F8' : '#EEF7FB'}" stroke="#DCE5F2"/>`);
    parts.push(`<rect x="${padding + leftA + leftB}" y="${y}" width="${leftC}" height="${rowHeight}" fill="${isPhase ? '#F2F6FB' : '#F7FAFD'}" stroke="#DCE5F2"/>`);
    parts.push(`<text class="${isPhase ? 'phase' : 'task'}" x="${padding + 12}" y="${y + 22}" fill="${isPhase ? '#1E3A8A' : '#334155'}">${escapeXml(name)}</text>`);
    parts.push(`<text class="small" x="${padding + leftA + leftB / 2}" y="${y + 22}" fill="#475569" text-anchor="middle">${escapeXml(durationText)}</text>`);
    parts.push(`<text class="small" x="${padding + leftA + leftB + leftC / 2}" y="${y + 22}" fill="#486177" text-anchor="middle">${holidayDays}天</text>`);

    for (let weekIndex = 1; weekIndex <= project.totalWeeks; weekIndex += 1) {
      const x = timelineLeft + (weekIndex - 1) * weekWidth;
      parts.push(`<rect x="${x}" y="${y}" width="${weekWidth}" height="${rowHeight}" fill="${baseFill}" stroke="#E3E9F2"/>`);
    }

    const startOffset = Math.max(0, Math.round((item.start - project.projectStart) / DAY));
    const left = timelineLeft + (startOffset * weekWidth) / 7 + 3;
    const barWidth = Math.max(14, (durationDays * weekWidth) / 7 - 6);
    const barHeight = isPhase ? 21 : 16;
    const barY = y + (rowHeight - barHeight) / 2;
    parts.push(`<rect x="${left}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="${barHeight / 2}" fill="${isPhase ? colors.svg : colors.subSvg}" stroke="#DCE4F0"/>`);

    if (item.kind === 'sub' && item.milestone) {
      const markerX = left + barWidth + 10;
      parts.push(`<text x="${markerX}" y="${y + 22}" fill="#E11D48" font-size="16" font-weight="800">★</text>`);
      parts.push(`<text class="small" x="${markerX + 18}" y="${y + 22}" fill="#9F1239" font-weight="700">${escapeXml(item.milestoneName || item.name)} (${fmtMd(item.end)})</text>`);
    }
  }

  parts.push('</svg>');
  return parts.join('');
}

export async function generateGanttXlsx(input, outputDir) {
  const { workbook, project } = await buildGanttWorkbook(input);
  await fs.mkdir(outputDir, { recursive: true });
  const filename = `项目计划甘特图-${Date.now()}.xlsx`;
  const outputPath = path.join(outputDir, filename);
  const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
  await fs.writeFile(outputPath, buffer);
  return { outputPath, filename, project };
}

export async function generateGanttPng(input, outputDir) {
  const project = normalizeProject(input);
  await fs.mkdir(outputDir, { recursive: true });
  const filename = `项目计划甘特图-${Date.now()}.png`;
  const outputPath = path.join(outputDir, filename);
  const svg = buildGanttSvg(project);
  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
  await fs.writeFile(outputPath, buffer);
  return { outputPath, filename, project };
}
