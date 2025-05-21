import dynamic from "next/dynamic";
const SnakeCanvas = dynamic(() => import('@/components/SnakeCanvas/SnakeCanvas'));

export default function Home() {
  return (
    <SnakeCanvas />
  );
}
