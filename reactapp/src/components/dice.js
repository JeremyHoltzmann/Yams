import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons';

function Dice(props){

    const diceFace = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix]
    const [launch, setLaunch] = useState(0);

    function click(){
        props.handleDice(props.index);
        setLaunch(launch + 1);
    }
    var border = '';
    (props.isLocked) ? border =  'border border-primary' : border = '';

    return(
            <div className='text-center'>
                <FontAwesomeIcon color='Red' className={border}  size='10x' icon={diceFace[props.faceValue - 1]} onClick={() => click()}></FontAwesomeIcon>
                <p>{props.launchCounter}</p>
            </div>

    );
}

export default Dice;