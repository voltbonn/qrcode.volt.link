import classes from './App.module.css'

import Localized from '../fluent/Localized.js'

function App() {
  return (<>
    <div className={classes.app}>
    </div>
    <footer>
      <a href="mailto:thomas.rosen@volteuropa.org"><Localized id="contact" /></a>
      &nbsp; • &nbsp;
      <a href="https://github.com/voltbonn/qrcode.volt.link" target="_blank" rel="noreferrer"><Localized id="source_code" /></a>
    </footer>
  </>)
}

export default App
