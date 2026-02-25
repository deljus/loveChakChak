import Image from "next/image";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { ChakChakForm } from "@/copmonents/form";
import { OrderUsers } from "@/copmonents/order-users";

export default function Home() {
  return (
    <SessionProvider>
      <div className="container mx-auto p-2 lg:p-10">
        <div className="prose lg:prose-xl mx-auto glass shadow-xl">
          <div className="not-prose relative w-full h-[400px] overflow-hidden">
            <Image
              src="/chakchakgod.jpg"
              alt="chak chak"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="p-2 lg:p-10">
            <p className="text-center text-xl font-semibold">
              ЧАК ЧАК САМ СЕБЯ НЕ СЬЕСТ!!&nbsp;
              <span className="text-rotate">
                <span>
                  <span className="text-accent">УСПЕЙ И ТЫ!</span>
                  <span className="text-primary"> УДОБНО В ОДИН КЛИК!</span>
                  <span className="text-secondary">БУДЬ СОБОЙ!</span>
                </span>
              </span>
            </p>

            <h2>Форма бронирования</h2>

            <Suspense fallback={<>...Загружаем</>}>
              <ChakChakForm />
            </Suspense>

            <h2>Счастливчики которые получат свой чак чак сегодня!</h2>

            <OrderUsers />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
