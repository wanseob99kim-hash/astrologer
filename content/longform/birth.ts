/**
 * 생년월일 입력 화면 아래 설명. 입력 폼만 있으면 검색엔진에는 빈 페이지로 보인다.
 */
import type { Locale } from '@/lib/i18n'
import type { LongSection } from './types'

export const BIRTH_GUIDE: Record<Locale, readonly LongSection[]> = {
  en: [
    {
      h: 'What you will get',
      p: [
        'From your date of birth we calculate where the Moon stood in the sidereal zodiac and tell you which of the 27 birth stars (nakshatras) it occupied. Your result page shows the star\'s deity, symbol, ruling planet, temperament and mythology, your Moon sign, your guardian planet from the day of the month, and your lucky colour, number and direction.',
        'If you add a birth time, you also get your life periods (Vimshottari dasha): which planet\'s period you are in now, when it began and when the next one starts. From the result page you can invite someone to compare charts and see your Ashtakoota compatibility score out of 36.',
      ],
    },
    {
      h: 'Why the birth time matters',
      p: [
        'The Moon moves about 13 degrees a day and changes birth star roughly once a day, at any hour. Without a time we calculate from noon, which is right for most people, but for about one person in four the star changes during their birth day. When that happens we mark the result as provisional. Even an approximate time, such as "early morning" or "late evening", is better than none.',
        'Use your ordinary solar (Gregorian) birthday. If your family records it in the lunar calendar, convert it first.',
      ],
    },
    {
      h: 'Your data',
      p: [
        'No account is needed. Your date, time and nickname are used only to compute the result and are carried in the page address so that you can bookmark or share it. We do not store them on our servers. Result pages are excluded from search engines.',
      ],
    },
  ],
  ko: [
    {
      h: '무엇을 알 수 있나요',
      p: [
        '생년월일로 항성 황도대에서 달이 어디 있었는지 계산해, 27개 탄생별(나크샤트라) 중 어느 별에 있었는지 알려드립니다. 결과 화면에는 그 별의 신격·상징·지배 행성·기질·신화, 달 별자리, 생일 날짜로 정해지는 수호 행성, 행운의 색·숫자·방향이 나옵니다.',
        '태어난 시간을 넣으면 인생 구간(빔쇼타리 다샤)도 나옵니다. 지금 어떤 행성의 구간에 있는지, 언제 시작했고 다음 구간은 언제 시작하는지입니다. 결과 화면에서 다른 사람을 초대해 아쉬타쿠타 36점 궁합도 볼 수 있습니다.',
      ],
    },
    {
      h: '태어난 시간이 중요한 이유',
      p: [
        '달은 하루에 약 13도씩 움직여 거의 하루에 한 번, 아무 시각에나 탄생별을 바꿉니다. 시간이 없으면 정오를 기준으로 계산하는데, 대부분은 맞지만 네 명 중 한 명꼴은 태어난 날 중에 별이 바뀝니다. 그런 경우 결과를 잠정으로 표시합니다. "새벽", "늦은 저녁"처럼 대략적인 시간이라도 없는 것보다 훨씬 낫습니다.',
        '평소 쓰는 양력 생일을 넣으세요. 집안에서 음력으로 쇤다면 먼저 양력으로 바꿔야 합니다.',
      ],
    },
    {
      h: '내 정보는',
      p: [
        '회원가입이 필요 없습니다. 날짜·시간·별명은 결과를 계산하는 데만 쓰이고, 즐겨찾기나 공유를 할 수 있도록 페이지 주소에 담깁니다. 서버에 저장하지 않으며, 결과 페이지는 검색엔진에 노출되지 않습니다.',
      ],
    },
  ],
}
