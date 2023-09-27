import React, {useState} from 'react'
import '../App.css';
export default function Multiplayer({setMenuDisplay,setPlayerNumber, PlayerNames}) {

    const [name1,setName1] = useState("");
    const [name2,setName2] = useState("");
    const [name3,setName3] = useState("");
  
    const toggleSubmit =()=>{
        if(name1==="" && name2==="" && name3==="")
        {
            alert("Add at least 2 player")
        }
        let count=0;
        if(name1 !== "")
        {
            PlayerNames.current.push(name1);
            count++;
        }
        if(name2 !=="")
        {
            
            PlayerNames.current.push(name2);
            count++;
        }
        if(name3 !== "")
        {
            PlayerNames.current.push(name3);
            count++;
        }
        if(count <=1)
        return;
    
        setPlayerNumber(count);
        setMenuDisplay(false);
    }
    return (
        <div className='multyplayer-menu'>
            <table className="table table-dark table-borderless">
                <thead>
                    <tr>

                        <th scope="row">Color</th>
                        <th scope="row">Enter Player Name</th>
                    </tr>
                </thead>
               
                <tbody>


                    <span className="colorBox " style={{background:"red"}}> </span>

                    <th scope="row"><div className="input-group mb-3">
                        <div className="input-group-text">
                        </div>
                        <input type="text" className="form-control" 
                        value={name1}
                        onInput={(e)=>setName1(e.target.value)}
                        />
                            
                    </div></th>
        
                </tbody>
                <thead>


                    <div className="colorBox" style={{background:"Green"}}> </div>

                    <th scope="row"><div className="input-group mb-3">
                        <div className="input-group-text">
                        </div>
                        <input type="text" 
                        value={name2}
                        className="form-control" onInput={(e)=>setName2(e.target.value)}/>
                            
                    </div></th>
        
                </thead>
                <thead>


                    <div className="colorBox" style={{background:"Blue"}}> </div>

                    <th scope="row"><div className="input-group mb-3">
                        <div className="input-group-text">
                        </div>
                        <input type="text" 
                        value={name3} className="form-control" onInput={(e)=>setName3(e.target.value)}/>
                            
                    </div></th>
        
                </thead>
            </table>
            <button type="button" className="btn btn-primary btn-lg " style={{background:"red"}} onClick={toggleSubmit}>Large button</button>
        </div>
    )
}
