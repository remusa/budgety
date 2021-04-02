import React from 'react'
import styled from 'styled-components'

const FooterStyles = styled.div`
  grid-area: footer;

  footer {
    padding: 1rem;
  }
`

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <FooterStyles>
      <footer>
        <div>
          <span>
            Built with <span>❤ </span>
            by <span> </span>
            <a href='https://renems.com' target='_blank' rel='noopener noreferrer'>
              RMS
            </a>
          </span>
        </div>
      </footer>
    </FooterStyles>
  )
}

export default Footer
