function Dot(props){

   var dotStyle = 
    {
        display: 'block',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: 'white',
    }

    return(
        <span style={dotStyle}></span>
    )
}

export default Dot;