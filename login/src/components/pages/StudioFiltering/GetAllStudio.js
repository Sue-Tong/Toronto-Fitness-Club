export function getAllStudios() {
    const STUDIOS_URL = `${API_URL}studio/`;
    const [studios,setStudios] = useState([]);
    axios.get(STUDIOS_URL)
  
      .then((res) => {
        setStudios(res.data);
        
      })
      .catch((error) => {
        
    });
    return studios.map(studio => ({
        studio
    }))

}