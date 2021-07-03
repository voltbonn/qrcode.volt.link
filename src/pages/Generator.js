import React, { useState, useCallback } from 'react'
import classes from './Generator.module.css'

import { withLocalization, Localized } from '../fluent/Localized.js'
import MultiButton from '../components/MultiButton.js'

import QRCode from 'qrcode'

function trigger_download(name, data) {
  const a = document.createElement('a')
  document.body.appendChild(a)
  // a.target = '_blank'
  a.download = name
  a.href = data
  a.click()
  a.remove()
}

function Generator({ getString }) {
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('m')
  const [filetype, setFiletype] = useState('svg')
  const [qrcode, setQrcode] = useState(null)

  console.log('errorCorrectionLevel', errorCorrectionLevel)
  console.log('filetype', filetype)

  const handleContentChange = useCallback(event => {
    const value = event.target.value

    // // With promises
    // QRCode.toDataURL(value)
    //   .then(url => {
    //     console.log(url)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })

    if (filetype === 'svg') {
      QRCode.toString(value, {
        errorCorrectionLevel: errorCorrectionLevel,
        type: 'svg',
        scale: 1,
        margin: 1,
        color: {
          light: '#ffffff',
          dark: '#502379',
        }
      }, function (err, url) {
        if (err) {
          console.error(err)
          setQrcode(null)
        } else {
          setQrcode(url)
        }
      })
    } else {
      setQrcode(null)
    }
  }, [filetype, setQrcode, errorCorrectionLevel])

  const handleDownload = useCallback(() => {
    if (filetype === 'svg') {
      const b64 = 'data:image/svg+xml;base64,' + btoa(qrcode)
      trigger_download('volt-qrcode.svg', b64)
    } else {
      const b64 = 'data:image/png;base64,'
      trigger_download('volt-qrcode.png', b64)
    }
    // window.umami.trackEvent('F: ' + filetype)
  }, [
    filetype,
    qrcode
  ])

  return <div className={classes.qrcodeWrapper}>
    <h1><Localized id="website_title" /></h1>

    <textarea
      className={classes.qrcodeContentInput}
      placeholder={getString('text_content_input_placeholder')}
      onChange={handleContentChange}
    ></textarea>

    <h2>
      <Localized id="filetype_headline" />
    </h2>
    <MultiButton
      onChange={setFiletype}
      ariaLabel={getString('filetype_headline')}
      defaultValue={filetype}
      items={[
        {
          value: 'svg',
          title: 'SVG'
        },
        {
          value: 'png',
          title: 'PNG'
        },
      ]}
    />
    <br />
    <br />

    <h2>
      <Localized id="error_correction_level_headline" />
    </h2>
    <MultiButton
      onChange={setErrorCorrectionLevel}
      ariaLabel={getString('error_correction_level_headline')}
      defaultValue={errorCorrectionLevel}
      items={[
        {
          value: 'L', // low',
          title: 'Low ~7%'
        },
        {
          value: 'M', // edium',
          title: 'Medium ~15%'
        },
        {
          value: 'Q', // uartile',
          title: 'Quartile ~25%'
        },
        {
          value: 'H', // igh',
          title: 'High ~30%'
        },
      ]}
    />
    <br />
    <br />

    {
      qrcode === null
        ? null
        : <>
          {
            filetype === 'svg'
              ? <span className={classes.svgWrapper} dangerouslySetInnerHTML={{__html: qrcode}}></span>
              : <img src={qrcode} alt=""/>
          }
          <button onClick={handleDownload} className={'green ' + classes.downloadButton}>Download</button>
          </>
    }
  </div>
}

export default withLocalization(Generator)
