import { rest } from 'msw'

const baseUrl = process.env.NEXT_PUBLIC_BASE_API

export const handlers = [
  rest.patch(`${baseUrl}/user/pointer/advance`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        "data": {
          "current_pointer": "1:2"
        }
      })
    )
  }),
  rest.post(`${baseUrl}/user/pointer`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        "data": {
          "current_pointer": "1:1"
        }
      })
    )
  }),
  rest.get(`${baseUrl}/surah/1/verse/1`, async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        "data": {
          "translations": {
            "clearquran": "In the name of God, the Gracious, the Merciful.",
            "pickthall": "In the name of Allah, the Beneficent, the Merciful."
          },
          "verse": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
        }
      })
    )
  }),
  rest.get(`${baseUrl}/surah/1`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        "data": {
          "surah": {
            "surah_info": {
              "surah_id": 1,
              "title": "Al-Fatihah",
              "arabic": "ٱلْفَاتِحَة",
              "english": "The Opening",
              "verses": 7,
              "city": "Makkah",
              "juz_start": 1,
              "juz_end": 1
            },
            "verses": [
              {
                "surah_id": 1,
                "verse_id": 1,
                "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                "translations": {
                  "clearquran": "In the name of God, the Gracious, the Merciful.",
                  "pickthall": "In the name of Allah, the Beneficent, the Merciful."
                }
              },
              {
                "surah_id": 1,
                "verse_id": 2,
                "text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
                "translations": {
                  "clearquran": "Praise be to God, Lord of the Worlds.",
                  "pickthall": "Praise be to Allah, Lord of the Worlds,"
                }
              },
              {
                "surah_id": 1,
                "verse_id": 3,
                "text": "الرَّحْمَٰنِ الرَّحِيمِ",
                "translations": {
                  "clearquran": "The Most Gracious, the Most Merciful.",
                  "pickthall": "The Beneficent, the Merciful."
                }
              },
              {
                "surah_id": 1,
                "verse_id": 4,
                "text": "مَالِكِ يَوْمِ الدِّينِ",
                "translations": {
                  "clearquran": "Master of the Day of Judgment.",
                  "pickthall": "Master of the Day of Judgment,"
                }
              },
              {
                "surah_id": 1,
                "verse_id": 5,
                "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
                "translations": {
                  "clearquran": "It is You we worship, and upon You we call for help.",
                  "pickthall": "Thee (alone) we worship; Thee (alone) we ask for help."
                }
              },
              {
                "surah_id": 1,
                "verse_id": 6,
                "text": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
                "translations": {
                  "clearquran": "Guide us to the straight path.",
                  "pickthall": "Show us the straight path,"
                }
              },
              {
                "surah_id": 1,
                "verse_id": 7,
                "text": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
                "translations": {
                  "clearquran": "The path of those You have blessed, not of those against whom there is anger, nor of those who are misguided.",
                  "pickthall": "The path of those whom Thou hast favoured; Not the (path) of those who earn Thine anger nor of those who go astray."
                }
              }
            ]
          }
        }
      }),
    )
  }),
  rest.get(`${baseUrl}/`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          'surah_infos': [
            {
              'surah_id': 1,
              'title': 'Al-Fatihah',
              'arabic': 'ٱلْفَاتِحَة',
              'english': 'The Opening',
              'verses': 7,
              'city': 'Makkah',
              'juz_start': 1,
              'juz_end': 1
            },
            {
              'surah_id': 2,
              'title': 'Al-Baqarah',
              'arabic': 'ٱلْبَقَرَة',
              'english': 'The Calf',
              'verses': 286,
              'city': 'Madinah',
              'juz_start': 1,
              'juz_end': 3
            },
          ]
        }
      }),
    )
  }),
  rest.post(`${baseUrl}/auth/google`, async (req, res, ctx) => {
    const json = await req.json()
    const authCode: string = json.auth_code
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          email: 'amir.ariffin@google.com',
          token: authCode + authCode,
          name: 'Amir',
          picture: ''
        }
      }),
    )
  })
]
