import { ICourse } from "@/types";
import React from "react";
import CartBtn from "../CartBtn";

export default function CourseItem({
  data: { _id, title, author, price, newPrice, cover, language },
}: {
  data: ICourse;
}) {
  return (
    <div className="card">
      <figure>
        <img width={384} height={216} src={cover} alt="Watch" />
      </figure>
      <div className="card-body p-4">
        <h5 className="card-title font-normal text-primary mb-2">{title}</h5>
        <p className="mb-2"> {author}</p>

        <p className="mb-2">{language}</p>
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col mb-2">
            {newPrice ? (
              <>
                <p className="line-through ">
                  {price.toLocaleString("EU", {
                    maximumFractionDigits: 0,
                    style: "currency",
                    currency: "UZS",
                  })}
                </p>
                <p className="text-success font-semibold text-lg">
                  {newPrice.toLocaleString("EU", {
                    style: "currency",
                    currency: "UZS",
                    maximumFractionDigits: 0,
                  })}
                </p>
              </>
            ) : (
              <p>
                {price.toLocaleString("EU", {
                  maximumFractionDigits: 0,
                  style: "currency",
                  currency: "UZS",
                })}
              </p>
            )}
          </div>

          <CartBtn id={_id as string} />
        </div>
      </div>
    </div>
  );
}
