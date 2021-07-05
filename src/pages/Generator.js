import React, { useState, useCallback, useEffect } from 'react'
import classes from './Generator.module.css'

import { withLocalization, Localized } from '../fluent/Localized.js'
import MultiButton from '../components/MultiButton.js'

import QRCodeStyling from 'qr-code-styling'

const size = 1000

const qrCode = new QRCodeStyling({
  experimental: false,
  width: size,
  height: size,
  type: 'svg',
  image: '', // 'http://localhost:3000/volt-logo-white-192.png', // 'https://volt.link/volt-logo-white-192.png',
  dotsOptions: {
    color: '#502379',
    type: 'square'
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  margin: 50,
  qrOptions: {
    errorCorrectionLevel: 'M',
  },
})

console.log('qrCode', qrCode)

// function trigger_download(name, data) {
//   const a = document.createElement('a')
//   document.body.appendChild(a)
//   // a.target = '_blank'
//   a.download = name
//   a.href = data
//   a.click()
//   a.remove()
// }

// function getQrcodeBounds(svgText){
//   const matches = [...svgText.matchAll(/<rect x="([0-9]+)" y="([0-9]+)" width="([0-9]+)"/gm)]

//   const dot_size = Math.min(...matches.map(match => match[3]))

//   const x_all = matches.map(match => match[1])
//   const x_min = Math.min(...x_all)
//   const x_max = Math.max(...x_all) + dot_size - x_min

//   const y_all = matches.map(match => match[2])
//   const y_min = Math.min(...y_all)
//   const y_max = Math.max(...y_all) + dot_size - y_min

//   return { x_min, x_max, y_min, y_max, dot_size }
// }

function Generator({ getString }) {
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M')
  const [content, setContent] = useState('')
  const [qrcode, setQrcode] = useState(null)

  const handleContentChange = useCallback(event => {
    const value = event.target.value
    if (value.length > 0 && value.length < 1000) { // todo: find out the actual value length limit
      setContent(value)
    } else {
      setContent('')
    }
  }, [setContent])

  useEffect(() => {
    qrCode.update({
      data: content,
      qrOptions: {
        errorCorrectionLevel
      },
    })

    if (content === '') {
      setQrcode(null)
    } else {
      qrCode.getRawData('svg')
        .then(async data => {
          let svg = await data.text()

          // const { x_min, x_max, y_min, y_max } = getQrcodeBounds(svg)

          svg = svg.replace('<svg', `<svg viewBox="0 0 ${size} ${size}"`)
          // svg = svg.replace('<svg', `<svg viewBox="${x_min} ${y_min} ${x_max} ${y_max}"`)
          setQrcode(svg)
        })
    }
  }, [content, errorCorrectionLevel, setQrcode])

  // const handleDownload = useCallback(() => {
  //   if (filetype === 'svg') {
  //     const b64 = 'data:image/svg+xml;base64,' + btoa(qrcode)
  //     trigger_download('volt-qrcode.svg', b64)
  //   } else {
  //     const b64 = 'data:image/png;base64,'
  //     trigger_download('volt-qrcode.png', b64)
  //   }
  //   // window.umami.trackEvent('F: ' + filetype)
  // }, [
  //   filetype,
  //   qrcode
  // ])

  const handleDownload_svg = () => {
    qrCode.download({ name: 'volt-qrcode', extension: 'svg' })
    window.umami.trackEvent('E: svg')
  }
  const handleDownload_jpeg = () => {
    qrCode.download({ name: 'volt-qrcode', extension: 'jpeg' })
    window.umami.trackEvent('E: jpeg')
  }
  const handleDownload_png = () => {
    qrCode.download({ name: 'volt-qrcode', extension: 'png' })
    window.umami.trackEvent('E: png')
  }
  // const handleDownload_webp = () => {
  //   qrCode.download({ name: 'volt-qrcode', extension: 'webp' })
  //   window.umami.trackEvent('E: webp')
  // }

  return <div className={classes.qrcodeWrapper}>
    <h1><Localized id="website_title" /></h1>

    <textarea
      className={classes.qrcodeContentInput}
      placeholder={getString('text_content_input_placeholder')}
      onChange={handleContentChange}
    ></textarea>

    <h2>
      <Localized id="error_correction_level_headline" />
    </h2>
    <MultiButton
      onChange={setErrorCorrectionLevel}
      ariaLabel={getString('error_correction_level_headline')}
      defaultValue={errorCorrectionLevel}
      items={[
        {
          value: 'L',
          title: 'Low ~7%'
        },
        {
          value: 'M',
          title: 'Medium ~15%'
        },
        {
          value: 'Q',
          title: 'Quartile ~25%'
        },
        {
          value: 'H',
          title: 'High ~30%'
        },
      ]}
    />
    <br />
    <br />

    {
      qrcode === null
        ? <p>Enter content for the QR-Code to download it.</p>
        : <>
            <span className={classes.qrCodeSvgWrapper} dangerouslySetInnerHTML={{ __html: qrcode }}></span>

            <h2>Download</h2>
            <button onClick={handleDownload_svg} className={'green ' + classes.downloadButton}>SVG</button>
            <button onClick={handleDownload_jpeg} className={'green ' + classes.downloadButton}>JPEG</button>
            <button onClick={handleDownload_png} className={'green ' + classes.downloadButton}>PNG</button>
            {/* <button onClick={handleDownload_webp} className={'green ' + classes.downloadButton}>WEBP</button> */}
          </>
    }
  </div>
}

export default withLocalization(Generator)
