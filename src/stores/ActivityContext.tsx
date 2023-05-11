import { createContext, useContext, ParentComponent } from 'solid-js';
import { activities as defaultActivities } from '$src/config';
import { createLocalStore } from './localStorage';

export type Activity = {
  value: string;
  color: string; // hex
};

type ActivityContextState = Activity[];

type ActivityContextValue = [
  state: ActivityContextState,
  actions: {
    // eslint-disable-next-line no-unused-vars
    add: (activity: Activity) => void;
  }
];

const ActivityContext = createContext<ActivityContextValue>([
  defaultActivities,
  { add: () => undefined },
]);

export const ActivityProvider: ParentComponent<{
  default?: Activity[];
}> = (props) => {
  // use localStorage special store
  const [activities, setActivities] = createLocalStore(
    'activities',
    // eslint-disable-next-line solid/reactivity
    props.default ?? defaultActivities
  );

  // function that adds activity if it doesn't already exist
  const add = (activity?: Activity) => {
    if (activity && !activities.find((obj) => obj.value === activity.value)) {
      setActivities((curr) => [...curr, activity]);
    }
  };

  // return the provider wrapper
  return (
    <ActivityContext.Provider value={[activities, { add }]}>
      {props.children}
    </ActivityContext.Provider>
  );
};

// export the custom context helper
export function useActivities() {
  return useContext(ActivityContext);
}