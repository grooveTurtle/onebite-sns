import { create } from "zustand";
// state, action 함수를 포함하는 객체인 store를 생성
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// type Store = {
//   count: number;
//   actions: {
//     increase: () => void;
//     decrease: () => void;
//   };
// };

export const useCountStore = create(
  // devtools: redux devtools 등으로 state 값 변동 체크시
  devtools(
    // persist: 자동으로 localStorage에 저장해줌.
    persist(
      // subscribe side effect 사용시
      subscribeWithSelector(
        immer(
          // combine middleware : store의 타입을 정의해주지 않아도 state 객체의 타입을 자동으로 추론한다.
          combine({ count: 0 }, (set, get) => ({
            actions: {
              increase: () => {
                //   set((state) => ({
                //     // state의 타입만 추론하므로 헷갈리지 않게 store -> state
                //     count: state.count + 1,
                //   }));

                // immer: 불변성 관리를 포함하고 있던 위의 코드를 다음과 같이 간단한 구조로 변경할 수 있다.
                set((state) => {
                  state.count += 1;
                });
              },
              decrease: () => {
                //   set((state) => ({
                //     count: state.count - 1,
                //   }));

                set((state) => {
                  state.count -= 1;
                });
              },
            },
          })),
        ),
      ),
      {
        name: "countStore",
        // partialize 없이 사용시, actions에 빈 객체가 들어가게 되면서, 이후 localStorage에 있는 actions의 이벤트를 실행할 수 없게 되는 즈앗ㅇ 발생
        // 이는 actions 내의 함수에 많은 정보들을 json으로 표현하여 저장할 수 없는 한계점 때문에 발생.
        // 따라서 localStorage에 저장 될 객체만 따로 지정한다.
        partialize: (store) => ({ count: store.count }),
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      name: "countStore",
    },
  ),
);

useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // listener function
    console.log("prevCount:::", prevCount);
    console.log("count:::", count);

    // side effect시 update를 처리한다면..
    // 현재 count state 값을 반환해줌
    // const store = useCountStore.getState();
    // useCountStore.setState((store) => ({count: 10}))
  },
);

// export const useCountStore = create<Store>((set, get) => ({
//   count: 0,
//   actions: {
//     increase: () => {
//       // const count = get().count;
//       // set({ count: count + 1 });

//       set((store) => ({
//         count: store.count + 1,
//       }));
//     },
//     decrease: () => {
//       set((store) => ({
//         count: store.count - 1,
//       }));
//     },
//   },
// }));

/**
 * store 객체의 내부 props나 action 함수가 수정 되었을 때, 직접 useStore를 가져다 사용하는 경우 일일히 명칭을 수정해줘야 하는 번거로움이 존재.
 * 따라서 아래와 같이 customhook을 만들어서 사용하게 하여 내부 store 코드의 변동이 일어나도 컴포넌트에서 사용할때의 코드는 불필요하게 수정하지 않도록 하자.
 */

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};

export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};
