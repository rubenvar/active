import { IconAdjustments } from '@tabler/icons-solidjs';
import { Show, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';
import { SettingsPopup } from './SettingsPopup';

export function SettingsButton() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        <IconAdjustments /> Ajustes
      </button>
      <Show when={isOpen()}>
        <Portal>
          <SettingsPopup setIsOpen={setIsOpen} />
        </Portal>
      </Show>
    </>
  );
}
