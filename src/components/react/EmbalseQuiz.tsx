import { useState } from 'react'
import { Check, RotateCcw, Trophy, X } from 'lucide-react'
import type { QuizQuestion } from '../../lib/quiz'
import { cx } from '../../lib/format'

interface EmbalseQuizProps {
  questions: QuizQuestion[]
}

export function EmbalseQuiz({ questions }: EmbalseQuizProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!questions.length) return null

  const question = questions[current]
  const answered = selected !== null
  const isCorrect = selected === question.correct
  const progress = ((current + 1) / questions.length) * 100

  function choose(index: number) {
    if (answered) return
    setSelected(index)
    if (index === question.correct) setScore((value) => value + 1)
  }

  function next() {
    if (current >= questions.length - 1) {
      setFinished(true)
      return
    }
    setCurrent((value) => value + 1)
    setSelected(null)
  }

  function reset() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const perfect = score === questions.length
    const good = score >= Math.ceil(questions.length * 0.6)
    return (
      <div className="surface p-6 text-center sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
          <Trophy className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="mt-5 text-sm font-semibold text-slate-500">Reto completado</p>
        <p className="mt-2 text-5xl font-semibold tracking-[-0.05em] text-slate-950 tnum">
          {score}
          <span className="text-2xl font-medium text-slate-500"> / {questions.length}</span>
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          {perfect
            ? 'Impecable. Conoces el agua de Extremadura mejor que el propio boletín.'
            : good
              ? 'Buen ojo. Te queda algún embalse por descubrir; el catálogo tiene 42.'
              : 'Hay 42 embalses esperando. Vuelve al catálogo, mira las cifras y prueba otra vez.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Jugar otra vez
        </button>
      </div>
    )
  }

  return (
    <div className="surface p-6 sm:p-7">
      <h3 className="text-balance text-xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-2xl">
        {question.question}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="h-1.5 min-w-[6rem] flex-1 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs font-medium text-slate-500 tnum">
          Pregunta {current + 1} de {questions.length}
        </p>
        <p className="text-xs font-medium text-slate-500 tnum">Aciertos: {score}</p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2" role="group" aria-label="Opciones de respuesta">
        {question.options.map((option, index) => {
          const correctOption = index === question.correct
          const selectedOption = index === selected

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(index)}
              disabled={answered}
              className={cx(
                'flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition-colors',
                answered && correctOption
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : answered && selectedOption
                    ? 'border-rose-300 bg-rose-50 text-rose-900'
                    : answered
                      ? 'border-slate-200 bg-white text-slate-400 opacity-60'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50',
              )}
            >
              <span
                className={cx(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold',
                  answered && correctOption
                    ? 'bg-emerald-600 text-white'
                    : answered && selectedOption
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-500',
                )}
                aria-hidden="true"
              >
                {answered && correctOption ? (
                  <Check className="h-3.5 w-3.5" />
                ) : answered && selectedOption ? (
                  <X className="h-3.5 w-3.5" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              {option}
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className={cx(
            'mt-4 rounded-xl border px-4 py-3.5',
            isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50',
          )}
          aria-live="polite"
        >
          <p className={cx('text-sm font-semibold', isCorrect ? 'text-emerald-800' : 'text-rose-800')}>
            {isCorrect ? '¡Correcto!' : 'No exactamente.'}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{question.explanation}</p>
          <button
            type="button"
            onClick={next}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
          >
            {current === questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'}
          </button>
        </div>
      )}
    </div>
  )
}
