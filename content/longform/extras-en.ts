/**
 * Long-form additions to the six existing articles, English.
 * Keyed by base path. Each entry adds sections the article did not cover and a "read next" list.
 */
import type { LongSection } from './types'

export interface ArticleExtra {
  sections: readonly LongSection[]
  related: readonly string[]
}

export const ARTICLE_EXTRA_EN: Record<string, ArticleExtra> = {
  '/tradition/nakshatra': {
    sections: [
      {
        h: 'How 27 stars fit into 12 signs',
        p: [
          'The zodiac is 360 degrees. Divide it by 12 and each sign is 30 degrees; divide it by 27 and each birth star is 13 degrees 20 minutes. That means every sign holds exactly two and a quarter birth stars, and the boundaries line up every three stars. Ashwini, Bharani and the first quarter of Krittika make up Aries; the rest of Krittika, Rohini and half of Mrigashira make up Taurus, and so on around the circle.',
          'This is why a Vedic astrologer can tell you both your Moon sign (rashi) and your birth star, and why two people with the same Moon sign can have very different stars. The sign gives the broad climate; the star gives the specific landscape inside it. Most of the personal detail in a Vedic reading comes from the star.',
        ],
      },
      {
        h: 'The seven natures: why some stars are "sharp" and others "soft"',
        p: [
          'Besides temperament, animal and energy type, classical texts sort the 27 stars into seven natures used mainly for choosing auspicious times (muhurta). Fixed stars (dhruva), such as Rohini and the three Uttaras, favour things meant to last: foundations, marriages, planting. Movable stars (chara), such as Swati and Shravana, favour travel and change. Swift stars (kshipra), like Ashwini and Hasta, suit quick tasks, trade and medicine.',
          'Soft stars (mridu), like Mrigashira, Chitra, Anuradha and Revati, favour art, friendship and romance. Sharp stars (tikshna), like Ardra, Ashlesha, Jyeshtha and Mula, were reserved for confrontations, separations and difficult cuts. Fierce stars (ugra), such as Bharani, Magha and the three Purvas, suit bold and destructive acts, and mixed stars (mishra), Krittika and Vishakha, combine qualities. Your own birth star\'s nature is a useful hint about the kind of work that comes to you easily.',
        ],
      },
      {
        h: 'Naming syllables',
        p: [
          'Each of the 108 padas carries a sound, and many Indian families still choose a child\'s name to begin with the syllable of the pada the Moon occupied at birth. Ashwini\'s four padas, for example, give the sounds chu, che, cho and la; Rohini\'s give o, va, vi and vu. This practice, called nama nakshatra, is one of the most visible ways the birth star system survives in daily life.',
          'The syllables also explain why a person is sometimes said to have a "name star" different from their birth star: if the name begins with a sound belonging to another star, some astrologers read that star alongside the birth star for questions that involve the public or reputation.',
        ],
      },
      {
        h: 'Birth star, ascendant star and the stars of other planets',
        p: [
          'Your birth star is the star of the Moon, but every planet in your chart also sits in a star, and so does the ascendant (the degree rising on the eastern horizon). Advanced readings look at all of them. The ascendant\'s star describes the body and the way you meet the world; the Sun\'s star says something about your sense of purpose; the star of the planet ruling your current dasha colours the period you are living through.',
          'The Moon\'s star still comes first, because the mind is the lens through which everything else is experienced, and because it sets the dasha sequence. That is the star this site calculates for you, and the one the compatibility system compares between two people.',
        ],
      },
    ],
    related: ['/guides/find-your-nakshatra', '/guides/nakshatra-padas', '/guides/gandanta', '/tradition/ashtakoota', '/birth'],
  },
  '/tradition/navagraha': {
    sections: [
      {
        h: 'Natural benefics and natural malefics',
        p: [
          'Jyotish divides the nine into two camps. Jupiter and Venus are the natural benefics: they protect, expand and soften. A bright, waxing Moon and a Mercury that is not joined with malefics also count as benefic. Saturn, Mars, Rahu and Ketu are natural malefics, and the Sun is a mild malefic because its heat dries and separates. A waning Moon near new is treated as malefic as well.',
          '"Malefic" does not mean bad. It means the planet works through friction, effort and loss, which is why malefics are often welcome in the growth houses (3rd, 6th, 10th, 11th), where struggle turns into results. Benefics, in turn, can be too comfortable in those houses. Every reading weighs a planet\'s nature against the house it rules and the house it occupies.',
        ],
      },
      {
        h: 'How planets look at each other: aspects (drishti)',
        p: [
          'In Vedic astrology every planet aspects the sign seventh from it, the sign directly opposite. Three planets have extra aspects. Mars also aspects the 4th and 8th signs from itself, Jupiter the 5th and 9th, and Saturn the 3rd and 10th. Rahu and Ketu are often given Jupiter-like 5th and 9th aspects as well, though schools differ.',
          'Aspects matter because they let a planet influence houses it does not occupy. Jupiter\'s aspect on a troubled house is one of the classic forms of protection; Saturn\'s aspect on the Moon is one of the classic sources of heaviness. When astrologers say a planet is "strong" or "afflicted", they usually mean the combination of its sign, its house and the aspects it receives.',
        ],
      },
      {
        h: 'Significators: what each planet speaks for',
        p: [
          'Each planet is a karaka, a natural significator, for certain parts of life regardless of where it falls. The Sun signifies the father and authority; the Moon, the mother and the mind; Mars, siblings, courage and land; Mercury, intellect and trade; Jupiter, children, teachers and wisdom; Venus, spouse, comfort and art; Saturn, longevity, work and hardship; Rahu, foreign things and ambition; Ketu, detachment and liberation.',
          'Reading a topic therefore means looking at two things at once: the house that governs it and the planet that signifies it. Marriage, for example, is read through the 7th house and through Venus (and Jupiter in a woman\'s chart in traditional texts). Children are read through the 5th house and Jupiter.',
        ],
      },
      {
        h: 'Retrograde and combust planets',
        p: [
          'Seen from Earth, the planets from Mars outward appear to move backward for a few months each year. Vedic astrology treats retrograde (vakri) planets as unusually strong but working in an unconventional, inward or delayed way. The Sun and Moon never go retrograde; Rahu and Ketu always move backward.',
          'A planet very close to the Sun is called combust (asta) and is said to lose some of its independent strength, like a candle near a bonfire. Mercury and Venus are often combust because they never stray far from the Sun. Classical texts treat combustion seriously, but most modern astrologers read it as a planet that serves the self rather than one that has disappeared.',
        ],
      },
    ],
    related: ['/graha/surya', '/graha/chandra', '/graha/guru', '/graha/shani', '/tradition/dasha', '/guides/vedic-remedies'],
  },
  '/tradition/dasha': {
    sections: [
      {
        h: 'Periods within periods: antardasha',
        p: [
          'Each major period (mahadasha) divides into nine sub-periods (antardasha), one for each planet, in the same fixed order, starting with the ruler of the major period itself. The length of each sub-period follows a simple rule: multiply the years of the major period by the years of the sub-period planet and divide by 120.',
          'Take the Venus major period of 20 years. Its first sub-period, Venus–Venus, lasts 20 × 20 ÷ 120 = 3 years and 4 months. Venus–Sun lasts 20 × 6 ÷ 120 = 1 year. Venus–Moon lasts 20 × 10 ÷ 120 = 1 year and 8 months. The nine sub-periods always add back up to the full 20 years. Sub-periods divide again into pratyantardashas, which is how astrologers narrow timing down to months or weeks.',
        ],
      },
      {
        h: 'How a period is judged',
        p: [
          'The ruling planet\'s name tells you the theme of a period; its condition in your chart tells you how that theme will feel. Astrologers look at four things. First, the planet\'s dignity: exalted, in its own sign, in a friend\'s sign, or debilitated. Second, the houses it rules and the house it occupies, since a planet delivers the results of both. Third, its relationship to the Moon and to the ascendant. Fourth, which planets aspect or accompany it.',
          'This is why two people in the same Saturn period can have opposite experiences. For one, Saturn rules the 10th house and sits exalted, and the period builds a career. For another, Saturn rules the 8th and sits debilitated, and the period is a long lesson in endurance. The dasha is a clock; the birth chart decides what the clock strikes.',
        ],
      },
      {
        h: 'Dasha junctions',
        p: [
          'The months around the change from one major period to the next are called dasha sandhi, the junction. People often describe them as unsettled: the old chapter has lost its energy and the new one has not yet taken shape. Many astrologers advise against making irreversible decisions in the last months of a period and suggest using that time to finish and clear rather than to begin.',
          'Junctions between planets that are enemies, such as the change from Saturn to Mercury or from Rahu to Jupiter, are said to be felt more strongly than those between friends. Knowing the date of your next junction is one of the most practical things a dasha chart gives you.',
        ],
      },
      {
        h: 'Other dasha systems',
        p: [
          'Vimshottari is by far the most widely used system, but it is not the only one. Yogini dasha runs on a much shorter cycle of 36 years, divided among eight yoginis, and is often used as a second opinion. Ashtottari dasha uses a 108-year cycle and eight planets, leaving out Ketu, and is preferred by some traditions for certain charts. Chara dasha, from the Jaimini system, runs through the signs rather than the planets.',
          'This site uses Vimshottari because it is the standard in almost every Indian almanac and the one most readers will meet elsewhere. If you visit an astrologer who uses another system, expect different dates, not a contradiction: each system is a different way of dividing the same life into chapters.',
        ],
      },
    ],
    related: ['/guides/reading-your-dasha', '/tradition/navagraha', '/graha/shukra', '/graha/shani', '/birth'],
  },
  '/tradition/ashtakoota': {
    sections: [
      {
        h: 'Why 18 is the traditional threshold',
        p: [
          'Out of 36 points, 18 is half, and traditional matchmakers have long used it as the line between an acceptable and a difficult match. Scores of 18 to 24 are generally called workable, 25 to 32 good, and above 32 excellent. Below 18 the tradition does not say a marriage will fail; it says the couple should look closely at the low items and at the rest of the two charts before deciding.',
          'In practice, very high scores are rarer than people expect, and many long, happy marriages sit in the low or middle twenties. The score is a summary of eight comparisons between two Moons, not a measure of love, character or effort. That is why this site names the weakest item first: the useful question is not "how many points?" but "where do we need to take care?"',
        ],
      },
      {
        h: 'Nadi and Bhakoot, the two heavy items',
        p: [
          'Nadi (8 points) and Bhakoot (7 points) together make up 15 of the 36 points, so a zero in either changes the total dramatically. Nadi compares the energy type of the two birth stars: Adi, Madhya or Antya. When both people share the same type, Nadi scores zero, a condition called nadi dosha, traditionally linked to health and children.',
          'Bhakoot compares the two Moon signs. When the signs are 2 and 12, 5 and 9, or 6 and 8 positions apart, Bhakoot scores zero, a condition called bhakoot dosha, traditionally linked to finances, family harmony and the practical life of the household. Classical texts list several cancellations for both doshas, for example when the two Moon signs share the same ruling planet or when the ruling planets are friends. Astrologers disagree on how many of these cancellations to accept.',
        ],
      },
      {
        h: 'What astrologers check beyond the 36 points',
        p: [
          'A full traditional match does not stop at Ashtakoota. Astrologers usually also look at Mars (manglik status) in both charts, the condition of the 7th house and its ruler, the strength of Venus and Jupiter, and whether the two people\'s dasha periods support each other in the years ahead. The detailed report on this site includes a ten-year comparison of both dasha sequences for that reason.',
          'In South India a different method, the ten-porutham system, is common, and it weighs some factors differently. Ashtakoota is the North Indian standard and the one most widely used in apps and almanacs, which is why it is the method used here.',
        ],
      },
      {
        h: 'Why this site asks no gender and averages both directions',
        p: [
          'Several items in the traditional calculation are asymmetric: they count from the bride\'s star to the groom\'s, and the result changes if you swap the two. That made sense for arranged marriages with fixed roles, but it produces strange results for couples who do not fit that template, and it means the order in which two names are typed can change the score.',
          'To avoid this, the calculation here runs in both directions and takes the average. Two people get the same result whoever is entered first, and no one has to choose a role. The trade-off is that totals can end in .5, which a traditional table would never show.',
        ],
      },
    ],
    related: ['/guides/compatibility-score-explained', '/tradition/nakshatra', '/guides/moon-sign-vs-sun-sign'],
  },
  '/compare/saju': {
    sections: [
      {
        h: 'What the two systems share',
        p: [
          'For all their differences, Saju and Jyotish grew from the same instinct: that the sky at the moment of birth is a calendar, and that time itself has qualities. Both convert a birth moment into a small set of symbols. Both read life in chapters, through luck pillars in Saju and dasha periods in Jyotish. Both match two people by comparing their symbols, and both offer remedies through colours, directions and days.',
          'They even share a five-part model of nature. Saju\'s five elements (wood, fire, earth, metal, water) and the Indian five elements (earth, water, fire, air, ether) are different lists, but both describe the world as a balance of qualities rather than a set of fixed things.',
        ],
      },
      {
        h: 'A common confusion: the lunar calendar',
        p: [
          'Many Koreans assume Saju is based on the lunar calendar because birthdays are often given in eumnyeok. In fact Saju months are set by the 24 solar terms, which follow the Sun. The lunar date is only a convenient way to look up the pillars. Vedic astrology, despite being built on the Moon\'s position, does not use the lunar calendar either; it uses the actual position of the Moon among the stars at the moment of birth.',
          'So when you enter a birthday on this site, use the ordinary solar (Gregorian) date. If you only know your lunar birthday, convert it first; a lunar date entered as solar will put the Moon in the wrong place.',
        ],
      },
      {
        h: 'Which questions each answers well',
        p: [
          'Because Saju reads the balance of elements in four pillars, it is especially rich on temperament, the elements you lack or have in excess, and the rhythm of good and difficult ten-year spans. Because Jyotish reads the Moon\'s star, it is especially rich on emotional nature, the mythology of the self, and timing through planetary periods of unequal length.',
          'Many people find it useful to read both and notice where they agree. When two unrelated systems point at the same theme, such as a late-blooming career or a need for independence in relationships, it is at least worth reflecting on. When they disagree, it is a reminder that both are lenses rather than verdicts.',
        ],
      },
      {
        h: 'Using this site alongside a Saju reading',
        p: [
          'If you already know your Saju, a good way to start here is with the birth star and the guardian planet. The birth star is the closest Vedic equivalent to the "day master" in Saju: the single symbol that most people identify with. The guardian planet, set by the day of the month, needs no birth time at all and is a light, everyday reading.',
          'If you know your birth time, the dasha chart is the most interesting point of comparison, because it gives a second map of the same life\'s chapters, cut in different places.',
        ],
      },
    ],
    related: ['/compare/western', '/tradition/dasha', '/guides/what-is-ayanamsa', '/birth'],
  },
  '/compare/western': {
    sections: [
      {
        h: 'What stays the same',
        p: [
          'The two systems share more than the shift suggests. They use the same twelve signs in the same order with broadly the same meanings: Aries is still initiating, Taurus still steady, Libra still relational. The seven visible planets have similar meanings too. Both divide the chart into twelve houses that govern the same areas of life, from self in the 1st to loss and release in the 12th.',
          'What changes is where the signs begin, which planet is read first, and how time is handled. Western astrology times events mainly through transits and progressions; Vedic astrology uses the dasha periods as its main clock and transits as a secondary layer.',
        ],
      },
      {
        h: 'No Uranus, Neptune or Pluto',
        p: [
          'Classical Jyotish uses only the planets visible to the naked eye plus the two lunar nodes, Rahu and Ketu. Uranus, Neptune and Pluto, discovered after the telescope, are not part of the traditional system. Some modern Vedic astrologers note them, but they are not used for rulerships, dashas or compatibility.',
          'In their place, Rahu and Ketu carry many of the themes Western astrologers give the outer planets: sudden change, obsession, the foreign and the spiritual. If you are used to reading Pluto, look at Ketu and the 8th house in a Vedic chart.',
        ],
      },
      {
        h: 'Your ascendant moves too',
        p: [
          'The 24-degree shift applies to every point in the chart, not just the Sun. That means your rising sign usually changes as well, since the ascendant is measured against the same zodiac. A Western Virgo rising often becomes a Vedic Leo rising. Because the rising sign sets which sign falls in each house, the whole house layout can look different, even though the actual sky has not changed.',
          'If a Western reading never felt quite right and a Vedic one does, or the reverse, this is often the reason: the two are describing the same sky with two different rulers laid on top of it.',
        ],
      },
      {
        h: 'So which one is right?',
        p: [
          'Neither system is "wrong"; they answer to different references. The tropical zodiac is tied to the seasons, so Aries always begins at the spring equinox. The sidereal zodiac is tied to the stars, so Aries always begins at the same point among the constellations. Both are internally consistent, and both have centuries of interpretation built on top of them.',
          'The more important difference for most readers is not the sign but the starting point. Western astrology begins with the Sun; Vedic astrology begins with the Moon and its birth star. If you want to see how the Vedic view describes you, start with the Moon.',
        ],
      },
    ],
    related: ['/guides/moon-sign-vs-sun-sign', '/guides/what-is-ayanamsa', '/compare/saju', '/birth'],
  },
}
