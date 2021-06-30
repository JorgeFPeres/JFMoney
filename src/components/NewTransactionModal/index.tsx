import { FormEvent, useState, useContext } from 'react'
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api'
import { TransactionsContext } from '../../TransactionsContext'
import { Container, RadioBox, TransactionTypeContainer } from './styles'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext)
  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt='fechar' />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transacao</h2>
        <input
          placeholder='Titulo'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          placeholder='Valor'
          type='number'
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            isActive={type === 'deposit'}
            onClick={() => setType('deposit')}
            activeColor='green'
          >
            <img src={incomeImg} alt='Entrada' />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type='button'
            isActive={type === 'withdraw'}
            onClick={() => setType('withdraw')}
            activeColor='red'
          >
            <img src={outcomeImg} alt='Saida' />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type='text'
          placeholder='Categoria'
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type='submit'>Cadastrar</button>
      </Container>
    </Modal>
  )
}
