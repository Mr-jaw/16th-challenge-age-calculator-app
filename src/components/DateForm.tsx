import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ArrowIcon from "../assets/images/icon-arrow.svg";
import valDate from "../services/dateValidation";
import useAgeStore from "../store";

const currentYear = new Date().getFullYear();
const currentDate = new Date().getTime();

const schema = z.object({
  day: z
    .number({ invalid_type_error: "Field cannot be empty" })
    .min(1, { message: "Must be a valid day" })
    .max(31, { message: "Must be a valid day" }),
  month: z
    .number({ invalid_type_error: "Field cannot be empty" })
    .min(1, { message: "Must be a valid month" })
    .max(12, { message: "Must be a valid month" }),
  year: z
    .number({ invalid_type_error: "Field cannot be empty" })
    .min(1, { message: "Must be a valid year" })
    .max(currentYear, { message: "year should be past" }),
});

const DateForm = () => {
  const [error, setError] = useState("");
  const { setDay, setMonth, setYear } = useAgeStore();

  type FormData = z.infer<typeof schema>;
  const dateValidation = (date: FormData) => {
    const datestring = `${date.month}/${date.day}/${date.year}`;
    const diff = currentDate - new Date(datestring).getTime();
    console.log(valDate(`${date.day}/${date.month}/${date.year}`));
    if (!valDate(`${date.day}/${date.month}/${date.year}`)) {
      setError("Must be a valid date");
      return;
    } else if (diff < 0) {
      setError("Date should be in past");
      return;
    } else {
      setDay(date.day);
      setMonth(date.month);
      setYear(date.year);
      setError("");
      reset();
      return;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form>
      <div className="input-wrapper">
        <div className="input-container">
          <label
            className={
              errors.day || error ? "input-label error" : "input-label"
            }
            htmlFor="date"
          >
            DAY
          </label>
          <input
            className={errors.day || error ? "input error" : "input"}
            type="number"
            {...register("day", { required: true, valueAsNumber: true })}
            aria-label="Date"
            placeholder="DD"
            onKeyUp={(event) => {
              if (!(event.target as HTMLInputElement).value) setError("");
            }}
          />
          {(error && (
            <em className="error-message" aria-live="assertive">
              {error}
            </em>
          )) ||
            (errors.day && (
              <em className="error-message" aria-live="assertive">
                {errors.day.message}
              </em>
            ))}
        </div>
        <div className="input-container">
          <label
            className={
              errors.month || error ? "input-label error" : "input-label"
            }
            htmlFor="month"
          >
            MONTH
          </label>
          <input
            className={errors.month || error ? "input error" : "input"}
            type="number"
            {...register("month", { required: true, valueAsNumber: true })}
            aria-label="Month"
            placeholder="MM"
          />
          {errors.month && (
            <em className="error-message" aria-live="assertive">
              {errors.month.message}
            </em>
          )}
        </div>
        <div className="input-container">
          <label
            className={
              errors.year || error ? "input-label error" : "input-label"
            }
            htmlFor="year"
          >
            YEAR
          </label>
          <input
            className={errors.year || error ? "input error" : "input"}
            type="number"
            {...register("year", { required: true, valueAsNumber: true })}
            aria-label="Year"
            placeholder="YYYY"
          />
          {errors.year && (
            <em className="error-message" aria-live="assertive">
              {errors.year.message}
            </em>
          )}
        </div>
      </div>
      <div className="seperator-container">
        <div className="seperator-line" />
        <button
          onClick={handleSubmit((data) => {
            dateValidation(data);
          })}
          className="arrow-icon-container"
        >
          <img src={ArrowIcon} className="arrow-icon" />
        </button>
      </div>
    </form>
  );
};

export default DateForm;
