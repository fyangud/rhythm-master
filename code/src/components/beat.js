import React from "react";

const beatColors = ["#EC7063", "#EB984E", "#F4D03F", "#82E0AA", "#85C1E9"]

const Beat = ({ type, active, current, onClick }) => {

  const beatStyle = (active) => {
    let color = 'grey';
    if(active){
      color = beatColors[type];
    }
    let stroke = '0 0 0 0px grey';
    if(current){
      if(active){
        stroke = '0 0 0 5px ' + beatColors[type];
      }else{
        stroke = '0 0 0 5px grey';
      }
    }

    return {
      backgroundColor: color,
      width: '20px',
      height: '20px',
      borderRadius: '10px',
      margin: '10px',
      boxShadow: stroke,
    };
  };

  return (
    <div 
      className={
        active? 
          current? "beat active current":"beat active"
          :
          current? "beat current":"beat"
      } 
      onClick={onClick}
      style={beatStyle(active, current)}
    >
    </div>
  );
};

export default Beat;