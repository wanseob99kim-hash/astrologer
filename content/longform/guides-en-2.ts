/** Guides 5–8, English. */
import type { Guide } from './types'

export const GUIDES_EN_2: readonly Guide[] = [
  {
    slug: 'reading-your-dasha',
    title: 'Reading Your Dasha: A Practical Guide to Life\'s Planetary Periods',
    description: 'How to read your Vimshottari dasha in practice: finding your current period and sub-period, what to look at for each planet, how to use transitions, and common mistakes.',
    lede: 'Knowing that you are "in your Saturn period" is only the start. The real value of a dasha chart comes from knowing what to look at next. This guide walks through how to read your own periods, step by step.',
    sections: [
      {
        h: 'Start with the two current planets',
        p: [
          'A dasha chart gives you a major period (mahadasha) and, inside it, a sub-period (antardasha). Write both down: for example, "Jupiter–Saturn" means you are in Jupiter\'s sixteen-year period and inside it Saturn\'s sub-period of about two and a half years. The major planet sets the overall theme of the chapter; the sub-period planet sets the tone of the current scene.',
          'When the two planets are friends, the period tends to feel coherent: the scene fits the chapter. When they are enemies, as Jupiter and Venus are, or the Sun and Saturn, the period often feels like two agendas pulling against each other, and many people describe those sub-periods as the most eventful.',
        ],
      },
      {
        h: 'Ask what the planet naturally signifies',
        p: [
          'Each planet carries natural significations regardless of your chart. A Venus period tends to bring relationships, comfort and creative work to the front; a Saturn period, work, responsibility and endurance; a Mercury period, learning, trade and communication; a Rahu period, ambition, foreign connections and sudden change.',
          'This first layer is the one most people can use without an astrologer. Simply asking "what does this planet care about?" and noticing where those themes appear in your life is a good way to see whether the dasha speaks to you at all.',
        ],
      },
      {
        h: 'Then look at its condition in your chart',
        p: [
          'The second layer needs a full birth chart. Look at the planet\'s sign (exalted, own, friendly, enemy or debilitated), the house it occupies and the houses it rules. A planet delivers the results of all three. Saturn ruling the 10th and 11th houses and sitting exalted in Libra gives a very different period from Saturn ruling the 8th and sitting debilitated in Aries.',
          'Look also at the birth star the planet sits in, and at that star\'s ruler. Many astrologers say a planet gives the results of its star lord as much as its own, which is why two Jupiter periods can feel very different depending on whether Jupiter sits in a star of Venus or a star of Ketu.',
        ],
      },
      {
        h: 'Use the transitions',
        p: [
          'The most practical information in a dasha chart is often the dates. Mark the end of your current sub-period and the next change of major period. The months around a change of major period, called dasha sandhi, often feel unsettled. Many people find it useful to plan the end of a period as a time to finish things and the start of the next as a time to begin.',
          'You do not have to take this literally. Even as a planning tool, a calendar of seven-, ten- or twenty-year chapters with known turning points gives a useful sense of perspective: no difficult period lasts forever, and every good period has an end date worth preparing for.',
        ],
      },
      {
        h: 'Look back before looking forward',
        p: [
          'The best way to test a dasha chart is against the past. List the major periods you have already lived through and the dates they changed. Then ask whether those dates match turning points you remember: moves, new jobs, relationships beginning or ending, a change in health or outlook.',
          'If the past fits, the chart is probably calculated correctly and is worth reading forward. If nothing lines up, check the birth time first. A twenty-minute error in birth time can shift the start of every period by months, and an error of a couple of hours can change the first planet altogether.',
        ],
      },
      {
        h: 'Common mistakes',
        p: [
          'The most common mistake is reading a planet\'s period as good or bad because of the planet\'s reputation. Saturn periods are not automatically hard and Jupiter periods are not automatically lucky; the planet\'s condition in your chart decides. The second mistake is ignoring the sub-period. Most specific events correspond to the sub-period planet, not the major one.',
          'The third is treating the dasha as fate. In the tradition, the dasha shows when certain results are ripe to appear, not whether you will respond well to them. The same Saturn period can be spent building something durable or resenting the effort, and that difference is not in the chart.',
        ],
      },
      {
        h: 'A worked example',
        p: [
          'Suppose the Moon was 41 percent of the way through Anuradha at birth. Anuradha is ruled by Saturn, whose period is 19 years, and 59 percent of the star remained, so about 11.2 years of Saturn remained at birth. The sequence then runs in its fixed order: Mercury for 17 years (roughly ages 11 to 28), Ketu for 7 (28 to 35), Venus for 20 (35 to 55), the Sun for 6 (55 to 61), and the Moon for 10 (61 to 71).',
          'Read as a life outline, that is a childhood under Saturn, often remembered as serious or demanding; adolescence and early adulthood under Mercury, a period of study, skill and first work; a short, inward Ketu period in the early thirties, often a time of reassessment; a long Venus period through the middle years, frequently associated with family, property and comfort; and a brief, visible Sun period around retirement age.',
          'None of this says what will happen. It says which themes are likely to be in the foreground and when the foreground is likely to change. The birth chart then says how each of those planets is placed, which is what turns an outline into a reading.',
        ],
      },
    ],
    related: ['/tradition/dasha', '/graha/shani', '/graha/guru', '/tradition/navagraha', '/birth'],
  },
  {
    slug: 'compatibility-score-explained',
    title: 'How to Read a Vedic Compatibility Score (Out of 36)',
    description: 'What an Ashtakoota score out of 36 really tells you: the eight items and their weights, what counts as a good score, the two doshas, and why the weakest item matters more than the total.',
    lede: 'A Vedic compatibility score looks like a grade, and people read it like one. It is more useful to read it like a map: eight comparisons, each with a weight, each pointing to a different part of a shared life.',
    sections: [
      {
        h: 'Where the 36 points come from',
        p: [
          'Ashtakoota means "eight parts". Each part compares one aspect of the two people\'s Moons and has a fixed maximum. The weights rise from 1 to 8, and they add up to 36. Values (Varna) is worth 1 point; Pull (Vashya) 2; Star distance (Tara) 3; Daily rhythm (Yoni) 4; Planet friendship (Graha Maitri) 5; Temperament (Gana) 6; Household (Bhakoot) 7; and Energy (Nadi) 8.',
          'The weights reflect what the tradition considered most important for a lasting marriage. The light items describe how easily two people get along day to day; the heavy items describe health, family and the material life of the household.',
        ],
        list: [
          'Values (Varna) — 1 point: what each of you puts first.',
          'Pull (Vashya) — 2: natural attraction and who leads.',
          'Star distance (Tara) — 3: whether your fortunes rise together.',
          'Daily rhythm (Yoni) — 4: physical and emotional pace.',
          'Planet friendship (Graha Maitri) — 5: how your minds work together.',
          'Temperament (Gana) — 6: basic nature, gentle, practical or forceful.',
          'Household (Bhakoot) — 7: stability and prosperity in shared life.',
          'Energy (Nadi) — 8: constitution and the balance of energies.',
        ],
      },
      {
        h: 'What counts as a good score',
        p: [
          'Traditionally, 18 out of 36 is the threshold of an acceptable match. Scores of 18 to 24 are usually called workable, 25 to 32 good, and 33 to 36 excellent. Most couples land somewhere between 15 and 28. Very high scores are rare, and many long and happy marriages score in the low twenties.',
          'A score below 18 is not a prediction of failure. In the tradition it is a signal to look more closely: at which items are low, at whether a classical cancellation applies, and at the rest of the two birth charts.',
        ],
      },
      {
        h: 'Why the weakest item matters more than the total',
        p: [
          'Two couples can both score 24 and have very different relationships. One might lose its points on Temperament and Daily rhythm, meaning the two people have different natures and need different paces; another might lose them on Household, pointing to friction over money and practical life. The total hides all of that.',
          'That is why this site highlights the weakest item first, scaled by its maximum. A 0 out of 1 on Values is less serious than a 0 out of 8 on Energy, but both say something specific and actionable. The useful question is not "is our score high enough?" but "which part of our life together needs the most care?"',
        ],
      },
      {
        h: 'The two doshas',
        p: [
          'Two zero scores carry special names. Nadi dosha happens when both people have the same energy type (Adi, Madhya or Antya). It is the most discussed condition in Indian matchmaking, traditionally linked to health and children. Bhakoot dosha happens when the two Moon signs are 2 and 12, 5 and 9, or 6 and 8 signs apart, and it is traditionally linked to finances and family harmony.',
          'Classical texts list cancellations for both. Nadi dosha is commonly considered cancelled when the two people share the same birth star but different padas, or the same Moon sign but different stars. Bhakoot dosha is commonly considered cancelled when the two Moon signs have the same ruling planet or rulers that are friends. Astrologers vary in how many cancellations they accept, so the same pair can be read differently by different people.',
        ],
      },
      {
        h: 'What the score cannot tell you',
        p: [
          'Ashtakoota compares only the two Moons. It says nothing about the 7th house, Venus, Mars, the ascendants or the timing of the two people\'s lives, all of which a traditional astrologer would also check. It knows nothing about values that actually matter in a relationship, such as kindness, honesty, shared goals or the willingness to repair after a fight.',
          'It is best read as a structured conversation starter. If the score says you differ in temperament, talk about how each of you handles stress. If it says the household item is weak, agree early on how you will handle money. The tradition was always meant to be used this way: as a prompt for care, not as a verdict.',
        ],
      },
      {
        h: 'How this site calculates it',
        p: [
          'Several of the eight items are asymmetric in the traditional method: they count from the bride\'s star to the groom\'s and give a different answer the other way round. This site does not ask for gender. It calculates in both directions and averages the results, so the order in which two people are entered makes no difference. That is why some totals end in .5.',
        ],
      },
      {
        h: 'Reading your own result on this site',
        p: [
          'The free result shows four things in order. First, the total out of 36 and the band it falls in. Second, a bar for each of the eight items, drawn as a share of that item\'s maximum, so a 2 out of 4 and a 4 out of 8 look the same length. Third, the single item that scores lowest relative to its maximum, with a short note on what to watch. Fourth, a note on how the score was calculated, including whether the two directions of the calculation disagreed.',
          'The detailed report goes further. For each of the eight items it describes how the score is likely to show up between the two of you and gives practical suggestions. For low-scoring Nadi and Bhakoot it adds the traditional remedy and a modern equivalent. It also lays the two people\'s dasha sequences side by side for the next ten years and marks the years when both are in supportive periods and the years when both are in demanding ones.',
          'If one of you does not know your birth time, the result is marked as provisional. The birth star may change for about one person in four, and with it several of the eight items.',
        ],
      },
    ],
    related: ['/match', '/tradition/ashtakoota', '/guides/moon-sign-vs-sun-sign', '/tradition/nakshatra'],
  },
  {
    slug: 'gandanta',
    title: 'Gandanta: The Three Knots of the Zodiac',
    description: 'What gandanta means in Vedic astrology, where the three junctions between water and fire signs fall, what tradition says about births and planets there, and how to read it calmly.',
    lede: 'Three times around the zodiac, a water sign ends and a fire sign begins at exactly the same point where one cycle of birth stars ends and another begins. These seams are called gandanta, the "knots", and the tradition treats them with special care.',
    sections: [
      {
        h: 'Where the knots are',
        p: [
          'The 27 birth stars fit into the 12 signs in three groups of nine stars and four signs each. Each group begins at the start of a fire sign and ends at the end of a water sign. So at three points, the end of a water sign, the end of a cycle of stars, the start of a fire sign and the start of a new cycle of stars all coincide.',
          'Those points are at the end of Cancer and start of Leo, between Ashlesha and Magha; at the end of Scorpio and start of Sagittarius, between Jyeshtha and Mula; and at the end of Pisces and start of Aries, between Revati and Ashwini. The gandanta zone is usually taken as the last pada of the outgoing star and the first pada of the incoming one, about 3°20′ on either side of the seam, though some authors use a narrower band.',
        ],
        list: [
          'Ashlesha → Magha: Cancer into Leo (about 116°40′–123°20′).',
          'Jyeshtha → Mula: Scorpio into Sagittarius (about 236°40′–243°20′).',
          'Revati → Ashwini: Pisces into Aries (about 356°40′–3°20′).',
        ],
      },
      {
        h: 'Why water to fire matters',
        p: [
          'Water and fire are the two elements that cannot simply blend: one puts the other out. The tradition reads these seams as places where one mode of being has to end completely before the next can begin, rather than flowing into it. It is also no coincidence that the three stars just after the knots, Magha, Mula and Ashwini, are all ruled by Ketu, the planet of endings, detachment and new beginnings.',
          'The stars on either side carry the theme too. Ashlesha, Jyeshtha and Revati, all ruled by Mercury, close their cycles with intelligence, intensity or compassion. Magha, Mula and Ashwini open new ones with ancestry, uprooting and speed.',
        ],
      },
      {
        h: 'Births in gandanta',
        p: [
          'Classical texts give particular attention to people whose Moon falls in a gandanta zone, and to a lesser extent the ascendant. Traditional writings associate these births with an early life of upheaval, or with challenges for particular family members, and prescribe a pacification ritual (gandanta shanti) soon after birth. Mula in particular attracted many warnings in older texts.',
          'Modern astrologers tend to read the same placement very differently: as a life with an unusual turning point, a strong drive to dig to the root of things, and a capacity to transform. Many accomplished people have a gandanta Moon. Read in that light, the knot is not a defect but a point of intensity.',
        ],
      },
      {
        h: 'Planets in gandanta',
        p: [
          'Any planet in a gandanta degree is said to have difficulty expressing itself smoothly, as if caught between two worlds. A gandanta Mercury may think in sudden leaps; a gandanta Venus may find relationships tied to major life changes; a gandanta Jupiter may come to its wisdom only after a crisis of belief. The effect is strongest for planets right at the seam, within a degree or so.',
          'The tradition also recognises gandanta in time: in the lunar day (tithi gandanta), at the junctions between the fifth and sixth, tenth and eleventh, and fifteenth and first tithis, and in the rising sign. These are mainly used to avoid starting important undertakings at those moments.',
        ],
      },
      {
        h: 'Reading it calmly',
        p: [
          'If your Moon is in gandanta, the most useful response is curiosity rather than worry. Look at which knot it is. The Cancer–Leo knot involves the transition from emotional belonging to self-expression; the Scorpio–Sagittarius knot, from crisis and secrecy to meaning and faith; the Pisces–Aries knot, from dissolving and surrender to starting fresh.',
          'Each describes a life theme of letting go before beginning. The traditional rituals are, at heart, a way of acknowledging that theme. Whether or not you observe them, it can help to recognise that your path may include one or two sharp turns, and that they tend to lead somewhere.',
        ],
      },
      {
        h: 'Gandanta and the dasha sequence',
        p: [
          'Gandanta has a very concrete effect on timing. The stars just before each knot, Ashlesha, Jyeshtha and Revati, are ruled by Mercury, and the stars just after, Magha, Mula and Ashwini, by Ketu. So a Moon at the very end of Ashlesha, Jyeshtha or Revati leaves only a sliver of the 17-year Mercury period at birth, and the Ketu period begins in infancy. A Moon at the very start of Magha, Mula or Ashwini begins life with almost the full 7 years of Ketu, followed by 20 years of Venus.',
          'Either way, people born in gandanta begin life with a Ketu period, the planet of detachment and new beginnings, early on. Many astrologers connect the traditional cautions about gandanta births with this: an early childhood shaped by change, moves or a family in transition. It also means the whole later sequence is shifted, which is one reason precise birth times are especially valuable for anyone near a knot.',
        ],
      },
    ],
    related: ['/tradition/nakshatra', '/guides/nakshatra-padas', '/graha/ketu', '/guides/find-your-nakshatra'],
  },
  {
    slug: 'vedic-remedies',
    title: 'Vedic Remedies: Myths and Facts About Gems, Mantras and Charity',
    description: 'What the Vedic tradition actually says about remedies (upaya): gemstones, mantras, charity, fasting and conduct. Common myths, the classical cautions, and how to approach remedies sensibly.',
    lede: 'Few parts of Vedic astrology are as commercialised as remedies. Expensive gemstones, elaborate rituals and urgent warnings fill the internet. The tradition itself is quieter and more practical than that. Here is what it says, and what it does not.',
    sections: [
      {
        h: 'What a remedy is meant to do',
        p: [
          'The Sanskrit word is upaya, "means" or "approach". Remedies are ways of working with a planet\'s influence: strengthening a weak benefic, calming a troubled malefic, or easing a difficult period. The classical view is not that a remedy erases what a chart shows, but that it can soften how it is experienced, in the way that preparation can soften the impact of bad weather.',
          'Remedies fall into a few broad families: conduct (how you behave toward the people and things a planet signifies), charity (dana), mantra and prayer, fasting (vrata), worship of the planet\'s deity, yantras, and gemstones. Most traditional teachers rank them in roughly that order of safety and accessibility, with gemstones last.',
        ],
      },
      {
        h: 'Myth: wear the gem of your weak planet',
        p: [
          'The most common advice online is to wear the gemstone of whatever planet is weak in your chart. Classical teachers are much more cautious. A gemstone is said to strengthen a planet, not to make it kind. Strengthening a planet that rules difficult houses in your chart, such as the 6th, 8th or 12th, can amplify exactly the problems you want to reduce.',
          'For that reason, traditional astrologers usually recommend gems only for planets that are functional benefics for the particular ascendant, and often prefer to strengthen the ascendant lord or the lord of a good house. Blue sapphire for Saturn, in particular, is traditionally tested before being worn permanently. If someone recommends an expensive gem without looking at your ascendant and house rulerships, treat that as a warning sign.',
        ],
      },
      {
        h: 'Myth: remedies have to be expensive',
        p: [
          'Many of the most respected remedies cost nothing. Conduct remedies are the clearest example. For the Sun, respect your father and those in authority and keep your word. For the Moon, care for your mother and keep regular sleep. For Mars, channel energy into physical work and avoid quarrels. For Mercury, speak honestly and keep accounts clean. For Jupiter, teach and respect teachers. For Venus, treat partners and women with respect. For Saturn, serve workers and the elderly and live simply.',
          'Charity is the next most accessible. Traditional lists pair each planet with simple gifts on its weekday: wheat or jaggery for the Sun, rice or milk for the Moon, lentils for Mars, green vegetables for Mercury, yellow foods or books for Jupiter, white sweets or clothing for Venus, sesame, oil or black cloth for Saturn. The point is regularity and sincerity, not cost.',
        ],
      },
      {
        h: 'Mantras, fasting and worship',
        p: [
          'Each planet has a seed (bija) mantra and longer prayers, traditionally repeated a set number of times, often 108, on the planet\'s weekday or during its period. Fasting on that weekday is another common practice: Monday for the Moon, Tuesday for Mars, Thursday for Jupiter, Saturday for Saturn. Worship of the associated deity, such as Hanuman for Mars and Saturn, Vishnu for Jupiter and Mercury, or Ganesha for Ketu, is the devotional form of the same idea.',
          'From the outside, all of these work in a similar way: they create a regular moment of attention to a part of your life you want to strengthen. Whether you understand them devotionally or psychologically, consistency matters more than intensity.',
        ],
      },
      {
        h: 'Myth: a remedy can fix anything',
        p: [
          'The tradition is clear that some outcomes are fixed (dridha karma) and some are flexible. Remedies are said to work best on the flexible ones and to have limited effect on the fixed. No honest astrologer guarantees that a ritual will produce a marriage, a job or a recovery from illness.',
          'This matters most where real stakes are involved. Remedies are not a substitute for medical treatment, legal advice or financial planning. Astrology on this site is offered as cultural content and for reflection, and any remedy suggestions are best treated the same way.',
        ],
      },
      {
        h: 'A sensible approach',
        p: [
          'If you want to try remedies, start with conduct and charity for the planet whose period you are in, because they are free, harmless and often useful in themselves. Add a mantra or a weekly observance if it suits you. Consider gemstones only after a full chart reading that takes your ascendant and house rulerships into account, and never under pressure.',
          'Above all, use remedies to support effort rather than replace it. The idea that runs through the whole tradition is that planets respond to how you live. The most reliable remedy for a difficult Saturn period is still patient, honest work.',
        ],
      },
      {
        h: 'Quick reference by planet',
        p: [
          'The table below collects the most common traditional associations for each planet: its weekday, its gemstone, and a simple charity. Use it as a starting point for the planet whose period you are in, and remember the cautions above about gemstones.',
        ],
        list: [
          'Sun — Sunday · ruby · wheat or jaggery; respect for father and elders.',
          'Moon — Monday · pearl · rice, milk or white cloth; care for mother.',
          'Mars — Tuesday · red coral · red lentils; physical service, avoiding quarrels.',
          'Mercury — Wednesday · emerald · green vegetables or mung beans; honest speech.',
          'Jupiter — Thursday · yellow sapphire · yellow foods, turmeric or books; teaching.',
          'Venus — Friday · diamond or white sapphire · white sweets, rice or clothing; respect for partners.',
          'Saturn — Saturday · blue sapphire · sesame, mustard oil or black cloth; serving workers and the elderly.',
          'Rahu — Saturday · hessonite · blankets or help for outcasts; avoiding intoxicants.',
          'Ketu — Tuesday or Saturday · cat\'s eye · blankets or food for animals; spiritual practice.',
        ],
      },
    ],
    related: ['/tradition/navagraha', '/guides/reading-your-dasha', '/graha/shani', '/graha/guru', '/about'],
  },
]
