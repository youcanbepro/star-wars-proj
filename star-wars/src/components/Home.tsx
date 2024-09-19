import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Header } from "./Header/Header";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { TileButton } from "./UIElements/TileButton";
import { getEnumKeyByEnumValue } from "../utils/utilityCollection";
import { Button, Divider } from "antd";

export enum EApiQueryType {
  People = "people",
  Planets = "planets",
  Species = "species",
  Films = "films",
  StarShips = "starships",
  Vehicles = "vehicles",
}

export const Home = () => {
  const [data, setData] = useState<RespExampleType | null>(null);
  const [apiEndPoint, setApiEndPoint] = useState<EApiQueryType | null>(null);
  const [removeData, setRemoveData] = useState<boolean | null>(null);
  const keys = Object.keys(EApiQueryType);
  console.log(keys);

  async function getDataFromServer(apiEndPoint: EApiQueryType): Promise<void> {
    try {
      const res = await fetch(`https://swapi.py4e.com/api/${apiEndPoint}`, {
        mode: "cors",
        method: "GET",
      });
      const data: RespExampleType = await res.json();
      setData(data);
      setApiEndPoint(apiEndPoint);
      setRemoveData(false);
    } catch (error) {
      //could write a better error handler
      console.error("Api Error: Promise failed", error);
    }
  }

  useEffect(() => {
    /* This is added to have the long press functionality
     */
    window.oncontextmenu = (event: MouseEvent) => {
      if ((event as PointerEvent)?.pointerType === "mouse") {
        return false; // context menu was triggered by right click
      }
    };
  }, []);

  const allResultsOnPage = data?.results.map((result: ResultType) => {
    console.log(result);

    return (
      <div className={classNames(styles.people, styles.card)}>
        <h2 key={result.name || uuidv4()}>{result?.name}</h2>
        {result.title && <h2 key={result.title}>{result.title}</h2>}
        {result.gender && <p>Gender: {result.gender}</p>}
        {result.birth_year && <p>Birth Year: {result.birth_year}</p>}
        {result.height && <p>Height: {result.height}</p>}
        {result.hair_color && <p>Hair Color: {result.hair_color}</p>}
        {result.skin_color && <p>Skin Color: {result.skin_color}</p>}
        {result.eye_color && <p>Eye Color: {result.eye_color}</p>}
        {result.climate && <p>Climate: {result.climate}</p>}
        {result.terrain && <p>Terrain: {result.terrain}</p>}
        {result.population && <p>Population: {result.population}</p>}
        {result.manufacturer && <p>Manufacturer: {result.manufacturer}</p>}
        {result.cost_in_credits && <p>Cost in credits: {result.cost_in_credits}</p>}
        {result.length && <p>Length: {result.length}</p>}
        {result.max_atmosphering_speed && (
          <p>Max atmosphering speed: {result.max_atmosphering_speed}</p>
        )}
        {result.crew && <p>Crew: {result.crew}</p>}
        {result.passengers && <p>Passengers: {result.passengers}</p>}
        {result.cargo_capacity && <p>Cargo capacity: {result.cargo_capacity}</p>}
        {result.average_height && <p>Average Height: {result.average_height}</p>}
        {result.average_lifespan && <p>Average Lifespan: {result.average_lifespan}</p>}
        {result.language && <p>Language: {result.language}</p>}
        {result.skin_colors && <p>Skin Colors: {result.skin_colors}</p>}
        {result.director && <p>Director: {result.director}</p>}
        {result.producer && <p>Producer: {result.producer}</p>}
        {result.release_date && <p>Release Date: {result.release_date}</p>}
        <br />
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <Header labelText="Star Wars"></Header>
      <Divider />
      <div className={styles.content}>
        {Object.values(EApiQueryType).map((val) => (
          <TileButton
            isSelected={apiEndPoint == val}
            key={uuidv4()}
            name={getEnumKeyByEnumValue(EApiQueryType, val)}
            onClick={() => {
              getDataFromServer(val);
            }}
          ></TileButton>
        ))}
      </div>

      {data && !removeData && <div className={styles.gridContainer}>{allResultsOnPage}</div>}
      <Divider />
      <Button
        disabled={removeData == null || removeData == true}
        onClick={() => setRemoveData(true)}
      >
        Clear Data
      </Button>
      <Header kindOfElement="footer" labelText="@2024 Rahul Ranjan"></Header>
    </div>
  );
};
