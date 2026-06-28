export function getGroupedCardColumnCount({
  config = {},
  count = 1,
  wrapKey = "wrap",
  perRowKey,
  defaultColumns = 3,
}) {
  if (!config[wrapKey]) {
    return Math.max(1, count);
  }

  const requestedColumns = Number(config[perRowKey]);
  const columns = Number.isFinite(requestedColumns)
    ? Math.floor(requestedColumns)
    : defaultColumns;

  return Math.max(1, Math.min(count, columns || 1));
}

export function getGroupedCardRowCount(options) {
  const columns = getGroupedCardColumnCount(options);

  return Math.max(1, Math.ceil((options?.count || 1) / columns));
}
