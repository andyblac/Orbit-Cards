export function mergeConfig(currentConfig, changes) {
  const nextConfig = {
    ...(currentConfig || {}),
    ...changes,
  };

  Object.keys(nextConfig).forEach((key) => {
    if (nextConfig[key] === undefined) {
      delete nextConfig[key];
    }
  });

  return nextConfig;
}

export function clearKeys(keys, base = {}) {
  const changes = { ...base };

  keys.forEach((key) => {
    changes[key] = undefined;
  });

  return changes;
}

export function clearEntityConfig(entityKey, dependentKeys = []) {
  return clearKeys([
    entityKey,
    ...dependentKeys,
  ]);
}

export function clearPrefixedEntityConfig(prefix, suffixes = []) {
  return clearKeys([
    prefix,
    ...suffixes.map((suffix) => `${prefix}${suffix}`),
  ]);
}
