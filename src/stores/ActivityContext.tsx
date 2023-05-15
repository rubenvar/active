/* eslint-disable no-unused-vars */
import { createContext, useContext, ParentComponent } from 'solid-js';
import { Activity, activities as defaultActivities } from '$src/config';
import { createLocalStore } from './localStorage';

type ActivityContextState = Activity[];

type ActivityContextValue = [
  state: ActivityContextState,
  actions: {
    add: (activity: Activity) => void;
    update: (activity: Activity) => void;
  }
];

const ActivityContext = createContext<ActivityContextValue>([
  defaultActivities,
  { add: () => undefined, update: () => undefined },
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
  const add = (activity: Activity) => {
    if (!activities.find((obj) => obj.value === activity.value)) {
      setActivities((curr) => [...curr, activity]);
    }
  };
  // function that updates activity color if it exists
  const update = (activity: Activity) => {
    if (activities.find((obj) => obj.value === activity.value)) {
      setActivities((curr) =>
        curr.map((obj) => {
          if (obj.value === activity.value) return activity;
          return obj;
        })
      );
    }
  };

  // return the provider wrapper
  return (
    <ActivityContext.Provider value={[activities, { add, update }]}>
      {props.children}
    </ActivityContext.Provider>
  );
};

// export the custom context helper
export function useActivities() {
  return useContext(ActivityContext);
}
