import { IconAdjustments } from '@tabler/icons-solidjs';
import { Show, createSignal, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';
import { SettingsPopup } from './SettingsPopup';
import { useActivities } from '$src/stores/ActivityContext';

export function SettingsButton() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activities] = useActivities();

  // start app with settings popup open by default if no activities list in localStorage
  onMount(() => {
    if (!activities.length) setIsOpen(true);
  });

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
