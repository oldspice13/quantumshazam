import { render, screen, fireEvent, act } from '@testing-library/react'
import { JournalEntry } from '../JournalEntry'

describe('JournalEntry', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders with prompt and empty textarea', () => {
    const onSave = jest.fn()
    const prompt = 'Test journal prompt'
    
    render(<JournalEntry prompt={prompt} onSave={onSave} />)
    
    expect(screen.getByText('Journal Prompt')).toBeInTheDocument()
    expect(screen.getByText(prompt)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Start writing your thoughts here...')).toBeInTheDocument()
  })

  it('renders with initial content', () => {
    const onSave = jest.fn()
    const initialContent = 'Initial journal entry'
    
    render(
      <JournalEntry
        prompt="Test prompt"
        onSave={onSave}
        initialContent={initialContent}
      />
    )
    
    expect(screen.getByDisplayValue(initialContent)).toBeInTheDocument()
  })

  it('auto-saves content after typing', () => {
    const onSave = jest.fn()
    render(<JournalEntry prompt="Test prompt" onSave={onSave} />)
    
    const textarea = screen.getByPlaceholderText('Start writing your thoughts here...')
    fireEvent.change(textarea, { target: { value: 'New journal entry' } })
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(onSave).toHaveBeenCalledWith('New journal entry')
  })

  it('shows saving status while auto-saving', () => {
    const onSave = jest.fn()
    render(<JournalEntry prompt="Test prompt" onSave={onSave} />)
    
    const textarea = screen.getByPlaceholderText('Start writing your thoughts here...')
    fireEvent.change(textarea, { target: { value: 'New journal entry' } })
    
    expect(screen.getByText('Saving...')).toBeInTheDocument()
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(screen.queryByText('Saving...')).not.toBeInTheDocument()
  })

  it('shows last saved time after saving', () => {
    const onSave = jest.fn()
    render(<JournalEntry prompt="Test prompt" onSave={onSave} />)
    
    const textarea = screen.getByPlaceholderText('Start writing your thoughts here...')
    fireEvent.change(textarea, { target: { value: 'New journal entry' } })
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(screen.getByText(/Last saved at/)).toBeInTheDocument()
  })

  it('disables save button when content is unchanged', () => {
    const onSave = jest.fn()
    const initialContent = 'Initial content'
    
    render(
      <JournalEntry
        prompt="Test prompt"
        onSave={onSave}
        initialContent={initialContent}
      />
    )
    
    expect(screen.getByText('Save Entry')).toBeDisabled()
  })
}) 