import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; 
import './forecast.css';
const Forecast = ({ data }) => {

    const dayInaWeek = new Date().getDay(); 
    const forecastDays =  WEEK_DAYS.slice(dayInaWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInaWeek)); 
    console.log(forecastDays)
    return (
        <div>
            <label htmlFor="" className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.slice(0, 7).map((item, idx) => (

                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img src={`icons/${item.weather[0].icon}.png`} alt="weather"  className="icon-small"/>
                                    <label htmlFor="" className="day">{forecastDays[idx]}</label>
                                    <label htmlFor="" className="description">{item.weather[0].description}</label>
                                    <label htmlFor="" className="min-max">{Math.round(item.main.temp_min)} ℃ / {Math.round(item.main.temp_max)} ℃</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>

                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label htmlFor="">Pressure</label>
                                    <label htmlFor="">{item.main.pressure} hPa</label>
                                </div>

                                 <div className="daily-details-grid-item">
                                    <label htmlFor="">Humidity</label>
                                    <label htmlFor="">{item.main.humidity} %</label>
                                </div>

                                 <div className="daily-details-grid-item">
                                    <label htmlFor="">Clouds</label>
                                    <label htmlFor="">{item.clouds.all} %</label>
                                </div>

                                 <div className="daily-details-grid-item">
                                    <label htmlFor="">Wind speed</label>
                                    <label htmlFor="">{item.wind.speed} m/s</label>
                                </div>

                                 <div className="daily-details-grid-item">
                                    <label htmlFor="">Sea level</label>
                                    <label htmlFor="">{item.main.sea_level} m</label>
                                </div>

                                 <div className="daily-details-grid-item">
                                    <label htmlFor="">Feels Like</label>
                                    <label htmlFor="">{Math.round(item.main.feels_like)} ℃</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>

                ))}

            </Accordion>
        </div>
    );
}

export default Forecast; 