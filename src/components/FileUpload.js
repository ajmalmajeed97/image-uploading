import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';


const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadText,setUploadText]=useState('')
  const [font,setfont]=useState('')

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    
   
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

        
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

let p
 const texted=e=>{
   p=e 
   setfont(p)
   console.log(font)
 }
 const itallic=e=>{
  if(e===1)
setUploadText(<i>{font}</i>)

}
const underline=e=>{
if(e===1)
setUploadText(<u>{font}</u>)
}
const bold=e=>{
if(e===1)
setUploadText(<b>{font}</b>)
}

function refreshPage() {
  window.location.reload(false);
}
  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='POST'
          className='btn btn-primary btn-block mt-4' 
        />
        <br></br>
        <br></br>
        <div>
      <button onClick={refreshPage} style={{color:'white',marginLeft:'900px',backgroundColor:'blue'}}>Click to Upload Again!</button>
    </div>
        <br></br>
        <br></br>
        <textarea className="md-textarea form-control" name="paragraph_text" cols="70" rows="10" style={{border:"none"}} placeholder="Start Typing here..." onChange={(e)=>texted(e.target.value)}></textarea>
        <br></br>
        <div className="gg"style={{marginLeft:'400px'}}>
        <button type="button" style={{backgroundColor:'blue'}} onClick={() => itallic(1)}>Itallic</button>
        <button type="button" style={{backgroundColor:'blue'}} onClick={() => bold(1)}>Bold</button>
        <button  type="button" style={{backgroundColor:'blue'}} onClick={() => underline(1)}>Underlined</button>
        </div>
      </form>
      {uploadedFile ? (
        
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <div className="container" style={{position:'relative'}}>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
            <div className="textBlock"style={{
               position: 'absolute', 
               top: '0', 
               background: 'rgba(0, 0, 0, 0)', 
               width: '100%',
               padding: '20px' 
            }}>
            {uploadText}
            </div>

          </div>
          
        </div>
       </div>
      ) : null}
      
    </Fragment>
  );
};

export default FileUpload;
