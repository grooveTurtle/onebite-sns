import { useDecreaseCount, useIncreaseCount } from "@/store/count";
import { Button } from "../ui/button";

export default function Controller() {
  //   const { decrease, increase } = useCountStore(); // 전체 store를 반환하기 때문에 count가 바뀌면서 해당 컴포넌트도 리랜더링 됨.
  //   const increase = useCountStore((store) => store.increase); // store의 increase selector 함수만 뽑아서 사용. (count 변경하여도 리랜더링 x)
  //   const decrease = useCountStore((store) => store.decrease); // store의 decrease selector 함수만 뽑아서 사용.
  //   const { increase, decrease } = useCountStore((store) => store.actions); // action 함수들을 actions로 묶어서 한 번에 불러오는 것도 가능
  const increase = useIncreaseCount();
  const decrease = useDecreaseCount();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
