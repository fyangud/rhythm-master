import Beat from "./beat"
import { sounds } from "../store/actions"


//Bar component
const Bar = ({barID, beats, playing, addBeat, deleteBeat, toggleBeat, addBar, deleteBar, changeSound, currentIndex}) => {
    const handleAddBeat = (barID, soundID) => {
        addBeat(barID, soundID);
    }

    const handleDeleteBeat = (barID)=> {
        deleteBeat(barID);
    }

    const handleToggleBeat = (barID, beatID) => {
        toggleBeat(barID, beatID);
    }

    const handleChangeSound = (soundID, direction) => {
        changeSound(soundID, direction);
    }

    const handleAddBar = (barID) => {
        addBar(barID);
    };

    const handleDeleteBar = (barID) => {
        deleteBar(barID);
    };

    return (
        <div className='barStripe'>
            <div className='typeSelect'>
                <button
                className='leftArrow'
                onClick={() => handleChangeSound(barID, beats[barID][0].soundID, "left")}
                ><h2>◂</h2></button>
                <div className='typeIcon'><h2>{sounds[beats[barID][0].soundID].name}</h2></div>
                <button className='rightArrow'
                onClick={() => handleChangeSound(barID, beats[barID][0].soundID, "right")}
                ><h2>▸</h2></button>
            </div>
            <div className='bar'>
                {beats[barID].map((beat, id)=>{
                    return (
                        <Beat 
                            key={id}
                            type={beat.soundID}
                            active={beat.active}
                            current = {id === currentIndex}
                            onClick={() => handleToggleBeat(barID, id)}
                        />
                    )
                })}
            </div>
            <div className="edit">
                <button className="addBeat" onClick={() => handleAddBeat(barID, beats[barID][0].soundID)} disabled={playing}>Add Beat</button>
                <button className="delBeat" onClick={() => handleDeleteBeat(barID)} disabled={playing}>Delete Beat</button>
                <button className="addBeat" onClick={() => handleAddBar(barID)} disabled={playing}>Add Bar</button>
                <button className="delBeat" onClick={() => handleDeleteBar(barID)} disabled={playing}>Delete Bar</button>
            </div>
        </div>
    )
};

export default Bar;