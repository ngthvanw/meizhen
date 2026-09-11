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
    to: 2.6,
    layout: "split",
    effect: "tiny-heart",

    boy: {
      scene: "room",
      pose: "texting",
      talk: "Bà đang làm gì đó? 👀",
      phone: true,
    },

    girl: {
      scene: "room",
      pose: "texting",
      talk: "ông ơi...",
      phone: true,
    },
  },

  {
    from: 2.6,
    to: 4.96,
    layout: "split",
    effect: "steam",

    boy: {
      scene: "room",
      pose: "reading-text",
      talk: "sao vậy bà?",
      phone: true,
    },

    girl: {
      scene: "room",
      pose: "hungry-text",
      talk: "tui thèm mỳ cay Tâm Giao quá 🍜🥹",
      phone: true,
      thoughtNoodles: true,
    },
  },

  {
    from: 4.96,
    to: 6.8,
    layout: "split",
    effect: "idea",

    boy: {
      scene: "room",
      pose: "surprised-text",
      talk: "mỳ cay á? 👀",
      phone: true,
    },

    girl: {
      scene: "room",
      pose: "hungry-text",
      talk: "ừ... thèm dữ lắm luôn 🥹",
      phone: true,
      thoughtNoodles: true,
    },
  },

  {
    from: 6.8,
    to: 8.64,
    layout: "split",
    effect: "tiny-heart",

    boy: {
      scene: "room",
      pose: "determined",
      talk: "đợi tui xíu nha bà 😌",
      phone: true,
    },

    girl: {
      scene: "room",
      pose: "confused-text",
      talk: "ủa ông đi đâu?",
      phone: true,
    },
  },

  {
    from: 8.64,
    to: 11.86,
    layout: "split",
    effect: "speed",

    boy: {
      scene: "road",
      pose: "walk",
      talk: "đi mua mỳ cay cho bà chứ đâu 😌",
    },

    girl: {
      scene: "wait",
      pose: "reading-text",
      talk: "hả??? thiệt hả ông 😳",
      phone: true,
      thoughtNoodles: true,
    },
  },

  {
    from: 11.86,
    to: 14.2,
    layout: "split",
    effect: "speed",

    boy: {
      scene: "road",
      pose: "run",
      talk: "đúng rồi á",
    },

    girl: {
      scene: "wait",
      pose: "happy-text",
      talk: "hehe... 🥹",
      phone: true,
      thoughtNoodles: true,
    },
  },

  {
    from: 14.2,
    to: 17.55,
    layout: "split",
    effect: "steam",

    boy: {
      scene: "shop",
      pose: "order",
      talk: "cho một phần mỳ cay thập cẩm cấp 2 không lấy chả cho thêm nhiều sốt chấm nha!",
    },

    girl: {
      scene: "wait",
      pose: "wait",
      talk: "không biết ông tới đâu rồi...",
      thoughtNoodles: true,
    },
  },

  {
    from: 17.55,
    to: 20.65,
    layout: "split",
    effect: "steam",

    boy: {
      scene: "shop",
      pose: "reading-text",
      talk: "giờ tui chạy xuống đưa cho bà nha",
      phone: true,
    },

    girl: {
      scene: "wait",
      pose: "texting",
      talk: "đã vá",
      phone: true,
    },
  },

  {
    from: 20.65,
    to: 23.44,
    layout: "split",
    effect: "rain",

    boy: {
      scene: "ship",
      pose: "ride",
      talk: "mỳ cay tới đây bà ơiii 🍜",
      carryFood: true,
      helmet: true,
    },

    girl: {
      scene: "wait",
      pose: "phone",
      talk: "ông chạy từ từ thôi nha!",
      phone: true,
    },
  },

  {
    from: 23.44,
    to: 27.86,
    layout: "split",
    effect: "rain",

    boy: {
      scene: "ship",
      pose: "ride",
      talk: "biết rồi bà 😭",
      carryFood: true,
      helmet: true,
    },

    girl: {
      scene: "wait",
      pose: "hungry-text",
      talk: "nhưng mỳ đừng nguội nha 👉👈",
      phone: true,
      thoughtNoodles: true,
    },
  },

  {
    from: 28.1,
    to: 31.18,
    layout: "split",
    effect: "speed",

    boy: {
      scene: "ship",
      pose: "run",
      talk: "sắp tới rồi",
      carryFood: true,
    },

    girl: {
      scene: "wait",
      pose: "happy-text",
      talk: "hihi 🤭",
      phone: true,
    },
  },

  {
    from: 31.18,
    to: 34.84,
    layout: "split",
    effect: "speed",

    boy: {
      scene: "ship",
      pose: "run",
      talk: "tới rồi nè!",
      carryFood: true,
    },

    girl: {
      scene: "wait",
      pose: "peek",
      talk: "tui thấy ông rồi 👀",
    },
  },

  {
    from: 34.84,
    to: 37.52,
    layout: "together",
    sharedScene: "arrive",
    effect: "sparkles",

    boy: {
      pose: "arrive",
      talk: "shipper mỳ cay tới rồi đây 😎",
      carryFood: true,
    },

    girl: {
      pose: "surprised",
      talk: "ông đi thiệt luôn hả 😳",
    },
  },

  {
    from: 37.52,
    to: 40.65,
    layout: "together",
    sharedScene: "gift",
    effect: "hearts",

    boy: {
      pose: "give",
      talk: "mỳ cay của bà nè 🍜",
      carryFood: true,
    },

    girl: {
      pose: "happy",
      talk: "trời ơi... cảm ơn ông 🥹",
    },
  },

  {
    from: 40.65,
    to: 43.42,
    layout: "together",
    sharedScene: "gift",
    effect: "hearts",

    boy: {
      pose: "shy",
      talk: "có gì đâu bà 😳",
    },

    girl: {
      pose: "head-pat",
      talk: "ông ngốc ghê á ♡",
    },
  },

  {
    from: 43.42,
    to: 46.64,
    layout: "together",
    sharedScene: "eat",
    effect: "steam-hearts",

    boy: {
      pose: "eat",
      talk: "cay không bà?",
    },

    girl: {
      pose: "eat",
      talk: "cay... mà ngon 😭🍜",
    },
  },

  {
    from: 46.64,
    to: 49.96,
    layout: "together",
    sharedScene: "eat",
    effect: "steam-hearts",

    boy: {
      pose: "eat",
      talk: "ăn từ từ coi 😭",
    },

    girl: {
      pose: "happy",
      talk: "ông mua thì tui ăn hết 😌",
    },
  },

  {
    from: 49.96,
    to: 52.55,
    layout: "together",
    sharedScene: "ending",
    effect: "ending",

    boy: {
      pose: "happy",
      talk: "lần sau tui dẫn bà đi ăn luôn",
    },

    girl: {
      pose: "lean",
      talk: "nhớ đó nha ông ♡",
    },
  },

  {
    from: 52.55,
    to: 9999,
    layout: "together",
    sharedScene: "ending",
    effect: "ending",

    boy: {
      pose: "happy",
      talk: "",
    },

    girl: {
      pose: "lean",
      talk: "cảm ơn ông vì tô mỳ cay 🍜♡",
    },
  },
];

/* =========================================================
   CODE
========================================================= */

const CODE_LINES = [
  {
    time: 0,
    code: "async function spicyNoodleMission() {",
  },
  {
    time: 1.1,
    code: "  const message = await her.textMe();",
  },
  {
    time: 2.6,
    code: "  const craving = message.includes('mỳ cay');",
  },
  {
    time: 4.96,
    code: "  if (craving) me.makeDecision();",
  },
  {
    time: 6.8,
    code: '  me.text("đợi tui xíu nha bà");',
  },
  {
    time: 8.64,
    code: "  const shop = city.findBestSpicyNoodles();",
  },
  {
    time: 11.86,
    code: "  await me.go(shop);",
  },
  {
    time: 14.2,
    code: "  const bowl = await shop.order({ level: 2 });",
  },
  {
    time: 17.55,
    code: "  bowl.add(['egg', 'chili', 'noodles']);",
  },
  {
    time: 20.65,
    code: "  weather.startRain();",
  },
  {
    time: 23.44,
    code: "  me.protect(bowl);",
  },
  {
    time: 28.1,
    code: "  await me.shipTo(her.location);",
  },
  {
    time: 31.18,
    code: "  const home = maps.almostThere();",
  },
  {
    time: 34.84,
    code: "  me.arrive(home);",
  },
  {
    time: 37.52,
    code: "  me.give(bowl).to(her);",
  },
  {
    time: 40.65,
    code: "  her.heart.melt();",
  },
  {
    time: 43.42,
    code: "  const dinner = table.prepare(bowl);",
  },
  {
    time: 46.64,
    code: "  await Promise.all([me.eat(), her.eat()]);",
  },
  {
    time: 49.96,
    code: '  return "worth every step ♡";',
  },
  {
    time: 52.55,
    code: "}",
  },
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

function getStoryScene(time) {
  return (
    STORY_TIMELINE.find(
      (item) =>
        time >= item.from &&
        time < item.to
    ) || STORY_TIMELINE[0]
  );
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
  return (
    <div
      className={`
        panel-decor
        ${role}-${scene}
      `}
    >
      <Stars />

      {[
        "room",
        "wait",
      ].includes(
        scene
      ) && (
        <>
          <div className="panel-moon">
            <span />
          </div>

          <div className="window-box">
            <span className="window-line window-vertical" />
            <span className="window-line window-horizontal" />
          </div>

          <div className="room-floor" />

          {role ===
            "boy" && (
            <>
              <div className="boy-desk">
                <span className="desk-leg desk-left" />
                <span className="desk-leg desk-right" />
              </div>

              <div className="laptop">
                <span />
              </div>
            </>
          )}

          {role ===
            "girl" && (
            <>
              <div className="girl-sofa">
                <span />
              </div>

              <div className="plant">
                <span />
              </div>
            </>
          )}

          {thoughtNoodles && (
            <ThoughtNoodles />
          )}
        </>
      )}

      {scene ===
        "road" && (
        <>
          <div className="mini-city">
            {Array.from({
              length: 12,
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
                    height:
                      `${
                        24 +
                        ((index *
                          17) %
                          38)
                      }px`,
                  }}
                />
              )
            )}
          </div>

          <div className="mini-road">
            <span />
            <span />
            <span />
          </div>

          <div className="street-lamp">
            <span />
          </div>
        </>
      )}

      {scene ===
        "shop" && (
        <div className="shop">
          <div className="shop-roof" />

          <div className="shop-title">
            MỲ CAY
          </div>

          <div className="shop-subtitle">
            CẤP 1 • 2 • 3
          </div>

          <div className="shop-food-window">
            <SpicyNoodleBowl
              small
            />
          </div>

          <div className="shop-counter" />
          <div className="shop-door" />
        </div>
      )}

      {scene ===
        "ship" && (
        <>
          <div className="mini-city shipping-city">
            {Array.from({
              length: 11,
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
                    height:
                      `${
                        20 +
                        ((index *
                          19) %
                          38)
                      }px`,
                  }}
                />
              )
            )}
          </div>

          <div className="mini-road shipping-road">
            <span />
            <span />
            <span />
          </div>

          <div className="ship-badge">
            SHIP
            <small>
              MỲ CAY
            </small>
          </div>
        </>
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
    <div
      className={`
        shared-decor
        shared-${scene}
      `}
    >
      <Stars />

      <div className="shared-moon">
        <span />
      </div>

      <div className="shared-window">
        <span className="window-line window-vertical" />
        <span className="window-line window-horizontal" />
      </div>

      <div className="shared-lamp">
        <span className="shared-lamp-light" />
      </div>

      <div className="shared-floor" />

      <div className="shared-table">
        <span className="table-leg table-leg-left" />
        <span className="table-leg table-leg-right" />
      </div>

      {[
        "arrive",
        "gift",
        "eat",
        "ending",
      ].includes(
        scene
      ) && (
        <div className="shared-noodles">
          <SpicyNoodleBowl />
        </div>
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

      {!isGirl && (
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
        <span className="hood-string hood-left" />
        <span className="hood-string hood-right" />
      </div>

      <div className="chibi-arm arm-left" />
      <div className="chibi-arm arm-right" />

      <div className="chibi-leg leg-left" />
      <div className="chibi-leg leg-right" />

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
   TOGETHER SCENE
========================================================= */

function TogetherScene({
  story,
}) {
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
        className="together-boy-chat"
        text={
          story.boy.talk
        }
      />

      <ChatBubble
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

  const story =
    getStoryScene(
      currentTime
    );

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

              

              <h1>
                Mỳ Cay
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

              <Effects
                type={
                  story.effect
                }
              />

              {story.layout ===
              "split" ? (
                <div
                  key={`split-${story.from}`}
                  className="split-layout"
                >
                  <SplitPanel
                    side="left-panel"
                    title="ÔNG"
                    role="boy"
                    data={
                      story.boy
                    }
                  />

                  <SplitPanel
                    side="right-panel"
                    title="BÀ"
                    role="girl"
                    data={
                      story.girl
                    }
                  />
                </div>
              ) : (
                <TogetherScene
                  key={`together-${story.from}`}
                  story={
                    story
                  }
                />
              )}

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