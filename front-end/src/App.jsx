import { useEffect, useState } from "react";
import { getCourses } from "./api/couseService";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [erorr, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        const data = await getCourses()
        setCourses(data);
        console.log(data)
      } catch (erorr) {
        console.error(erorr);
        setError(erorr);
      } finally {
        setLoading(false);
      }


    }
    fetch()
  }, [])
}

export default App;