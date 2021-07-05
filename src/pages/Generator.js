import React, { useState, useCallback, useEffect, useRef } from 'react'
import classes from './Generator.module.css'

import { withLocalization, Localized } from '../fluent/Localized.js'
import MultiButton from '../components/MultiButton.js'

import qrcode_generator from 'qrcode-generator'
import Canvg from 'canvg'

import { useLocation } from 'react-router-dom'

function trigger_download(name, data) {
  const a = document.createElement('a')
  document.body.appendChild(a)
  // a.target = '_blank'
  a.download = name
  a.href = data
  a.click()
  a.remove()
}

// function getQrcodeBounds(svgText){
//   const matches = [...svgText.matchAll(/<rect x="([0-9]+)" y="([0-9]+)" width="([0-9]+)"/gm)]
//
//   const dot_size = Math.min(...matches.map(match => match[3]))
//
//   const x_all = matches.map(match => match[1])
//   const x_min = Math.min(...x_all)
//   const x_max = Math.max(...x_all) + dot_size - x_min
//
//   const y_all = matches.map(match => match[2])
//   const y_min = Math.min(...y_all)
//   const y_max = Math.max(...y_all) + dot_size - y_min
//
//   return { x_min, x_max, y_min, y_max, dot_size }
// }

const colors = {
  'black': '#000000',
  'white': '#ffffff',
  'purple': '#502379',
  'yellow': '#FDC220',
  'green': '#1BBE6F',
  'blue': '#82D0F4',
  'red': '#E63E12',
}

function Generator({ getString }) {
  const conversion_canvas_ref = useRef(null)

  const location = useLocation()
  let location_search = location.search
    .substr(1)
    .split('&')
    .reduce((obj, val) => {
      const pair = val.split('=')
      obj[pair[0]] = pair[1]
      return obj
    }, {})

  const [size, setSize] = useState('1000')
  const [realSize, setRealSize] = useState(null)

  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M')
  const [content, setContent] = useState(location_search.c ||'')
  const [qrcode, setQrcode] = useState(null)

  const [backgroundColor, setBackgroundColor] = useState('white')
  const [foregroundColor, setForegroundColor] = useState('purple')
  const [displayLogo, setDisplayLogo] = useState('yes')

  const handleContentChange = useCallback(event => {
    const value = event.target.value
    if (value.length > 0 && value.length < 1200) { // 1273 is the maximum for an ECL of H. 2953 for L.
      setContent(value)
    } else {
      setContent('')
    }
  }, [setContent])

  useEffect(() => {
    if (content === '') {
      setQrcode(null)
    } else {
      // generate qr code
      const size_int = parseInt(size)

      const qr = qrcode_generator(0, errorCorrectionLevel)
      qr.addData(content)
      qr.make()

      const qr_pixel_count = qr.getModuleCount()
      const cellSize = Math.ceil(size_int / qr_pixel_count)

      let svg = qr.createSvgTag({
        cellSize: cellSize,
        margin: cellSize * 1,
        scalable: true,
      })

      const realCanvasSize = (
        (qr_pixel_count * cellSize) // qrcode without margin
        + (cellSize * 2) // margin
      )
      setRealSize(realCanvasSize)


      // Volt Logo
      if (displayLogo === 'yes') {
        const logo_size = size_int * 0.4 // cellSize * 7
        const logo_pos = (
          realCanvasSize
          * 0.5 // middle of the image
        )
        - (logo_size * 0.5) // half logo, to position it at the center

        svg = svg.replace('</svg>', `
          <svg x="${logo_pos}" y="${logo_pos}" width="${logo_size}" height="${logo_size}" viewBox="0 0 2083 2083" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="2083" height="2083" rx="1041.5" fill="logo_bg"/>
          <path d="M1653.47 1157.13V982.509H1782.78V865.558H1653.47V707.932L1512.84 730.219V1159.04C1512.84 1191.11 1515.78 1220.38 1521.81 1246.79C1527.77 1273.2 1538.29 1295.7 1553.44 1314.24C1568.52 1332.77 1588.67 1347.26 1613.83 1357.64C1638.98 1368.01 1670.76 1373.23 1709.15 1373.23C1739.38 1373.23 1764.83 1370.73 1785.57 1365.65C1806.32 1360.65 1825.22 1354.62 1842.21 1347.71L1822.35 1238.26C1809.11 1243.33 1794.55 1247.23 1778.44 1250.03C1762.41 1252.82 1746.81 1254.29 1731.73 1254.29C1700.25 1254.29 1679.36 1245.47 1668.99 1227.89C1658.62 1210.31 1653.47 1186.7 1653.47 1157.13Z" fill="logo_fg"/>
          <path d="M642.687 1361.9C668.578 1307.25 694.175 1250.32 719.331 1191.18C744.486 1132.05 768.391 1073.57 791.046 1015.68C813.701 957.795 834.516 902.482 853.64 849.744C872.691 796.859 889.535 749.637 904.172 707.932H747.428C735.145 746.033 721.464 786.855 706.532 830.473C691.527 874.164 676.301 917.708 660.781 961.032C645.261 1004.43 630.183 1045.91 615.619 1085.63C601.055 1125.35 587.595 1159.55 575.311 1188.24C562.292 1159.33 548.611 1125.06 534.415 1085.34C520.146 1045.62 505.288 1004.06 489.768 960.737C474.248 917.414 458.949 873.87 443.944 830.252C428.939 786.561 415.331 745.812 403.121 707.932H240.787C254.689 749.416 271.165 796.638 290.289 849.523C309.413 902.409 330.303 957.722 353.104 1015.54C375.906 1073.35 399.958 1131.82 425.261 1190.89C450.564 1249.95 476.234 1306.96 502.272 1361.9H642.687Z" fill="logo_fg"/>
          <path d="M1466.41 707.932L1325.78 730.219V1361.9H1466.41V707.932Z" fill="logo_fg"/>
          <path d="M1286.51 1120.28C1286.51 979.568 1172.43 865.485 1031.72 865.485C973.684 865.485 920.211 884.904 877.402 917.488C865.486 949.337 852.982 981.995 839.816 1015.54C820.839 1063.93 801.053 1112.85 780.311 1162.13C800.391 1282.98 905.279 1375.07 1031.72 1375.07C1172.43 1375.07 1286.51 1260.99 1286.51 1120.28ZM1158.97 1120.28C1158.97 1189.93 1102.48 1246.42 1032.82 1246.42C963.166 1246.42 906.677 1189.93 906.677 1120.28C906.677 1050.62 963.166 994.132 1032.82 994.132C1102.48 994.132 1158.97 1050.62 1158.97 1120.28Z" fill="logo_fg"/>
          </svg>
        </svg>
        `)
      }

      // Colors
      let this_backgroundColor = backgroundColor
      let this_foregroundColor = foregroundColor

      if (
        this_foregroundColor === this_backgroundColor
      ) {
        if (this_backgroundColor === 'white') {
          this_foregroundColor = 'purple'
        } else {
          this_backgroundColor = 'white'
        }
      }

      if (this_foregroundColor !== 'white') {
        this_backgroundColor = 'white'
      }

      let this_backgroundColor_logo = 'white'
      let this_foregroundColor_logo = 'purple'

      if (this_backgroundColor === 'purple' && this_foregroundColor === 'white') {
        this_backgroundColor_logo = 'purple'
        this_foregroundColor_logo = 'white'
      }

      let backgroundColor_hex = colors[this_backgroundColor] || 'white'
      let foregroundColor_hex = colors[this_foregroundColor] || 'black'
      let backgroundColor_logo_hex = colors[this_backgroundColor_logo] || 'white'
      let foregroundColor_logo_hex = colors[this_foregroundColor_logo] || 'black'

      svg = svg
        .replace(/fill="black"/g, `fill="${foregroundColor_hex}"`)
        .replace(/fill="white"/g, `fill="${backgroundColor_hex}"`)
        .replace(/fill="logo_bg"/g, `fill="${backgroundColor_logo_hex}"`)
        .replace(/fill="logo_fg"/g, `fill="${foregroundColor_logo_hex}"`)


      // use the qrcode
      setQrcode(svg)
    }
  }, [content, size, errorCorrectionLevel, backgroundColor, foregroundColor, displayLogo, setRealSize, setQrcode])

  const handleDownload_svg = () => {
    const b64 = 'data:image/svg+xml;base64,' + btoa(qrcode)
    window.umami.trackEvent('E: svg')
    window.umami.trackEvent('BG: ' + backgroundColor)
    window.umami.trackEvent('FG: ' + foregroundColor)
    window.umami.trackEvent('Logo: ' + displayLogo)
    window.umami.trackEvent('ECL: ' + errorCorrectionLevel)
    window.umami.trackEvent('Size: ' + size)
    window.umami.trackEvent('Length: ' + Math.round((content.length * 0.1) * 10))
    trigger_download('volt-qrcode.svg', b64)
  }
  const handleDownload_jpeg = async () => {
    var canvas = conversion_canvas_ref.current
    const ctx = canvas.getContext('2d')

    const v = Canvg.fromString(ctx, qrcode)
    v.resize(realSize, realSize)
    await v.render()

    var b64 = canvas.toDataURL('image/jpeg')

    window.umami.trackEvent('E: jpeg')
    window.umami.trackEvent('BG: ' + backgroundColor)
    window.umami.trackEvent('FG: ' + foregroundColor)
    window.umami.trackEvent('Logo: ' + displayLogo)
    window.umami.trackEvent('ECL: ' + errorCorrectionLevel)
    window.umami.trackEvent('Size: ' + size)
    window.umami.trackEvent('Length: ' + Math.round((content.length * 0.1) * 10))
    trigger_download('volt-qrcode.jpeg', b64)
  }
  const handleDownload_png = async () => {
    var canvas = conversion_canvas_ref.current
    const ctx = canvas.getContext('2d')

    const v = Canvg.fromString(ctx, qrcode)
    v.resize(realSize, realSize)
    await v.render()

    var b64 = canvas.toDataURL('image/png')

    window.umami.trackEvent('E: png')
    window.umami.trackEvent('BG: ' + backgroundColor)
    window.umami.trackEvent('FG: ' + foregroundColor)
    window.umami.trackEvent('Logo: ' + displayLogo)
    window.umami.trackEvent('ECL: ' + errorCorrectionLevel)
    window.umami.trackEvent('Size: ' + size)
    window.umami.trackEvent('Length: ' + Math.round((content.length * 0.1) * 10))
    trigger_download('volt-qrcode.png', b64)
  }



  let background_colors = ['purple', 'white', 'yellow', 'green', 'blue', 'red', 'black']
  if (foregroundColor !== 'white') {
    background_colors = ['white']
  } else if (foregroundColor === 'white') {
    background_colors = ['purple', 'yellow', 'green', 'blue', 'red', 'black']
  }
  background_colors = background_colors.map(color => ({
    value: color,
    title: getString(color)
  }))


  const options = <>
    <h2>
      <Localized id="foreground_color_headline" />
    </h2>
    <MultiButton
      onChange={setForegroundColor}
      ariaLabel={getString('foreground_color_headline')}
      defaultValue={foregroundColor}
      items={[
        {
          value: 'purple',
          title: getString('purple')
        },
        {
          value: 'white',
          title: getString('white')
        },
        {
          value: 'yellow',
          title: getString('yellow')
        },
        {
          value: 'green',
          title: getString('green')
        },
        {
          value: 'blue',
          title: getString('blue')
        },
        {
          value: 'red',
          title: getString('red')
        },
        {
          value: 'black',
          title: getString('black')
        },
      ]}
    />
    <br />

    {
      background_colors.length <= 1
        ? null
        : <>
          <h2>
            <Localized id="background_color_headline" />
          </h2>
          <MultiButton
            onChange={setBackgroundColor}
            ariaLabel={getString('background_color_headline')}
            defaultValue={backgroundColor}
            items={background_colors}
          />
          <br />
        </>
    }

    <h2>
      <Localized id="display_logo_headline" />
    </h2>
    <MultiButton
      onChange={setDisplayLogo}
      ariaLabel={getString('display_logo_headline')}
      defaultValue={displayLogo}
      items={[
        {
          value: 'yes',
          title: getString('label_display_logo_yes')
        },
        {
          value: 'no',
          title: getString('label_display_logo_no')
        },
      ]}
    />
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
          value: 'L',
          title: getString('label_error_correction_level_low')
        },
        {
          value: 'M',
          title: getString('label_error_correction_level_medium')
        },
        {
          value: 'Q',
          title: getString('label_error_correction_level_quartile')
        },
        {
          value: 'H',
          title: getString('label_error_correction_level_high')
        },
      ]}
    />
    <br />

    <h2>
      <Localized id="size_headline" />
    </h2>
    <MultiButton
      onChange={setSize}
      ariaLabel={getString('size_headline')}
      defaultValue={size}
      items={[
        {
          value: '500',
          title: '500px'
        },
        {
          value: '1000',
          title: '1000px'
        },
        {
          value: '2000',
          title: '2000px'
        },
        {
          value: '4000',
          title: '4000px'
        },
      ]}
    />
    <br />
    <br />
  </>

  return <div className={classes.qrcodeWrapper}>
    <h1><Localized id="website_title" /></h1>
    <br />

    <p><Localized id="text_content_input_info" /></p>
    <textarea
      className={classes.qrcodeContentInput}
      placeholder={getString('text_content_input_placeholder')}
      onChange={handleContentChange}
      style={{marginTop: '0'}}
      defaultValue={content}
    ></textarea>

    {
      content.length > 0
        ? options
        : null
    }

    {
      qrcode === null
        ? null
        : <>
          <span className={classes.qrCodeSvgWrapper} dangerouslySetInnerHTML={{ __html: qrcode }}></span>

          <h2><Localized id="download_headline" /></h2>
          <button onClick={handleDownload_svg} className={'green ' + classes.downloadButton}><Localized id="svg_label" /></button>
          <button onClick={handleDownload_jpeg} className={'green ' + classes.downloadButton}><Localized id="jpeg_label" /></button>
          <button onClick={handleDownload_png} className={'green ' + classes.downloadButton}><Localized id="png_label" /></button>
        </>
    }

    <canvas style={{display:'none'}} ref={conversion_canvas_ref} />
  </div>
}

export default withLocalization(Generator)
