
import { css } from "lit";
export const layoutStyles = css`
:host {
  display: block;

  --orbit-editor-surface: color-mix(
    in srgb,
    var(--primary-text-color, #fff) 5%,
    transparent
  );
  --orbit-editor-control: color-mix(
    in srgb,
    var(--primary-text-color, #fff) 4%,
    transparent
  );
  --orbit-editor-control-hover: color-mix(
    in srgb,
    var(--primary-text-color, #fff) 8%,
    transparent
  );
  --orbit-editor-border: color-mix(
    in srgb,
    var(--primary-text-color, #fff) 13%,
    transparent
  );
  --orbit-editor-popover: color-mix(
    in srgb,
    var(--card-background-color, var(--secondary-background-color)) 94%,
    var(--primary-text-color, #fff) 6%
  );
  --orbit-editor-active: color-mix(
    in srgb,
    var(--primary-color) 20%,
    transparent
  );
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
}
`;
