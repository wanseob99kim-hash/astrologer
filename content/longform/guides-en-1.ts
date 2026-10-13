/** Guides 1–4, English. */
import type { Guide } from './types'

export const GUIDES_EN_1: readonly Guide[] = [
  {
    slug: 'moon-sign-vs-sun-sign',
    title: 'Moon Sign vs. Sun Sign: Why Vedic Astrology Starts With the Moon',
    description: 'Western astrology asks for your Sun sign; Vedic astrology asks for your Moon sign and birth star. What each one describes, why India put the Moon first, and how to read both.',
    lede: 'Ask a Western astrologer for your sign and they will name the sign the Sun was in. Ask an Indian astrologer and they will name the sign the Moon was in, and then add the birth star inside it. This is the single biggest difference between the two traditions, bigger than the famous 24-degree shift.',
    sections: [
      {
        h: 'Two different questions',
        p: [
          'Your Sun sign answers the question "where was the Sun on the day you were born?" The Sun moves about one degree a day and spends roughly a month in each sign, so everyone born in the same four-week window shares a Sun sign. That makes it a broad, seasonal marker: useful for describing a general style of being, but shared by about one in twelve people.',
          'Your Moon sign answers "where was the Moon at the moment you were born?" The Moon moves about thirteen degrees a day and changes sign every two and a half days. Your birth star, one of 27 sections of the sky, changes roughly every day. So the Moon is a much more personal marker. Two friends born a week apart can have the same Sun sign and completely different Moon signs and stars.',
        ],
      },
      {
        h: 'Why India put the Moon first',
        p: [
          'In the Indian view the Sun is the soul (atma) and the Moon is the mind (manas). The soul is constant, but the mind is the part of you that actually experiences life: it feels, reacts, remembers and worries. Since astrology is mostly about how life will be experienced, the Moon became the primary point of reference.',
          'There is also a calendrical reason. The traditional Indian calendar is lunisolar, and daily life was organised around the Moon: festivals, fasts, auspicious days and the timing of rituals all depend on the lunar day (tithi) and the Moon\'s star. A system that already tracked the Moon every day naturally read people through it too.',
          'Finally, the Moon sets the clock. The Vimshottari dasha, the main system for timing life\'s chapters, starts from the exact position of the Moon in its birth star. Without the Moon there is no dasha, and without the dasha most Vedic predictions cannot be made.',
        ],
      },
      {
        h: 'What the Moon sign describes',
        p: [
          'The Moon sign (rashi) describes your emotional nature: what you need to feel safe, how you react under pressure, and what kind of environment lets you rest. A Moon in Taurus wants stability and comfort; a Moon in Gemini needs conversation and variety; a Moon in Scorpio feels deeply and protects itself carefully. In India the Moon sign is also the basis for daily and yearly horoscopes in newspapers and almanacs.',
          'The Moon sign is also used as a second ascendant, called Chandra lagna. Astrologers read the houses counted from the Moon alongside the houses counted from the rising sign. When both point to the same theme, it is considered strongly confirmed.',
        ],
      },
      {
        h: 'What the birth star adds',
        p: [
          'Inside each Moon sign sit two and a quarter birth stars, each with its own deity, symbol, animal, temperament and ruling planet. The birth star is where most of the personal colour in a Vedic reading comes from. Two people with Moon in Leo can be very different: one in Magha, ruled by Ketu and the ancestors, proud and tradition-minded; another in Purva Phalguni, ruled by Venus, warm, social and pleasure-loving.',
          'The birth star is also what Vedic compatibility compares. Of the eight items in Ashtakoota matching, most are derived from the two birth stars, and the rest from the two Moon signs. The Sun plays no part in the traditional match.',
        ],
      },
      {
        h: 'Where your Sun sign goes in Vedic astrology',
        p: [
          'Your Sun still matters in a Vedic chart. It describes your relationship with authority and your father, your sense of purpose, and the area of life where you seek recognition. But because Vedic astrology uses the sidereal zodiac, your Sun sign usually moves back by one sign. A Western Leo born in early August is a Vedic Cancer Sun; only those born near the end of a Western sign keep the same sign.',
          'This often surprises people, but it rarely contradicts how they see themselves, because the Sun was never the main character in the Vedic reading. If your Western Sun sign has always felt right, it may simply be describing your Vedic ascendant or Moon instead.',
        ],
      },
      {
        h: 'How to read both',
        p: [
          'A useful habit is to treat the three as layers. The ascendant is the body and the way you meet the world. The Sun is your purpose and the role you are drawn to play. The Moon and its birth star are the inner weather, the part of you that only people close to you see.',
          'If you know only your birth date, the Sun sign is certain but the Moon may be uncertain, because the Moon can change star during the day. That is why this site asks for a birth time when it can, and marks the result as provisional when it cannot.',
        ],
      },
      {
        h: 'Common questions',
        p: [
          'Can my Moon sign change during my birth day? Yes. The Moon changes sign every two and a half days, so on roughly two days in five it crosses from one sign into the next at some hour. If you were born on one of those days, your Moon sign depends on your birth time just as your birth star does.',
          'Is the rising sign more important than the Moon? Vedic astrologers usually read the ascendant chart first for the structure of a life and the Moon chart for how that life is experienced. Neither replaces the other. If you do not know your birth time, though, the ascendant is unknowable, and the Moon, which is often certain from the date alone, becomes the most reliable starting point.',
          'Do Indian daily horoscopes use the Moon sign? Almost always. When an Indian newspaper or app gives a forecast for "Taurus", it means people whose Moon is in Taurus. Reading it with your Western Sun sign will usually give you someone else\'s horoscope.',
        ],
      },
    ],
    related: ['/guides/find-your-nakshatra', '/compare/western', '/tradition/nakshatra', '/birth'],
  },
  {
    slug: 'find-your-nakshatra',
    title: 'How to Find Your Birth Star (Nakshatra)',
    description: 'What you need to find your nakshatra, how the calculation works step by step, why birth time matters, and what to do if you do not know it.',
    lede: 'Your birth star is the section of the sky the Moon occupied at the moment you were born. Finding it takes three facts, one correction and a division. Here is exactly how it works, and why the birth time matters more than people expect.',
    sections: [
      {
        h: 'What you need',
        p: [
          'You need your date of birth, your time of birth, and the place of birth (or at least its time zone). The date tells you roughly where the Moon was; the time and place pin it down to the minute. Because the Moon moves about half a degree an hour, an error of two hours moves it a full degree, which is enough to cross a boundary.',
          'Use the ordinary solar (Gregorian) date. If your family records your birthday in the lunar calendar, convert it first. A lunar date entered as if it were solar will put the Moon weeks away from its real position.',
        ],
      },
      {
        h: 'Step 1: where was the Moon?',
        p: [
          'The first step is astronomical. From the date, time and place, an ephemeris (a table of planetary positions) gives the Moon\'s longitude: its position along the zodiac, from 0 to 360 degrees. Modern software does this with high precision using the same astronomical models observatories use.',
          'At this stage the longitude is tropical, measured from the spring equinox, which is how Western astrology and astronomy measure it.',
        ],
      },
      {
        h: 'Step 2: the sidereal correction',
        p: [
          'Vedic astrology measures from a fixed point among the stars instead of the equinox. The difference between the two, the ayanamsa, is about 24.2 degrees today and grows by roughly one degree every 72 years. Subtracting it from the tropical longitude gives the sidereal longitude, the Moon\'s position in the Vedic zodiac.',
          'Several ayanamsa values exist. This site uses Lahiri (Chitrapaksha), the Indian government standard. Others, such as Raman or Krishnamurti, differ by a fraction of a degree to about a degree and a half, which can change the birth star for people born near a boundary.',
        ],
      },
      {
        h: 'Step 3: divide by 13°20′',
        p: [
          'Each birth star spans 13 degrees 20 minutes (13.333 degrees). Divide the Moon\'s sidereal longitude by 13.333, round down, and add one: that is the number of your birth star, counting from Ashwini as 1 to Revati as 27.',
          'For example, a sidereal Moon at 100 degrees gives 100 ÷ 13.333 = 7.5. Round down to 7, add one, and you get star number 8, Pushya, which runs from 93°20′ to 106°40′. The fraction left over tells you how far through the star the Moon had travelled, here about halfway. That fraction is used twice more: to find the pada and to work out how much of the first dasha period remains at birth.',
        ],
      },
      {
        h: 'Step 4: the pada',
        p: [
          'Each star divides into four padas of 3 degrees 20 minutes. In the example above, the Moon is 6°40′ into Pushya, which is exactly two padas in, so it falls in the third pada. Each pada carries a naming syllable and maps to a sign in the navamsa chart, which adds a layer of detail to the reading.',
        ],
      },
      {
        h: 'If you do not know your birth time',
        p: [
          'Without a time, the usual convention is to assume noon, which places the Moon within about six and a half degrees of its true position. On most days the Moon stays in one star the whole day, so the result is right. But the Moon spends roughly a day in each star and the changeover can happen at any hour, so for about one person in four the star changes at some point during their birth day.',
          'Some practical ways to narrow it down: birth certificates in many countries record the time; hospitals sometimes keep records; parents often remember whether it was morning or night, which halves the uncertainty. If you cannot find out, read both possible stars and see which description fits. This site shows a provisional result and tells you when your birth day straddles two stars.',
        ],
      },
      {
        h: 'Why it is worth getting right',
        p: [
          'The birth star sets more than a personality description. It decides the first planet of your dasha sequence and therefore the timing of every chapter afterwards. It is the main input to compatibility matching. And it is the basis for choosing auspicious days in the traditional calendar. A wrong star shifts all of these at once, which is why a few minutes spent finding your birth time pays off.',
        ],
      },
      {
        h: 'Checking your result',
        p: [
          'The easiest independent check is a printed or online panchang, the traditional Indian almanac. For every day it lists the birth star the Moon occupies and the time at which it changes. If your birth time falls before the change, you have the earlier star; if after, the later one. Be sure the panchang is set for the time zone of your birthplace.',
          'Two technical traps catch many people. The first is daylight saving time. Several countries have used it in some years and not others; South Korea, for example, observed it in 1987 and 1988, and earlier in some years between 1948 and 1960. A birth time recorded during daylight saving is one hour ahead of standard time, which moves the Moon about half a degree. The second is births abroad: always use the local time and place of birth, not the time in your home country.',
          'If two sites still disagree after these checks, the difference is almost always the ayanamsa. Compare the Moon\'s sidereal longitude on both: a gap of about one degree or more points to a different ayanamsa rather than an error.',
        ],
      },
    ],
    related: ['/birth', '/guides/nakshatra-padas', '/guides/what-is-ayanamsa', '/tradition/nakshatra', '/guides/gandanta'],
  },
  {
    slug: 'nakshatra-padas',
    title: 'The Four Padas of a Birth Star: What Your Quarter Means',
    description: 'Each of the 27 birth stars divides into four padas, making 108 in all. How padas are calculated, how they link to the navamsa chart, and how to read your own.',
    lede: 'Two people can share a birth star and still feel very different. One reason is the pada: each star is divided into four quarters, and the quarter the Moon occupied shifts the emphasis of the whole star.',
    sections: [
      {
        h: '27 × 4 = 108',
        p: [
          'Each birth star spans 13°20′, and each pada spans a quarter of that, 3°20′. With 27 stars and four padas each, the zodiac holds 108 padas. The number 108 runs through Indian tradition: there are 108 beads on a japa mala, 108 names in many devotional lists, and the 108 padas are often said to be one of its sources.',
          'Because 3°20′ goes into a 30-degree sign exactly nine times, every sign holds nine padas. That simple arithmetic is what links the padas to the navamsa, the most important divisional chart in Jyotish.',
        ],
      },
      {
        h: 'Padas and the navamsa chart',
        p: [
          'The navamsa (D9) divides each sign into nine parts and assigns each part a sign of its own. Each of those parts is exactly one pada. The sequence starts at Aries for the first pada of Ashwini and continues through the zodiac without breaking: Ashwini\'s four padas fall in the Aries, Taurus, Gemini and Cancer navamsas; Bharani\'s in Leo, Virgo, Libra and Scorpio; and so on. After 108 padas the sequence has gone around the twelve signs exactly nine times.',
          'The navamsa sign of your Moon\'s pada is therefore a second sign for your Moon. Astrologers read it as the inner, more mature expression of the Moon, and as a key factor in marriage and in the second half of life. When a planet\'s navamsa sign is the same as its main sign, it is called vargottama and is considered especially strong and consistent.',
        ],
      },
      {
        h: 'The four aims: a common way to read padas',
        p: [
          'A widely used reading links the four padas of every star to the four aims of life in Indian thought. The first pada is dharma, purpose and right action; the second is artha, material security and practical achievement; the third is kama, desire, pleasure and relationships; the fourth is moksha, release, reflection and letting go.',
          'Read this way, the pada tells you where the star\'s energy naturally points. Someone in the first pada of a star tends to express its qualities through a sense of duty or calling; someone in the fourth pada of the same star expresses them more inwardly, often with an interest in spirituality, research or endings. This is a reading convention rather than a classical rule, but it is a useful first lens.',
        ],
      },
      {
        h: 'An example: the four padas of Rohini',
        p: [
          'Rohini, the Moon\'s favourite star, sits entirely in Taurus and is ruled by the Moon. Its first pada falls in the Aries navamsa and gives Rohini\'s creativity a bold, initiating edge. The second falls in Taurus, making it doubly Taurean and vargottama: steady, sensual and focused on building comfort. The third falls in Gemini, adding curiosity, talk and a lighter touch. The fourth falls in Cancer, bringing Rohini\'s nurturing side to the front, with strong attachment to home and family.',
          'All four are recognisably Rohini, fertile, attractive and growth-oriented, but they lean in different directions. That is the right way to think about padas: not as four separate types, but as four tilts of the same star.',
        ],
      },
      {
        h: 'Padas in daily practice',
        p: [
          'Padas are used for more than personality. Each carries a naming syllable, and many families still choose a baby\'s name to begin with the syllable of the Moon\'s pada. Padas are used to time the start of each dasha sub-period precisely. In muhurta, the choice of auspicious times, some activities are favoured or avoided in particular padas. And in compatibility, a classical cancellation of nadi dosha applies when two people share a birth star but sit in different padas.',
        ],
      },
      {
        h: 'Finding your own pada',
        p: [
          'Your pada depends on the Moon\'s exact position within your star, so it needs a birth time to be reliable. The Moon moves through one pada in about six hours, so even a rough time (morning, afternoon, evening, night) is often enough. With no time at all, the star itself may be right while the pada is a guess.',
          'Once you know your pada, look up its navamsa sign and read it as the second voice of your Moon: the direction your emotional nature matures toward with age.',
        ],
      },
      {
        h: 'Padas and your first dasha',
        p: [
          'Your pada also tells you, roughly, how much of your first dasha period was left at birth. The first period belongs to the ruler of your birth star, and the portion remaining is proportional to how much of the star the Moon still had to cross. Each pada is a quarter of the star, so each pada corresponds to a quarter of that planet\'s years.',
          'Take Pushya, ruled by Saturn, whose period is 19 years. A Moon in the first pada of Pushya leaves between about 14 and 19 years of Saturn at birth; the second pada, between about 9.5 and 14; the third, about 4.75 to 9.5; the fourth, less than 4.75. So two people born under Pushya a day apart may enter their Mercury period, the next in the sequence, more than ten years apart. This is one reason the pada, and therefore the birth time, matters so much for timing.',
          'Stars with long-period rulers, such as Venus (20 years), Rahu (18) and Saturn (19), show the biggest differences between padas. Stars ruled by the Sun (6 years) show the smallest.',
        ],
      },
    ],
    related: ['/guides/find-your-nakshatra', '/tradition/nakshatra', '/guides/gandanta', '/birth'],
  },
  {
    slug: 'what-is-ayanamsa',
    title: 'What Is Ayanamsa? The 24-Degree Gap Between Western and Vedic Astrology',
    description: 'Why Vedic and Western zodiacs are about 24 degrees apart, what precession is, the competing ayanamsa values (Lahiri, Raman, KP, Fagan-Bradley), and which this site uses.',
    lede: 'If your Vedic sign is one back from your Western sign, the reason has a name: ayanamsa. It is the gap between a zodiac tied to the seasons and a zodiac tied to the stars, and it grows a little every year.',
    sections: [
      {
        h: 'Two ways to start a circle',
        p: [
          'Any zodiac needs a starting point, a place to call 0 degrees Aries. Western astrology uses the spring equinox, the moment each March when the Sun crosses the celestial equator heading north. This is the tropical zodiac, tied to the seasons: Aries always begins on the first day of spring in the northern hemisphere.',
          'Vedic astrology uses a fixed point among the stars instead. This is the sidereal zodiac, tied to the constellations: Aries always begins at the same place against the background of the stars. Around two thousand years ago the two starting points coincided. They have been drifting apart ever since.',
        ],
      },
      {
        h: 'Why they drift: precession',
        p: [
          'The Earth spins like a top, and like a top its axis slowly wobbles, tracing a circle in the sky. One full wobble takes about 25,800 years. As the axis moves, the point where the equinox falls slides backward against the stars by about 50 arc-seconds a year, or one degree every 72 years.',
          'The tropical zodiac moves with the equinox, so it slides too. The sidereal zodiac stays put. The difference between them, the ayanamsa, is therefore growing: about 23.9 degrees in 2000, about 24.2 degrees today, and it will reach 25 degrees later this century.',
        ],
      },
      {
        h: 'The competing values',
        p: [
          'Everyone agrees on the rate of precession. The disagreement is about the starting year, the moment when the two zodiacs coincided, and therefore about the exact size of the gap today. Different choices produce different ayanamsas.',
          'Lahiri, also called Chitrapaksha, fixes the star Spica (Chitra in Sanskrit) at exactly 0 degrees Libra. It was adopted by the Indian government\'s Calendar Reform Committee in the 1950s and is the standard in most Indian almanacs and software. Raman ayanamsa, used by followers of B. V. Raman, is about one and a half degrees smaller. Krishnamurti (KP) ayanamsa, used in the KP system, differs from Lahiri by only a few arc-minutes. Fagan-Bradley, used by Western sidereal astrologers, is about one degree larger than Lahiri.',
        ],
        list: [
          'Lahiri (Chitrapaksha): about 24.2° today. Indian standard. Used on this site.',
          'Krishnamurti (KP): a few arc-minutes from Lahiri.',
          'Raman: about 1.5° less than Lahiri.',
          'Fagan-Bradley: about 1° more than Lahiri. Western sidereal.',
        ],
      },
      {
        h: 'When the choice matters',
        p: [
          'For most people the choice of ayanamsa makes no difference to the sign, and little difference to the birth star. A one-degree change moves the Moon about seven percent of the way across a birth star. But for someone whose Moon is near a boundary, a different ayanamsa can change the star, the pada, the first dasha planet and the timing of every later period.',
          'This is the main reason two Vedic sites can give different results for the same birth data. If yours disagree, check which ayanamsa each uses before assuming one has made a mistake.',
        ],
      },
      {
        h: 'Which one is "correct"?',
        p: [
          'There is no astronomical answer, because the question is not astronomical. The sidereal zodiac\'s starting point is a matter of convention, and each ayanamsa represents a reasoned choice about where the tradition intended it to be. Lahiri has the advantage of being anchored to a bright, easily identified star and of being the most widely shared standard, so results based on it can be compared across almanacs, astrologers and software.',
          'The tropical zodiac is not "wrong" either. It answers to the seasons rather than the stars, and Western astrology built its meanings on that basis. The two systems are best thought of as two rulers laid on the same sky.',
        ],
      },
      {
        h: 'What this means for you',
        p: [
          'Practically, the ayanamsa explains three things. First, why your Vedic signs (Sun, Moon and ascendant) are usually one sign back from the Western ones. Second, why your birth star might differ between sites. Third, why the gap will slowly widen: in a few centuries most Western Aries will be Vedic Pisces with a few degrees to spare.',
          'If you are curious, the easiest way to see the effect is to compare your Western and Vedic charts side by side. The planets keep their relationships to one another; the whole chart simply rotates by about 24 degrees.',
        ],
      },
      {
        h: 'A short history',
        p: [
          'Precession was measured in the Greek world by Hipparchus in the second century BCE, who compared his star positions with older records and found that the equinox had shifted. Indian astronomical texts such as the Surya Siddhanta discuss the motion of the equinoxes as well, although some described it as an oscillation back and forth rather than a steady drift. Medieval Indian astronomers corrected their calculations for this motion when computing the positions of the planets against the stars.',
          'By the twentieth century, different Indian almanacs used different corrections, so the same festival could fall on different days in different regions. In the 1950s the Indian government\'s Calendar Reform Committee, chaired by the physicist Meghnad Saha, recommended a single national standard. The value adopted, associated with the committee member N. C. Lahiri, became the Lahiri ayanamsa. It is still the reference for the official Indian national calendar and for most almanacs today.',
        ],
      },
    ],
    related: ['/compare/western', '/guides/moon-sign-vs-sun-sign', '/guides/find-your-nakshatra', '/compare/saju'],
  },
]
