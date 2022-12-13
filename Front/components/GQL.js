import { useQuery } from "@apollo/client";
import {GET_DATA} from "../graphql/queries";


  
  const GQL = () => {



    const { loading, data, error } = useQuery(GET_DATA);

    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3>Something went wrong...</h3>;
  

    return (
        <div>
      
        {data.dummies.map((dummy) => (
          <div key={dummy.id}>
            <p>{dummy.id}</p>
            <h1>{dummy.dummy}</h1>

  
          </div>
        ))}




</div>
    );
  };
  
  export default GQL;