import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { Header } from './Header/Header';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { TileButton } from './UIElements/TileButton';
import { getEnumKeyByEnumValue } from '../utils/utilityCollection';
import { Button, Divider } from 'antd';

export enum EApiQueryType {
  People="people",
  Planets="planets",
  Species="species",
  Films="films",
  StarShips="starships",
  Vehicles="vehicles",
 };

export const Home =  ()=> {

    const [data, setData] = useState<RespExampleType|null>(null)
    const [apiEndPoint,setApiEndPoint]= useState<EApiQueryType|null>(null)
    const [removeData,setRemoveData]= useState(false)
    const keys = Object.keys(EApiQueryType)
    console.log(keys)

    async function getDataFromServer(apiEndPoint:EApiQueryType): Promise<void> {
        try {
            const res = await fetch(`https://swapi.py4e.com/api/${apiEndPoint}`,{ mode: 'cors',method:'GET' },);
        const data: RespExampleType  = await res.json();
        setData(data)
        setApiEndPoint(apiEndPoint)
        setRemoveData(false)
        } catch (error) {
            //could write a better error handler
            console.error("Api Error: Promise failed",error)
        }
      }

    useEffect(() => {
        /* This is added to have the long press functionality
          */
        window.oncontextmenu = (event: MouseEvent) => {
          if ((event as PointerEvent)?.pointerType === "mouse") {
            return false // context menu was triggered by right click
          }
        }
      }, [])
      
      const allPeopleOnPage = data?.results.map((people : any) => {
		console.log(people);

		return (
			<div className={classNames(styles.people,styles.card)}>
				<h2 key={people.name}>{people.name}</h2>
				<p>Gender: {people.gender}</p>
				<p>Birth Year: {people.birth_year}</p>
				<p>Height: {people.height}</p>
				<p>Hair Color: {people.hair_color}</p>
				<p>Skin Color: {people.skin_color}</p>
				<p>Eye Color: {people.eye_color}</p>
				<br />
			</div>
		)
	})

  const allPlanetsOnPage = data?.results.map((planet : any) => {
		console.log(planet);

		return (
      <div className={classNames(styles.people,styles.card)}>
				<h2 key={planet.name}>{planet.name}</h2>
				<p>Climate: {planet.climate}</p>
				<p>Terrain: {planet.terrain}</p>
				<p>Population: {planet.population}</p>
				<br />
			</div>
		);
	});

  const allStarshipsOnPage = data?.results.map((Starship : any) => {
		console.log(Starship);

		return (
			<div className={classNames(styles.people,styles.card)}>
				<h2 key={Starship.name}>{Starship.name}</h2>
				<p>Manufacturer: {Starship.manufacturer}</p>
				<p>Cost in credits: {Starship.cost_in_credits}</p>
				<p>Length: {Starship.length}</p>
				<p>Max atmosphering speed: {Starship.max_atmosphering_speed}</p>
				<p>Crew: {Starship.crew}</p>
				<p>Passengers: {Starship.passengers}</p>
				<p>Cargo capacity: {Starship.cargo_capacity}</p>
				<br />
			</div>
		);
	});
  const allVehiclessOnPage = data?.results.map((Vehicles : any) => {
		console.log(Vehicles);

		return (
			<div className={classNames(styles.people,styles.card)}>
				<h2 key={Vehicles.name}>{Vehicles.name}</h2>
				<p>Model: {Vehicles.model}</p>
				<p>Cost in credits: {Vehicles.cost_in_credits}</p>
				<p>Length: {Vehicles.length}</p>
				<p>Max atmosphering speed: {Vehicles.max_atmosphering_speed}</p>
				<p>Crew: {Vehicles.crew}</p>
				<p>Passengers: {Vehicles.passengers}</p>
				<p>Cargo capacity: {Vehicles.cargo_capacity}</p>
				<br />
			</div>
		);
	});
  const allSpeciesOnPage = data?.results.map((Species : any) => {
		console.log(Species);

		return (
			<div className={classNames(styles.people,styles.card)}>
				<h2 key={Species.name}>{Species.name}</h2>
				<p>Average Height: {Species.average_height}</p>
				<p>Average Lifespan: {Species.average_lifespan}</p>
				<p>Language: {Species.language}</p>
				<p>Skin Colors: {Species.skin_colors}</p>
			
				<br />
			</div>
		);
	});
  const allFilmsOnPage = data?.results.map((Films : any) => {
		console.log(Films);

		return (
			<div className={classNames(styles.people,styles.card)}>
				<h2 key={Films.title}>{Films.title}</h2>
				<p>Director: {Films.director}</p>
				<p>Producer: {Films.producer}</p>
				<p>Release Date: {Films.release_date}</p>
			
				<br />
			</div>
		);
	});

  const getResults =()=>{
    if(apiEndPoint==EApiQueryType.StarShips)
      return allStarshipsOnPage
    if(apiEndPoint==EApiQueryType.People)
      return allPeopleOnPage
    if(apiEndPoint==EApiQueryType.Planets)
      return allPlanetsOnPage
    if(apiEndPoint==EApiQueryType.Films)
      return allFilmsOnPage
    if(apiEndPoint==EApiQueryType.Species)
      return allSpeciesOnPage
    if(apiEndPoint==EApiQueryType.Vehicles)
      return allVehiclessOnPage
  }

    return (
        <div className={styles.container}>
        <Header labelText='Star Wars'></Header>
        <Divider/>
        <div className={styles.content}>
        {Object.values(EApiQueryType).map((val)=>  (<TileButton isSelected={apiEndPoint==val} key={uuidv4()} name={getEnumKeyByEnumValue(EApiQueryType,val)} onClick={()=>{
          getDataFromServer(val)
         
        }}></TileButton>))}
        </div>

        {data&&!removeData&&<div className={styles.gridContainer}>{
           getResults()
          }</div>}
<Divider/>
            <Button disabled={removeData} onClick={()=>setRemoveData(true)}>Clear Data</Button>
        
        <Header kindOfElement='footer' labelText='@2024 Rahul Ranjan'></Header>
    </div>
    )
  }

