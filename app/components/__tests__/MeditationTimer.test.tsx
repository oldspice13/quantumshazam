import { render, screen, fireEvent, act } from '@testing-library/react'
import { MeditationTimer } from '../MeditationTimer'

describe('MeditationTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders with initial time', () => {
    const onComplete = jest.fn()
    render(<MeditationTimer duration={5} onComplete={onComplete} />)
    
    expect(screen.getByText('05:00')).toBeInTheDocument()
    expect(screen.getByText('Start Meditation')).toBeInTheDocument()
  })

  it('starts timer when start button is clicked', () => {
    const onComplete = jest.fn()
    render(<MeditationTimer duration={5} onComplete={onComplete} />)
    
    fireEvent.click(screen.getByText('Start Meditation'))
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(screen.getByText('04:59')).toBeInTheDocument()
  })

  it('pauses timer when pause button is clicked', () => {
    const onComplete = jest.fn()
    render(<MeditationTimer duration={5} onComplete={onComplete} />)
    
    fireEvent.click(screen.getByText('Start Meditation'))
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    fireEvent.click(screen.getByText('Pause'))
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(screen.getByText('04:59')).toBeInTheDocument()
  })

  it('resets timer when reset button is clicked', () => {
    const onComplete = jest.fn()
    render(<MeditationTimer duration={5} onComplete={onComplete} />)
    
    fireEvent.click(screen.getByText('Start Meditation'))
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    fireEvent.click(screen.getByText('Reset'))
    
    expect(screen.getByText('05:00')).toBeInTheDocument()
  })

  it('calls onComplete when timer reaches zero', () => {
    const onComplete = jest.fn()
    render(<MeditationTimer duration={1} onComplete={onComplete} />)
    
    fireEvent.click(screen.getByText('Start Meditation'))
    
    act(() => {
      jest.advanceTimersByTime(60000)
    })
    
    expect(onComplete).toHaveBeenCalled()
  })
}) 