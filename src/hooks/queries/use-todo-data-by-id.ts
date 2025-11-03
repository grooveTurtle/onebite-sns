import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: number) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ["todos", id],
    // retry: 0, //재시도 횟수
    // refetchInterval: 1000, // 1초마다 refetching

    staleTime: 5000, // 데이터가 fresh일때, stale이 되는 간격의 time 설정 (기본값: 0, 바로 stale이 되어버림)
    gcTime: 5000, // 데이터가 inactive 상태일때, gcTime 경과 이후 삭제 됨. (기본값 300000, 5분)

    // refetchOnMount: false, // mount 시점에서 stale 상태가 되어도 refetch 하지 않음
    // refetchOnWindowFocus: false, // 윈도우 포커스시 refetch하지 않음.
    // refetchOnReconnect: false, // 연결 끊긴 후 재접속시에 refetch 하지 않음.
    // refetchInterval: false, // interval 설정되어있어도 refetch 하지 않음.
  });
}

// 1. fetching
// 데이터가 불러와지는 단계 (fetching)

// 2. fresh
// 방금 막 불러와진 데이터 (신선한)

// 3. stale
// fresh -----> staleTime(like 유통기한) -> stale
// 데이터를 불러온지 꽤 경과한 상태.
// 리페칭 동작 할 수 있음 (fetching 단계로 이동)
// 리페칭이 발생하는 상황 (4가지)
// Mount: 이 캐시 데이터를 사용하는 컴포넌트가 마운트 되었을 때,
// WindowFocus: 사용자가 이 탭에 다시 들어왔을 때,
// Reconnect: 인터넷 연결이 끊어졌다가 다시 연결 되었을 때,
// Interval: 특정 시간을 주기로

// **** refetch가 일어나는 상황이여도 일단은 캐시된 stale을 화면에 보여준 후, refetch가 완료 되면 화면을 교체해줌. ****

// 4. inactive
// 브라우저 화면상의 캐시데이터를 하나도 사용하지 않는 상황에서 발생.
// 많아서 좋을게 없음. 메모리 낭비로 이어지기 때문..
// gcTime 경과 후 deleted 상태로 전환되면서 삭제됨.

// 5. deleted
// inactive 상태가 된 캐시 데이터가 gcTime 경과한 후 deleted 됨.

// **** staleTime과 gcTime은 별개로 동작함.
// staleTime은 fresh 상태가 stale이 되는 시간에 해당하므로, inactive가 되는 상황과 관련이 없다.
// inactive는 말그대로 캐시 데이터가 사용되지 않는 상황에서 발생하므로, 이 때 gcTime을 체크하는 것.
