import type { Articles } from './articles-ko'

/** Long-form article copy — English. Shape enforced by the Korean original. */
export const articlesEn: Articles = {
  western: {
    metaTitle: 'Your Zodiac Sign in Vedic Astrology',
    metaDescription:
      "A Western Leo often comes out as Cancer in Vedic astrology. The two systems measure the sky from points about 24° apart. Here is what each of the 12 signs usually becomes in Vedic.",
    ogDescription: 'Leo in Western, Cancer in Vedic. The starting points are 24° apart.',
    eyebrow: 'Western vs Vedic',
    h1a: 'Your zodiac sign,',
    h1b: 'in Vedic astrology',
    lede1: 'You are a Leo in Western astrology and a Cancer in Vedic. Nothing was miscalculated.',
    lede2:
      'The two systems disagree about where 0° of the sky is. The gap is now about 24°, and each sign spans 30° — so most people shift back by one sign.',

    whyTitle: 'Why it shifts',
    whyA:
      'Western astrology puts 0° Aries at the spring equinox — the point where the Sun crosses the equator going north. That convention was set about two thousand years ago.',
    whyB:
      "But Earth's axis wobbles like a spinning top, one full turn every 26,000 years or so. The equinox drifts backward against the actual constellations a little each year. Today it sits near Pisces, not Aries.",
    whyC:
      'Western astrology keeps the original convention (the tropical zodiac). Vedic astrology follows the real positions of the stars (the sidereal zodiac). The correction between them is called the ',
    whyD: 'ayanamsa',
    whyE: ', and it is currently about 24.2°.',
    note: 'This service uses the Lahiri (Chitrapaksha) ayanamsa, the Indian government standard.',

    tableTitle: 'Conversion table for the 12 signs',
    tableSub:
      'If your birthday falls early in a sign (near the boundary), you shift back one sign. Later in the sign, you may stay. The exact answer needs your birth time.',
    colWestern: 'Western sign',
    colDates: 'Dates',
    colVedic: 'Vedic',
    signs: [
      { western: 'Aries', dates: 'Mar 21 – Apr 19', vedic: 'Pisces – Aries' },
      { western: 'Taurus', dates: 'Apr 20 – May 20', vedic: 'Aries – Taurus' },
      { western: 'Gemini', dates: 'May 21 – Jun 21', vedic: 'Taurus – Gemini' },
      { western: 'Cancer', dates: 'Jun 22 – Jul 22', vedic: 'Gemini – Cancer' },
      { western: 'Leo', dates: 'Jul 23 – Aug 22', vedic: 'Cancer – Leo' },
      { western: 'Virgo', dates: 'Aug 23 – Sep 22', vedic: 'Leo – Virgo' },
      { western: 'Libra', dates: 'Sep 23 – Oct 22', vedic: 'Virgo – Libra' },
      { western: 'Scorpio', dates: 'Oct 23 – Nov 21', vedic: 'Libra – Scorpio' },
      { western: 'Sagittarius', dates: 'Nov 22 – Dec 21', vedic: 'Scorpio – Sagittarius' },
      { western: 'Capricorn', dates: 'Dec 22 – Jan 19', vedic: 'Sagittarius – Capricorn' },
      { western: 'Aquarius', dates: 'Jan 20 – Feb 18', vedic: 'Capricorn – Aquarius' },
      { western: 'Pisces', dates: 'Feb 19 – Mar 20', vedic: 'Aquarius – Pisces' },
    ],

    moonTitle: 'The bigger difference: the Moon, not the Sun',
    moonA:
      'The one-sign shift is not even the important part. When Western astrology asks "what sign are you?", it means the ',
    moonB: 'Sun',
    moonC: '. Vedic astrology answers the same question with the ',
    moonD: 'Moon',
    moonE: '.',
    moonF:
      'The Sun stays in a sign for about a month, so everyone born in the same month shares a sign. The Moon moves 13° a day and changes section every two and a half days. And India divides that path into 27 sections, not 12.',
    moonG:
      'So the base types in Vedic astrology number 27, not 12, and people born on the same day split by the hour. That is why this service asks for your birth time.',

    whichTitle: 'So which one is right?',
    whichA:
      'Neither is wrong; they measure different things. A Western sign says "where in the season," a Vedic sign says "where among the actual stars." Both systems have been in use for over two thousand years.',
    whichB:
      'Vedic is simply the less familiar one, so it tends to say things you have not heard before — the same reason a new system often surfaces new material.',

    cta: 'Find my Vedic birth star',
    ctaSub: 'Just your date of birth. 30 seconds.',
    crumb: 'Western vs Vedic',
    faq: 'Frequently asked',
    faqItems: [
      {
        q: 'So what is my real sign?',
        a: 'Both are real. Western gives you a season-based sign, Vedic a star-based one. They use different coordinate systems; neither is an error. Within Vedic astrology, though, the Sun sign matters less than the birth star — which of 27 lunar sections the Moon occupied.',
      },
      {
        q: 'What about Ophiuchus, the 13th sign?',
        a: 'That comes from redrawing sign boundaries by astronomical constellation borders, which puts 13 constellations on the ecliptic. Astrology divides the sky into 12 equal parts, so it never matched the real constellation sizes to begin with. Vedic astrology also uses 12 equal parts — plus a 27-part division on top.',
      },
      {
        q: 'Can I convert without a birth time?',
        a: 'The Sun sign is nearly certain without a time; only births on a boundary day need it. The 27 birth stars are a different matter — they follow the Moon, so without a time about one in four would differ.',
      },
    ],
  },

  ashtakoota: {
    metaTitle: 'Ashtakoota 36 — Traditional Indian Compatibility',
    metaDescription:
      'The compatibility method actually used when marriages are discussed in India. Eight items carry fixed weights from 1 to 8 points, so you can see exactly how the total was built.',
    ogDescription: 'Eight items, 36 points. A compatibility score you can take apart.',
    eyebrow: 'Tradition · Ashtakoota',
    h1: 'Ashtakoota 36',
    lede1: 'The method actually used when marriages are discussed in India. Eight items, each with a fixed weight.',
    lede2:
      'What sets it apart is transparency. Instead of "you match well," it says which of eight items scored what. So a low item tells you exactly what to handle with care.',

    howTitle: 'How it is calculated',
    howA:
      "All it needs is each person's birth star — one of the 27 sections the Moon occupied. Age, gender, and occupation play no part. Each birth star carries a temperament, an animal symbol, a ruling planet, and an energy type, and the eight items compare those combinations.",
    howB: 'The weights differ by item: the lightest is 1 point, the heaviest 8. They add up to 36.',

    tableTitle: 'The eight items',
    colName: 'Item',
    colMax: 'Points',
    colWhat: 'What it measures',

    bandTitle: 'How to read the score',
    bandSub: 'Tradition treats 18 as the floor. This service, however, does not issue a verdict on marriage.',
    bands: [
      { range: '0 – 17', label: 'Needs a lot of tuning', body: 'Your basic grains differ in many places. Not a "no" — a list of things to agree on.' },
      { range: '18 – 24', label: 'A steady match', body: 'The range tradition treats as the floor. Most couples land here.' },
      { range: '25 – 32', label: 'A good match', body: 'Several axes line up together. It runs without much friction.' },
      { range: '33 – 36', label: 'An excellent match', body: 'Nearly full marks across the board. Genuinely uncommon.' },
    ],

    genderTitle: 'Why we do not ask for gender',
    genderA:
      'Ashtakoota traditionally assigns male and female roles, so the same two people score differently depending on who goes first. Across 150 test pairs, 103 differed — by as much as 2 points.',
    genderB: 'So this service ',
    genderC: 'calculates in both directions and averages',
    genderD:
      ' the result. The score is the same whoever goes first, at the cost of the occasional .5 at the end.',

    cautionTitle: 'What this score is not for',
    cautionA:
      'It does not decide whether to marry. Some calculation libraries in circulation attach verdicts like "Mismatch" even to couples scoring above 18. This service does not use that language.',
    cautionB:
      'Read a low item as "handle this with care," not "you do not match." If Energy (Nadi) overlaps, you tire out together — so take your rest at different times.',

    cta: 'Check our compatibility',
    ctaSub: 'Two dates of birth is all it takes.',
    crumb: 'Ashtakoota',
    faq: 'Frequently asked',
    faqItems: [
      {
        q: 'Is it a no below 18?',
        a: 'Tradition treats 18 as the floor, but that standard comes from an era of arranged matches. What matters more is which of the eight items is low. If Household (Bhakoot) is low, agree on money and living arrangements in advance; if Energy (Nadi) is low, stagger your rest.',
      },
      {
        q: 'What if we do not know our birth times?',
        a: 'It still calculates. But the birth star depends on the Moon, so without a time one of you may land on a different star. In that case the result is marked as provisional.',
      },
      {
        q: 'Why is Manglik (Mars affliction) not shown?',
        a: 'There is a traditional verdict that a certain Mars placement flaws a marriage. Run the numbers and it lands on roughly seven people in ten. At that rate it is not information, only anxiety — so this service leaves it out.',
      },
      {
        q: 'Can I use it with friends or colleagues?',
        a: 'Yes. Because we ask no gender and average both directions, it applies to any pair. The item descriptions, though, are written assuming people who live together.',
      },
    ],
  },
}
