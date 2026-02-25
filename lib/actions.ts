"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { v4 as uuid4 } from "uuid";
import { dateToISOString, dateISOAddDay } from "@/lib/date-time";

type CreateOrderActionPrevState = {
  error: string | null;
};

export async function createOrderAction(
  _: CreateOrderActionPrevState,
  formData: FormData,
) {
  const bookingTime = formData.get("bookingTime");
  const productCount = formData.get("productCount");
  const session = await auth();

  if (typeof bookingTime === "string" && productCount && session?.user?.id) {
    try {
      const order = await prisma.order.findFirst({
        where: {
          userId: session.user.id,
          bookingTime: {
            lt: dateISOAddDay(bookingTime, 1),
            gt: dateISOAddDay(bookingTime, -1),
          },
        },
      });

      if (order) {
        return { error: "Ты уже бронькал чак чак на это число! не наглей!" };
      }

      await prisma.order.create({
        data: {
          productCount: Number(productCount),
          orderID: uuid4(),
          userId: session?.user?.id,
          bookingTime: new Date(bookingTime),
        },
      });

      revalidatePath("/");

      return { error: null };
    } catch (e) {
      return { error: "Что то пошло не так" };
    }
  }

  return { error: "Некорректные данные" };
}
