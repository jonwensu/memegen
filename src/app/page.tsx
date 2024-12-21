"use client";
import { useMemeCanvas } from "@/component/MemeCanvas/hooks/memeCanvas.hook";
import { MemeCanvas } from "@/component/MemeCanvas/MemeCanvas";

const Home = () => {
  const { addText } = useMemeCanvas();
  return (
    <div>
      <MemeCanvas />
    </div>
  );
};
export default Home;
