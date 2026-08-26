import { css } from "lit";

export const EditorPreviewSelectionStyles = css`
  .orbit-editor-preview-selected {
    isolation: isolate;
    position: relative;
  }

  .orbit-editor-preview-selected::before {
    border: 3px solid var(--primary-color);
    border-radius: inherit;
    box-sizing: border-box;
    content: "";
    inset: 0;
    pointer-events: none;
    position: absolute;
    z-index: 100;
  }

`;
