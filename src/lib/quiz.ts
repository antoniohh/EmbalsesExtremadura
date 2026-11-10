import type { EmbalseResumen } from '../types'
import { aggregate } from './aggregate'
import { formatDecimal, formatHm3, formatInteger, formatPctCompact } from './format'

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

function placeOptions(
  correct: string,
  distractors: string[],
  position: number,
): { options: string[]; correct: number } {
  const unique = [correct, ...distractors.filter((name) => name !== correct)]
  const others = unique.filter((name) => name !== correct)
  const options = [...others]
  const index = Math.min(position, options.length)
  options.splice(index, 0, correct)
  return { options, correct: index }
}

export function buildQuiz(embalses: EmbalseResumen[]): QuizQuestion[] {
  if (embalses.length < 4) return []

  const byCapacity = [...embalses].sort((a, b) => b.capacidad_hm3 - a.capacidad_hm3)
  const fullest = [...embalses].sort((a, b) => b.porcentaje - a.porcentaje)
  const guadiana = aggregate(embalses.filter((item) => item.cuenca === 'Guadiana'))
  const tajo = aggregate(embalses.filter((item) => item.cuenca === 'Tajo'))
  const badajoz = embalses.filter((item) => item.provincia === 'Badajoz').length
  const caceres = embalses.filter((item) => item.provincia === 'Cáceres').length
  const falling = [...embalses].sort((a, b) => a.variacion_semana_hm3 - b.variacion_semana_hm3)
  const rising = [...embalses].sort((a, b) => b.variacion_semana_hm3 - a.variacion_semana_hm3)

  const largest = byCapacity[0]
  const largestOptions = placeOptions(
    largest.nombre,
    byCapacity.slice(1, 4).map((item) => item.nombre),
    1,
  )

  const basinCorrect = guadiana.actual >= tajo.actual ? 'Guadiana' : 'Tajo'
  const basinOptions = placeOptions(basinCorrect, [basinCorrect === 'Guadiana' ? 'Tajo' : 'Guadiana'], 1)

  const full = fullest[0]
  const fullOptions = placeOptions(
    full.nombre,
    fullest.slice(1, 4).map((item) => item.nombre),
    2,
  )

  const provinceCorrect = badajoz >= caceres ? 'Badajoz' : 'Cáceres'
  const provinceOptions = placeOptions(
    provinceCorrect,
    [provinceCorrect === 'Badajoz' ? 'Cáceres' : 'Badajoz'],
    0,
  )

  const hasFall = falling[0].variacion_semana_hm3 < -0.0001
  const movementCorrect = hasFall ? falling[0] : rising[0]
  const movementPool = hasFall ? falling : rising
  const movementOptions = placeOptions(
    movementCorrect.nombre,
    movementPool.slice(1, 4).map((item) => item.nombre),
    3,
  )
  const movement = Math.abs(movementCorrect.variacion_semana_hm3)
  const movementPct = movementCorrect.capacidad_hm3
    ? (movement / movementCorrect.capacidad_hm3) * 100
    : 0

  return [
    {
      question: '¿Qué embalse tiene la mayor capacidad de Extremadura?',
      options: largestOptions.options,
      correct: largestOptions.correct,
      explanation: `${largest.nombre} tiene ${formatHm3(largest.capacidad_hm3)} hm³ de capacidad, el mayor vaso de la región.`,
    },
    {
      question: '¿Qué cuenca almacena más agua en Extremadura?',
      options: basinOptions.options,
      correct: basinOptions.correct,
      explanation: `La cuenca del ${basinCorrect} reúne ${formatInteger(
        basinCorrect === 'Guadiana' ? guadiana.actual : tajo.actual,
      )} hm³, el ${formatDecimal(
        (basinCorrect === 'Guadiana' ? guadiana.actual : tajo.actual) /
          (guadiana.actual + tajo.actual || 1) *
          100,
      )} % del agua embalsada de la región.`,
    },
    {
      question: '¿Qué embalse está más lleno esta semana?',
      options: fullOptions.options,
      correct: fullOptions.correct,
      explanation: `${full.nombre} está al ${formatPctCompact(full.porcentaje)} de su capacidad, el nivel más alto del boletín.`,
    },
    {
      question: '¿Qué provincia tiene más embalses con dato?',
      options: provinceOptions.options,
      correct: provinceOptions.correct,
      explanation: `Badajoz tiene ${badajoz} embalses con dato y Cáceres ${caceres}.`,
    },
    {
      question: hasFall
        ? '¿Qué embalse ha bajado más esta semana?'
        : '¿Qué embalse ha subido más esta semana?',
      options: movementOptions.options,
      correct: movementOptions.correct,
      explanation: `${movementCorrect.nombre} ha ${hasFall ? 'perdido' : 'ganado'} ${formatHm3(
        movement,
      )} hm³ (${formatDecimal(movementPct)} pp) en la última semana.`,
    },
  ]
}
