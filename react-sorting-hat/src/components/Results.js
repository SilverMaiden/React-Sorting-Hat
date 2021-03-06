import React, {useState, useRef, useEffect} from "react";
import { gsap, TimelineLite,TweenLite, CSSPlugin} from "gsap";
import {houses} from "../data";
import HousePage from "./HousePage";

const Results = (props) => {

    const [userHouse, setUserHouse] = useState([]);
    const [userHouseData, setUserHouseData] = useState([]);
    const timeline = new TimelineLite({ paused: true});
    const ref1 = useRef();

    console.log(props.userAnswers);

    useEffect(() => {
        timeline
          .add(TweenLite.from(ref1.current, 1, { opacity: 0 }))
          .play();
    }, []);



    useEffect(() => {
        let userAnswers = Object.values(props.userAnswers);
        let pointsList = {G: 0, R: 0, H:0, S: 0};
        let answersArr = houses.Gryffindor.answers.concat(
                            houses.RavenClaw.answers.concat(
                                houses.HufflePuff.answers.concat(
                                    houses.Slytherin.answers)));

        userAnswers.map(answer => {
            if (houses.RavenClaw.answers.includes(answer)){
                pointsList.R += 1;
            } else if (houses.Gryffindor.answers.includes(answer)){
                pointsList.G += 1;
            } else if (houses.HufflePuff.answers.includes(answer)){
                pointsList.H += 1;
            } else if (houses.Slytherin.answers.includes(answer)){
                pointsList.S += 1;
            } else {
                console.log("Something has gone wrong :(");
            }
        })

        let max_key = Object.keys(pointsList).reduce((a, b) => pointsList[a] > pointsList[b] ? a : b);
        console.log(pointsList);
        switch(max_key) {
            case "G":
                setUserHouse("Gryffindor");
                break;
            case "R":
                setUserHouse("RavenClaw");
                break;
            case "H":
                setUserHouse("HufflePuff");
                break;
            case "S":
                setUserHouse("Slytherin");
                break;
            default:
                console.log("Hmm, seems to have been an error.");
        }
        setUserHouseData(houses[userHouse]);
    }, [userHouse]);

    let userHouseStr = userHouse;
    return (
        <div ref={ref1} className="myBox">
            <h1> Here are your results!</h1>
            {userHouseData ? <HousePage house={userHouse} data={userHouseData} /> : ""}
        </div>
    )
}

export default Results;
