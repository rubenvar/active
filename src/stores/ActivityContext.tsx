import { createContext, useContext, ParentComponent } from 'solid-js';
import { activities as defaultActivities } from '$src/config';
import { createLocalStore } from './localStorage';

type ActivityContextState = string[];

type ActivityContextValue = [
  state: ActivityContextState,
  actions: {
    // eslint-disable-next-line no-unused-vars
    add: (activity: string) => void;
  }
];

const ActivityContext = createContext<ActivityContextValue>([
  defaultActivities,
  { add: () => undefined },
]);

export const ActivityProvider: ParentComponent<{
  default?: string[];
}> = (props) => {
  // use localStorage special store
  const [activities, setActivities] = createLocalStore(
    'activities',
    // eslint-disable-next-line solid/reactivity
    props.default ?? defaultActivities
  );

  // function that adds activity if it doesn't already exist
  const add = (activity?: string) => {
    if (
      activity &&
      !activities
        .map((st) => st.toLocaleLowerCase())
        .includes(activity.toLocaleLowerCase())
    ) {
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
