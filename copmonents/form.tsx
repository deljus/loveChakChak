"use client";
import { useState, useActionState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useSession } from "next-auth/react";
import { ru } from "react-day-picker/locale";
import Link from "next/link";
import { createOrderAction } from "@/lib/actions";
import { dateToISOString, dateISOAddDay } from "@/lib/date-time";

const initialState = {
  error: null,
  success: false,
};

export function ChakChakForm() {
  const [selectedDate, setDate] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();
  const session = useSession();
  const [state, foemAction, isPending] = useActionState(
    createOrderAction,
    initialState,
  );

  return (
    <form
      className="flex flex-col space-y-4 justify-center items-center"
      action={foemAction}
    >
      <div className="flex justify-center border-base-300 w-full border py-10 rounded-sm not-prose bg-base-100/40">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setDate}
          locale={ru}
          disabled={{
            before: new Date(),
            after: dateISOAddDay(new Date().toString(), 14),
          }}
          classNames={{
            today: `border-2 !rounded-md border-secondary`,
            selected: `bg-secondary text-white rounded-md`,
            disabled: `${defaultClassNames.disabled} cursor-not-allowed`,
            root: `${defaultClassNames.root} p-2`,
            chevron: `${defaultClassNames.chevron} !fill-secondary text-secondary`,
          }}
        />
        <input
          name="bookingTime"
          type="hidden"
          value={dateToISOString(selectedDate || new Date())}
        />
      </div>

      <select
        defaultValue="1"
        className="select select-xl w-full"
        name="productCount"
      >
        <option value={1}>1 чак чак!</option>
        <option value={2}>2 чак чака!!</option>
        <option value={3}>3 чак чака!!!</option>
      </select>
      {session?.data ? (
        <button
          className="btn btn-xl btn-secondary w-full"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Загрузка..." : "Забронировать!"}
        </button>
      ) : (
        <Link
          className="btn btn-xl btn-secondary w-full"
          href="/api/auth/signin"
        >
          Войти и забронировать!
        </Link>
      )}
      {state.error && (
        <div role="alert" className="alert alert-error w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.error}</span>
        </div>
      )}
    </form>
  );
}
