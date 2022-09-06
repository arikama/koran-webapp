import { render, screen } from '@testing-library/react'
import SurahPage, { getStaticProps, getStaticPaths } from '../../../src/pages/surahs/[id]'
import '@testing-library/jest-dom'
import 'whatwg-fetch'

describe('SurahPage', () => {
  test('render', async () => {
    const result: any = await getStaticProps({ params: { id: '1' } })
    render(<SurahPage surah={result.props.surah} />)

    expect(await screen.findByText('1:1')).toBeInTheDocument()
    expect(await screen.findByText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')).toBeInTheDocument()
    expect(await screen.findByText('In the name of Allah, the Beneficent, the Merciful.')).toBeInTheDocument()

    expect(await screen.findByText('1:7')).toBeInTheDocument()
    expect(await screen.findByText('صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ')).toBeInTheDocument()
    expect(await screen.findByText('The path of those whom Thou hast favoured; Not the (path) of those who earn Thine anger nor of those who go astray.')).toBeInTheDocument()
  })

  test('getStaticPaths', async () => {
    const result: any = await getStaticPaths()
    expect(result.paths.length).toEqual(114)
  })
})
