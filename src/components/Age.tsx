import { AgeInterface } from "../entities/Age";
import calculateAge from "../services/AgeCalculator";
import useAgeStore from "../store";

const Age = () => {
  const { day, month, year } = useAgeStore();
  const birthday: string = `${year}-${month}-${day}`;
  const age: AgeInterface = calculateAge(birthday);

  return (
    <div className="age-container">
      <div className="age-display">
        <strong className="age-data">
          <span className="age-data-numeric">{year ? age.years : "- -"}</span>{" "}
          years
        </strong>
      </div>
      <div className="age-display">
        <strong className="age-data">
          <span className="age-data-numeric">{month ? age.months : "- -"}</span>{" "}
          months
        </strong>
      </div>
      <div className="age-display">
        <strong className="age-data">
          <span className="age-data-numeric">{day ? age.days : "- -"}</span>{" "}
          days
        </strong>
      </div>
    </div>
  );
};

export default Age;
