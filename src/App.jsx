import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./App.css";

/* =========================================================
   LYRICS OFFSET
========================================================= */

const LYRIC_OFFSET = 0;

/* =========================================================
   LYRICS
========================================================= */

const LYRICS_TIMELINE = [
  {
    start: 1.1,
    end: 4.96,
    text: "Có phải anh đã cứu thế giới ở một cuộc đời trước đây?",
  },
  {
    start: 4.96,
    end: 8.64,
    text: "Nên là em mới bước tới dịu dàng và nắm tay anh",
  },
  {
    start: 8.64,
    end: 11.86,
    text: "Đi qua bão giông đang cuộn xoay, những tâm tư bủa vây",
  },
  {
    start: 11.86,
    end: 14.2,
    text: "Người đã vì anh mà ôm lấy",
  },
  {
    start: 14.2,
    end: 17.55,
    text: "Và giờ thì cả thế giới của anh đang ở đây",
  },
  {
    start: 17.55,
    end: 20.65,
    text: "Là người con gái đứng trước mắt anh lúc này",
  },
  {
    start: 20.65,
    end: 23.44,
    text: "Tưởng như chính anh đang nằm mơ",
  },
  {
    start: 23.44,
    end: 27.86,
    text: "Có đâu ngờ mình may mắn đến nhường này",
  },
  {
    start: 28.1,
    end: 31.18,
    text: "Đôi khi anh ngẩn ngơ, lòng còn đây băn khoăn",
  },
  {
    start: 31.18,
    end: 34.84,
    text: "Sao em luôn chọn anh mà chẳng hề phân vân?",
  },
  {
    start: 34.84,
    end: 37.52,
    text: "Dù mọi chuyện đang tốt hay là không okay",
  },
  {
    start: 37.52,
    end: 40.65,
    text: "Em vẫn ở đó đón anh trở về, yeah",
  },
  {
    start: 40.65,
    end: 43.42,
    text: "Nhớ cái cách baby trao nụ cười ngay từ lần đầu tiên",
  },
  {
    start: 43.42,
    end: 46.64,
    text: "Bao nhiêu lo lắng, nhức nhối, bức bối linh tinh bay màu không dấu vết",
  },
  {
    start: 46.64,
    end: 49.96,
    text: "Gần em là vùng an toàn, ở nơi mà anh biết rằng",
  },
  {
    start: 49.96,
    end: 52.55,
    text: "Anh chỉ cần là chính anh thôi",
  },
];

/* =========================================================
   STORY
========================================================= */

const STORY_TIMELINE = [
  {
    from: 0,
    to: 8.64,
    layout: "split",
    effect: "tiny-heart",
    boy: {
      scene: "room-night",
      pose: "texting",
      talk: "Bà đang làm gì đó? 👀",
      phone: true,
    },
    girl: {
      scene: "room-night",
      pose: "texting",
      talk: "ông ơi...",
      phone: true,
    },
    beats: [
      {
        at: 2.6,
        effect: "steam",
        boy: { pose: "reading-text", talk: "sao vậy bà?", phone: true },
        girl: {
          pose: "hungry-text",
          talk: "tui thèm mỳ cay Tâm Giao quá 🍜🥹",
          phone: true,
          thoughtNoodles: true,
        },
      },
      {
        at: 4.96,
        effect: "idea",
        boy: { pose: "surprised-text", talk: "mỳ cay á? 👀", phone: true },
        girl: {
          pose: "hungry-text",
          talk: "ùa... thèm dữ lắm luôn 🥹",
          phone: true,
          thoughtNoodles: true,
        },
      },
      {
        at: 6.15,
        effect: "tiny-heart",
        boy: { pose: "determined", talk: "đợi tui xíu nha bà, đừng đi đâu đó 😌", phone: false },
        girl: { pose: "confused-text", talk: "ủa ông đi đâu?", phone: true },
      },
      {
        at: 7.35,
        effect: "none",
        boy: { pose: "walk", talk: "bí mật 😌", phone: false },
        girl: { pose: "reading-text", talk: "???", phone: true },
      },
    ],
  },
  {
    from: 8.64,
    to: 14.2,
    layout: "split",
    effect: "speed",
    boy: {
      scene: "city-trip",
      pose: "walk",
      talk: "đi mua mỳ cay cho bà chứ đâu, bà thèm mà 😌",
    },
    girl: {
      scene: "room-night",
      pose: "reading-text",
      talk: "hả??? thiệt hả ông 😳",
      phone: true,
      thoughtNoodles: true,
    },
    beats: [
      {
        at: 1.51,
        boy: { pose: "run", talk: "đi hơi xa xíu thôi 😭" },
        girl: { pose: "happy-text", talk: "hehe... 🥹", phone: true },
      },
      {
        at: 3.22,
        effect: "none",
        boy: { pose: "walk", talk: "qua cầu cái đã" },
        girl: { pose: "wait", talk: "ổng đi xa thiệt...", phone: false, thoughtNoodles: true },
      },
      {
        at: 4.41,
        boy: { pose: "run", talk: "thấy bảng Tâm Giao rồi!" },
        girl: { pose: "wait", talk: "tui chờ nha 🍜", thoughtNoodles: true },
      },
    ],
  },
  {
    from: 14.2,
    to: 20.65,
    layout: "split",
    effect: "steam",
    boy: {
      scene: "noodle-shop",
      pose: "arrive",
      talk: "tới quán rồi nha bà, chờ tui xíu 🍜",
    },
    girl: {
      scene: "room-night",
      pose: "happy-text",
      talk: "thiệt hả 😳",
      phone: true,
      thoughtNoodles: true,
    },
    beats: [
      {
        at: 1.25,
        boy: {
          pose: "order",
          talk: "cho một phần thập cẩm cấp 2, không chả, nhiều sốt chấm nha!",
        },
        girl: { pose: "wait", talk: "tui chờ nha...", phone: false, thoughtNoodles: true },
      },
      {
        at: 3.35,
        effect: "tiny-heart",
        boy: { pose: "reading-text", talk: "giờ tui chạy xuống đưa cho bà nha", phone: true },
        girl: { pose: "texting", talk: "đã vá 🥹", phone: true },
      },
      {
        at: 4.65,
        effect: "steam",
        boy: { pose: "wait", talk: "đang chờ đóng hộp nè 🍜", phone: false },
        girl: {
          pose: "hungry-text",
          talk: "nhớ nhiều sốt chấm nha 👉👈",
          phone: true,
          thoughtNoodles: true,
        },
      },
    ],
  },
  {
    from: 20.65,
    to: 28.1,
    layout: "split",
    effect: "rain",
    boy: {
      scene: "rain-delivery",
      pose: "ride",
      talk: "mỳ cay với tui đang chạy về phía bà nè 🍜♡",
      carryFood: true,
      helmet: true,
    },
    girl: {
      scene: "room-night",
      pose: "phone",
      talk: "ông chạy từ từ thôi nha, tui chờ mà 🥺",
      phone: true,
    },
    beats: [
      {
        at: 1.4,
        boy: { pose: "ride", talk: "biết rồi bà 😭", carryFood: true, helmet: true },
        girl: { pose: "phone", talk: "trời mưa nữa kìa...", phone: true },
      },
      {
        at: 2.79,
        boy: { pose: "ride", talk: "tui che túi mỳ kỹ lắm 😭", carryFood: true, helmet: true },
        girl: {
          pose: "hungry-text",
          talk: "mỳ đừng nguội nha 👉👈",
          phone: true,
          thoughtNoodles: true,
        },
      },
      {
        at: 4.55,
        effect: "none",
        boy: { pose: "wait", talk: "đèn đỏ xíu nha bà", carryFood: true, helmet: true },
        girl: { pose: "phone", talk: "ông tới đâu rồi á ??", phone: true },
      },
      {
        at: 6.45,
        effect: "speed",
        boy: { pose: "ride", talk: "gần tới rồi!", carryFood: true, helmet: true },
        girl: { pose: "happy-text", talk: "okee, tới thì nhắn tui ra nha 🤭♡", phone: true },
      },
    ],
  },
  {
    from: 28.1,
    to: 34.84,
    layout: "split",
    effect: "none",
    boy: {
      scene: "apartment-arrival",
      pose: "walk",
      talk: "tui tới khu bà rồi nè ♡",
      carryFood: true,
    },
    girl: {
      scene: "apartment-wait",
      pose: "happy-text",
      talk: "hihi tui ra đây, ông đợi xíu nha 🤭",
      phone: true,
    },
    beats: [
      {
        at: 1.5,
        boy: { pose: "walk", talk: "cổng ở đây đúng hong", carryFood: true },
        girl: { pose: "run", talk: "đợi tui xíu!", phone: false },
      },
      {
        at: 3.08,
        boy: { pose: "walk", talk: "Tâm Giao của bà tới cửa rồi nè 🍜♡", carryFood: true },
        girl: { pose: "surprised", talk: "tr ưi dì mà nhìu vậy 😳", phone: false },
      },
      {
        at: 4.55,
        effect: "tiny-heart",
        boy: { pose: "wait", talk: "có nhiêu đâu 👀", carryFood: true },
        girl: { pose: "peek", talk: "Còn dì nữa hong ?", phone: false },
      },
    ],
  },
  {
    from: 34.84,
    to: 40.65,
    layout: "together",
    sharedScene: "arrival-cute",
    effect: "none",
    boy: { pose: "shy", talk: "", carryFood: true },
    girl: { pose: "peek", talk: "" },
  },
  {
    from: 40.65,
    to: 46.64,
    layout: "together",
    sharedScene: "dinner-cute",
    effect: "steam-hearts",
    boy: { pose: "shy", talk: "ăn thử đi bà, coi còn nóng hong ♡" },
    girl: { pose: "happy", talk: "ngon á... cảm ơn ông nha 🥹" },
    beats: [
      {
        at: 1.4,
        effect: "hearts",
        boy: { pose: "shy", talk: "có gì đâu bà 😳" },
        girl: { pose: "head-pat", talk: "ông ngốc ghê á ♡" },
      },
      {
        at: 2.77,
        effect: "steam-hearts",
        boy: { pose: "eat", talk: "cay không bà? cay thì uống nước nè" },
        girl: { pose: "eat", talk: "cay... 😭🍜" },
      },
      {
        at: 4.45,
        effect: "steam",
        boy: { pose: "eat", talk: "cấp 2 thôi mà 😭" },
        girl: { pose: "eat", talk: "mà ngon lắm 😌" },
      },
    ],
  },
  {
    from: 46.64,
    to: 49.96,
    layout: "together",
    sharedScene: "cozy-room",
    effect: "tiny-heart",
    boy: { pose: "happy", talk: "ăn từ từ coi 😭" },
    girl: { pose: "happy", talk: "no quá rồi..." },
    beats: [
      {
        at: 1.56,
        effect: "hearts",
        boy: { pose: "happy", talk: "bà vui là tui thấy đáng công rồi ♡" },
        girl: { pose: "lean", talk: "ông mua thì tui ăn hết, thiệt đó 😌♡" },
      },
    ],
  },
  {
    from: 49.96,
    to: 9999,
    layout: "together",
    sharedScene: "ending-cute",
    effect: "ending",
    boy: { pose: "happy", talk: "lần sau tui dẫn bà đi ăn, không để bà thèm một mình nữa" },
    girl: { pose: "lean", talk: "nhớ đó nha ông... tui chờ đó ♡" },
  },

];

/* =========================================================
   CHAT TIMELINE - CHẬM HƠN, DỄ ĐỌC HƠN

   Không còn nhồi 2 câu vào mỗi beat ngắn.
   Mỗi note giữ khoảng 1.2 - 2.0 giây và có khoảng nghỉ
   0.25 - 0.40 giây trước note tiếp theo.
========================================================= */

const CHAT_TIMELINE = [
  // 0s -> 8.64s: trong phòng
  { from: 0.35, to: 2.05, speaker: "boy", text: "Bà đang làm gì đó? 👀" },
  { from: 2.22, to: 3.62, speaker: "girl", text: "ông ơi..." },
  { from: 3.80, to: 5.80, speaker: "girl", text: "tui thèm mỳ cay Tâm Giao quá 🍜🥹" },
  { from: 6.00, to: 8.15, speaker: "boy", text: "đợi tui xíu nha bà, đừng đi đâu đó 😌" },

  // 8.64s -> 14.2s: đi tới quán
  { from: 8.78, to: 10.25, speaker: "girl", text: "ủa ông đi đâu vậy?" },
  { from: 10.42, to: 12.55, speaker: "boy", text: "đi mua mỳ cay cho bà chứ đâu, bà thèm mà 😌" },
  { from: 12.72, to: 14.05, speaker: "girl", text: "hehe... tui chờ nha, đi từ từ thôi 🥹🍜" },

  // 14.2s -> 20.65s: ở quán
  { from: 14.35, to: 15.90, speaker: "boy", text: "tới quán rồi nha bà, chờ tui xíu 🍜" },
  { from: 16.07, to: 18.60, speaker: "boy", text: "cho một phần thập cẩm cấp 2, không chả, nhiều sốt chấm nha!" },
  { from: 18.78, to: 20.48, speaker: "girl", text: "nhớ nhiều sốt chấm nha 👉👈" },

  // 20.65s -> 28.1s: ship dưới mưa
  { from: 20.80, to: 22.40, speaker: "boy", text: "mỳ cay với tui đang chạy về phía bà nè 🍜♡" },
  { from: 22.58, to: 24.18, speaker: "girl", text: "ông chạy từ từ thôi nha, tui chờ mà 🥺" },
  { from: 24.36, to: 26.30, speaker: "boy", text: "tui che kỹ lắm rồi, bà nhận là còn ấm á 😭♡" },
  { from: 26.48, to: 27.92, speaker: "girl", text: "okee, tới thì nhắn tui ra nha 🤭♡" },

  // 28.1s -> 34.84s: tới chung cư
  { from: 28.25, to: 29.90, speaker: "boy", text: "tui tới khu bà rồi nè ♡" },
  { from: 30.08, to: 31.73, speaker: "girl", text: "hihi tui ra đây, ông đợi xíu nha 🤭" },
  { from: 31.91, to: 34.65, speaker: "boy", text: "Tâm Giao của bà tới cửa rồi nè 🍜♡" },

  // 34.84s -> 40.65s: trước cửa nhà
  { from: 34.95, to: 36.25, speaker: "boy", text: "shipper riêng của bà tới rồi nè 😎🍜" },
  { from: 36.40, to: 37.70, speaker: "girl", text: "ông tới thiệt luôn hả... dễ thương quá 🥹♡" },
  { from: 37.85, to: 39.10, speaker: "boy", text: "mỳ cay của bà nè, tui giữ nóng kỹ lắm á 🍜♡" },
  { from: 39.25, to: 40.52, speaker: "girl", text: "cảm ơn ông nha... tự nhiên thấy được cưng ghê 🥹💗" },

  // 40.65s -> 46.64s: ăn mỳ
  { from: 40.78, to: 42.08, speaker: "boy", text: "ăn thử đi bà, coi còn nóng hong ♡" },
  { from: 42.24, to: 43.54, speaker: "girl", text: "ngon á... cảm ơn ông nha 🥹" },
  { from: 43.70, to: 44.98, speaker: "boy", text: "cay không bà? cay thì uống nước nè" },
  { from: 45.14, to: 46.48, speaker: "girl", text: "cay... mà ông mua nên ngon hơn á 😌🍜♡" },

  // 46.64s -> 49.96s: nghỉ trên sofa
  { from: 46.78, to: 48.20, speaker: "boy", text: "bà vui là tui thấy đáng công rồi ♡" },
  { from: 48.38, to: 49.78, speaker: "girl", text: "ông mua thì tui ăn hết, thiệt đó 😌♡" },

  // ending
  { from: 50.05, to: 51.40, speaker: "boy", text: "lần sau tui dẫn bà đi ăn, không để bà thèm một mình nữa" },
  { from: 51.58, to: 52.95, speaker: "girl", text: "nhớ đó nha ông... tui chờ đó ♡" },
];

/* =========================================================
   CODE
========================================================= */

const CODE_LINES = [
  { time: 0, code: "async function spicyNoodleMission() {" },
  { time: 1.1, code: "  const message = await her.textMe();" },
  { time: 2.6, code: "  const craving = message.includes('mỳ cay');" },
  { time: 4.96, code: "  if (craving) me.makeDecision();" },
  { time: 6.15, code: "  me.grab(['jacket', 'keys']);" },
  { time: 8.64, code: "  await me.walkThroughTheNight();" },
  { time: 11.86, code: "  const shop = city.find('Tâm Giao');" },
  { time: 14.2, code: "  me.arrive(shop);" },
  { time: 15.45, code: "  const bowl = await shop.order({ level: 2 });" },
  { time: 18.85, code: "  await shop.packWarm(bowl);" },
  { time: 20.65, code: "  weather.startRain();" },
  { time: 23.44, code: "  me.protect(bowl);" },
  { time: 25.2, code: "  await traffic.waitForGreen();" },
  { time: 28.1, code: "  await me.enterHerApartment();" },
  { time: 34.84, code: "  const door = await me.findHerDoor();" },
  { time: 36.2, code: '  me.text("shipper riêng của bà tới rồi nè 😎🍜");' },
  { time: 37.6, code: "  me.give(bowl).to(her);" },
  { time: 39.1, code: "  her.hugTheWarmBag();" },
  { time: 40.65, code: "  table.prepareCuteDinner(bowl);" },
  { time: 43.42, code: "  await Promise.all([me.eat(), her.eat()]);" },
  { time: 46.64, code: "  both.restWithCat();" },
  { time: 49.96, code: '  return "worth every step ♡";' },
  { time: 52.55, code: "}" },
];

/* =========================================================
   STARS
========================================================= */

const STAR_DATA = Array.from(
  { length: 60 },
  (_, index) => ({
    id: index,
    left: (index * 37 + 11) % 100,
    top: (index * 53 + 7) % 72,
    size: 1 + (index % 3),
    delay: ((index * 13) % 30) / 10,
  })
);

/* =========================================================
   HELPERS
========================================================= */

function getStoryIndex(time) {
  let activeIndex = 0;

  for (
    let index = 0;
    index < STORY_TIMELINE.length;
    index += 1
  ) {
    if (
      time >=
      STORY_TIMELINE[index].from
    ) {
      activeIndex = index;
    } else {
      break;
    }
  }

  return activeIndex;
}

function clamp(
  value,
  min = 0,
  max = 1
) {
  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );
}

function smootherStep(
  value
) {
  const progress =
    clamp(value);

  /*
    Mềm hơn ease thường:
    - đầu fade rất chậm
    - giữa chuyển đều
    - cuối fade chậm lại
  */
  return (
    progress *
    progress *
    progress *
    (
      progress *
      (
        progress * 6 - 15
      ) + 10
    )
  );
}

function getTransitionDuration(
  currentScene,
  nextScene
) {
  // Với ít cảnh hơn, 1.7s đủ mềm mà không bị ì.
  // Cảnh dài giữ lâu, chỉ đoạn giao nhau mới crossfade.
  return 1.7;
}

function resolveStoryBeat(
  story,
  currentTime
) {
  if (!story.beats?.length) {
    return story;
  }

  let activeBeat = null;

  for (const beat of story.beats) {
    if (
      currentTime >=
      story.from + beat.at
    ) {
      activeBeat = beat;
    } else {
      break;
    }
  }

  if (!activeBeat) {
    return story;
  }

  return {
    ...story,
    effect:
      activeBeat.effect ??
      story.effect,
    boy: {
      ...story.boy,
      ...(activeBeat.boy || {}),
    },
    girl: {
      ...story.girl,
      ...(activeBeat.girl || {}),
    },
  };
}


/* =========================================================
   SEQUENTIAL CHAT

   Mỗi thời điểm chỉ hiện note của MỘT người:
   ÔNG -> nghỉ nhẹ -> BÀ.
   Cảnh kế tiếp được pre-mount để crossfade nhưng note của
   cảnh đó sẽ chưa hiện cho tới đúng thời gian bắt đầu.
========================================================= */

function getStoryBeatWindow(
  story,
  currentTime
) {
  const beats =
    story.beats || [];

  let segmentStart =
    story.from;

  let segmentEnd =
    story.to;

  for (
    let index = 0;
    index < beats.length;
    index += 1
  ) {
    const beatStart =
      story.from +
      beats[index].at;

    if (
      currentTime >=
      beatStart
    ) {
      segmentStart =
        beatStart;

      segmentEnd =
        index + 1 < beats.length
          ? story.from +
            beats[index + 1].at
          : story.to;
    } else {
      segmentEnd =
        beatStart;
      break;
    }
  }

  return {
    start: segmentStart,
    end: Math.max(
      segmentEnd,
      segmentStart + 0.01
    ),
  };
}

function getActiveChat(currentTime) {
  return (
    CHAT_TIMELINE.find(
      (chat) =>
        currentTime >= chat.from &&
        currentTime < chat.to
    ) || null
  );
}

function applySequentialChat(
  story,
  resolvedStory,
  currentTime
) {
  /*
    Cảnh kế tiếp được mount sớm để crossfade.
    Chỉ cảnh đang thật sự chạy mới được phép hiện note.
  */
  if (
    currentTime < story.from ||
    currentTime >= story.to
  ) {
    return {
      ...resolvedStory,
      boy: {
        ...resolvedStory.boy,
        talk: "",
      },
      girl: {
        ...resolvedStory.girl,
        talk: "",
      },
    };
  }

  const activeChat =
    getActiveChat(currentTime);

  if (!activeChat) {
    return {
      ...resolvedStory,
      boy: {
        ...resolvedStory.boy,
        talk: "",
      },
      girl: {
        ...resolvedStory.girl,
        talk: "",
      },
    };
  }

  return {
    ...resolvedStory,
    boy: {
      ...resolvedStory.boy,
      talk:
        activeChat.speaker === "boy"
          ? activeChat.text
          : "",
    },
    girl: {
      ...resolvedStory.girl,
      talk:
        activeChat.speaker === "girl"
          ? activeChat.text
          : "",
    },
  };
}

function createWordTimings(line) {
  const words =
    line.text
      .trim()
      .split(/\s+/);

  const weights =
    words.map(
      (
        word,
        index
      ) => {
        let weight = 1;

        const clean =
          word
            .replace(
              /[,.!?]/g,
              ""
            )
            .toLowerCase();

        if (
          /[,.!?]$/.test(
            word
          )
        ) {
          weight += 0.24;
        }

        if (
          index ===
          words.length -
            1
        ) {
          weight += 0.7;
        }

        if (
          [
            "yeah",
            "okay",
            "thôi",
            "đây",
            "này",
            "vây",
            "lấy",
            "vết",
            "rằng",
          ].includes(
            clean
          )
        ) {
          weight += 0.18;
        }

        return weight;
      }
    );

  const total =
    weights.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  const duration =
    line.end -
    line.start;

  let cursor =
    line.start;

  return words.map(
    (
      word,
      index
    ) => {
      const length =
        duration *
        (
          weights[index] /
          total
        );

      const result = {
        word,
        start: cursor,
        end:
          cursor +
          length,
      };

      cursor +=
        length;

      return result;
    }
  );
}

/* =========================================================
   STARS
========================================================= */

function Stars() {
  return (
    <div className="stars">
      {STAR_DATA.map(
        (star) => (
          <span
            key={star.id}
            style={{
              left:
                `${star.left}%`,
              top:
                `${star.top}%`,
              width:
                `${star.size}px`,
              height:
                `${star.size}px`,
              animationDelay:
                `${star.delay}s`,
            }}
          />
        )
      )}
    </div>
  );
}

/* =========================================================
   SPICY NOODLES
========================================================= */

function SpicyNoodleBowl({
  small = false,
  showLabel = true,
}) {
  return (
    <div
      className={`
        spicy-bowl
        ${
          small
            ? "small-spicy-bowl"
            : ""
        }
      `}
    >
      <div className="bowl-steam steam-one" />
      <div className="bowl-steam steam-two" />
      <div className="bowl-steam steam-three" />

      <div className="noodle-surface">
        <span className="noodle noodle-one" />
        <span className="noodle noodle-two" />

        <span className="egg">
          <i />
        </span>

        <span className="chili chili-one">
          🌶
        </span>

        <span className="chili chili-two">
          🌶
        </span>

        <span className="green-onion green-one" />
        <span className="green-onion green-two" />
      </div>

      {showLabel && (
        <div className="spicy-label">
          MỲ CAY
          <small>
            CẤP 2
          </small>
        </div>
      )}
    </div>
  );
}

function ThoughtNoodles() {
  return (
    <div className="thought-noodles">
      <span className="thought-dot thought-dot-one" />
      <span className="thought-dot thought-dot-two" />

      <div className="thought-cloud">
        <SpicyNoodleBowl
          small
        />
      </div>
    </div>
  );
}

/* =========================================================
   PANEL DECOR
========================================================= */

function PanelDecor({
  role,
  scene,
  thoughtNoodles,
}) {
  const renderCity = (
    count = 12,
    className = "cute-city-buildings"
  ) => (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <i
          key={index}
          style={{
            height: `${28 + ((index * 19) % 52)}px`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className={`panel-decor ${role}-${scene}`}>
      <Stars />

      {scene === "room-night" && (
        <div className={`detail-room detail-room-${role}`}>
          <div className="detail-moon"><span /></div>
          <div className="detail-window">
            <span className="detail-window-v" />
            <span className="detail-window-h" />
            <i className="detail-window-star">✦</i>
          </div>

          <div className="detail-fairy-lights">
            {Array.from({ length: 7 }).map((_, index) => <i key={index} />)}
          </div>

          <div className="detail-shelf">
            <span>📚</span>
            <span>🌱</span>
            <span>♡</span>
          </div>

          {role === "boy" ? (
            <>
              <div className="detail-desk" />
              <div className="detail-laptop">♡</div>
              <div className="detail-jacket">🧥</div>
              <div className="detail-keys">🔑</div>
              <div className="detail-note boy-note">MỲ CAY?</div>
            </>
          ) : (
            <>
              <div className="detail-sofa"><span>♡</span></div>
              <div className="detail-bunny">૮ ˶ᵔ ᵕ ᵔ˶ ა</div>
              <div className="detail-cushion">♡</div>
              <div className="detail-mini-table">🍵</div>
              <div className="detail-note girl-note">TÂM GIAO ♡</div>
            </>
          )}

          <div className="detail-rug">♡</div>
          <div className="detail-room-floor" />

          {thoughtNoodles && <ThoughtNoodles />}
        </div>
      )}

      {scene === "city-trip" && (
        <div className="city-trip-scene">
          <div className="trip-moon"><span /></div>
          <div className="trip-cloud cloud-one" />
          <div className="trip-cloud cloud-two" />
          {renderCity(14)}
          <div className="trip-sign">TÂM GIAO →</div>
          <div className="trip-bus">🚌</div>
          <div className="trip-lamp lamp-one"><span /></div>
          <div className="trip-lamp lamp-two"><span /></div>
          <div className="trip-road">
            <i /><i /><i />
          </div>
          <div className="trip-sidewalk" />
          <div className="trip-tiny-heart">♡</div>
        </div>
      )}

      {scene === "noodle-shop" && (
        <div className="cute-shop-scene">
          <div className="cute-shop-header">
            <b>TÂM GIAO</b>
            <small>MỲ CAY • CẤP 1 2 3</small>
          </div>
          <div className="cute-shop-lantern lantern-left">●</div>
          <div className="cute-shop-lantern lantern-right">●</div>
          <div className="cute-menu-board">
            <span>THẬP CẨM</span>
            <span>CẤP 2 🌶🌶</span>
            <span>+ NHIỀU SỐT ♡</span>
          </div>
          <div className="cute-chef">👩‍🍳</div>
          <div className="cute-kitchen-steam">♨ ♨ ♨</div>
          <div className="cute-shop-bowl">
            <SpicyNoodleBowl small />
          </div>
          <div className="cute-order-ticket">#02 ♡</div>
          <div className="cute-shop-counter" />
          <div className="cute-takeaway-bag">TAKE<br />AWAY ♡</div>
        </div>
      )}

      {scene === "rain-delivery" && (
        <div className="rain-delivery-scene">
          <div className="rain-night-moon"><span /></div>
          {renderCity(13, "rain-city-buildings")}
          <div className="rain-shop-sign">24H</div>
          <div className="rain-traffic-light">
            <i className="r-light" />
            <i className="y-light" />
            <i className="g-light" />
          </div>
          <div className="rain-poster">🍜<small>GIỮ NÓNG ♡</small></div>
          <div className="rain-road-detail">
            <span /><span /><span />
          </div>
          <div className="rain-reflection reflect-one" />
          <div className="rain-reflection reflect-two" />
          <div className="rain-puddle-detail puddle-a" />
          <div className="rain-puddle-detail puddle-b" />
          <div className="rain-distance">CÒN 7 PHÚT ♡</div>
        </div>
      )}

      {scene === "apartment-arrival" && (
        <div className="cute-apartment-outside">
          <div className="apartment-night-moon"><span /></div>
          <div className="cute-apartment-building">
            <div className="apt-title">HOME ♡</div>
            {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
            <div className="apt-door">WELCOME</div>
          </div>
          <div className="apt-tree tree-left"><span /></div>
          <div className="apt-tree tree-right"><span /></div>
          <div className="apt-bench">♡</div>
          <div className="apt-mailbox">✉</div>
          <div className="apt-path"><span /><span /><span /></div>
          <div className="apt-lamp"><span /></div>
        </div>
      )}

      {scene === "apartment-wait" && (
        <div className="cute-apartment-inside">
          <div className="apt-inside-title">TẦNG 08 ♡</div>
          <div className="cute-elevator">
            <span className="elevator-left-panel" />
            <span className="elevator-right-panel" />
          </div>
          <div className="cute-elevator-screen">08</div>
          <div className="cute-elevator-button">●</div>
          <div className="hallway-door-mini">BÀ ♡</div>
          <div className="hallway-plant-mini"><span /></div>
          <div className="hallway-picture">🍜 ♡</div>
          <div className="hallway-rug-mini">HELLO</div>
          <div className="apt-inside-floor" />
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SHARED SCENE
========================================================= */

function SharedSceneDecor({
  scene,
}) {
  return (
    <div className={`shared-decor shared-${scene}`}>
      <Stars />

      {scene === "dinner-cute" && (
        <>
          <div className="dinner-wall-glow" />
          <div className="dinner-fairy-lights">
            {Array.from({ length: 10 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="dinner-window">
            <span />
            <i>☾</i>
          </div>
          <div className="dinner-picture">🍜 + ♡</div>
          <div className="dinner-plant"><span /></div>
          <div className="dinner-table-cute">
            <div className="dinner-cloth" />
            <div className="dinner-side side-left">🥬</div>
            <div className="dinner-side side-right">🥚</div>
            <div className="dinner-water water-left">💧</div>
            <div className="dinner-water water-right">💧</div>
            <div className="dinner-tissue">♡</div>
          </div>
          <div className="dinner-bowl-cute">
            <SpicyNoodleBowl />
          </div>
          <div className="dinner-cat-peek">=^･ω･^=</div>
          <div className="dinner-floor" />
        </>
      )}

      {scene === "cozy-room" && (
        <>
          <div className="cozy-window">
            <div className="cozy-moon"><span /></div>
            <div className="cozy-city">
              {Array.from({ length: 12 }).map((_, index) => (
                <i key={index} style={{ height: `${18 + ((index * 11) % 36)}px` }} />
              ))}
            </div>
          </div>
          <div className="cozy-lamp"><span /></div>
          <div className="cozy-sofa">
            <span className="cozy-cushion-one">♡</span>
            <span className="cozy-cushion-two">☁</span>
            <div className="cozy-blanket" />
          </div>
          <div className="cozy-cat">=^ᴗ^=</div>
          <div className="cozy-cup cup-a">☕</div>
          <div className="cozy-cup cup-b">☕</div>
          <div className="cozy-empty-bowl">🍜</div>
          <div className="cozy-floor" />
        </>
      )}

      {scene === "ending-cute" && (
        <>
          <div className="ending-moon-big"><span /></div>
          <div className="ending-cloud ending-cloud-one" />
          <div className="ending-cloud ending-cloud-two" />
          <div className="ending-city-cute">
            {Array.from({ length: 16 }).map((_, index) => (
              <i key={index} style={{ height: `${20 + ((index * 17) % 48)}px` }} />
            ))}
          </div>
          <div className="ending-string-lights">
            {Array.from({ length: 11 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="ending-balcony-rail">
            <span /><span /><span /><span /><span />
          </div>
          <div className="ending-little-table">
            <span>🍜</span>
            <b>worth every step ♡</b>
          </div>
          <div className="ending-cat-silhouette">=^･^=</div>
          <div className="ending-floor" />
        </>
      )}
    </div>
  );
}

/* =========================================================
   CHAT
========================================================= */

function ChatBubble({
  className,
  text,
}) {
  if (!text) {
    return null;
  }

  return (
    <div
      key={text}
      className={`
        chat-bubble
        ${className}
      `}
    >
      {text}

      <span className="chat-tail" />
    </div>
  );
}


/* =========================================================
   GLOBAL CHAT OVERLAY

   Chat được render NGOÀI lớp crossfade của scene.
   Vì vậy note không bị mờ/mất khi cảnh bắt đầu chuyển sớm.
========================================================= */

function ChatOverlay({
  currentTime,
}) {
  const activeChat =
    getActiveChat(currentTime);

  if (!activeChat) {
    return null;
  }

  const story =
    STORY_TIMELINE[
      getStoryIndex(currentTime)
    ];

  const isTogether =
    story.layout === "together";

  const sideClass = isTogether
    ? activeChat.speaker === "boy"
      ? "global-together-boy"
      : "global-together-girl"
    : activeChat.speaker === "boy"
      ? "global-split-boy"
      : "global-split-girl";

  return (
    <ChatBubble
      key={`${activeChat.from}-${activeChat.speaker}`}
      className={`global-chat ${sideClass}`}
      text={activeChat.text}
    />
  );
}

/* =========================================================
   CHARACTER
========================================================= */

function ChibiCharacter({
  role,
  pose,
  carryFood = false,
  phone = false,
  helmet = false,
  className = "",
}) {
  const isGirl =
    role === "girl";

  return (
    <div
      className={`
        chibi
        ${role}
        ${pose}
        ${className}
      `}
    >
      <div className="chibi-shadow" />

      {!isGirl && (helmet || carryFood) && (
        <div className="backpack" />
      )}

      {helmet && (
        <div className="helmet">
          <span />
        </div>
      )}

      <div
        className={`
          chibi-hair
          ${
            isGirl
              ? "girl-hair"
              : "boy-hair"
          }
        `}
      >
        <span />
        <span />

        {isGirl ? (
          <div className="photo-hair-flower">
            <i className="flower-petal petal-one" />
            <i className="flower-petal petal-two" />
            <i className="flower-petal petal-three" />
            <i className="flower-petal petal-four" />
            <i className="flower-petal petal-five" />
            <b />
          </div>
        ) : (
          <div className="photo-boy-hair-highlight" />
        )}
      </div>

      <div className="chibi-head">
        <div className="chibi-eye eye-left">
          <i />
        </div>

        <div className="chibi-eye eye-right">
          <i />
        </div>

        <div className="chibi-blush blush-left" />
        <div className="chibi-blush blush-right" />

        <div className="chibi-mouth" />
      </div>
      {isGirl && (
  <>
    <div className="girl-front-hair girl-front-left" />
    <div className="girl-front-hair girl-front-right" />
  </>
)}

      <div
        className={`
          chibi-body
          ${
            isGirl
              ? "girl-body"
              : "boy-body"
          }
        `}
      >
        {isGirl ? (
          <>
            <span className="photo-girl-neckline" />
            <span className="photo-girl-dress-line dress-line-one" />
            <span className="photo-girl-dress-line dress-line-two" />
            <span className="photo-girl-dress-line dress-line-three" />
          </>
        ) : (
          <>
            <span className="photo-boy-inner-shirt" />
            <span className="photo-plaid-line plaid-v-one" />
            <span className="photo-plaid-line plaid-v-two" />
            <span className="photo-plaid-line plaid-h-one" />
            <span className="photo-plaid-line plaid-h-two" />
          </>
        )}
      </div>

      <div className="chibi-arm arm-left" />
      <div className="chibi-arm arm-right" />

      <div className="chibi-leg leg-left" />
      <div className="chibi-leg leg-right" />

      {isGirl ? (
        <div className="photo-girl-bracelet">
          <span />
        </div>
      ) : (
        <div className="photo-boy-watch">
          <span />
        </div>
      )}

      {phone && (
        <div className="phone-item">
          <span />
        </div>
      )}

      {carryFood && (
        <div className="food-bag">
          <span className="bag-handle" />

          <div className="food-bag-name">
            MỲ CAY
          </div>

          <div className="food-bag-heart">
            ♡
          </div>
        </div>
      )}

      {[
        "eat",
        "happy",
      ].includes(
        pose
      ) && (
        <div className="personal-noodles">
          <SpicyNoodleBowl
            small
            showLabel={false}
          />
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SPLIT PANEL
========================================================= */

function SplitPanel({
  side,
  title,
  role,
  data,
}) {
  return (
    <div
      className={`
        story-card
        ${side}
      `}
    >
      <div className="panel-name">
        {title}
      </div>

      <PanelDecor
        role={role}
        scene={data.scene}
        thoughtNoodles={
          Boolean(
            data.thoughtNoodles
          )
        }
      />

      <ChatBubble
        key={`${role}-${data.talk || "empty"}`}
        className={
          side ===
          "left-panel"
            ? "left-chat"
            : "right-chat"
        }
        text={
          data.talk
        }
      />

      <ChibiCharacter
        role={role}
        pose={data.pose}
        carryFood={data.carryFood}
        phone={data.phone}
        helmet={data.helmet}
        className="panel-character"
      />
    </div>
  );
}

/* =========================================================
   CUTE ARRIVAL AT HER DOOR
========================================================= */

function ArrivalCuteScene({
  currentTime,
  story,
}) {
  const elapsed =
    currentTime - 34.84;

  let phase = 0;

  if (elapsed >= 4.26) {
    phase = 3;
  } else if (elapsed >= 2.76) {
    phase = 2;
  } else if (elapsed >= 1.36) {
    phase = 1;
  }

  const phaseData = [
    {
      boyPose: "shy",
      girlPose: "peek",
      boyTalk: "shipper riêng của bà tới rồi nè 😎🍜",
      girlTalk: "",
      boyFood: true,
      girlFood: false,
    },
    {
      boyPose: "shy",
      girlPose: "happy",
      boyTalk: "",
      girlTalk: "ông tới thiệt luôn hả... dễ thương quá 🥹♡",
      boyFood: true,
      girlFood: false,
    },
    {
      boyPose: "give",
      girlPose: "receive",
      boyTalk: "mỳ cay của bà nè, tui giữ nóng kỹ lắm á 🍜♡",
      girlTalk: "",
      boyFood: true,
      girlFood: true,
    },
    {
      boyPose: "happy",
      girlPose: "hug-bag",
      boyTalk: "",
      girlTalk: "cảm ơn ông nha... tự nhiên thấy được cưng ghê 🥹💗",
      boyFood: false,
      girlFood: true,
    },
  ][phase];

  return (
    <div
      className={`
        together-scene
        arrival-cute-scene
        arrival-phase-${phase}
      `}
    >
      <div className="arrival-cute-background">
        <Stars />

        <div className="arrival-wall-stars">
          <i>✦</i>
          <i>♡</i>
          <i>✦</i>
        </div>

        <div className="cute-door-frame">
          <div className="cute-door">
            <span className="cute-door-handle" />

            <div className="cute-door-plaque">
              BÀ ♡
            </div>

            <div className="cute-door-sticker">🐰</div>
            <div className="cute-door-note">mỳ cay tới! ♡</div>

            <div className="cute-door-heart">
              ♡
            </div>
          </div>

          <div className="cute-door-light">
            <span />
          </div>
        </div>

        <div className="cute-fairy-string">
          {Array.from({
            length: 9,
          }).map(
            (
              _,
              index
            ) => (
              <i
                key={
                  index
                }
              />
            )
          )}
        </div>

        <div className="arrival-plant">
          <span />
        </div>

        <div className="arrival-slippers">
          ♡ ♡
        </div>

        <div className="arrival-paw-trail">
          <i>•</i><i>•</i><i>•</i><i>•</i>
        </div>

        <div className="arrival-mini-flowers">🌷 ♡ 🌷</div>

        <div className="arrival-cat">
          <span className="cat-ear cat-ear-left" />
          <span className="cat-ear cat-ear-right" />
          <b>•ᴗ•</b>
          <i />
        </div>

        <div className="cute-doormat">
          HELLO ♡
        </div>

        <div className="arrival-floor" />

        <div className="arrival-soft-hearts">
          <span>♡</span>
          <span>♡</span>
          <span>♡</span>
          <span>♡</span>
          <span>♡</span>
        </div>

        {phase >= 3 && (
          <div className="arrival-noodle-peek">
            <SpicyNoodleBowl />
          </div>
        )}
      </div>

      <ChatBubble
        key={`arrival-boy-${story.boy.talk || "empty"}`}
        className="arrival-boy-chat"
        text={story.boy.talk}
      />

      <ChatBubble
        key={`arrival-girl-${story.girl.talk || "empty"}`}
        className="arrival-girl-chat"
        text={story.girl.talk}
      />

      <ChibiCharacter
        role="boy"
        pose={
          phaseData.boyPose
        }
        carryFood={
          phaseData.boyFood
        }
        className="arrival-boy"
      />

      <ChibiCharacter
        role="girl"
        pose={
          phaseData.girlPose
        }
        carryFood={
          phaseData.girlFood
        }
        className="arrival-girl"
      />
    </div>
  );
}

/* =========================================================
   TOGETHER SCENE
========================================================= */

function TogetherScene({
  story,
  currentTime,
}) {
  if (
    story.sharedScene ===
    "arrival-cute"
  ) {
    return (
      <ArrivalCuteScene
        currentTime={currentTime}
        story={story}
      />
    );
  }

  return (
    <div
      className={`
        together-scene
        together-${story.sharedScene}
      `}
    >
      <SharedSceneDecor
        scene={
          story.sharedScene
        }
      />

      <ChatBubble
        key={`together-boy-${story.boy.talk || "empty"}`}
        className="together-boy-chat"
        text={
          story.boy.talk
        }
      />

      <ChatBubble
        key={`together-girl-${story.girl.talk || "empty"}`}
        className="together-girl-chat"
        text={
          story.girl.talk
        }
      />

      <ChibiCharacter
        role="boy"
        pose={
          story.boy.pose
        }
        carryFood={
          story.boy.carryFood
        }
        className="together-boy"
      />

      <ChibiCharacter
        role="girl"
        pose={
          story.girl.pose
        }
        className="together-girl"
      />
    </div>
  );
}

/* =========================================================
   EFFECTS
========================================================= */

function Effects({
  type,
}) {
  if (
    type ===
    "tiny-heart"
  ) {
    return (
      <div className="tiny-heart">
        ♥
      </div>
    );
  }

  if (
    type ===
    "idea"
  ) {
    return (
      <div className="idea-effect">
        💡
      </div>
    );
  }

  if (
    type ===
    "speed"
  ) {
    return (
      <div className="speed-lines">
        {Array.from({
          length: 8,
        }).map(
          (
            _,
            index
          ) => (
            <span
              key={
                index
              }
              style={{
                top:
                  `${
                    60 +
                    index *
                      18
                  }px`,
              }}
            />
          )
        )}
      </div>
    );
  }

  if (
    type ===
    "steam"
  ) {
    return (
      <div className="center-steam">
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (
    type ===
    "rain"
  ) {
    return (
      <div className="rain-effect">
        {Array.from({
          length: 24,
        }).map(
          (
            _,
            index
          ) => (
            <span
              key={
                index
              }
              style={{
                left:
                  `${
                    (index *
                      17) %
                    100
                  }%`,
                animationDelay:
                  `${
                    (index %
                      8) *
                    0.08
                  }s`,
              }}
            />
          )
        )}
      </div>
    );
  }

  if (
    type ===
    "sparkles"
  ) {
    return (
      <div className="sparkles">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
      </div>
    );
  }

  if (
    type ===
      "hearts" ||
    type ===
      "steam-hearts"
  ) {
    return (
      <div className="heart-particles">
        {Array.from({
          length: 14,
        }).map(
          (
            _,
            index
          ) => (
            <span
              key={
                index
              }
              style={{
                "--i":
                  index,
              }}
            >
              ♥
            </span>
          )
        )}
      </div>
    );
  }

  if (
    type ===
    "ending"
  ) {
    return (
      <div className="ending-effect">
        ✦
        <span>♡</span>
        ✦
      </div>
    );
  }

  return null;
}

/* =========================================================
   POETIC AMBIENT

   Lớp trang trí "tình và thơ" dùng chung cho các cảnh.
   Không đụng vào timeline chat, không ảnh hưởng crossfade.
========================================================= */

const POETIC_CAPTIONS = {
  "room-night": "một tin nhắn nhỏ, làm tim ai đó mềm đi một chút ♡",
  "city-trip": "đường có xa một chút, miễn người chờ còn đang cười ♡",
  "noodle-shop": "giữa mùi mỳ cay, có một người đang nhớ lời bà dặn",
  "rain-delivery": "mưa một chút thôi, thương thì nhiều hơn rất nhiều",
  "apartment-arrival": "gần tới rồi, hình như tim cũng đi nhanh hơn",
  "apartment-wait": "cuối hành lang có một người đang mong cửa mở",
  "arrival-cute": "có người mang cả một tối ấm áp tới trước cửa ♡",
  "dinner-cute": "một tô mỳ cay, hai ánh mắt cứ lén cười với nhau",
  "cozy-room": "ngồi gần nhau một chút, cả thế giới tự nhiên yên hơn",
  "ending-cute": "đêm nay, thế giới vừa đủ bằng một người bên cạnh ♡",
};

const POETIC_PARTICLES = Array.from(
  { length: 12 },
  (_, index) => ({
    id: index,
    left: 5 + ((index * 23) % 90),
    delay: ((index * 17) % 26) / 10,
    duration: 5.6 + ((index * 7) % 28) / 10,
    drift: -18 + ((index * 19) % 38),
  })
);

const POETIC_FIREFLIES = Array.from(
  { length: 10 },
  (_, index) => ({
    id: index,
    left: 8 + ((index * 31) % 84),
    top: 18 + ((index * 27) % 58),
    delay: ((index * 11) % 24) / 10,
  })
);

function PoeticAmbient({
  story,
}) {
  const sceneName =
    story.layout === "together"
      ? story.sharedScene
      : story.boy?.scene || "";

  const caption =
    POETIC_CAPTIONS[sceneName] || "";

  const isRain =
    sceneName === "rain-delivery";

  const isArrival =
    sceneName === "arrival-cute";

  const isDinner =
    sceneName === "dinner-cute";

  const isEnding =
    sceneName === "ending-cute";

  const isRoom =
    sceneName === "room-night";

  const isCity =
    sceneName === "city-trip";

  const isShop =
    sceneName === "noodle-shop";

  const isApartment =
    sceneName === "apartment-arrival" ||
    sceneName === "apartment-wait";

  const isCozy =
    sceneName === "cozy-room";

  return (
    <div
      className={`poetic-ambient poetic-${sceneName}`}
      aria-hidden="true"
    >
      <div className="poetic-haze poetic-haze-one" />
      <div className="poetic-haze poetic-haze-two" />

      <div className="poetic-light-dust">
        {POETIC_FIREFLIES.map((item) => (
          <i
            key={`firefly-${item.id}`}
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}
      </div>

      {!isRain && (
        <div className="poetic-petals">
          {POETIC_PARTICLES.map((item) => (
            <i
              key={`petal-${item.id}`}
              style={{
                left: `${item.left}%`,
                "--petal-delay": `${item.delay}s`,
                "--petal-duration": `${item.duration}s`,
                "--petal-drift": `${item.drift}px`,
              }}
            />
          ))}
        </div>
      )}

      {isRoom && (
        <>
          <div className="romance-window-heart">♡</div>
          <div className="romance-note-glow">for you ♡</div>
        </>
      )}

      {isCity && (
        <>
          <div className="romance-lamp-pool lamp-pool-one" />
          <div className="romance-lamp-pool lamp-pool-two" />
          <div className="romance-walk-heart">♡</div>
        </>
      )}

      {isShop && (
        <>
          <div className="romance-steam-heart shop-steam-heart">♡</div>
          <div className="romance-warm-ring" />
        </>
      )}

      {isApartment && (
        <>
          <div className="romance-path-glow" />
          <div className="romance-path-heart">♡</div>
        </>
      )}

      {isRain && (
        <>
          <div className="poetic-rain-bokeh bokeh-one" />
          <div className="poetic-rain-bokeh bokeh-two" />
          <div className="poetic-rain-bokeh bokeh-three" />
          <div className="poetic-rain-reflection" />
        </>
      )}

      {isArrival && (
        <>
          <div className="poetic-door-glow" />
          <div className="poetic-heart-orbit orbit-one">♡</div>
          <div className="poetic-heart-orbit orbit-two">♡</div>
          <div className="poetic-heart-orbit orbit-three">♡</div>
          <div className="romance-love-thread" />
          <div className="romance-heart-beat">♡</div>
          <div className="romance-door-note">đợi bà mở cửa ♡</div>
        </>
      )}

      {isDinner && (
        <>
          <div className="poetic-candle candle-left"><i /></div>
          <div className="poetic-candle candle-right"><i /></div>
          <div className="poetic-table-glow" />
          <div className="romance-steam-heart dinner-steam-heart">♡</div>
          <div className="romance-dinner-sparkle sparkle-left">✦</div>
          <div className="romance-dinner-sparkle sparkle-right">✦</div>
        </>
      )}

      {isCozy && (
        <>
          <div className="romance-sofa-glow" />
          <div className="romance-sofa-heart heart-left">♡</div>
          <div className="romance-sofa-heart heart-right">♡</div>
          <div className="romance-cozy-note">ở đây thêm một chút nữa nha ♡</div>
        </>
      )}

      {isEnding && (
        <>
          <div className="poetic-shooting-star star-one" />
          <div className="poetic-shooting-star star-two" />
          <div className="poetic-constellation">
            <i /><i /><i /><i />
          </div>
          <div className="romance-ending-heart">♡</div>
          <div className="romance-ending-line">hai người, một đêm, và một lời hẹn nhỏ</div>
        </>
      )}

      {caption && (
        <div className="poetic-caption">
          <span>✦</span>
          <em>{caption}</em>
          <span>✦</span>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   STORY TRANSITION

   Chuyển cảnh thuần opacity:
   - không flash trắng
   - không brightness
   - không blur
   - không zoom
   - pause nhạc thì transition cũng pause
========================================================= */

function StoryScene({
  story,
  currentTime,
  effectOpacity = 1,
}) {
  const resolvedStory =
    resolveStoryBeat(
      story,
      currentTime
    );

  // Note chat được render riêng ở ChatOverlay, ngoài crossfade.
  // Ở trong scene chỉ giữ pose/effect, luôn tắt talk để không bị
  // trùng note hoặc bị fade mất khi chuyển cảnh.
  const dialogueStory = {
    ...resolvedStory,
    boy: {
      ...resolvedStory.boy,
      talk: "",
    },
    girl: {
      ...resolvedStory.girl,
      talk: "",
    },
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: effectOpacity,
          pointerEvents: "none",
        }}
      >
        <Effects
          type={
            dialogueStory.effect
          }
        />
      </div>

      {dialogueStory.layout === "split" ? (
        <div className="split-layout">
          <SplitPanel
            side="left-panel"
            title="ÔNG"
            role="boy"
            data={dialogueStory.boy}
          />

          <SplitPanel
            side="right-panel"
            title="BÀ"
            role="girl"
            data={dialogueStory.girl}
          />
        </div>
      ) : (
        <TogetherScene
          story={dialogueStory}
          currentTime={currentTime}
        />
      )}

      <PoeticAmbient
        story={dialogueStory}
      />
    </>
  );
}

function StoryTransition({
  currentTime,
}) {
  const currentIndex = getStoryIndex(currentTime);
  const currentStory = STORY_TIMELINE[currentIndex];
  const nextStory = STORY_TIMELINE[currentIndex + 1] || null;

  if (!nextStory) {
    return (
      <div className="story-transition-shell">
        <div key={currentStory.from} className="story-crossfade-layer" style={{ opacity: 1 }}>
          <StoryScene story={currentStory} currentTime={currentTime} />
        </div>
      </div>
    );
  }

  /*
    Fade bắt đầu TRƯỚC mốc đổi cảnh.
    Cảnh mới được mount sớm và giữ nguyên key,
    nên tới mốc đổi cảnh sẽ không replay animation.
  */
  const transitionDuration =
    getTransitionDuration(
      currentStory,
      nextStory
    );

  const transitionStart =
    currentStory.to -
    transitionDuration;

  const rawProgress =
    clamp(
      (
        currentTime -
        transitionStart
      ) /
        transitionDuration
    );

  const progress =
    smootherStep(
      rawProgress
    );
  const isTransitioning = currentTime >= transitionStart;

  if (!isTransitioning) {
    return (
      <div className="story-transition-shell">
        <div key={currentStory.from} className="story-crossfade-layer" style={{ opacity: 1 }}>
          <StoryScene story={currentStory} currentTime={currentTime} />
        </div>
      </div>
    );
  }

  return (
    <div className="story-transition-shell">
      <div
        key={currentStory.from}
        className="story-crossfade-layer story-crossfade-old"
        style={{ opacity: 1 - progress }}
      >
        <StoryScene story={currentStory} currentTime={currentTime} effectOpacity={1 - progress} />
      </div>

      <div
        key={nextStory.from}
        className="story-crossfade-layer story-crossfade-new"
        style={{ opacity: progress }}
      >
        <StoryScene story={nextStory} currentTime={currentTime} effectOpacity={progress} />
      </div>
    </div>
  );
}

/* =========================================================
   LYRICS
========================================================= */

function Lyrics({
  currentTime,
}) {
  const time =
    currentTime +
    LYRIC_OFFSET;

  const line =
    LYRICS_TIMELINE.find(
      (item) =>
        time >=
          item.start &&
        time <
          item.end
    );

  if (!line) {
    return (
      <div className="lyrics lyrics-empty" />
    );
  }

  const words =
    createWordTimings(
      line
    );

  return (
    <div
      key={
        line.start
      }
      className="lyrics"
    >
      {words.map(
        (
          item,
          index
        ) => {
          const progress =
            Math.min(
              Math.max(
                (
                  time -
                  item.start
                ) /
                  Math.max(
                    item.end -
                      item.start,
                    0.01
                  ),
                0
              ),
              1
            );

          return (
            <span
              key={`${item.word}-${index}`}
              className="karaoke-word"
              style={{
                "--progress":
                  `${
                    progress *
                    100
                  }%`,
              }}
            >
              {item.word}

              {index <
              words.length -
                1
                ? " "
                : ""}
            </span>
          );
        }
      )}
    </div>
  );
}

/* =========================================================
   CODE COLORS
========================================================= */

function colorizeCode(
  code
) {
  const regex =
    /(\basync\b|\bawait\b|\bconst\b|\blet\b|\bif\b|\breturn\b|\btrue\b|\bfalse\b|\bPromise\b|".*?"|'.*?')/g;

  return code
    .split(regex)
    .map(
      (
        part,
        index
      ) => {
        if (
          [
            "async",
            "await",
            "const",
            "let",
            "if",
            "return",
          ].includes(
            part
          )
        ) {
          return (
            <span
              key={
                index
              }
              className="syntax-keyword"
            >
              {part}
            </span>
          );
        }

        if (
          part ===
            "true" ||
          part ===
            "false"
        ) {
          return (
            <span
              key={
                index
              }
              className="syntax-boolean"
            >
              {part}
            </span>
          );
        }

        if (
          part ===
          "Promise"
        ) {
          return (
            <span
              key={
                index
              }
              className="syntax-class"
            >
              {part}
            </span>
          );
        }

        if (
          part.startsWith(
            '"'
          ) ||
          part.startsWith(
            "'"
          )
        ) {
          return (
            <span
              key={
                index
              }
              className="syntax-string"
            >
              {part}
            </span>
          );
        }

        return part;
      }
    );
}

/* =========================================================
   CODE PANEL
========================================================= */

function CodePanel({
  currentTime,
}) {
  const activeRef =
    useRef(null);

  const activeIndex =
    useMemo(() => {
      let result =
        0;

      CODE_LINES.forEach(
        (
          item,
          index
        ) => {
          if (
            currentTime >=
            item.time
          ) {
            result =
              index;
          }
        }
      );

      return result;
    }, [currentTime]);

  useEffect(() => {
    activeRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
        block:
          "center",
      }
    );
  }, [activeIndex]);

  return (
    <section className="code-panel">
      <div className="editor-header">
        <div className="editor-dots">
          <span />
          <span />
          <span />
        </div>

        <div className="editor-name">
          spicy_noodle_mission.js
        </div>

        <div className="editor-live">
          ● LIVE
        </div>
      </div>

      <div className="code-content">
        {CODE_LINES.map(
          (
            item,
            index
          ) => {
            const active =
              index ===
              activeIndex;

            return (
              <div
                key={index}
                ref={
                  active
                    ? activeRef
                    : null
                }
                className={`
                  code-line
                  ${
                    active
                      ? "active-code"
                      : ""
                  }
                  ${
                    index <
                    activeIndex
                      ? "passed-code"
                      : ""
                  }
                `}
              >
                <span className="line-number">
                  {String(
                    index +
                      1
                  ).padStart(
                    2,
                    "0"
                  )}
                </span>

                <code>
                  {colorizeCode(
                    item.code
                  )}
                </code>
              </div>
            );
          }
        )}

        <div className="code-space" />
      </div>
    </section>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const videoRef =
    useRef(null);

  const rafRef =
    useRef(null);

  const [
    started,
    setStarted,
  ] =
    useState(false);

  const [
    isPlaying,
    setIsPlaying,
  ] =
    useState(false);

  const [
    currentTime,
    setCurrentTime,
  ] =
    useState(0);

  const [
    duration,
    setDuration,
  ] =
    useState(0);

  /* =====================================================
     SYNC TIME
  ===================================================== */

  useEffect(() => {
    function update() {
      const video =
        videoRef.current;

      if (video) {
        setCurrentTime(
          video.currentTime ||
            0
        );
      }

      rafRef.current =
        requestAnimationFrame(
          update
        );
    }

    rafRef.current =
      requestAnimationFrame(
        update
      );

    return () => {
      if (
        rafRef.current
      ) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, []);

  /* =====================================================
     PLAY
  ===================================================== */

  async function handlePlay() {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    video.muted =
      false;

    video.volume =
      1;

    if (
      video.ended ||
      (
        Number.isFinite(
          video.duration
        ) &&
        video.currentTime >=
          video.duration -
            0.05
      )
    ) {
      video.currentTime =
        0;

      setCurrentTime(
        0
      );
    }

    try {
      await video.play();

      setStarted(
        true
      );

      setIsPlaying(
        true
      );
    } catch (
      error
    ) {
      console.error(
        "Không phát được nhạc:",
        error
      );
    }
  }

  /* =====================================================
     PAUSE
  ===================================================== */

  function handlePause() {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    video.pause();

    setIsPlaying(
      false
    );
  }

  function togglePlay() {
    if (
      isPlaying
    ) {
      handlePause();
    } else {
      handlePlay();
    }
  }

  /* =====================================================
     RESTART
  ===================================================== */

  async function restartStory() {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    video.currentTime =
      0;

    setCurrentTime(
      0
    );

    video.muted =
      false;

    video.volume =
      1;

    try {
      await video.play();

      setStarted(
        true
      );

      setIsPlaying(
        true
      );
    } catch (
      error
    ) {
      console.error(
        error
      );
    }
  }

  return (
    <main className="app">
      <div className="phone-frame">

        {/* =================================================
            NHẠC / VIDEO MẶC ĐỊNH

            đặt file:
            public/nhac.mp4
        ================================================= */}

        <video
          ref={videoRef}

          className="video-source"

          src="/nhac.mp4"

          playsInline

          preload="auto"

          onLoadedMetadata={() => {
            const video =
              videoRef.current;

            if (!video) {
              return;
            }

            setDuration(
              Number.isFinite(
                video.duration
              )
                ? video.duration
                : 0
            );

            video.muted =
              false;

            video.volume =
              1;
          }}

          onPlay={() => {
            setIsPlaying(
              true
            );
          }}

          onPause={() => {
            setIsPlaying(
              false
            );
          }}

          onEnded={() => {
            setIsPlaying(
              false
            );
          }}

          onTimeUpdate={() => {
            setCurrentTime(
              videoRef.current
                ?.currentTime ||
                0
            );
          }}
        />

        {/* =================================================
            START
        ================================================= */}

        {!started && (
          <div className="start-screen">
            <Stars />

            <div className="start-glow" />

            <div className="start-content">
              <div className="start-noodles">
                <SpicyNoodleBowl />
              </div>

              

              <div className="start-love-kicker">dựa trên một câu chuyện có thật ♡</div>

              <h1>
                Spicy Noodle Story
              </h1>


              <button
                type="button"
                className="main-play-button"
                onClick={
                  handlePlay
                }
              >
                <span>
                  ▶
                </span>

                PLAY
              </button>
            </div>
          </div>
        )}

        {/* =================================================
            STORY
        ================================================= */}

        {started && (
          <>
            <section className="story-stage">
              <div className="stage-background" />

              <StoryTransition
                currentTime={
                  currentTime
                }
              />

              <ChatOverlay
                currentTime={
                  currentTime
                }
              />

              <Lyrics
                currentTime={
                  currentTime
                }
              />

              <div className="music-progress">
                <div
                  style={{
                    width:
                      duration >
                      0
                        ? `${
                            Math.min(
                              currentTime /
                                duration,
                              1
                            ) *
                            100
                          }%`
                        : "0%",
                  }}
                />
              </div>

              {/* PLAY / PAUSE */}

              <button
                type="button"
                className="mini-control mini-play"
                onClick={
                  togglePlay
                }
                title={
                  isPlaying
                    ? "Pause"
                    : "Play"
                }
              >
                {isPlaying
                  ? "Ⅱ"
                  : "▶"}
              </button>

              {/* RESTART */}

              <button
                type="button"
                className="mini-control mini-restart"
                onClick={
                  restartStory
                }
                title="Phát lại"
              >
                ↻
              </button>
            </section>

            <CodePanel
              currentTime={
                currentTime
              }
            />
          </>
        )}
      </div>
    </main>
  );
}