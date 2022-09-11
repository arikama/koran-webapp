import '@testing-library/jest-dom'

import { getSurahVerseId } from './../../src/utils/get_surah_verse_id'

describe('getSurahVerseId', () => {
  test('valid inputs', () => {
    const tests = [
      {
        input: '1:1',
        expected: {
          ok: true,
          surahId: 1,
          verseId: 1
        }
      },
      {
        input: '114:6',
        expected: {
          ok: true,
          surahId: 114,
          verseId: 6
        }
      }
    ]
    tests.forEach(test => {
      const actual = getSurahVerseId(test.input)
      expect(actual).toEqual(test.expected)
    })
  })

  test('invalid inputs', () => {
    const tests = ['', '1', '1:', ':1']
    tests.forEach(test => {
      const actual = getSurahVerseId(test)
      expect(actual).toEqual({
        ok: false,
        surahId: -1,
        verseId: -1
      })
    })
  })
})
