export function getButtonEntities() {
  return [
    this._config.button1,
    this._config.button2,
    this._config.button3,
    this._config.button4,
  ].filter(Boolean);
}

export function getCurveButtonConfig(index) {
  return this._config?.[`curve_button${index + 1}_icon`] || null;
}
