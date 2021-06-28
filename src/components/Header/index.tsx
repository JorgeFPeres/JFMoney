import logoImg from '../../assets/Logo.svg'
import { Container, Content } from './styles'

export function Header() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt='jf money' />
        <button type='button'> Nova Transacao</button>
      </Content>
    </Container>
  )
}
