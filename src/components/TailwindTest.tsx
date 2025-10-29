import type tailwindcss from "@tailwindcss/vite";

const TailwindTest = () => {
  return (
    <>
      {/* 타이포그래프 */}
      <div className="text-xs text-red-500">text-xs</div>
      <div className="text-sm text-[rgb(100,30,200)]">text-sm</div>
      <div className="text-lg font-bold">text-lg</div>
      <div className="text-xl font-extrabold">text-xl</div>
      <div className="text-2xl font-black">text-2xl</div>
      <div className="text-[13px]">text-13px</div>

      {/* 백그라운드 */}
      <div className="bg-amber-500">bg-amber-500</div>

      {/* 사이즈 */}
      {/* 설정한 정수 값의 간격값 (spacing 4px 를 곱한 값이 최종 너비값이 됨) */}
      <div className="w-20 bg-blue-500">box</div>
      <div className="w-[22px]">box-22px</div>
      <div className="w-full">box-full</div>

      <div className="h-20 w-full bg-blue-500">box2</div>

      {/* 여백 */}
      <div className="m-5 h-50 w-50 bg-red-400 px-5 py-5">
        <div className="h-full w-full bg-blue-400"></div>
      </div>

      {/* 경계선 */}
      <div className="m-5 rounded-md border-x-2 border-y-2 border-x-red-500 border-y-purple-500">
        border
      </div>

      {/* 플렉스 컨테이너 */}
      <div className="flex items-start justify-evenly">
        <div className="h-10 w-10 border">1</div>
        <div className="h-20 w-10 flex-1 border">2</div>
        <div className="h-30 w-10 border">3</div>
        <div className="h-40 w-10 border">4</div>
      </div>
    </>
  );
};

export default TailwindTest;
