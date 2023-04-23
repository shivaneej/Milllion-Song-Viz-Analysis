import React from 'react';
import VirtualizedAutocomplete from "./VirtualizedAutocomplete";
import{useEffect} from 'react';
import Container from '@mui/material/Container';
import Chart from './Chart.jsx';
import * as d3 from 'd3'
import sentiment from './data/updated_sentiment_over_time_tfidf.csv';
import Navbar from '../Navbar';

export default function DashboardSenti() {

  const [data,setData] = React.useState([])
  const [selectedArtist, setSelectedArtist] = React.useState("Akon");
const [artist, setArtist] = React.useState([]);
// const [tempA, setTempA] = React.useState(selectedArtist);


  useEffect(() => { 

    d3.select("#tooltip").remove()

    Promise.all([
          d3.dsv(",", sentiment, function (edge) {
              return {
                  year : parseInt(edge.year),
                  artist_id : edge.artist_id,
                  artist_name : edge.artist_name,
                  positive: parseInt(edge.positive),
                  negative: parseInt(edge.negative),
                  neutral : parseInt(edge.neutral)
              };
          })

        ]).then(allData => {

          setData(allData[0])

          setArtist([...new Set(allData[0].map(item =>  item.artist_name))])

        }).catch(error => {
          console.log(error)
        });

  }, [])

  return (
    <div>
      <Navbar val={3} />
      <Container style={{marginTop:"2%",marginLeft:"15%", width:"85%"}}>
        <h2 align="center">Sentiment Analysis</h2>
        <br></br>
        <VirtualizedAutocomplete onSelectedArtist = {setSelectedArtist} artist = {artist} />
        <br></br> <br></br>

        <Chart data = {data.filter(item => item.artist_name === selectedArtist)}/>

    </Container>


    </div>
  )
}
