import { css } from "lit";
import { actionEditorStyles } from "../../common/editor/styles/action-editor.js";
import { editorStyles } from "../../common/editor/styles/editor-styles.js";

export const deckCardEditorStyles = [
  editorStyles,
  actionEditorStyles,
  css`
    .deck-subtabs-row {
      display: flex;
      align-items: end;
      gap: 12px;
      border-bottom: 1px solid var(--orbit-editor-border);
      margin-bottom: 12px;
    }

    .deck-subtabs {
      flex: 1 1 auto;
      border-bottom: none;
    }

    .deck-layout-toggle {
      display: flex;
      justify-content: flex-end;
      margin-left: auto;
      width: auto;
      min-width: 270px;
      margin-bottom: 6px;
    }

    .deck-tab-width-toggle {
      width: auto;
      min-width: 260px;
    }

    .deck-overlay-fit-toggle {
      width: min(360px, 100%);
      min-width: 0;
    }

    .field-grid.two-columns {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 12px;
    }

    .field-grid.four-columns {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }

    .deck-tab-colors {
      margin-top: 12px;
    }

    .deck-tab-divider-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 36px;
      margin-top: 4px;
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: var(--ha-line-height-normal, 20px);
    }

    .deck-card-tab-section {
      gap: 4px;
    }

    .deck-style-section {
      margin-top: 4px;
    }

    .deck-style-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-bottom: 0;
    }

    .deck-style-content .field-grid.two-columns {
      margin-bottom: 0;
    }

    .deck-force-padding-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 36px;
      margin: 0;
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: var(--ha-line-height-normal, 20px);
    }

    .deck-padding-grid {
      margin-top: -4px;
      margin-bottom: -26px;
    }

    .deck-interactions-section .interactions-form {
      margin-top: 0;
    }

    .deck-default-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: 6px 0 16px;
    }

    .deck-card-editor-frame {
      min-height: 160px;
    }

    .deck-child-type-tabs {
      margin: -4px 0 12px;
    }

    hui-badge-picker {
      display: block;
      min-height: 320px;
    }

    .deck-card-section {
      display: block;
      margin: 0;
      --expansion-panel-content-padding: 0;
      border-radius: var(--ha-border-radius-md);
      --ha-card-border-radius: var(--ha-border-radius-md);
    }

    .deck-card-section-content {
      padding: 12px;
    }

    .deck-card-section ha-icon {
      color: var(--secondary-text-color);
    }

    .deck-card-picker-loading {
      width: 100%;
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .native-picker-preloader {
      display: none;
    }

    .deck-empty-editor {
      color: var(--secondary-text-color);
      padding: 24px 0;
    }
  `,
];
