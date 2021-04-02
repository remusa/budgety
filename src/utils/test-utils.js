import React from 'react'
import { render } from '@testing-library/react'
// import { TranslationProvider } from 'my-i18n-lib'
// import defaultStrings from 'i18n/en-x-default'
import PropTypes from 'prop-types'
import { ThemeProvider } from '../context/Theme/ThemeContext'
import { LanguageProvider } from '../context/Language/LanguageContext'
import { translationMessages } from '../context/Language/i18n'

const AllTheProviders = ({ children }) => (
  <ThemeProvider theme='light'>
    <LanguageProvider messages={translationMessages}>{children}</LanguageProvider>
  </ThemeProvider>
)

AllTheProviders.propTypes = {
  children: PropTypes.element,
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
