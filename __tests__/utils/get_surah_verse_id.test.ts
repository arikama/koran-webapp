import '@testing-library/jest-dom'

import { getSurahVerseId } from '../../src/utils/get_surah_verse_id'

describe('getSurahVerseId', () => {
  test('valid tags', () => {
    const tests = [
      {
        input: '1:1',
        expected: {
          surah: 1,
          verse: 1
        }
      },
      {
        input: '114:6',
        expected: {
          surah: 114,
          verse: 6
        }
      }
    ]
    tests.forEach(test => {
      const actual = getSurahVerseId(test.input)
      expect(actual).toEqual(test.expected)
    })
  })

  test('invalid tags', () => {
    const tests = ['', '1', '1:', ':1', 'x:x']
    tests.forEach(test => {
      const actual = getSurahVerseId(test)
      expect(actual).toEqual({
        surah: 0,
        verse: 0
      })
    })
  })
})
