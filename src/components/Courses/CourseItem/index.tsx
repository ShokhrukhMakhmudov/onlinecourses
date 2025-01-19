import { ICourse } from "@/types";
import React from "react";
import CartBtn from "../CartBtn";

export default function CourseItem({
  data: { _id, title, author, price, newPrice, cover, language, duration },
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

        <div className="flex items-center justify-between">
          <p className="mb-2 flex items-center gap-1 " title="Kurs tili">
            <svg
              className="text-primary"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill="none"
                strokeWidth="2"
                d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,23 C15,23 16,18 16,12 C16,6 15,1 12,1 C9,1 8,6 8,12 C8,18 9,23 12,23 Z M2,16 L22,16 M2,8 L22,8"></path>
            </svg>
            {/* <svg
              className="text-primary"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m478.33 433.6-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362 368 281.65 401.17 362zm-66.99-19.08a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73 39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93.92 1.19 1.83 2.35 2.74 3.51-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59 22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z"></path>
            </svg> */}
            {language}
          </p>
          <p className="mb-2 flex items-center gap-1 " title="Kurs davomiyligi">
            <svg
              className="text-primary"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg">
              <g fillOpacity=".9">
                <path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path>
                <path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path>
              </g>
            </svg>{" "}
            ~{duration} soat
          </p>
        </div>
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
