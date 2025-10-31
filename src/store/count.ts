import { create } from "zustand";
// state, action 함수를 포함하는 객체인 store를 생성
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// type Store = {
//   count: number;
//   actions: {
//     increase: () => void;
//     decrease: () => void;
//   };
// };

// combine middleware : store의 타입을 정의해주지 않아도 state 객체의 타입을 자동으로 추론한다.
export const useCountStore = create(
  immer(
    combine({ count: 0 }, (set, get) => ({
      actions: {
        increase: () => {
          //   set((state) => ({
          //     // state의 타입만 추론하므로 헷갈리지 않게 store -> state
          //     count: state.count + 1,
          //   }));

          // 불변성 관리를 포함하고 있던 위의 코드를 다음과 같이 간단한 구조로 변경할 수 있다.
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
