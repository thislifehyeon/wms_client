import React from 'react';
import footerstyle from '../css/footer.module.css'




function Footer() {
  return (
    <footer className={footerstyle}  style={{ height:'40px', backgroundColor: '#f2f2f2', color: 'black', textAlign: 'center',  fontSize :'20px'}}>
      <div style={{height: '100px', backgroundColor: '#f2f2f2'}}>
        <div>Engineer Info</div>
        <div href="https://github.com/thislifehyeon">
            Lee Seung Hyeon
        </div>
        <div>contact : 010.2037.4265  .....                          v.0323</div>
      </div>
    </footer>
  );
}

export default Footer;
