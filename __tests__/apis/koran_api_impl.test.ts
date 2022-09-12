import { KoranApiImpl } from "../../src/apis/koran_api_impl"

describe('KoranApiImpl', () => {
  test('getSurahInfos', async () => {
    const koranApiImpl = new KoranApiImpl()

    const actual = await koranApiImpl.getSurahInfos()

    expect(actual.length).toEqual(2)

    expect(actual[0].surahId).toEqual(1)
    expect(actual[0].titleEnglish).toEqual('The Opening')
    expect(actual[0].titleArabic).toEqual('ٱلْفَاتِحَة')

    expect(actual[1].surahId).toEqual(2)
    expect(actual[1].titleEnglish).toEqual('The Calf')
    expect(actual[1].titleArabic).toEqual('ٱلْبَقَرَة')
  })

  test('getSurah', async () => {
    const koranApiImpl = new KoranApiImpl()

    const actual = await koranApiImpl.getSurah(1)

    expect(actual.surahId).toEqual(1)
    expect(actual.verses.length).toEqual(7)

    expect(actual.verses[6].verseId).toEqual(7)
    expect(actual.verses[6].text).toEqual('صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ')
    expect(actual.verses[6].translation).toEqual('The path of those You have blessed, not of those against whom there is anger, nor of those who are misguided.')
  })

  test('getVerse', async () => {
    const koranApiImpl = new KoranApiImpl()

    const actual = await koranApiImpl.getVerse(1, 1)

    expect(actual.key).toEqual('1:1')
    expect(actual.verse).toEqual('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')
    expect(actual.translation).toEqual('In the name of God, the Gracious, the Merciful.')
  })
})
