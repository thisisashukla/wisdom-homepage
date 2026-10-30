'use client'

import { useState } from 'react'
import type { QuizQ } from '@/lib/funnels/mahabharata/yaksha'
import { mbTrack } from './track'

/** Ten questions from the lake. One at a time; the answer and its verse show after each pick. */
export default function YakshaQuiz({ quiz, refs, page }: { quiz: QuizQ[]; refs: Record<string, string>; page: string }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [marks, setMarks] = useState<('right' | 'wrong')[]>([])
  const q = quiz[i]

  const answer = (k: number) => {
    if (picked !== null) return
    const correct = k === q.correct
    setPicked(k)
    setMarks((m) => [...m, correct ? 'right' : 'wrong'])
    if (correct) setScore((s) => s + 1)
    mbTrack('Yaksha Quiz Answered', page, 'en', { q: q.id, correct })
  }

  const next = () => {
    if (i + 1 < quiz.length) {
      setI(i + 1)
      setPicked(null)
      return
    }
    setDone(true)
    mbTrack('Yaksha Quiz Completed', page, 'en', { score })
  }

  const restart = () => {
    setI(0)
    setPicked(null)
    setScore(0)
    setMarks([])
    setDone(false)
  }

  const dots = (
    <span className="mb-quiz-dots" aria-hidden="true">
      {quiz.map((x, k) => (
        <i key={x.id} data-s={marks[k] ?? (k === i && !done ? 'now' : undefined)} />
      ))}
    </span>
  )

  if (done) {
    const line =
      score === quiz.length
        ? 'All ten. The Yaksha would let you drink.'
        : score >= 7
          ? 'Your brothers would mostly live.'
          : 'The lake keeps its water for now. Read the answers above and try again.'
    return (
      <div className="mb-quiz" aria-live="polite">
        <div className="mb-quiz-top">
          <p className="mb-quiz-count">Done</p>
          {dots}
        </div>
        <p className="mb-quiz-score">
          {score} of {quiz.length}
        </p>
        <p className="mb-quiz-why">{line}</p>
        <button type="button" className="btn-ghost" onClick={restart}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="mb-quiz">
      <div className="mb-quiz-top">
        <p className="mb-quiz-count">
          Question {i + 1} of {quiz.length}
        </p>
        {dots}
      </div>
      <div className="mb-quiz-q" key={q.id}>
      <h3 id={`quiz-${q.id}`}>{q.prompt}</h3>
      <ul className="mb-quiz-opts" aria-labelledby={`quiz-${q.id}`}>
        {q.options.map((o, k) => (
          <li key={k}>
            <button
              type="button"
              disabled={picked !== null}
              data-state={picked === null ? undefined : k === q.correct ? 'right' : k === picked ? 'wrong' : undefined}
              onClick={() => answer(k)}
            >
              {o}
            </button>
          </li>
        ))}
      </ul>
      <div aria-live="polite">
        {picked !== null && (
          <>
            <p className="mb-quiz-why">
              <strong>{picked === q.correct ? 'Right.' : `It is "${q.options[q.correct]}".`}</strong> {q.why}{' '}
              <span className="mb-ref">{refs[q.lineId]}</span>
            </p>
            <button type="button" className="btn-primary" onClick={next}>
              {i + 1 < quiz.length ? 'Next question' : 'See my score'}
            </button>
          </>
        )}
      </div>
      </div>
    </div>
  )
}
