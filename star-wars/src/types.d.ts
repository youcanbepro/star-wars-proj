type RespExampleType = {
    count:number
    results:[]
    previous:""
    next:""
  };

  type ApiQueryType = {
    value: "people"|"planets"|"species"|"films"|"starships"|"vehicles";
  };