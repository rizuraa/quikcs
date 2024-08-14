import PopQuicks from "@/components/shared/PopQuicks";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="fixed bottom-4 right-4">
        <div className="flex space-x-4 items-center">
          <div className="flex space-x-2">
            <PopQuicks />
          </div>
        </div>
      </div>
    </main>
  );
}
