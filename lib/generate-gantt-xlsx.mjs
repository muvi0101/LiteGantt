import fs from 'node:fs/promises';
import path from 'node:path';
import ExcelJS from 'exceljs';
import JSZip from 'jszip';
import sharp from 'sharp';

const DAY = 24 * 60 * 60 * 1000;
const WEEK_START_COL = 3; // C
const FIRST_DATA_ROW = 6;
const LEFT_PHASE_WIDTH_PX = 250;
const LEFT_DURATION_WIDTH_PX = 160;
const WEEK1_WIDTH_PX = 72;
const WEEK_WIDTH_PX = 72;
const MIN_WEEK_WIDTH_PX = 72;
const MAX_WEEK_WIDTH_PX = 72;
const MAX_WEEKS = 104;
const EMU_PER_PX = 9525;
const PNG_EXPORT_WIDTH_PX = 3840;
const MILESTONE_MARKER_WIDTH_PX = 10;
const MILESTONE_BAR_TO_STAR_GAP_PX = 8;
const MILESTONE_STAR_SIZE_PX = 16;
const MILESTONE_STAR_TO_TEXT_GAP_PX = 12;
const METADATA_SHEET = '_metadata';
const METADATA_MARKER = '__PROJECT_GANTT_BUILDER_DATA__';
const TASK_STATUSES = ['未开始', '进行中', '已完成', '延期', '暂停'];
const STATUS_META = {
  未开始: { progress: 0, argb: 'FF94A3B8', svg: '#94A3B8', fill: 'FFF1F5F9' },
  进行中: { progress: 50, argb: 'FF0EA5E9', svg: '#0EA5E9', fill: 'FFE0F2FE' },
  已完成: { progress: 100, argb: 'FF16A34A', svg: '#16A34A', fill: 'FFDCFCE7' },
  延期: { progress: 40, argb: 'FFEF4444', svg: '#EF4444', fill: 'FFFEE2E2' },
  暂停: { progress: 50, argb: 'FFF59E0B', svg: '#F59E0B', fill: 'FFFEF3C7' },
};

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

function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, number));
}

function normalizeProgress(value) {
  return Math.round(clampNumber(value, 0, 100));
}

function normalizeTaskStatus(value) {
  const normalized = String(value || '').trim();
  return TASK_STATUSES.includes(normalized) ? normalized : '未开始';
}

function defaultProgressForStatus(status) {
  return STATUS_META[normalizeTaskStatus(status)]?.progress ?? 0;
}

function normalizeTaskProgress(task) {
  if (task && task.progress !== undefined && task.progress !== null && task.progress !== '') {
    return normalizeProgress(task.progress);
  }
  return defaultProgressForStatus(task?.status);
}

function phaseProgressFromTasks(tasks) {
  if (!tasks.length) return 0;
  return Math.round(tasks.reduce((sum, task) => sum + normalizeTaskProgress(task), 0) / tasks.length);
}

function statusMeta(status) {
  return STATUS_META[normalizeTaskStatus(status)] || STATUS_META['未开始'];
}

function parseProgressValue(value) {
  const match = String(value ?? '').match(/\d+/);
  return match ? normalizeProgress(Number(match[0])) : 0;
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

function weekWidth(weekIndex, weekWidthsPx) {
  return weekWidthsPx?.[weekIndex - 1] || (weekIndex === 1 ? WEEK1_WIDTH_PX : WEEK_WIDTH_PX);
}

function weekDateLabel(weekStart) {
  return `${fmtMd(weekStart)}-${fmtMd(addDays(weekStart, 6))}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function estimateHeaderWidthPx(text) {
  let width = 0;
  for (const ch of String(text || '')) {
    const code = ch.codePointAt(0);
    if (code <= 0x007f) width += /[0-9A-Za-z]/.test(ch) ? 7 : 5;
    else width += 13;
  }
  return width + 22;
}

function weekColumnWidthPx(label, weekIndex) {
  const minWidth = weekIndex === 1 ? WEEK1_WIDTH_PX : WEEK_WIDTH_PX;
  return clamp(estimateHeaderWidthPx(label), minWidth, MAX_WEEK_WIDTH_PX);
}

function excelColumnWidthFromPx(px) {
  return Math.round(Math.max(8, (px - 5) / 7) * 100) / 100;
}

function excelRowHeightFromPx(px) {
  return Math.round(px * 0.75 * 100) / 100;
}

function buildWeekColumns(project) {
  return Array.from({ length: project.totalWeeks }, (_, index) => {
    const weekIndex = index + 1;
    const start = addDays(project.projectStart, index * 7);
    const label = weekDateLabel(start);
    const widthPx = weekColumnWidthPx(label, weekIndex);
    return {
      weekIndex,
      start,
      end: addDays(start, 6),
      label,
      widthPx,
      excelWidth: excelColumnWidthFromPx(widthPx),
    };
  });
}

function dayOffset(date, projectStart) {
  return Math.round((date - projectStart) / DAY);
}

function dayPxAtOffset(offset, weekWidthsPx) {
  const weekIndex = Math.floor(offset / 7) + 1;
  return weekWidth(weekIndex, weekWidthsPx) / 7;
}

function anchorByDayOffset(offset, weekWidthsPx) {
  const weekIndex = Math.floor(offset / 7) + 1;
  const dayInWeek = offset % 7;
  return {
    col: (WEEK_START_COL - 1) + (weekIndex - 1),
    colOffsetPx: dayInWeek * dayPxAtOffset(offset, weekWidthsPx),
  };
}

function timelinePxByDayOffset(offset, weekWidthsPx) {
  const weekIndex = Math.floor(offset / 7) + 1;
  const dayInWeek = offset % 7;
  let px = 0;
  for (let index = 1; index < weekIndex; index += 1) px += weekWidth(index, weekWidthsPx);
  return px + dayInWeek * dayPxAtOffset(offset, weekWidthsPx);
}

function anchorByTimelinePx(timelinePx, totalWeeks = MAX_WEEKS, weekWidthsPx) {
  let remainingPx = Math.max(0, Number(timelinePx) || 0);
  for (let weekIndex = 1; weekIndex <= totalWeeks; weekIndex += 1) {
    const widthPx = weekWidth(weekIndex, weekWidthsPx);
    if (remainingPx < widthPx || weekIndex === totalWeeks) {
      return {
        col: (WEEK_START_COL - 1) + (weekIndex - 1),
        colOffsetPx: clamp(remainingPx, 0, widthPx),
      };
    }
    remainingPx -= widthPx;
  }
  return {
    col: (WEEK_START_COL - 1) + (totalWeeks - 1),
    colOffsetPx: Math.max(0, weekWidth(totalWeeks, weekWidthsPx) - 1),
  };
}

function widthPxForDays(startOffset, durationDays, weekWidthsPx) {
  return timelinePxByDayOffset(startOffset + durationDays, weekWidthsPx) - timelinePxByDayOffset(startOffset, weekWidthsPx);
}

function milestonePointPx(item, projectStart, weekWidthsPx) {
  return timelinePxByDayOffset(dayOffset(item.end, projectStart) + 1, weekWidthsPx);
}

function estimateTextWidthPx(text) {
  let width = 0;
  for (const ch of String(text)) {
    const code = ch.codePointAt(0);
    if (ch === ' ') width += 5;
    else if (code <= 0x007f) width += /[A-Za-z0-9]/.test(ch) ? 8 : 5;
    else width += 18;
  }
  return Math.max(120, width + 8);
}

function estimateMilestoneLabelWidthPx(task) {
  const label = `${task.milestoneName || task.name} (${fmtMd(task.end)})`;
  return estimateTextWidthPx(label);
}

function getExtraWeeksForMilestones(projectStart, phases, baseWeeks) {
  let baseTrackWidth = 0;
  for (let weekIndex = 1; weekIndex <= baseWeeks; weekIndex += 1) {
    baseTrackWidth += weekWidth(weekIndex);
  }
  let extraWeeks = 0;

  phases.forEach((phase) => {
    phase.tasks.forEach((task) => {
      if (!task.milestone) return;
      const markerRightPx = milestonePointPx(task, projectStart)
        + MILESTONE_BAR_TO_STAR_GAP_PX
        + MILESTONE_STAR_SIZE_PX
        + MILESTONE_STAR_TO_TEXT_GAP_PX
        + estimateMilestoneLabelWidthPx(task);
      const overflowPx = Math.max(0, markerRightPx - baseTrackWidth);
      if (overflowPx > 0) {
        extraWeeks = Math.max(extraWeeks, Math.ceil(overflowPx / WEEK_WIDTH_PX));
      }
    });
  });

  return extraWeeks;
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
        status: normalizeTaskStatus(task.status),
        progress: normalizeTaskProgress(task),
        milestone: Boolean(task.milestone),
        milestoneName: String(task.milestoneName || taskName).trim(),
      };
    }).sort((a, b) => a.start - b.start);

    const progress = phaseProgressFromTasks(normalizedTasks);
    return { kind: 'phase', phaseIndex, name, start, end, progress, tasks: normalizedTasks };
  });

  const allDates = [];
  for (const phase of normalized) {
    allDates.push(phase.start, phase.end);
    for (const task of phase.tasks) allDates.push(task.start, task.end);
  }
  const projectStart = new Date(Math.min(...normalized.map((phase) => phase.start.getTime())));
  const projectEnd = new Date(Math.max(...allDates.map((date) => date.getTime())));
  const baseWeeks = Math.max(4, Math.ceil(daysInclusive(projectStart, projectEnd) / 7));
  const extraWeeks = getExtraWeeksForMilestones(projectStart, normalized, baseWeeks);
  const totalWeeks = Math.max(4, Math.min(MAX_WEEKS, baseWeeks + extraWeeks));
  if (baseWeeks + extraWeeks > MAX_WEEKS) {
    throw new Error(`当前页面最多支持 ${MAX_WEEKS} 周，请缩短周期或拆分项目`);
  }

  const rows = normalized.flatMap((phase) => [phase, ...phase.tasks]);
  return { title, phases: normalized, rows, projectStart, projectEnd, totalWeeks };
}

function getMonthBandsFromWeeks(weekColumns) {
  const monthBands = [];
  let activeBand = null;
  for (const week of weekColumns) {
    const label = monthLabel(week.start);
    if (!activeBand || activeBand.label !== label) {
      activeBand = { label, fromWeek: week.weekIndex, toWeek: week.weekIndex };
      monthBands.push(activeBand);
    } else {
      activeBand.toWeek = week.weekIndex;
    }
  }
  return monthBands;
}

function serializeProject(project) {
  return {
    title: project.title,
    projectStart: iso(project.projectStart),
    phases: project.phases.map((phase) => ({
      name: phase.name,
      start: iso(phase.start),
      end: iso(phase.end),
      progress: normalizeProgress(phase.progress),
      tasks: phase.tasks.map((task) => ({
        name: task.name,
        start: iso(task.start),
        end: iso(task.end),
        status: normalizeTaskStatus(task.status),
        progress: normalizeTaskProgress(task),
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
    shrinkToFit: Boolean(options.shrinkToFit),
  };
  cell.font = {
    name: 'Noto Sans CJK SC',
    size: options.size || 11,
    bold: Boolean(options.bold),
    color: { argb: options.color || 'FF334155' },
  };
}

function pushBarShapes(shapes, rowNo, item, projectStart, totalWeeks, weekWidthsPx) {
  const durationDays = daysInclusive(item.start, item.end);
  const startOffset = dayOffset(item.start, projectStart);
  const pointPx = item.milestone ? milestonePointPx(item, projectStart, weekWidthsPx) : null;
  const drawAsMilestonePoint = item.kind === 'sub' && item.milestone && durationDays === 1;
  const timelineRightPx = drawAsMilestonePoint
    ? pointPx
    : timelinePxByDayOffset(startOffset + durationDays, weekWidthsPx);
  const timelineLeftPx = drawAsMilestonePoint
    ? timelineRightPx - MILESTONE_MARKER_WIDTH_PX
    : timelinePxByDayOffset(startOffset, weekWidthsPx);
  const fromAnchor = anchorByTimelinePx(timelineLeftPx, totalWeeks, weekWidthsPx);
  const toAnchor = anchorByTimelinePx(timelineRightPx, totalWeeks, weekWidthsPx);
  const colors = PALETTE[item.phaseIndex % PALETTE.length];
  const color = colors.svg;
  const barHeight = item.kind === 'phase' ? 24 : 18;
  const barTop = item.kind === 'phase' ? 6 : 9;
  const barWidthPx = Math.max(1, timelineRightPx - timelineLeftPx);

  shapes.push({
    geometry: 'roundRect',
    row: rowNo - 1,
    col: fromAnchor.col,
    rowOffsetPx: barTop,
    colOffsetPx: fromAnchor.colOffsetPx,
    toCol: toAnchor.col,
    toColOffsetPx: toAnchor.colOffsetPx,
    toRowOffsetPx: barTop + barHeight,
    widthPx: barWidthPx,
    heightPx: barHeight,
    fill: color,
    line: color,
  });

  return {
    barWidthPx,
    timelineLeftPx,
    timelineRightPx,
    milestonePointPx: pointPx ?? timelineRightPx,
    totalWeeks,
    weekWidthsPx,
  };
}

function pushMilestoneShapes(shapes, rowNo, item, barAnchor) {
  if (!item.milestone) return;
  const label = `${item.milestoneName || item.name} (${fmtMd(item.end)})`;
  const starTimelinePx = barAnchor.milestonePointPx + MILESTONE_BAR_TO_STAR_GAP_PX;
  const textTimelinePx = starTimelinePx + MILESTONE_STAR_SIZE_PX + MILESTONE_STAR_TO_TEXT_GAP_PX;
  const starAnchor = anchorByTimelinePx(starTimelinePx, barAnchor.totalWeeks, barAnchor.weekWidthsPx);
  const textAnchor = anchorByTimelinePx(textTimelinePx, barAnchor.totalWeeks, barAnchor.weekWidthsPx);
  const labelWidthPx = estimateTextWidthPx(label);

  shapes.push({
    geometry: 'rect',
    row: rowNo - 1,
    col: textAnchor.col,
    rowOffsetPx: 3.5,
    colOffsetPx: textAnchor.colOffsetPx,
    widthPx: labelWidthPx,
    heightPx: 22,
    noFill: true,
    noLine: true,
    text: label,
    textColor: '#9F1239',
  });
  shapes.push({
    geometry: 'star5',
    row: rowNo - 1,
    col: starAnchor.col,
    rowOffsetPx: 6,
    colOffsetPx: starAnchor.colOffsetPx,
    widthPx: MILESTONE_STAR_SIZE_PX,
    heightPx: MILESTONE_STAR_SIZE_PX,
    fill: '#E11D48',
    line: '#BE123C',
  });
}

function weekOverlap(itemStart, itemEnd, weekStart) {
  const weekEnd = addDays(weekStart, 6);
  return itemStart <= weekEnd && itemEnd >= weekStart;
}

function milestoneWeek(item, projectStart) {
  return Math.floor(Math.max(0, Math.round((item.end - projectStart) / DAY)) / 7) + 1;
}

function addDetailWorksheet(workbook, project) {
  const sheet = workbook.addWorksheet('项目明细', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  sheet.columns = [
    { header: '项目阶段', width: 22 },
    { header: '项目任务明细', width: 28 },
    { header: '任务状态', width: 12 },
    { header: '开始日期', width: 14 },
    { header: '结束日期', width: 14 },
    { header: '任务完成度', width: 13 },
    { header: '阶段完成度', width: 13 },
    { header: '里程碑', width: 10 },
  ];

  sheet.getRow(1).height = 24;
  sheet.getRow(1).eachCell((cell) => {
    styleCell(cell, { fill: 'FFDDE8FA', color: 'FF1E3A8A', bold: true });
  });

  for (const phase of project.phases) {
    if (!phase.tasks.length) {
      sheet.addRow([phase.name, '', '', iso(phase.start), iso(phase.end), '', `${normalizeProgress(phase.progress)}%`, '']);
      continue;
    }

    for (const task of phase.tasks) {
      sheet.addRow([
        phase.name,
        task.name,
        normalizeTaskStatus(task.status),
        iso(task.start),
        iso(task.end),
        `${normalizeTaskProgress(task)}%`,
        `${normalizeProgress(phase.progress)}%`,
        task.milestone ? '是' : '',
      ]);
    }
  }

  for (let rowNo = 2; rowNo <= sheet.rowCount; rowNo += 1) {
    const row = sheet.getRow(rowNo);
    const status = normalizeTaskStatus(row.getCell(3).value);
    row.height = 22;
    row.eachCell((cell, colNo) => {
      const isStatus = colNo === 3 && cell.value;
      styleCell(cell, {
        fill: isStatus ? statusMeta(status).fill : 'FFFFFFFF',
        color: isStatus ? statusMeta(status).argb : 'FF334155',
        bold: isStatus || colNo === 6 || colNo === 7,
        horizontal: [1, 2, 5].includes(colNo) ? 'left' : 'center',
        shrinkToFit: true,
      });
    });
  }

  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: Math.max(1, sheet.rowCount), column: sheet.columnCount },
  };
}

async function buildGanttWorkbook(input) {
  const project = normalizeProject(input);
  const drawingShapes = [];
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'LiteGantt';
  workbook.created = new Date();
  workbook.modified = new Date();

  const sheet = workbook.addWorksheet('周视图甘特图', {
    views: [{ state: 'frozen', xSplit: 2, ySplit: 5 }],
  });
  const weekEndCol = WEEK_START_COL + project.totalWeeks - 1;
  const lastCol = weekEndCol + 1;
  const lastDataRow = FIRST_DATA_ROW + project.rows.length - 1;
  const weekColumns = buildWeekColumns(project);
  const weekWidthsPx = weekColumns.map((week) => week.widthPx);

  sheet.columns = [
    { width: excelColumnWidthFromPx(LEFT_PHASE_WIDTH_PX) },
    { width: excelColumnWidthFromPx(LEFT_DURATION_WIDTH_PX) },
    ...weekColumns.map((week) => ({ width: week.excelWidth })),
    { width: 3 },
  ];

  sheet.mergeCells(1, 1, 1, weekEndCol);
  const titleCell = sheet.getCell(1, 1);
  titleCell.value = project.title;
  styleCell(titleCell, { fill: 'FFFFFFFF', color: 'FF1E40AF', size: 22, bold: true, horizontal: 'left' });
  sheet.getRow(1).height = excelRowHeightFromPx(42);
  sheet.getRow(2).height = excelRowHeightFromPx(8);

  sheet.mergeCells(3, 1, 5, 1);
  sheet.mergeCells(3, 2, 5, 2);
  sheet.getCell(3, 1).value = '项目阶段';
  sheet.getCell(3, 2).value = '用时';
  styleCell(sheet.getCell(3, 1), { fill: 'FFDDE8FA', color: 'FF1E3A8A', bold: true, size: 13, horizontal: 'left' });
  styleCell(sheet.getCell(3, 2), { fill: 'FFDFF2F8', color: 'FF0F4C63', bold: true, size: 13 });
  sheet.getRow(3).height = excelRowHeightFromPx(34);
  sheet.getRow(4).height = excelRowHeightFromPx(20);
  sheet.getRow(5).height = excelRowHeightFromPx(24);

  const monthBands = getMonthBandsFromWeeks(weekColumns);
  for (const week of weekColumns) {
    const { weekIndex } = week;
    const col = WEEK_START_COL + weekIndex - 1;
    sheet.getCell(4, col).value = `W${weekIndex}`;
    sheet.getCell(5, col).value = week.label;
    styleCell(sheet.getCell(4, col), { fill: 'FFEEF2F8', bold: true, shrinkToFit: true });
    styleCell(sheet.getCell(5, col), { fill: 'FFF5F8FC', color: 'FF64748B', size: 9, shrinkToFit: true });
  }

  for (const band of monthBands) {
    const fromCol = WEEK_START_COL + band.fromWeek - 1;
    const toCol = WEEK_START_COL + band.toWeek - 1;
    if (fromCol !== toCol) sheet.mergeCells(3, fromCol, 3, toCol);
    sheet.getCell(3, fromCol).value = band.label;
    styleCell(sheet.getCell(3, fromCol), { fill: 'FFE6EBF3', bold: true, shrinkToFit: true });
  }

  for (let index = 0; index < project.rows.length; index += 1) {
    const rowNo = FIRST_DATA_ROW + index;
    const item = project.rows[index];
    const durationDays = daysInclusive(item.start, item.end);
    const durationText = item.kind === 'phase'
      ? `${Math.ceil(durationDays / 7)}周（${fmtMd(item.start)}-${fmtMd(item.end)}）`
      : `${durationDays}天（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
    const isPhase = item.kind === 'phase';
    const row = sheet.getRow(rowNo);
    row.height = excelRowHeightFromPx(isPhase ? 36 : 32);

    sheet.getCell(rowNo, 1).value = isPhase ? item.name : `  · ${item.name}`;
    sheet.getCell(rowNo, 2).value = durationText;
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

    for (let weekIndex = 1; weekIndex <= project.totalWeeks; weekIndex += 1) {
      const col = WEEK_START_COL + weekIndex - 1;
      const weekStart = addDays(project.projectStart, (weekIndex - 1) * 7);
      const cell = sheet.getCell(rowNo, col);
      const background = isPhase ? 'FFF3F7FF' : 'FFF9FBFE';
      styleCell(cell, { fill: background });
    }

    const barAnchor = pushBarShapes(drawingShapes, rowNo, item, project.projectStart, project.totalWeeks, weekWidthsPx);
    if (item.kind === 'sub') pushMilestoneShapes(drawingShapes, rowNo, item, barAnchor);
  }

  for (let row = 1; row <= lastDataRow; row += 1) {
    for (let col = 1; col <= lastCol; col += 1) {
      const cell = sheet.getCell(row, col);
      if (!cell.border) cell.border = border();
    }
  }

  addDetailWorksheet(workbook, project);

  const metadata = workbook.addWorksheet(METADATA_SHEET, { state: 'veryHidden' });
  metadata.getCell('A1').value = METADATA_MARKER;
  metadata.getCell('A2').value = JSON.stringify(serializeProject(project));

  return { workbook, project, drawingShapes };
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
  const hasStatusColumn = String(sheet.getCell(3, 4).value || '').includes('状态');
  const statusCol = hasStatusColumn ? 4 : null;
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
      currentPhase = { name, start: dates.start, end: dates.end, progress: statusCol ? parseProgressValue(sheet.getCell(rowNo, statusCol).value) : 0, tasks: [] };
      phases.push(currentPhase);
    } else if (currentPhase) {
      currentPhase.tasks.push({
        name,
        start: dates.start,
        end: dates.end,
        status: statusCol ? normalizeTaskStatus(sheet.getCell(rowNo, statusCol).value) : '未开始',
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

function pxToEmu(px) {
  return Math.round(Number(px || 0) * EMU_PER_PX);
}

function colorValue(value) {
  return String(value || '#FFFFFF').replace(/^#/, '').toUpperCase();
}

function drawingShapeXml(shape, id) {
  const fill = shape.noFill ? null : colorValue(shape.fill);
  const line = shape.noLine ? null : colorValue(shape.line || shape.fill);
  const geometry = shape.geometry === 'star5' ? 'star5' : shape.geometry === 'rect' ? 'rect' : 'roundRect';
  const text = shape.text
    ? `<xdr:txBody><a:bodyPr wrap="none" rtlCol="0" lIns="0" tIns="0" rIns="0" bIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:r><a:rPr lang="zh-CN" sz="1000" b="1"><a:solidFill><a:srgbClr val="${colorValue(shape.textColor || '#9F1239')}"/></a:solidFill><a:latin typeface="PingFang SC"/><a:ea typeface="PingFang SC"/></a:rPr><a:t>${escapeXml(shape.text)}</a:t></a:r></a:p></xdr:txBody>`
    : '<xdr:txBody><a:bodyPr/><a:lstStyle/><a:p/></xdr:txBody>';
  const txBox = shape.text ? ' txBox="1"' : '';
  const fillXml = shape.noFill
    ? '<a:noFill/>'
    : `<a:solidFill><a:srgbClr val="${fill}"/></a:solidFill>`;
  const lineXml = shape.noLine
    ? '<a:ln><a:noFill/></a:ln>'
    : `<a:ln w="9525"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln>`;
  const hasToAnchor = Number.isFinite(shape.toCol) && Number.isFinite(shape.toColOffsetPx);
  const anchorStart = hasToAnchor
    ? '<xdr:twoCellAnchor editAs="oneCell">'
    : '<xdr:oneCellAnchor>';
  const anchorEnd = hasToAnchor ? '</xdr:twoCellAnchor>' : '</xdr:oneCellAnchor>';
  const toAnchor = hasToAnchor
    ? `
    <xdr:to>
      <xdr:col>${shape.toCol}</xdr:col>
      <xdr:colOff>${pxToEmu(shape.toColOffsetPx)}</xdr:colOff>
      <xdr:row>${shape.toRow ?? shape.row}</xdr:row>
      <xdr:rowOff>${pxToEmu(shape.toRowOffsetPx ?? shape.rowOffsetPx + shape.heightPx)}</xdr:rowOff>
    </xdr:to>`
    : '';
  const oneCellExt = hasToAnchor ? '' : `
    <xdr:ext cx="${pxToEmu(shape.widthPx)}" cy="${pxToEmu(shape.heightPx)}"/>`;

  return `
  ${anchorStart}
    <xdr:from>
      <xdr:col>${shape.col}</xdr:col>
      <xdr:colOff>${pxToEmu(shape.colOffsetPx)}</xdr:colOff>
      <xdr:row>${shape.row}</xdr:row>
      <xdr:rowOff>${pxToEmu(shape.rowOffsetPx)}</xdr:rowOff>
    </xdr:from>
    ${toAnchor}${oneCellExt}
    <xdr:sp macro="" textlink="">
      <xdr:nvSpPr>
        <xdr:cNvPr id="${id}" name="LiteGantt Shape ${id}"/>
        <xdr:cNvSpPr${txBox}/>
      </xdr:nvSpPr>
      <xdr:spPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="${pxToEmu(shape.widthPx)}" cy="${pxToEmu(shape.heightPx)}"/>
        </a:xfrm>
        <a:prstGeom prst="${geometry}"><a:avLst/></a:prstGeom>
        ${fillXml}
        ${lineXml}
      </xdr:spPr>
      ${text}
    </xdr:sp>
    <xdr:clientData/>
  ${anchorEnd}`;
}

function buildDrawingXml(shapes) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
${shapes.map((shape, index) => drawingShapeXml(shape, index + 2)).join('\n')}
</xdr:wsDr>`;
}

async function patchWorkbookDrawing(inputBuffer, shapes) {
  if (!shapes.length) return Buffer.from(inputBuffer);
  const zip = await JSZip.loadAsync(inputBuffer);
  const drawingPath = 'xl/drawings/drawing1.xml';
  const sheetPath = 'xl/worksheets/sheet1.xml';
  const sheetRelsPath = 'xl/worksheets/_rels/sheet1.xml.rels';
  const contentTypesPath = '[Content_Types].xml';
  const relationshipNs = 'http://schemas.openxmlformats.org/package/2006/relationships';
  const drawingRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing';

  zip.file(drawingPath, buildDrawingXml(shapes));

  let sheetRelsXml = await zip.file(sheetRelsPath)?.async('string');
  let drawingRelId = 'rId1';
  if (sheetRelsXml) {
    const ids = [...sheetRelsXml.matchAll(/Id="rId(\d+)"/g)].map((match) => Number(match[1]));
    drawingRelId = `rId${Math.max(0, ...ids) + 1}`;
    sheetRelsXml = sheetRelsXml.replace(
      '</Relationships>',
      `<Relationship Id="${drawingRelId}" Type="${drawingRelType}" Target="../drawings/drawing1.xml"/></Relationships>`
    );
  } else {
    sheetRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${relationshipNs}"><Relationship Id="${drawingRelId}" Type="${drawingRelType}" Target="../drawings/drawing1.xml"/></Relationships>`;
  }
  zip.file(sheetRelsPath, sheetRelsXml);

  let sheetXml = await zip.file(sheetPath).async('string');
  if (!sheetXml.includes('xmlns:r=')) {
    sheetXml = sheetXml.replace('<worksheet ', '<worksheet xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ');
  }
  if (!sheetXml.includes('<drawing ')) {
    sheetXml = sheetXml.replace('</worksheet>', `<drawing r:id="${drawingRelId}"/></worksheet>`);
  }
  zip.file(sheetPath, sheetXml);

  let contentTypesXml = await zip.file(contentTypesPath).async('string');
  if (!contentTypesXml.includes('/xl/drawings/drawing1.xml')) {
    contentTypesXml = contentTypesXml.replace(
      '</Types>',
      '<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/></Types>'
    );
  }
  zip.file(contentTypesPath, contentTypesXml);

  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}

function svgText(value) {
  return escapeXml(value);
}

function buildGanttSvg(project) {
  const leftPhaseWidth = LEFT_PHASE_WIDTH_PX;
  const leftDurationWidth = LEFT_DURATION_WIDTH_PX;
  const weekWidth = WEEK_WIDTH_PX;
  const monthRowHeight = 34;
  const weekRowHeight = 20;
  const dateRowHeight = 24;
  const headerHeight = monthRowHeight + weekRowHeight + dateRowHeight;
  const phaseRowHeight = 36;
  const taskRowHeight = 32;
  const padding = 0;
  const timelineLeft = padding + leftPhaseWidth + leftDurationWidth;
  const timelineWidth = project.totalWeeks * weekWidth;
  const width = padding * 2 + leftPhaseWidth + leftDurationWidth + timelineWidth;
  const height = padding * 2 + headerHeight + project.rows.reduce((sum, item) => sum + (item.kind === 'phase' ? phaseRowHeight : taskRowHeight), 0);
  const weekColumns = Array.from({ length: project.totalWeeks }, (_, index) => ({
    weekIndex: index + 1,
    start: addDays(project.projectStart, index * 7),
    end: addDays(project.projectStart, index * 7 + 6),
  }));
  const monthBands = getMonthBandsFromWeeks(weekColumns);
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `<style>
      text{font-family:"Avenir Next","PingFang SC","Microsoft YaHei",Arial,sans-serif;dominant-baseline:middle}
      .head{font-size:13px;font-weight:850}
      .month{font-size:15px;font-weight:850}
      .date{font-size:11px;font-weight:500}
      .phase-name{font-size:15px;font-weight:850}
      .phase-duration{font-size:15px;font-weight:850}
      .task-name,.task-duration{font-size:13px;font-weight:500}
      .milestone{font-size:13px;font-weight:800}
    </style>`,
    `<rect x="0" y="0" width="${width}" height="${height}" fill="#F7F9FC"/>`,
  ];

  function rect(x, y, w, h, fill, stroke = '#DBE5F1', rx = 0) {
    parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}"${rx ? ` rx="${rx}"` : ''} fill="${fill}" stroke="${stroke}" stroke-width="1"/>`);
  }

  rect(padding, padding, leftPhaseWidth, headerHeight, '#DCE9FB');
  rect(padding + leftPhaseWidth, padding, leftDurationWidth, headerHeight, '#DFF3F8');
  parts.push(`<text class="head" x="${padding + 12}" y="${padding + headerHeight / 2}" fill="#1E3A8A">${svgText('项目阶段')}</text>`);
  parts.push(`<text class="head" x="${padding + leftPhaseWidth + leftDurationWidth / 2}" y="${padding + headerHeight / 2}" fill="#0F4C63" text-anchor="middle">${svgText('用时')}</text>`);

  for (const band of monthBands) {
    const x = timelineLeft + (band.fromWeek - 1) * weekWidth;
    const w = (band.toWeek - band.fromWeek + 1) * weekWidth;
    rect(x, padding, w, monthRowHeight, '#E5EBF4');
    parts.push(`<text class="month" x="${x + w / 2}" y="${padding + monthRowHeight / 2}" fill="#334155" text-anchor="middle">${svgText(band.label)}</text>`);
  }

  for (const week of weekColumns) {
    const x = timelineLeft + (week.weekIndex - 1) * weekWidth;
    rect(x, padding + monthRowHeight, weekWidth, weekRowHeight, '#EEF3F9');
    rect(x, padding + monthRowHeight + weekRowHeight, weekWidth, dateRowHeight, '#F5F8FC');
    parts.push(`<text class="head" x="${x + weekWidth / 2}" y="${padding + monthRowHeight + weekRowHeight / 2}" fill="#334155" text-anchor="middle">W${week.weekIndex}</text>`);
    parts.push(`<text class="date" x="${x + weekWidth / 2}" y="${padding + monthRowHeight + weekRowHeight + dateRowHeight / 2}" fill="#64748B" text-anchor="middle">${fmtMd(week.start)}-${fmtMd(week.end)}</text>`);
  }

  let y = padding + headerHeight;
  for (const item of project.rows) {
    const isPhase = item.kind === 'phase';
    const rowHeight = isPhase ? phaseRowHeight : taskRowHeight;
    const colors = PALETTE[item.phaseIndex % PALETTE.length];
    const durationDays = daysInclusive(item.start, item.end);
    const durationText = isPhase
      ? `${Math.ceil(durationDays / 7)}周（${fmtMd(item.start)}-${fmtMd(item.end)}）`
      : `${durationDays}天（${fmtMd(item.start)}-${fmtMd(item.end)}）`;
    const phaseColor = colors.svg;
    const name = isPhase ? item.name : `· ${item.name}`;

    rect(padding, y, leftPhaseWidth, rowHeight, isPhase ? '#E7EEFA' : '#F1F5FC', '#DBE5F1');
    rect(padding + leftPhaseWidth, y, leftDurationWidth, rowHeight, isPhase ? '#E5F3F8' : '#EEF7FB', '#DBE5F1');
    parts.push(`<text class="${isPhase ? 'phase-name' : 'task-name'}" x="${padding + 12}" y="${y + rowHeight / 2}" fill="${isPhase ? '#1E3A8A' : '#334155'}">${svgText(name)}</text>`);
    parts.push(`<text class="${isPhase ? 'phase-duration' : 'task-duration'}" x="${padding + leftPhaseWidth + leftDurationWidth / 2}" y="${y + rowHeight / 2}" fill="${isPhase ? '#0F4C63' : '#475569'}" text-anchor="middle">${svgText(durationText)}</text>`);

    for (let weekIndex = 1; weekIndex <= project.totalWeeks; weekIndex += 1) {
      const x = timelineLeft + (weekIndex - 1) * weekWidth;
      rect(x, y, weekWidth, rowHeight, isPhase ? '#F3F7FF' : '#F9FBFE', '#E3EAF4');
    }

    const startOffset = dayOffset(item.start, project.projectStart);
    const pointPx = item.milestone ? milestonePointPx(item, project.projectStart, null) : null;
    const drawAsMilestonePoint = item.kind === 'sub' && item.milestone && durationDays === 1;
    const barRight = drawAsMilestonePoint
      ? pointPx
      : timelinePxByDayOffset(startOffset + durationDays, null);
    const barLeft = drawAsMilestonePoint
      ? barRight - MILESTONE_MARKER_WIDTH_PX
      : timelinePxByDayOffset(startOffset, null);
    const barX = timelineLeft + barLeft;
    const barWidth = Math.max(1, barRight - barLeft);
    const barHeight = isPhase ? 22 : 18;
    const barY = y + (rowHeight - barHeight) / 2;
    parts.push(`<rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="5" fill="${phaseColor}" stroke="${phaseColor}" stroke-width="1"/>`);

    if (item.kind === 'sub' && item.milestone) {
      const milestonePoint = timelineLeft + (pointPx ?? barRight);
      const starX = milestonePoint + MILESTONE_BAR_TO_STAR_GAP_PX;
      const starY = y + rowHeight / 2 + 1;
      const labelX = starX + MILESTONE_STAR_SIZE_PX + MILESTONE_STAR_TO_TEXT_GAP_PX;
      parts.push(`<text x="${starX}" y="${starY}" fill="#E11D48" font-size="18" font-weight="850">★</text>`);
      parts.push(`<text class="milestone" x="${labelX}" y="${y + rowHeight / 2}" fill="#9F1239">${svgText(`${item.milestoneName || item.name} (${fmtMd(item.end)})`)}</text>`);
    }

    y += rowHeight;
  }

  parts.push('</svg>');
  return { svg: parts.join(''), width, height };
}

export async function generateGanttXlsx(input, outputDir) {
  const { workbook, project, drawingShapes } = await buildGanttWorkbook(input);
  await fs.mkdir(outputDir, { recursive: true });
  const filename = `项目计划甘特图-${Date.now()}.xlsx`;
  const outputPath = path.join(outputDir, filename);
  const workbookBuffer = Buffer.from(await workbook.xlsx.writeBuffer());
  const buffer = await patchWorkbookDrawing(workbookBuffer, drawingShapes);
  await fs.writeFile(outputPath, buffer);
  return { outputPath, filename, project };
}

export async function generateGanttPng(input, outputDir) {
  const project = normalizeProject(input);
  await fs.mkdir(outputDir, { recursive: true });
  const filename = `项目计划甘特图-${Date.now()}.png`;
  const outputPath = path.join(outputDir, filename);
  const { svg, width } = buildGanttSvg(project);
  const outputWidth = Math.max(PNG_EXPORT_WIDTH_PX, Math.round(width));
  const buffer = await sharp(Buffer.from(svg), { density: 288 })
    .resize({ width: outputWidth, withoutEnlargement: false })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  await fs.writeFile(outputPath, buffer);
  return { outputPath, filename, project };
}
