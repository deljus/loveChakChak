"use server";
import NextImage from 'next/image'
import { prisma } from "@/prisma";
import { dateISOAddDay, dateToISOString } from "@/lib/date-time";

export async function OrderUsers() {
  const currentDay = dateToISOString(new Date());

  const ordersForCurrentDay = await prisma.order.findMany({
    where: {
      bookingTime: {
        lt: dateISOAddDay(currentDay, 1),
        gt: dateISOAddDay(currentDay, -1),
      },
    },
    include: {
      user: true,
    },
  });

  if (!ordersForCurrentDay.length) {
    return (
      <div className="hero bg-base-200 h-[200px] relative ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="py-6">На сегодня нет осчестливленных людей</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="not-prose list bg-base-100 rounded-box border border-base-300">
      {ordersForCurrentDay.map(({ orderID, user, productCount }) => (
        <li key={orderID} className="list-row">
          <div>
            <NextImage
              alt={`image ${user.name}`}
              className="size-10 rounded-box"
              src={user.image || ""}
              width={100}
              height={100}
            />
          </div>
          <div>
            <div>{user.name}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              + {productCount} чак чак
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
