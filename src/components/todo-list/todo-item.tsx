import { Button } from "../ui/button";
import { Link } from "react-router";

export default function TodoItem({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const handleDeleteClick = () => {
    console.log("delete");
  };
  return (
    <div className="flex items-center justify-between border p-2">
      <Link to={`/todolist/${id}`}>{content}</Link>
      <Button onClick={handleDeleteClick} variant={"destructive"}>
        삭제
      </Button>
    </div>
  );
}
