import Arrow from "../../assets/icons/Arrow";
import Equal from "../../assets/icons/Equal";

const FactLabel = (props) => {
  const { factType, value, type } = props;

  const factTypes = {
    "Energía (kCal)": false,
    "Proteínas (g)": true,
    "Grasas Totales (g)": false,
    "Grasas Saturadas (g)": false,
    "Grasas Monoinsaturadas (g)": false,
    "Grasas Poliinsaturadas (g)": false,
    "Grasas trans (g)": false,
    "Colesterol (mg)": false,
    "Hidratos de Carbono disponibles (g)": false,
    "Azúcares totales (g)": false,
    "Sodio (mg)": false,
  };

  const getTextColor = () => {
    if (type === "high") {
      if (factTypes[factType]) {
        return "text-green-principal";
      } else {
        return "text-red-alert";
      }
    } else if (type === "low") {
      if (factTypes[factType]) {
        return "text-red-alert";
      } else {
        return "text-green-principal";
      }
    } else {
      return "text-gray";
    }
  };
  const getColor = () => {
    if (type === "high") {
      if (factTypes[factType]) {
        return "bg-light-green";
      } else {
        return "bg-baby-pink";
      }
    } else if (type === "low") {
      if (factTypes[factType]) {
        return "bg-baby-pink";
      } else {
        return "bg-light-green";
      }
    } else {
      return "bg-light-gray";
    }
  };

  const getBorderColor = () => {
    if (type === "high") {
      if (factTypes[factType]) {
        return "border-green-principal";
      } else {
        return "border-red-alert";
      }
    } else if (type === "low") {
      if (factTypes[factType]) {
        return "border-red-alert";
      } else {
        return "border-green-principal";
      }
    } else {
      return "border-gray";
    }
  };
  return (
    <div
      className={`flex items-center justify-center gap-2 ${getColor()} border-1 ${getBorderColor()} rounded mx-2`}
    >
      <span className={``}>{value}</span>
      {type === "default" ? (
        <Equal
          styles={`w-4 h-4 ${type === "high" ? "" : "transform rotate-180"} ${getTextColor()}`}
        />
      ) : (
        <Arrow
          styles={`w-4 h-4 ${type === "high" ? "" : "transform rotate-180"} ${getTextColor()}`}
        />
      )}
    </div>
  );
};

export default FactLabel;
