/**
 * Planet pages — long-form sections, English.
 * Four sections per planet: role in the chart, dignity, houses, dasha.
 * The dignity facts themselves live in dignity.ts and are drawn as a table; the prose here explains them.
 */
import type { LongSection } from './types'
import type { GrahaKey } from './dignity'

export const GRAHA_LONG_EN: Record<GrahaKey, readonly LongSection[]> = {
  Sun: [
    {
      h: 'What the Sun stands for in a chart',
      p: [
        'In Jyotish the Sun is the atma karaka in the widest sense: the significator of the self, the spine of the personality, the part of you that wants to be seen for what it is. It rules the father and father figures, the state, government, authority, reputation and the right to command. In the body it governs the heart, the eyes (the right eye in particular), the bones and general vitality.',
        'Where Western astrology makes the Sun the headline of a horoscope, Vedic astrology treats it as one voice among nine. Your birth star comes from the Moon, not the Sun. The Sun tells you instead how you carry authority, how you relate to those above you, and where in life you most need recognition. A well-placed Sun gives steadiness, dignity and a sense of purpose; an afflicted one tends to show up as either a fragile ego that needs constant approval or a stiff pride that cannot bend.',
      ],
    },
    {
      h: 'Where the Sun is strong and where it struggles',
      p: [
        'The Sun is exalted in Aries, reaching its peak at 10 degrees, and debilitated at the same degree of Libra. The logic is easy to feel: Aries is the sign of initiative and the self acting alone, which suits the Sun; Libra is the sign of negotiation and balance with another, where the Sun has to share the stage. Its own sign is Leo, the royal sign.',
        'The Sun counts the Moon, Mars and Jupiter as friends, treats Mercury as neutral, and regards Venus and Saturn as enemies. In practice this means the Sun is comfortable in signs ruled by its friends (Cancer, Aries, Scorpio, Sagittarius, Pisces) and uneasy in the signs of Venus and Saturn. It gains directional strength (dig bala) in the 10th house, the top of the chart, which is why a Sun near the midheaven is a classic signature of public life.',
      ],
    },
    {
      h: 'The Sun through the houses',
      p: [
        'In the angular houses (1st, 4th, 7th, 10th) the Sun is visible and active. In the 1st it gives presence and a strong constitution; in the 10th it is at its most powerful, pointing to careers in leadership, government or any role with a title. In the 7th it can make partnerships feel like a contest for the lead, and in the 4th it may bring a home life shaped by a dominant parent.',
        'The Sun is a natural malefic in the mild sense that it is hot and separating, so it often does well in the growth houses (3rd, 6th, 10th, 11th), where friction becomes effort and effort becomes results. In the 6th it helps defeat rivals and illness; in the 11th it brings gains through powerful people. In the 8th and 12th it is quieter and more inward, and the themes of authority turn toward research, retreat or service behind the scenes.',
      ],
    },
    {
      h: 'When the Sun dasha runs',
      p: [
        'The Sun has the shortest major period in the Vimshottari system: six years. It often arrives as a concentrated chapter in which questions of identity, career standing and authority come forward. People frequently report promotions, a first leadership role, dealings with government, or a period in which their relationship with their father changes significantly.',
        'If the Sun is strong in the birth chart, these six years tend to build visibility and confidence. If it is weak or afflicted, the same themes arrive as tests: conflicts with superiors, a bruised reputation, or health issues around the heart, eyes or energy levels. The traditional advice is less about avoiding the Sun than about earning its favour: keep promises, take responsibility without needing applause, and respect the people who carry authority in your life.',
      ],
    },
    {
      h: 'The Sun in everyday life',
      p: [
        'You can often see the Sun\'s condition in how a person handles being in charge. A strong Sun shows up as someone who takes responsibility naturally, stands straight, keeps a regular routine and is comfortable being visible. A strained Sun shows up as either a reluctance to take the lead or a need to control every room. Typical Sun careers include government, administration, management, medicine (especially cardiology) and any role that carries an official title. The Sun\'s colours are copper, orange and deep red, and its traditional time is early morning: many people with a weak Sun are advised simply to get up with the sunrise.',
      ],
    },
  ],
  Moon: [
    {
      h: 'What the Moon stands for in a chart',
      p: [
        'If the Sun is the self, the Moon is the mind (manas): how you feel, how you react, what calms you and what unsettles you. It rules the mother and nurturing, the public and popularity, water, travel, food and memory. In the body it governs the fluids, the breasts, the stomach and the left eye, and it is the planet most closely tied to sleep and emotional health.',
        'The Moon is the single most important planet for this site, because your birth star (nakshatra) is simply the part of the sky the Moon occupied at your birth. Vedic astrologers read the Moon chart alongside the ascendant chart, and the dasha sequence of your whole life is set by the Moon\'s exact position. A steady Moon gives emotional resilience and a good relationship with the public; a disturbed Moon tends to show up as worry, mood swings or a need for constant reassurance.',
      ],
    },
    {
      h: 'Where the Moon is strong and where it struggles',
      p: [
        'The Moon is exalted in Taurus at 3 degrees and debilitated at 3 degrees of Scorpio. Taurus is stable, sensual and slow to change, which lets the mind rest; Scorpio is intense, secretive and prone to crisis, which keeps the mind on alert. Its own sign is Cancer. The Moon is also judged by its phase: a bright, waxing Moon near full is considered strong and benefic, a dark Moon near new is considered weak regardless of sign.',
        'The Moon has no enemies. It counts the Sun and Mercury as friends and treats every other planet as neutral, which fits its role as the receptive, adaptable planet. It gains directional strength in the 4th house, the house of home and inner peace, so a Moon at the bottom of the chart often points to someone whose wellbeing depends on having a secure base.',
      ],
    },
    {
      h: 'The Moon through the houses',
      p: [
        'In the 1st house the Moon gives a soft, changeable face and a strong emotional presence; such people are often liked without trying. In the 4th it is at home, giving attachment to family, land and the mother. In the 7th it makes partnership central to emotional security, and in the 10th it often points to careers in public-facing work, hospitality, care or anything that serves people directly.',
        'In the difficult houses the Moon has to work harder. In the 6th it can tie mood to health and daily routine; in the 8th it gives depth and intuition but also emotional storms; in the 12th it points to a rich inner life, dreams and a need for solitude, sometimes life abroad. In the 11th it is usually happy, bringing friends, networks and gains that come through people.',
      ],
    },
    {
      h: 'When the Moon dasha runs',
      p: [
        'The Moon period lasts ten years. Because the Moon governs the mind, this decade is often remembered less for single events than for a change of emotional climate: a move of house, a new family role, a stronger bond with the mother or with home, sometimes a career that turns toward the public.',
        'A strong Moon makes this a nourishing decade, good for family, property and reputation. A weak or afflicted Moon can make it an anxious one, with restlessness, frequent changes of plan, or health issues tied to sleep and digestion. Traditional remedies for the Moon are gentle: regular sleep, time near water, caring for the mother or older women in the family, and the Monday fast that many families still keep.',
      ],
    },
    {
      h: 'The Moon in everyday life',
      p: [
        'The Moon is easiest to see in someone\'s moods and habits around food, sleep and home. A strong Moon gives a person who is easy to be around, remembers names and birthdays, and recovers quickly from upset. A troubled Moon shows up as restlessness, irregular sleep, emotional eating or difficulty being alone. Typical Moon careers involve caring for or feeding people: nursing, hospitality, food, childcare, public relations, and anything near water such as shipping or fisheries. The Moon\'s colours are white and silver, and its natural rhythm is the lunar month: many people notice their energy rising and falling with the phases.',
      ],
    },
  ],
  Mars: [
    {
      h: 'What Mars stands for in a chart',
      p: [
        'Mars is energy with a direction. It rules courage, competition, physical strength, surgery, engineering, land and property, siblings (especially younger brothers) and the police and armed forces. In the body it governs blood, muscle, the head and inflammation. Wherever Mars sits is where you push, fight, build and sometimes burn out.',
        'Mars has a reputation problem because of manglik dosha, the belief that Mars in certain houses harms marriage. That idea is real in the tradition, but it is applied far more broadly than the classical texts support, and many cancellations exist. A better way to read Mars is as the planet of action: a strong Mars gives initiative, technical skill and the ability to defend yourself; a frustrated Mars gives anger, accidents, impatience and quarrels.',
      ],
    },
    {
      h: 'Where Mars is strong and where it struggles',
      p: [
        'Mars is exalted in Capricorn at 28 degrees and debilitated in Cancer at the same degree. In disciplined, ambitious Capricorn, Mars\'s raw force is channelled into sustained effort; in soft, protective Cancer, it turns into defensiveness and emotional reactivity. Mars owns two signs: Aries, where it is direct and pioneering, and Scorpio, where it is strategic and enduring.',
        'Its friends are the Sun, the Moon and Jupiter; Venus and Saturn are neutral; Mercury is its enemy, which captures the old tension between action and over-thinking. Mars gains directional strength in the 10th house, alongside the Sun, which makes it a powerful career planet when placed high in the chart.',
      ],
    },
    {
      h: 'Mars through the houses',
      p: [
        'Mars is the classic planet of the growth houses. In the 3rd it gives courage and initiative; in the 6th it defeats enemies and illness; in the 10th it drives a career forward; in the 11th it pushes for gains. In these houses friction is useful, and Mars tends to deliver visible results over time.',
        'In the 1st, 4th, 7th, 8th and 12th houses Mars is the source of the manglik label. Read plainly, these placements mean that Mars energy enters personal life directly: a strong temper or body in the 1st, tension over home or property in the 4th, a combative partnership in the 7th, sudden events in the 8th, hidden expenses or restless sleep in the 12th. None of this is a sentence; it is a description of where the energy needs a deliberate outlet such as sport, physical work or clear rules for disagreement.',
      ],
    },
    {
      h: 'When the Mars dasha runs',
      p: [
        'The Mars period lasts seven years. It is typically a period of drive: buying property, starting a business, taking on a competitive role, beginning a fitness regime, or simply pushing through obstacles that had stalled for years. Siblings often feature, for better or worse.',
        'With a well-placed Mars these years are productive and courageous. With an afflicted Mars they can bring disputes, injuries, surgery, legal fights over land, or a short fuse at home. The traditional prescription is to give Mars something to do: physical exercise, discipline, service in a protective role, and the Tuesday observances found in many Hindu households. The modern version is the same advice in different words: channel the fire before it finds its own way out.',
      ],
    },
    {
      h: 'Mars in everyday life',
      p: [
        'Mars is visible in how a person deals with conflict and physical energy. A strong Mars gives someone decisive, brave, practical with tools and willing to defend others. A frustrated Mars shows up as impatience, a quick temper, frequent minor injuries or a habit of starting things and abandoning them. Typical Mars careers include engineering, surgery, the military and police, sports, construction, real estate and any job that needs quick action under pressure. Its colour is red, and it responds well to regular exercise: traditional advice for a restless Mars is almost always to give the body hard work to do.',
      ],
    },
  ],
  Mercury: [
    {
      h: 'What Mercury stands for in a chart',
      p: [
        'Mercury is the intellect at work: speech, writing, calculation, trade, negotiation, humour and the nervous system. It rules students, merchants, accountants, writers, programmers and anyone who earns a living by connecting information. In the body it governs the skin, the nerves, the lungs and speech.',
        'Mercury is the youngest of the planets in mythology, the son of the Moon, and it behaves like a quick, adaptable young person: it takes on the colour of whatever planets it sits with. With benefics it becomes a natural benefic; with malefics it becomes sharper and more critical. A strong Mercury gives wit, business sense and clarity; a strained one gives nervous worry, scattered attention or a tendency to talk around a problem instead of solving it.',
      ],
    },
    {
      h: 'Where Mercury is strong and where it struggles',
      p: [
        'Mercury is unusual: it is exalted in a sign it also owns. Its exaltation peak is 15 degrees of Virgo, the sign of analysis, detail and practical service, and its debilitation is 15 degrees of Pisces, the sign of dissolving boundaries, where precise thought gives way to feeling and imagination. Its other own sign is Gemini, the sign of conversation and exchange.',
        'Mercury counts the Sun and Venus as friends, treats Mars, Jupiter and Saturn as neutral, and regards the Moon as an enemy, a famous asymmetry since the Moon has no enemies at all. Mercury gains directional strength in the 1st house, which makes a rising Mercury a sign of a quick mind that others notice immediately.',
      ],
    },
    {
      h: 'Mercury through the houses',
      p: [
        'In the 1st house Mercury gives a youthful look, curiosity and a talkative manner. In the 2nd it supports speech and wealth through skill; in the 3rd it favours writing, media and short travel; in the 5th it gives a sharp learner; in the 10th it suits business, analysis and communication careers. In the 11th it multiplies contacts and income streams.',
        'In the dusthanas (6th, 8th, 12th) Mercury can become a researcher, auditor or problem solver, or it can turn its energy into anxiety. Because Mercury is so close to the Sun, it is often combust (within a few degrees of the Sun). Traditional texts treat combustion seriously, but many astrologers note that a combust Mercury is common in brilliant people, whose thinking simply serves the ego\'s goals rather than standing apart from them.',
      ],
    },
    {
      h: 'When the Mercury dasha runs',
      p: [
        'The Mercury period lasts seventeen years, one of the longest in the cycle. It often covers a phase of learning and earning: education, qualifications, a business, a career built on skill rather than status. Communication becomes central, and so does the network of people you trade ideas and favours with.',
        'A strong Mercury makes this a long, intelligent climb, with steady growth in competence and income. A weak Mercury can bring nervous strain, contracts that go wrong, skin or respiratory issues, or a sense of being busy without progress. The remedies are practical: study, keep accounts in order, speak carefully, and honour the Wednesday observances or the green colour traditionally linked with Budha.',
      ],
    },
    {
      h: 'Mercury in everyday life',
      p: [
        'Mercury shows in how a person talks, writes and handles details. A strong Mercury gives quick wit, a talent for languages and numbers, a love of puzzles and a youthful manner that lasts into old age. A strained Mercury shows up as nervous chatter, indecision, skin trouble when stressed, or a habit of over-explaining. Typical Mercury careers include writing, journalism, teaching languages, accounting, trading, programming, data work and anything that relies on communication or analysis. Its colour is green, and it is said to strengthen with use: reading, writing by hand and learning a new skill are classic everyday remedies.',
      ],
    },
  ],
  Jupiter: [
    {
      h: 'What Jupiter stands for in a chart',
      p: [
        'Jupiter, called Guru, is the great teacher. It rules wisdom, faith, law, philosophy, children, wealth that grows over time, and the people who guide us: teachers, priests, mentors and, in a woman\'s chart traditionally, the husband. In the body it governs the liver, fat and the processes of growth.',
        'Jupiter is the greatest natural benefic in Jyotish. Wherever it sits it tends to protect and expand, and wherever it casts its aspect (5th, 7th and 9th from itself) it softens difficulties. A strong Jupiter gives optimism, ethics, good counsel and an ability to attract help; an afflicted one can turn into over-confidence, excess, dogmatism or advice that is generous but impractical.',
      ],
    },
    {
      h: 'Where Jupiter is strong and where it struggles',
      p: [
        'Jupiter is exalted in Cancer at 5 degrees, where wisdom meets care and becomes protective; it is debilitated in Capricorn at the same degree, where the practical, status-driven atmosphere tends to shrink faith into calculation. Its own signs are Sagittarius, the sign of the seeker, and Pisces, the sign of compassion and surrender.',
        'Jupiter counts the Sun, the Moon and Mars as friends, treats Saturn as neutral, and regards Mercury and Venus as enemies. The last pairing is often explained by the contrast between Jupiter\'s wisdom and the cleverness and pleasure of the other two. Jupiter gains directional strength in the 1st house, and a strong Jupiter rising is one of the most protective signatures a chart can have.',
      ],
    },
    {
      h: 'Jupiter through the houses',
      p: [
        'In the trines (1st, 5th, 9th) Jupiter is especially welcome: it gives good character, intelligent children, and luck that comes from doing the right thing. In the angles it stabilises the whole chart, particularly in the 1st and 4th. In the 7th it often gives a wise or well-respected partner, and in the 10th an honourable career, sometimes in law, education or advisory work.',
        'In the 6th, 8th and 12th Jupiter\'s protection becomes less visible but still present: help during illness, a long life, a turn toward spiritual practice or charitable work. In the 2nd and 11th it supports wealth that accumulates slowly, through good judgement rather than speculation. The one place classical authors are cautious about is Jupiter in its debilitation sign, where its gifts arrive late or through hard lessons.',
      ],
    },
    {
      h: 'When the Jupiter dasha runs',
      p: [
        'The Jupiter period lasts sixteen years. For many people it is remembered as a period of expansion: marriage, children, higher education, a respected position, a move toward meaning or teaching. It is not always easy, but its difficulties tend to be the kind that make you wiser.',
        'If Jupiter is weak or afflicted, the same period can bring over-extension: too many commitments, financial optimism that outruns income, weight gain or liver strain, or disappointment in a teacher or institution. The traditional remedies are among the most constructive in the tradition: teach what you know, support education, respect elders and teachers, and give generously on Thursdays.',
      ],
    },
    {
      h: 'Jupiter in everyday life',
      p: [
        'Jupiter shows in a person\'s generosity, outlook and relationship with learning. A strong Jupiter gives someone people instinctively ask for advice, who is optimistic without being naive and who keeps learning all their life. A strained Jupiter shows up as preachiness, over-promising, weight gain or a habit of spending on hope rather than plans. Typical Jupiter careers include teaching, law, counselling, finance and banking, religious or charitable work, and publishing. Its colour is yellow, and its everyday remedy is simple: share what you know, and keep good relations with teachers and elders.',
      ],
    },
  ],
  Venus: [
    {
      h: 'What Venus stands for in a chart',
      p: [
        'Venus, called Shukra, rules love, pleasure, beauty, art, music, comfort, vehicles and luxury, and in a man\'s chart traditionally the wife. It is also the teacher of the asuras in mythology, which gives Venus a second side: refined knowledge of how to live well in the material world, including diplomacy and the arts of persuasion. In the body it governs the reproductive system, the kidneys and the complexion.',
        'A strong Venus gives charm, taste, harmonious relationships and the ability to enjoy life without guilt. A weak or strained Venus shows up as difficulty in relationships, a pull toward indulgence, or an inability to relax and receive. Venus is a natural benefic and, like Jupiter, protects the houses it occupies.',
      ],
    },
    {
      h: 'Where Venus is strong and where it struggles',
      p: [
        'Venus is exalted in Pisces at 27 degrees, where love becomes devotion and art becomes transcendent; it is debilitated in Virgo at the same degree, where analysis and criticism make it hard to simply enjoy. Venus owns Taurus, the sign of sensual stability, and Libra, the sign of partnership and balance.',
        'Its friends are Mercury and Saturn, which explains why Venus often does well in practical, disciplined signs. Mars and Jupiter are neutral; the Sun and the Moon are enemies. Venus gains directional strength in the 4th house, the house of home and comfort, so a Venus at the base of the chart often gives a beautiful home and a peaceful private life.',
      ],
    },
    {
      h: 'Venus through the houses',
      p: [
        'In the 1st house Venus gives attractiveness and grace; in the 2nd, a pleasant voice and wealth through beauty or art; in the 4th, comfort, vehicles and a happy home; in the 5th, romance and creative talent. In the 7th house, the house of marriage, Venus is the natural significator and usually adds warmth to partnership, though classical texts warn that the significator in its own house can make one expect too much of a partner.',
        'In the 10th Venus favours careers in art, fashion, hospitality, entertainment or diplomacy. In the 6th it can bring relationships that mix work and love, or health issues tied to excess. In the 12th, unusually, it is considered strong: the 12th is the house of bed pleasures and private enjoyment, and Venus there often gives a rich, quiet happiness.',
      ],
    },
    {
      h: 'When the Venus dasha runs',
      p: [
        'The Venus period is the longest in the Vimshottari cycle: twenty years. It frequently covers marriage, family life, property and the acquisition of the comforts that make a home. Creative work, luxury goods and relationships move to the centre.',
        'With a well-placed Venus these are years of enjoyment and harmony. With an afflicted one they can bring relationship turmoil, overspending, or a sense of pleasure that never satisfies. The traditional remedies emphasise respect for women, refinement in daily life, and gifts of white or fragrant things on Fridays. The underlying idea is that Venus responds to beauty offered rather than beauty consumed.',
      ],
    },
    {
      h: 'Venus in everyday life',
      p: [
        'Venus shows in a person\'s taste, relationships and ability to enjoy life. A strong Venus gives someone with an eye for beauty, a gift for making others comfortable and a talent for diplomacy. A strained Venus shows up as difficulty in relationships, overspending on comfort, vanity, or the opposite: an inability to accept pleasure at all. Typical Venus careers include the arts, music, design, fashion, beauty, hospitality, luxury goods, entertainment and diplomacy. Its colours are white and pastel shades, and its everyday remedies are about refinement: keeping your surroundings beautiful and treating partners with care.',
      ],
    },
  ],
  Saturn: [
    {
      h: 'What Saturn stands for in a chart',
      p: [
        'Saturn, called Shani, rules time, discipline, labour, endurance, old age, limitation and justice. It governs servants and workers, the poor, long-term structures, and the slow results of patient effort. In the body it governs the bones, teeth, joints and the nervous system\'s chronic conditions.',
        'Saturn is the most feared planet in popular astrology because of sade sati, the seven-and-a-half-year period when Saturn transits over the natal Moon. The tradition is more balanced than the fear: Saturn delays but rarely denies, and it rewards honest work more reliably than any other planet. A strong Saturn gives patience, seriousness and lasting achievement; a weak one gives pessimism, chronic fatigue, isolation or a life that feels like a series of obstacles.',
      ],
    },
    {
      h: 'Where Saturn is strong and where it struggles',
      p: [
        'Saturn is exalted in Libra at 20 degrees: in the sign of justice and balance, Saturn becomes fair, principled and deeply reliable. It is debilitated in Aries at 20 degrees, where impatience and impulse clash with Saturn\'s need for slow, steady progress. Saturn owns Capricorn, the sign of structure, and Aquarius, the sign of collective causes.',
        'Its friends are Mercury and Venus; Jupiter is neutral; the Sun, the Moon and Mars are enemies. The Sun–Saturn enmity is told in myth as the story of a father and a son who could not meet each other\'s gaze. Saturn gains directional strength in the 7th house, the western horizon where the Sun sets, which suits a planet of endings and maturity.',
      ],
    },
    {
      h: 'Saturn through the houses',
      p: [
        'Saturn, like Mars, does well in the growth houses. In the 3rd it gives endurance; in the 6th it crushes enemies through persistence; in the 10th it builds a career slowly but solidly; in the 11th it brings gains that grow with age. Many successful people have Saturn in these houses and describe their success as late but secure.',
        'In the 1st Saturn can give a serious manner and a slow start in life. In the 4th it may bring a cool or burdensome home; in the 7th a late or older partner, or a marriage built on duty; in the 8th long life with heavy responsibilities; in the 12th, solitude, foreign lands or spiritual discipline. These placements describe where life asks you to mature, not where it punishes you.',
      ],
    },
    {
      h: 'When the Saturn dasha runs',
      p: [
        'The Saturn period lasts nineteen years. It often covers the most demanding phase of a life: heavy work, responsibility for others, the slow building of something durable. People frequently look back on their Saturn period as the time they grew up, whatever their age when it began.',
        'If Saturn is well placed, these years build authority, property and respect, even if the pace feels slow. If it is weak, they can bring illness, loss, isolation, or work that does not pay what it costs. The traditional remedies are about humility and service: helping workers and the elderly, keeping promises, living simply, and the Saturday observances with sesame and oil that many families still practise.',
      ],
    },
    {
      h: 'Saturn in everyday life',
      p: [
        'Saturn shows in a person\'s relationship with time, work and limits. A strong Saturn gives someone patient, reliable, frugal and able to stay with a hard task for years. A strained Saturn shows up as chronic tiredness, pessimism, fear of change, loneliness or a tendency to carry everyone else\'s burdens. Typical Saturn careers include administration, law and the judiciary, mining, agriculture, construction, manufacturing, and any work with the elderly or the poor. Its colours are black and dark blue, and it responds best to steady effort: keeping commitments, simplifying life and serving others are the classic everyday remedies.',
      ],
    },
  ],
  Rahu: [
    {
      h: 'What Rahu stands for in a chart',
      p: [
        'Rahu is not a physical planet but the Moon\'s north node, the point where the Moon\'s path crosses the Sun\'s path going north. In myth it is the head of the demon who drank the nectar of immortality and was cut in two; the head became Rahu, endlessly hungry, and the body became Ketu. That story captures Rahu\'s nature: desire without a body to be satisfied, ambition that keeps reaching for more.',
        'Rahu rules foreigners and foreign lands, technology, sudden rises, unconventional paths, illusion, intoxicants and anything new or taboo. In the body it is linked to poisons, mysterious illnesses and anxiety. A strong Rahu can bring dramatic worldly success, especially through new fields or abroad; an afflicted one brings confusion, obsession, scandal or a restless dissatisfaction that no achievement fixes.',
      ],
    },
    {
      h: 'Where Rahu is strong and where it struggles',
      p: [
        'Because Rahu is a shadow point, its dignities are debated. The most widely used view places its exaltation in Taurus and its debilitation in Scorpio, mirroring the Moon; another respected school uses Gemini and Sagittarius instead. Rahu owns no sign, though some authors assign it co-rulership of Aquarius. It acts largely like the lord of the sign it occupies, and like Saturn, its traditional friend.',
        'Rahu is generally said to be friendly with Mercury, Venus and Saturn and hostile to the Sun, the Moon and Mars, the "lights" it periodically eclipses. Rahu and Ketu always sit exactly opposite each other and move backward through the zodiac, completing a cycle in about eighteen and a half years.',
      ],
    },
    {
      h: 'Rahu through the houses',
      p: [
        'Rahu amplifies whatever house it occupies and makes that area of life feel like a hunger. In the 1st it gives a strong, unusual persona; in the 7th, attraction to partners from different backgrounds; in the 10th, a powerful drive for status and often success in unconventional careers. In the 3rd, 6th and 11th, the growth houses, it is considered especially effective, turning restlessness into courage, competitiveness and gains.',
        'In the 4th, 5th, 8th and 12th Rahu can unsettle: restlessness at home, unusual paths in education or with children, sudden events, or a pull toward foreign lands and escape. The axis matters as much as the house: Rahu always points to the area of life you are reaching toward, while Ketu, opposite, marks what you already know too well.',
      ],
    },
    {
      h: 'When the Rahu dasha runs',
      p: [
        'The Rahu period lasts eighteen years. It is often the most dramatic chapter in a life: sudden rises, moves abroad, careers in new industries, unconventional relationships, or a total change of direction. It can bring the success that makes others envious and the anxiety that makes it hard to enjoy.',
        'With a well-placed Rahu this period opens doors that were closed to your family before you. With an afflicted Rahu it can bring deception, addiction, legal trouble or a long phase of confusion. The traditional remedies aim at clarity: avoid intoxicants and shortcuts, keep your word, and honour Durga or the Saturday rituals associated with Rahu. The modern advice is to pick a direction and let the hunger serve it.',
      ],
    },
    {
      h: 'Rahu in everyday life',
      p: [
        'Rahu shows in a person\'s ambitions and in the things they cannot stop thinking about. A strong Rahu gives someone bold, original, at ease with technology and foreign cultures, and willing to break with family tradition. A strained Rahu shows up as restlessness, addiction, a weakness for shortcuts, or the feeling that nothing is ever enough. Typical Rahu careers include technology, media, aviation, foreign trade, research into new fields, politics and anything unconventional. Its colours are smoky and dark, and its everyday remedy is clarity: avoiding intoxicants, keeping promises and choosing one direction to pursue rather than many.',
      ],
    },
  ],
  Ketu: [
    {
      h: 'What Ketu stands for in a chart',
      p: [
        'Ketu is the Moon\'s south node and, in myth, the headless body of the same demon whose head became Rahu. Where Rahu is desire without satisfaction, Ketu is experience without appetite. It rules detachment, intuition, past-life skills, spirituality, liberation (moksha), and sudden endings. It is linked to mystics, healers, researchers and anyone who works with what cannot be seen.',
        'Ketu makes you very good at the things it touches, often without effort, and at the same time indifferent to them. A strong Ketu gives deep insight, technical precision and a calm that does not depend on circumstances; an afflicted Ketu gives confusion, losses that come without warning, mysterious health issues, or a sense of emptiness in the area of life it occupies.',
      ],
    },
    {
      h: 'Where Ketu is strong and where it struggles',
      p: [
        'Ketu\'s dignities mirror Rahu\'s. In the most common view it is exalted in Scorpio, the sign of depth and transformation, and debilitated in Taurus, the sign of attachment to comfort and possessions. Another school uses Sagittarius and Gemini. Ketu owns no sign, though some authors give it co-rulership of Scorpio, and it behaves much like Mars.',
        'Ketu is usually considered friendly with Mars, Venus and Saturn and hostile to the Sun and the Moon. Because Rahu and Ketu always sit opposite each other, you cannot read one without the other. Ketu marks the half of the axis where you already have mastery and are being asked to let go.',
      ],
    },
    {
      h: 'Ketu through the houses',
      p: [
        'In the 12th house, the house of liberation, Ketu is traditionally at its best: it gives spiritual depth, comfort with solitude and freedom from material worry. In the 8th it gives research ability and interest in hidden subjects; in the 6th it defeats enemies and illness through unexpected means. In the 3rd and 11th it can give courage and gains with little fuss.',
        'In the 1st Ketu can give a mysterious or hard-to-read presence; in the 4th, detachment from home; in the 7th, partnerships that feel karmic or distant; in the 10th, a career that changes direction suddenly or serves something larger than personal ambition. In the 2nd it can make speech blunt and finances irregular. In each case Ketu points to where life loosens your grip.',
      ],
    },
    {
      h: 'When the Ketu dasha runs',
      p: [
        'The Ketu period lasts seven years. It often feels like a clearing: plans fall away, relationships end or change, and attention turns inward toward spiritual practice, research or healing. For some people it is a period of sudden loss; for others it is a period of surprising freedom, and often it is both.',
        'With a well-placed Ketu these years bring insight, skill and a lighter attachment to outcomes. With an afflicted Ketu they can bring confusion, accidents, unexplained health problems or a feeling of drifting. The traditional remedies centre on Ganesha, the remover of obstacles, and on spiritual discipline. The modern reading is the same: when Ketu takes something away, it is making room.',
      ],
    },
    {
      h: 'Ketu in everyday life',
      p: [
        'Ketu shows in what a person is effortlessly good at and oddly indifferent to. A strong Ketu gives someone intuitive, precise, calm in a crisis and drawn to spiritual practice or deep research. A strained Ketu shows up as absent-mindedness, sudden loss of interest, unexplained health complaints or a feeling of being out of place. Typical Ketu careers include research, healing and alternative medicine, coding and other precise technical work, spiritual teaching, and investigation. Its colours are grey and smoke, and its everyday remedy is quiet: meditation, simple living and letting go of what has already ended.',
      ],
    },
  ],
}
