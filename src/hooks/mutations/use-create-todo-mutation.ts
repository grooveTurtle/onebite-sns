import { createTodo } from "@/api/create-todo";
import { useMutation } from "@tanstack/react-query";

export default function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {}, // 요청이 발송되었을 때
    onSettled: () => {}, // 요청이 종료되었을 때
    onSuccess: () => {
      // 요청이 성공헀을때
      window.location.reload();
    },
    onError: (error) => {
      // 요청이 실패했을때
      window.alert(error.message);
    },
  });
}
